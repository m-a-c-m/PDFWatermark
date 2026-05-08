import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/pdf-watermark";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marca de Agua PDF Online Gratis — Añadir Watermark",
    template: "%s | PDF Watermark",
  },
  description:
    "Añade una marca de agua de texto a todas las páginas de un PDF. Elige posición, tamaño, opacidad y color. 100% en el navegador, sin registro, sin subir archivos.",
  keywords: [
    "marca de agua pdf online gratis",
    "añadir watermark pdf",
    "pdf watermark gratis",
    "pdf watermark online",
    "agregar marca agua pdf",
    "add watermark to pdf free",
    "pdf text watermark",
    "watermark pdf gratis",
    "marca agua documento pdf",
    "stamp pdf online",
  ],
  authors: [{ name: "Miguel Ángel Colorado Marin", url: "https://miguelacm.es" }],
  creator: "Miguel Ángel Colorado Marin",
  openGraph: {
    title: "Marca de Agua PDF Online Gratis — Añadir Watermark",
    description:
      "Añade marca de agua de texto a todas las páginas del PDF. Elige posición, tamaño y opacidad. Sin registro. Por MACM.",
    url: SITE_URL,
    siteName: "PDF Watermark — MACM",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marca de Agua PDF Online Gratis",
    description: "Añade marca de agua a tu PDF. Sin registro. Por MACM · miguelacm.es",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href="https://miguelacm.es" />
        <meta name="author" content="Miguel Ángel Colorado Marin" />
        <meta name="copyright" content="Miguel Ángel Colorado Marin — miguelacm.es" />
      </head>
      <body className="antialiased">
        {children}
        <footer className="pb-8 text-center text-xs text-text-muted/40">
          ⚡ por{" "}
          <a
            href="https://miguelacm.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            MACM · miguelacm.es
          </a>
          {" · "}
          <a
            href="https://github.com/m-a-c-m/PDFWatermark"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            Código abierto
          </a>
        </footer>
      </body>
    </html>
  );
}
