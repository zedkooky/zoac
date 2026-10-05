"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [out, setOut] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("skip-pre")) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => { root.classList.add("ready"); setOut(true); }, reduce ? 100 : 2600);
    try { sessionStorage.setItem("zoac-pre", "1"); } catch {}
    return () => clearTimeout(t1);
  }, []);
  return (
    <div className={`pre${out ? " out" : ""}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/logo.png" alt="" />
      <div className="pre__word">Zambian Outdoor<br />Adventure Company</div>
      <div className="pre__line" />
    </div>
  );
}
