"use client";
import { motion } from "framer-motion";

const steps = [
  ["01", "ALINHAMENTO", ["Expectativas", "Terreno", "Escopo", "Orçamento"]],
  ["02", "PLANEJAMENTO", ["Compatibilização", "Contrato Turnkey", "Cronograma executivo"]],
  ["03", "EXECUÇÃO", ["Gestão diária", "Engenharia", "Controle de qualidade", "Relatórios periódicos"]],
  ["04", "ENTREGA", ["Vistoria", "Acabamentos", "Imóvel pronto para utilização"]]
] as const;

export default function Timeline() {
  return (
    <div className="relative mt-12">
      <div className="absolute left-0 right-0 top-4 h-px bg-white/10 hidden md:block" />
      <motion.div
        className="absolute left-0 top-4 h-px bg-copper hidden md:block"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      />
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map(([n, title, items]) => (
          <div key={n} className="relative">
            <div className="w-8 h-8 rounded-full border border-copper bg-ink grid place-items-center text-[10px] text-copper relative z-10">{n}</div>
            <div className="mt-5 text-sm tracking-[.12em]">{title}</div>
            <div className="mt-3 text-sm text-white/50 leading-6">
              {items.map(item => <div key={item}>{item}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
