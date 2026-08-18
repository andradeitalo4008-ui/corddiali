import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main>
      <Header />
      <section className="pt-20">
        <div className="relative min-h-[72vh] flex items-end">
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="container-x relative z-10 pb-14">
            <div className="eyebrow">{project.category}</div>
            <h1 className="display text-5xl md:text-7xl mt-3">{project.title}</h1>
            <div className="mt-4 text-white/65">{project.location}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid md:grid-cols-[1.2fr_.8fr] gap-12">
          <div>
            <h2 className="display text-4xl">Sobre o projeto</h2>
            <p className="muted mt-6 text-lg leading-8">{project.description}</p>
          </div>
          <div className="border-l border-white/10 pl-8">
            <div className="eyebrow">Destaques</div>
            <ul className="mt-5 space-y-3 text-white/75">
              {project.highlights.map((h) => <li key={h}>— {h}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
