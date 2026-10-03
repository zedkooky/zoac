"use client";
import { useEffect, useRef } from "react";

/** Muted looping background video. Skipped (poster only) for reduced motion or data-saver visitors. */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.src = v.canPlayType('video/mp4; codecs="avc1.640028"') ? src : src.replace(/\.mp4$/, ".webm");
    v.addEventListener("playing", () => v.classList.add("on"), { once: true });
    v.play().catch(() => {});
  }, [src]);
  return <video ref={ref} className="hero__video" poster={poster} muted loop playsInline aria-hidden="true" />;
}
