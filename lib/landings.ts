import { COURSES, GROUP_MAX, GROUP_REWARD, INSTRUCTORS, LUSAKA_VENUES, REPLY_TIME } from "@/lib/site";
import type { LeadField } from "@/components/LeadForm";
import type { QA } from "@/components/Faq";

export type Reason = { b: string; t: string };

export type Landing = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  h1: [string, string];
  lede: string;
  image: string;
  alt: string;
  cta: string;
  reasons: Reason[];
  facts: [string, string][];
  video: { youtube?: { id: string; title: string }; film?: boolean; caption: string };
  steps: { t: string; d: string }[];
  offer: { eyebrow: string; h: string; em: string; p: string; reward?: string };
  form: { topic: string; fields: LeadField[]; submit: string; pdf?: { href: string; label: string }; thanks: string };
  faq: QA[];
  final: string;
};

const c = (slug: string) => COURSES.find((x) => x.slug === slug)!;
const dsd = c("discover-scuba-diving");
const tryScuba = c("try-scuba");
const pond = c("pond-scuba");
const ow = c("open-water");
const instructors = INSTRUCTORS.map((i) => i.name).join(" and ");
const venues = `${LUSAKA_VENUES.slice(0, 3).join(", ")}, or your own pool`;

const FAQ_SWIM: QA = { q: "Do I need to be able to swim?", a: "No. Swimming ability is not needed for Try Scuba, Discover Scuba Diving or Pond Scuba." };
const FAQ_SAFE: QA = { q: "Is it safe?", a: `Every session starts with a safety briefing, takes place in a pool or pond, and is led by a PADI-certified instructor (${instructors}) with no more than ${GROUP_MAX} people per group.` };
const FAQ_BRING: QA = { q: "What do I need to bring?", a: "Swimwear and a towel. All scuba equipment is provided." };
const FAQ_REPLY: QA = { q: "How quickly will you reply?", a: `We reply on WhatsApp within ${REPLY_TIME}.` };

