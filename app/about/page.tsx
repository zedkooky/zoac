import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { SITE, VALUES } from "@/lib/site";

export const metadata: Metadata = {
  title: "About ZOAC",
  description: "Founded in 2023 on the shores of Lake Tanganyika, the Zambian Outdoor Adventure Company is a Lusaka-headquartered adventure and outdoor training operator.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero kicker="Our story" lines={["Built from a", <em key="e">lake town</em>, "outward"]}
        lede="Founded in 2023 on the shores of Lake Tanganyika." image="/img/lakeside.jpg" alt="Dusk on the shore of Lake Tanganyika" />
      <section className="section">
        <div className="wrap split split--top">
          <div><p className="eyebrow" data-reveal>About us</p><h2 className="h2" data-reveal="100">Where adventure tourism meets <em>technical capability</em></h2></div>
          <div className="lede">
            <p data-reveal="100">The Zambian Outdoor Adventure Company is a Lusaka-headquartered adventure tourism and outdoor training operator, delivering scuba diving, hiking, kayaking, off-road safari and wilderness skills experiences across the country.</p>
            <p data-reveal="200" style={{ marginTop: 20 }}>We&apos;ve grown from a single dive outpost in Mpulungu into a national operator working with mining houses, government agencies, conservation partners and travellers from across the world.</p>
            <div className="stats" data-reveal="300">
              <div className="stat"><b>Lusaka</b><span>Headquarters</span></div>
              <div className="stat"><b>Mpulungu</b><span>Origin · Lake Tanganyika</span></div>
              <div className="stat"><b>3</b><span>Tourism · Mining · Education</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section deep">
        <div className="wrap split split--top">
          <div data-reveal><p className="eyebrow">Vision</p><p className="h3" style={{ fontWeight: 300 }}>A Zambia where the country&apos;s lakes, rivers, escarpments and bush are recognised as a world-class adventure destination in their own right — anchored by a generation of Zambian-trained guides, dive professionals and outdoor specialists equipped to lead it.</p></div>
          <div data-reveal="150"><p className="eyebrow">Mission</p><p className="h3" style={{ fontWeight: 300 }}>To unlock Zambia&apos;s outdoor and adventure potential through professionally guided, safety-first experiences — while building local capability in diving, wilderness skills and rescue training that outlasts any single trip or season.</p></div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="head"><div><p className="eyebrow" data-reveal>Core values</p><h2 className="h2" data-reveal="100">What we <em>stand for</em></h2></div></div>
          <div className="values">{VALUES.map((v, i) => <div className="value" key={v.n} data-reveal={String((i % 2) * 120)}><b>{v.n}</b><h3>{v.t}</h3><p>{v.d}</p></div>)}</div>
        </div>
      </section>
      <section className="section sand">
        <div className="wrap">
          <p className="eyebrow" data-reveal>Leadership</p>
          <div className="values">
            {SITE.people.map((p) => <div className="contact-card" key={p.name} data-reveal><b>{p.name}</b><span>{p.role}</span><a href={`tel:${p.tel}`}>{p.phone}</a></div>)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
