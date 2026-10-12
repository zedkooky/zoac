"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, waLink } from "@/lib/site";
import { lockScroll } from "@/lib/scroll";

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
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; lockScroll(open); }, [open]);

  const brand = (
    <Link href="/" className="brand" aria-label="Zambian Outdoor Adventure Company — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/logo.png" alt="" />
      <span>Zambian Outdoor<br />Adventure Company</span>
    </Link>
  );
  if (path.startsWith("/go/")) {
    return (
      <header className={`nav${solid ? " solid" : ""}`}>
        <div className="nav__in">
          {brand}
          <a className="btn nav__wa" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.33-2 1.4-.52.07-1.17.1-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.3-5-4.35-5.15-4.55-.15-.2-1.23-1.63-1.23-3.1 0-1.48.77-2.2 1.05-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.52.25.6.85 2.07.92 2.22.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.32.38-.45.51-.15.15-.3.3-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.08 1.32 2.38 1.47.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.7-.18 1.4Z" /></svg><span>WhatsApp us</span></a>
        </div>
      </header>
    );
  }
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
