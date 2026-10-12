type Umami = { track: (event: string, data?: Record<string, string | number | boolean>) => void };

/** Sends a custom event to Umami when it's loaded; silently does nothing otherwise. */
export function track(event: string, data?: Record<string, string | number | boolean>) {
  try { (window as Window & { umami?: Umami }).umami?.track(event, data); } catch {}
}

const KEY = "zoac-src";

/** Remembers how the visitor first arrived (UTM tags, referrer, landing page) for this browser session. */
export function captureSource() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(location.search);
    const src = {
      utm_source: q.get("utm_source") ?? "",
      utm_medium: q.get("utm_medium") ?? "",
      utm_campaign: q.get("utm_campaign") ?? "",
      referrer: document.referrer && !document.referrer.startsWith(location.origin) ? new URL(document.referrer).hostname : "",
      landing: location.pathname,
    };
    sessionStorage.setItem(KEY, JSON.stringify(src));
  } catch {}
}

/** One-line summary of the visitor's source, attached to every lead. */
export function sourceSummary(page: string) {
  let src: Record<string, string> = {};
  try { src = JSON.parse(sessionStorage.getItem(KEY) ?? "{}"); } catch {}
  const parts = [`form: ${page}`, ...Object.entries(src).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)];
  return parts.join("; ");
}
