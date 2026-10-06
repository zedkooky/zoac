import type { Metadata } from "next";
import Crumbs from "@/components/Crumbs";
import Related from "@/components/Related";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Technical & industrial training",
  description: "Underground and underwater mine rescue dive training, municipal water-rescue certification, equipment servicing and school and corporate programmes across Zambia.",
  alternates: { canonical: "/training" },
};

const CLIENTS = [
  { k: "Mining & industry", t: "Rescue-ready teams", d: "Copperbelt mining houses and industrial operators relying on certified underwater and underground rescue capability, serviced equipment, and compliance that holds up to audit." },
  { k: "Government & municipal", t: "Public safety capability", d: "Agencies and municipal services building in-house water-rescue competence, trained to internationally recognised standards rather than improvised locally." },
  { k: "Schools & corporates", t: "Outdoor leadership", d: "Discover Scuba sessions, term-long activity programmes and wilderness leadership expeditions, designed around the group rather than sold off a shelf." },
  { k: "Communities & conservation", t: "Capability & stewardship", d: "Local guide and dive-professional training in Mpulungu, youth outdoor access programmes, and Lake Tanganyika ecosystem monitoring alongside conservation researchers." },
];
const OFFER = ["Underground and underwater mine rescue dive training", "Confined-water and open-water rescue certification", "Equipment supply, servicing and compliance support", "Custom corporate and school wilderness leadership programmes"];

export default function Training() {
  return (
    <>
      <PageHero kicker="Technical & industrial" lines={["Rescue-ready,", <em key="e">to the</em>, "last detail"]}
        lede="The protocols that keep a mine rescue diver safe are the protocols behind a ten-year-old's first breath underwater."
        image="/img/gear.jpg" alt="Dive equipment laid out for a training day" />
      <Crumbs trail={[{ name: "Training & industry", href: "/training" }]} />
      <section className="section">
        <div className="wrap split split--top">
          <div><p className="eyebrow" data-reveal>What we deliver</p><h2 className="h2" data-reveal="100">Capability that <em>stays behind</em></h2></div>
          <div>
            <p className="lede" data-reveal="150">Most operators sell the trip. We also build the capability behind it — training the guides, divers and rescue teams that Zambia&apos;s adventure and industrial sectors depend on.</p>
            <ul className="ticks" data-reveal="250" style={{ marginTop: 32 }}>{OFFER.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section dark">
        <div className="wrap">
          <div className="head"><div><p className="eyebrow" data-reveal>Who we work with</p><h2 className="h2" data-reveal="100">Four clients, <em>one standard</em></h2></div></div>
          <div className="aud">
            {CLIENTS.map((c, i) => (
              <article key={c.k} data-reveal={String((i % 2) * 120)}><small>{c.k}</small><h3>{c.t}</h3><p>{c.d}</p></article>
            ))}
          </div>
        </div>
      </section>
      <Related keys={["hub", "kids", "courses", "expeditions", "about", "contact"]} />
      <CtaBand title="Certify your team." />
    </>
  );
}
