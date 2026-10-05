import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merch",
  description: "Zambian Outdoor Adventure Company merchandise in forest green: polo shirts, tees, caps, steel bottles, canvas backpacks, enamel mugs, notebooks, paracord bracelets, patches and stickers.",
  alternates: { canonical: "/merch" },
};

const RANGE = ["Polo shirts", "T-shirts", "Caps", "Steel water bottles", "Canvas backpacks", "Enamel mugs", "Notebooks", "Paracord bracelets", "Embroidered patches", "Stickers"];
const STEPS = [
  { t: "Choose your kit", d: "Pick the items you want from the range, with sizes and colours for clothing." },
  { t: "Message us", d: "Send your list on WhatsApp, or use the enquiry form for larger orders." },
  { t: "We confirm", d: "We come back with prices, availability and how you'll receive your order." },
];
const ORDER_MSG = "Hi Zambian Outdoor Adventure Company, I'd like to order some merch.";

export default function Merch() {
  return (
    <>
      <PageHero kicker="Merch" lines={["Take the", <><em>wild</em> home</>]}
        lede="Kit in our forest green, made for the boat, the trail and the drive home."
        image="/img/merch.webp" alt="Forest-green Zambian Outdoor Adventure Company merchandise laid out on wood">
        <a className="btn" href={waLink(ORDER_MSG)} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
        <Link className="btn btn--ghost" href="/contact?topic=Merchandise">Team &amp; school orders</Link>
      </PageHero>

      <section className="section">
        <div className="wrap split">
          <div className="photo" style={{ aspectRatio: "1/1" }} data-reveal="fade">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-parallax="0.07" src="/img/merch.webp" alt="Polo shirt, cap, steel bottle, canvas backpack, tees, notebooks, enamel mug, paracord bracelet, patch and sticker, all in forest green" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow" data-reveal>The range</p>
            <h2 className="h2" data-reveal="100">Ten pieces, <em>one green</em></h2>
            <ol className="range" data-reveal="200">
              {RANGE.map((r, i) => <li key={r}><span>{String(i + 1).padStart(2, "0")}</span>{r}</li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <p className="eyebrow" data-reveal>How to order</p>
          <h2 className="h2" data-reveal="100">Three steps, <em>no checkout</em></h2>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step" key={s.t} data-reveal={String(i * 140)}><b>{String(i + 1).padStart(2, "0")}</b><h3>{s.t}</h3><p>{s.d}</p></div>
            ))}
          </div>
          <div className="hero__cta" data-reveal="300" style={{ marginTop: 48 }}>
            <a className="btn" href={waLink(ORDER_MSG)} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section sand">
        <div className="wrap split">
          <div>
            <p className="eyebrow" data-reveal>Teams, schools &amp; events</p>
            <h2 className="h2" data-reveal="100">Kitting out <em>a group?</em></h2>
          </div>
          <div>
            <p className="lede" data-reveal="150">Dive teams, school trips, corporate retreats and event crews. Tell us the group size and what you need, and we&apos;ll put a bulk order together.</p>
            <Link className="btn btn--dark" href="/contact?topic=Merchandise" data-reveal="250" style={{ marginTop: 32 }}>Request a bulk order</Link>
          </div>
        </div>
      </section>
    </>
  );
}
