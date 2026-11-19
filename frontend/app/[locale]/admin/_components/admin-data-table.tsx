import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cn } from "@/app/_lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
  key: string;
  labelKey: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface AdminDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  emptyMessage: string;
  locale: string;
  basePath: string;
  queryParams?: Record<string, string | undefined>;
  actions?: (row: T) => React.ReactNode;
  loadError?: boolean;
}

export async function AdminDataTable<T extends Record<string, unknown>>({
  columns,
  data,
  total,
  page,
  pageSize,
  totalPages,
  emptyMessage,
  locale,
  basePath,
  queryParams,
  actions,
  loadError = false,
}: AdminDataTableProps<T>) {
  const t = await getTranslations({ locale, namespace: "admin.table" });
  const errorT = await getTranslations({ locale, namespace: "admin.actions" });
  const isRTL = locale === "ar";

  function pageHref(targetPage: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams ?? {})) {
      if (value !== undefined && key !== "page") params.set(key, value);
    }
    params.set("page", String(targetPage));
    return `${basePath}?${params.toString()}`;
  }

  function rowKey(row: T, index: number) {
    const candidate = row.id ?? row.key;
    return typeof candidate === "string" || typeof candidate === "number" ? candidate : index;
  }

  function cellValue(value: unknown): React.ReactNode {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "boolean") return value ? t("yes") : t("no");
    if (Array.isArray(value)) return value.map((entry) => String(entry)).join(", ") || "—";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  }

  if (loadError) {
    return (
      <section role="alert" className="rounded-2xl border border-destructive/30 bg-destructive-soft p-5 sm:p-6">
        <h3 className="font-semibold text-ink-heading">{errorT("loadErrorTitle")}</h3>
        <p className="mt-1 text-sm text-ink-muted">{errorT("loadErrorDescription")}</p>
        <Link href={pageHref(1)} className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-surface px-4 text-sm font-semibold text-ink-heading ring-subtle hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          {errorT("retry")}
        </Link>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface py-16">
        <p className="text-sm text-ink-muted">{emptyMessage}</p>
      </div>
    );
  }

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="space-y-4">
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface shadow-soft md:block">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-soft/80">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-start text-xs font-semibold uppercase tracking-wider text-ink-muted",
                    col.className
                  )}
                >
                  {t(col.labelKey)}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-end text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {t("actions")}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.map((row, ri) => (
              <tr key={rowKey(row, ri)} className="transition-colors hover:bg-surface-soft/50">
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3 text-ink", col.className)}>
                    {col.render
                      ? col.render(row)
                      : cellValue(row[col.key])}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-end">{actions(row)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {data.map((row, ri) => (
          <div key={rowKey(row, ri)} className="rounded-xl border border-line bg-surface p-4">
            {columns.map((col) => (
              <div key={col.key} className="flex min-w-0 items-start justify-between gap-3 py-1.5">
                <span className="shrink-0 text-xs font-medium text-ink-muted">{t(col.labelKey)}</span>
                <span className="min-w-0 break-words text-end text-sm text-ink">
                  {col.render
                    ? col.render(row)
                    : cellValue(row[col.key])}
                </span>
              </div>
            ))}
            {actions && (
              <div className="mt-3 flex justify-end border-t border-line pt-3">
                {actions(row)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3 shadow-soft">
          <p className="text-xs text-ink-muted">
            {t("showing", { from, to, total })}
          </p>
          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink-heading" aria-label={t("prev")}>
                {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Link>
            ) : (
              <span aria-disabled="true" aria-label={t("prev")} className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-lg border border-line text-ink-muted opacity-40">
                {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </span>
            )}
            <span aria-live="polite" className="whitespace-nowrap px-2 text-xs text-ink-muted">
              {t("pageInfo", { page, totalPages })}
            </span>
            {page < totalPages ? (
              <Link href={pageHref(page + 1)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink-heading" aria-label={t("next")}>
                {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Link>
            ) : (
              <span aria-disabled="true" aria-label={t("next")} className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-lg border border-line text-ink-muted opacity-40">
                {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
