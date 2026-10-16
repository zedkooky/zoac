import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Crumbs from "@/components/Crumbs";
import Faq from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import CtaBand from "@/components/CtaBand";
import { ARTICLES, article, readMins, type Block } from "@/lib/articles";
import { REPLY_TIME, SITE, waLink } from "@/lib/site";
import { slugify } from "@/lib/slugify";

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = article((await params).slug);
  if (!a) return {};
  return {
    title: { absolute: a.metaTitle },
    description: a.description,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.description, publishedTime: a.published, modifiedTime: a.updated, images: [{ url: a.image, alt: a.alt }] },
  };
}

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });


function Render({ b }: { b: Block }) {
  if (typeof b === "string") return <p>{b}</p>;
  if ("list" in b) {
    const items = b.list.map((t) => <li key={t}>{t}</li>);
    return b.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
  }
  if ("table" in b) {
    return (
      <div className="tscroll">
        <table className="ptable">
          <thead><tr>{b.table.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
          <tbody>{b.table.rows.map((r) => <tr key={r.join("|")}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
  if ("note" in b) return <p className="art__note">{b.note}</p>;
  return <p className="art__links">{b.links.map((l) => <Link key={l.href} href={l.href}>{l.label} →</Link>)}</p>;
}

export default async function ArticlePage({ params }: Params) {
  const a = article((await params).slug);
  if (!a) notFound();
  const url = `${SITE.url}/articles/${a.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: `${SITE.url}${a.image}`,
    datePublished: a.published,
    dateModified: a.updated,
    inLanguage: "en",
    author: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
    publisher: { "@id": `${SITE.url}/#org` },
    mainEntityOfPage: url,
  };
  const related = a.related.map((s) => ARTICLES.find((x) => x.slug === s)!).filter(Boolean);
  const waMsg = `Hi Zambian Outdoor Adventure Company, I read "${a.title}" and I'd like to book.`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero kicker={a.kicker} lines={[a.heroLines[0], <em key="e">{a.heroLines[1]}</em>]} image={a.image} alt={a.alt} headingTag="p">
        <a className="btn" href={a.booking ? "#book" : waLink(waMsg)} {...(a.booking ? {} : { target: "_blank", rel: "noopener noreferrer" })}>{a.booking ? "Book now" : "Book on WhatsApp"}</a>
        <Link className="btn btn--ghost" href="/courses">Courses &amp; prices</Link>
      </PageHero>
      <Crumbs trail={[{ name: "Articles", href: "/articles" }, { name: a.title, href: `/articles/${a.slug}` }]} />

      <section className="section art">
        <div className="wrap art__grid">
          <article className="art__main">
            <h1 className="art__title">{a.title}</h1>
            <p className="art__by">By {SITE.name} · Updated <time dateTime={a.updated}>{fmt(a.updated)}</time> · {readMins(a)} min read</p>
            <p className="art__lead">{a.answer}</p>
            <div className="art__keys">
              <p className="eyebrow">Key takeaways</p>
              <ul>{a.takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <nav className="art__toc" aria-label="In this article">
              <p className="eyebrow">In this article</p>
              <ol>{a.sections.map((s) => <li key={s.h}><a href={`#${slugify(s.h)}`}>{s.h}</a></li>)}{a.booking && <li><a href="#book">Book now</a></li>}<li><a href="#faq">FAQ</a></li></ol>
            </nav>
            {a.sections.map((s) => (
              <section key={s.h} id={slugify(s.h)} className="art__sec">
                <h2>{s.h}</h2>
                {s.blocks.map((b, i) => <Render key={i} b={b} />)}
              </section>
            ))}
          </article>
          <aside className="art__side">
            <div className="art__card">
              <table className="facts">
                <caption className="eyebrow">Quick facts</caption>
                <tbody>{a.facts.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
              </table>
              <a className="btn btn--dark" href={waLink(waMsg)} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
              <p className="lead__small">We reply within {REPLY_TIME}.</p>
            </div>
          </aside>
        </div>
      </section>

      {a.booking && (
        <section className="section sand" id="book">
          <div className="wrap split split--top">
            <div>
              <p className="eyebrow">Book now</p>
              <h2 className="h2">Send us your <em>details</em></h2>
              <p className="lede" style={{ marginTop: 24 }}>Tell us who's diving and when. We reply on WhatsApp within {REPLY_TIME} to confirm your date, venue and price.</p>
            </div>
            <LeadForm page={`article-${a.slug}`} topic={a.booking.topic} fields={a.booking.fields} submit="Request my booking"
              pdf={{ href: "/downloads/first-dive-guide.pdf", label: "Download the first-dive guide (PDF)" }}
              thanks={`We'll message you on WhatsApp within ${REPLY_TIME} to confirm your booking. Meanwhile, here's our free first-dive guide.`} />
          </div>
        </section>
      )}

      <div id="faq"><Faq items={a.faq} /></div>

      <aside className="section">
        <div className="wrap">
          <p className="eyebrow">Keep reading</p>
          <h2 className="h2">Related <em>articles</em></h2>
          <ul className="related">
            {related.map((r) => <li key={r.slug}><Link href={`/articles/${r.slug}`}><b>{r.title} →</b><span>{readMins(r)} min read</span></Link></li>)}
            <li><Link href="/scuba-diving-zambia"><b>Scuba diving in Zambia →</b><span>Where to dive, courses, prices and instructors.</span></Link></li>
          </ul>
        </div>
      </aside>
      <aside><CtaBand title="Ready for your first breath underwater?" /></aside>
    </>
  );
}
