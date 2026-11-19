"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("common.theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t("light") : t("dark")}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
    >
      {mounted ? (
        isDark ? <Sun size={17} /> : <Moon size={17} />
      ) : (
        <span className="h-4 w-4 rounded-full border-2 border-line-strong" />
      )}
    </button>
  );
}
