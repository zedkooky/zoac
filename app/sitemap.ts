import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/dive", "/courses", "/expeditions", "/training", "/about", "/contact"].map((p) => ({ url: SITE.url + (p ? p + "/" : "/"), changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
