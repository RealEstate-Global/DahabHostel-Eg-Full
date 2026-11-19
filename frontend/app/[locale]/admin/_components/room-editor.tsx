"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { upsertRoom } from "../_actions";
import type { Database } from "@/utils/supabase/types";

type Room = Database["public"]["Tables"]["rooms"]["Row"];

export function RoomEditor({ room }: { room?: Room }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("admin.rooms");
  const table = useTranslations("admin.table");
  const actions = useTranslations("admin.actions");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amenities = String(form.get("amenities") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    startTransition(async () => {
      try {
        await upsertRoom({
          ...(room ? { id: room.id } : {}),
          name: String(form.get("name") ?? ""),
          slug: String(form.get("slug") ?? ""),
          price_egp: Number(form.get("price_egp")),
          price_label: String(form.get("price_label") ?? ""),
          category: String(form.get("category")) as "dorm" | "private",
          description: String(form.get("description") ?? ""),
          capacity: Number(form.get("capacity")),
          amenities,
          image_url: String(form.get("image_url") ?? ""),
          sort_order: Number(form.get("sort_order")),
          is_active: form.get("is_active") === "on",
        });
        toast.success(actions("saveSuccess"));
        setOpen(false);
        router.refresh();
      } catch {
        toast.error(actions("error"));
      }
    });
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
        {room ? actions("edit") : t("addRoom")}
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget && !isPending) setOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="room-editor-title" className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-2xl sm:p-7">
            <h2 id="room-editor-title" className="text-xl font-bold text-ink-heading">{room ? t("editRoom") : t("addRoom")}</h2>
            <form onSubmit={submit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm font-medium text-ink-heading">{table("name")}<input name="name" required maxLength={120} defaultValue={room?.name} className="input-modern" /></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading">{table("slug")}<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={140} defaultValue={room?.slug} className="input-modern" /></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading">{t("priceEgp")}<input name="price_egp" type="number" min="0" step="0.01" required defaultValue={room?.price_egp ?? 0} className="input-modern" /></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading">{table("price")}<input name="price_label" required maxLength={100} defaultValue={room?.price_label} className="input-modern" /></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading">{table("category")}<select name="category" defaultValue={room?.category ?? "dorm"} className="input-modern"><option value="dorm">{t("dorm")}</option><option value="private">{t("private")}</option></select></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading">{table("capacity")}<input name="capacity" type="number" min="1" max="100" required defaultValue={room?.capacity ?? 1} className="input-modern" /></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading sm:col-span-2">{table("amenities")}<input name="amenities" defaultValue={room?.amenities.join(", ")} className="input-modern" /></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading sm:col-span-2">{table("image")}<input name="image_url" type="text" maxLength={2048} defaultValue={room?.image_url ?? ""} className="input-modern" /></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading sm:col-span-2">{table("description")}<textarea name="description" rows={3} maxLength={5000} defaultValue={room?.description ?? ""} className="input-modern" /></label>
              <label className="space-y-1 text-sm font-medium text-ink-heading">{table("sortOrder")}<input name="sort_order" type="number" min="0" defaultValue={room?.sort_order ?? 0} className="input-modern" /></label>
              <label className="flex min-h-11 items-center gap-2 text-sm font-medium text-ink-heading"><input name="is_active" type="checkbox" defaultChecked={room?.is_active ?? true} className="h-4 w-4 accent-brand" />{table("active")}</label>
              <div className="flex justify-end gap-2 sm:col-span-2">
                <button type="button" disabled={isPending} onClick={() => setOpen(false)} className="min-h-11 rounded-xl border border-line px-4 text-sm font-semibold text-ink-heading">{actions("cancel")}</button>
                <button type="submit" disabled={isPending} className="min-h-11 rounded-xl bg-brand px-4 text-sm font-semibold text-white disabled:opacity-60">{actions("save")}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
