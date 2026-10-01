import { NextResponse } from "next/server";

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const FIELDS = ["name", "email", "phone", "topic", "group", "date", "message"] as const;

/**
 * Sends the enquiry by email through Resend (https://resend.com).
 * Env: RESEND_API_KEY, ENQUIRY_TO (default zambianoutdooradventures@gmail.com), ENQUIRY_FROM (verified sender).
 * Without a key it returns 501 and the form falls back to a pre-filled mailto: link.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot
  const v = Object.fromEntries(FIELDS.map((k) => [k, String(body[k] ?? "").slice(0, 4000).trim()])) as Record<(typeof FIELDS)[number], string>;
  if (!v.name || !/^\S+@\S+\.\S+$/.test(v.email)) return NextResponse.json({ error: "invalid" }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "not configured" }, { status: 501 });

  const html = `<h2>New ZOAC enquiry</h2>` + FIELDS.map((k) => `<p><b>${k}:</b> ${esc(v[k]).replace(/\n/g, "<br>")}</p>`).join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? "ZOAC Website <onboarding@resend.dev>",
      to: [process.env.ENQUIRY_TO ?? "zambianoutdooradventures@gmail.com"],
      reply_to: v.email,
      subject: `Enquiry: ${v.topic || "General"} — ${v.name}`,
      html,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "send failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
