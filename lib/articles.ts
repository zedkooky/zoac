import { COURSES, DIVE_LOCATIONS, GROUP_MAX, INSTRUCTORS, LUSAKA_VENUES, REPLY_TIME, SITE } from "@/lib/site";
import type { QA } from "@/components/Faq";
import type { LeadField } from "@/components/LeadForm";

export type Block =
  | string
  | { list: string[]; ordered?: boolean }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }
  | { links: { href: string; label: string }[] };

export type ArticleSection = { h: string; blocks: Block[] };

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  kicker: string;
  heroLines: [string, string];
  image: string;
  alt: string;
  published: string;
  updated: string;
  answer: string;
  takeaways: string[];
  facts: [string, string][];
  sections: ArticleSection[];
  faq: QA[];
  related: string[];
  booking?: { topic: string; fields: LeadField[] };
};

const c = (slug: string) => COURSES.find((x) => x.slug === slug)!;
const dsd = c("discover-scuba-diving");
const tryScuba = c("try-scuba");
const pond = c("pond-scuba");
const ow = c("open-water");
const N = SITE.name;
const instructors = INSTRUCTORS.map((i) => i.name).join(" and ");
const venues3 = `${LUSAKA_VENUES[0]}, ${LUSAKA_VENUES[1]} and the ${LUSAKA_VENUES[2]}`;
const otherSites = DIVE_LOCATIONS.slice(1).map((l) => l.name);
const otherSitesText = `${otherSites.slice(0, -1).join(", ")} and ${otherSites[otherSites.length - 1]}`;
const wa = `${SITE.whatsapp.label} on WhatsApp (${SITE.whatsapp.display})`;
const PUB = "2026-10-16";

const compareTable = {
  head: ["", "Try Scuba", "Discover Scuba Diving"],
  rows: [
    ["Price", `${tryScuba.price} per person`, `${dsd.price} per person`],
    ["Minimum age", `${tryScuba.minAge}`, `${dsd.minAge}`],
    ["Duration", tryScuba.duration, dsd.duration],
    ["Swimming needed", "No", "No"],
    ["Group size", `Max ${GROUP_MAX}`, `Max ${GROUP_MAX}`],
    ["Includes", tryScuba.details.join(", "), dsd.details.join(", ")],
  ],
};
const priceTable = {
  head: ["Experience", "Price", "Duration", "Min. age"],
  rows: [tryScuba, dsd, pond].map((x) => [x.name, `${x.price} ${x.unit}`, x.duration, `${x.minAge}`]),
};
const venueList = { list: LUSAKA_VENUES };
const facts = (x: typeof dsd): [string, string][] => [
  ["Price", `${x.price} ${x.unit}`],
  ["Duration", x.duration],
  ["Minimum age", `${x.minAge}`],
  ["Swimming", "Not required"],
  ["Group size", `Max ${GROUP_MAX}`],
  ["Instructors", "PADI-certified"],
  ["Where", "Lusaka pools or your own pool"],
];

const QA_SWIM: QA = { q: "Do I need to be able to swim?", a: `No. Swimming ability is not required for Try Scuba, Discover Scuba Diving or Pond Scuba with the ${N}.` };
const QA_BOOK: QA = { q: "How do I book?", a: `Message ${wa} or send an enquiry at zambianadventures.com. We reply within ${REPLY_TIME}.` };
const QA_GROUP: QA = { q: "How many people are in a group?", a: `No more than ${GROUP_MAX} participants per group, each with a PADI-certified instructor.` };
const QA_CERT: QA = { q: "Is Discover Scuba Diving a certification?", a: "No. It is an introductory experience, not a diving certification. You receive a digital certificate of participation." };
const QA_BRING: QA = { q: "What should I bring?", a: "Swimwear and a towel. All scuba equipment is provided." };
const QA_MEDICAL: QA = { q: "Can I dive with a medical condition?", a: "Tell your instructor about any medical conditions before your session. Some conditions may need a doctor's approval before you dive, and you shouldn't dive with a cold or blocked nose." };

