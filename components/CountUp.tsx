"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(end * p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{value.toLocaleString("pt-BR")}{suffix}</span>;
}
