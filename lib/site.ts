export const SITE = {
  name: "Zambian Outdoor Adventure Company",
  short: "ZOAC",
  url: "https://zambianadventures.com",
  email: "zambianoutdooradventures@gmail.com",
  whatsapp: { label: "Sid Parmar", display: "+260 97 972 7627", wa: "260979727627" },
  people: [
    { name: "Hennie Smit", role: "Operations Director", phone: "+260 77 950 8417", tel: "+260779508417" },
    { name: "Sid Parmar", role: "Director", phone: "+260 97 972 7627", tel: "+260979727627" },
  ],
  hq: "Lusaka, Zambia",
  origin: "Mpulungu, Lake Tanganyika",
};

export const NAV = [
  { href: "/dive", label: "Dive" },
  { href: "/courses", label: "Courses" },
  { href: "/expeditions", label: "Expeditions" },
  { href: "/training", label: "Training & Industry" },
  { href: "/about", label: "About" },
];

export type Course = {
  slug: string;
  name: string;
  price: string;
  unit: string;
  blurb: string;
  details: string[];
};

// Prices supplied by ZOAC. Descriptions for Try Scuba / Pond Scuba / Open Water are placeholders to confirm.
export const COURSES: Course[] = [
  {
    slug: "discover-scuba-diving",
    name: "Discover Scuba Diving",
    price: "K2,200",
    unit: "per person",
    blurb: "No experience required. Take your first breath underwater in a safe, controlled environment with certified instructors guiding every step.",
    details: [
      "Professional scuba equipment",
      "Safety briefing",
      "Pool training session",
      "Introduction to basic scuba skills",
      "Digital certificate of participation",
    ],
  },
  {
    slug: "try-scuba",
    name: "Try Scuba",
    price: "K1,500",
    unit: "per person",
    blurb: "A shorter, easy introduction to breathing underwater — the quickest way to find out if diving is for you.",
    details: ["Equipment included", "Safety briefing", "Guided shallow-water experience"],
  },
  {
    slug: "pond-scuba",
    name: "Pond Scuba",
    price: "K2,500",
    unit: "full day",
    blurb: "A full day of supervised scuba in a private pond or pool setting — ideal for groups, schools and celebrations.",
    details: ["Full-day programme", "Equipment included", "Certified instructors", "Group and school friendly"],
  },
  {
    slug: "open-water",
    name: "Open Water Diver",
    price: "USD 550",
    unit: "or kwacha equivalent · Lake Tanganyika",
    blurb: "Learn to dive properly and earn your certification on the clear, freshwater reefs of Lake Tanganyika.",
    details: ["Training at Lake Tanganyika", "Theory, confined water and open-water dives", "Internationally recognised standards"],
  },
];

export const PERFECT_FOR = ["Beginners", "Families", "Friends", "Corporate team building", "Schools", "Birthday experiences"];

export const VALUES = [
  { n: "01", t: "Safety first, always", d: "Every expedition, dive and training programme runs on internationally recognised safety protocols, with equipment and certification standards we hold ourselves to before we ask it of anyone else." },
  { n: "02", t: "Local roots, national reach", d: "We are built from a Zambian lake town outward. Our guides and dive professionals are overwhelmingly Zambian, and our growth has always followed local knowledge first." },
  { n: "03", t: "Respect for wild places", d: "We operate to a low-impact, leave-no-trace standard at every site, from Tanganyika's reefs to the Muchinga escarpment — because our business depends on these places staying wild." },
  { n: "04", t: "Capability that stays behind", d: "Whether we are training a school group or a mine rescue team, the goal is to leave people more capable than we found them — not simply to deliver an experience and move on." },
];

export function waLink(text = "Hi ZOAC, I'd like to plan an adventure.") {
  return `https://wa.me/${SITE.whatsapp.wa}?text=${encodeURIComponent(text)}`;
}
