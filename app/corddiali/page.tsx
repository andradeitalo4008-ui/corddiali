import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CorddialiPage() {
  return (
    <main>
      <Header />
      <section className="section pt-36">
        <div className="container-x">
          <div className="eyebrow">Corddiali</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Engenharia, tradição e responsabilidade integral.</h1>
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            <div className="border border-white/10 p-8">
              <h2 className="display text-3xl">Eng. Guilherme De Carli</h2>
              <p className="muted mt-4 leading-7">Sócio & Diretor Técnico — UDESC. 16 anos de experiência na construção civil executiva e atuação em obras de alta complexidade.</p>
            </div>
            <div className="border border-white/10 p-8">
              <h2 className="display text-3xl">Luisa Corrêa</h2>
              <p className="muted mt-4 leading-7">Sócia — Gestão Executiva e Comercial. Tradição familiar no mercado imobiliário catarinense e foco em relacionamento, governança e transparência.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
