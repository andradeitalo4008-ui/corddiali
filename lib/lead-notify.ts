import { claim, finish, type Channel, type Lead } from "./lead-store";
import { normalizePhone } from "./lead";

export async function send(
  url: string,
  payload: unknown,
  headers: Record<string, string> = {},
) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(4000),
    redirect: "error",
  });
  if (!response.ok) throw new Error("Destination rejected request");
  return response;
}

async function telegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) throw new Error("Telegram unavailable");
  const response = await send(
    `https://api.telegram.org/bot${token}/sendMessage`,
    { chat_id: chat, text },
  );
  if ((await response.json()).ok !== true)
    throw new Error("Telegram rejected message");
}

async function notify(channel: Channel, lead: Lead) {
  const idHeader = { "Idempotency-Key": lead.id };
  if (channel === "telegram") {
    const origin = Object.entries(lead.origem)
      .map(([k, v]) => k + "=" + v)
      .join(" | ");
    return telegram(
      [
        `Novo lead Corddiali — ${lead.id}`,
        lead.nome,
        "Telefone: " + lead.whatsapp,
        lead.terreno && "Terreno: " + lead.terreno,
        lead.local && "Condomínio/local: " + lead.local,
        lead.investimento && "Investimento: " + lead.investimento,
        lead.inicio && "Prazo: " + lead.inicio,
        "Origem: " + (origin || "direta"),
      ]
        .filter(Boolean)
        .join("\n")
        .slice(0, 4000),
    );
  }
  if (channel === "webhook") {
    if (!process.env.LEAD_WEBHOOK_URL) throw new Error("Webhook unavailable");
    await send(process.env.LEAD_WEBHOOK_URL, lead, idHeader);
    return;
  }
  const { RESEND_API_KEY, LEAD_FROM_EMAIL, LEAD_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEAD_FROM_EMAIL || !LEAD_TO_EMAIL)
    throw new Error("Email unavailable");
  await send(
    "https://api.resend.com/emails",
    {
      from: LEAD_FROM_EMAIL,
      to: [LEAD_TO_EMAIL],
      subject: `Novo lead Corddiali — ${lead.nome}`,
      text: [
        `Nome: ${lead.nome}`,
        `Telefone: ${normalizePhone(lead.whatsapp)}`,
        `ID do lead: ${lead.id}`,
        `Recebido em: ${lead.created_at}`,
        `Origem: ${
          Object.entries(lead.origem)
            .map(([k, v]) => `${k}=${v}`)
            .join(" | ") || "direta"
        }`,
      ].join("\n"),
      ...(lead.email ? { reply_to: lead.email } : {}),
    },
    { ...idHeader, Authorization: "Bearer " + RESEND_API_KEY },
  );
}

export async function deliver(id: string) {
  const work = await claim(id);
  if (!work) return null;
  const { entry, token } = work;
  const channels = (["email", "telegram", "webhook"] as const).filter((c) =>
    ["pending", "failed"].includes(entry.channels[c]),
  );
  await Promise.all(
    channels.map(async (c) => {
      try {
        await notify(c, entry.lead);
        entry.channels[c] = "sent";
      } catch {
        entry.channels[c] = "failed";
      }
    }),
  );
  const failed = channels.filter((c) => entry.channels[c] === "failed");
  entry.status = failed.length ? "pending" : "complete";
  await Promise.all([
    finish(entry, token),
    failed.length &&
      telegram(
        `Falha no envio do lead ${id}, canal: ${failed.join(", ")}`,
      ).catch(() =>
        console.error("[lead] Telegram alert failed", { id, channels: failed }),
      ),
  ]);
  return entry;
}
