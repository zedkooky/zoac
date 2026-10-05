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
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `Scuba Diving & Outdoor Adventures in Zambia | ${SITE.name}`, template: `%s | ${SITE.name}` },
  description:
    "Scuba diving, wilderness expeditions and technical rescue training across Zambia — built on Lake Tanganyika and led by Zambians.",
  alternates: { canonical: "/" },
  openGraph: { siteName: SITE.name, type: "website", locale: "en_GB", images: [{ url: "/img/sunset-boat.jpg", alt: "A fishing canoe on Lake Tanganyika at sunset" }] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/img/logo.png", apple: "/img/logo.png" },
};
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE.url}/#org`,
  name: SITE.name,
  alternateName: ["ZOAC", "Zambian Outdoor Adventure Co."],
  url: `${SITE.url}/`,
  logo: `${SITE.url}/img/logo.png`,
  image: `${SITE.url}/img/sunset-boat.jpg`,
  description: "Scuba diving, wilderness expeditions and technical rescue training across Zambia, from Lake Tanganyika to the Lower Zambezi.",
  email: SITE.email,
  telephone: SITE.people[1].tel,
  foundingDate: "2023",
  address: { "@type": "PostalAddress", addressLocality: "Lusaka", addressCountry: "ZM" },
  areaServed: { "@type": "Country", name: "Zambia" },
  contactPoint: SITE.people.map((p) => ({ "@type": "ContactPoint", name: p.name, telephone: p.tel, contactType: "customer service", areaServed: "ZM", availableLanguage: "English" })),
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
      </head>
      <body>
        <Preloader />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsApp />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
