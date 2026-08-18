import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x grid md:grid-cols-[1fr_auto_auto] gap-8 items-center">
        <div>
          <div className="tracking-[.28em] text-sm">CORDDIALI</div>
          <div className="text-[10px] mt-2 text-white/40">Construções Personalizadas</div>
        </div>

        <div className="flex flex-wrap gap-5 text-[10px] uppercase tracking-[.12em] text-white/55">
          <Link href="/projetos">Projetos</Link>
          <Link href="/metodo">Método</Link>
          <Link href="/corddiali">Empresa</Link>
          <Link href="/contato">Contato</Link>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="WhatsApp">WhatsApp</a>
        </div>

        <div className="text-[10px] text-white/40">© {new Date().getFullYear()} Corddiali</div>
      </div>
    </footer>
  );
}
