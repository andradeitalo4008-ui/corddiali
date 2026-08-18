import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const hero = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85";
const interior = "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=80";
const methodImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img src={hero} alt="Arquitetura residencial contemporânea" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-x relative z-10 pb-20 pt-36">
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">Engenharia • Gestão • Confiança</div>
            <h1 className="display text-5xl md:text-7xl lg:text-8xl">
              Projetos extraordinários exigem execução à altura.
            </h1>
            <p className="mt-6 max-w-xl text-white/75 text-base md:text-lg">
              Construções personalizadas de alto padrão com engenharia, gestão integral e preço fechado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/metodo" className="btn btn-primary">Conheça nosso método <ArrowRight size={14}/></Link>
              <Link href="/projetos" className="btn">Explorar projetos <ArrowRight size={14}/></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div className="eyebrow">Corddiali</div>
            <h2 className="display text-4xl md:text-6xl mt-4">Construir não deveria significar conviver com incertezas.</h2>
            <p className="muted mt-6 max-w-xl">
              Na Corddiali, toda a complexidade da obra fica sob uma única responsabilidade: a nossa.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={interior} alt="Interior contemporâneo de alto padrão" className="min-h-[420px] object-cover" />
          </Reveal>
        </div>

        <div className="container-x mt-16 grid md:grid-cols-3 gap-8">
          {[
            ["01", "Orçamento incontrolável", "Custos adicionais, desperdícios e mudanças podem comprometer significativamente o orçamento original."],
            ["02", "Atrasos", "Cronogramas frágeis e gestão fragmentada aumentam o risco de atrasos e perda de previsibilidade."],
            ["03", "Gestão cansativa", "O proprietário acaba assumindo decisões e problemas que deveriam ser responsabilidade de uma estrutura profissional."]
          ].map(([n,t,d]) => (
            <Reveal key={n}>
              <div className="copper-line pt-6">
                <div className="text-5xl font-serif text-copper">{n}</div>
                <h3 className="mt-5 uppercase tracking-[.12em] text-sm">{t}</h3>
                <p className="muted mt-3 text-sm leading-6">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-[#0e0e0e]">
        <div className="container-x grid md:grid-cols-[1.1fr_.9fr] gap-14 items-center">
          <Reveal>
            <div className="eyebrow">O Método Corddiali</div>
            <h2 className="display text-5xl md:text-7xl mt-4">Turnkey.<br/>Do projeto às chaves.</h2>
            <p className="muted mt-6 max-w-xl">
              A Corddiali assume integralmente a execução da obra, coordenando engenharia, fornecedores, cronograma, orçamento e acabamentos.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              {[
                ["Preço Fechado", "Valor definido contratualmente conforme o escopo estabelecido."],
                ["Gestão 360°", "Engenharia, fornecedores, execução e acabamentos sob uma única gestão."],
                ["Cronograma", "Planejamento executivo e acompanhamento contínuo das etapas."],
                ["Transparência", "Relatórios periódicos para acompanhar a evolução da obra."]
              ].map(([t,d]) => (
                <div key={t} className="card-line pt-5">
                  <CheckCircle2 size={18} className="text-copper"/>
                  <h3 className="mt-3 text-sm uppercase tracking-[.12em]">{t}</h3>
                  <p className="muted text-sm mt-2 leading-6">{d}</p>
                </div>
              ))}
            </div>
            <Link href="/metodo" className="btn mt-8">Entenda o método <ArrowRight size={14}/></Link>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={methodImage} alt="Detalhes arquitetônicos" className="min-h-[560px] object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow">Obras que traduzem nossa engenharia</div>
              <h2 className="display text-4xl md:text-6xl mt-3">Projetos em destaque.</h2>
            </div>
            <Link href="/projetos" className="hidden md:flex btn">Ver todos <ArrowRight size={14}/></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * .05}>
                <Link href={`/projetos/${p.slug}`} className="project-card block overflow-hidden">
                  <img src={p.image} alt={p.title} />
                  <div className="pt-4">
                    <div className="text-lg">{p.title}</div>
                    <div className="text-[10px] mt-2 uppercase tracking-[.14em] text-white/50">{p.category} • {p.location}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-14 bg-[#0d0d0d]">
        <div className="container-x grid md:grid-cols-3 gap-8 text-center">
          {[
            ["+50.000 m²", "Construídos"],
            ["16 anos", "de expertise técnica"],
            ["100%", "foco em previsibilidade"]
          ].map(([n,l]) => (
            <div key={n}>
              <div className="font-serif text-4xl md:text-6xl text-copper">{n}</div>
              <div className="text-[11px] mt-3 uppercase tracking-[.16em] text-white/55">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="eyebrow">Nosso processo</div>
          <h2 className="display text-4xl md:text-6xl mt-3">Um caminho claro, do início à entrega.</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {[
              ["01","Alinhamento","Expectativas, terreno, escopo e orçamento."],
              ["02","Planejamento","Compatibilização, contrato Turnkey e cronograma."],
              ["03","Execução","Gestão diária, engenharia, qualidade e relatórios."],
              ["04","Entrega","Vistoria, acabamentos e imóvel pronto para utilização."]
            ].map(([n,t,d]) => (
              <div key={n} className="copper-line pt-5">
                <div className="text-copper">{n}</div>
                <div className="mt-4 uppercase tracking-[.12em] text-sm">{t}</div>
                <p className="muted text-sm mt-3 leading-6">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#0f0f0f]">
        <div className="container-x grid md:grid-cols-2 gap-8">
          <div className="border border-white/10 p-8">
            <div className="eyebrow">Engenharia e tradição</div>
            <h3 className="display text-3xl mt-4">Eng. Guilherme De Carli</h3>
            <p className="muted mt-5 leading-7">
              Sócio & Diretor Técnico — UDESC. 16 anos de experiência na construção civil executiva, com atuação em obras corporativas, industriais e residenciais de alto padrão.
            </p>
          </div>
          <div className="border border-white/10 p-8">
            <div className="eyebrow">Gestão executiva e comercial</div>
            <h3 className="display text-3xl mt-4">Luisa Corrêa</h3>
            <p className="muted mt-5 leading-7">
              Tradição familiar no mercado imobiliário catarinense desde 1998, com foco em relacionamento, governança e transparência em cada etapa.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x text-center">
          <div className="eyebrow">Próximo passo</div>
          <h2 className="display text-4xl md:text-6xl mt-4">Seu projeto merece começar com previsibilidade.</h2>
          <p className="muted mt-5">Converse diretamente com a Corddiali para uma avaliação inicial do seu projeto ou terreno.</p>
          <Link href="/contato" className="btn btn-primary mt-8">Agendar uma conversa <ArrowRight size={14}/></Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
