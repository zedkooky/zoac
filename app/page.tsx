import Link from "next/link";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import CustomPackageForm from "@/components/CustomPackageForm";
import FilmPlayer from "@/components/FilmPlayer";
import Credit from "@/components/Credit";
import { COURSES, VALUES, waLink } from "@/lib/site";

const MERCH = ["Polo shirts", "Tees", "Caps", "Steel bottles", "Canvas backpacks", "Enamel mugs", "Notebooks", "Paracord bracelets", "Patches & stickers"];
import { PHOTOS, unsplash, type Photo } from "@/lib/photos";

const EXPERIENCES: { n: string; t: string; d: string; img: string; alt?: string; href: string; photo?: Photo }[] = [
  { n: "01", t: "Scuba & snorkel", d: "Lake Tanganyika's clear freshwater reefs, cichlid gardens and granite walls.", img: "/img/gear.jpg", alt: "Scuba gear laid out ready for a dive on Lake Tanganyika", href: "/dive" },
  { n: "02", t: "Kayak & canoe", d: "Multi-day paddling routes on the Lower Zambezi.", img: unsplash(PHOTOS.river.id, 900), photo: PHOTOS.river, href: "/expeditions#kayak" },
  { n: "03", t: "Hike & trek", d: "Guided walks across the Muchinga Escarpment and Nyika Plateau.", img: unsplash(PHOTOS.walking.id, 900), photo: PHOTOS.walking, href: "/expeditions#trek" },
  { n: "04", t: "Off-road safari", d: "4x4 expeditions into national parks and remote wilderness.", img: unsplash(PHOTOS.drive.id, 900), photo: PHOTOS.drive, href: "/expeditions#safari" },
];

export default function Home() {
  return (
    <>
      <PageHero
        home
        kicker="Lake Tanganyika · Lusaka · Mpulungu"
        lines={["Adventure,", <em key="e">professionally</em>, "delivered."]}
        lede="Scuba diving, wilderness expeditions and technical rescue training across Zambia — built from a lake town outward."
        image="/img/hero-lake-poster.jpg"
        alt="Aerial view of a palm-fringed beach and clear water on the lakeshore"
        video="/video/hero-lake.mp4"
      >
        <Link className="btn" href="/courses">Try scuba · K2,200</Link>
        <Link className="btn btn--ghost" href="/expeditions">Explore expeditions</Link>
      </PageHero>
      <Marquee />

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow" data-reveal>About us</p>
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
              <article key={e.t} className="card" data-reveal={String(i * 120)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.img} alt={e.photo?.alt ?? e.alt ?? ""} loading="lazy" />
                <Link href={e.href} className="card-link" aria-label={e.t} />
                <div className="card__body"><span className="card__no">{e.n}</span><h3>{e.t}</h3><p>{e.d}</p></div>
                {e.photo && <Credit photo={e.photo} />}
              </article>
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
            <img data-parallax="0.07" src="/img/lakeside.jpg" alt="Guests relaxing on the shore of Lake Tanganyika at dusk" loading="lazy" />
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

      <section className="section" id="merch">
        <div className="wrap split">
          <div className="photo" style={{ aspectRatio: "1/1" }} data-reveal="fade">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-parallax="0.07" src="/img/merch.webp" alt="Forest-green branded merchandise laid out on wood: polo shirt, cap, steel bottle, canvas backpack, tees, notebooks, enamel mug, paracord bracelet, patch and sticker" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow" data-reveal>Merch</p>
            <h2 className="h2" data-reveal="100">Take the <em>wild</em> home</h2>
            <p className="lede" data-reveal="200" style={{ margin: "24px 0 30px" }}>Kit in our forest green, made for the boat, the trail and the drive home. Message us to order, or ask us to put together a team or school order.</p>
            <ul className="tags" data-reveal="250">{MERCH.map((m) => <li key={m}>{m}</li>)}</ul>
            <div className="hero__cta" data-reveal="300" style={{ marginTop: 36, alignItems: "center", gap: "14px 28px" }}>
              <a className="btn btn--dark" href={waLink("Hi Zambian Outdoors, I'd like to order some merch.")} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
              <Link className="link" href="/contact?topic=Merchandise">Bulk &amp; team orders →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section sand" id="custom-package">
        <div className="wrap split split--top">
          <div>
            <p className="eyebrow" data-reveal>Custom packages</p>
            <h2 className="h2" data-reveal="100">Design your own <em>adventure</em></h2>
            <p className="lede" data-reveal="200" style={{ marginTop: 24 }}>Combine a dive week on Lake Tanganyika with a Zambezi paddle, build a team retreat, or plan a family trip around the school holidays. Tell us what you have in mind and we&apos;ll come back with a tailored itinerary and quote.</p>
          </div>
          <div data-reveal="200"><CustomPackageForm /></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
