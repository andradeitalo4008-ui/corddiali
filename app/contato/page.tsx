import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contato",
};

export default function Contato() {
  return (
    <main>
      <Header />

      <section
        className="relative min-h-screen pt-36 pb-24 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/images/fundo-contato.jpeg')",
        }}
      >
        {/* Camada escura para melhorar a leitura */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="container-x relative z-10">
          <div className="max-w-5xl">
            <div className="eyebrow">Contato</div>

            <h1 className="display text-5xl md:text-6xl lg:text-7xl mt-4 leading-[0.95]">
              Vamos tirar o seu projeto do papel?
            </h1>

            <p className="muted text-lg leading-8 max-w-3xl mt-6">
              Agende uma conversa consultiva presencial ou online para uma
              avaliação inicial do seu projeto ou terreno.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            {/* WhatsApp */}
            <a
              href="https://wa.me/5549991360745"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 p-8 bg-black/10 backdrop-blur-sm hover:border-copper transition"
            >
              <div className="eyebrow">WhatsApp</div>

              <div className="text-2xl mt-4">
                Iniciar conversa
              </div>

              <p className="muted mt-3">
                Fale diretamente com nossa equipe.
              </p>
            </a>

            {/* Atendimento */}
            <div className="border border-white/20 p-8 bg-black/10 backdrop-blur-sm">
              <div className="eyebrow">
                Atendimento
              </div>

              <div className="text-2xl mt-4">
                Costa Esmeralda
              </div>

              <p className="muted mt-3">
                Itapema • Porto Belo • Balneário Camboriú
              </p>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/corddiali/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 p-8 bg-black/10 backdrop-blur-sm hover:border-copper transition"
            >
              <div className="eyebrow">
                Instagram
              </div>

              <div className="text-2xl mt-4">
                Acompanhe a Corddiali
              </div>

              <p className="muted mt-3">
                @corddiali
              </p>
            </a>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
