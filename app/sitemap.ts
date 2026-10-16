import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { GUIDES } from "@/lib/guides";
import { ARTICLES } from "@/lib/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/dive", "/courses", "/expeditions", "/training", "/merch", "/about", "/contact", ...GUIDES.map((g) => "/" + g.slug), "/articles", ...ARTICLES.map((a) => "/articles/" + a.slug)].map((p) => ({ url: SITE.url + (p ? p + "/" : "/"), lastModified: new Date(), changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
