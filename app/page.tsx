import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Timeline from "@/components/Timeline";
import Comparison from "@/components/Comparison";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function Home() {
  return (
    <main
  className="bg-cover bg-center bg-fixed"
  style={{ backgroundImage: "url('/images/fundo-marmore-corddiali.jpeg')" }}
>
      <Header />

    <section className="relative min-h-screen flex items-end overflow-hidden">
  <img
    src="/images/home/08-bethania-lages-inicial.webp"
    alt="Projeto residencial Corddiali"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,0.88)_0%,rgba(7,7,7,0.72)_34%,rgba(7,7,7,0.28)_62%,rgba(7,7,7,0.08)_100%)]" />

  <div className="container-x relative z-10 pb-16 pt-40 md:pb-20 md:pt-44">
    <div className="max-w-[760px]">
      <Reveal>
        <div className="mb-16">
          <div className="text-[11px] md:text-xs uppercase tracking-[0.34em] text-[#c7a46a]">
            Construtora no sistema
          </div>

          <div className="mt-3 text-2xl md:text-4xl uppercase tracking-[0.38em] font-light text-[#c7a46a]">
            Turnkey
          </div>

          <div className="mt-6 h-px w-24 bg-[#c7a46a]/80" />
        </div>

        <h1 className="max-w-[720px] text-[46px] leading-[0.98] md:text-[72px] lg:text-[82px] font-light tracking-[-0.035em] text-white">
          Projetos extraordinários
          <br />
          exigem{" "}
          <span className="italic text-[#c7a46a]">
            construção
          </span>
          <br />
          à altura.
        </h1>

        <p className="mt-8 max-w-xl text-base md:text-lg leading-8 text-white/72">
          Construções personalizadas de alto padrão com engenharia,
          gestão integral e preço fechado.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5 md:gap-8">
          <Link
            className="inline-flex items-center gap-4 border border-[#c7a46a] px-6 py-4 text-[11px] uppercase tracking-[0.14em] text-white transition hover:bg-[#c7a46a]/10"
            href="/projetos"
          >
            Conheça nossos projetos
            <ArrowRight size={15} />
          </Link>

          <Link
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-white"
            href="/metodo"
          >
            <span>Nosso método</span>
            <span className="h-px w-16 bg-[#c7a46a] transition-all group-hover:w-20" />
          </Link>
        </div>
      </Reveal>
    </div>
  </div>
      <div
  className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 z-[5]"
  style={{
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(16,24,32,0.35) 45%, #101820 100%)",
  }}
/>
</section>

     <section className="section">
  <div className="container-x grid md:grid-cols-2 gap-12 md:gap-16 items-start">
    
    <Reveal>
      <div className="eyebrow">Corddiali</div>

      <h2 className="display text-4xl md:text-6xl mt-4">
        Construção de casas de alto padrão em Santa Catarina
      </h2>

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

        <p className="mt-10 text-xl leading-8">
          Você idealiza a casa.{" "}
          <span className="text-copper">
            A Corddiali assume a responsabilidade por construí-la.
          </span>
        </p>
      </div>
    </Reveal>

   <Reveal delay={0.1}>
  <div className="flex justify-center md:justify-start md:pt-60 md:-ml+24">
    <img
      src="/images/imagen-ceos.JPEG"
      className="w-full max-w-[480px] h-auto object-cover"
      alt="Guilherme De Carli e Luisa Corrêa — Corddiali"
    />
  </div>
</Reveal>

</div>
</section>

