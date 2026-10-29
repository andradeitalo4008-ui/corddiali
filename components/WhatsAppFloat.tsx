"use client";

import { useEffect } from "react";

const WHATSAPP_NUMBER = "5549991360745";
const WHATSAPP_TEXT =
  "Olá! Vim pelo site da Corddiali e gostaria de conversar sobre um projeto.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT
)}`;

// Conversão do Google Ads: "Clique no WhatsApp (site)"
const WHATSAPP_CONVERSION = "AW-17442865573/S0BICIGMxK4dEKWDtP1A";

type Gtag = (...args: unknown[]) => void;

function trackWhatsAppClick() {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "conversion", { send_to: WHATSAPP_CONVERSION });
  }
}

export default function WhatsAppFloat() {
  // Conta como conversão qualquer clique em link de WhatsApp do site.
  // Links com data-no-conversion (ex.: página /obrigado) são ignorados
  // para não contar o mesmo lead duas vezes.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"]'
      );
      if (!link || link.hasAttribute("data-no-conversion")) return;
      trackWhatsAppClick();
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Corddiali no WhatsApp"
      className="fixed z-50 right-5 md:right-8 flex items-center justify-center w-14 h-14 rounded-full bg-copper text-white shadow-[0_10px_30px_rgba(0,0,0,.45)] ring-1 ring-white/15 transition duration-300 hover:bg-[#c17a51] hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copperSoft"
      style={{ bottom: "calc(20px + env(safe-area-inset-bottom))" }}
    >
      <svg
        viewBox="0 0 32 32"
        width="26"
        height="26"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.04 3C8.86 3 3.04 8.82 3.04 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.94 12.94 0 0 0 16.04 29C23.22 29 29 23.18 29 16S23.22 3 16.04 3Zm0 23.8c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.97 1.04 1.06-3.87-.27-.4A10.73 10.73 0 0 1 5.25 16c0-5.95 4.84-10.79 10.79-10.79 5.94 0 10.75 4.84 10.75 10.79 0 5.95-4.81 10.8-10.75 10.8Zm5.92-8.08c-.32-.16-1.92-.95-2.22-1.06-.3-.11-.51-.16-.73.16-.21.32-.84 1.06-1.03 1.27-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.5.14-.66.15-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.58 1.16 3.12 1.32 3.33.16.22 2.28 3.48 5.53 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.04.13.62-.09 1.92-.78 2.19-1.54.27-.76.27-1.41.19-1.54-.08-.14-.29-.22-.62-.38Z" />
      </svg>
    </a>
  );
}
