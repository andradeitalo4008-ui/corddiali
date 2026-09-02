import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import Comparison from "@/components/Comparison";

export const metadata = { title: "Método Corddiali" };

export default function Metodo() {
  return (
    <main>
      <Header />
     <section
  className="section pt-36"
  style={{
    backgroundImage: "url('/images/fundo-turnkey.jpeg')",
    backgroundSize: "100% auto",
    backgroundPosition: "center top",
    backgroundRepeat: "repeat-y",
  }}
>
        <div className="container-x">
          <div className="eyebrow">Método Corddiali</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Turnkey. Do projeto às chaves.</h1>
          <p className="muted max-w-3xl text-lg leading-8 mt-6">
           Transformamos projetos em realidade com a segurança de um contrato a preço fechado: cuidamos de cada etapa da engenharia à entrega final, sem surpresas no cronograma ou no orçamento.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              ["Preço Fechado", "Valor definido contratualmente conforme o escopo estabelecido."],
              ["Gestão 360°", "Engenharia, fornecedores, execução e acabamentos sob uma única gestão."],
              ["Cronograma", "Planejamento executivo e acompanhamento contínuo."],
              ["Transparência", "Relatórios periódicos de evolução, imagens e cronograma."]
            ].map(([t, d]) => (
              <div key={t} className="border border-white/10 p-7">
                <div className="text-copper uppercase tracking-[.12em] text-xs">{t}</div>
                <p className="muted mt-4 text-sm leading-6">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#0f0f0f]">
        <div className="container-x"><div className="eyebrow">Processo</div><Timeline /></div>
      </section>

      <section className="section">
        <div className="container-x"><Comparison /></div>
      </section>

      <Footer />
    </main>
  );
}
