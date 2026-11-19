"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
  actions?: (row: T) => React.ReactNode;
}

export function AdminDataTable<T extends Record<string, unknown>>({
  columns,
  data,
  total,
  page,
  pageSize,
  totalPages,
  emptyMessage,
  locale,
  basePath,
  actions,
}: AdminDataTableProps<T>) {
  const t = useTranslations("admin.table");
  const isRTL = locale === "ar";

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
        <table className="w-full text-sm">
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
              <tr key={ri} className="transition-colors hover:bg-surface-soft/50">
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3 text-ink", col.className)}>
                    {col.render
                      ? col.render(row)
                      : (row[col.key] as React.ReactNode) ?? "—"}
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

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {data.map((row, ri) => (
          <div key={ri} className="rounded-xl border border-line bg-surface p-4">
            {columns.map((col) => (
              <div key={col.key} className="flex items-start justify-between py-1.5">
                <span className="text-xs font-medium text-ink-muted">{t(col.labelKey)}</span>
                <span className="text-end text-sm text-ink">
                  {col.render
                    ? col.render(row)
                    : (row[col.key] as React.ReactNode) ?? "—"}
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
            <a
              href={page > 1 ? `${basePath}?page=${page - 1}` : undefined}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors",
                page > 1
                  ? "hover:bg-surface-soft hover:text-ink-heading"
                  : "cursor-not-allowed opacity-40"
              )}
              aria-label={t("prev")}
            >
              {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </a>
            <span className="px-2 text-xs text-ink-muted">
              {page} / {totalPages}
            </span>
            <a
              href={page < totalPages ? `${basePath}?page=${page + 1}` : undefined}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors",
                page < totalPages
                  ? "hover:bg-surface-soft hover:text-ink-heading"
                  : "cursor-not-allowed opacity-40"
              )}
              aria-label={t("next")}
            >
              {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
