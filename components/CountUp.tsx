"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// O número final já vem no HTML (Google e quem tem JS lento veem o valor certo).
// A animação só roda no navegador, quando o bloco entra na tela.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [value, setValue] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight;
    if (reduce || alreadyVisible) return;
    setValue(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{value.toLocaleString("pt-BR")}{suffix}</span>;
}
