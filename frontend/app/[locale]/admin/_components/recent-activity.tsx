"use client";

import { useTranslations } from "next-intl";
import type { Locale } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { enUS, ar, fr, es } from "date-fns/locale";
import {
  CalendarCheck,
  MapPin,
  Plane,
  Mail,
  Star,
} from "lucide-react";
import type { RecentActivity as RecentActivityType } from "@/utils/supabase/admin-queries";

const localeMap: Record<string, Locale> = { en: enUS, ar, fr, es };

const typeIcons = {
  booking: CalendarCheck,
  tour_request: MapPin,
  pickup: Plane,
  contact: Mail,
  review: Star,
};

const typeColors = {
  booking: "text-brand bg-brand/10",
  tour_request: "text-success bg-success/10",
  pickup: "text-star bg-star/10",
  contact: "text-ink-muted bg-surface-soft",
  review: "text-star bg-star/10",
};

interface Props {
  items: RecentActivityType[];
  locale: string;
}

export function RecentActivityList({ items, locale }: Props) {
  const t = useTranslations("admin.overview");
  const dateLocale = localeMap[locale] ?? enUS;

  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-ink-muted">{t("noActivity")}</p>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const Icon = typeIcons[item.type];
        const color = typeColors[item.type];
        return (
          <div
            key={`${item.type}-${item.createdAt}-${i}`}
            className="flex items-center gap-3 rounded-xl border border-line/60 bg-surface p-3 transition-colors hover:bg-surface-soft hover:border-brand/30"
          >
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-heading">
                {item.name}
              </p>
              <p className="truncate text-xs text-ink-muted">
                {item.email}
                {item.detail ? ` · ${item.detail}` : ""}
              </p>
            </div>
            <span className="flex-shrink-0 text-xs text-ink-subtle">
              {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
                locale: dateLocale,
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
}
