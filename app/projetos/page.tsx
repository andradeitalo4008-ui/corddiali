import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata = { title: "Projetos" };

export default function Projetos() {
  return (
    <main>
      <Header />

      <section
        className="section pt-36 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(4, 9, 18, 0.30), rgba(4, 9, 18, 0.48)), url('/images/fundo-projetos-corddiali.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* suaviza a entrada logo abaixo do cabeçalho */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#07101d]/80 to-transparent" />

        <div className="container-x relative z-10">
          <div className="eyebrow">Portfólio</div>

          <h1 className="display text-5xl md:text-7xl mt-4">
            Obras que traduzem nossa engenharia.
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {projects.map((p) => (
              <Link href={`/projetos/${p.slug}`} key={p.slug}>
                <div className="group">
                  <img
                    className="project-image"
                    src={p.image}
                    alt={p.title}
                  />

                  <div className="py-4">
                    <h2 className="text-2xl">{p.title}</h2>

                    <div className="text-[10px] uppercase tracking-[.14em] text-white/45 mt-2">
                      {p.category} • {p.location}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* transição suave para o rodapé */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#07101d]/65 to-[#07101d]" />
      </section>

      <Footer />
    </main>
  );
}