export const LANDINGS: Landing[] = [
  {
    slug: "try-scuba",
    title: "Try Scuba Diving in Lusaka",
    description: `Breathe underwater for the first time in a Lusaka pool. From ${tryScuba.price}, age ${tryScuba.minAge}+, no swimming needed, PADI-certified instructors.`,
    kicker: "First time underwater",
    h1: ["Breathe underwater.", "No experience needed."],
    lede: `Your first scuba session, in a Lusaka pool, with a PADI-certified instructor beside you. From ${tryScuba.price}.`,
    image: "/img/pool-dsd.jpg",
    alt: "Instructor and first-time diver giving the OK sign underwater",
    cta: "Get the free first-dive guide",
    reasons: [
      { b: "You don't need to swim.", t: `Start from age ${tryScuba.minAge} with Try Scuba, or age ${dsd.minAge} with Discover Scuba Diving. We teach everything in the pool.` },
      { b: `Never more than ${GROUP_MAX} people per group.`, t: `Your instructor, ${instructors}, is close by the whole time. Both are PADI-certified.` },
      { b: "We come to you.", t: `Sessions run at ${venues}. All equipment is included.` },
    ],
    facts: [["Try Scuba", `${tryScuba.price} · age ${tryScuba.minAge}+`], ["Discover Scuba Diving", `${dsd.price} · age ${dsd.minAge}+`], ["Duration", dsd.duration], ["Equipment", "Included"]],
    video: { film: true, caption: "A taste of what we do, from the pool to the wild." },
    steps: [
      { t: "Get the guide", d: "Fill in the form and download our free first-dive guide: what happens, what to bring, prices and venues." },
      { t: "Pick a venue and date", d: `We reply on WhatsApp within ${REPLY_TIME} to find a time that suits you.` },
      { t: "Take your first breath", d: "Safety briefing, kit on, and into the pool with your instructor." },
    ],
    offer: { eyebrow: "Free guide", h: "Your first dive,", em: "explained", p: "Download our free guide to your first scuba session: what happens step by step, what to bring, ages, prices and where we dive in Lusaka." },
    form: {
      topic: "Landing: Try Scuba",
      fields: [
        { key: "experience", label: "Which experience?", type: "select", options: ["Not sure yet", `Try Scuba (${tryScuba.price}, age ${tryScuba.minAge}+)`, `Discover Scuba Diving (${dsd.price}, age ${dsd.minAge}+)`] },
        { key: "group", label: "How many people?", type: "number", placeholder: "e.g. 2", maps: "group" },
      ],
      submit: "Send me the guide",
      pdf: { href: "/downloads/first-dive-guide.pdf", label: "Download the guide (PDF)" },
      thanks: `Your guide is ready below. We'll message you on WhatsApp within ${REPLY_TIME} to find you a date.`,
    },
    faq: [FAQ_SWIM, FAQ_SAFE, { q: "What's the difference between Try Scuba and Discover Scuba Diving?", a: `Try Scuba (${tryScuba.price}) is open from age ${tryScuba.minAge} and is a guided first taste. Discover Scuba Diving (${dsd.price}, age ${dsd.minAge}+) is our introductory experience and adds basic scuba skills and a digital certificate of participation. Both take ${dsd.duration}.` }, FAQ_BRING, FAQ_REPLY],
    final: "Ready for your first breath underwater?",
  },
  {
    slug: "kids-scuba-party",
    title: "Scuba Birthday Parties in Lusaka",
    description: `A scuba birthday party at your own pool in Lusaka. From age ${tryScuba.minAge}, no swimming needed, PADI-certified instructors, max ${GROUP_MAX} divers per group.`,
    kicker: "Birthday parties",
    h1: ["A birthday party", "underwater"],
    lede: `We bring the scuba kit and PADI-certified instructors to your pool. Kids from age ${tryScuba.minAge} take their first breaths underwater.`,
    image: "/img/pool-dsd.jpg",
    alt: "A young diver and instructor underwater in a pool",
    cta: "Get a free party plan",
    reasons: [
      { b: "At your own pool.", t: "We bring all the scuba equipment and the instructors to you. No pool? Ask us about options." },
      { b: `From age ${tryScuba.minAge}, no swimming needed.`, t: `Under-10s do Try Scuba; from ${dsd.minAge} they can do Discover Scuba Diving.` },
      { b: `Small groups, close supervision.`, t: `No more than ${GROUP_MAX} divers in the water per group, each with a PADI-certified instructor.` },
    ],
    facts: [["Minimum age", `${tryScuba.minAge}`], ["Divers per group", `Max ${GROUP_MAX}`], ["Session length", dsd.duration], ["Price", "Quote on request"]],
    video: { film: true, caption: "Adventure is in the family." },
    steps: [
      { t: "Tell us about the party", d: "Number of children, their ages, the date, and whether you have a pool." },
      { t: "Get your plan and quote", d: `We reply on WhatsApp within ${REPLY_TIME} with a plan and price.` },
      { t: "Dive in", d: "We arrive with the kit, brief the kids, and get them underwater." },
    ],
    offer: { eyebrow: "Free party plan", h: "Plan the party", em: "with us", p: "Tell us a little about the birthday and we'll send a free plan and quote: how the session runs, timings and price.", reward: GROUP_REWARD },
    form: {
      topic: "Landing: Scuba birthday party",
      fields: [
        { key: "group", label: "Number of children", type: "number", placeholder: "e.g. 8", maps: "group" },
        { key: "ages", label: "Children's ages", type: "text", placeholder: "e.g. 7 to 11" },
        { key: "date", label: "Party date", type: "text", placeholder: "e.g. 14 November", maps: "date" },
        { key: "pool", label: "Where?", type: "select", options: ["At our own pool", "At one of your Lusaka venues", "Not sure yet"] },
      ],
      submit: "Get my free party plan",
      thanks: `We'll send your party plan and quote on WhatsApp within ${REPLY_TIME}.`,
    },
    faq: [
      { q: "What age can children start?", a: `Age ${tryScuba.minAge} for Try Scuba, and ${dsd.minAge} for Discover Scuba Diving.` },
      FAQ_SWIM, FAQ_SAFE,
      { q: "Can you come to our house?", a: "Yes. If you have a pool, we bring all the scuba equipment and the instructors to you." },
      { q: "How much does a party cost?", a: "It depends on the number of children and the setup, so we quote each party individually. Ask for your free plan and quote." },
      FAQ_REPLY,
    ],
    final: "Give them a birthday they'll remember.",
  },
  {
    slug: "schools",
    title: "Scuba Programmes for Schools in Zambia",
    description: `Scuba diving for school groups in Lusaka: PADI-certified instructors, max ${GROUP_MAX} pupils per group, from age ${tryScuba.minAge}, no swimming needed. Free programme pack.`,
    kicker: "Schools",
    h1: ["Scuba for schools,", "led by certified instructors"],
    lede: "An unforgettable school activity with qualified instructors, small groups and a clear safety plan.",
    image: "/img/gear.jpg",
    alt: "Scuba equipment laid out for a school session",
    cta: "Download the school pack",
    reasons: [
      { b: "PADI-certified instructors.", t: `Sessions are led by ${instructors}.` },
      { b: `Max ${GROUP_MAX} pupils per group in the water.`, t: "Small groups mean close supervision and real attention for every pupil." },
      { b: `From age ${tryScuba.minAge}, no swimming needed.`, t: `Try Scuba from ${tryScuba.minAge}, Discover Scuba Diving and Pond Scuba from ${dsd.minAge}. At your school's pool or one of our Lusaka venues.` },
    ],
    facts: [["Ages", `${tryScuba.minAge}+`], ["Group size", `Max ${GROUP_MAX} in the water`], ["Options", "Try Scuba, Discover Scuba, Pond Scuba day"], ["Price", "Quote on request"]],
    video: { film: true, caption: "Outdoor learning that pupils remember." },
    steps: [
      { t: "Download the pack", d: "Programme options, ages, group sizes, safety and logistics." },
      { t: "Tell us about your group", d: `Number of pupils and ages. We reply within ${REPLY_TIME}.` },
      { t: "Get a plan and quote", d: "We plan the day around your timetable and venue." },
    ],
    offer: { eyebrow: "Free programme pack", h: "Everything your school", em: "needs to decide", p: "Our free school programme pack covers the options, ages, group sizes, safety and how a session day runs, ready to share with colleagues and parents.", reward: GROUP_REWARD },
    form: {
      topic: "Landing: Schools",
      fields: [
        { key: "school", label: "School", type: "text" },
        { key: "group", label: "Number of pupils", type: "number", placeholder: "e.g. 24", maps: "group" },
        { key: "ages", label: "Age range", type: "text", placeholder: "e.g. 10 to 13" },
      ],
      submit: "Send me the school pack",
      pdf: { href: "/downloads/school-programme-pack.pdf", label: "Download the pack (PDF)" },
      thanks: `Your school pack is ready below. We'll be in touch on WhatsApp within ${REPLY_TIME}.`,
    },
    faq: [
      FAQ_SWIM, FAQ_SAFE,
      { q: "Can you come to our school pool?", a: "Yes. We bring the equipment and instructors to your pool, or run the session at one of our Lusaka venues." },
      { q: "What ages can take part?", a: `From age ${tryScuba.minAge} for Try Scuba, and ${dsd.minAge} for Discover Scuba Diving and Pond Scuba.` },
      { q: "How much does it cost?", a: "Each school programme is quoted individually, based on numbers, ages and venue." },
      FAQ_REPLY,
    ],
    final: "Give your pupils a day they'll talk about.",
  },
  {
    slug: "team-building",
    title: "Scuba Team Building in Zambia",
    description: `Corporate team building with scuba in Lusaka: a full Pond Scuba day for your team, PADI-certified instructors, no experience or swimming needed. Free planning call and quote.`,
    kicker: "Team building",
    h1: ["Team building", "that goes deeper"],
    lede: "A full day of scuba for your team: new skills, shared nerves, and something everyone will talk about on Monday.",
    image: "/img/gear.jpg",
    alt: "Dive equipment ready for a team scuba day",
    cta: "Book a free planning call",
    reasons: [
      { b: "Nobody needs experience, or even to swim.", t: "Everyone starts at the same level, which is exactly the point." },
      { b: `Small groups of ${GROUP_MAX}, led by PADI-certified instructors.`, t: `${instructors} keep it safe and focused.` },
      { b: "A full day, planned for you.", t: `Pond Scuba is a ${pond.duration.toLowerCase()} programme with equipment included. We plan it around your team.` },
    ],
    facts: [["Format", `Pond Scuba, ${pond.duration.toLowerCase()}`], ["Experience", "None needed"], ["Group size", `Max ${GROUP_MAX} per instructor group`], ["Price", "Quote on request"]],
    video: { film: true, caption: "Adventure, professionally delivered." },
    steps: [
      { t: "Book a planning call", d: `Tell us team size and timing; we reply within ${REPLY_TIME}.` },
      { t: "Get your plan and quote", d: "Venue, schedule, groups and price." },
      { t: "Dive in together", d: "Briefing, kit on, underwater as a team." },
    ],
    offer: { eyebrow: "Free planning call", h: "Let's plan your", em: "team day", p: "Book a free planning call. We'll shape the day around your team size, goals and dates, and send a quote.", reward: GROUP_REWARD },
    form: {
      topic: "Landing: Team building",
      fields: [
        { key: "company", label: "Company", type: "text" },
        { key: "group", label: "Team size", type: "number", placeholder: "e.g. 16", maps: "group" },
        { key: "date", label: "Preferred month", type: "text", placeholder: "e.g. February", maps: "date" },
      ],
      submit: "Book my planning call",
      thanks: `We'll be in touch on WhatsApp within ${REPLY_TIME} to set up your planning call.`,
    },
    faq: [
      FAQ_SWIM, FAQ_SAFE,
      { q: "How long is the day?", a: `Pond Scuba is a ${pond.duration.toLowerCase()} programme. We plan timings around your team.` },
      { q: "How much does it cost?", a: "Team days are quoted individually, based on team size, venue and format." },
      FAQ_REPLY,
    ],
    final: "Take your team somewhere new.",
  },
  {
    slug: "open-water",
    title: "Open Water Diver Course at Lake Tanganyika: Get an Invite",
    description: `Get an invite to our first Open Water Diver course at Lake Tanganyika, Zambia, taught by PADI-certified instructors. Planned at ${ow.price}, age ${ow.minAge}+.`,
    kicker: "Coming soon",
    h1: ["Get certified", "on Lake Tanganyika"],
    lede: "Our Open Water Diver course is coming to Isanga Bay. Join the list and be first to hear the dates.",
    image: "/img/lakeside.jpg",
    alt: "Dusk on the shore of Lake Tanganyika",
    cta: "Get an invite",
    reasons: [
      { b: "Learn to dive properly.", t: "Theory, confined-water practice and open-water dives, taught by PADI-certified instructors." },
      { b: "Train on Lake Tanganyika.", t: "One of the world's oldest and deepest freshwater lakes, with 25 mapped sites at our Isanga Bay base." },
      { b: "First to hear, first to book.", t: "Everyone on the list hears the course dates before we announce them publicly." },
    ],
    facts: [["Course", "Open Water Diver"], ["Where", "Isanga Bay, Lake Tanganyika"], ["Planned price", `${ow.price} or kwacha equivalent`], ["Minimum age", `${ow.minAge}`]],
    video: { film: true, caption: "From Lusaka to the lake." },
    steps: [
      { t: "Join the list", d: "Leave your name and WhatsApp number." },
      { t: "Get the dates first", d: "We'll message you when the first course is scheduled." },
      { t: "Book your place", d: "Places go to the list before anyone else." },
    ],
    offer: { eyebrow: "Get an invite", h: "Be first in", em: "the water", p: "Join the waitlist for our first Open Water Diver course at Lake Tanganyika. No commitment, just first notice of the dates." },
    form: {
      topic: "Landing: Open Water waitlist",
      fields: [
        { key: "tried", label: "Have you tried scuba before?", type: "select", options: ["Not yet", "Yes, Try Scuba or Discover Scuba", "Yes, I've dived before"] },
        { key: "group", label: "How many people?", type: "number", placeholder: "e.g. 1", maps: "group" },
      ],
      submit: "Get my invite",
      thanks: "You're on the list. We'll message you as soon as the first course dates are set.",
    },
    faq: [
      { q: "When does the course start?", a: "Dates are not set yet. Everyone on the waitlist hears first." },
      { q: "How much will it cost?", a: `It is planned at ${ow.price} or the kwacha equivalent.` },
      { q: "What certification will I get?", a: "Certification details will be confirmed before the first course is announced." },
      { q: "Can I try scuba first?", a: `Yes. Try Scuba (${tryScuba.price}) or Discover Scuba Diving (${dsd.price}) in Lusaka is a great first step.` },
      FAQ_REPLY,
    ],
    final: "Your certification starts with one message.",
  },
];

export const landing = (slug: string) => LANDINGS.find((l) => l.slug === slug);