<section className="section pt-0">
        <div className="container-x">
          <div className="eyebrow">O desafio</div>
          <h2 className="display text-4xl md:text-6xl mt-4 max-w-4xl">O modelo tradicional transfere o risco da obra para o proprietário.</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-14">
            {[
              ["01", "ORÇAMENTO INCONTROLÁVEL", "Custos adicionais, desperdícios e mudanças durante a execução podem comprometer significativamente o orçamento original."],
              ["02", "ATRASOS", "Cronogramas frágeis e gestão fragmentada de fornecedores aumentam o risco de atrasos."],
              ["03", "GESTÃO CANSATIVA", "O proprietário acaba assumindo decisões e problemas que deveriam ser responsabilidade de uma estrutura profissional de engenharia."]
            ].map(([n, t, d]) => (
              <Reveal key={n}>
                <div className="copper-rule pt-6">
                  <div className="font-serif text-6xl text-copper">{n}</div>
                  <h3 className="mt-6 text-sm tracking-[.14em]">{t}</h3>
                  <p className="muted mt-4 text-sm leading-7">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

     <section
  className="section relative overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/images/fundo-turnkey.jpeg')" }}
>
        <div className="container-x">
          <div className="eyebrow">O Método Corddiali</div>
          <h2 className="display text-5xl md:text-7xl mt-4">Turnkey.<br />Do projeto às chaves.</h2>
         <p className="muted mt-6 max-w-3xl text-lg leading-8">
  Transformamos projetos em realidade com a segurança de um contrato a preço fechado: cuidamos de cada etapa da engenharia à entrega final, sem surpresas no cronograma ou no orçamento.
</p>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {[
              ["Preço Fechado", "Valor definido contratualmente conforme o escopo estabelecido."],
              ["Gestão 360°", "Engenharia, fornecedores, execução e acabamentos coordenados por uma única gestão."],
              ["Cronograma", "Planejamento executivo e acompanhamento contínuo das etapas da construção."],
              ["Transparência", "Relatórios periódicos permitem acompanhar a evolução da obra sem precisar administrá-la."]
            ].map(([t, d]) => (
              <div key={t} className="rule pt-5">
                <h3 className="text-sm uppercase tracking-[.12em]">{t}</h3>
                <p className="muted mt-3 text-sm leading-6">{d}</p>
              </div>
            ))}
          </div>
          <Link href="/metodo" className="btn mt-9">Entenda o método <ArrowRight size={14} /></Link>
        </div>
      </section>

    <section className="relative min-h-[82vh] grid place-items-center overflow-hidden">
  <img
    src="/fundo-golfe.jpeg"
    className="absolute inset-0 h-full w-full object-cover"
    alt="Campo de golfe em cenário paradisíaco"
  />

  <div className="absolute inset-0 bg-black/10" />

  <div className="container-x relative z-10 text-center">
    <h2 className="display text-4xl md:text-7xl max-w-4xl mx-auto">
      Sua única tarefa é imaginar como quer viver.
    </h2>

    <p className="mt-5 text-xl text-white/75">
      Da execução, nós cuidamos.
    </p>
  </div>
</section>
      <section className="section">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="eyebrow">Projetos</div>
              <h2 className="display text-4xl md:text-6xl mt-3">Obras que traduzem nossa engenharia.</h2>
            </div>
            <Link href="/projetos" className="hidden md:flex btn">Ver todos os projetos <ArrowRight size={14} /></Link>
          </div>

          <div className="editorial-grid mt-12">
            {projects.slice(0, 4).map((p, i) => (
              <Link key={p.slug} href={`/projetos/${p.slug}`} className={`${i % 3 === 0 ? "md:col-span-7" : "md:col-span-5"} block overflow-hidden`}>
                <img src={p.image} alt={p.title} className="project-image" />
                <div className="py-4">
                  <div className="text-xl">{p.title}</div>
                  <div className="text-[10px] mt-2 uppercase tracking-[.14em] text-white/45">{p.category} • {p.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-16 bg-[#0d0d0d]">
        <div className="container-x grid md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="font-serif text-5xl md:text-7xl text-copper">+<CountUp end={50000} /> m²</div>
            <div className="mt-3 text-[10px] uppercase tracking-[.16em] text-white/45">Construídos</div>
          </div>
          <div>
            <div className="font-serif text-5xl md:text-7xl text-copper"><CountUp end={16} /> anos</div>
            <div className="mt-3 text-[10px] uppercase tracking-[.16em] text-white/45">de expertise técnica</div>
          </div>
          <div>
            <div className="font-serif text-5xl md:text-7xl text-copper"><CountUp end={100} suffix="%" /></div>
            <div className="mt-3 text-[10px] uppercase tracking-[.16em] text-white/45">foco em previsibilidade</div>
          </div>
        </div>
      </section>

     <section className="section">
  <div className="container-x">
    <div className="eyebrow">Engenharia e tradição</div>

    {/* GUILHERME */}
    <div className="grid md:grid-cols-[1.35fr_0.65fr] gap-10 md:gap-16 mt-8 items-start">
      <div>
        <div className="text-copper text-xs uppercase tracking-[.14em]">
          Guilherme De Carli — Sócio
        </div>

        <h3 className="display text-3xl md:text-5xl mt-4">
          Sócio & Diretor Técnico — UDESC
        </h3>

        <p className="muted mt-5 leading-7">
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

        <div className="mt-8 border border-white/10 p-6 md:p-8 inline-block">
          <div className="text-copper text-3xl md:text-5xl font-semibold">
            + de 25.000 m²
          </div>
          <div className="text-xs uppercase tracking-[.16em] text-white/60 mt-2">
            de obras gerenciadas
          </div>
        </div>
      </div>

      <div className="w-full">
        <img
          src="/images/foto-guilherme.jpeg"
          alt="Guilherme De Carli"
          className="w-full aspect-[3/4] object-cover object-top"
        />
      </div>
    </div>

    {/* LUISA */}
    <div className="grid md:grid-cols-[0.65fr_1.35fr] gap-10 md:gap-16 mt-20 md:mt-28 items-start">
      <div className="w-full">
        <img
          src="/images/foto-luiza.jpeg"
          alt="Luisa Corrêa"
          className="w-full aspect-[3/4] object-cover object-top"
        />
      </div>

      <div>
        <div className="text-copper text-xs uppercase tracking-[.14em]">
          Luisa Corrêa — Sócia
        </div>

        <h3 className="display text-3xl md:text-5xl mt-4">
          Gestão Executiva e Comercial
        </h3>

        <p className="muted mt-5 leading-7">
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
    </div>
  </div>
</section>
  <section
  className="section relative overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/images/fundo-processo-corddiali.jpeg')" }}
>
  <div className="absolute inset-0 bg-black/10" />

  <div className="container-x relative z-10">
    <div className="eyebrow">Processo Corddiali</div>

    <h2 className="display text-4xl md:text-6xl mt-3">
      Um caminho claro, do início à entrega.
    </h2>

    <Timeline />
  </div>
</section>

      <section className="section">
        <div className="container-x">
          <div className="eyebrow">Modelo de execução</div>
          <h2 className="display text-4xl md:text-6xl mt-3 mb-12">Tradicional × Corddiali</h2>
          <Comparison />
        </div>
      </section>

     <section
  className="section bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/fundo-verde-corddiali.jpeg')",
  }}
>
        <div className="container-x grid md:grid-cols-2 gap-14 items-center">
      <img src="/images/excelencia-tecnica-corddiali.jpeg" alt="Execução técnica Corddiali" className="min-h-[520px] object-cover" />
          <div>
            <div className="eyebrow">Excelência técnica</div>
            <h2 className="display text-4xl md:text-6xl mt-4">O padrão está nos bastidores.</h2>
            <div className="mt-8 space-y-6">
              {[
                ["Corpo técnico qualificado", "Engenheiros responsáveis pela supervisão e acompanhamento das obras."],
                ["Fornecedores homologados", "Seleção criteriosa de profissionais especializados em materiais, marcenaria, pedras, esquadrias e automação."],
                ["Comunicação ativa", "Relatórios periódicos com evolução da obra, imagens e cronograma."],
                ["Pós-entrega", "Suporte técnico após a conclusão da construção."]
              ].map(([t, d]) => (
                <div key={t} className="rule pt-5">
                  <div className="text-sm uppercase tracking-[.12em]">{t}</div>
                  <p className="muted mt-2 text-sm leading-6">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="eyebrow">Depoimentos</div>
          <h2 className="display text-4xl md:text-6xl mt-3">A confiança permanece depois da entrega.</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <blockquote className="border border-white/10 p-8">
              <div className="quote-mark">“</div>
              <p className="text-lg leading-8 text-white/75">
                Mais do que uma empresa competente, ética, correta e organizada, a Corddiali realizou um sonho. Somos muito gratos por essa parceria.
              </p>
              <footer className="mt-6 text-[10px] uppercase tracking-[.14em] text-copper">Proprietário Adega Vino — Balneário Camboriú</footer>
            </blockquote>
            <blockquote className="border border-white/10 p-8">
              <div className="quote-mark">“</div>
              <p className="text-lg leading-8 text-white/75">
                Hoje, fico tranquilo sabendo que a obra está sendo executada com excelência, com pessoas comprometidas e de confiança.
              </p>
              <footer className="mt-6 text-[10px] uppercase tracking-[.14em] text-copper">Sócio Proprietário — Smart Living Container</footer>
            </blockquote>
          </div>
        </div>
      </section>

        <section className="relative min-h-[72vh] grid place-items-center overflow-hidden">
  <img
    src="/images/fundo-projeto.jpeg"
    className="absolute inset-0 h-full w-full object-cover"
    alt="Projeto arquitetônico Corddiali"
  />

  <div className="container-x relative z-10 text-center">
          <div className="eyebrow">Próximo passo</div>
          <h2 className="display text-4xl md:text-7xl mt-4">Seu projeto merece começar com previsibilidade.</h2>
          <p className="muted mt-5">Converse diretamente com a Corddiali para uma avaliação inicial do seu projeto ou terreno.</p>
          <Link href="/contato" className="btn btn-primary mt-8">Agendar uma conversa <ArrowRight size={14} /></Link>
          <div className="mt-5 text-[10px] tracking-[.14em] uppercase text-white/45">Itapema • Porto Belo • Balneário Camboriú</div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
