import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContatoPage() {
  return (
    <main>
      <Header />
      <section className="section pt-36">
        <div className="container-x max-w-4xl">
          <div className="eyebrow">Contato</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Vamos tirar o seu projeto do papel?</h1>
          <p className="muted mt-6 text-lg leading-8">
            Agende uma conversa consultiva presencial ou online com a Corddiali para uma avaliação inicial do seu projeto ou terreno.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <a href="https://wa.me/" target="_blank" className="border border-white/10 p-8 hover:border-copper transition">
              <div className="eyebrow">WhatsApp</div>
              <div className="mt-4 text-2xl">Iniciar conversa</div>
              <p className="muted mt-3">Substitua o link pelo número oficial da Corddiali.</p>
            </a>
            <div className="border border-white/10 p-8">
              <div className="eyebrow">Atendimento</div>
              <div className="mt-4 text-2xl">Costa Esmeralda</div>
              <p className="muted mt-3">Itapema • Porto Belo • Balneário Camboriú</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
