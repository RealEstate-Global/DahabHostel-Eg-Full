"use client";

import { useLocale } from "next-intl";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useRouter, usePathname } from "@/app/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

const LOCALES = [
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
] as const;

type Props = {
  /** `inline` renders a compact dropdown pill (desktop header);
   *  `chips` renders a four-up button row (mobile menu). */
  variant?: "inline" | "chips";
  /** Called after a locale is picked (e.g. to close the mobile menu). */
  onPick?: () => void;
  /** Accessible label, e.g. from the `nav` namespace. */
  label?: string;
};

export function LangSwitcher({ variant = "inline", onPick, label }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const select = (code: (typeof LOCALES)[number]["code"]) => {
    onPick?.();
    if (code !== locale) {
      // Same page, different locale prefix — the middleware persists the
      // choice in the NEXT_LOCALE cookie.
      router.replace(pathname, { locale: code });
    }
  };

  if (variant === "chips") {
    return (
      <div role="group" aria-label={label ?? "Language"} className="grid grid-cols-4 gap-2">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => select(l.code)}
            aria-pressed={l.code === locale}
            className={`rounded-xl border px-2 py-2.5 text-center transition-all duration-200 ${
              l.code === locale
                ? "border-brand bg-brand-soft text-brand shadow-soft"
                : "border-line bg-surface text-ink-muted hover:border-brand/40 hover:text-ink-heading"
            }`}
          >
            <span className="block text-[13px] font-bold">{l.short}</span>
            <span className="mt-0.5 block truncate text-[10px] font-medium opacity-75">
              {l.label}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={label ? `${label}: ${current.label}` : `Language: ${current.label}`}
          className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-[13px] font-semibold text-ink-muted transition-colors duration-300 hover:border-brand/40 hover:text-ink-heading"
        >
          <Globe size={16} className="text-brand" />
          <span className="tracking-wide">{current.short}</span>
          <ChevronDown size={14} className="opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[168px] rounded-xl border-line bg-surface p-1.5 shadow-soft"
      >
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => select(l.code)}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted focus:bg-brand-soft focus:text-brand"
          >
            <span className="w-7 text-xs font-bold tracking-wider">{l.short}</span>
            <span>{l.label}</span>
            {l.code === locale && <Check size={15} className="ml-auto text-brand" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
