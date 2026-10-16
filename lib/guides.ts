import { COURSES, DIVE_LOCATIONS, GROUP_MAX, INSTRUCTORS, LUSAKA_VENUES, OUR_TAKE, SITE } from "@/lib/site";
import type { QA } from "@/components/Faq";
import type { RELATED } from "@/components/Related";

export type Section = {
  eyebrow: string;
  h: string;
  em?: string;
  p?: string[];
  list?: { t: string; d?: string; href?: string }[];
  table?: { head: string[]; rows: string[][] };
  quote?: string;
};

export type Guide = {
  slug: string;
  crumb: string;
  title: string;
  description: string;
  kicker: string;
  h1: [string, string];
  lede: string;
  image: string;
  alt: string;
  question: string;
  answer: string;
  facts: [string, string][];
  sections: Section[];
  faq: QA[];
  related: (keyof typeof RELATED)[];
};

const course = (slug: string) => COURSES.find((c) => c.slug === slug)!;
const dsd = course("discover-scuba-diving");
const tryScuba = course("try-scuba");
const pond = course("pond-scuba");
const ow = course("open-water");
const beginners = [tryScuba, dsd, pond];

const N = SITE.name;
const venues = LUSAKA_VENUES.slice(0, 3).join(", ");
const venuesSentence = `${LUSAKA_VENUES[0]}, ${LUSAKA_VENUES[1]} and the ${LUSAKA_VENUES[2]}`;
const instructorNames = INSTRUCTORS.map((i) => i.name).join(" and ");
const priceRows = [...beginners, ow].map((c) => [c.name + (c.comingSoon ? " (coming soon)" : ""), `${c.price} ${c.unit.split(" · ")[0]}`, c.duration, `${c.minAge}+`]);
const locationList = DIVE_LOCATIONS.map((l) => ({ t: l.name, d: l.d, href: l.href }));
const venueList = LUSAKA_VENUES.map((v) => ({ t: v }));

const QA_SWIM: QA = { q: "Do I need to know how to swim to scuba dive?", a: `No. Swimming ability is not required for Try Scuba, Discover Scuba Diving or Pond Scuba with the ${N}. Sessions take place in a pool or pond with a PADI-certified instructor beside you.` };
const QA_AGE: QA = { q: "What age can children start scuba diving?", a: `Children can start Try Scuba from age ${tryScuba.minAge}. Discover Scuba Diving and Pond Scuba are open from age ${dsd.minAge}.` };
const QA_COST: QA = { q: "How much does scuba diving cost in Zambia?", a: `With the ${N}, Try Scuba costs ${tryScuba.price}, Discover Scuba Diving costs ${dsd.price} and Pond Scuba costs ${pond.price} for a full day, all per person with equipment included.` };
const QA_GROUP: QA = { q: "How many people are in a group?", a: `A maximum of ${GROUP_MAX} participants per group, so every diver gets close attention from the instructor.` };
const QA_INSTR: QA = { q: "Are the instructors certified?", a: `Yes. Sessions are led by PADI-certified instructors ${instructorNames}.` };
const QA_EXPERIENCE: QA = { q: "Do I need previous diving experience?", a: "No. Try Scuba, Discover Scuba Diving and Pond Scuba are designed for complete beginners." };
const QA_LUSAKA: QA = { q: "Where can I try scuba diving in Lusaka?", a: `At ${venuesSentence}, or at your own pool. The ${N} brings the equipment and instructors to you.` };
const QA_BOOK: QA = { q: "How do I book?", a: `Message ${SITE.whatsapp.label} on WhatsApp (${SITE.whatsapp.display}) or send an enquiry through the contact page at zambianadventures.com/contact.` };
const QA_CERT: QA = { q: "Can I get scuba certified in Zambia?", a: `An Open Water Diver course at Lake Tanganyika is coming soon, taught by PADI-certified instructors, with certification details to be confirmed before launch. The planned price is ${ow.price} or the kwacha equivalent. Discover Scuba Diving is not a certification; it is an introductory experience.` };

