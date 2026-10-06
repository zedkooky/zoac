export type QA = { q: string; a: string };

/** Visible FAQ accordion plus matching FAQPage structured data. Answers are plain text so they stay quotable. */
export default function Faq({ items, title = "Frequently asked questions" }: { items: QA[]; title?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <section className="section sand">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap split split--top">
        <div><p className="eyebrow" data-reveal>FAQ</p><h2 className="h2" data-reveal="100">{title}</h2></div>
        <div className="faq" data-reveal="150">
          {items.map((i) => (
            <details key={i.q}><summary><h3>{i.q}</h3></summary><p>{i.a}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}
