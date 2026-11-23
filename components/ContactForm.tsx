"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import {
  investimentos,
  locais,
  prazos,
  terrenos,
  validateLead,
  whatsappUrl,
} from "@/lib/lead";
import { attribution, submissionKey, trackSavedLead } from "@/lib/tracking";
export default function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    url: string;
  } | null>(null);
  const [fallback, setFallback] = useState("");
  const submitting = useRef(false);
  const attempt = useRef<{ data: string; id: string }>();
  const [phone, setPhone] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || result) return;
    const form = new FormData(event.currentTarget);
    const parsed = validateLead({
      ...Object.fromEntries(form),
      consentimento: form.get("consentimento") === "on",
      origem: attribution(),
    });
    if (!parsed.data) {
      setError(parsed.error!);
      return;
    }
    submitting.current = true;
    setBusy(true);
    setFallback("");
    setError("");
    try {
      const fingerprint = JSON.stringify(parsed.data);
      if (attempt.current?.data !== fingerprint)
        attempt.current = {
          data: fingerprint,
          id: await submissionKey(parsed.data),
        };
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": attempt.current.id,
        },
        body: JSON.stringify(parsed.data),
      });
      const body = await response.json();
      trackSavedLead(parsed.data, response.ok, body);
      const url = whatsappUrl(parsed.data);
      setResult({ url });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setFallback(whatsappUrl(parsed.data));
      setError(
        err instanceof Error
          ? err.message
          : "Falha de conexão. Tente novamente.",
      );
    } finally {
      setBusy(false);
      submitting.current = false;
    }
  }
  return (
    <div
      className="lead-form border border-white/20 bg-[#0b121b]/95 p-5 md:p-8"
      id="formulario"
    >
      <div className="eyebrow">Seu projeto</div>
      <h2 className="display text-2xl md:text-3xl mt-2">
        Conte-nos um pouco sobre seu projeto
      </h2>
      {result ? (
        <div role="status" className="mt-6 space-y-4">
          <p>Obrigado! Recebemos suas informações.</p>
          <a
            className="btn btn-primary"
            href={result.url}
            data-no-conversion
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar no WhatsApp
          </a>
        </div>
      ) : (
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 mt-5">
          <div>
            <label htmlFor="nome">Nome *</label>
            <input
              id="nome"
              name="nome"
              required
              minLength={2}
              maxLength={200}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="whatsapp">WhatsApp *</label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              value={phone}
              placeholder="(49) 99136-0745"
              onChange={(e) => {
                const n = e.target.value.replace(/\D/g, "").slice(0, 11);
                setPhone(
                  n.length > 2
                    ? `(${n.slice(0, 2)}) ${n.slice(2, n.length > 10 ? 7 : 6)}${n.length > 6 ? "-" + n.slice(n.length > 10 ? 7 : 6) : ""}`
                    : n,
                );
              }}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail (opcional)</label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={200}
              autoComplete="email"
            />
          </div>
          {[
            ["terreno", "Você já tem terreno?", terrenos],
            [
              "investimento",
              "Quanto pretende investir na obra?",
              investimentos,
            ],
            ["inicio", "Quando pretende começar?", prazos],
          ].map(([name, label, options]) => (
            <div key={name as string}>
              <label htmlFor={name as string}>{label} *</label>
              <select
                id={name as string}
                name={name as string}
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione
                </option>
                {(options as readonly string[]).map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>
          ))}
          <div className="sm:col-span-2">
            <label htmlFor="local">Onde fica o terreno? *</label>
            <input
              id="local"
              name="local"
              list="locais"
              required
              maxLength={200}
              placeholder="Cidade ou condomínio (ou local desejado)"
            />
            <datalist id="locais">
              {locais.map((local) => (
                <option key={local} value={local} />
              ))}
            </datalist>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="mensagem">Mensagem (opcional)</label>
            <textarea id="mensagem" name="mensagem" rows={2} maxLength={3000} />
          </div>
          <div aria-hidden="true" className="absolute -left-[10000px]">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className="consent-label sm:col-span-2 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="consentimento"
              required
              className="mt-1"
            />
            <span>
              Concordo com o tratamento dos meus dados para atendimento e
              mensuração conforme a{" "}
              <Link className="underline" href="/politica-de-privacidade">
                Política de Privacidade
              </Link>
              . *
            </span>
          </label>
          {error && (
            <p role="alert" className="sm:col-span-2 text-red-200">
              {error}
              {fallback && (
                <>
                  {" "}
                  <a
                    href={fallback}
                    data-no-conversion
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Continuar no WhatsApp
                  </a>
                </>
              )}
            </p>
          )}
          <button
            disabled={busy}
            aria-busy={busy}
            className="btn btn-primary justify-center sm:col-span-2 disabled:opacity-60"
            type="submit"
          >
            {busy ? "Enviando…" : "Enviar e conversar no WhatsApp"}
          </button>
        </form>
      )}
    </div>
  );
}
