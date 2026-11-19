"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Pencil, Plus, Save, X } from "lucide-react";
import { upsertSiteSetting } from "../_actions";
import { formatAdminDate } from "../_lib/date-format";
import type { Database } from "@/utils/supabase/types";

type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"];

function serialize(value: SiteSetting["value"]): string {
  return JSON.stringify(value, null, 2);
}

export function SettingsManager({ settings, locale, showHeader = true }: { settings: SiteSetting[]; locale: string; showHeader?: boolean }) {
  const t = useTranslations("admin.settingsPage");
  const actions = useTranslations("admin.actions");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [adding, setAdding] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("null");

  function save(key: string, rawValue: string, isNew = false) {
    let value: SiteSetting["value"];
    try {
      value = JSON.parse(rawValue) as SiteSetting["value"];
    } catch {
      toast.error(t("invalidJson"));
      return;
    }

    const normalizedKey = key.trim();
    if (isNew && settings.some((setting) => setting.key === normalizedKey)) {
      toast.error(t("duplicateKey"));
      return;
    }

    startTransition(async () => {
      try {
        await upsertSiteSetting(normalizedKey, value);
        toast.success(actions("saveSuccess"));
        setEditingKey(null);
        setAdding(false);
        setDrafts((current) => {
          const next = { ...current };
          delete next[key];
          return next;
        });
        setNewKey("");
        setNewValue("null");
        router.refresh();
      } catch {
        toast.error(actions("error"));
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {showHeader ? (
          <div>
            <h3 className="text-lg font-semibold text-ink-heading">{t("title")}</h3>
            <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
          </div>
        ) : <span />}
        {!adding && (
          <button type="button" onClick={() => setAdding(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            <Plus aria-hidden="true" className="h-4 w-4" />
            {t("addSetting")}
          </button>
        )}
      </div>

      {adding && (
        <section className="rounded-2xl border border-brand/30 bg-surface p-4 shadow-soft sm:p-6" aria-labelledby="new-setting-title">
          <h4 id="new-setting-title" className="text-base font-semibold text-ink-heading">{t("newSetting")}</h4>
          <div className="mt-4 grid gap-4">
            <label className="grid gap-1.5 text-sm font-medium text-ink-heading">
              {t("key")}
              <input value={newKey} onChange={(event) => setNewKey(event.target.value)} maxLength={160} required className="input-modern" dir="ltr" autoComplete="off" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-ink-heading">
              {t("value")}
              <textarea value={newValue} onChange={(event) => setNewValue(event.target.value)} required rows={6} spellCheck={false} className="input-modern min-h-36 resize-y font-mono text-xs leading-6" dir="ltr" lang="en" />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={() => { setAdding(false); setNewKey(""); setNewValue("null"); }} disabled={isPending} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-ink-heading hover:bg-surface-soft disabled:opacity-60">
              <X aria-hidden="true" className="h-4 w-4" />{actions("cancel")}
            </button>
            <button type="button" onClick={() => save(newKey, newValue, true)} disabled={isPending || !newKey.trim()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
              <Save aria-hidden="true" className="h-4 w-4" />{isPending ? t("saving") : actions("save")}
            </button>
          </div>
        </section>
      )}

      {settings.length === 0 && !adding ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface px-4 py-12 text-center">
          <p className="text-sm text-ink-muted">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {settings.map((setting) => {
            const isEditing = editingKey === setting.key;
            const draft = drafts[setting.key] ?? serialize(setting.value);
            return (
              <article key={setting.key} className="min-w-0 rounded-2xl border border-line bg-surface p-4 shadow-soft transition-shadow hover:shadow-card sm:p-5">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h4 className="break-all font-mono text-sm font-semibold text-brand" dir="ltr">{setting.key}</h4>
                    <p className="mt-1 text-xs text-ink-muted">{t("updatedAt", { date: formatAdminDate(setting.updated_at, locale) })}</p>
                  </div>
                  {!isEditing && (
                    <button type="button" onClick={() => { setDrafts((current) => ({ ...current, [setting.key]: serialize(setting.value) })); setEditingKey(setting.key); }} aria-label={`${actions("edit")}: ${setting.key}`} className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-line px-3 text-sm font-semibold text-ink-heading hover:border-brand/40 hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                      <Pencil aria-hidden="true" className="h-4 w-4" />{actions("edit")}
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-3">
                    <label className="grid gap-1.5 text-sm font-medium text-ink-heading">
                      {t("value")}
                      <textarea value={draft} onChange={(event) => setDrafts((current) => ({ ...current, [setting.key]: event.target.value }))} rows={7} spellCheck={false} className="input-modern min-h-40 resize-y font-mono text-xs leading-6" dir="ltr" lang="en" autoFocus />
                    </label>
                    <div className="flex flex-wrap justify-end gap-2">
                      <button type="button" onClick={() => { setEditingKey(null); setDrafts((current) => { const next = { ...current }; delete next[setting.key]; return next; }); }} disabled={isPending} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-ink-heading hover:bg-surface-soft disabled:opacity-60">
                        <X aria-hidden="true" className="h-4 w-4" />{actions("cancel")}
                      </button>
                      <button type="button" onClick={() => save(setting.key, draft)} disabled={isPending} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
                        <Save aria-hidden="true" className="h-4 w-4" />{isPending ? t("saving") : actions("save")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <pre dir="ltr" className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-line/60 bg-surface-soft p-4 text-left font-mono text-xs leading-6 text-ink [unicode-bidi:plaintext]">
                    {serialize(setting.value)}
                  </pre>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
