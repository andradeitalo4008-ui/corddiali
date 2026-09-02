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

             <div className="mt-8 max-w-4xl">
        <p className="muted text-lg leading-8">
          A Corddiali é uma construtora especializada na construção de residências
          de alto padrão, para clientes que buscam transformar seus projetos em
          casas que traduzam seu estilo, patrimônio e forma de viver.
        </p>

        <p className="muted mt-7 text-lg leading-8">
          Atuamos principalmente em empreendimentos e bairros planejados de alto
          padrão, como Viva Park e All Wert Resort, conduzindo cada projeto com
          planejamento, gestão e execução personalizada.
        </p>

        <p className="muted mt-7 text-lg leading-8">
          Nosso trabalho começa muito antes da primeira etapa da obra. A partir do
          projeto arquitetônico, estruturamos toda a execução: planejamento,
          compras, fornecedores, cronograma, compatibilização, acompanhamento e
          controle de cada etapa.
        </p>

        <p className="muted mt-7 text-lg leading-8">
          Tudo isso dentro do nosso método Turnkey (chaves na mão), com preço
          fechado.
        </p>

        <p className="muted mt-7 text-lg leading-8">
          Na prática, significa ter uma única equipe responsável por conduzir a
          construção do início à entrega, reduzindo a complexidade para o cliente
          e trazendo mais previsibilidade para um investimento de alto valor.
        </p>

        <p className="muted mt-7 text-lg leading-8">
          Hoje, nossa experiência reúne obras entregues e projetos residenciais em
          andamento, consolidando a Corddiali em um mercado onde qualidade
          construtiva precisa caminhar junto com gestão, confiança e atenção aos
          detalhes.
            </p>
          </div>

          {/* Guilherme */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-20">
            <div className="overflow-hidden">
              <img
                src="/images/foto-guilherme.jpeg"
                alt="Eng. Guilherme De Carli"
              className="w-full h-auto object-contain"
              />
            </div>

            <div className="md:pl-6">
              <div className="eyebrow">Eng. Guilherme De Carli</div>

              <h2 className="display text-3xl md:text-5xl mt-4">
                Sócio & Diretor Técnico — UDESC
              </h2>

              <p className="muted mt-6 leading-8">
                 Engenheiro Civil com 16 anos de experiência no setor da construção civil,
          formado pela Universidade do Estado de Santa Catarina (UDESC). Iniciou sua
          carreira em Joinville (SC), atuando na gestão e execução de edifícios
          residenciais, onde desenvolveu sua base técnica e gerencial. Ao longo de sua
          trajetória, participou de obras residenciais, comerciais e industriais em
          diversas regiões do Brasil, acumulando amplo conhecimento em diferentes
          sistemas construtivos e métodos executivos. Entre seus principais trabalhos,
          destacam-se reformas e ampliações para grandes marcas, como unidades da rede
          Walmart e pontos de refino da Petrobras, além da construção de casas e
          edifícios de alto padrão em Santa Catarina. Há cinco anos, estabeleceu-se no
          litoral catarinense, com foco em Porto Belo e região da Costa Esmeralda,
          contribuindo diretamente para o desenvolvimento de empreendimentos de destaque
          e consolidando a atuação da Corddiali como referência em execução de obras e
          reformas de alta qualidade.
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
                 Com 28 anos e residente em Itapema há mais de duas décadas, Luisa Corrêa tem
          sua trajetória fortemente ligada ao mercado imobiliário e da construção civil,
          setor no qual sua família atua desde 1998. Empreendedora por natureza, é sócia
          e administradora de uma empresa familiar que se dedica à gestão e ao
          desenvolvimento de novos negócios e investimentos. Ao longo de sua carreira,
          acompanhou de perto o trabalho de seu pai, Auri Corrêa, adquirindo experiência
          em diferentes segmentos do setor, como fabricação de artefatos de cimento
          (pavers), incorporação de edifícios residenciais pela LA Incorporadora,
          construção de casas geminadas e administração de imóveis próprios. Sua vivência
          prática e visão estratégica no mercado imobiliário contribuíram para a
          consolidação da Corddiali, onde atua na gestão executiva e no relacionamento
          com clientes e parceiros, garantindo uma operação sólida, transparente e
          pautada pela excelência.
              </p>
            </div>

            <div className="overflow-hidden order-1 md:order-2">
              <img
                src="/images/foto-luiza.jpeg"
                alt="Luisa Corrêa"
               className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
