import type { Metadata } from "next";
import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import AnswerBlock from "@/components/AnswerBlock";
import Faq from "@/components/Faq";
import Related from "@/components/Related";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { COURSES, GROUP_MAX, INSTRUCTORS, LUSAKA_VENUES, PERFECT_FOR, SITE } from "@/lib/site";

const priceOf = (p: string) => ({ priceCurrency: p.startsWith("USD") ? "USD" : "ZMW", price: p.replace(/[^\d.]/g, "") });
const COURSES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: COURSES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: c.name,
      description: c.blurb,
      provider: { "@id": `${SITE.url}/#org` },
      typicalAgeRange: `${c.minAge}-`,
      educationalLevel: "Beginner",
      offers: { "@type": "Offer", category: "Paid", availability: c.comingSoon ? "https://schema.org/PreOrder" : "https://schema.org/InStock", url: `${SITE.url}/courses/`, ...priceOf(c.price) },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        location: c.slug === "open-water" ? "Lake Tanganyika, Mpulungu, Zambia" : "Lusaka, Zambia",
        instructor: INSTRUCTORS.map((i) => ({ "@type": "Person", name: i.name, jobTitle: i.role })),
      },
    },
  })),
};

export const metadata: Metadata = {
  title: "Scuba courses & prices",
  description: "Scuba courses in Zambia with PADI instructors: Try Scuba K1,500 (age 6+), Discover Scuba Diving K2,200 (age 10+), Pond Scuba K2,500 full day. No swimming needed, max 4 per group. PADI Open Water coming soon.",
  alternates: { canonical: "/courses" },
};

export default function Courses() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSES_SCHEMA) }} />
      <PageHero kicker="Courses & pricing" lines={["Learn to", <em key="e">breathe</em>, "underwater"]}
        lede="Safe, controlled and led by certified instructors — from a first taste of scuba to full Open Water certification."
        image="/img/pool-dsd.jpg" alt="Two divers sharing the OK signal underwater" />
      <Crumbs trail={[{ name: "Courses & prices", href: "/courses" }]} />
      <AnswerBlock
        question="What scuba courses can you do in Zambia?"
        answer={`The Zambian Outdoor Adventure Company offers three beginner scuba experiences in Zambia, all led by PADI-certified instructors: Try Scuba (K1,500, from age 6), Discover Scuba Diving (K2,200, from age 10) and Pond Scuba (K2,500 for a full day, from age 10). No swimming ability is needed and groups are capped at ${GROUP_MAX} people. A PADI Open Water Diver course at Lake Tanganyika is coming soon.`}
        facts={[
          ["Instructors", <>PADI-certified ({INSTRUCTORS.map((i) => i.name).join(" & ")})</>],
          ["Prices", "K1,500 – K2,500 per person"],
          ["Duration", "3–4 hours (Try Scuba, Discover Scuba)"],
          ["Minimum age", "6 (Try Scuba) · 10 (others)"],
          ["Swimming", "Not required"],
          ["Group size", `Maximum ${GROUP_MAX}`],
          ["Lusaka venues", `${LUSAKA_VENUES.slice(0, 3).join(", ")}, or your own pool`],
          ["More", <Link href="/scuba-diving-zambia">Scuba diving in Zambia guide</Link>],
        ]}
      />
      <section className="section">
        <div className="wrap">
          {COURSES.map((c) => (
            <article className="crow" key={c.slug} id={c.slug}>
              <div data-reveal>
                <h2 className="h3">{c.name}</h2>
                <p className="lede" style={{ marginTop: 16 }}>{c.blurb}</p>
                <ul className="cmeta">
                  <li><b>Duration</b>{c.duration}</li>
                  <li><b>Min. age</b>{c.minAge}</li>
                  <li><b>Group</b>Max {GROUP_MAX}</li>
                  <li><b>Swimming</b>{c.swimming}</li>
                </ul>
              </div>
              <div data-reveal="100">
                <p className="eyebrow">Includes</p>
                <ul className="ticks" style={{ marginTop: 0 }}>{c.details.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
              <div data-reveal="200" style={{ minWidth: 190 }}>
                {c.comingSoon && <p className="eyebrow" style={{ marginBottom: 10 }}>Coming soon</p>}
                <div className="price" style={{ color: "var(--gold-dk)" }}>{c.price}<small style={{ color: "var(--stone)" }}>{c.unit}</small></div>
                <p style={{ marginTop: 22 }}><Link className="btn btn--dark" href={`/contact?topic=${encodeURIComponent(c.name)}`}>{c.comingSoon ? "Register interest" : "Enquire"}</Link></p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section dark">
        <div className="wrap split split--top">
          <div><p className="eyebrow" data-reveal>Perfect for</p><h2 className="h2" data-reveal="100">Everyone <em>curious</em></h2></div>
          <div>
            <p className="lede" data-reveal="150">Scuba sessions run in Lusaka at Millennium Village, GOGO Fitness and the Radisson Blu Hotel, or at your own pool — we bring the equipment, the instructors and the safety standards to you.</p>
            <div className="pills" data-reveal="250">{PERFECT_FOR.map((p) => <span className="pill" key={p}>{p}</span>)}</div>
          </div>
        </div>
      </section>
      <Faq items={[
        { q: "Which scuba course should a beginner choose?", a: "Try Scuba suits children from age 6 and anyone wanting a first taste. Discover Scuba Diving (age 10+) is PADI's introductory experience and adds basic scuba skills and a digital certificate of participation. Pond Scuba is a full day for groups, schools and celebrations." },
        { q: "How much do scuba courses cost in Zambia?", a: "Try Scuba K1,500, Discover Scuba Diving K2,200 and Pond Scuba K2,500 for a full day, per person with equipment included. The PADI Open Water course is coming soon at USD 550 or the kwacha equivalent." },
        { q: "Do I need to know how to swim?", a: "No. Swimming ability is not required for Try Scuba, Discover Scuba Diving or Pond Scuba." },
        { q: "What is the minimum age?", a: "6 years for Try Scuba and 10 years for Discover Scuba Diving, Pond Scuba and Open Water." },
        { q: "How many people are in a group?", a: `A maximum of ${GROUP_MAX} participants per group.` },
        { q: "Who are the instructors?", a: `PADI-certified instructors ${INSTRUCTORS.map((i) => i.name).join(" and ")}.` },
        { q: "Can I get a PADI certification?", a: "The PADI Open Water Diver course at Lake Tanganyika is coming soon, with certification issued by PADI. Register your interest through the contact page." },
      ]} />
      <Related keys={["hub", "dsd", "lusaka", "kids", "cost", "dive"]} />
      <CtaBand title="Ready to try it?" />
    </>
  );
}
