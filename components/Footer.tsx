import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <div className="tracking-[.28em] text-sm">CORDDIALI</div>
          <div className="text-[10px] mt-2 text-white/45">Construções personalizadas de alto padrão.</div>
        </div>
        <div className="flex flex-wrap gap-5 text-[11px] uppercase tracking-[.12em] text-white/60">
          <Link href="/projetos">Projetos</Link>
          <Link href="/metodo">Método</Link>
          <Link href="/corddiali">Corddiali</Link>
          <Link href="/contato">Contato</Link>
        </div>
        <div className="text-[10px] text-white/40">Itapema • Porto Belo • Balneário Camboriú</div>
      </div>
    </footer>
  );
}
