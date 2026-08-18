export default function Comparison() {
  const traditional = ["Orçamento aberto", "Aditivos", "Diversos responsáveis", "Gestão fragmentada", "Maior envolvimento do proprietário"];
  const corddiali = ["Preço fechado conforme escopo", "Gestão integral", "Engenharia centralizada", "Acompanhamento executivo", "Previsibilidade"];

  return (
    <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
      <div className="bg-[#0b0b0b] p-8 md:p-12">
        <div className="eyebrow">Modelo tradicional</div>
        <div className="mt-8 space-y-5">
          {traditional.map(x => <div key={x} className="rule pt-4 text-white/55">{x}</div>)}
        </div>
      </div>
      <div className="bg-[#111] p-8 md:p-12">
        <div className="eyebrow">Corddiali</div>
        <div className="mt-8 space-y-5">
          {corddiali.map(x => <div key={x} className="copper-rule pt-4">{x}</div>)}
        </div>
      </div>
    </div>
  );
}
