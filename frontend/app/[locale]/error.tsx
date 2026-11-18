"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RefreshCw, Home, LifeBuoy } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useLocale();
  const t = useTranslations("common.error");
  useEffect(() => { console.error("Error boundary caught:", error); }, [error]);
  const href = (p: string) => `/${locale}${p}`;

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-background px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card-modern max-w-lg p-10 text-center shadow-card">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-soft text-brand">
          <LifeBuoy size={28} />
        </div>
        <p className="eyebrow mt-7">{t("eyebrow")}</p>
        <h1 className="heading-display mt-3">{t("title")}</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t("description")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary"><RefreshCw size={16} /> {t("retry")}</button>
          <Link href={href("/")} className="btn-outline"><Home size={16} /> {t("goHome")}</Link>
        </div>
        <Link href={href("/contact-us")} className="link-brand mt-6 inline-block text-sm">{t("contact")}</Link>
      </motion.div>
    </div>
  );
}
