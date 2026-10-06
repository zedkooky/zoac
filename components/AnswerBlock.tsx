import type { ReactNode } from "react";

type Props = { question: string; answer: ReactNode; facts?: [string, ReactNode][] };

/** Direct answer + quick-facts table, placed near the top of a page so it can be quoted on its own. */
export default function AnswerBlock({ question, answer, facts }: Props) {
  return (
    <section className="section answer">
      <div className="wrap split split--top">
        <div>
          <p className="eyebrow" data-reveal>Quick answer</p>
          <h2 className="h2 answer__q" data-reveal="100">{question}</h2>
          <p className="answer__a" data-reveal="200">{answer}</p>
        </div>
        {facts && (
          <table className="facts" data-reveal="250">
            <caption className="eyebrow">Quick facts</caption>
            <tbody>{facts.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
          </table>
        )}
      </div>
    </section>
  );
}
