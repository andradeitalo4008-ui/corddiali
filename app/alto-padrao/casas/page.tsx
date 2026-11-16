import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { projects } from "@/data/projects";
export const metadata: Metadata = {
  title: "Casas de alto padrão no litoral de SC",
  description:
    "Engenharia própria, preço fechado em contrato e acompanhamento à distância. Casas a partir de R$ 800 mil em Itapema, Porto Belo, Bombinhas, Balneário Camboriú e Tijucas.",
  alternates: { canonical: "/alto-padrao/casas" },
  openGraph: {
    title: "Casas de alto padrão no litoral de SC | Corddiali",
    description: "Do projeto às chaves, com prazo e custo sob controle.",
    url: "/alto-padrao/casas",
    images: [projects[0].image],
  },
};
export default function Casas() {
  const cases = [projects[0], projects[1], projects[2]];
  return (
    <main className="landing">
      <Header />
      <section className="relative pt-24 pb-12 md:pt-36 md:pb-20">
        <Image
          src={projects[0].image}
          alt="Casa Roma no Vivapark Porto Belo"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#080d13]/85" />
        <div className="container-x relative grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow">
              Corddiali • Obras a partir de R$ 800 mil
            </div>
            <h1 className="display text-4xl md:text-6xl mt-3">
              Casas de alto padrão no litoral de SC
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/90">
              Engenharia própria, prazo e custo sob controle.
            </p>
            <p className="mt-3 text-sm md:text-base text-white/80">
              Itapema, Porto Belo, Bombinhas, Balneário Camboriú e Tijucas.
              Acompanhe sua obra à distância, mesmo morando em outra cidade.
            </p>
            <div className="hidden lg:block">
              <a
                href="https://wa.me/5549991360745"
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-5"
              >
                Prefere falar pelo WhatsApp?
              </a>
            </div>
          </div>
          <ContactForm />
          <div className="lg:hidden">
            <a
              href="https://wa.me/5549991360745"
              target="_blank"
              rel="noopener noreferrer"
              className="btn justify-center"
            >
              Prefere falar pelo WhatsApp?
            </a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <div className="eyebrow">Experiência que se vê</div>
          <h2 className="display text-4xl md:text-5xl mt-3">
            Projetos que traduzem nosso cuidado.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {cases.map((p) => (
              <Link
                key={p.slug}
                href={`/projetos/${p.slug}`}
                className="border border-white/20 overflow-hidden"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="project-image"
                  />
                </div>
                <div className="p-6">
                  <div className="eyebrow">{p.location}</div>
                  <h3 className="display text-2xl mt-3">{p.title}</h3>
                  <p className="text-white/80 mt-3 text-sm leading-6">
                    {p.description}
                  </p>
                  <span className="btn mt-5">Conheça o projeto</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section rule">
        <div className="container-x">
          <div className="eyebrow">Como funciona</div>
          <h2 className="display text-4xl md:text-5xl mt-3">
            Do projeto às chaves.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              [
                "01",
                "Planejamento e engenharia",
                "Entendemos seu terreno e seu projeto para planejar cada etapa com engenharia própria.",
              ],
              [
                "02",
                "Preço fechado em contrato",
                "Escopo, prazo e custo definidos em contrato para construir com previsibilidade.",
              ],
              [
                "03",
                "Relatórios da obra",
                "Acompanhe a evolução com relatórios e atendimento à distância, até a entrega das chaves.",
              ],
            ].map(([n, title, text]) => (
              <article key={n} className="border border-white/20 p-6">
                <div className="eyebrow">{n}</div>
                <h3 className="display text-2xl mt-4">{title}</h3>
                <p className="text-white/80 leading-7 mt-3">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section rule">
        <div className="container-x">
          <div className="eyebrow">Depoimentos</div>
          <h2 className="display text-4xl md:text-5xl mt-3">
            A confiança permanece depois da entrega.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <blockquote className="border border-white/20 p-8">
              <div className="quote-mark">“</div>
              <p className="text-lg leading-8 mt-4">
                Mais do que uma empresa competente, ética, correta e organizada,
                a Corddiali realizou um sonho. Somos muito gratos por essa
                parceria.
              </p>
              <footer className="eyebrow mt-6">
                Proprietário Adega Vino — Balneário Camboriú
              </footer>
            </blockquote>
            <blockquote className="border border-white/20 p-8">
              <div className="quote-mark">“</div>
              <p className="text-lg leading-8 mt-4">
                Hoje, fico tranquilo sabendo que a obra está sendo executada com
                excelência, com pessoas comprometidas e de confiança.
              </p>
              <footer className="eyebrow mt-6">
                Sócio Proprietário — Smart Living Container
              </footer>
            </blockquote>
          </div>
          <a href="#formulario" className="btn btn-primary mt-10">
            Converse sobre seu projeto
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
