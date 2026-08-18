import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corddiali | Construções Personalizadas de Alto Padrão",
  description:
    "Construções personalizadas de alto padrão com engenharia, gestão integral e preço fechado.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
