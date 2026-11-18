"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { images, mainNav } from "@/app/_data";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const href = (path: string) => `/${locale}${path}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line/70 bg-surface/85 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-surface"
      }`}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-4">
        <Link href={href("/")} className="group relative flex shrink-0 items-center rounded-2xl bg-white/95 px-3 py-1.5 shadow-soft transition-transform duration-300 hover:scale-105" aria-label="Dahab Hostel home">
          <Image
            src={images.logo}
            alt="Dahab Hostel"
            width={132}
            height={78}
            priority
            className="h-auto w-[92px] sm:w-[118px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNav.map((item) => {
            const active = pathname === href(item.href);
            return (
              <Link
                key={item.href}
                href={href(item.href)}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 ${
                  active ? "bg-brand-soft text-brand" : "text-ink-muted hover:bg-surface-soft hover:text-ink-heading"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href={href("/book-now")} className="btn-primary hidden !px-5 !py-2.5 text-xs sm:inline-flex">
            Book now <ArrowUpRight size={15} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-surface transition-all duration-500 lg:hidden ${
          open ? "max-h-[620px] opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="container-page grid gap-1 pb-6 pt-4" aria-label="Mobile navigation">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={href(item.href)}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                pathname === href(item.href) ? "bg-brand-soft text-brand" : "text-ink hover:bg-surface-soft"
              }`}
            >
              {item.title}
            </Link>
          ))}
          <Link href={href("/book-now")} onClick={() => setOpen(false)} className="btn-primary mt-2">
            Book now <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
