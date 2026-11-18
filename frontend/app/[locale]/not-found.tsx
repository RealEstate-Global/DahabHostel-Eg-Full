"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations("common.notFound");
  const tNav = useTranslations("nav");
  const href = (p: string) => `/${locale}${p}`;
  const links = [
    { title: tNav("ourTours"), href: "/our-tours", icon: Compass },
    { title: tNav("location"), href: "/location", icon: MapPin },
    { title: tNav("photos"), href: "/photos", icon: MapPin },
  ];

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-background px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-soft text-brand">
          <MapPin size={34} />
        </div>
        <p className="mt-8 font-display text-7xl font-bold tracking-tight text-brand/25">404</p>
        <h1 className="heading-display mt-2">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">{t("description")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={href("/")} className="btn-primary"><ArrowLeft size={16} /> {t("backHome")}</Link>
          <Link href={href("/contact-us")} className="btn-outline">{t("contactUs")}</Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map(({ title, href: to, icon: Icon }) => (
            <Link key={title} href={href(to)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink-muted transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand">
              <Icon size={14} /> {title}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
