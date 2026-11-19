"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Compass, LifeBuoy, MapPin, RefreshCw } from "lucide-react";

type RecoveryLink = { label: string; href: string; icon?: "compass" | "map" };

export function RecoveryScreen({
  variant,
  eyebrow,
  title,
  description,
  primaryLabel,
  homeHref,
  retry,
  secondaryLabel,
  secondaryHref,
  links = [],
  linksLabel = "Helpful pages",
  dir,
}: {
  variant: "error" | "notFound";
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  homeHref?: string;
  retry?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
  links?: RecoveryLink[];
  linksLabel?: string;
  dir?: "ltr" | "rtl";
}) {
  const reduceMotion = useReducedMotion();
  const Icon = variant === "error" ? LifeBuoy : MapPin;
  const animation = reduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <main className="relative isolate flex min-h-[75vh] items-center justify-center overflow-hidden bg-background px-5 py-16 sm:px-8" dir={dir} aria-labelledby="recovery-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-star/5 blur-3xl" />
      </div>

      <motion.section {...animation} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-line/80 bg-surface/90 px-6 py-10 text-center shadow-card backdrop-blur-sm sm:px-12 sm:py-14">
        <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
        <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-[1.6rem] border border-brand/10 bg-brand-soft text-brand shadow-soft">
          {!reduceMotion && <motion.span className="absolute inset-0 rounded-[1.6rem] border border-brand/20" animate={{ scale: [1, 1.24], opacity: [0.6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }} />}
          <Icon aria-hidden="true" size={32} strokeWidth={1.7} />
        </div>

        {variant === "notFound" && (
          <p aria-label="404" className="mt-6 select-none font-display text-8xl font-bold leading-none tracking-[-0.08em] text-brand/20 sm:text-9xl">404</p>
        )}
        {eyebrow && <p className="eyebrow mt-7">{eyebrow}</p>}
        <h1 id="recovery-title" className="heading-display mt-4 text-balance">{title}</h1>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-7 text-ink-muted sm:text-base">{description}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {retry ? (
            <button type="button" onClick={retry} className="btn-primary min-h-11">
              <RefreshCw aria-hidden="true" size={16} /> {primaryLabel}
            </button>
          ) : homeHref ? (
            <Link href={homeHref} className="btn-primary min-h-11">
              <ArrowLeft aria-hidden="true" size={16} /> {primaryLabel}
            </Link>
          ) : null}
          {secondaryLabel && secondaryHref && <Link href={secondaryHref} className="btn-outline min-h-11">{secondaryLabel}</Link>}
        </div>

        {links.length > 0 && (
          <nav aria-label={linksLabel} className="mt-10 flex flex-wrap justify-center gap-2.5">
            {links.map((link) => {
              const LinkIcon = link.icon === "compass" ? Compass : MapPin;
              return (
                <Link key={link.href} href={link.href} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-background/70 px-4 py-2 text-xs font-semibold text-ink-muted transition-colors hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                  {link.icon && <LinkIcon aria-hidden="true" size={14} />}{link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </motion.section>
    </main>
  );
}
