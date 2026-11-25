import { NextRequest, NextResponse } from "next/server";
import { createHash, randomUUID } from "node:crypto";
import { isQualified, normalizePhone, validateLead } from "@/lib/lead";
import { backup, newEntry, save } from "@/lib/lead-store";
import { deliver, send } from "@/lib/lead-notify";
import { rateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
export const maxDuration = 30;
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== request.nextUrl.origin &&
    origin !== `${request.nextUrl.protocol}//${request.headers.get("host")}`
  )
    return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  // On Vercel, x-forwarded-for is overwritten by the trusted edge proxy.
  const ip = (request.headers.get("x-forwarded-for") || "local")
    .split(",")[0]
    .trim();
  try {
    if (!(await rateLimit(ip)))
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 15 minutos." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
  } catch {
    console.warn("[lead] Rate limiter unavailable; continuing to storage");
  }
  let input: unknown;
  try {
    const text = await request.text();
    if (text.length > 20000)
      return NextResponse.json(
        { error: "Dados muito extensos." },
        { status: 413 },
      );
    input = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }
  if (
    input &&
    typeof input === "object" &&
    (input as Record<string, unknown>).website
  )
    return NextResponse.json({ error: "Envio inválido." }, { status: 400 });
  const { data, error } = validateLead(input);
  if (!data) return NextResponse.json({ error }, { status: 400 });
  const requestId = request.headers.get("idempotency-key");
  if (
    requestId &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestId,
    )
  )
    return NextResponse.json(
      { error: "Identificador inválido." },
      { status: 400 },
    );
  const id = requestId || randomUUID();
  const fingerprint = hash(JSON.stringify(data));
  const qualified = isQualified(data);
  const entry = newEntry(
    { ...data, id, qualified, created_at: new Date().toISOString() },
    fingerprint,
  );
  const receipt = (delivered: boolean) =>
    NextResponse.json(
      { id, saved: true, qualified, delivered },
      { headers: { "Cache-Control": "no-store" } },
    );
  try {
    const old = await save(entry);
    if (old) {
      if (old.fingerprint !== fingerprint)
        return NextResponse.json(
          {
            error:
              "Os dados deste envio foram alterados. Recarregue o formulário.",
          },
          { status: 409 },
        );
      return receipt(Object.values(old.channels).includes("sent"));
    }
  } catch {
    try {
      backup(entry);
    } catch {
      console.error("[lead] Recovery log unavailable", { id });
    }
    return NextResponse.json(
      {
        error:
          "Não foi possível confirmar o cadastro. Tente novamente ou continue pelo WhatsApp.",
      },
      { status: 503 },
    );
  }
  const capi = async () => {
    const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixel || !process.env.META_CAPI_TOKEN || !data.consentimento) return;
    const user = {
      ph: [hash(normalizePhone(data.whatsapp).replace(/\D/g, ""))],
      ...(data.email ? { em: [hash(data.email)] } : {}),
      client_ip_address: ip,
      client_user_agent: request.headers.get("user-agent") || "",
    };
    const events = ["Lead", ...(qualified ? ["LeadQualificado"] : [])].map(
      (event_name) => ({
        event_name,
        event_id: id,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url:
          request.headers.get("referer") || request.nextUrl.origin,
        user_data: user,
        custom_data: {
          content_name: "formulario_site",
          lead_qualificado: qualified,
        },
      }),
    );
    await send(`https://graph.facebook.com/v22.0/${pixel}/events`, {
      data: events,
      access_token: process.env.META_CAPI_TOKEN,
    });
  };
  const [result] = await Promise.all([
    deliver(id).catch(() => {
      console.error("[lead] Delivery remains pending", { id });
      return null;
    }),
    capi().catch(() => console.error("[lead] Meta CAPI failed", { id })),
  ]);
  return receipt(!!result && Object.values(result.channels).includes("sent"));
}
