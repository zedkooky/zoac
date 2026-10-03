import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <div className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo.png" alt="" />
              <span>Zambian Outdoors<br />Adventure Co.<small>Est. 2023</small></span>
            </div>
            <p style={{ maxWidth: "32ch" }}>Adventure, professionally delivered. Built from a lake town outward, and led overwhelmingly by Zambians.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>{NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}<li><Link href="/contact">Contact</Link></li></ul>
          </div>
          <div>
            <h4>Where we operate</h4>
            <ul><li>Lake Tanganyika &amp; Mpulungu</li><li>The Copperbelt</li><li>Lower Zambezi</li><li>Muchinga Escarpment</li><li>Nyika Plateau</li><li>Lusaka &amp; surrounds</li></ul>
          </div>
          <div>
            <h4>Talk to us</h4>
            <ul>
              {SITE.people.map((p) => <li key={p.name}>{p.name} · <a href={`tel:${p.tel}`}>{p.phone}</a></li>)}
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>{SITE.hq}</li>
            </ul>
          </div>
        </div>
        <div className="foot__base">
          <span>© {new Date().getFullYear()} Zambian Outdoor Adventure Company</span>
          <span>Zambian owned, staffed &amp; led</span>
        </div>
      </div>
    </footer>
  );
}
