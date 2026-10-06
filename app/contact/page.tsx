import Link from "next/link";
import type { Metadata } from "next";
import Crumbs from "@/components/Crumbs";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & enquiries",
  description: "Plan a dive, expedition, custom adventure package or training programme in Zambia. WhatsApp, call or send an enquiry.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero kicker="Contact" lines={["Let's plan", <em key="e">the next one</em>]}
        lede="Tell us what you have in mind — a first dive, a river expedition, or a rescue team that needs certifying." image="/img/sunset-boat.jpg" alt="Canoe on Lake Tanganyika at sunset" />
      <Crumbs trail={[{ name: "Contact", href: "/contact" }]} />
      <section className="section">
        <div className="wrap split split--top">
          <div data-reveal><EnquiryForm /></div>
          <div data-reveal="150">
            <p className="eyebrow">Talk to us directly</p>
            <div className="contact-card"><b><a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsapp.label}</a></b><span>Fastest reply</span>{SITE.whatsapp.display}</div>
            {SITE.people.map((p) => <div className="contact-card" key={p.name}><b>{p.name}</b><span>{p.role}</span><a href={`tel:${p.tel}`}>{p.phone}</a></div>)}
            <div className="contact-card"><b>Email</b><span>General enquiries</span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
            <div className="contact-card"><b><Link href="/#custom-package">Design a custom package →</Link></b><span>Bespoke trips</span>Mix diving, paddling, trekking and safari into one itinerary</div>
            <div className="contact-card"><b>Lusaka</b><span>Headquarters</span>Dive base at Isanga Bay, Mpulungu, Lake Tanganyika</div>
          </div>
        </div>
      </section>
    </>
  );
}
