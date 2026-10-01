import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & enquiries",
  description: "Plan a dive, expedition or training programme with ZOAC. WhatsApp, call or send an enquiry.",
  alternates: { canonical: "/contact" },
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  return (
    <>
      <PageHero kicker="Contact" lines={["Let's plan", <em key="e">the next one</em>]}
        lede="Tell us what you have in mind — a first dive, a river expedition, or a rescue team that needs certifying." image="/img/sunset-boat.jpg" alt="Canoe on Lake Tanganyika at sunset" />
      <section className="section">
        <div className="wrap split split--top">
          <div data-reveal><EnquiryForm defaultTopic={topic?.slice(0, 80)} /></div>
          <div data-reveal="150">
            <p className="eyebrow">Talk to us directly</p>
            <div className="contact-card"><b><a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsapp.label}</a></b><span>Fastest reply</span>{SITE.whatsapp.display}</div>
            {SITE.people.map((p) => <div className="contact-card" key={p.name}><b>{p.name}</b><span>{p.role}</span><a href={`tel:${p.tel}`}>{p.phone}</a></div>)}
            <div className="contact-card"><b>Email</b><span>General enquiries</span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
            <div className="contact-card"><b>Lusaka</b><span>Headquarters</span>Dive base at Isanga Bay, Mpulungu, Lake Tanganyika</div>
          </div>
        </div>
      </section>
    </>
  );
}
