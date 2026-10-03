import Link from "next/link";
import { waLink } from "@/lib/site";

export default function CtaBand({ title = "Let's plan the next one." }: { title?: string }) {
  return (
    <section className="section deep cta">
      <div className="cta__bg"><div className="cta__drift" data-parallax="0.1">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/lakeside.jpg" alt="" /></div></div>
      <div className="wrap">
        <p className="eyebrow" data-reveal style={{ justifyContent: "center" }}>Get in touch</p>
        <h2 className="h2" data-reveal="100">{title}</h2>
        <p className="lede" data-reveal="200" style={{ margin: "24px auto 0" }}>A rescue team that needs certifying, a school after something genuinely different, or an expedition on Lake Tanganyika — tell us what you have in mind.</p>
        <div className="hero__cta" data-reveal="300">
          <Link className="btn" href="/contact">Send an enquiry</Link>
          <a className="btn btn--ghost" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </div>
      </div>
    </section>
  );
}
