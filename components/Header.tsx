"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 border border-copper flex items-center justify-center text-copper text-xs">C</div>
          <div>
            <div className="tracking-[.28em] text-sm">CORDDIALI</div>
            <div className="text-[9px] tracking-[.16em] text-white/50">CONSTRUÇÕES PERSONALIZADAS</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[.14em] text-white/75">
          <Link href="/projetos">Projetos</Link>
          <Link href="/metodo">Método</Link>
          <Link href="/corddiali">Corddiali</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/contato" className="btn">Fale com a Corddiali</Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="container-x py-6 grid gap-5 text-sm uppercase tracking-[.14em]">
            <Link href="/projetos" onClick={() => setOpen(false)}>Projetos</Link>
            <Link href="/metodo" onClick={() => setOpen(false)}>Método</Link>
            <Link href="/corddiali" onClick={() => setOpen(false)}>Corddiali</Link>
            <Link href="/contato" onClick={() => setOpen(false)}>Contato</Link>
          </div>
        </div>
      )}
    </header>
  );
}
