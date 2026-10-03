import { SITE } from "@/lib/site";

export type SendResult = { kind: "ok" | "err"; msg: string };

/** POSTs to /enquiry.php; on failure opens the visitor's mail app pre-filled instead. */
export async function sendEnquiry(data: Record<string, string>): Promise<SendResult> {
  try {
    const res = await fetch("/enquiry.php", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error(String(res.status));
    return { kind: "ok", msg: "Thank you — we'll be in touch shortly." };
  } catch {
    const body = Object.entries(data).filter(([k, v]) => v && k !== "website").map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Enquiry: " + (data.topic || "General"))}&body=${encodeURIComponent(body)}`;
    return { kind: "err", msg: "We couldn't send that automatically, so we've opened your email app instead. You can also WhatsApp us." };
  }
}
