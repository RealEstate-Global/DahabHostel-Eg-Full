"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { site } from "@/app/_data";

const input = "input-modern";
const label = "label-modern";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert({
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
    return <p className="border border-brand bg-brand-soft text-brand-dark px-5 py-4 rounded-2xl my-5">Thank you! Your message has been sent. We will get back to you soon.</p>;
  }

  return (
    <form onSubmit={submit} className="max-w-[720px] space-y-4">
      <p className="text-[13px] text-ink-subtle"><span className="text-brand">*</span> Indicates required field</p>
      {status === "error" && <p className="text-red-600 text-[13px]">Sorry, something went wrong. Please email us directly at {site.email}.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label className={label}>Name *</label><input required className={input} value={form.name} onChange={set("name")} /></div>
        <div><label className={label}>Email *</label><input required type="email" className={input} value={form.email} onChange={set("email")} /></div>
      </div>
      <div><label className={label}>Subject</label><input className={input} value={form.subject} onChange={set("subject")} /></div>
      <div><label className={label}>Message *</label><textarea required rows={6} className={input} value={form.message} onChange={set("message")} /></div>
      <button disabled={status === "sending"} className="btn-primary">
        {status === "sending" ? "Sending." : "Send Message"}
      </button>
    </form>
  );
}
