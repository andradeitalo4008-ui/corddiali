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
      mensagem ? `Mensagem: ${mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl =
      `https://wa.me/5549991360745?text=${encodeURIComponent(texto)}`;

    // Abre o WhatsApp em uma nova aba
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Leva a página atual para a confirmação
    window.location.href = "/obrigado";
  }

  return (
    <div className="border border-white/20 bg-black/10 backdrop-blur-sm p-8 md:p-10">
      <div className="eyebrow">Seu projeto</div>

      <h2 className="text-3xl md:text-4xl mt-4">
        Conte-nos um pouco sobre seu projeto
      </h2>

      <p className="muted mt-3 max-w-2xl">
        Preencha os dados abaixo para iniciar uma conversa com nossa equipe.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 mt-8"
      >
        <div>
          <label htmlFor="nome" className="block text-sm mb-2">
            Nome *
          </label>

          <input
            id="nome"
            name="nome"
            type="text"
            required
            placeholder="Seu nome"
            className="w-full bg-transparent border border-white/20 px-4 py-4 outline-none transition focus:border-white/60"
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm mb-2">
            WhatsApp *
          </label>

          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            placeholder="(00) 00000-0000"
            className="w-full bg-transparent border border-white/20 px-4 py-4 outline-none transition focus:border-white/60"
          />
        </div>

        <div>
          <label htmlFor="local" className="block text-sm mb-2">
            Local da obra
          </label>

          <input
            id="local"
            name="local"
            type="text"
            placeholder="Cidade ou condomínio"
            className="w-full bg-transparent border border-white/20 px-4 py-4 outline-none transition focus:border-white/60"
          />
        </div>

        <div>
          <label htmlFor="etapa" className="block text-sm mb-2">
            Etapa atual
          </label>

          <select
            id="etapa"
            name="etapa"
            defaultValue=""
            className="w-full bg-transparent border border-white/20 px-4 py-4 outline-none transition focus:border-white/60"
          >
            <option value="" className="text-black">
              Selecione
            </option>

            <option value="Tenho o terreno" className="text-black">
              Tenho o terreno
            </option>

            <option value="Tenho o projeto" className="text-black">
              Tenho o projeto
            </option>

            <option value="Terreno e projeto" className="text-black">
              Tenho terreno e projeto
            </option>

            <option value="Ainda estou planejando" className="text-black">
              Ainda estou planejando
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="mensagem" className="block text-sm mb-2">
            Conte-nos sobre seu projeto
          </label>

          <textarea
            id="mensagem"
            name="mensagem"
            rows={4}
            placeholder="Conte brevemente o que você pretende construir."
            className="w-full bg-transparent border border-white/20 px-4 py-4 outline-none transition focus:border-white/60 resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="
              w-full
              border border-white/30
              bg-transparent
              px-6 py-4
              text-white
              transition-all duration-300
              hover:border-orange-400
              hover:bg-orange-400/15
              hover:text-orange-300
              cursor-pointer
            "
          >
            Conversar no WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
