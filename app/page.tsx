import Link from "next/link";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import FilmPlayer from "@/components/FilmPlayer";
import { COURSES, VALUES } from "@/lib/site";

const EXPERIENCES = [
  { n: "01", t: "Scuba & snorkel", d: "Lake Tanganyika's clear freshwater reefs, cichlid gardens and granite walls.", img: "/img/gear.jpg", href: "/dive" },
  { n: "02", t: "Kayak & canoe", d: "Multi-day paddling routes on the Lower Zambezi.", img: "/img/sunset-boat.jpg", href: "/expeditions#kayak" },
  { n: "03", t: "Hike & trek", d: "Guided walks across the Muchinga Escarpment and Nyika Plateau.", img: "/img/market.jpg", href: "/expeditions#trek" },
  { n: "04", t: "Off-road safari", d: "4x4 expeditions into national parks and remote wilderness.", img: "/img/airfield.jpg", href: "/expeditions#safari" },
];

export default function Home() {
  return (
    <>
      <PageHero
        home
        kicker="Lake Tanganyika · Lusaka · Mpulungu"
        lines={["Adventure,", <em key="e">professionally</em>, "delivered."]}
        lede="Scuba diving, wilderness expeditions and technical rescue training across Zambia — built from a lake town outward."
        image="/img/sunset-boat.jpg"
        alt="A fishing canoe on Lake Tanganyika at sunset"
      >
        <Link className="btn" href="/courses">Try scuba · K2,200</Link>
        <Link className="btn btn--ghost" href="/expeditions">Explore expeditions</Link>
      </PageHero>
      <Marquee />

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow" data-reveal>About ZOAC</p>
            <h2 className="h2" data-reveal="100">A country defined by <em>water</em> and wilderness.</h2>
          </div>
          <div>
            <p className="lede" data-reveal="150">For years Zambia&apos;s adventure story was told everywhere except where it began. Founded in 2023 on the shores of Lake Tanganyika, we&apos;ve grown from a single dive outpost in Mpulungu into a national operator — owned, staffed and led by Zambians.</p>
            <div className="stats" data-reveal="250">
              <div className="stat"><b>2023</b><span>Founded on Lake Tanganyika</span></div>
              <div className="stat"><b>National</b><span>Operating footprint</span></div>
              <div className="stat"><b>100%</b><span>Zambian owned &amp; led</span></div>
            </div>
            <p style={{ marginTop: 36 }} data-reveal="300"><Link className="link arrow" href="/about">Our story</Link></p>
          </div>
        </div>
      </section>

      <section className="section sand">
        <div className="wrap">
          <div className="head">
            <div><p className="eyebrow" data-reveal>Adventure tourism</p><h2 className="h2" data-reveal="100">Four ways to <em>go wild</em></h2></div>
            <Link className="link arrow" href="/expeditions" data-reveal="150">All expeditions</Link>
          </div>
          <div className="cards">
            {EXPERIENCES.map((e, i) => (
              <Link key={e.t} href={e.href} className="card" data-reveal={String(i * 120)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.img} alt="" loading="lazy" />
                <div className="card__body"><span className="card__no">{e.n}</span><h3>{e.t}</h3><p>{e.d}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="head">
            <div><p className="eyebrow" data-reveal>Learn to dive</p><h2 className="h2" data-reveal="100">Your first breath <em>underwater</em></h2></div>
            <Link className="link arrow" href="/courses" data-reveal="150">Course details</Link>
          </div>
          <div className="courses">
            {COURSES.map((c, i) => (
              <article className="course" key={c.slug} data-reveal={String(i * 100)}>
                <h3>{c.name}</h3>
                <div className="price">{c.price}<small>{c.unit}</small></div>
                <p>{c.blurb}</p>
                <Link className="link arrow" href={`/contact?topic=${encodeURIComponent(c.name)}`}>Enquire</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section deep">
        <div className="wrap film">
          <FilmPlayer />
          <div>
            <p className="eyebrow" data-reveal>The film</p>
            <h2 className="h2" data-reveal="100">Discover the untouched <em>African wilderness.</em></h2>
            <p className="lede" data-reveal="200" style={{ marginTop: 24 }}>From the thunder of Victoria Falls to elephant herds at dusk and the coral-bright reefs of Lake Tanganyika — Zambia, in thirty seconds.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="photo arch" style={{ aspectRatio: "4/5" }} data-reveal="fade">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/lakeside.jpg" alt="Guests relaxing on the shore of Lake Tanganyika at dusk" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow" data-reveal>Lake Tanganyika</p>
            <h2 className="h2" data-reveal="100">25 mapped sites, <em>one deep blue lake</em></h2>
            <p className="lede" data-reveal="200" style={{ margin: "24px 0 36px" }}>From the sandy training bay and Cichlid Gardens to the 75 m South Wall — explore every site we dive, filter by depth and difficulty, and plan your trip.</p>
            <Link className="btn btn--dark" href="/dive#map" data-reveal="300">Open the dive map</Link>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap split split--top">
          <div>
            <p className="eyebrow" data-reveal>Training &amp; industry</p>
            <h2 className="h2" data-reveal="100">The capability <em>behind the trip</em></h2>
            <p className="lede" data-reveal="200" style={{ margin: "24px 0 36px" }}>We train the divers, guides and rescue teams that Zambia&apos;s mining, municipal and school sectors depend on — to the same protocols we use for a first-time diver.</p>
            <Link className="btn" href="/training" data-reveal="300">Training &amp; industry</Link>
          </div>
          <div className="values">
            {VALUES.slice(0, 2).map((v, i) => (
              <div className="value" key={v.n} data-reveal={String(i * 150)} style={{ gridColumn: "1 / -1" }}>
                <b>{v.n}</b><h3>{v.t}</h3><p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
