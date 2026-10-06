import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Crumbs from "@/components/Crumbs";
import AnswerBlock from "@/components/AnswerBlock";
import Faq from "@/components/Faq";
import Related from "@/components/Related";
import CtaBand from "@/components/CtaBand";
import { GUIDES, guide, type Section } from "@/lib/guides";
import { waLink } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const g = guide((await params).slug);
  if (!g) return {};
  return { title: { absolute: g.title }, description: g.description, alternates: { canonical: `/${g.slug}` } };
}

function Block({ s, dark }: { s: Section; dark: boolean }) {
  if (s.quote) {
    return (
      <section className="section deep">
        <div className="wrap">
          <p className="eyebrow" data-reveal>{s.eyebrow}</p>
          <blockquote className="quote" data-reveal="100">&ldquo;{s.quote}&rdquo;</blockquote>
          <cite data-reveal="200">Zambian Outdoor Adventure Company</cite>
        </div>
      </section>
    );
  }
  return (
    <section className={`section${dark ? " dark" : ""}`}>
      <div className="wrap split split--top">
        <div>
          <p className="eyebrow" data-reveal>{s.eyebrow}</p>
          <h2 className="h2" data-reveal="100">{s.h} {s.em && <em>{s.em}</em>}</h2>
          {s.p?.map((t) => <p className="lede" data-reveal="150" style={{ marginTop: 24 }} key={t}>{t}</p>)}
        </div>
        <div data-reveal="200">
          {s.list && (
            <ul className="locs">
              {s.list.map((l) => (
                <li key={l.t}>{l.href ? <Link href={l.href}><b>{l.t} →</b></Link> : <b>{l.t}</b>}{l.d && <span>{l.d}</span>}</li>
              ))}
            </ul>
          )}
          {s.table && (
            <div className="tscroll">
              <table className="ptable">
                <thead><tr>{s.table.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
                <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default async function GuidePage({ params }: Params) {
  const g = guide((await params).slug);
  if (!g) notFound();
  const trail = g.slug === "scuba-diving-zambia"
    ? [{ name: g.crumb, href: `/${g.slug}` }]
    : [{ name: "Scuba diving in Zambia", href: "/scuba-diving-zambia" }, { name: g.crumb, href: `/${g.slug}` }];
  return (
    <>
      <PageHero kicker={g.kicker} lines={[g.h1[0], <em key="e">{g.h1[1]}</em>]} lede={g.lede} image={g.image} alt={g.alt}>
        <a className="btn" href={waLink(`Hi Zambian Outdoor Adventure Company, I'd like to book scuba (${g.crumb}).`)} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
        <Link className="btn btn--ghost" href="/courses">Courses &amp; prices</Link>
      </PageHero>
      <Crumbs trail={trail} />
      <AnswerBlock question={g.question} answer={g.answer} facts={g.facts} />
      {g.sections.map((s, i) => <Block key={s.eyebrow} s={s} dark={i % 2 === 0} />)}
      <Faq items={g.faq} />
      <Related keys={g.related} />
      <CtaBand title="Ready for your first breath underwater?" />
    </>
  );
}
