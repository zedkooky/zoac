import type { ReactNode } from "react";

type Props = { kicker: string; lines: ReactNode[]; lede?: string; image: string; alt?: string; children?: ReactNode; home?: boolean };

/** Full-bleed hero with Ken Burns zoom and line-masked headline. `lines` are revealed one after another. */
export default function PageHero({ kicker, lines, lede, image, alt = "", children, home }: Props) {
  return (
    <section className={`hero${home ? "" : " hero--page"}`}>
      <div className="hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="kb" src={image} alt={alt} fetchPriority="high" />
      </div>
      <div className="hero__shade" />
      <div className="wrap hero__body">
        <p className="eyebrow hero-fade" style={{ ["--d" as string]: 100 }}>{kicker}</p>
        <h1 className="h1">
          {lines.map((l, i) => (
            <span className="mask" key={i}><span style={{ ["--d" as string]: 250 + i * 160 }}>{l}</span></span>
          ))}
        </h1>
        {lede && <p className="hero__lede hero-fade" style={{ ["--d" as string]: 250 + lines.length * 160 + 150 }}>{lede}</p>}
        {children && <div className="hero__cta hero-fade" style={{ ["--d" as string]: 250 + lines.length * 160 + 300 }}>{children}</div>}
      </div>
      {home && <div className="hero__scroll">Scroll</div>}
    </section>
  );
}
