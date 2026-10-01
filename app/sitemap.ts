import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/dive", "/courses", "/expeditions", "/training", "/about", "/contact"].map((p) => ({ url: SITE.url + p, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
