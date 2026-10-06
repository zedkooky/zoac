import Link from "next/link";
import { SITE, UPDATED, updatedLabel } from "@/lib/site";

type Crumb = { name: string; href: string };

/** Breadcrumb strip with "last updated" date, plus BreadcrumbList / WebPage structured data. */
export default function Crumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...trail];
  const url = (href: string) => SITE.url + (href === "/" ? "/" : href.replace(/\/?$/, "/"));
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: url(c.href) })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url(all[all.length - 1].href),
      name: all[all.length - 1].name,
      dateModified: UPDATED,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", url: `${SITE.url}/`, name: SITE.name },
      publisher: { "@id": `${SITE.url}/#org` },
    },
  ];
  return (
    <div className="crumbs">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap crumbs__in">
        <nav aria-label="Breadcrumb">
          <ol>
            {all.map((c, i) => (
              <li key={c.href}>{i < all.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}</li>
            ))}
          </ol>
        </nav>
        <span>Last updated <time dateTime={UPDATED}>{updatedLabel}</time></span>
      </div>
    </div>
  );
}
