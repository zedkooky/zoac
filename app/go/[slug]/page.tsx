import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import YouTube from "@/components/YouTube";
import FilmPlayer from "@/components/FilmPlayer";
import Faq from "@/components/Faq";
import { LANDINGS, landing } from "@/lib/landings";
import { TESTIMONIALS } from "@/lib/testimonials";
import { REPLY_TIME, waLink } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => LANDINGS.map((l) => ({ slug: l.slug }));

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const l = landing((await params).slug);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    alternates: { canonical: `/go/${l.slug}` },
    robots: { index: false, follow: true },
    openGraph: { title: l.title, description: l.description, images: [{ url: l.image, alt: l.alt }] },
  };
}

export default async function LandingPage({ params }: Params) {
  const l = landing((await params).slug);
  if (!l) notFound();
  const quotes = TESTIMONIALS.filter((t) => !t.pages || t.pages.includes(l.slug));
  return (
    <div className="lp">
      <PageHero kicker={l.kicker} lines={[l.h1[0], <em key="e">{l.h1[1]}</em>]} lede={l.lede} image={l.image} alt={l.alt}>
        <a className="btn" href="#offer">{l.cta}</a>
        <a className="btn btn--ghost" href={waLink(`Hi Zambian Outdoor Adventure Company, I'm interested in: ${l.title}.`)} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
      </PageHero>

      <section className="lp-facts">
        <div className="wrap"><dl>{l.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow" data-reveal>Why choose us</p>
          <h2 className="h2" data-reveal="100">Three reasons <em>to dive with us</em></h2>
          <ol className="reasons">
            {l.reasons.map((r, i) => (
              <li key={r.b} data-reveal={String(i * 120)}><span>{String(i + 1).padStart(2, "0")}</span><p><strong>{r.b}</strong> {r.t}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap film">
          {l.video.youtube ? <div data-reveal="fade"><YouTube id={l.video.youtube.id} title={l.video.youtube.title} /></div> : <FilmPlayer />}
          <div>
            <p className="eyebrow" data-reveal>Watch</p>
            <h2 className="h2" data-reveal="100">{l.video.caption}</h2>
            <ol className="steps steps--stack">
              {l.steps.map((s, i) => <li className="step" key={s.t} data-reveal={String(i * 120)}><b>{String(i + 1).padStart(2, "0")}</b><h3>{s.t}</h3><p>{s.d}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      {quotes.length > 0 && (
        <section className="section">
          <div className="wrap">
            <p className="eyebrow" data-reveal>In their words</p>
            <div className="quotes">
              {quotes.map((q, i) => (
                <figure key={q.name + i} data-reveal={String(i * 120)}><blockquote>&ldquo;{q.quote}&rdquo;</blockquote><figcaption>{q.name} · {q.what}</figcaption></figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section sand" id="offer">
        <div className="wrap split split--top">
          <div>
            <p className="eyebrow" data-reveal>{l.offer.eyebrow}</p>
            <h2 className="h2" data-reveal="100">{l.offer.h} <em>{l.offer.em}</em></h2>
            <p className="lede" data-reveal="150" style={{ marginTop: 24 }}>{l.offer.p}</p>
            {l.offer.reward && <p className="reward" data-reveal="200"><strong>Bonus:</strong> {l.offer.reward}</p>}
            <p className="lead__small" data-reveal="250" style={{ marginTop: 24 }}>Prefer to talk? <a href={waLink(`Hi Zambian Outdoor Adventure Company, I'm interested in: ${l.title}.`)} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>. We reply within {REPLY_TIME}.</p>
          </div>
          <div data-reveal="150"><LeadForm page={l.slug} {...l.form} /></div>
        </div>
      </section>

      <Faq items={l.faq} title="Questions, answered" />

      <section className="section deep cta">
        <div className="wrap">
          <h2 className="h2" data-reveal>{l.final}</h2>
          <div className="hero__cta" data-reveal="150">
            <a className="btn" href="#offer">{l.cta}</a>
            <a className="btn btn--ghost" href={waLink(`Hi Zambian Outdoor Adventure Company, I'm interested in: ${l.title}.`)} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
