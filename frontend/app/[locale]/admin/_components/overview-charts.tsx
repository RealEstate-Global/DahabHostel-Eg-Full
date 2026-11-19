"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useTranslations } from "next-intl";

const COLORS = [
  "hsl(190, 36%, 49%)",
  "hsl(152, 69%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
];

interface BarChartData {
  date: string;
  count: number;
}

interface PieData {
  name: string;
  value: number;
}

export function RequestsBarChart({ data }: { data: BarChartData[] }) {
  const t = useTranslations("admin.overview");

  if (data.length === 0 || data.every((d) => d.count === 0)) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-muted">
        {t("noActivity")}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--line))" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "hsl(var(--ink-muted))" }}
          tickFormatter={(v: string) => v.slice(5)} // MM-DD
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "hsl(var(--ink-muted))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--surface))",
            border: "1px solid hsl(var(--line))",
            borderRadius: 8,
            fontSize: 12,
            color: "hsl(var(--ink))",
          }}
          itemStyle={{
            color: "hsl(var(--ink-heading))",
          }}
        />
        <Bar
          dataKey="count"
          fill="hsl(var(--brand))"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RequestsPieChart({ data, locale }: { data: PieData[]; locale: string }) {
  const t = useTranslations("admin.overview");
  const tTable = useTranslations("admin.table");

  if (data.every((d) => d.value === 0)) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-muted">
        {t("noActivity")}
      </div>
    );
  }

  const labels: Record<string, string> = {
    bookings: t("bookingRequests"),
    tourRequests: t("tourRequests"),
    airportPickups: t("airportPickups"),
    contactMessages: t("contactMessages"),
  };

  const labeled = data.map((d) => ({ ...d, label: labels[d.name] ?? d.name }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={labeled}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={50}
          paddingAngle={2}
          label={({ label, value }) => `${label}: ${value}`}
          labelLine={false}
        >
          {labeled.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--surface))",
            border: "1px solid hsl(var(--line))",
            borderRadius: 8,
            fontSize: 12,
            color: "hsl(var(--ink))",
          }}
          itemStyle={{
            color: "hsl(var(--ink-heading))",
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
