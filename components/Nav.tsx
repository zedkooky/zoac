"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export default function Nav() {
  const path = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const brand = (
    <Link href="/" className="brand" aria-label="Zambian Outdoors Adventure Co. — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/logo.png" alt="" />
      <span>Zambian Outdoors<br />Adventure Co.</span>
    </Link>
  );
  return (
    <>
      <header className={`nav${solid ? " solid" : ""}`}>
        <div className="nav__in">
          {brand}
          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>{n.label}</Link>
            ))}
            <Link href="/contact" className="btn">Plan a trip</Link>
          </nav>
          <button className="burger" aria-label="Open menu" onClick={() => setOpen(true)}><span /><span /></button>
        </div>
      </header>
      <div className={`menu${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="menu__top">{brand}<button className="menu__close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button></div>
        <nav className="menu__links">
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="menu__foot">Lusaka · Mpulungu · Lake Tanganyika</div>
      </div>
    </>
  );
}
