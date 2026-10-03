import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import DiveMapLoader from "@/components/DiveMapLoader";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Scuba diving on Lake Tanganyika",
  description: "Dive, snorkel and freedive Lake Tanganyika from Mpulungu: cichlid gardens, granite boulder reefs, deep walls and technical sites. Interactive dive-site map.",
  alternates: { canonical: "/dive" },
};

export default function Dive() {
  return (
    <>
      <PageHero kicker="Mpulungu · Lake Tanganyika" lines={["Dive the", <em key="e">deep blue</em>, "lake"]}
        lede="One of the world's oldest and deepest freshwater lakes — warm, gin-clear and teeming with endemic cichlids."
        image="/img/gear.jpg" alt="Dive tanks, BCDs and wetsuits laid out ready for a day on the lake">
        <Link className="btn" href="#map">See the dive map</Link>
        <Link className="btn btn--ghost" href="/courses">Learn to dive</Link>
      </PageHero>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow" data-reveal>From first breath to technical</p>
            <h2 className="h2" data-reveal="100">Sites for every <em>depth</em></h2>
          </div>
          <div className="lede" data-reveal="150">
            <p>Our home base at Isanga Bay has a sandy training bay for first-timers, shallow cichlid gardens and boulder reefs for open-water divers, and sheer walls plunging past 60 m for advanced and technical teams. Snorkellers and freedivers have protected lagoons and a competition-depth line site.</p>
          </div>
        </div>
      </section>

      <section className="section dark" id="map" style={{ scrollMarginTop: 0 }}>
        <div className="wrap">
          <div className="head">
            <div><p className="eyebrow" data-reveal>Dive-site map</p><h2 className="h2" data-reveal="100">Explore every <em>site</em></h2></div>
          </div>
          <div data-reveal="fade"><DiveMapLoader /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="photo" style={{ aspectRatio: "4/3" }} data-reveal="fade">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-parallax="0.07" src="/img/pool-dsd.jpg" alt="Instructor and student sharing the OK signal underwater in a pool" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow" data-reveal>Never dived?</p>
            <h2 className="h2" data-reveal="100">Start in the <em>pool</em></h2>
            <p className="lede" data-reveal="200" style={{ margin: "24px 0 36px" }}>No experience required. Our Discover Scuba Diving session takes you from a safety briefing to your first breath underwater in a controlled environment, with certified instructors beside you.</p>
            <Link className="btn btn--dark" href="/courses" data-reveal="300">Courses &amp; prices</Link>
          </div>
        </div>
      </section>
      <CtaBand title="Book your dive." />
    </>
  );
}
