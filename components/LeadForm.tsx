"use client";
import { useState } from "react";
import { REPLY_TIME, waLink } from "@/lib/site";
import { sourceSummary, track } from "@/lib/track";

export type LeadField =
  | { key: string; label: string; type: "text" | "number"; placeholder?: string; maps?: "group" | "date" }
  | { key: string; label: string; type: "select"; options: string[]; maps?: "group" | "date" };

type Props = {
  page: string;
  topic: string;
  fields: LeadField[];
  submit: string;
  pdf?: { href: string; label: string };
  thanks: string;
};

/** Short lead form for landing pages. Needs a name plus WhatsApp or email; delivers the PDF straight after submitting. */
export default function LeadForm({ page, topic, fields, submit, pdf, thanks }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    if (!get("phone") && !get("email")) { setError("Add a WhatsApp number or an email so we can reply."); return; }
    setError("");
    const data: Record<string, string> = { name: get("name"), email: get("email"), phone: get("phone"), topic, website: get("website"), source: sourceSummary(`/go/${page}`) };
    const lines: string[] = [];
    for (const f of fields) {
      const v = get(f.key);
      if (!v) continue;
      if (f.maps) data[f.maps] = v;
      else lines.push(`${f.label}: ${v}`);
    }
    data.message = lines.join("\n");
    setName(data.name.split(" ")[0]);
    setState("sending");
    let ok = false;
    try {
      const res = await fetch("/enquiry.php", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      ok = res.ok;
    } catch {}
    track("lead_submit", { page: `/go/${page}`, topic, ok });
    setState(ok ? "ok" : "err");
  }

  if (state === "ok" || state === "err") {
    return (
      <div className="lead lead--done" role="status">
        <p className="eyebrow">{state === "ok" ? "Received" : "Almost there"}</p>
        <h3>{state === "ok" ? `Thanks${name ? `, ${name}` : ""}.` : "We couldn't send that automatically."}</h3>
        <p>{state === "ok" ? thanks : "Please message us on WhatsApp instead — it's the fastest way to reach us."}</p>
        <div className="lead__actions">
          {pdf && <a className="btn" href={pdf.href} download>{pdf.label}</a>}
          <a className="btn btn--dark" href={waLink(`Hi Zambian Outdoor Adventure Company, I just filled in the ${topic} form.`)} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form className="lead form" onSubmit={onSubmit} noValidate={false}>
      <div className="field"><label htmlFor={`${page}-name`}>Your name</label><input id={`${page}-name`} name="name" required autoComplete="name" /></div>
      <div className="row2">
        <div className="field"><label htmlFor={`${page}-phone`}>WhatsApp number</label><input id={`${page}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+260…" /></div>
        <div className="field"><label htmlFor={`${page}-email`}>Email (optional)</label><input id={`${page}-email`} name="email" type="email" autoComplete="email" /></div>
      </div>
      {fields.map((f) => (
        <div className="field" key={f.key}>
          <label htmlFor={`${page}-${f.key}`}>{f.label}</label>
          {f.type === "select"
            ? <select id={`${page}-${f.key}`} name={f.key} defaultValue={f.options[0]}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
            : <input id={`${page}-${f.key}`} name={f.key} type="text" inputMode={f.type === "number" ? "numeric" : undefined} placeholder={f.placeholder} />}
        </div>
      ))}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {error && <p className="form__note err" role="alert">{error}</p>}
      <div><button className="btn btn--dark" disabled={state === "sending"}>{state === "sending" ? "Sending…" : submit}</button></div>
      <p className="lead__small">We reply on WhatsApp within {REPLY_TIME}. No spam, ever.</p>
    </form>
  );
}
