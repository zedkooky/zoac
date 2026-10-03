"use client";
import { useState } from "react";
import { sendEnquiry } from "@/lib/enquiry";

const ACTIVITIES = ["Scuba diving", "Snorkelling", "Kayak & canoe", "Hiking & trekking", "Off-road safari", "Kitesurfing", "Rescue / industry training", "Team building"];
const LENGTHS = ["A day", "2–3 days", "4–7 days", "1–2 weeks", "Not sure yet"];
const BUDGETS = ["Under USD 250", "USD 250–750", "USD 750–1,500", "USD 1,500+", "Not sure yet"];
const STAYS = ["Camping", "Lodge", "A mix", "Not sure yet"];

export default function CustomPackageForm() {
  const [state, setState] = useState<{ kind: "idle" | "sending" | "ok" | "err"; msg?: string }>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const activities = fd.getAll("activities").join(", ") || "Open to ideas";
    const extra = [`Activities: ${activities}`, `Trip length: ${fd.get("length")}`, `Budget per person: ${fd.get("budget")}`, `Stay: ${fd.get("stay")}`];
    const notes = String(fd.get("notes") ?? "").trim();
    const data: Record<string, string> = {
      name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? ""), phone: String(fd.get("phone") ?? ""),
      group: String(fd.get("group") ?? ""), date: String(fd.get("date") ?? ""), website: String(fd.get("website") ?? ""),
      topic: "Custom package",
      message: extra.join("\n") + (notes ? `\n\n${notes}` : ""),
    };
    setState({ kind: "sending" });
    const result = await sendEnquiry(data);
    if (result.kind === "ok") form.reset();
    setState(result);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="chips">
        <legend>What would you like to do?</legend>
        {ACTIVITIES.map((a) => (
          <label key={a} className="chipbox"><input type="checkbox" name="activities" value={a} /><span>{a}</span></label>
        ))}
      </fieldset>
      <div className="row3">
        <div className="field"><label htmlFor="cp-length">Trip length</label><select id="cp-length" name="length" defaultValue={LENGTHS[2]}>{LENGTHS.map((o) => <option key={o}>{o}</option>)}</select></div>
        <div className="field"><label htmlFor="cp-budget">Budget per person</label><select id="cp-budget" name="budget" defaultValue={BUDGETS[4]}>{BUDGETS.map((o) => <option key={o}>{o}</option>)}</select></div>
        <div className="field"><label htmlFor="cp-stay">Where to stay</label><select id="cp-stay" name="stay" defaultValue={STAYS[3]}>{STAYS.map((o) => <option key={o}>{o}</option>)}</select></div>
      </div>
      <div className="row2">
        <div className="field"><label htmlFor="cp-group">Group size</label><input id="cp-group" name="group" inputMode="numeric" placeholder="e.g. 6" /></div>
        <div className="field"><label htmlFor="cp-date">When</label><input id="cp-date" name="date" placeholder="e.g. August, school holidays" /></div>
      </div>
      <div className="row3">
        <div className="field"><label htmlFor="cp-name">Name</label><input id="cp-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="cp-email">Email</label><input id="cp-email" name="email" type="email" required autoComplete="email" /></div>
        <div className="field"><label htmlFor="cp-phone">Phone / WhatsApp</label><input id="cp-phone" name="phone" type="tel" autoComplete="tel" /></div>
      </div>
      <div className="field"><label htmlFor="cp-notes">Anything else we should know?</label><textarea id="cp-notes" name="notes" placeholder="Occasion, experience level, must-sees…" /></div>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div><button className="btn" disabled={state.kind === "sending"}>{state.kind === "sending" ? "Sending…" : "Request my itinerary"}</button></div>
      <p className={`form__note ${state.kind === "ok" ? "ok" : state.kind === "err" ? "err" : ""}`} role="status">{state.msg}</p>
    </form>
  );
}
