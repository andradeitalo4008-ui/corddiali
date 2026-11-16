import { NextRequest, NextResponse } from "next/server";
import { createHash, randomUUID } from "node:crypto";
import { isQualified, normalizePhone, validateLead } from "@/lib/lead";
import { rateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
export const maxDuration = 30;
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
async function send(
  url: string,
  payload: unknown,
  headers: Record<string, string> = {},
) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
    redirect: "error",
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
}
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
    console.error("[lead] Rate limiter unavailable");
    return NextResponse.json(
      {
        error:
          "Atendimento temporariamente indisponível. Tente novamente em instantes.",
      },
      { status: 503 },
    );
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
  const id = randomUUID();
  const qualified = isQualified(data);
  const lead = { ...data, id, qualified, created_at: new Date().toISOString() };
  const deliveries: Promise<void>[] = [];
  if (
    process.env.RESEND_API_KEY &&
    process.env.LEAD_TO_EMAIL &&
    process.env.LEAD_FROM_EMAIL
  ) {
    deliveries.push(
      send(
        "https://api.resend.com/emails",
        {
          from: process.env.LEAD_FROM_EMAIL,
          to: [process.env.LEAD_TO_EMAIL],
          subject: `Novo lead Corddiali${qualified ? " — qualificado" : ""}`,
          text: JSON.stringify(lead, null, 2),
          ...(data.email ? { reply_to: data.email } : {}),
        },
        {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Idempotency-Key": id,
        },
      ),
    );
  } else console.error("[lead] Resend not configured", { id });
  if (process.env.LEAD_WEBHOOK_URL)
    deliveries.push(send(process.env.LEAD_WEBHOOK_URL, lead));
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
  const [results] = await Promise.all([
    Promise.allSettled(deliveries),
    capi().catch(() => console.error("[lead] Meta CAPI failed", { id })),
  ]);
  results.forEach((result, index) => {
    if (result.status === "rejected")
      console.error("[lead] Delivery failed", { id, destination: index });
  });
  const delivered = results.some((result) => result.status === "fulfilled");
  // Delivery failures intentionally keep the WhatsApp handoff available.
  return NextResponse.json(
    { id, qualified, delivered },
    { headers: { "Cache-Control": "no-store" } },
  );
}
