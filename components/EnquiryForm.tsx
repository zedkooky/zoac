"use client";
import { useEffect, useState } from "react";
import { sendEnquiry } from "@/lib/enquiry";

const TOPICS = ["Discover Scuba Diving", "Try Scuba", "Pond Scuba", "Open Water certification", "Lake Tanganyika dive trip", "Kayaking — Lower Zambezi", "Hiking & trekking", "Off-road safari", "School or corporate programme", "Rescue / industrial training", "Merchandise", "Something else"];

export default function EnquiryForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic")?.slice(0, 80);
    if (t) setTopic(t);
  }, []);
  const [state, setState] = useState<{ kind: "idle" | "sending" | "ok" | "err"; msg?: string }>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setState({ kind: "sending" });
    const result = await sendEnquiry(data);
    if (result.kind === "ok") form.reset();
    setState(result);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row2">
        <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="row2">
        <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
        <div className="field"><label htmlFor="topic">I&apos;m interested in</label>
          <select id="topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>{(TOPICS.includes(topic) ? TOPICS : [topic, ...TOPICS]).map((t) => <option key={t}>{t}</option>)}</select>
        </div>
      </div>
      <div className="row2">
        <div className="field"><label htmlFor="group">Group size</label><input id="group" name="group" inputMode="numeric" placeholder="e.g. 4" /></div>
        <div className="field"><label htmlFor="date">Preferred dates</label><input id="date" name="date" placeholder="e.g. mid-July" /></div>
      </div>
      <div className="field"><label htmlFor="message">Tell us more</label><textarea id="message" name="message" /></div>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div><button className="btn btn--dark" disabled={state.kind === "sending"}>{state.kind === "sending" ? "Sending…" : "Send enquiry"}</button></div>
      <p className={`form__note ${state.kind === "ok" ? "ok" : state.kind === "err" ? "err" : ""}`} role="status">{state.msg}</p>
    </form>
  );
}
