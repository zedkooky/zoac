"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const DiveMap = dynamic(() => import("./DiveMap"), {
  ssr: false,
  loading: () => <div className="map" style={{ minHeight: 640 }} aria-busy="true" />,
});
export default function DiveMapLoader() { return <DiveMap />; }
