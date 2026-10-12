"use client";
import { useEffect } from "react";
import { ANALYTICS } from "@/lib/site";
import { captureSource, track } from "@/lib/track";

/** Loads Umami (cookieless) when configured, records the visit source, and tracks WhatsApp/phone/email clicks. */
export default function Analytics() {
  useEffect(() => {
    captureSource();
    if (ANALYTICS.umamiId && !document.querySelector("script[data-website-id]")) {
      const s = document.createElement("script");
      s.defer = true;
      s.src = ANALYTICS.umamiSrc;
      s.dataset.websiteId = ANALYTICS.umamiId;
      document.head.appendChild(s);
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const kind = href.includes("wa.me") ? "whatsapp_click" : href.startsWith("tel:") ? "phone_click" : href.startsWith("mailto:") ? "email_click" : href.endsWith(".pdf") ? "pdf_download" : "";
      if (kind) track(kind, { page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
