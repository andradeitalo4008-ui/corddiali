"use client";

import { FormEvent } from "react";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const nome = String(form.get("nome") || "");
    const whatsapp = String(form.get("whatsapp") || "");
    const local = String(form.get("local") || "");
    const etapa = String(form.get("etapa") || "");
    const mensagem = String(form.get("mensagem") || "");

    const texto = [
      `Olá, sou ${nome}.`,
      "",
      "Gostaria de conversar sobre um projeto com a Corddiali.",
      `Meu WhatsApp: ${whatsapp}`,
      local ? `Local da obra: ${local}` : "",
      etapa ? `Etapa atual: ${etapa}` : "",
      mensagem ? `Sobre o projeto: ${mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url =
      "https://wa.me/5549991360745?text=" +
      encodeURIComponent(texto);

    window.location.href = url;
  }

  const campo =
    "w-full border border-white/20 bg-black/20 px-5 py-4 text-white placeholder:text-white/50 outline-none focus:border-white/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-white/20 bg-black/20 p-6 md:p-8 backdrop-blur-sm"
    >
      <div className="eyebrow">Seu projeto</div>

      <div className="text-2xl mt-4">
        Conte-nos um pouco sobre seu projeto
      </div>

      <p className="muted mt-3 mb-6">
        Preencha os dados abaixo para iniciar uma conversa com nossa equipe.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="nome"
          type="text"
          placeholder="Nome *"
          required
          className={campo}
        />

        <input
          name="whatsapp"
          type="tel"
          placeholder="WhatsApp *"
          required
          className={campo}
        />
      </div>

      <input
        name="local"
        type="text"
        placeholder="Onde pretende construir? (opcional)"
        className={`${campo} mt-4`}
      />

      <select
        name="etapa"
        defaultValue=""
        className={`${campo} mt-4`}
      >
        <option value="" className="text-black">
          Em que etapa você está? (opcional)
        </option>
        <option value="Já tenho o terreno" className="text-black">
          Já tenho o terreno
        </option>
        <option value="Estou escolhendo o terreno" className="text-black">
          Estou escolhendo o terreno
        </option>
        <option value="Já tenho projeto arquitetônico" className="text-black">
          Já tenho projeto arquitetônico
        </option>
        <option value="Estou desenvolvendo o projeto" className="text-black">
          Estou desenvolvendo o projeto
        </option>
        <option value="Ainda estou planejando" className="text-black">
          Ainda estou planejando
        </option>
      </select>

      <textarea
        name="mensagem"
        rows={4}
        placeholder="Conte brevemente sobre seu projeto (opcional)"
        className={`${campo} mt-4 resize-none`}
      />

      <button
        type="submit"
        className="mt-5 w-full bg-white px-6 py-4 font-medium text-black transition hover:bg-white/90"
      >
        Conversar pelo WhatsApp
      </button>

      <p className="muted mt-3 text-sm">
        * Nome e WhatsApp são obrigatórios.
      </p>
    </form>
  );
}
