"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/utils/supabase/client";
import { site } from "@/app/_data";

const input = "input-modern";
const label = "label-modern";

export function ContactForm() {
  const t = useTranslations("common.contactForm");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await (supabase.from("contact_messages") as any).insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    if (error) {
      console.error("contact_messages insert failed", error);
      setStatus("error");
    } else {
      setStatus("done");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  if (status === "done") {
    return <p className="bg-gradient-to-r from-brand-soft to-brand-soft/50 text-brand-dark px-5 py-4 rounded-2xl my-5 shadow-soft ring-1 ring-brand/20">{t("success")}</p>;
  }

  return (
    <form onSubmit={submit} className="max-w-[720px] space-y-4">
      <p className="text-[13px] text-ink-subtle"><span className="text-brand">*</span> {t("requiredNote")}</p>
      {status === "error" && <p className="text-red-600 text-[13px]">{t("error")} {site.email}.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label className={label}>{t("name")} *</label><input required className={input} value={form.name} onChange={set("name")} /></div>
        <div><label className={label}>{t("email")} *</label><input required type="email" className={input} value={form.email} onChange={set("email")} /></div>
      </div>
      <div><label className={label}>{t("subject")}</label><input className={input} value={form.subject} onChange={set("subject")} /></div>
      <div><label className={label}>{t("message")} *</label><textarea required rows={6} className={input} value={form.message} onChange={set("message")} /></div>
      <button disabled={status === "sending"} className="btn-primary">
        {status === "sending" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
