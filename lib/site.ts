export const SITE = {
  name: "Zambian Outdoor Adventure Company",
  url: "https://zambianadventures.com",
  email: "info@zambianadventures.com",
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
  { href: "/merch", label: "Merch" },
  { href: "/about", label: "About" },
];

export type Course = {
  slug: string;
  name: string;
  price: string;
  unit: string;
  blurb: string;
  details: string[];
  duration: string;
  minAge: number;
  swimming: string;
  where: string;
  comingSoon?: boolean;
};

// Prices, durations, ages and group size supplied by Zambian Outdoor Adventure Company (Oct 2026).
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
    duration: "3–4 hours",
    minAge: 10,
    swimming: "Not required",
    where: "Lusaka pools",
  },
  {
    slug: "try-scuba",
    name: "Try Scuba",
    price: "K1,500",
    unit: "per person",
    blurb: "An easy, guided introduction to breathing underwater, open to children from age 6 — the quickest way to find out if diving is for you.",
    details: ["Equipment included", "Safety briefing", "Guided shallow-water experience"],
    duration: "3–4 hours",
    minAge: 6,
    swimming: "Not required",
    where: "Lusaka pools",
  },
  {
    slug: "pond-scuba",
    name: "Pond Scuba",
    price: "K2,500",
    unit: "full day",
    blurb: "A full day of supervised scuba in a private pond or pool setting — ideal for groups, schools and celebrations.",
    details: ["Full-day programme", "Equipment included", "Certified instructors", "Group and school friendly"],
    duration: "Full day",
    minAge: 10,
    swimming: "Not required",
    where: "Pond or private pool",
  },
  {
    slug: "open-water",
    name: "Open Water Diver",
    price: "USD 550",
    unit: "or kwacha equivalent · Lake Tanganyika",
    blurb: "Learn to dive properly and earn a PADI certification on the clear, freshwater reefs of Lake Tanganyika. Coming soon.",
    details: ["Training at Lake Tanganyika", "Theory, confined water and open-water dives", "Certification issued by PADI"],
    duration: "To be confirmed",
    minAge: 10,
    swimming: "PADI water-skills requirements apply",
    where: "Lake Tanganyika",
    comingSoon: true,
  },
];

export const GROUP_MAX = 4;
export const UPDATED = "2026-10-06";
export const updatedLabel = new Date(UPDATED + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const INSTRUCTORS = [
  { name: "Hennie Smit", role: "PADI Instructor · Operations Director" },
  { name: "Jonathan Chiwenu", role: "PADI Instructor" },
];

export const LUSAKA_VENUES = ["Millennium Village", "GOGO Fitness", "Radisson Blu Hotel", "Your own pool — we bring the equipment and instructors to you"];

export const DIVE_LOCATIONS = [
  { name: "Lusaka pools", d: "Try Scuba and Discover Scuba Diving at Millennium Village, GOGO Fitness, the Radisson Blu Hotel or your own pool.", href: "/scuba-diving-lusaka" },
  { name: "Chisamba", d: "Pond dives." },
  { name: "Mulungushi Dam", d: "Freshwater dam diving." },
  { name: "Tiffany's Canyon", d: "Canyon diving." },
  { name: "Lake Tanganyika", d: "Our home base at Isanga Bay near Mpulungu, with 25 mapped dive sites.", href: "/dive" },
];

export const OUR_TAKE = "We're the only scuba diving instruction school in Zambia that combines diving with adventure above the water too, from skydiving to water sports.";

export const PERFECT_FOR = ["Beginners", "Families", "Friends", "Corporate team building", "Schools", "Birthday experiences"];

export const VALUES = [
  { n: "01", t: "Safety first, always", d: "Every expedition, dive and training programme runs on internationally recognised safety protocols, with equipment and certification standards we hold ourselves to before we ask it of anyone else." },
  { n: "02", t: "Local roots, national reach", d: "We are built from a Zambian lake town outward. Our guides and dive professionals are overwhelmingly Zambian, and our growth has always followed local knowledge first." },
  { n: "03", t: "Respect for wild places", d: "We operate to a low-impact, leave-no-trace standard at every site, from Tanganyika's reefs to the Muchinga escarpment — because our business depends on these places staying wild." },
  { n: "04", t: "Capability that stays behind", d: "Whether we are training a school group or a mine rescue team, the goal is to leave people more capable than we found them — not simply to deliver an experience and move on." },
];

export function waLink(text = "Hi Zambian Outdoor Adventure Company, I'd like to plan an adventure.") {
  return `https://wa.me/${SITE.whatsapp.wa}?text=${encodeURIComponent(text)}`;
}
