"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adds .in to [data-reveal] elements as they scroll into view. Re-scans on route change. */
export default function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((e) => {
      const d = e.getAttribute("data-reveal");
      if (d && /^\d+$/.test(d)) e.style.setProperty("--d", d);
      io.observe(e);
    });
    // Page-level heroes: run mask animations right away on client-side navigation.
    document.documentElement.classList.add("ready");
    return () => io.disconnect();
  }, [path]);
  return null;
}
