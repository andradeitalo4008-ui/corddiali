import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import Comparison from "@/components/Comparison";

export const metadata = {
  title: "Método Corddiali",
};

export default function Metodo() {
  return (
    <main>
      <Header />

      {/* HERO — TURNKEY */}
      <section
        className="section pt-36"
        style={{
          backgroundImage: "url('/images/fundo-turnkey.jpeg')",
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
        }}
      >
        <div className="container-x">
          <div className="eyebrow">Método Corddiali</div>

          <h1 className="display text-5xl md:text-7xl mt-4 max-w-5xl">
            Turnkey. Do projeto às chaves.
          </h1>

          <p className="muted max-w-3xl text-lg leading-8 mt-6">
            Transformamos projetos em realidade por meio de uma gestão completa
            da construção, centralizando engenharia, planejamento, execução e
            acompanhamento da obra em uma única equipe.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              [
                "Preço Fechado",
                "Valor definido contratualmente conforme o escopo estabelecido.",
              ],
              [
                "Gestão 360°",
                "Engenharia, fornecedores, execução e acompanhamento sob uma única gestão.",
              ],
              [
                "Cronograma",
                "Planejamento executivo e acompanhamento contínuo de cada etapa.",
              ],
              [
                "Transparência",
                "Acompanhamento da evolução da obra com organização e previsibilidade.",
              ],
            ].map(([titulo, descricao]) => (
              <div
                key={titulo}
                className="border border-white/10 p-7"
              >
                <div className="text-copper uppercase tracking-[.12em] text-xs">
                  {titulo}
                </div>

                <p className="muted mt-4 text-sm leading-6">
                  {descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESCOPO INCLUSO */}
      <section className="section">
        <div className="container-x">
          <div className="eyebrow">Escopo de execução</div>

          <h2 className="display text-4xl md:text-6xl mt-4 max-w-4xl">
            O que a Corddiali assume na sua obra.
          </h2>

          <p className="muted max-w-3xl text-lg leading-8 mt-6">
            Nosso escopo contempla as principais etapas técnicas e executivas
            necessárias para transformar o projeto em uma obra concluída,
            coordenada e pronta para a etapa final de entrega.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {[
              "Projetos executivos",
              "Aprovação junto aos órgãos competentes",
              "Serviços iniciais e instalações provisórias",
              "Fundação",
              "Estrutura",
              "Etapa civil cinza",
              "Impermeabilizações",
              "Infraestrutura elétrica",
              "Infraestrutura hidrossanitária",
              "Infraestrutura de climatização",
              "Infraestrutura de comunicação",
              "Infraestrutura de automação",
              "Infraestrutura de gás",
              "Forros",
              "Telhados",
              "Gerenciamento da instalação de esquadrias e portas",
              "Gerenciamento de revestimentos e rodapés",
              "Gerenciamento da instalação de vasos e metais",
              "Pintura",
              "Limpeza final da obra",
            ].map((item, index) => (
              <div
                key={item}
                className="border border-white/10 p-6 flex gap-4"
              >
                <span className="text-copper text-xs tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-6">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSABILIDADES DO CLIENTE */}
      <section className="section bg-[#0b1119]">
        <div className="container-x">
          <div className="eyebrow">Personalização</div>

          <h2 className="display text-4xl md:text-6xl mt-4 max-w-4xl">
            O que permanece sob escolha do cliente.
          </h2>

          <p className="muted max-w-3xl text-lg leading-8 mt-6">
            Algumas decisões permanecem diretamente com o cliente para
            preservar a liberdade estética e permitir que cada residência
            reflita seu estilo, preferências e forma de viver.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {[
              [
                "Projeto arquitetônico criativo",
                "A concepção arquitetônica é desenvolvida pelo profissional escolhido pelo cliente.",
              ],
              [
                "Materiais de acabamento civil",
                "Os materiais são escolhidos e adquiridos pelo cliente durante a execução, de acordo com suas preferências.",
              ],
              [
                "Esquadrias e portas",
                "Modelos, materiais e acabamentos permanecem sob escolha do cliente.",
              ],
              [
                "Paisagismo externo",
                "O desenvolvimento e fornecimento do paisagismo não integram o escopo padrão.",
              ],
              [
                "Projeto luminotécnico",
                "A definição conceitual da iluminação fica a cargo do profissional escolhido pelo cliente.",
              ],
              [
                "Interiores e mobiliário",
                "Projeto de interiores, decoração e mobiliário não fazem parte do escopo de execução da Corddiali.",
              ],
            ].map(([titulo, descricao]) => (
              <div
                key={titulo}
                className="border border-white/10 p-7"
              >
                <h3 className="text-copper uppercase tracking-[.12em] text-xs">
                  {titulo}
                </h3>

                <p className="muted mt-4 text-sm leading-7">
                  {descricao}
                </p>
              </div>
            ))}
          </div>

          <p className="muted mt-10 max-w-4xl text-sm leading-7">
            Mesmo nos itens escolhidos diretamente pelo cliente, a Corddiali
            acompanha e gerencia a integração desses elementos à execução
            sempre que estiverem relacionados ao andamento da obra.
          </p>
        </div>
      </section>

      {/* PROCESSO */}
      <section
        className="section bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5, 10, 20, 0.55), rgba(5, 10, 20, 0.65)), url('/images/fundo-processo.jpeg')",
        }}
      >
        <div className="container-x">
          <div className="eyebrow">Processo</div>

          <h2 className="display text-4xl md:text-6xl mt-4 max-w-4xl mb-14">
            Um caminho claro, do início à entrega.
          </h2>

          <Timeline />
        </div>
      </section>

      {/* MODELO DE EXECUÇÃO */}
      <section className="section">
        <div className="container-x">
          <div className="eyebrow">Modelo de execução</div>

          <h2 className="display text-4xl md:text-6xl mt-4 mb-12">
            Tradicional × Corddiali
          </h2>

          <Comparison />
        </div>
      </section>

      {/* FECHAMENTO */}
      <section className="section bg-[#080d14]">
        <div className="container-x text-center">
          <div className="eyebrow">Corddiali</div>

          <h2 className="display text-4xl md:text-6xl mt-4 max-w-4xl mx-auto">
            Você idealiza a casa.
            <br />
            <span className="text-copper">
              Nós assumimos a responsabilidade por construí-la.
            </span>
          </h2>

          <p className="muted max-w-2xl mx-auto mt-7 leading-8">
            Uma única gestão para transformar projeto, engenharia e execução
            em uma obra conduzida com planejamento, controle e previsibilidade.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
