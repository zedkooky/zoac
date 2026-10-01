"use client";
import { useEffect, useRef } from "react";

/** Portrait promo reel. Autoplays muted when scrolled into view (never under reduced-motion). */
export default function FilmPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <div className="frame" data-reveal="fade">
      <video ref={ref} src="/video/adventure.mp4" poster="/img/video-poster.jpg" muted loop playsInline preload="none" controls={false} aria-label="Zambia promo film" />
    </div>
  );
}
