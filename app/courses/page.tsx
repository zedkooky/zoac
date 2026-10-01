import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { COURSES, PERFECT_FOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scuba courses & prices",
  description: "Discover Scuba Diving K2,200, Try Scuba K1,500, Pond Scuba K2,500 (full day) and Open Water certification USD 550 at Lake Tanganyika.",
  alternates: { canonical: "/courses" },
};

export default function Courses() {
  return (
    <>
      <PageHero kicker="Courses & pricing" lines={["Learn to", <em key="e">breathe</em>, "underwater"]}
        lede="Safe, controlled and led by certified instructors — from a first taste of scuba to full Open Water certification."
        image="/img/pool-dsd.jpg" alt="Two divers sharing the OK signal underwater" />
      <section className="section">
        <div className="wrap">
          {COURSES.map((c) => (
            <article className="crow" key={c.slug} id={c.slug}>
              <div data-reveal>
                <h2 className="h3">{c.name}</h2>
                <p className="lede" style={{ marginTop: 16 }}>{c.blurb}</p>
              </div>
              <div data-reveal="100">
                <p className="eyebrow">Includes</p>
                <ul className="ticks" style={{ marginTop: 0 }}>{c.details.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
              <div data-reveal="200" style={{ minWidth: 190 }}>
                <div className="price" style={{ color: "var(--gold-dk)" }}>{c.price}<small style={{ color: "var(--stone)" }}>{c.unit}</small></div>
                <p style={{ marginTop: 22 }}><Link className="btn btn--dark" href={`/contact?topic=${encodeURIComponent(c.name)}`}>Enquire</Link></p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section dark">
        <div className="wrap split split--top">
          <div><p className="eyebrow" data-reveal>Perfect for</p><h2 className="h2" data-reveal="100">Everyone <em>curious</em></h2></div>
          <div>
            <p className="lede" data-reveal="150">Scuba sessions run in a pool at GOGO Fitness, or at your own pool — we bring the equipment, the instructors and the safety standards to you.</p>
            <div className="pills" data-reveal="250">{PERFECT_FOR.map((p) => <span className="pill" key={p}>{p}</span>)}</div>
          </div>
        </div>
      </section>
      <CtaBand title="Ready to try it?" />
    </>
  );
}
