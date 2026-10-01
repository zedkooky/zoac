import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Expeditions: kayak, trek & off-road safari",
  description: "Guided kayaking on the Lower Zambezi, trekking on the Muchinga Escarpment and Nyika Plateau, and off-road 4x4 safari expeditions across Zambia.",
  alternates: { canonical: "/expeditions" },
};

const BLOCKS = [
  { id: "kayak", t: "Kayak & canoe", where: "Lower Zambezi", d: "Multi-day kayaking and canoeing routes along one of Africa's great rivers, guided by people who know every channel and sandbank.", img: "/img/sunset-boat.jpg", alt: "A canoe on the water at sunset" },
  { id: "trek", t: "Hiking & trekking", where: "Muchinga Escarpment · Nyika Plateau", d: "Guided hiking and trekking across high, remote country — rolling plateau grassland, escarpment ridgelines and wide, empty skies.", img: "/img/market.jpg", alt: "Green hills rising from Lake Tanganyika" },
  { id: "safari", t: "Off-road safari", where: "National parks & remote wilderness", d: "4x4 expeditions into national parks and wilderness areas most visitors never reach, run to the same safety-first standard as our dive operations.", img: "/img/airfield.jpg", alt: "Aircraft on a Zambian airstrip at dawn" },
  { id: "custom", t: "Schools & corporate programmes", where: "Anywhere in Zambia", d: "Custom wilderness leadership programmes, Discover Scuba sessions and term-long activity programmes — designed around your group, not sold off a shelf.", img: "/img/kitesurf.jpg", alt: "A kitesurfer on open water" },
];

export default function Expeditions() {
  return (
    <>
      <PageHero kicker="Guided expeditions" lines={["Zambia,", <em key="e">beyond</em>, "the postcard"]}
        lede="Rivers, escarpments and bush — led by Zambian guides who grew up in them." image="/img/market.jpg" alt="Wooded hills above Lake Tanganyika" />
      <section className="section">
        <div className="wrap">
          {BLOCKS.map((b, i) => (
            <article className="split" key={b.id} id={b.id} style={{ marginBottom: "clamp(64px,8vw,120px)", direction: i % 2 ? "rtl" : "ltr" }}>
              <div className="photo" style={{ aspectRatio: "4/3" }} data-reveal="fade">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.img} alt={b.alt} loading="lazy" />
              </div>
              <div style={{ direction: "ltr" }}>
                <p className="eyebrow" data-reveal>{b.where}</p>
                <h2 className="h2" data-reveal="100">{b.t}</h2>
                <p className="lede" data-reveal="200" style={{ margin: "22px 0 32px" }}>{b.d}</p>
                <Link className="link arrow" href={`/contact?topic=${encodeURIComponent(b.t)}`} data-reveal="300">Enquire</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Plan your expedition." />
    </>
  );
}
