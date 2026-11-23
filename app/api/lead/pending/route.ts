import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { pending } from "@/lib/lead-store";
import { deliver } from "@/lib/lead-notify";

export const dynamic = "force-dynamic";
function authorized(req: NextRequest) {
  const token = process.env.LEADS_ADMIN_TOKEN;
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return (
    !!token &&
    timingSafeEqual(
      hash(req.headers.get("authorization") || ""),
      hash("Bearer " + token),
    )
  );
}
function reply(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}
export async function GET(req: NextRequest) {
  if (!authorized(req)) return reply({ error: "Acesso negado." }, 401);
  const offset = Number(req.nextUrl.searchParams.get("offset") || 0);
  if (!Number.isSafeInteger(offset) || offset < 0)
    return reply({ error: "Offset inválido." }, 400);
  try {
    const leads = (await pending(offset)).map(({ lead, channels, status }) => ({
      lead,
      channels,
      status,
    }));
    return reply({ leads });
  } catch {
    return reply({ error: "Consulta indisponível." }, 503);
  }
}
export async function POST(req: NextRequest) {
  if (!authorized(req)) return reply({ error: "Acesso negado." }, 401);
  const body = await req.json().catch(() => null);
  if (typeof body?.id !== "string" || !/^[a-f0-9-]{36}$/i.test(body.id))
    return reply({ error: "ID inválido." }, 400);
  try {
    const entry = await deliver(body.id);
    return entry
      ? reply({ id: body.id, status: entry.status, channels: entry.channels })
      : reply({ error: "Lead indisponível para reenvio." }, 409);
  } catch {
    return reply({ error: "Reenvio indisponível." }, 503);
  }
}
