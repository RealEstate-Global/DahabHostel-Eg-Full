import { cn } from "@/app/_lib/utils";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "brand" | "success" | "warning" | "destructive";
  href?: string;
}

const variantStyles = {
  default: "bg-surface-soft text-ink-muted",
  brand: "bg-brand/10 text-brand",
  success: "bg-success/10 text-success",
  warning: "bg-star/10 text-star",
  destructive: "bg-destructive/10 text-destructive",
};

export function KpiCard({ label, value, subtitle, icon: Icon, variant = "default" }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-brand/40">
      <div className="flex items-start gap-4">
        <div className={cn("flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl", variantStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-ink-muted">{label}</p>
          <p className="mt-1 text-2xl font-bold text-ink-heading">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
        </div>
      </div>
    </article>
  );
}
