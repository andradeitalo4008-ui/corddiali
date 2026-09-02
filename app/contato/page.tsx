import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Contato" };

export default function Contato() {
  return (
    <main>
      <Header />
      <section className="section pt-36">
        <div className="container-x max-w-5xl">
          <div className="eyebrow">Contato</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Vamos tirar o seu projeto do papel?</h1>
          <p className="muted text-lg leading-8 max-w-3xl mt-6">
            Agende uma conversa consultiva presencial ou online para uma avaliação inicial do seu projeto ou terreno.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

  <a
    className="border border-white/10 p-8 hover:border-copper transition"
    href="https://wa.me/5549991360745"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="eyebrow">WhatsApp</div>
    <div className="text-2xl mt-4">Iniciar conversa</div>
    <p className="muted mt-3">(49) 99136-0745</p>
  </a>

  <div className="border border-white/10 p-8">
    <div className="eyebrow">Atendimento</div>
    <div className="text-2xl mt-4">Costa Esmeralda</div>
    <p className="muted mt-3">Itapema • Porto Belo • Balneário Camboriú</p>
  </div>

  <a
    href="https://www.instagram.com/corddiali/"
    target="_blank"
    rel="noopener noreferrer"
    className="border border-white/10 p-8 hover:border-copper transition"
  >
    <div className="eyebrow">Instagram</div>
    <div className="text-2xl mt-4">Acompanhe a Corddiali</div>
    <p className="muted mt-3">@corddiali</p>
  </a>

</div>
              <div className="text-2xl mt-4">Costa Esmeralda</div>
              <p className="muted mt-3">Itapema • Porto Belo • Balneário Camboriú</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
