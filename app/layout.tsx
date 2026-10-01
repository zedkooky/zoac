import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { SITE } from "@/lib/site";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import RevealObserver from "@/components/RevealObserver";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Zambian Outdoor Adventure Company — Scuba, expeditions & rescue training", template: "%s · ZOAC" },
  description:
    "Scuba diving, wilderness expeditions and technical rescue training across Zambia — built on Lake Tanganyika and led by Zambians.",
  alternates: { canonical: "/" },
  openGraph: { siteName: SITE.name, type: "website", images: ["/img/sunset-boat.jpg"] },
  icons: { icon: "/img/logo.png", apple: "/img/logo.png" },
};
export const viewport: Viewport = { themeColor: "#08161f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Flags JS early so reveal-hidden states never flash, and skips the preloader on repeat visits. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('zoac-pre'))document.documentElement.classList.add('ready','skip-pre')}catch(e){}",
          }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <style>{`.skip-pre .pre{display:none}`}</style>
      </head>
      <body>
        <Preloader />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsApp />
        <RevealObserver />
      </body>
    </html>
  );
}
