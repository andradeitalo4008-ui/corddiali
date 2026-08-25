"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-white/10" : "bg-transparent"}`}>
      <div className="container-x h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
  <img
  src="/images/LOGOTIPO/corddiali-logo.png"
    alt="Corddiali"
    className="h-12 w-auto object-contain"
  />
</Link>

        <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[.14em] text-white/78">
          <Link href="/projetos">Projetos</Link>
          <Link href="/metodo">Método</Link>
          <Link href="/corddiali">Corddiali</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/contato" className="btn">Fale com a Corddiali</Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-20 bg-black z-40">
          <div className="container-x py-12 grid gap-8 text-3xl font-serif">
            <Link href="/projetos" onClick={() => setOpen(false)}>PROJETOS</Link>
            <Link href="/metodo" onClick={() => setOpen(false)}>MÉTODO</Link>
            <Link href="/corddiali" onClick={() => setOpen(false)}>CORDDIALI</Link>
            <Link href="/contato" onClick={() => setOpen(false)}>CONTATO</Link>
          </div>
        </div>
      )}
    </header>
  );
}
