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
    <main>
      <Header />

      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img src="/images/hero.svg" className="absolute inset-0 h-full w-full object-cover" alt="Projeto arquitetônico Corddiali" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-x relative z-10 pb-20 pt-36">
          <div className="max-w-4xl">
            <Reveal>
              <div className="eyebrow">Engenharia • Gestão • Confiança</div>
              <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-4">
                Projetos extraordinários<br />exigem execução à altura.
              </h1>
              <p className="mt-6 max-w-xl text-white/72 text-lg">
                Construções personalizadas de alto padrão com engenharia, gestão integral e preço fechado.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <Link className="btn btn-primary" href="/metodo">Conheça nosso método <ArrowRight size={14} /></Link>
                <Link className="btn" href="/projetos">Explorar projetos <ArrowRight size={14} /></Link>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-6 right-8 text-[9px] uppercase tracking-[.2em] text-white/45">Scroll ↓</div>
      </section>

      <section className="section">
        <div className="container-x grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="eyebrow">Corddiali</div>
            <h2 className="display text-4xl md:text-6xl mt-4">Construir não deveria significar conviver com incertezas.</h2>
            <p className="muted mt-6 text-lg leading-8">
              Construções de alto padrão exigem centenas de decisões, fornecedores, cronogramas, negociações e controles técnicos.
            </p>
            <p className="mt-4 text-lg">
              Na Corddiali, toda essa complexidade fica sob uma única responsabilidade. <span className="text-copper">A nossa.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src="/images/manifesto.svg" className="min-h-[520px] object-cover" alt="Arquitetura contemporânea Corddiali" />
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

      <section className="section bg-[#0f0f0f] soft-noise">
        <div className="container-x">
          <div className="eyebrow">O Método Corddiali</div>
          <h2 className="display text-5xl md:text-7xl mt-4">Turnkey.<br />Do projeto às chaves.</h2>
          <p className="muted mt-6 max-w-3xl text-lg leading-8">
            A Corddiali assume integralmente a execução da obra, coordenando engenharia, fornecedores, cronograma, orçamento e acabamentos.
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
        <img src="/images/impacto.svg" className="absolute inset-0 h-full w-full object-cover" alt="Arquitetura de alto padrão" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container-x relative z-10 text-center">
          <h2 className="display text-4xl md:text-7xl max-w-4xl mx-auto">Sua única tarefa é imaginar como quer viver.</h2>
          <p className="mt-5 text-xl text-white/75">Da execução, nós cuidamos.</p>
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
          <div className="grid md:grid-cols-2 gap-10 mt-8">
            <div className="border border-white/10 p-8 md:p-10">
              <div className="text-copper text-xs uppercase tracking-[.14em]">Eng. Guilherme De Carli</div>
              <h3 className="display text-3xl mt-4">Sócio & Diretor Técnico — UDESC</h3>
              <p className="muted mt-5 leading-7">
                16 anos de experiência na construção civil executiva. Experiência em obras industriais e corporativas de grande porte, com histórico profissional relacionado a Walmart, Petrobras, Rogga S/A, M7, RFranco e De Carli.
              </p>
            </div>
            <div className="border border-white/10 p-8 md:p-10">
              <div className="text-copper text-xs uppercase tracking-[.14em]">Luisa Corrêa</div>
              <h3 className="display text-3xl mt-4">Sócia — Gestão Executiva e Comercial</h3>
              <p className="muted mt-5 leading-7">
                Tradição familiar no mercado imobiliário catarinense desde 1998, relacionamento regional consolidado e foco em governança, transparência e experiência do cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#0f0f0f]">
        <div className="container-x">
          <div className="eyebrow">Processo Corddiali</div>
          <h2 className="display text-4xl md:text-6xl mt-3">Um caminho claro, do início à entrega.</h2>
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

      <section className="section bg-[#0f0f0f]">
        <div className="container-x grid md:grid-cols-2 gap-14 items-center">
          <img src="/images/tecnica.svg" alt="Execução técnica Corddiali" className="min-h-[520px] object-cover" />
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
        <img src="/images/hero.svg" className="absolute inset-0 h-full w-full object-cover" alt="Projeto Corddiali" />
        <div className="absolute inset-0 bg-black/72" />
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
