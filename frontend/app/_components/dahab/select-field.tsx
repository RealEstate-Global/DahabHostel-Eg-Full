"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useTranslations } from "next-intl";

export type SelectOption = { value: string; label: string };

export function SelectField({
  label,
  placeholder,
  value,
  onChange,
  options,
  required = false,
}: {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
}) {
  const t = useTranslations("common.accessibility");
  return (
    <div>
      {label && (
        <label className="label-modern">
          {label} {required && <span className="text-brand">*</span>}
        </label>
      )}
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger
          className="group flex h-12 w-full items-center justify-between rounded-xl border border-line-strong bg-surface px-4 text-sm text-ink shadow-soft transition-all duration-300 hover:border-brand/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 data-[placeholder]:text-ink-subtle [&>span]:line-clamp-1 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-ink-subtle [&>svg]:transition-transform [&>svg]:duration-300 group-data-[state=open]:[&>svg]:rotate-180 group-data-[state=open]:[&>svg]:text-brand"
          aria-label={label}
        >
          <SelectValue placeholder={placeholder ?? t("selectOption")} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={6}
          className="z-[60] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-lift animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="relative flex cursor-pointer select-none items-center rounded-xl py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition-colors duration-200 focus:bg-brand-soft focus:text-brand data-[state=checked]:bg-brand-soft data-[state=checked]:font-semibold data-[state=checked]:text-brand"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