export const GUIDES: Guide[] = [
  {
    slug: "scuba-diving-zambia",
    crumb: "Scuba diving in Zambia",
    title: "Scuba Diving in Zambia: Where to Dive, Courses & Prices",
    description: `Yes, you can scuba dive in Zambia. PADI-certified instructors run beginner scuba in Lusaka from ${tryScuba.price}, plus dives at Chisamba, Mulungushi Dam, Tiffany's Canyon and Lake Tanganyika.`,
    kicker: "Scuba diving guide",
    h1: ["Scuba diving", "in Zambia"],
    lede: "Where to dive, how to start, what it costs and who teaches you.",
    image: "/img/pool-dsd.jpg",
    alt: "Instructor and student giving the OK signal underwater in a pool",
    question: "Can you scuba dive in Zambia?",
    answer: `Yes. The ${N} runs scuba diving in Zambia with PADI-certified instructors. Beginners can try scuba in Lusaka at ${venuesSentence}, or in their own pool, from ${tryScuba.price} per person, with no swimming ability needed. The company also dives at Chisamba, Mulungushi Dam, Tiffany's Canyon and Lake Tanganyika.`,
    facts: [
      ["Instructors", `PADI-certified (${instructorNames})`],
      ["Beginner options", `Try Scuba (${tryScuba.minAge}+), Discover Scuba Diving (${dsd.minAge}+), Pond Scuba (${pond.minAge}+)`],
      ["Prices", `${tryScuba.price}–${pond.price} per person`],
      ["Duration", `${dsd.duration} (Try Scuba, Discover Scuba)`],
      ["Swimming", "Not required for beginner experiences"],
      ["Group size", `Maximum ${GROUP_MAX} people`],
      ["Lusaka venues", `${venues}, or your own pool`],
      ["Booking", "WhatsApp or online enquiry"],
    ],
    sections: [
      { eyebrow: "Locations", h: "Where can you dive", em: "in Zambia?", p: ["Beginner sessions run in Lusaka pools. Beyond the city, we dive at four locations."], list: locationList },
      { eyebrow: "Experiences", h: "Ways to start, and", em: "what they cost", table: { head: ["Experience", "Price", "Duration", "Min. age"], rows: priceRows } },
      { eyebrow: "Instructors", h: "Who teaches", em: "you", p: [`Every session is led by a PADI-certified instructor, with no more than ${GROUP_MAX} participants per group.`], list: INSTRUCTORS.map((i) => ({ t: i.name, d: i.role })) },
      { eyebrow: "Our take", h: "", quote: OUR_TAKE },
    ],
    faq: [
      { q: "Can you scuba dive in Zambia?", a: `Yes. The ${N} offers scuba diving in Lusaka pools and at Chisamba, Mulungushi Dam, Tiffany's Canyon and Lake Tanganyika, led by PADI-certified instructors.` },
      { q: "Where can I learn to scuba dive in Zambia?", a: `Beginners start in Lusaka with Try Scuba or Discover Scuba Diving at ${venuesSentence}, or at their own pool. An Open Water course at Lake Tanganyika is coming soon.` },
      QA_LUSAKA, QA_COST, QA_AGE, QA_SWIM, QA_EXPERIENCE, QA_GROUP, QA_INSTR, QA_CERT, QA_BOOK,
    ],
    related: ["dsd", "lusaka", "kids", "cost", "courses", "dive"],
  },
  {
    slug: "scuba-diving-lusaka",
    crumb: "Scuba diving in Lusaka",
    title: `Scuba Diving in Lusaka: Try Scuba from ${tryScuba.price}`,
    description: `Try scuba diving in Lusaka at ${venuesSentence} or your own pool. Try Scuba ${tryScuba.price} (age ${tryScuba.minAge}+), Discover Scuba Diving ${dsd.price} (age ${dsd.minAge}+), ${dsd.duration}, PADI-certified instructors.`,
    kicker: "Lusaka",
    h1: ["Scuba diving", "in Lusaka"],
    lede: "Four pools across the city, or your own. We bring the kit and the instructors.",
    image: "/img/gear.jpg",
    alt: "Scuba equipment laid out ready for a pool session",
    question: "Where can I try scuba diving in Lusaka?",
    answer: `In Lusaka, the ${N} runs beginner scuba sessions at ${venuesSentence}, or at your own pool. Try Scuba (from age ${tryScuba.minAge}) costs ${tryScuba.price} and Discover Scuba Diving (from age ${dsd.minAge}) costs ${dsd.price} per person. Sessions take ${dsd.duration}, no swimming is required, and groups are limited to ${GROUP_MAX} people.`,
    facts: [
      ["Venues", `${venues}, or your own pool`],
      ["Try Scuba", `${tryScuba.price}, age ${tryScuba.minAge}+`],
      ["Discover Scuba Diving", `${dsd.price}, age ${dsd.minAge}+`],
      ["Duration", dsd.duration],
      ["Swimming", "Not required"],
      ["Group size", `Maximum ${GROUP_MAX}`],
      ["Instructors", "PADI-certified"],
    ],
    sections: [
      { eyebrow: "Venues", h: "Where in", em: "Lusaka", list: venueList },
      { eyebrow: "Experiences", h: "What you can", em: "book", table: { head: ["Experience", "Price", "Duration", "Min. age"], rows: priceRows.slice(0, 3) } },
      { eyebrow: "Beyond the city", h: "Ready for", em: "open water?", p: ["After the pool, we also dive at Chisamba, Mulungushi Dam, Tiffany's Canyon and Lake Tanganyika."], list: DIVE_LOCATIONS.slice(1).map((l) => ({ t: l.name, d: l.d, href: l.href })) },
    ],
    faq: [
      QA_LUSAKA,
      { q: "Can you come to my house?", a: `Yes. If you have a pool, the ${N} brings the scuba equipment and PADI-certified instructors to you.` },
      QA_COST, QA_AGE, QA_SWIM, QA_GROUP,
      { q: "How long is a session?", a: `Try Scuba and Discover Scuba Diving take ${dsd.duration}. Pond Scuba is a full day.` },
      QA_INSTR, QA_BOOK,
    ],
    related: ["hub", "dsd", "kids", "cost", "courses", "contact"],
  },
  {
    slug: "scuba-diving-cost-zambia",
    crumb: "Scuba diving prices",
    title: "How Much Does Scuba Diving Cost in Zambia? 2026 Prices",
    description: `Scuba diving prices in Zambia: Try Scuba ${tryScuba.price}, Discover Scuba Diving ${dsd.price}, Pond Scuba ${pond.price} (full day), equipment included. Open Water course coming soon at ${ow.price}.`,
    kicker: "Prices",
    h1: ["What scuba", "costs in Zambia"],
    lede: "Every experience, every price, and what's included.",
    image: "/img/gear.jpg",
    alt: "Scuba equipment included in the price, laid out on the ground",
    question: "How much does scuba diving cost in Zambia?",
    answer: `With the ${N}, scuba diving in Zambia costs ${tryScuba.price} per person for Try Scuba, ${dsd.price} for Discover Scuba Diving and ${pond.price} for a full day of Pond Scuba. Equipment is included in every price. An Open Water Diver course is coming soon at ${ow.price} or the kwacha equivalent.`,
    facts: [
      ["Try Scuba", `${tryScuba.price} per person`],
      ["Discover Scuba Diving", `${dsd.price} per person`],
      ["Pond Scuba", `${pond.price}, full day`],
      ["Open Water course", `${ow.price} (coming soon)`],
      ["Equipment", "Included"],
      ["Group & school bookings", "Quote on request"],
    ],
    sections: [
      { eyebrow: "Price list", h: "Every", em: "experience", table: { head: ["Experience", "Price", "Duration", "Min. age"], rows: priceRows } },
      { eyebrow: "Included", h: "What your", em: "price covers", list: [...beginners].map((c) => ({ t: c.name, d: c.details.join(" · ") })) },
      { eyebrow: "Groups", h: "Schools, teams", em: "and events", p: ["For school groups, corporate team building and private events, message us with numbers and dates and we'll send a quote."] },
    ],
    faq: [
      QA_COST,
      { q: "Is equipment included in the price?", a: "Yes. Scuba equipment is included in Try Scuba, Discover Scuba Diving and Pond Scuba." },
      { q: "How much is the Open Water course?", a: `The Open Water Diver course at Lake Tanganyika is coming soon, planned at ${ow.price} or the kwacha equivalent.` },
      { q: "Do you offer group or school prices?", a: "Yes, on request. Send the group size and dates through WhatsApp or the contact page for a quote." },
      QA_AGE, QA_SWIM, QA_BOOK,
    ],
    related: ["hub", "dsd", "lusaka", "kids", "courses", "contact"],
  },
];

export const guide = (slug: string) => GUIDES.find((g) => g.slug === slug);
