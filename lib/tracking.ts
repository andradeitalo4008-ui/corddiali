import { attributionKeys, LeadInput, normalizePhone } from "./lead";
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
const storageKey = "corddiali:origem:v1";
let firstVisit: Record<string, string> | undefined;
export function attribution() {
  if (firstVisit) return firstVisit;
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      firstVisit = JSON.parse(saved);
      return firstVisit;
    }
  } catch {
    /* Storage may be unavailable. */
  }
  const params = new URLSearchParams(location.search);
  firstVisit = { landing_page: location.href, referrer: document.referrer };
  for (const key of attributionKeys)
    if (params.has(key)) firstVisit[key] = params.get(key)!;
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(firstVisit));
  } catch {
    /* Keep in memory. */
  }
  return firstVisit;
}
const trackedLeads = new Set<string>();
export function trackLead(data: LeadInput, id: string, qualified: boolean) {
  if (trackedLeads.has(id)) return;
  try {
    if (sessionStorage.getItem(`corddiali:tracked:${id}`)) return;
  } catch {
    /* Storage denied. */
  }
  trackedLeads.add(id);
  try {
    sessionStorage.setItem(`corddiali:tracked:${id}`, "1");
  } catch {
    /* In-memory guard remains. */
  }
  // Analytics errors must never interrupt the WhatsApp flow.
  const safely = (fn: () => void) => {
    try {
      fn();
    } catch {
      /* Third-party script failure. */
    }
  };
  safely(() => {
    if (data.consentimento)
      window.gtag?.("set", "user_data", {
        ...(data.email ? { email: data.email.trim().toLowerCase() } : {}),
        phone_number: normalizePhone(data.whatsapp),
      });
  });
  const adsId = process.env.NEXT_PUBLIC_GADS_ID || "AW-17442865573";
  for (const label of [
    process.env.NEXT_PUBLIC_GADS_LABEL_FORM,
    ...(qualified ? [process.env.NEXT_PUBLIC_GADS_LABEL_QUALIFIED] : []),
  ]) {
    if (label)
      safely(() =>
        window.gtag?.("event", "conversion", {
          send_to: `${adsId}/${label}`,
          value: 1.0,
          currency: "BRL",
          transaction_id: id,
        }),
      );
  }
  safely(() => {
    (window.dataLayer = window.dataLayer || []).push({
      event: "lead_submit",
      lead_qualificado: qualified,
    });
  });
  safely(() =>
    window.fbq?.(
      "track",
      "Lead",
      { content_name: "formulario_site", lead_qualificado: qualified },
      { eventID: id },
    ),
  );
  if (qualified)
    safely(() =>
      window.fbq?.(
        "trackCustom",
        "LeadQualificado",
        { content_name: "formulario_site", lead_qualificado: true },
        { eventID: id },
      ),
    );
}

export async function submissionKey(data: LeadInput) {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(JSON.stringify(data)),
  );
  const fingerprint = Array.from(new Uint8Array(hash), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  const key = `corddiali:submission:${fingerprint}`;
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) return saved;
  } catch {
    /* Storage denied. */
  }
  const id = crypto.randomUUID();
  try {
    sessionStorage.setItem(key, id);
  } catch {
    /* Retry in the component keeps the same key. */
  }
  return id;
}

export function trackSavedLead(
  data: LeadInput,
  ok: boolean,
  receipt: {
    saved?: boolean;
    id?: string;
    qualified?: boolean;
    error?: string;
  },
  track = trackLead,
) {
  if (!ok || receipt.saved !== true || !receipt.id)
    throw new Error(
      receipt.error || "Não foi possível enviar. Tente novamente.",
    );
  track(data, receipt.id, receipt.qualified === true);
}
