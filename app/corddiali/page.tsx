import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Corddiali" };

export default function Empresa() {
  return (
    <main>
      <Header />
      <section className="section pt-36">
        <div className="container-x">
          <div className="eyebrow">Corddiali</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Engenharia, tradição e responsabilidade integral.</h1>
          <p className="muted text-lg leading-8 max-w-3xl mt-6">
            A Corddiali combina experiência executiva, governança e relacionamento para conduzir projetos de alto padrão com previsibilidade e controle.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            <div className="border border-white/10 p-8">
              <div className="eyebrow">Eng. Guilherme De Carli</div>
              <h2 className="display text-3xl mt-4">Sócio & Diretor Técnico — UDESC</h2>
              <p className="muted mt-5 leading-7">
                16 anos de bagagem na construção civil executiva, experiência em obras industriais e corporativas de grande porte e atuação na Costa Esmeralda.
              </p>
            </div>

            <div className="border border-white/10 p-8">
              <div className="eyebrow">Luisa Corrêa</div>
              <h2 className="display text-3xl mt-4">Gestão Executiva e Comercial</h2>
              <p className="muted mt-5 leading-7">
                Tradição familiar no mercado imobiliário de Santa Catarina desde 1998, com foco em relacionamento, governança e transparência.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
