import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Crumbs from "@/components/Crumbs";
import CtaBand from "@/components/CtaBand";
import { ARTICLES, readMins } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Scuba articles & beginner guides",
  description: "Beginner scuba guides from the Zambian Outdoor Adventure Company: Discover Scuba Diving, Try Scuba, what to expect, safety, children and how to book in Zambia.",
  alternates: { canonical: "/articles" },
};

export default function Articles() {
  return (
    <>
      <PageHero kicker="Articles" lines={["Learn before", <em key="e">you dive</em>]} lede="Plain-English guides for first-time divers in Zambia." image="/img/pool-dsd.jpg" alt="Instructor and student underwater in a pool" />
      <Crumbs trail={[{ name: "Articles", href: "/articles" }]} />
      <section className="section">
        <div className="wrap">
          <ul className="arts">
            {ARTICLES.map((a, i) => (
              <li key={a.slug} data-reveal={String((i % 3) * 100)}>
                <Link href={`/articles/${a.slug}`}>
                  <span className="eyebrow">{a.kicker} · {readMins(a)} min read</span>
                  <b>{a.title}</b>
                  <span>{a.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Ready for your first breath underwater?" />
    </>
  );
}
