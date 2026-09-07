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
        className="section pt-36 relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/fundo-turnkey.jpeg')",
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
        }}
      >
        <div className="container-x relative z-10">
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

        {/* TRANSIÇÃO PARA ESCOPO */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#07101d]/80 to-[#07101d]" />
      </section>


      {/* ESCOPO INCLUSO */}
      <section
        className="section relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(4, 10, 20, 0.72), rgba(4, 10, 20, 0.84)), url('/images/fundo-escopo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ENTRADA SUAVE */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#07101d] via-[#07101d]/80 to-transparent" />

        <div className="container-x relative z-10">
          <div className="eyebrow">Escopo de execução</div>

          <h2 className="display text-4xl md:text-6xl mt-4 max-w-4xl">
            O que a Corddiali assume na sua obra.
          </h2>

          <p className="muted max-w-3xl text-lg leading-8 mt-6">
            Da preparação da obra aos últimos detalhes da execução,
            centralizamos engenharia, planejamento e gestão para conduzir
            cada etapa da construção.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            <div className="border border-white/10 bg-black/20 backdrop-blur-sm p-8">
              <span className="text-copper text-xs tracking-[.2em]">01</span>
              <h3 className="text-xl mt-4">Preparação</h3>
              <p className="muted mt-4 leading-7">
                Projetos executivos • Aprovações junto aos órgãos competentes •
                Serviços iniciais • Instalações provisórias
              </p>
            </div>

            <div className="border border-white/10 bg-black/20 backdrop-blur-sm p-8">
              <span className="text-copper text-xs tracking-[.2em]">02</span>
              <h3 className="text-xl mt-4">Estrutura</h3>
              <p className="muted mt-4 leading-7">
                Fundação • Estrutura • Etapa civil cinza • Impermeabilizações •
                Telhados
              </p>
            </div>

            <div className="border border-white/10 bg-black/20 backdrop-blur-sm p-8">
              <span className="text-copper text-xs tracking-[.2em]">03</span>
              <h3 className="text-xl mt-4">Infraestrutura</h3>
              <p className="muted mt-4 leading-7">
                Elétrica • Hidrossanitária • Climatização • Comunicação •
                Automação • Gás
              </p>
            </div>

            <div className="border border-white/10 bg-black/20 backdrop-blur-sm p-8">
              <span className="text-copper text-xs tracking-[.2em]">04</span>
              <h3 className="text-xl mt-4">Finalização</h3>
              <p className="muted mt-4 leading-7">
                Forros • Acompanhamento de esquadrias e portas • Revestimentos •
                Rodapés • Vasos e metais • Pintura • Limpeza final
              </p>
            </div>
          </div>
        </div>

        {/* TRANSIÇÃO PARA PERSONALIZAÇÃO */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#07101d]/80 to-[#07101d]" />
      </section>


      {/* PERSONALIZAÇÃO */}
      <section
        className="section relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,10,20,0.48), rgba(5,10,20,0.58)), url('/images/metodo-personalizacao.png')",
        }}
      >
        {/* ENTRADA SUAVE */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#07101d] via-[#07101d]/80 to-transparent" />

        <div className="container-x relative z-10">
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
                className="border border-white/10 bg-black/10 backdrop-blur-sm p-7"
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

        {/* TRANSIÇÃO PARA PROCESSO */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#07101d]/75 to-[#07101d]" />
      </section>


      {/* PROCESSO */}
      <section
        className="section relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,10,20,0.48), rgba(5,10,20,0.58)), url('/images/metodo-processo.png')",
        }}
      >
        {/* ENTRADA SUAVE */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#07101d] via-[#07101d]/75 to-transparent" />

        <div className="container-x relative z-10">
          <div className="eyebrow">Processo</div>

          <h2 className="display text-4xl md:text-6xl mt-4 max-w-4xl mb-14">
            Um caminho claro, do início à entrega.
          </h2>

          <Timeline />
        </div>

        {/* TRANSIÇÃO PARA MODELO */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#07101d]/75 to-[#07101d]" />
      </section>


      {/* MODELO + FECHAMENTO — FUNDO CONTÍNUO */}
      <div
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,10,20,0.50), rgba(5,10,20,0.58)), url('/images/metodo-modelo-execucao.png')",
        }}
      >
        {/* ENTRADA SUAVE */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#07101d] via-[#07101d]/75 to-transparent" />


        {/* MODELO DE EXECUÇÃO */}
        <section className="section relative">
          <div className="container-x relative z-10">
            <div className="eyebrow">Modelo de execução</div>

            <h2 className="display text-4xl md:text-6xl mt-4 mb-12">
              Tradicional × Corddiali
            </h2>

            <Comparison />
          </div>
        </section>


        {/* TRANSIÇÃO INTERNA SUAVE */}
        <div className="relative h-32 md:h-48 -my-16 z-0 bg-gradient-to-b from-transparent via-[#07101d]/35 to-transparent pointer-events-none" />


        {/* FECHAMENTO */}
        <section className="section relative">
          <div className="container-x relative z-10 text-center py-12 md:py-20">
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
      </div>

      <Footer />
    </main>
  );
}
