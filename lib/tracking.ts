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
export function trackLead(data: LeadInput, id: string, qualified: boolean) {
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
