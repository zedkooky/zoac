"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LMap, Marker } from "leaflet";
import sites from "@/data/dive-sites.json";

type Site = (typeof sites)[number];
const KINDS = {
  recreational: { label: "Scuba", color: "#c4a46a" },
  snorkel: { label: "Snorkel & freedive", color: "#7fb2d4" },
  technical: { label: "Technical", color: "#d9674f" },
} as const;
type Kind = keyof typeof KINDS;

export default function DiveMap() {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const markers = useRef<Map<string, Marker>>(new Map());
  const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);
  const [on, setOn] = useState<Record<Kind, boolean>>({ recreational: true, snorkel: true, technical: true });
  const [active, setActive] = useState<string | null>(null);

  const located = useMemo(() => sites.filter((s) => s.lat != null && s.lng != null && on[s.kind as Kind]), [on]);
  const pending = useMemo(() => sites.filter((s) => s.lat == null), []);

  useEffect(() => { import("leaflet").then((m) => setLeaflet(m.default ?? m)); }, []);

  // create map once
  useEffect(() => {
    if (!leaflet || !el.current || map.current) return;
    const m = leaflet.map(el.current, { scrollWheelZoom: false, zoomControl: true });
    leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
      maxZoom: 18,
    }).addTo(m);
    m.setView([-8.655, 31.195], 13);
    map.current = m;
    return () => { m.remove(); map.current = null; };
  }, [leaflet]);

  // sync markers with filter
  useEffect(() => {
    const m = map.current;
    if (!leaflet || !m) return;
    markers.current.forEach((mk) => mk.remove());
    markers.current.clear();
    located.forEach((s: Site) => {
      const c = KINDS[s.kind as Kind].color;
      const icon = leaflet.divIcon({ className: "", html: `<div class="pin" style="background:${c}"></div>`, iconSize: [16, 16], iconAnchor: [8, 8] });
      const detail = [s.category, s.difficulty, s.depth != null ? `${s.depth} m` : ""].filter(Boolean).join(" · ");
      const mk = leaflet.marker([s.lat as number, s.lng as number], { icon, title: s.name })
        .bindPopup(`<b>${s.name}</b>${detail}${s.description ? `<br/>${s.description}` : ""}${s.status === "Approximate" ? "<br/><em>Position approximate</em>" : ""}`)
        .on("click", () => setActive(s.name))
        .addTo(m);
      markers.current.set(s.name, mk);
    });
    if (located.length) m.fitBounds(leaflet.latLngBounds(located.map((s) => [s.lat as number, s.lng as number] as [number, number])), { padding: [40, 40], maxZoom: 14 });
  }, [leaflet, located]);

  const focus = (s: Site) => {
    setActive(s.name);
    const m = map.current; const mk = markers.current.get(s.name);
    if (m && mk) { m.flyTo(mk.getLatLng(), 16, { duration: 1.4 }); mk.openPopup(); }
  };

  return (
    <div>
      <div className="mapwrap">
        <aside className="mapside">
          <div className="filters" role="group" aria-label="Filter dive sites">
            {(Object.keys(KINDS) as Kind[]).map((k) => (
              <button key={k} className="chip" aria-pressed={on[k]} onClick={() => setOn((o) => ({ ...o, [k]: !o[k] }))}>
                <span className="dot" style={{ background: KINDS[k].color, marginRight: 6 }} />{KINDS[k].label}
              </button>
            ))}
          </div>
          <ul className="sitelist">
            {located.map((s) => (
              <li key={s.name}>
                <button aria-current={active === s.name} onClick={() => focus(s)}>
                  <b><span className="dot" style={{ background: KINDS[s.kind as Kind].color }} />{s.name}</b>
                  <span>{[s.category, s.difficulty, s.depth != null ? `to ${s.depth} m` : ""].filter(Boolean).join(" · ")}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="map" ref={el} role="application" aria-label="Map of Lake Tanganyika dive sites" />
      </div>
      <div className="legend">
        {(Object.keys(KINDS) as Kind[]).map((k) => <span key={k}><span className="dot" style={{ background: KINDS[k].color }} />{KINDS[k].label}</span>)}
      </div>
      {pending.length > 0 && (
        <>
          <p className="muted" style={{ marginTop: 28, fontSize: 14 }}>Wrecks being surveyed — positions coming soon:</p>
          <div className="pending">{pending.map((s) => <span className="pill" key={s.name}>{s.name}</span>)}</div>
        </>
      )}
    </div>
  );
}
