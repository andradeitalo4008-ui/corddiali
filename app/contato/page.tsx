import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Corddiali",
};

export default function Empresa() {
  return (
    <main>
      <Header />

      <section className="section pt-36 overflow-hidden">
        <div className="container-x">

          {/* Introdução */}
          <div className="max-w-5xl">
            <div className="eyebrow">Corddiali</div>

            <h1 className="display text-5xl md:text-6xl lg:text-7xl mt-4 leading-[0.95]">
              Engenharia, tradição e responsabilidade integral.
            </h1>

            <p className="muted text-lg leading-8 max-w-3xl mt-7">
              A Corddiali combina experiência executiva, governança e
              relacionamento para conduzir projetos de alto padrão com
              previsibilidade e controle.
            </p>
          </div>

          {/* Guilherme */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-20">
            <div className="overflow-hidden">
              <img
                src="/images/foto-guilherme.png"
                alt="Eng. Guilherme De Carli"
                className="w-full h-[480px] md:h-[580px] object-cover"
              />
            </div>

            <div className="md:pl-6">
              <div className="eyebrow">Eng. Guilherme De Carli</div>

              <h2 className="display text-3xl md:text-5xl mt-4">
                Sócio & Diretor Técnico — UDESC
              </h2>

              <p className="muted mt-6 leading-8">
                16 anos de bagagem na construção civil executiva, experiência
                em obras residenciais, comerciais e industriais, com atuação
                em projetos de grande porte e na Costa Esmeralda.
              </p>
            </div>
          </div>

          {/* Luisa */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-24">
            <div className="md:pr-6 order-2 md:order-1">
              <div className="eyebrow">Luisa Corrêa</div>

              <h2 className="display text-3xl md:text-5xl mt-4">
                Gestão Executiva e Comercial
              </h2>

              <p className="muted mt-6 leading-8">
                Tradição familiar no mercado imobiliário de Santa Catarina
                desde 1998, com foco em relacionamento, governança e
                transparência.
              </p>
            </div>

            <div className="overflow-hidden order-1 md:order-2">
              <img
                src="/images/foto-luiza.png"
                alt="Luisa Corrêa"
                className="w-full h-[480px] md:h-[580px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
