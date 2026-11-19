"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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

export function RequestForm({ kind }: { kind: Kind }) {
  const t = useTranslations("common.requestForm");
  const [form, setForm] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const config: Record<Kind, { table: string; button: string; success: string }> = {
    tour: { table: "tour_requests", button: t("tourButton"), success: t("tourSuccess") },
    booking: { table: "booking_requests", button: t("bookingButton"), success: t("bookingSuccess") },
    pickup: { table: "airport_pickups", button: t("pickupButton"), success: t("pickupSuccess") },
  };

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
    const { error } = await (supabase.from(config[kind].table) as any).insert(payload);
    if (error) { console.error("supabase insert failed", error); setStatus("error"); }
    else { setStatus("done"); }
  }

  if (status === "done") {
    return <p className="bg-gradient-to-r from-brand-soft to-brand-soft/50 text-brand-dark px-5 py-4 rounded-2xl my-5 shadow-soft ring-1 ring-brand/20">{config[kind].success}</p>;
  }

  return (
    <form onSubmit={submit} className="max-w-[720px] space-y-4">
      <p className="text-[13px] text-ink-subtle"><span className="text-brand">*</span> {t("requiredNote")}</p>
      {status === "error" && <p className="text-destructive text-[13px] font-medium">{t("errorRequired")} {site.email}.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label className={label}>{t("firstName")} *</label><input required className={input} value={form.first || ""} onChange={set("first")} /></div>
        <div><label className={label}>{t("lastName")} *</label><input required className={input} value={form.last || ""} onChange={set("last")} /></div>
      </div>
      <div><label className={label}>{t("email")} *</label><input required type="email" className={input} value={form.email || ""} onChange={set("email")} /></div>
      {kind === "pickup" ? (
        <>
          <div><label className={label}>{t("phone")} *</label><input required className={input} value={form.phone || ""} onChange={set("phone")} /></div>
          <SelectField label={t("arrivalAirport")} required placeholder={t("selectAirport")} value={form.airport} onChange={(v) => setForm({ ...form, airport: v })} options={airportOptions} />
          <div className="grid grid-cols-2 gap-3"><div><label className={label}>{t("flightNo")} *</label><input required className={input} value={form.flight_no || ""} onChange={set("flight_no")} /></div><div><label className={label}>{t("persons")} *</label><input required type="number" min="1" className={input} value={form.guests || ""} onChange={set("guests")} /></div></div>
          <div className="grid grid-cols-2 gap-3"><div><label className={label}>{t("arrivalDate")} *</label><input required className={input} value={form.arrival_date || ""} onChange={set("arrival_date")} /></div><div><label className={label}>{t("arrivalTime")} *</label><input required className={input} value={form.arrival_time || ""} onChange={set("arrival_time")} /></div></div>
        </>
      ) : (
        <>
          {kind === "booking" && <SelectField label={t("room")} required placeholder={t("selectRoom")} value={form.room} onChange={(v) => setForm({ ...form, room: v })} options={roomOptions} />}
          <div className="grid grid-cols-2 gap-3"><div><label className={label}>{t("guests")}</label><input type="number" min="1" className={input} value={form.guests || ""} onChange={set("guests")} /></div><div><label className={label}>{kind === "tour" ? t("periodOfStay") : t("preferredDate")}</label><input className={input} value={form.period || ""} onChange={set("period")} placeholder="e.g. 10 days" /></div></div>
          {kind === "tour" && <div><label className={label}>{t("destinations")}</label><input className={input} value={form.destinations || ""} onChange={set("destinations")} /></div>}
          <div><label className={label}>{t("specialRequests")}</label><textarea rows={4} className={input} value={form.special_requests || ""} onChange={set("special_requests")} /></div>
        </>
      )}
      <button disabled={status === "sending"} className="btn-primary">
        {status === "sending" ? t("sending") : config[kind].button}
      </button>
    </form>
  );
}
