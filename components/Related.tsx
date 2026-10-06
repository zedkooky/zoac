import Link from "next/link";

export type RelatedLink = { href: string; label: string; d: string };

export const RELATED: Record<string, RelatedLink> = {
  hub: { href: "/scuba-diving-zambia", label: "Scuba diving in Zambia", d: "Where to dive, courses, prices and instructors." },
  dsd: { href: "/discover-scuba-diving-zambia", label: "Discover Scuba Diving", d: "PADI's first-timer experience: K2,200, 3–4 hours, age 10+." },
  lusaka: { href: "/scuba-diving-lusaka", label: "Scuba diving in Lusaka", d: "Pool sessions at four Lusaka venues, or your own pool." },
  kids: { href: "/scuba-diving-for-children-zambia", label: "Scuba for children", d: "Try Scuba from age 6, Discover Scuba from 10." },
  cost: { href: "/scuba-diving-cost-zambia", label: "Scuba diving prices", d: "Every course, price and what's included." },
  courses: { href: "/courses", label: "Courses & prices", d: "All four scuba experiences side by side." },
  dive: { href: "/dive", label: "Lake Tanganyika dive map", d: "25 mapped sites from Isanga Bay, Mpulungu." },
  expeditions: { href: "/expeditions", label: "Expeditions", d: "Kayaking, trekking and off-road safari." },
  training: { href: "/training", label: "Training & industry", d: "Rescue diving, schools and corporate programmes." },
  about: { href: "/about", label: "About us", d: "Who we are and how we work." },
  merch: { href: "/merch", label: "Merch", d: "Forest-green kit for the boat and the trail." },
  contact: { href: "/contact", label: "Contact & booking", d: "WhatsApp, call or send an enquiry." },
};

export default function Related({ keys, title = "Keep exploring" }: { keys: (keyof typeof RELATED)[]; title?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow" data-reveal>Related</p>
        <h2 className="h2" data-reveal="100">{title}</h2>
        <ul className="related">
          {keys.map((k, i) => {
            const r = RELATED[k];
            return (
              <li key={k} data-reveal={String((i % 3) * 100)}>
                <Link href={r.href}><b>{r.label} →</b><span>{r.d}</span></Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
