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

const QA_SWIM: QA = { q: "Do I need to be able to swim to scuba dive?", a: `No. Swimming ability is not required for Try Scuba, Discover Scuba Diving or Pond Scuba with the ${N}. Every beginner session in Zambia takes place in a pool or pond, starts with a safety briefing on dry land and is led by a PADI-certified instructor, with a maximum of ${GROUP_MAX} people per group. For example, complete non-swimmers start in water shallow enough to stand in.` };
const QA_BOOK: QA = { q: "How do I book scuba diving in Zambia?", a: `Booking scuba diving in Zambia with the ${N} takes one message to ${wa} or an enquiry at zambianadventures.com. Include the number of divers, their ages, the preferred date and the venue: Millennium Village, GOGO Fitness, the Radisson Blu Hotel or a private pool. The team replies within ${REPLY_TIME} to confirm the date, venue and price.` };
const QA_GROUP: QA = { q: "How many people are in a scuba group?", a: `Each beginner scuba group with the ${N} has a maximum of ${GROUP_MAX} people, led by a PADI-certified instructor. Small groups mean every first-time diver in Zambia gets close attention in the water, and larger parties, such as birthdays or school classes, are split into several groups. For example, 8 children would dive as two groups of four.` };
const QA_CERT: QA = { q: "Is Discover Scuba Diving a certification?", a: `No. Discover Scuba Diving is an introductory experience, not a diving certification. Each participant receives a digital certificate of participation. A certification course, such as Open Water Diver, teaches the skills needed to dive with a buddy without an instructor. The ${N} plans an Open Water Diver course at Lake Tanganyika, coming soon at US$550 or the kwacha equivalent.` };
const QA_BRING: QA = { q: "What should I bring to a scuba session?", a: `Bring swimwear and a towel to a scuba session with the ${N}. All scuba equipment is provided, including the mask, regulator, cylinder, fins and buoyancy jacket, so first-time divers in Zambia do not need to buy or rent anything. A light meal beforehand, plenty of water and something warm to wear afterwards also help, especially for children.` };
const QA_MEDICAL: QA = { q: "Can I scuba dive with a medical condition?", a: `Anyone with a medical condition should tell the instructor before a scuba session with the ${N}. Some conditions need a doctor's approval before diving, for example certain heart or lung conditions. Nobody should dive with a cold, flu or blocked nose, because congestion makes equalising the ears difficult and painful. This answer is general information, not medical advice.` };

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
    answer: `Discover Scuba Diving is a beginner scuba experience for people who want to breathe underwater for the first time without first earning a certification. In Zambia, the ${N} runs Discover Scuba Diving in Lusaka pools at ${venues3}, or in a customer's own pool. A session costs ${dsd.price} per person and takes ${dsd.duration}. Participants must be at least ${dsd.minAge} years old, swimming ability is not required, and each group has a maximum of ${GROUP_MAX} people led by a PADI-certified instructor.`,
    takeaways: [
      `${dsd.price} per person, ${dsd.duration}, from age ${dsd.minAge}`,
      "No swimming ability or diving experience needed",
      `Max ${GROUP_MAX} people per group, led by PADI-certified instructors`,
      "An introductory experience, not a certification",
    ],
    facts: facts(dsd),
    sections: [
      { h: "What is Discover Scuba Diving?", blocks: [
        `Discover Scuba Diving is an introductory scuba experience for people who have never dived before. At the ${N}, Discover Scuba Diving runs in Lusaka swimming pools and gives first-timers a safe, supervised way to breathe underwater. The session is not a diving certification. Instead, Discover Scuba Diving works as a supervised trial dive: a PADI-certified instructor explains the equipment, fits the gear and stays beside each participant in the water.`,
        `Each session costs ${dsd.price} per person and takes ${dsd.duration}. The price includes professional scuba equipment, a safety briefing, a pool training session, an introduction to basic scuba skills and a digital certificate of participation. Groups are capped at ${GROUP_MAX} people, so every diver gets close attention. For example, a family of four fits into a single group with one instructor. Discover Scuba Diving is the natural first step for anyone in Zambia thinking about a full Open Water Diver course later.`,
      ] },
      { h: "Who can do Discover Scuba Diving in Zambia?", blocks: [
        `Discover Scuba Diving in Zambia is open to anyone aged ${dsd.minAge} or older who is in reasonable health. Swimming ability is not required, and no previous diving experience is needed, because the ${N} runs every session in a pool with an instructor beside each participant. Complete beginners, nervous swimmers and curious teenagers all start at the same level.`,
        `Before the session, each participant should tell the instructor about any medical condition. Some conditions need a doctor's approval before diving, and nobody should dive with a cold or a blocked nose. Children younger than ${dsd.minAge} are not left out: Try Scuba is open from age ${tryScuba.minAge} and costs ${tryScuba.price} per person. For example, a family with children aged 7 and 12 could book Try Scuba for the younger child and Discover Scuba Diving for the older child on the same day, with both sessions led by PADI-certified instructors in Lusaka.`,
      ] },
      { h: "How does a Discover Scuba Diving session run?", blocks: [
        `A Discover Scuba Diving session with the ${N} follows five steps and lasts ${dsd.duration}. Step 1 is the safety briefing on dry land, where the instructor explains the equipment, the hand signals and the key safety rules. Step 2 is kitting up: the instructor fits the mask, buoyancy jacket and scuba cylinder for each diver.`,
        "Step 3 is the first breath underwater. Divers start in water shallow enough to stand in, put their faces under and breathe slowly through the regulator. Step 4 is an introduction to basic scuba skills, such as clearing a little water from the mask and recovering the regulator. Step 5 is free time to move around the pool and enjoy the feeling of breathing underwater. Finally, every participant receives a digital certificate of participation. In practice, most of the session is spent in the water rather than in the classroom.",
      ] },
      { h: "Where can you do Discover Scuba Diving in Zambia?", blocks: [
        `The ${N} runs Discover Scuba Diving at three Lusaka venues: ${venues3}. Families and groups with a private pool can also book a session at home, because the instructors bring all the scuba equipment to the customer. Every venue offers the same session, price and group size, so the choice usually comes down to location and convenience.`,
        `Beyond Lusaka, the ${N} also dives at ${otherSitesText}. Chisamba is used for pond dives, while Lake Tanganyika is the company's home base at Isanga Bay near Mpulungu, with 25 mapped dive sites ranging from a sandy training bay to walls deeper than 60 metres. Most beginners in Zambia start in a Lusaka pool with Discover Scuba Diving, then progress to open-water locations once they feel confident underwater. Booking any venue works the same way, through WhatsApp or the online enquiry form.`,
      ] },
      { h: "Is Discover Scuba Diving or Try Scuba better for beginners?", blocks: [
        `Discover Scuba Diving and Try Scuba are both beginner experiences offered by the ${N} in Lusaka, and both last ${dsd.duration} with a maximum of ${GROUP_MAX} people per group. The main differences are age, price and content. Try Scuba is open from age ${tryScuba.minAge}, costs ${tryScuba.price} and offers a guided first taste of breathing underwater in shallow water. Discover Scuba Diving is open from age ${dsd.minAge}, costs ${dsd.price} and adds an introduction to basic scuba skills plus a digital certificate of participation.`,
        `For example, a nervous adult or a child aged 6 to 9 usually suits Try Scuba, while a teenager or adult who wants to learn real skills usually suits Discover Scuba Diving. Neither option requires swimming ability.`,
        { table: compareTable },
      ] },
      { h: "What comes after your first dive?", blocks: [
        `After a first dive with Discover Scuba Diving, beginners in Zambia have three clear next steps with the ${N}. First, Pond Scuba offers a full day of supervised scuba for ${pond.price} per person, from age ${pond.minAge}, and suits groups, schools and celebrations. Second, divers can join trips to ${otherSitesText}.`,
        `Third, an Open Water Diver course at Lake Tanganyika is coming soon, taught by PADI-certified instructors and planned at US$550 or the kwacha equivalent. An Open Water Diver course is different from Discover Scuba Diving: a certification course teaches the knowledge and skills needed to dive with a buddy without an instructor, while Discover Scuba Diving is a supervised introduction. Anyone interested in the Open Water course can join the waitlist through the website and hear the dates first. In practice, many people decide on the next step only after feeling the first breath underwater.`,
      ] },
    ],
    faq: [
      { q: "How much does Discover Scuba Diving cost in Zambia?", a: `Discover Scuba Diving with the ${N} costs ${dsd.price} per person in 2026. The price includes professional scuba equipment, a safety briefing, a pool training session, an introduction to basic scuba skills and a digital certificate of participation. Try Scuba costs ${tryScuba.price} for younger children, and group, school and corporate bookings in Zambia receive a quote on request.` },
      { q: "How long does Discover Scuba Diving take?", a: `A Discover Scuba Diving session in Lusaka takes ${dsd.duration}. The time covers the safety briefing on dry land, fitting the scuba equipment, the first breaths in shallow water, an introduction to basic skills and free time underwater with a PADI-certified instructor. For example, a morning session usually leaves the afternoon free. Groups are capped at ${GROUP_MAX} people.` },
      { q: "What is the minimum age for Discover Scuba Diving?", a: `The minimum age for Discover Scuba Diving with the ${N} is ${dsd.minAge} years. Children aged ${tryScuba.minAge} to 9 can join Try Scuba instead, which costs ${tryScuba.price} per person, lasts ${tryScuba.duration} and needs no swimming ability. Both sessions run in Lusaka pools with PADI-certified instructors and a maximum of ${GROUP_MAX} people per group.` },
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
    answer: `A first scuba dive is a supervised session where a beginner gets a safety briefing, is fitted with scuba equipment and practises breathing underwater in shallow water with an instructor beside them. Breathing from a regulator can feel strange at first and usually settles once the diver relaxes and breathes slowly. With the ${N}, first dives take place in Lusaka pools, last ${dsd.duration}, need no swimming ability and run in groups of no more than ${GROUP_MAX} people, led by PADI-certified instructors.`,
    takeaways: [
      "The dive starts on dry land with a safety briefing",
      "First breaths happen in shallow water, at the diver's own pace",
      "Breathe slowly and continuously; never hold your breath",
      "Equalise your ears early and often while descending",
    ],
    facts: [["Duration", dsd.duration], ["Swimming", "Not required"], ["Group size", `Max ${GROUP_MAX}`], ["Bring", "Swimwear and a towel"], ["Equipment", "Provided"], ["Where", "Lusaka pools or your own pool"]],
    sections: [
      { h: "How should you prepare for your first scuba dive?", blocks: [
        `Preparing for a first scuba dive is simple. First, bring swimwear and a towel, because the ${N} provides all scuba equipment. Second, eat a light meal and drink water before the session, since diving on an empty stomach or after a heavy meal is uncomfortable. Third, avoid alcohol before diving.`,
        "Additionally, nobody should dive with a cold, flu or blocked nose, because congestion makes equalising the ears difficult and painful. Finally, tell the instructor about any medical condition before the session starts. Some conditions need a doctor's approval before diving, and an instructor would rather know in advance than discover a problem in the water. In practice, a first-time diver who arrives rested, hydrated and healthy has the easiest and most enjoyable first dive. Arriving a few minutes early also leaves time for questions before the briefing begins.",
      ] },
      { h: "What happens in the scuba safety briefing?", blocks: [
        `The safety briefing is the first part of every scuba session with the ${N} and takes place on dry land before anyone enters the water. During the briefing, a PADI-certified instructor explains how each piece of scuba equipment works and teaches the few rules beginners need most.`,
        "The first rule is to breathe slowly and continuously and never hold your breath underwater. The second rule is to equalise the ears early and often while going down. The third rule is to stay close to the instructor at all times. The instructor also teaches four essential hand signals: OK, something is wrong, go up and go down. For example, a diver who feels ear pressure signals the instructor, rises slightly and tries again. The briefing is also the right moment to ask questions, so first-time divers should speak up about anything unclear before kitting up.",
      ] },
      { h: "What scuba equipment does a beginner use?", blocks: [
        `A beginner on a first scuba dive uses six main pieces of equipment, all provided by the ${N}. The mask keeps an air space in front of the eyes so the diver can see clearly. The regulator is the mouthpiece a diver breathes from, delivering air from the cylinder. The cylinder is the tank that holds the air supply. The buoyancy control device, or BCD, is an inflatable jacket that holds the cylinder and helps the diver float or sink. Fins help a diver move through the water with little effort. Weights offset natural buoyancy so the diver can stay underwater.`,
        "The instructor fits each item before the dive, checks the equipment works and shows the diver how to use the regulator and BCD. First-time divers do not need to buy or rent anything.",
        { table: { head: ["Item", "What it does"], rows: [
          ["Mask", "Keeps an air space in front of the eyes for clear vision"],
          ["Regulator", "The mouthpiece that delivers air from the cylinder"],
          ["Cylinder", "The tank that holds the air supply"],
          ["BCD (jacket)", "Inflatable jacket that holds the cylinder and controls floating"],
          ["Fins", "Help the diver move with little effort"],
          ["Weights", "Offset natural buoyancy so the diver stays underwater"],
        ] } },
      ] },
      { h: "What does breathing underwater feel like?", blocks: [
        "Breathing underwater for the first time feels unusual but quickly becomes natural. On a first scuba dive, beginners start in water shallow enough to stand in. With the regulator in the mouth, the diver puts the face under the surface and takes slow, deep breaths in and out through the mouth.",
        `Common first impressions include the sound of bubbles with every breath out, the gentle pressure of the mask on the face and the slight resistance of the regulator. Each sensation is normal. The most important habit is breathing slowly and continuously, without holding the breath. For example, many beginners find counting a slow rhythm helps them relax. Once the diver is comfortable, the instructor guides the group a little further into the pool. With the ${N}, groups of no more than ${GROUP_MAX} people mean the instructor can match the pace to each diver.`,
      ] },
      { h: "How do you equalise your ears when diving?", blocks: [
        "Equalising the ears means balancing the air pressure inside the ears with the water pressure outside. Water pressure increases with depth and pushes on the eardrums, so a diver needs to equalise early and often while descending. The most common technique is to pinch the nose through the soft part of the mask and gently blow against the closed nose. Swallowing or moving the jaw also helps some divers.",
        "The key is to equalise before any discomfort starts, roughly every arm's length of descent. If the ears hurt, the diver should stop, signal the instructor, rise a little and try again. A diver should never force equalisation by blowing hard. Divers with a cold or blocked nose should not dive, because congestion stops the ears from equalising properly. In practice, ear pressure is the most common issue on a first scuba dive, and equalising early solves most problems.",
      ] },
      { h: "Which scuba skills do beginners practise?", blocks: [
        `On a Discover Scuba Diving session with the ${N}, beginners get an introduction to basic scuba skills under the direct supervision of a PADI-certified instructor. The skills often include clearing a little water out of the mask by breathing out through the nose, finding and replacing the regulator if it comes out of the mouth, and controlling floating and movement in the water.`,
        `The skills are introduced slowly, in shallow water, and each one is demonstrated by the instructor first. Try Scuba, which is open from age ${tryScuba.minAge} and costs ${tryScuba.price}, focuses on the experience of breathing underwater rather than skills. After a first dive, beginners in Zambia can book a full day of Pond Scuba, join dives at ${otherSitesText}, or join the waitlist for the Open Water Diver course at Lake Tanganyika. For example, a diver who enjoyed the pool can use Pond Scuba to build confidence before the lake.`,
      ] },
    ],
    faq: [
      { q: "Will I feel claustrophobic on my first scuba dive?", a: `Some beginners feel uneasy for the first few breaths of a first scuba dive, and the feeling usually passes quickly. Starting in water shallow enough to stand in, breathing slowly and moving at your own pace all help. On sessions with the ${N}, the instructor stays within reach of every diver in a group of up to ${GROUP_MAX}, and a diver can surface at any time.` },
      { q: "Does scuba diving hurt your ears?", a: `Scuba diving should not hurt the ears when the diver equalises early and often by pinching the nose through the mask and blowing gently. Ear pressure is the most common issue on a first dive. If the ears hurt, the diver stops, signals the instructor, rises slightly and tries again, and never forces equalisation. Divers with a cold or blocked nose should not dive.` },
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
    answer: `Introductory scuba diving is a supervised first dive in a pool, led by a qualified instructor, and the easiest way to start scuba diving. In Zambia, beginners can choose Try Scuba (${tryScuba.price}, from age ${tryScuba.minAge}) or Discover Scuba Diving (${dsd.price}, from age ${dsd.minAge}) with the ${N} in Lusaka. Neither option needs swimming ability or experience, and groups are limited to ${GROUP_MAX} people. After an introductory session, divers can progress to a full day of Pond Scuba and, when the course launches, an Open Water Diver course.`,
    takeaways: [
      "Start with a supervised introductory session in a pool",
      `Try Scuba from age ${tryScuba.minAge}, Discover Scuba Diving from ${dsd.minAge}`,
      "No swimming ability or experience needed",
      "Progress to Pond Scuba, then an Open Water Diver course (coming soon)",
    ],
    facts: [["Try Scuba", `${tryScuba.price} · age ${tryScuba.minAge}+`], ["Discover Scuba Diving", `${dsd.price} · age ${dsd.minAge}+`], ["Pond Scuba", `${pond.price} · full day`], ["Open Water", "US$550 · coming soon"], ["Booking", "WhatsApp or online"]],
    sections: [
      { h: "What is the difference between an introductory dive and a certification?", blocks: [
        `An introductory scuba experience is a supervised dive in a controlled setting, such as a swimming pool, where an instructor stays beside the beginner for the whole session. A scuba certification, such as Open Water Diver, is a full course that teaches the knowledge and skills needed to dive with a buddy without an instructor. Most people start with an introductory dive to find out whether scuba diving suits them before committing time and money to a certification.`,
        `In Zambia, the ${N} offers two introductory experiences, Try Scuba and Discover Scuba Diving, both in Lusaka pools. Neither one is a certification. An Open Water Diver course at Lake Tanganyika is coming soon, taught by PADI-certified instructors and planned at US$550 or the kwacha equivalent. For example, a beginner might try Discover Scuba Diving in a Lusaka pool, then join the Open Water waitlist once the course dates are announced.`,
      ] },
      { h: "Step 1: Which introductory scuba session should you choose?", blocks: [
        `Choosing an introductory scuba session in Zambia depends mainly on age and goals. Try Scuba costs ${tryScuba.price} per person, is open from age ${tryScuba.minAge} and gives a guided first taste of breathing underwater. Discover Scuba Diving costs ${dsd.price}, is open from age ${dsd.minAge} and adds basic scuba skills plus a digital certificate of participation. Both sessions last ${dsd.duration}.`,
        `Pond Scuba is a third option for groups: a full day of supervised scuba for ${pond.price} per person, from age ${pond.minAge}. All three experiences include equipment, need no swimming ability and are led by PADI-certified instructors in groups of up to ${GROUP_MAX} people. For example, a child aged 8 would choose Try Scuba, an adult wanting real skills would choose Discover Scuba Diving, and a school or company team would usually choose Pond Scuba.`,
        { table: priceTable },
      ] },
      { h: "Step 2: How do you book introductory scuba diving in Zambia?", blocks: [
        `Booking introductory scuba diving with the ${N} takes one message. Contact ${wa} or use the online enquiry form, and include four details: how many people are diving, their ages, the preferred date and the preferred venue. The company replies within ${REPLY_TIME} to confirm the date, venue and price.`,
        `Sessions run at ${venues3}, or at a customer's own pool, because the instructors can bring all the equipment to a private home. Groups, schools and companies receive a quote on request. For example, a parent planning a birthday can mention the number of children and their ages in the first message, which speeds up the reply. Any medical conditions should also be mentioned when booking, so the instructor can advise whether a doctor's approval is needed before the dive.`,
        { links: [{ href: "/articles/book-discover-scuba-diving-zambia", label: "How to book Discover Scuba Diving" }] },
      ] },
      { h: "Step 3: How should you prepare for an introductory dive?", blocks: [
        `Preparation for an introductory dive is light. First, pack swimwear and a towel, since the ${N} provides all scuba equipment. Second, eat a light meal and drink water beforehand. Third, avoid alcohol before the session. Additionally, anyone with a cold, flu or blocked nose should reschedule, because congestion makes equalising the ears difficult.`,
        "Finally, tell the instructor about any medical condition before diving. Some conditions need a doctor's approval first. Reading about the session in advance also helps nervous beginners: knowing the order of events, from the safety briefing to the first breath underwater, removes most of the uncertainty. In practice, beginners who arrive rested and relaxed find the first breaths underwater come more easily, and they spend more of the session enjoying the water rather than worrying about it.",
        { links: [{ href: "/articles/what-to-expect-first-scuba-dive", label: "What to expect on your first dive" }] },
      ] },
      { h: "Step 4: What happens during the introductory session?", blocks: [
        `An introductory scuba session with the ${N} lasts ${dsd.duration} and follows a clear order. First, a PADI-certified instructor gives a safety briefing on dry land covering the equipment, hand signals and the rule to never hold your breath. Second, the instructor fits the mask, buoyancy jacket and cylinder.`,
        `Third, divers take their first breaths in water shallow enough to stand in, at their own pace. On Discover Scuba Diving, the instructor then introduces basic skills such as clearing the mask and recovering the regulator. Finally, divers spend time moving around the pool, and Discover Scuba Diving participants receive a digital certificate of participation. With a maximum of ${GROUP_MAX} people per group, the instructor can adjust the pace for every diver. For example, a nervous diver can stay in shallow water longer while others move deeper.`,
      ] },
      { h: "Step 5: Where can you go after an introductory dive?", blocks: [
        `After an introductory dive, beginners in Zambia can keep progressing with the ${N} in three ways. First, Pond Scuba offers a full day of supervised scuba for ${pond.price} per person, from age ${pond.minAge}. Second, divers can join dives at ${otherSitesText}, including Lake Tanganyika, where the company's base at Isanga Bay near Mpulungu has 25 mapped dive sites.`,
        "Third, the Open Water Diver course at Lake Tanganyika is coming soon, taught by PADI-certified instructors and planned at US$550 or the kwacha equivalent. The course is designed for people who want to dive with a buddy rather than under direct instructor supervision. Joining the waitlist means hearing the course dates before the public announcement. In practice, many divers return for a second pool session first, then decide on open water once breathing underwater feels natural.",
      ] },
    ],
    faq: [
      { q: "What is the best way to start scuba diving?", a: `The best way to start scuba diving is an introductory session in a pool with a qualified instructor, because a controlled setting lets beginners focus on breathing underwater. In Zambia, the ${N} offers Try Scuba (${tryScuba.price}, from age ${tryScuba.minAge}) and Discover Scuba Diving (${dsd.price}, from age ${dsd.minAge}) in Lusaka. Neither needs swimming ability, and groups are capped at ${GROUP_MAX} people.` },
      { q: "How much does it cost to start scuba diving in Zambia?", a: `Starting scuba diving in Zambia costs ${tryScuba.price} per person for Try Scuba or ${dsd.price} for Discover Scuba Diving with the ${N} in 2026. Both prices include all scuba equipment and a safety briefing. Pond Scuba, a full day of supervised scuba, costs ${pond.price}, and the planned Open Water Diver course is US$550 or the kwacha equivalent.` },
      QA_SWIM,
      { q: "Can I get scuba certified in Zambia?", a: `An Open Water Diver course at Lake Tanganyika is coming soon from the ${N}, taught by PADI-certified instructors and planned at US$550 or the kwacha equivalent. The course is designed for people who want to dive with a buddy rather than under direct instructor supervision. Certification details will be confirmed before launch, and anyone can join the waitlist to hear the dates first.` },
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
    answer: `Beginner scuba diving is a supervised activity that can be safe when the dive takes place in a controlled setting with a qualified instructor and a few simple rules: breathe continuously and never hold your breath, equalise the ears early and often, move slowly and stay with the instructor. Beginner sessions with the ${N} take place in a pool or pond, start with a safety briefing and are led by PADI-certified instructors, with no more than ${GROUP_MAX} participants per group.`,
    takeaways: [
      "Never hold your breath underwater",
      "Equalise your ears early and often",
      "Move slowly and stay with your instructor",
      "Don't dive when unwell, and declare medical conditions",
    ],
    facts: [["Setting", "Pool or pond"], ["Briefing", "Before every session"], ["Instructors", "PADI-certified"], ["Group size", `Max ${GROUP_MAX}`], ["Equipment", "Provided"]],
    sections: [
      { h: "Why should you never hold your breath while scuba diving?", blocks: [
        "Never holding your breath is the most important rule in scuba diving. Air in the lungs expands as a diver rises toward the surface, because water pressure decreases. A diver who holds the breath while ascending traps that expanding air inside the lungs, which can cause a serious lung injury, even in a few metres of water.",
        `The solution is simple: breathe slowly and continuously the whole time underwater, in and out through the regulator. Slow, steady breathing also uses less air and keeps a diver calm. For example, a beginner who feels the urge to hold the breath when nervous can focus on exhaling gently and listening to the bubbles. Every safety briefing with the ${N} covers this rule before anyone enters the water, and PADI-certified instructors watch each diver's breathing pattern during the session. In practice, the rule becomes automatic within the first few minutes underwater.`,
      ] },
      { h: "How do you equalise your ears safely?", blocks: [
        "Equalising the ears balances the air pressure inside the ears with the increasing water pressure outside as a diver descends. The standard technique is to pinch the nose through the soft part of the mask and gently blow against the closed nose. Swallowing or moving the jaw also works for some divers.",
        "Safe equalisation follows three habits. First, start equalising at the surface and repeat often, before any pressure or discomfort appears. Second, never force equalisation by blowing hard, because forceful attempts can injure the ear. Third, if the ears hurt, stop descending, signal the instructor, rise slightly and try again. Divers with a cold, flu or blocked sinuses should not dive, since congestion prevents the ears from equalising. In practice, ear discomfort is the most common problem on a first dive, and early, gentle equalising prevents almost all of it for beginners in a pool.",
      ] },
      { h: "Why does going slowly make scuba diving safer?", blocks: [
        "Going slowly is one of the simplest safety habits in scuba diving. Slow movements and slow breathing use less air, keep the heart rate down and make it easier for a diver to control position in the water. A calm diver also notices small problems, such as ear pressure or a leaking mask, early enough to fix them.",
        `Ascending slowly matters too, because a controlled ascent gives the body time to adjust to falling pressure and helps the diver keep breathing normally. For example, a beginner who kicks hard and rushes toward the surface is more likely to hold the breath by accident. On beginner sessions with the ${N}, the instructor sets the pace for the group of up to ${GROUP_MAX} people, and nobody is pushed deeper or faster than feels comfortable. In practice, the best first dives are unhurried, with plenty of time to settle into breathing underwater.`,
      ] },
      { h: "Why should beginners stay with the instructor and use hand signals?", blocks: [
        `Staying close to the instructor is a core safety rule for every beginner diver. On sessions with the ${N}, a PADI-certified instructor leads each group of up to ${GROUP_MAX} people and keeps every diver within reach. Speech is impossible underwater, so divers communicate with hand signals taught in the safety briefing.`,
        "The four essential signals are OK, something is wrong, go up and go down. The OK signal is a circle made with the thumb and index finger. Something is wrong is a flat hand rocked from side to side, followed by pointing at the problem, such as an ear. Go up is a thumbs-up, and go down is a thumbs-down. For example, a diver with ear pressure gives the something-is-wrong signal, points at the ear and waits for the instructor. In practice, clear signals let an instructor solve small problems before they become big ones.",
      ] },
      { h: "When should you not go scuba diving?", blocks: [
        "Knowing when not to dive is as important as knowing how to dive. Beginners should postpone scuba diving when suffering from a cold, flu or blocked sinuses, because congestion stops the ears from equalising and can cause pain or injury. Nobody should dive after drinking alcohol, which affects judgement and coordination.",
        `A diver who feels unwell, exhausted or genuinely unwilling should not dive either; a first dive works best when the person wants to be there. Finally, anyone with a medical condition should tell the instructor before the session, because some conditions need a doctor's approval before diving. For example, a participant with a heart or lung condition should check with a doctor first. The ${N} would always rather reschedule a session than put a diver in the water on the wrong day. This guide is general information, not medical advice.`,
      ] },
      { h: "How does the Zambian Outdoor Adventure Company keep beginner sessions safe?", blocks: [
        `The ${N} runs every beginner scuba session with five safety measures. First, each session is led by PADI-certified instructors, with ${instructors} teaching in Zambia. Second, each group has a maximum of ${GROUP_MAX} participants, so an instructor can keep every diver within reach. Third, every session starts with a safety briefing on dry land covering equipment, hand signals and breathing.`,
        `Fourth, beginner sessions take place in a controlled setting, either a pool in Lusaka or a pond, rather than open water. Finally, all scuba equipment is provided, fitted and checked by the instructor before the dive. Try Scuba is open from age ${tryScuba.minAge} and Discover Scuba Diving from age ${dsd.minAge}, and neither requires swimming ability. For example, a nervous adult can spend as long as needed in shallow water before moving on. In practice, small groups and a controlled setting make the first dive calm and unhurried.`,
        { table: { head: ["When", "What to do"], rows: [
          ["Before", "Rest, eat lightly, no alcohol, declare medical conditions"],
          ["In the briefing", "Learn the hand signals and ask questions"],
          ["Underwater", "Breathe continuously, equalise early, move slowly, stay close"],
          ["If something feels wrong", "Signal your instructor straight away"],
        ] } },
        { note: "This guide is general information for beginners, not medical advice." },
      ] },
    ],
    faq: [
      { q: "Is scuba diving safe for beginners?", a: `Beginner scuba diving is a supervised activity that can be safe when the dive happens in a controlled setting with a qualified instructor and a safety briefing. Four rules matter most: breathe continuously, equalise early, move slowly and stay with the instructor. Beginner sessions with the ${N} run in a pool or pond, with a maximum of ${GROUP_MAX} people per group.` },
      { q: "What is the most important scuba safety rule?", a: `The most important scuba safety rule is to never hold your breath underwater. Air in the lungs expands as a diver rises toward the surface, so holding the breath during an ascent can injure the lungs. Beginners should breathe slowly and continuously throughout the dive. Every safety briefing with the ${N} covers this rule before anyone enters the water.` },
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
    answer: `Booking Discover Scuba Diving in Zambia with the ${N} takes one message: contact ${wa} or use the booking form on this page. Include how many people are diving, their ages, the preferred date and the preferred venue, and the company replies within ${REPLY_TIME}. A Discover Scuba Diving session costs ${dsd.price} per person, takes ${dsd.duration} and runs at ${venues3}, or at a customer's own pool, with a maximum of ${GROUP_MAX} people per group.`,
    takeaways: [
      `Message ${SITE.whatsapp.display} on WhatsApp, or use the form below`,
      `We reply within ${REPLY_TIME}`,
      `${dsd.price} per person, ${dsd.duration}, from age ${dsd.minAge}`,
      "Choose a Lusaka venue or your own pool",
    ],
    facts: facts(dsd),
    sections: [
      { h: "What information do you need to book Discover Scuba Diving?", blocks: [
        `Booking Discover Scuba Diving with the ${N} is quickest when the first message includes five details. First, the number of people diving. Second, each diver's age, since Discover Scuba Diving is open from age ${dsd.minAge} and Try Scuba from age ${tryScuba.minAge}. Third, the preferred date or a few possible dates.`,
        `Fourth, the preferred venue: Millennium Village, GOGO Fitness, the Radisson Blu Hotel or a private pool at home. Finally, any medical conditions, because some conditions need a doctor's approval before diving. For example, a message such as "3 people, ages 12, 40 and 42, Saturday afternoon, GOGO Fitness, no medical conditions" gives the team everything needed to confirm a booking in one reply. The ${N} replies on WhatsApp within ${REPLY_TIME}. Booking through the form on this page works the same way and also provides a free first-dive guide in PDF format.`,
      ] },
      { h: "How much does Discover Scuba Diving cost in Zambia?", blocks: [
        `Discover Scuba Diving with the ${N} costs ${dsd.price} per person in 2026. The price covers a session of ${dsd.duration} with professional scuba equipment, a safety briefing, a pool training session, an introduction to basic scuba skills and a digital certificate of participation. There is no extra charge for equipment.`,
        `The company also offers two other beginner experiences. Try Scuba costs ${tryScuba.price} per person, is open from age ${tryScuba.minAge} and also lasts ${tryScuba.duration}. Pond Scuba costs ${pond.price} per person for a full day and is open from age ${pond.minAge}. Group, school and corporate bookings receive a quote on request. For example, a school group or company team should send the number of participants and preferred dates for a tailored quote. All prices are per person, and swimming ability is not required for any of the three experiences.`,
        { table: priceTable },
      ] },
      { h: "Where can you book a Discover Scuba Diving session?", blocks: [
        `The ${N} runs Discover Scuba Diving at three venues in Lusaka: Millennium Village, GOGO Fitness and the Radisson Blu Hotel. Customers with a private pool can also book a session at home, because the PADI-certified instructors bring all the scuba equipment to the pool. The session content, price and maximum group size of ${GROUP_MAX} people are the same at every venue.`,
        "Choosing a venue usually depends on where the divers live or work and on whether a group wants privacy. For example, a birthday group might prefer a home pool, while an individual adult might choose the most convenient hotel or fitness venue. Mention the preferred venue when booking, or ask the team for a recommendation. In practice, giving two or three possible dates and a first-choice venue in the same message makes confirming a session faster.",
      ] },
      { h: "What happens after you book Discover Scuba Diving?", blocks: [
        `After a booking request, the ${N} follows three steps. Step 1: the team replies on WhatsApp within ${REPLY_TIME}. Step 2: the team confirms the date, venue and price, and answers any questions about the session.`,
        "Step 3 is the dive itself. On the day, a PADI-certified instructor starts with a safety briefing on dry land, fits each diver's equipment and then leads the group into the water for the first breaths underwater. The full session takes 3–4 hours. Divers only need to bring swimwear and a towel. For example, a diver who books on a Monday and asks for Saturday at the Radisson Blu Hotel receives a reply the same day confirming availability. In practice, mentioning any medical condition at booking avoids delays on the day.",
      ] },
      { h: "Can you book Discover Scuba Diving for children or a group?", blocks: [
        `Children and groups can book Discover Scuba Diving with the ${N}. Children aged ${dsd.minAge} and over can join Discover Scuba Diving, while children from age ${tryScuba.minAge} can join Try Scuba. Every group has a maximum of ${GROUP_MAX} people, so larger parties are split into several groups.`,
        "Birthday parties often run at a family's own pool, with the instructors bringing the equipment. Schools and companies can book group sessions or a full day of Pond Scuba, with a quote on request. For example, a school with 12 pupils would be run as several small groups of up to four. Send the number of participants, their ages and the preferred dates, and the team replies within 2 hours.",
        { links: [{ href: "/articles/scuba-diving-for-children", label: "Scuba diving for children" }, { href: "/go/schools", label: "School programmes" }, { href: "/go/team-building", label: "Team building" }] },
      ] },
    ],
    faq: [
      QA_BOOK,
      { q: "How much does Discover Scuba Diving cost?", a: `Discover Scuba Diving with the ${N} costs ${dsd.price} per person in 2026, with professional scuba equipment, a safety briefing, a pool training session, basic skills and a digital certificate of participation included. Sessions last ${dsd.duration} at Millennium Village, GOGO Fitness, the Radisson Blu Hotel or a private pool. Group, school and corporate bookings receive a quote on request.` },
      { q: "Can the instructors come to my house?", a: `Yes. Families and groups with a private pool in Lusaka can book Discover Scuba Diving or Try Scuba at home. The ${N} brings all scuba equipment and PADI-certified instructors to the pool, and the price, session length of ${dsd.duration} and group size of up to ${GROUP_MAX} people stay the same. For example, birthday parties often run at a family's own pool.` },
      { q: "Can I book Discover Scuba Diving for a group?", a: `Yes. Discover Scuba Diving groups with the ${N} have up to ${GROUP_MAX} people, so larger parties are split into several groups on the same day. Group, school and corporate bookings receive a quote on request. For example, a team of 12 would dive as three groups of four. Send the number of participants, their ages and preferred dates to start.` },
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
    answer: `Try Scuba is a guided first taste of breathing underwater, open to anyone aged ${tryScuba.minAge} and over. With the ${N}, Try Scuba costs ${tryScuba.price} per person and takes ${tryScuba.duration} in a Lusaka pool at ${venues3}, or in a customer's own pool. The session includes all equipment and a safety briefing, needs no swimming ability, and runs in groups of no more than ${GROUP_MAX} people, each led by a PADI-certified instructor.`,
    takeaways: [
      `${tryScuba.price} per person, from age ${tryScuba.minAge}`,
      `${tryScuba.duration}, equipment included`,
      "No swimming ability or experience needed",
      "Ideal for families, younger children and nervous first-timers",
    ],
    facts: facts(tryScuba),
    sections: [
      { h: "What is Try Scuba?", blocks: [
        `Try Scuba is an easy, guided introduction to breathing underwater, designed for complete beginners and children. At the ${N}, a Try Scuba session begins with a safety briefing on dry land, where a PADI-certified instructor explains the equipment, hand signals and the rule to breathe continuously. The instructor then fits each diver's equipment.`,
        `Next, divers spend time in shallow water with the instructor beside them, taking their first breaths through the regulator at their own pace. Try Scuba focuses on the experience of breathing underwater rather than on learning skills, which makes the session ideal for younger children and nervous first-timers. Each session costs ${tryScuba.price} per person and lasts ${tryScuba.duration}. For example, a parent unsure whether a child will enjoy scuba can book Try Scuba as a low-pressure first step. In practice, Try Scuba is the quickest way to find out whether diving is for you.`,
      ] },
      { h: "Who is Try Scuba for?", blocks: [
        `Try Scuba suits four kinds of beginner in Zambia. First, children aged ${tryScuba.minAge} to 9, who are too young for Discover Scuba Diving, which starts at age ${dsd.minAge}. Second, families who want to share a first underwater experience together. Third, adults who feel nervous about the water and want a gentle start in shallow water.`,
        `Finally, non-swimmers, because swimming ability is not required. Every Try Scuba session with the ${N} runs in a pool with a PADI-certified instructor and a maximum of ${GROUP_MAX} people per group. For example, a family of four with children aged 6 and 9 fits into a single Try Scuba group. Anyone with a medical condition should tell the instructor before the session, because some conditions need a doctor's approval before diving. In practice, Try Scuba works best for people who are curious about diving but not yet sure whether they want to learn skills.`,
      ] },
      { h: "What is included in a Try Scuba session?", blocks: [
        `A Try Scuba session with the ${N} includes everything a first-time diver needs. The ${tryScuba.price} price covers all scuba equipment, including the mask, regulator, cylinder and buoyancy jacket, so nobody needs to buy or rent anything. The session also includes a safety briefing on dry land and a guided shallow-water experience with a PADI-certified instructor.`,
        `Divers only need to bring swimwear and a towel. The session lasts ${tryScuba.duration} from briefing to finish, which leaves plenty of time for nervous beginners to settle in. Groups have a maximum of ${GROUP_MAX} people. Try Scuba does not include a certificate of participation; that comes with Discover Scuba Diving, which also introduces basic scuba skills. For example, a child who loves Try Scuba at age 7 can move on to Discover Scuba Diving at age ${dsd.minAge}. In practice, the equipment fitting is part of the experience.`,
      ] },
      { h: "Should you choose Try Scuba or Discover Scuba Diving?", blocks: [
        `Try Scuba and Discover Scuba Diving are the two beginner experiences offered by the ${N} in Lusaka. Both last ${dsd.duration}, need no swimming ability and have a maximum of ${GROUP_MAX} people per group. Try Scuba costs ${tryScuba.price}, starts at age ${tryScuba.minAge} and focuses on a guided first taste of breathing underwater.`,
        `Discover Scuba Diving costs ${dsd.price}, starts at age ${dsd.minAge} and adds an introduction to basic scuba skills plus a digital certificate of participation. For example, a child aged 8 can only join Try Scuba, while a 15-year-old who wants to learn real skills would get more from Discover Scuba Diving. Nervous adults often start with Try Scuba and move on later. In practice, the right choice depends on age and on whether the diver wants an experience or the first steps toward skills.`,
        { table: compareTable },
      ] },
      { h: "Where can you Try Scuba in Zambia?", blocks: [
        `Try Scuba sessions with the ${N} run at three venues in Lusaka: Millennium Village, GOGO Fitness and the Radisson Blu Hotel. Families with a private pool can also book Try Scuba at home, because the PADI-certified instructors bring all the scuba equipment to the pool. Every venue offers the same ${tryScuba.price} price, ${tryScuba.duration} session and maximum group size of ${GROUP_MAX} people.`,
        `After Try Scuba, divers in Zambia can progress in several ways. From age ${dsd.minAge}, Discover Scuba Diving adds basic skills for ${dsd.price}. Pond Scuba offers a full day of supervised scuba for ${pond.price}. Beyond Lusaka, the company also dives at ${otherSitesText}. For example, a family could start with Try Scuba at home, then book Pond Scuba for a full day once everyone is confident.`,
      ] },
    ],
    faq: [
      { q: "What is the minimum age for Try Scuba?", a: `The minimum age for Try Scuba with the ${N} is ${tryScuba.minAge} years, making Try Scuba the youngest entry point to scuba diving in Zambia. Children aged ${tryScuba.minAge} to 9 can only join Try Scuba, while children from age ${dsd.minAge} can also join Discover Scuba Diving. Swimming ability is not required, and every session runs in a pool.` },
      { q: "How much does Try Scuba cost in Zambia?", a: `Try Scuba costs ${tryScuba.price} per person with the ${N} in 2026. The price includes all scuba equipment, a safety briefing on dry land and a guided shallow-water experience with a PADI-certified instructor. Sessions last ${tryScuba.duration} at Millennium Village, GOGO Fitness, the Radisson Blu Hotel or a private pool in Lusaka, with up to ${GROUP_MAX} people per group.` },
      { q: "How long does a Try Scuba session take?", a: `A Try Scuba session in Lusaka takes ${tryScuba.duration}, from the safety briefing on dry land to the end of the guided time in shallow water. The session includes fitting the equipment and as much time as each diver needs to settle in. For example, nervous beginners can stay in shallow water longer. Groups have a maximum of ${GROUP_MAX} people.` },
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
    answer: `Children in Zambia can start scuba diving from age ${tryScuba.minAge} with Try Scuba (${tryScuba.price}) and from age ${dsd.minAge} with Discover Scuba Diving (${dsd.price}) or Pond Scuba, with the ${N}. Children's sessions take place in a pool, need no swimming ability and start with a safety briefing. Every group is led by PADI-certified instructors and has no more than ${GROUP_MAX} children, so each young diver gets close attention.`,
    takeaways: [
      `Try Scuba from age ${tryScuba.minAge}; Discover Scuba Diving from ${dsd.minAge}`,
      "Pool sessions with a safety briefing first",
      `No more than ${GROUP_MAX} children per group`,
      "A good fit if your child is comfortable in water and keen to try",
    ],
    facts: [["Ages 6–9", "Try Scuba"], [`Ages ${dsd.minAge}+`, "Try Scuba, Discover Scuba Diving, Pond Scuba"], ["Swimming", "Not required"], ["Group size", `Max ${GROUP_MAX}`], ["Instructors", "PADI-certified"], ["Where", "Lusaka pools or your own pool"]],
    sections: [
      { h: "What age can children start scuba diving in Zambia?", blocks: [
        `Children in Zambia can start scuba diving at age ${tryScuba.minAge} with the ${N}. Children aged ${tryScuba.minAge} to 9 can join Try Scuba, a guided first taste of breathing underwater that costs ${tryScuba.price} per person and lasts ${tryScuba.duration}. From age ${dsd.minAge}, children can also join Discover Scuba Diving for ${dsd.price}, which adds basic scuba skills and a digital certificate of participation.`,
        `Children aged ${pond.minAge} and over can also join Pond Scuba, a full day of supervised scuba for ${pond.price} per person. Swimming ability is not required for any of the three experiences. For example, a family with children aged 7 and 11 could book Try Scuba for the younger child and Discover Scuba Diving for the older child, both led by PADI-certified instructors in Lusaka. In practice, age is the first filter, and readiness is the second.`,
        { table: { head: ["Age", "Options", "Price"], rows: [
          [`${tryScuba.minAge}–9`, "Try Scuba", tryScuba.price],
          [`${dsd.minAge}+`, "Try Scuba, Discover Scuba Diving, Pond Scuba", `${tryScuba.price} – ${pond.price}`],
        ] } },
      ] },
      { h: "Is scuba diving safe for children?", blocks: [
        `Scuba diving for children with the ${N} is built around a controlled setting and close supervision. Children's sessions take place in a pool rather than open water, and every session starts with a safety briefing on dry land covering the equipment, hand signals and the rule to breathe continuously and never hold the breath.`,
        `Each group has a maximum of ${GROUP_MAX} children, led by PADI-certified instructors ${instructors}, so every young diver stays within the instructor's reach. All equipment is provided, fitted and checked by the instructor before the dive. For example, a child who feels unsure can stay in shallow water longer while the instructor gives individual attention. Parents should tell the instructor about any medical condition or ear problem before the session, because some conditions need a doctor's approval before diving. In practice, small groups and a pool setting make a child's first dive calm and unhurried.`,
      ] },
      { h: "How do you know if your child is ready for scuba diving?", blocks: [
        "A child's readiness for scuba diving depends more on comfort and attitude than on swimming ability. Swimming is not required for children's sessions, but three signs suggest a child is ready. First, the child is comfortable putting the face in the water. Second, the child can listen to an adult and follow simple instructions.",
        `Third, and most important, the child wants to try scuba diving, rather than being persuaded by a parent or sibling. A child who meets all three signs usually enjoys a first session. For example, a 6-year-old who happily swims with goggles and asks to try diving is a good candidate for Try Scuba with the ${N}. Children who are hesitant can watch first and join later. In practice, letting the child set the pace matters more than age alone, and instructors never push a young diver further than feels comfortable.`,
      ] },
      { h: "How do ears and cold affect children who scuba dive?", blocks: [
        "Ears and cold are the two most common comfort issues for children who scuba dive. Children's ears can be sensitive to water pressure, so young divers learn to equalise gently and early by pinching the nose through the mask and blowing softly, or by swallowing. Children should never force equalisation, and a child with a cold or blocked nose should not dive, because congestion stops the ears from equalising.",
        "Children also tend to feel cold sooner than adults, especially after time in the water. Parents can help by bringing a towel and something warm to wear after the session. For example, a warm top and a snack after diving help a child recover comfortably. If a child's ears hurt during the session, the child signals the instructor, rises slightly and tries again. In practice, early equalising and a warm towel solve most comfort problems for young divers.",
      ] },
      { h: "What can parents do to help a child's first dive?", blocks: [
        `Parents can make a child's first scuba dive easier in four ways. First, tell the instructor about any medical condition or ear problem when booking, so the ${N} can advise before the session. Second, pack swimwear, a towel, something warm and a snack.`,
        "Third, talk through the session beforehand, from the safety briefing to the first breath underwater, so there are no surprises. Fourth, let the child go at their own pace and avoid pushing a nervous child. For example, a parent might read the article on what to expect on a first dive with the child the evening before. On the day, the instructor leads the session while parents can watch from the poolside. In practice, children who know what will happen and feel no pressure enjoy their first dive the most.",
      ] },
      { h: "Can you book scuba diving for a birthday, family or school?", blocks: [
        `Scuba sessions for birthdays, families and schools are popular with the ${N}. Birthday parties often run at a family's own pool, because the PADI-certified instructors bring all the scuba equipment to the home. Each group has a maximum of ${GROUP_MAX} divers, so larger parties are split into several groups during the session.`,
        "Schools can book group sessions for pupils from age 6, with a quote on request. Families can book Try Scuba and Discover Scuba Diving together, so children and parents dive on the same day. For example, a birthday with 8 children aged 7 to 11 could run as two groups of four at the family pool. Send the number of children, their ages and the preferred date, and the team replies within 2 hours.",
        { links: [{ href: "/go/kids-scuba-party", label: "Scuba birthday parties" }, { href: "/go/schools", label: "School programmes" }, { href: "/articles/try-scuba-zambia", label: "Try Scuba in Zambia" }] },
      ] },
    ],
    faq: [
      { q: "What age can children scuba dive in Zambia?", a: `Children can scuba dive in Zambia from age ${tryScuba.minAge} with Try Scuba (${tryScuba.price}) and from age ${dsd.minAge} with Discover Scuba Diving (${dsd.price}) or Pond Scuba (${pond.price}, full day), with the ${N}. Children's sessions run in Lusaka pools, need no swimming ability and are led by PADI-certified instructors with up to ${GROUP_MAX} children per group.` },
      { q: "Does my child need to know how to swim to scuba dive?", a: `No. Children do not need swimming ability for Try Scuba, Discover Scuba Diving or Pond Scuba with the ${N}. Sessions run in a pool, start in water shallow enough to stand in and are led by a PADI-certified instructor. Being comfortable putting the face in the water helps more than swimming ability, so non-swimmers can still enjoy a first dive.` },
      { q: "Is scuba diving safe for children?", a: `Children's scuba sessions with the ${N} take place in a pool, start with a safety briefing and are led by PADI-certified instructors ${instructors}, with no more than ${GROUP_MAX} children per group. All equipment is provided and checked by the instructor. Parents should mention any medical condition or ear problem when booking, because some conditions need a doctor's approval.` },
      { q: "Can you run a scuba birthday party in Lusaka?", a: `Yes. The ${N} runs scuba birthday parties at a family's own pool in Lusaka, bringing all scuba equipment and PADI-certified instructors. Children from age ${tryScuba.minAge} can join Try Scuba, and each group has up to ${GROUP_MAX} divers, so larger parties dive in turns. For example, 8 children would dive as two groups of four. Quotes are given on request.` },
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

