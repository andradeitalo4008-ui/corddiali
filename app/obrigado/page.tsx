"use client";

import Script from "next/script";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Obrigado() {
  return (
    <main>
      <Header />

      <Script id="google-ads-conversion">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17442865573/SXGhCIqxj_0cEKWDrP1A',
            'value': 1.0,
            'currency': 'BRL'
          });
        `}
      </Script>

      <section
        className="relative min-h-screen flex items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/fundo-contato.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="container-x relative z-10 py-32">
          <div className="max-w-3xl">
            <div className="eyebrow">Contato recebido</div>

            <h1 className="display text-5xl md:text-6xl mt-4 leading-[0.95]">
              Obrigado pelo seu contato.
            </h1>

            <p className="muted text-lg leading-8 mt-6 max-w-2xl">
              Recebemos suas informações. Nossa equipe entrará em contato para
              entender melhor o seu projeto e os próximos passos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="https://wa.me/5549991360745"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 bg-transparent px-6 py-4 text-white transition-all duration-300 hover:border-orange-400 hover:bg-orange-400/15 hover:text-orange-300"
              >
                Continuar pelo WhatsApp
              </a>

              <Link
                href="/"
                className="border border-white/20 px-6 py-4 text-white transition hover:bg-white/10"
              >
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
