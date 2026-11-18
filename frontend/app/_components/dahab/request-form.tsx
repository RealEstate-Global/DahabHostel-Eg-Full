"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { site, rooms } from "@/app/_data";
import { SelectField } from "./select-field";

const input = "input-modern";
const label = "label-modern";

const roomOptions = rooms.map((room) => ({ value: room.name, label: room.name }));
const airportOptions = [
  { value: "(CAI) Cairo International Airport", label: "(CAI) Cairo International Airport" },
  { value: "(SPX) Sphinx International Airport", label: "(SPX) Sphinx International Airport" },
];

type Kind = "tour" | "booking" | "pickup";

const config: Record<Kind, { table: string; button: string; success: string }> = {
  tour: { table: "tour_requests", button: "Send Request", success: "Thank you! Your tour request has been sent." },
  booking: { table: "booking_requests", button: "Send Booking Request", success: "Thank you! Your booking request has been sent." },
  pickup: { table: "airport_pickups", button: "Submit", success: "Great! Your flight details have been sent to us." },
};

export function RequestForm({ kind }: { kind: Kind }) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if ((kind === "booking" && !form.room) || (kind === "pickup" && !form.airport)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const supabase = createClient();
    const payload: Record<string, unknown> = {
      name: `${form.first || ""} ${form.last || ""}`.trim() || form.name || "Guest",
      email: form.email || "",
      message: form.message || form.special_requests || "",
    };
    if (form.room) payload.room = form.room;
    if (form.guests) payload.guests = Number(form.guests) || 1;
    if (form.period) payload.period = form.period;
    if (form.destinations) payload.destinations = form.destinations;
    if (form.phone) payload.phone = form.phone;
    if (form.airport) payload.airport = form.airport;
    if (form.arrival_date) payload.arrival_date = form.arrival_date;
    if (form.arrival_time) payload.arrival_time = form.arrival_time;
    if (form.flight_no) payload.flight_no = form.flight_no;
    const { error } = await supabase.from(config[kind].table).insert(payload);
    if (error) { console.error("supabase insert failed", error); setStatus("error"); }
    else { setStatus("done"); }
  }

  if (status === "done") {
    return <p className="border border-brand bg-brand-soft text-brand-dark px-5 py-4 rounded-2xl my-5">{config[kind].success}</p>;
  }

  return (
    <form onSubmit={submit} className="max-w-[720px] space-y-4">
      <p className="text-[13px] text-ink-subtle"><span className="text-brand">*</span> Indicates required field</p>
      {status === "error" && <p className="text-red-600 text-[13px]">Please complete the required fields. If the problem continues, email us at {site.email}.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label className={label}>First Name *</label><input required className={input} value={form.first || ""} onChange={set("first")} /></div>
        <div><label className={label}>Last Name *</label><input required className={input} value={form.last || ""} onChange={set("last")} /></div>
      </div>
      <div><label className={label}>Email *</label><input required type="email" className={input} value={form.email || ""} onChange={set("email")} /></div>
      {kind === "pickup" ? (
        <>
          <div><label className={label}>Phone Number (WhatsApp preferred) *</label><input required className={input} value={form.phone || ""} onChange={set("phone")} /></div>
          <SelectField label="Arrival Airport" required placeholder="Select Airport" value={form.airport} onChange={(v) => setForm({ ...form, airport: v })} options={airportOptions} />
          <div className="grid grid-cols-2 gap-3"><div><label className={label}>Flight No. *</label><input required className={input} value={form.flight_no || ""} onChange={set("flight_no")} /></div><div><label className={label}>No. of Persons *</label><input required type="number" min="1" className={input} value={form.guests || ""} onChange={set("guests")} /></div></div>
          <div className="grid grid-cols-2 gap-3"><div><label className={label}>Arrival Date (DD/MM/YYYY) *</label><input required className={input} value={form.arrival_date || ""} onChange={set("arrival_date")} /></div><div><label className={label}>Arrival Time (HH:MM) *</label><input required className={input} value={form.arrival_time || ""} onChange={set("arrival_time")} /></div></div>
        </>
      ) : (
        <>
          {kind === "booking" && <SelectField label="Room" required placeholder="Select Room" value={form.room} onChange={(v) => setForm({ ...form, room: v })} options={roomOptions} />}
          <div className="grid grid-cols-2 gap-3"><div><label className={label}>No. of Guests</label><input type="number" min="1" className={input} value={form.guests || ""} onChange={set("guests")} /></div><div><label className={label}>{kind === "tour" ? "Period of Stay" : "Preferred Date"}</label><input className={input} value={form.period || ""} onChange={set("period")} placeholder="e.g. 10 days" /></div></div>
          {kind === "tour" && <div><label className={label}>Destination(s) of Interest</label><input className={input} value={form.destinations || ""} onChange={set("destinations")} /></div>}
          <div><label className={label}>Special Requests</label><textarea rows={4} className={input} value={form.special_requests || ""} onChange={set("special_requests")} /></div>
        </>
      )}
      <button disabled={status === "sending"} className="btn-primary">
        {status === "sending" ? "Sending." : config[kind].button}
      </button>
    </form>
  );
}
