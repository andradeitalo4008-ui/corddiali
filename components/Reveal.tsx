"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  // Quem ativou "reduzir movimento" no celular vê o conteúdo direto, sem animação.
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px 12% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay: Math.min(delay, 0.1), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
