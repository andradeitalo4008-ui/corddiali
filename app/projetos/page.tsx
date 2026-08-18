import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjetosPage() {
  return (
    <main>
      <Header />
      <section className="section pt-36">
        <div className="container-x">
          <div className="eyebrow">Portfólio</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Obras que traduzem nossa engenharia.</h1>
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {projects.map((p) => (
              <Link key={p.slug} href={`/projetos/${p.slug}`} className="project-card block">
                <img src={p.image} alt={p.title} />
                <div className="pt-4">
                  <h2 className="text-2xl">{p.title}</h2>
                  <div className="text-[10px] mt-2 uppercase tracking-[.14em] text-white/50">{p.category} • {p.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
