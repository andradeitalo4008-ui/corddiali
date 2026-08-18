import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Corddiali | Construções Personalizadas de Alto Padrão",
    template: "%s | Corddiali"
  },
  description: "Construções personalizadas de alto padrão com engenharia, gestão integral e preço fechado em Itapema, Porto Belo e Balneário Camboriú.",
  metadataBase: new URL("https://www.corddiali.com.br"),
  openGraph: {
    title: "Corddiali | Construções Personalizadas",
    description: "Do projeto às chaves. Sem incertezas.",
    type: "website",
    locale: "pt_BR"
  },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
