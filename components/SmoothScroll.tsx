"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis, syncAfterNavigation } from "@/lib/scroll";

/** Momentum scrolling (desktop wheel/trackpad) plus [data-parallax] drift. Off under prefers-reduced-motion. */
export default function SmoothScroll() {
  const path = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: { offset: -100 } });
    setLenis(lenis);

    let els: HTMLElement[] = [];
    const collect = () => { els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")); };
    const update = () => {
      const vh = window.innerHeight;
      for (const el of els) {
        const box = (el.parentElement ?? el).getBoundingClientRect();
        if (box.bottom < -vh * 0.2 || box.top > vh * 1.2) continue;
        const progress = (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2);
        el.style.translate = `0 ${(-progress * Number(el.dataset.parallax) * box.height).toFixed(1)}px`;
      }
    };
    collect(); update();
    lenis.on("scroll", update);
    const onResize = () => { collect(); update(); };
    window.addEventListener("resize", onResize);
    const mo = new MutationObserver(onResize);
    mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });

    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); mo.disconnect(); window.removeEventListener("resize", onResize); lenis.destroy(); setLenis(null); };
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    syncAfterNavigation();
  }, [path]);
  return null;
}
