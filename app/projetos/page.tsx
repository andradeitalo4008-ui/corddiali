import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata = { title: "Projetos" };

export default function Projetos() {
  return (
    <main>
      <Header />
      <section className="section pt-36">
        <div className="container-x">
          <div className="eyebrow">Portfólio</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Obras que traduzem nossa engenharia.</h1>
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {projects.map(p => (
              <Link href={`/projetos/${p.slug}`} key={p.slug}>
                <img className="project-image" src={p.image} alt={p.title} />
                <div className="py-4">
                  <h2 className="text-2xl">{p.title}</h2>
                  <div className="text-[10px] uppercase tracking-[.14em] text-white/45 mt-2">{p.category} • {p.location}</div>
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
