import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default function Project({
  params,
}: {
  params: { slug: string };
}) {
  const index = projects.findIndex((p) => p.slug === params.slug);

  if (index < 0) return notFound();

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main>
      <Header />

      <section className="pt-20">
        <div className="relative min-h-[78vh] flex items-end">
          <img
            src={p.image}
            alt={p.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="container-x relative z-10 pb-14">
            <div className="eyebrow">{p.category}</div>

            <h1 className="display text-5xl md:text-7xl mt-3">
              {p.title}
            </h1>

            <div className="mt-4 text-white/55">
              {p.location}
              {p.area ? ` • ${p.area}` : ""}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid md:grid-cols-[1.2fr_.8fr] gap-14">
          <div>
            <div className="eyebrow">Conceito</div>

            <p className="text-xl leading-9 mt-5 text-white/80">
              {p.description}
            </p>

            {p.slug === "casa-roma" ? (
              <div className="grid md:grid-cols-2 gap-4 mt-10">
                <img
                  src="/images/casa-roma-viva-park/casa-roma-02.jpeg"
                  alt="Casa Roma — Vivapark"
                  className="w-full aspect-[4/5] object-cover"
                />

                <img
                  src="/images/casa-roma-viva-park/casa-roma-03.jpeg"
                  alt="Casa Roma — Vivapark"
                  className="w-full aspect-[4/5] object-cover"
                />

                <img
                  src="/images/casa-roma-viva-park/casa-roma-04.jpeg"
                  alt="Casa Roma — Vivapark"
                  className="w-full aspect-[4/5] object-cover md:col-span-2"
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 mt-10">
                <div className="aspect-[4/5] bg-white/5 grid place-items-center text-white/30">
                  GALERIA — EDITORIAL
                </div>

                <div className="aspect-[4/5] bg-white/5 grid place-items-center text-white/30">
                  GALERIA — EDITORIAL
                </div>
              </div>
            )}
          </div>

          <aside className="border-l border-white/10 pl-8">
            <div className="eyebrow">Destaques</div>

            <div className="mt-6 space-y-4">
              {p.highlights.map((x) => (
                <div key={x} className="rule pt-4">
                  {x}
                </div>
              ))}
            </div>

            <div className="eyebrow mt-12">Desafios técnicos</div>
            <p className="muted mt-4">
              Adicionar informações específicas deste projeto.
            </p>

            <div className="eyebrow mt-10">Soluções executadas</div>
            <p className="muted mt-4">
              Adicionar informações específicas deste projeto.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="container-x">
          <div className="eyebrow">Próximo projeto</div>

          <Link
            href={`/projetos/${next.slug}`}
            className="text-2xl font-medium inline-block mt-4"
          >
            {next.title} →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
