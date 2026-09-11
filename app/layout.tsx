import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Corddiali | Construções Personalizadas de Alto Padrão",
    template: "%s | Corddiali"
  },
  description:
    "Construções personalizadas de alto padrão com engenharia, gestão integral e preço fechado em Itapema, Porto Belo e Balneário Camboriú.",
  metadataBase: new URL("https://www.corddiali.com.br"),
  openGraph: {
    title: "Corddiali | Construções Personalizadas",
    description: "Do projeto às chaves. Sem incertezas.",
    type: "website",
    locale: "pt_BR"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17442865573"
          strategy="afterInteractive"
        />

        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17442865573');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
