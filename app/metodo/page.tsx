import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MetodoPage() {
  return (
    <main>
      <Header />
      <section className="section pt-36">
        <div className="container-x max-w-5xl">
          <div className="eyebrow">O Método Corddiali</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Turnkey. Do projeto às chaves.</h1>
          <p className="muted mt-6 text-lg leading-8 max-w-3xl">
            A Corddiali assume integralmente a execução da obra, coordenando engenharia, fornecedores, cronograma, orçamento e acabamentos sob uma única gestão.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              ["Preço Fechado", "Valor definido em contrato conforme o escopo estabelecido, reduzindo incertezas durante a execução."],
              ["Gestão 360°", "Engenharia, fornecedores, execução e acabamentos centralizados sob uma única coordenação."],
              ["Cronograma", "Planejamento executivo e acompanhamento contínuo das etapas da construção."],
              ["Transparência", "Relatórios periódicos de evolução, imagens e atualização do cronograma."]
            ].map(([t,d]) => (
              <div key={t} className="border border-white/10 p-8">
                <div className="text-copper uppercase tracking-[.12em] text-sm">{t}</div>
                <p className="muted mt-4 leading-7">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
