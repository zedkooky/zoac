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
const QA_CERT: QA = { q: "Can I get scuba certified in Zambia?", a: `A PADI Open Water Diver course at Lake Tanganyika is coming soon, with certification issued by PADI. The planned price is ${ow.price} or the kwacha equivalent. Discover Scuba Diving is not a certification; it is an introductory experience.` };

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
      { q: "Where can I learn to scuba dive in Zambia?", a: `Beginners start in Lusaka with Try Scuba or Discover Scuba Diving at ${venuesSentence}, or at their own pool. A PADI Open Water course at Lake Tanganyika is coming soon.` },
      QA_LUSAKA, QA_COST, QA_AGE, QA_SWIM, QA_EXPERIENCE, QA_GROUP, QA_INSTR, QA_CERT, QA_BOOK,
    ],
    related: ["dsd", "lusaka", "kids", "cost", "courses", "dive"],
  },
  {
    slug: "discover-scuba-diving-zambia",
    crumb: "Discover Scuba Diving",
    title: `Discover Scuba Diving in Zambia (PADI): ${dsd.price}, ${dsd.duration}`,
    description: `PADI Discover Scuba Diving in Lusaka, Zambia: ${dsd.price} per person, ${dsd.duration}, age ${dsd.minAge}+, no swimming needed, maximum ${GROUP_MAX} per group with a PADI-certified instructor.`,
    kicker: "PADI Discover Scuba Diving",
    h1: ["Discover Scuba", "Diving"],
    lede: "Your first breath underwater, in a Lusaka pool, with a PADI instructor beside you.",
    image: "/img/pool-dsd.jpg",
    alt: "Discover Scuba Diving student and instructor underwater in a pool",
    question: "What is Discover Scuba Diving?",
    answer: `Discover Scuba Diving is PADI's introductory scuba experience for people who have never dived. In Zambia, the ${N} runs it in Lusaka pools for ${dsd.price} per person. It takes ${dsd.duration}, participants must be at least ${dsd.minAge} years old, no swimming ability is needed, and groups are capped at ${GROUP_MAX} people with a PADI-certified instructor.`,
    facts: [
      ["Price", `${dsd.price} per person`],
      ["Duration", dsd.duration],
      ["Minimum age", `${dsd.minAge} years`],
      ["Experience needed", "None"],
      ["Swimming", dsd.swimming],
      ["Group size", `Maximum ${GROUP_MAX}`],
      ["Where", `${venues}, or your own pool`],
      ["Certification", "None; it's an introductory experience"],
    ],
    sections: [
      { eyebrow: "The session", h: "What's", em: "included", list: dsd.details.map((t) => ({ t })) },
      { eyebrow: "Venues", h: "Where it", em: "runs", list: venueList },
      { eyebrow: "Compare", h: "Discover Scuba or", em: "Try Scuba?", table: { head: ["", "Try Scuba", "Discover Scuba Diving"], rows: [["Price", tryScuba.price, dsd.price], ["Minimum age", `${tryScuba.minAge}`, `${dsd.minAge}`], ["Duration", tryScuba.duration, dsd.duration], ["Includes", tryScuba.details.join(", "), dsd.details.join(", ")]] } },
    ],
    faq: [
      { q: "What is Discover Scuba Diving?", a: `PADI's introductory scuba experience for complete beginners. With the ${N} it runs in Lusaka pools, takes ${dsd.duration} and costs ${dsd.price}.` },
      { q: "Is Discover Scuba Diving a certification?", a: "No. It is an introductory experience, not a diving certification. You receive a digital certificate of participation." },
      { q: "How old do you have to be for Discover Scuba Diving?", a: `At least ${dsd.minAge} years old. Children from ${tryScuba.minAge} can join Try Scuba instead.` },
      QA_SWIM, QA_EXPERIENCE,
      { q: "How long does Discover Scuba Diving take?", a: dsd.duration + "." },
      { q: "What's included?", a: dsd.details.join(", ") + "." },
      QA_GROUP, QA_INSTR, QA_BOOK,
    ],
    related: ["hub", "lusaka", "kids", "cost", "courses", "contact"],
  },
  {
    slug: "scuba-diving-lusaka",
    crumb: "Scuba diving in Lusaka",
    title: `Scuba Diving in Lusaka: Try Scuba from ${tryScuba.price}`,
    description: `Try scuba diving in Lusaka at ${venuesSentence} or your own pool. Try Scuba ${tryScuba.price} (age ${tryScuba.minAge}+), Discover Scuba Diving ${dsd.price} (age ${dsd.minAge}+), ${dsd.duration}, PADI instructors.`,
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
    slug: "scuba-diving-for-children-zambia",
    crumb: "Scuba diving for children",
    title: `Scuba Diving for Children in Zambia: Ages ${tryScuba.minAge}+`,
    description: `Children can scuba dive in Zambia from age ${tryScuba.minAge} with Try Scuba (${tryScuba.price}) and from age ${dsd.minAge} with Discover Scuba Diving (${dsd.price}). No swimming needed, max ${GROUP_MAX} per group, PADI instructors.`,
    kicker: "Children & families",
    h1: ["Scuba diving", "for children"],
    lede: "From age six, in a pool, with a PADI instructor and no more than four in the group.",
    image: "/img/pool-dsd.jpg",
    alt: "A young diver and instructor underwater in a pool",
    question: "Can children scuba dive in Zambia?",
    answer: `Yes. Children aged ${tryScuba.minAge} and over can join Try Scuba (${tryScuba.price}), and from age ${dsd.minAge} they can take Discover Scuba Diving (${dsd.price}) with the ${N} in Lusaka. No swimming ability is needed, sessions last ${dsd.duration} in a pool, and every group is capped at ${GROUP_MAX} participants with a PADI-certified instructor.`,
    facts: [
      ["Ages 6–9", "Try Scuba"],
      [`Ages ${dsd.minAge}+`, "Try Scuba, Discover Scuba Diving, Pond Scuba"],
      ["Swimming", "Not required"],
      ["Group size", `Maximum ${GROUP_MAX}`],
      ["Duration", dsd.duration],
      ["Instructors", "PADI-certified"],
      ["Where", "Lusaka pools, or your own pool"],
    ],
    sections: [
      { eyebrow: "By age", h: "What your child", em: "can do", table: { head: ["Experience", "Price", "Duration", "Min. age"], rows: priceRows.slice(0, 3) } },
      { eyebrow: "Groups", h: "Birthdays, schools", em: "and families", p: [`Sessions can run at your own pool, which makes them popular for birthday experiences and family days. Schools can book group sessions too; send us the number of pupils and their ages and we'll plan it.`] },
    ],
    faq: [
      { q: "Can children scuba dive in Zambia?", a: `Yes, from age ${tryScuba.minAge} with Try Scuba and from age ${dsd.minAge} with Discover Scuba Diving, led by PADI-certified instructors in Lusaka.` },
      QA_AGE, QA_SWIM,
      { q: "Is scuba diving safe for children?", a: `Children's sessions take place in a pool, start with a safety briefing and are led by PADI-certified instructors, with no more than ${GROUP_MAX} participants per group.` },
      { q: "Can you run a scuba birthday party?", a: `Yes. Sessions can run at your own pool, with equipment and PADI-certified instructors brought to you. Groups are capped at ${GROUP_MAX} divers at a time.` },
      { q: "Do you run scuba sessions for schools?", a: "Yes. Schools are one of the groups we work with. Contact us with the number of pupils and their ages for a plan and quote." },
      QA_COST, QA_BOOK,
    ],
    related: ["hub", "dsd", "lusaka", "cost", "training", "contact"],
  },
  {
    slug: "scuba-diving-cost-zambia",
    crumb: "Scuba diving prices",
    title: "How Much Does Scuba Diving Cost in Zambia? 2026 Prices",
    description: `Scuba diving prices in Zambia: Try Scuba ${tryScuba.price}, Discover Scuba Diving ${dsd.price}, Pond Scuba ${pond.price} (full day), equipment included. PADI Open Water coming soon at ${ow.price}.`,
    kicker: "Prices",
    h1: ["What scuba", "costs in Zambia"],
    lede: "Every experience, every price, and what's included.",
    image: "/img/gear.jpg",
    alt: "Scuba equipment included in the price, laid out on the ground",
    question: "How much does scuba diving cost in Zambia?",
    answer: `With the ${N}, scuba diving in Zambia costs ${tryScuba.price} per person for Try Scuba, ${dsd.price} for Discover Scuba Diving and ${pond.price} for a full day of Pond Scuba. Equipment is included in every price. A PADI Open Water Diver course is coming soon at ${ow.price} or the kwacha equivalent.`,
    facts: [
      ["Try Scuba", `${tryScuba.price} per person`],
      ["Discover Scuba Diving", `${dsd.price} per person`],
      ["Pond Scuba", `${pond.price}, full day`],
      ["PADI Open Water", `${ow.price} (coming soon)`],
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
      { q: "How much is the PADI Open Water course?", a: `The PADI Open Water Diver course at Lake Tanganyika is coming soon, planned at ${ow.price} or the kwacha equivalent.` },
      { q: "Do you offer group or school prices?", a: "Yes, on request. Send the group size and dates through WhatsApp or the contact page for a quote." },
      QA_AGE, QA_SWIM, QA_BOOK,
    ],
    related: ["hub", "dsd", "lusaka", "kids", "courses", "contact"],
  },
];

export const guide = (slug: string) => GUIDES.find((g) => g.slug === slug);