export const ARTICLES: Article[] = [
  {
    slug: "discover-scuba-diving-zambia",
    title: "Discover Scuba Diving in Zambia: Your First Dive",
    metaTitle: `Discover Scuba Diving in Zambia: Your First Dive (${dsd.price})`,
    description: `Discover Scuba Diving in Zambia: your first breath underwater in a Lusaka pool. ${dsd.price}, ${dsd.duration}, age ${dsd.minAge}+, no swimming needed, max ${GROUP_MAX} per group with a PADI-certified instructor.`,
    kicker: "Beginner guide",
    heroLines: ["Discover Scuba Diving", "in Zambia"],
    image: "/img/pool-dsd.jpg",
    alt: "Instructor and first-time diver giving the OK sign underwater in a pool",
    published: PUB,
    updated: PUB,
    answer: `Discover Scuba Diving is a beginner scuba experience that lets you breathe underwater for the first time without needing a certification. In Zambia, the ${N} runs it in Lusaka pools at ${venues3}, or in your own pool. It costs ${dsd.price} per person, takes ${dsd.duration}, is open from age ${dsd.minAge}, needs no swimming ability, and groups are capped at ${GROUP_MAX} with a PADI-certified instructor.`,
    takeaways: [
      `${dsd.price} per person, ${dsd.duration}, from age ${dsd.minAge}`,
      "No swimming ability or diving experience needed",
      `Max ${GROUP_MAX} people per group, led by PADI-certified instructors`,
      "An introductory experience, not a certification",
    ],
    facts: facts(dsd),
    sections: [
      { h: "What is Discover Scuba Diving?", blocks: [
        "Discover Scuba Diving is an introduction to scuba for people who have never dived. You learn how the equipment works, take your first breaths underwater in a pool, and try a few basic skills, all with an instructor beside you.",
        "It is not a qualification. Think of it as a supervised first dive: a safe way to find out whether you enjoy scuba before committing to a full course.",
      ] },
      { h: "Who can do it?", blocks: [
        { list: [`Anyone aged ${dsd.minAge} or over`, "Non-swimmers: swimming ability isn't required", "Complete beginners: no experience needed", "Anyone in reasonable health. Tell your instructor about any medical conditions beforehand"] },
        `Younger children can start with Try Scuba from age ${tryScuba.minAge}.`,
      ] },
      { h: "What's included?", blocks: [{ list: dsd.details }] },
      { h: "How does a session run?", blocks: [
        { list: [
          "Safety briefing: how the equipment works, hand signals and the key rules",
          "Kit up: your scuba equipment is fitted for you",
          "First breaths: in shallow water, face under, breathing slowly through the regulator",
          "Basic skills: an introduction to core scuba skills with your instructor",
          "Explore: time to move around the pool and enjoy it",
          "Certificate: a digital certificate of participation",
        ], ordered: true },
      ] },
      { h: "Where can you do Discover Scuba Diving in Zambia?", blocks: [
        "Sessions run in Lusaka at:",
        venueList,
        `Beyond Lusaka, the ${N} also dives at ${otherSitesText}.`,
      ] },
      { h: "Discover Scuba Diving or Try Scuba?", blocks: [{ table: compareTable }] },
      { h: "What comes after your first dive?", blocks: [
        `After your first dive you can book a full day of Pond Scuba (${pond.price}). An Open Water Diver course at Lake Tanganyika is coming soon, planned at ${ow.price} or the kwacha equivalent, for those who want to learn to dive independently.`,
      ] },
    ],
    faq: [
      { q: "How much does Discover Scuba Diving cost in Zambia?", a: `${dsd.price} per person, with all equipment included.` },
      { q: "How long does it take?", a: `${dsd.duration}.` },
      { q: "What is the minimum age?", a: `${dsd.minAge} years. Children from ${tryScuba.minAge} can do Try Scuba instead.` },
      QA_SWIM, QA_CERT, QA_GROUP, QA_BOOK,
    ],
    related: ["what-to-expect-first-scuba-dive", "book-discover-scuba-diving-zambia", "scuba-diving-safety-for-beginners", "try-scuba-zambia"],
  },
  {
    slug: "what-to-expect-first-scuba-dive",
    title: "What to Expect on Your First Scuba Dive",
    metaTitle: "What to Expect on Your First Scuba Dive: A Beginner's Guide",
    description: "What happens on your first scuba dive, step by step: the safety briefing, equipment, first breaths underwater, equalising your ears and the skills you may practise.",
    kicker: "Beginner guide",
    heroLines: ["What to expect on", "your first dive"],
    image: "/img/gear.jpg",
    alt: "Scuba equipment laid out ready for a first dive",
    published: PUB,
    updated: PUB,
    answer: `On your first scuba dive you get a safety briefing, are fitted with equipment, and practise breathing underwater in shallow water with an instructor beside you before doing anything more. Breathing from a regulator can feel strange at first, and usually settles once you relax and breathe slowly. With the ${N}, first dives take place in Lusaka pools, last ${dsd.duration}, need no swimming ability, and groups are limited to ${GROUP_MAX}.`,
    takeaways: [
      "It starts on dry land with a safety briefing",
      "Your first breaths happen in shallow water, at your own pace",
      "Breathe slowly and continuously; never hold your breath",
      "Equalise your ears early and often as you go down",
    ],
    facts: [["Duration", dsd.duration], ["Swimming", "Not required"], ["Group size", `Max ${GROUP_MAX}`], ["Bring", "Swimwear and a towel"], ["Equipment", "Provided"], ["Where", "Lusaka pools or your own pool"]],
    sections: [
      { h: "Before you arrive", blocks: [
        { list: ["Bring swimwear and a towel; all scuba equipment is provided", "Eat a light meal beforehand and drink water", "Avoid alcohol before diving", "Don't dive with a cold or blocked nose; it makes equalising your ears difficult", "Tell your instructor about any medical conditions before the session"] },
      ] },
      { h: "The safety briefing", blocks: [
        "Every session starts with a briefing on dry land. Your instructor explains how the equipment works and the few rules that matter most:",
        { list: ["Breathe slowly and continuously, and never hold your breath", "Equalise your ears early and often", "Stay close to your instructor", "Use hand signals: OK, something's wrong, go up, go down"] },
      ] },
      { h: "Your equipment, explained", blocks: [{ table: { head: ["Item", "What it does"], rows: [
        ["Mask", "Lets you see clearly underwater by keeping an air space in front of your eyes"],
        ["Regulator", "The mouthpiece you breathe from; it delivers air from the cylinder"],
        ["Cylinder", "The tank that holds your air supply"],
        ["BCD (jacket)", "An inflatable jacket that holds the cylinder and helps you float or sink"],
        ["Fins", "Help you move through the water with little effort"],
        ["Weights", "Offset your natural buoyancy so you can stay underwater"],
      ] } }] },
      { h: "Your first breaths underwater", blocks: [
        "You start in shallow water where you can stand. With the regulator in your mouth, you put your face under and breathe. Take slow, deep breaths in and out through your mouth.",
        "It's normal to notice the sound of your own bubbles and the feel of the mask on your face. Once you're comfortable, your instructor takes you a little further.",
      ] },
      { h: "How to equalise your ears", blocks: [
        "As you go deeper, water pressure pushes on your eardrums. To relieve it, pinch your nose through the mask and gently blow against it, or swallow. Do this early and often, before you feel discomfort. If your ears hurt, signal your instructor, go up a little and try again. Never force it.",
      ] },
      { h: "Skills you may practise", blocks: [
        "On a Discover Scuba Diving session you get an introduction to basic scuba skills. These often include:",
        { list: ["Clearing a little water out of your mask", "Finding and replacing your regulator", "Controlling how you float and move"] },
      ] },
      { h: "After the dive", blocks: [
        "From here you can book a full day of Pond Scuba, dive at one of our other locations, or join the waitlist for our Open Water Diver course.",
      ] },
    ],
    faq: [
      { q: "Will I feel claustrophobic?", a: "Some people feel a little uneasy at first. Starting in shallow water, breathing slowly and going at your own pace usually helps. Your instructor stays close and you can come up whenever you need to." },
      { q: "Does it hurt your ears?", a: "Not if you equalise early and often. If your ears hurt, signal your instructor, go up slightly and try again." },
      QA_SWIM, QA_BRING, QA_MEDICAL, QA_GROUP,
    ],
    related: ["scuba-diving-safety-for-beginners", "discover-scuba-diving-zambia", "introductory-scuba-diving-how-to-get-started", "try-scuba-zambia"],
  },
  {
    slug: "introductory-scuba-diving-how-to-get-started",
    title: "Introductory Scuba Diving: How to Get Started",
    metaTitle: "Introductory Scuba Diving: How to Get Started in Zambia",
    description: `How to get started with scuba diving in Zambia: choose an introductory session (Try Scuba ${tryScuba.price} or Discover Scuba Diving ${dsd.price}), book, prepare, and where to go next.`,
    kicker: "Getting started",
    heroLines: ["Introductory scuba:", "how to get started"],
    image: "/img/pool-dsd.jpg",
    alt: "A beginner's first scuba session in a pool",
    published: PUB,
    updated: PUB,
    answer: `The easiest way to start scuba diving is an introductory pool session with a qualified instructor. In Zambia you can choose Try Scuba (${tryScuba.price}, from age ${tryScuba.minAge}) or Discover Scuba Diving (${dsd.price}, from age ${dsd.minAge}) with the ${N} in Lusaka. Neither needs swimming ability or experience. After that you can progress to a full day of Pond Scuba and, when it launches, an Open Water Diver course.`,
    takeaways: [
      "Start with a supervised introductory session in a pool",
      `Try Scuba from age ${tryScuba.minAge}, Discover Scuba Diving from ${dsd.minAge}`,
      "No swimming ability or experience needed",
      "Progress to Pond Scuba, then an Open Water Diver course (coming soon)",
    ],
    facts: [["Try Scuba", `${tryScuba.price} · age ${tryScuba.minAge}+`], ["Discover Scuba Diving", `${dsd.price} · age ${dsd.minAge}+`], ["Pond Scuba", `${pond.price} · full day`], ["Open Water", `${ow.price} · coming soon`], ["Booking", "WhatsApp or online"]],
    sections: [
      { h: "Introductory experience or certification?", blocks: [
        "An introductory experience lets you dive under the direct supervision of an instructor, in a controlled setting, on the day. A certification course, like Open Water Diver, teaches you the knowledge and skills to dive with a buddy without an instructor. Most people start with an introductory session first.",
      ] },
      { h: "Step 1: Choose your first session", blocks: [{ table: priceTable }] },
      { h: "Step 2: Book", blocks: [
        `Message ${wa} or use the booking form. Tell us how many people, their ages, and your preferred date and venue. We reply within ${REPLY_TIME}.`,
        { links: [{ href: "/articles/book-discover-scuba-diving-zambia", label: "How to book Discover Scuba Diving" }] },
      ] },
      { h: "Step 3: Prepare", blocks: [
        { list: ["Bring swimwear and a towel", "Eat lightly and avoid alcohol beforehand", "Don't dive with a cold", "Tell your instructor about any medical conditions"] },
      ] },
      { h: "Step 4: Your first session", blocks: [
        `Sessions run at ${venues3}, or at your own pool, and take ${dsd.duration}. A PADI-certified instructor leads every group of up to ${GROUP_MAX}.`,
        { links: [{ href: "/articles/what-to-expect-first-scuba-dive", label: "What to expect on your first dive" }] },
      ] },
      { h: "Step 5: Keep going", blocks: [
        { list: [`Pond Scuba: a full day of supervised scuba (${pond.price})`, `Dives at ${otherSitesText}`, `Open Water Diver course at Lake Tanganyika: coming soon, planned at ${ow.price}`] },
      ] },
    ],
    faq: [
      { q: "What is the best way to start scuba diving?", a: "With an introductory session in a pool, led by a qualified instructor. It's the safest way to find out if you enjoy it." },
      { q: "How much does it cost to start scuba diving in Zambia?", a: `From ${tryScuba.price} for Try Scuba, or ${dsd.price} for Discover Scuba Diving, with equipment included.` },
      QA_SWIM,
      { q: "Can I get certified in Zambia?", a: `An Open Water Diver course at Lake Tanganyika is coming soon, taught by PADI-certified instructors, planned at ${ow.price} or the kwacha equivalent.` },
      QA_BOOK,
    ],
    related: ["discover-scuba-diving-zambia", "try-scuba-zambia", "what-to-expect-first-scuba-dive", "book-discover-scuba-diving-zambia"],
  },
  {
    slug: "scuba-diving-safety-for-beginners",
    title: "Scuba Diving Safety for Beginners",
    metaTitle: "Scuba Diving Safety for Beginners: The Rules That Matter",
    description: "Scuba diving safety for beginners: never hold your breath, equalise early, go slowly, stay with your instructor, and when not to dive. Plus how our sessions are run.",
    kicker: "Safety",
    heroLines: ["Scuba safety", "for beginners"],
    image: "/img/gear.jpg",
    alt: "Scuba equipment checked and ready for a beginner session",
    published: PUB,
    updated: PUB,
    answer: `Scuba diving can be a safe activity for beginners when it's done in a controlled setting with a qualified instructor and a few simple rules: breathe continuously and never hold your breath, equalise your ears early and often, move slowly, and stay with your instructor. ${N} beginner sessions take place in a pool or pond, start with a safety briefing, and are led by PADI-certified instructors with no more than ${GROUP_MAX} participants per group.`,
    takeaways: [
      "Never hold your breath underwater",
      "Equalise your ears early and often",
      "Move slowly and stay with your instructor",
      "Don't dive when unwell, and declare medical conditions",
    ],
    facts: [["Setting", "Pool or pond"], ["Briefing", "Before every session"], ["Instructors", "PADI-certified"], ["Group size", `Max ${GROUP_MAX}`], ["Equipment", "Provided"]],
    sections: [
      { h: "Rule 1: Never hold your breath", blocks: [
        "This is the most important rule in scuba. The air in your lungs expands as you rise toward the surface, so holding your breath while ascending can injure your lungs. Breathe slowly and continuously the whole time you're underwater.",
      ] },
      { h: "Rule 2: Equalise your ears early and often", blocks: [
        "Pinch your nose through your mask and gently blow, or swallow, as you go down. Start before you feel pressure. If it hurts, go up a little and try again; never force it.",
      ] },
      { h: "Rule 3: Go slowly", blocks: [
        "Slow movements and slow breathing use less air, keep you calm and make it easier to control where you are in the water. Come up slowly too.",
      ] },
      { h: "Rule 4: Stay with your instructor and use signals", blocks: [
        "Stay close and keep an eye on your instructor. Learn the basic hand signals in the briefing: OK, something's wrong, go up and go down. If anything feels wrong, signal straight away.",
      ] },
      { h: "When not to dive", blocks: [
        { list: ["When you have a cold, flu or blocked sinuses", "After drinking alcohol", "If you feel unwell, exhausted or anxious and don't want to", "If you have a medical condition that hasn't been cleared. Tell your instructor beforehand; some conditions need a doctor's approval"] },
      ] },
      { h: "How our sessions are run", blocks: [
        { list: [`Led by PADI-certified instructors: ${instructors}`, `No more than ${GROUP_MAX} participants per group`, "Every session starts with a safety briefing", "Beginner sessions take place in a pool or pond", "All scuba equipment is provided and fitted for you"] },
      ] },
      { h: "A quick safety checklist", blocks: [{ table: { head: ["When", "What to do"], rows: [
        ["Before", "Rest, eat lightly, no alcohol, declare medical conditions"],
        ["In the briefing", "Learn the hand signals and ask questions"],
        ["Underwater", "Breathe continuously, equalise early, move slowly, stay close"],
        ["If something feels wrong", "Signal your instructor straight away"],
      ] } }, { note: "This guide is general information for beginners, not medical advice." }] },
    ],
    faq: [
      { q: "Is scuba diving safe for beginners?", a: "It can be, when done in a controlled setting with a qualified instructor, a safety briefing and a few simple rules: breathe continuously, equalise early, move slowly and stay with your instructor." },
      { q: "What is the most important scuba safety rule?", a: "Never hold your breath. Breathe slowly and continuously the whole time you're underwater." },
      QA_MEDICAL, QA_SWIM, QA_GROUP,
    ],
    related: ["what-to-expect-first-scuba-dive", "scuba-diving-for-children", "discover-scuba-diving-zambia", "introductory-scuba-diving-how-to-get-started"],
  },
  {
    slug: "book-discover-scuba-diving-zambia",
    title: "Book Discover Scuba Diving in Zambia",
    metaTitle: `Book Discover Scuba Diving in Zambia: ${dsd.price}, Lusaka`,
    description: `How to book Discover Scuba Diving in Zambia: message us on WhatsApp or use the form. ${dsd.price} per person, ${dsd.duration}, age ${dsd.minAge}+, Lusaka venues or your own pool. Reply within ${REPLY_TIME}.`,
    kicker: "Booking",
    heroLines: ["Book Discover Scuba", "Diving in Zambia"],
    image: "/img/pool-dsd.jpg",
    alt: "Discover Scuba Diving session underway in a Lusaka pool",
    published: PUB,
    updated: PUB,
    answer: `To book Discover Scuba Diving in Zambia with the ${N}, message ${wa} or use the form on this page. Tell us how many people, their ages, and your preferred date and venue. We reply within ${REPLY_TIME}. Sessions cost ${dsd.price} per person, take ${dsd.duration}, and run at ${venues3}, or at your own pool.`,
    takeaways: [
      `Message ${SITE.whatsapp.display} on WhatsApp, or use the form below`,
      `We reply within ${REPLY_TIME}`,
      `${dsd.price} per person, ${dsd.duration}, from age ${dsd.minAge}`,
      "Choose a Lusaka venue or your own pool",
    ],
    facts: facts(dsd),
    sections: [
      { h: "What to tell us when you book", blocks: [
        { list: ["How many people", "Their ages", "Your preferred date", "Your preferred venue, or whether you have a pool", "Any medical conditions we should know about"] },
      ] },
      { h: "Prices", blocks: [{ table: priceTable }, "All prices include equipment. Group, school and corporate bookings are quoted on request."] },
      { h: "Venues", blocks: [venueList] },
      { h: "What happens after you book?", blocks: [
        { list: [`We reply on WhatsApp within ${REPLY_TIME}`, "We confirm your date, venue and price", "On the day: safety briefing, kit up, and into the water with your instructor"], ordered: true },
      ] },
      { h: "Booking for children or a group?", blocks: [
        `Children from ${dsd.minAge} can do Discover Scuba Diving; from ${tryScuba.minAge} they can do Try Scuba. For birthdays, schools and team days, groups are run in sessions of up to ${GROUP_MAX}.`,
        { links: [{ href: "/articles/scuba-diving-for-children", label: "Scuba diving for children" }, { href: "/go/schools", label: "School programmes" }, { href: "/go/team-building", label: "Team building" }] },
      ] },
    ],
    faq: [
      QA_BOOK,
      { q: "How much does it cost?", a: `${dsd.price} per person, with all equipment included.` },
      { q: "Can you come to my house?", a: "Yes. If you have a pool, we bring the equipment and PADI-certified instructors to you." },
      { q: "Can I book for a group?", a: `Yes. Groups are run in sessions of up to ${GROUP_MAX}. Group, school and corporate bookings are quoted on request.` },
      QA_BRING,
    ],
    related: ["discover-scuba-diving-zambia", "what-to-expect-first-scuba-dive", "try-scuba-zambia", "scuba-diving-safety-for-beginners"],
    booking: {
      topic: "Article: Book Discover Scuba Diving",
      fields: [
        { key: "experience", label: "Which experience?", type: "select", options: [`Discover Scuba Diving (${dsd.price}, age ${dsd.minAge}+)`, `Try Scuba (${tryScuba.price}, age ${tryScuba.minAge}+)`, `Pond Scuba (${pond.price}, full day)`] },
        { key: "group", label: "How many people?", type: "number", placeholder: "e.g. 2", maps: "group" },
        { key: "date", label: "Preferred date", type: "text", placeholder: "e.g. Saturday 25 October", maps: "date" },
        { key: "venue", label: "Venue", type: "select", options: ["Not sure yet", ...LUSAKA_VENUES.slice(0, 3), "Our own pool"] },
      ],
    },
  },
  {
    slug: "try-scuba-zambia",
    title: "Try Scuba in Zambia: A First Underwater Experience",
    metaTitle: `Try Scuba in Zambia: A First Underwater Experience (${tryScuba.price})`,
    description: `Try Scuba in Zambia: a guided first taste of breathing underwater from age ${tryScuba.minAge}. ${tryScuba.price} per person, ${tryScuba.duration}, equipment included, no swimming needed, Lusaka pools or your own pool.`,
    kicker: "Try Scuba",
    heroLines: ["Try Scuba", "in Zambia"],
    image: "/img/pool-dsd.jpg",
    alt: "A first-timer trying scuba in a pool with an instructor",
    published: PUB,
    updated: PUB,
    answer: `Try Scuba is a guided first taste of breathing underwater, open to anyone aged ${tryScuba.minAge} and over. With the ${N} it costs ${tryScuba.price} per person, takes ${tryScuba.duration} in a Lusaka pool or your own pool, includes all equipment and a safety briefing, needs no swimming ability, and groups are capped at ${GROUP_MAX} with a PADI-certified instructor.`,
    takeaways: [
      `${tryScuba.price} per person, from age ${tryScuba.minAge}`,
      `${tryScuba.duration}, equipment included`,
      "No swimming ability or experience needed",
      "Ideal for families, younger children and nervous first-timers",
    ],
    facts: facts(tryScuba),
    sections: [
      { h: "What is Try Scuba?", blocks: [
        "Try Scuba is an easy, guided introduction to breathing underwater. You get a safety briefing, put on the equipment and spend time in shallow water with your instructor. It's the quickest way to find out whether diving is for you.",
      ] },
      { h: "Who is it for?", blocks: [
        { list: [`Children aged ${tryScuba.minAge} to 9, who are too young for Discover Scuba Diving`, "Families who want to try it together", "Anyone nervous about the water who wants a gentle start", "Non-swimmers: swimming isn't required"] },
      ] },
      { h: "What's included?", blocks: [{ list: tryScuba.details }] },
      { h: "Try Scuba or Discover Scuba Diving?", blocks: [{ table: compareTable }] },
      { h: "Where can you Try Scuba?", blocks: [venueList] },
      { h: "After Try Scuba", blocks: [
        `From age ${dsd.minAge} you can move on to Discover Scuba Diving, which adds basic scuba skills and a certificate of participation, or a full day of Pond Scuba.`,
      ] },
    ],
    faq: [
      { q: "What is the minimum age for Try Scuba?", a: `${tryScuba.minAge} years old.` },
      { q: "How much does Try Scuba cost?", a: `${tryScuba.price} per person, with equipment included.` },
      { q: "How long does it take?", a: `${tryScuba.duration}.` },
      QA_SWIM, QA_GROUP, QA_BOOK,
    ],
    related: ["scuba-diving-for-children", "discover-scuba-diving-zambia", "what-to-expect-first-scuba-dive", "book-discover-scuba-diving-zambia"],
  },
  {
    slug: "scuba-diving-for-children",
    title: "Scuba Diving for Children: What Families Should Know",
    metaTitle: "Scuba Diving for Children: What Families Should Know (Zambia)",
    description: `Scuba diving for children in Zambia: ages (Try Scuba from ${tryScuba.minAge}, Discover Scuba Diving from ${dsd.minAge}), safety, readiness, ears and cold, and how to book a family or birthday session.`,
    kicker: "Families",
    heroLines: ["Scuba diving", "for children"],
    image: "/img/pool-dsd.jpg",
    alt: "A young diver and instructor underwater in a pool",
    published: PUB,
    updated: PUB,
    answer: `Children in Zambia can start scuba diving from age ${tryScuba.minAge} with Try Scuba (${tryScuba.price}) and from age ${dsd.minAge} with Discover Scuba Diving (${dsd.price}) or Pond Scuba, with the ${N}. Sessions take place in a pool, need no swimming ability, start with a safety briefing and are led by PADI-certified instructors with no more than ${GROUP_MAX} children per group.`,
    takeaways: [
      `Try Scuba from age ${tryScuba.minAge}; Discover Scuba Diving from ${dsd.minAge}`,
      "Pool sessions with a safety briefing first",
      `No more than ${GROUP_MAX} children per group`,
      "A good fit if your child is comfortable in water and keen to try",
    ],
    facts: [["Ages 6–9", "Try Scuba"], [`Ages ${dsd.minAge}+`, "Try Scuba, Discover Scuba Diving, Pond Scuba"], ["Swimming", "Not required"], ["Group size", `Max ${GROUP_MAX}`], ["Instructors", "PADI-certified"], ["Where", "Lusaka pools or your own pool"]],
    sections: [
      { h: "What age can children start scuba diving?", blocks: [{ table: { head: ["Age", "Options", "Price"], rows: [
        [`${tryScuba.minAge}–9`, "Try Scuba", tryScuba.price],
        [`${dsd.minAge}+`, "Try Scuba, Discover Scuba Diving, Pond Scuba", `${tryScuba.price} – ${pond.price}`],
      ] } }] },
      { h: "Is scuba diving safe for children?", blocks: [
        "Children's sessions are built around a controlled setting:",
        { list: ["Sessions take place in a pool", "Every session starts with a safety briefing", `No more than ${GROUP_MAX} children per group`, `Led by PADI-certified instructors: ${instructors}`] },
      ] },
      { h: "Is your child ready?", blocks: [
        "Swimming isn't required, but these are good signs:",
        { list: ["They're comfortable putting their face in the water", "They can listen to and follow instructions", "They want to do it themselves, rather than being persuaded"] },
      ] },
      { h: "Ears, cold and comfort", blocks: [
        "Children's ears can be sensitive to pressure, so they learn to equalise gently and early, and should not dive with a cold or blocked nose. Children also tend to feel the cold sooner than adults, so bring a towel and something warm for afterwards.",
      ] },
      { h: "What parents can do", blocks: [
        { list: ["Tell the instructor about any medical conditions or ear problems", "Bring swimwear, a towel and a snack", "Talk through what will happen so there are no surprises", "Let your child go at their own pace"] },
      ] },
      { h: "Birthdays, families and schools", blocks: [
        "Sessions can run at your own pool, which makes them popular for birthdays and family days. Schools can book group sessions too.",
        { links: [{ href: "/go/kids-scuba-party", label: "Scuba birthday parties" }, { href: "/go/schools", label: "School programmes" }, { href: "/articles/try-scuba-zambia", label: "Try Scuba in Zambia" }] },
      ] },
    ],
    faq: [
      { q: "What age can children scuba dive in Zambia?", a: `From ${tryScuba.minAge} with Try Scuba, and from ${dsd.minAge} with Discover Scuba Diving or Pond Scuba.` },
      { q: "Does my child need to swim?", a: "No. Swimming ability is not required." },
      { q: "Is scuba diving safe for children?", a: `Children's sessions take place in a pool, start with a safety briefing and are led by PADI-certified instructors, with no more than ${GROUP_MAX} children per group.` },
      { q: "Can you run a scuba birthday party?", a: "Yes. Sessions can run at your own pool, with all equipment and instructors brought to you." },
      QA_BOOK,
    ],
    related: ["try-scuba-zambia", "scuba-diving-safety-for-beginners", "what-to-expect-first-scuba-dive", "discover-scuba-diving-zambia"],
  },
];

export const article = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export function readMins(a: Article) {
  const text = [a.answer, ...a.sections.flatMap((s) => [s.h, ...s.blocks.map((b) => (typeof b === "string" ? b : JSON.stringify(b)))]), ...a.faq.map((f) => f.q + f.a)].join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}

