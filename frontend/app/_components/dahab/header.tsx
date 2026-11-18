"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Compass,
  Receipt,
  Ticket,
  CalendarCheck,
  BedDouble,
  FileText,
  Car,
  MapPin,
  Camera,
  Landmark,
  Newspaper,
  Users,
  Mail,
  Star,
  Sparkles,
} from "lucide-react";
import { images } from "@/app/_data";
import { ThemeToggle } from "./theme-toggle";
import { LangSwitcher } from "./lang-switcher";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const locale = useLocale();
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer.links");
  const href = (path: string) => `/${locale}${path}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Handle outside click to close desktop dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-dropdown]")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const navGroups = [
    {
      id: "tours",
      title: tNav("ourTours"),
      href: "/our-tours",
      items: [
        {
          title: tNav("ourTours"),
          href: "/our-tours",
          desc: "Pyramids, Nile, Sinai & Desert Adventures",
          icon: Compass,
        },
        {
          title: tFooter("requestTourPrices"),
          href: "/tours-prices",
          desc: "Custom itineraries & group discounts",
          icon: Receipt,
        },
        {
          title: tFooter("entranceFees"),
          href: "/entrance-fees",
          desc: "Official ticket prices for Egypt monuments",
          icon: Ticket,
        },
      ],
    },
    {
      id: "stay",
      title: tNav("ratesBooking"),
      href: "/book-now",
      items: [
        {
          title: tFooter("onlineBooking"),
          href: "/book-now",
          desc: "Instant confirmation & flexible check-in",
          icon: CalendarCheck,
          featured: true,
        },
        {
          title: tFooter("roomRates"),
          href: "/prices",
          desc: "Private rooms & dorm bed price guide",
          icon: BedDouble,
        },
        {
          title: tNav("servicesBrochure"),
          href: "/services-brochure",
          desc: "Rooftop terrace, breakfast & amenities",
          icon: FileText,
        },
        {
          title: tFooter("airportPickup"),
          href: "/airport-pickup-service",
          desc: "24/7 hassle-free Cairo airport transfer",
          icon: Car,
        },
      ],
    },
    {
      id: "explore",
      title: tNav("cityInfo"),
      href: "/city-info",
      items: [
        {
          title: tNav("location"),
          href: "/location",
          desc: "Talaat Harb Square & Downtown Cairo map",
          icon: MapPin,
        },
        {
          title: tNav("photos"),
          href: "/photos",
          desc: "Rooftop garden, rooms & hostel vibes",
          icon: Camera,
        },
        {
          title: tNav("cityInfo"),
          href: "/city-info",
          desc: "Local food, metro stations & safety tips",
          icon: Landmark,
        },
        {
          title: tFooter("newsBlog"),
          href: "/blog",
          desc: "Travel guides, news & stories",
          icon: Newspaper,
        },
      ],
    },
    {
      id: "about",
      title: tNav("aboutUs"),
      href: "/about-us",
      items: [
        {
          title: tNav("aboutUs"),
          href: "/about-us",
          desc: "Cairo's downtown oasis since 1998",
          icon: Users,
        },
        {
          title: tNav("contactUs"),
          href: "/contact-us",
          desc: "Direct WhatsApp, phone, email & address",
          icon: Mail,
        },
        {
          title: tFooter("writeReview"),
          href: "/write-a-review",
          desc: "Read feedback & share your experience",
          icon: Star,
        },
      ],
    },
  ];

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-surface/90 shadow-soft backdrop-blur-2xl"
          : "border-b border-line/40 bg-surface/95 backdrop-blur-lg"
      }`}
    >
      <div className="container-page flex h-[74px] items-center justify-between gap-4">
        {/* LOGO */}
        <Link
          href={href("/")}
          className="group relative flex shrink-0 items-center rounded-2xl bg-white/95 px-3 py-1.5 shadow-xs ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 dark:bg-white/90"
          aria-label="Dahab Hostel home"
        >
          <Image
            src={images.logo}
            alt="Dahab Hostel"
            width={124}
            height={72}
            priority
            className="h-auto w-[88px] sm:w-[110px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION WITH DROPDOWNS */}
        <nav
          className="hidden items-center gap-1.5 lg:flex"
          aria-label="Main navigation"
          data-nav-dropdown
        >
          {navGroups.map((group) => {
            const isOpen = activeDropdown === group.id;
            const isGroupActive = group.items.some((item) => pathname === href(item.href));

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(group.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                  aria-expanded={isOpen}
                  className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-200 ${
                    isGroupActive || isOpen
                      ? "bg-brand-soft/90 text-brand shadow-xs"
                      : "text-ink-muted hover:bg-surface-soft hover:text-ink-heading"
                  }`}
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand" : "text-ink-subtle group-hover:text-ink-heading"
                    }`}
                  />
                </button>

                {/* DROPDOWN MENU POPOVER */}
                {isOpen && (
                  <div
                    className="absolute left-1/2 top-full z-50 mt-2 w-[340px] -translate-x-1/2 rounded-3xl border border-line/70 bg-surface/98 p-2.5 shadow-card backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 animate-in fade-in-0 zoom-in-95 duration-150"
                  >
                    <div className="grid gap-1">
                      {group.items.map((subItem) => {
                        const Icon = subItem.icon;
                        const isSubActive = pathname === href(subItem.href);

                        return (
                          <Link
                            key={subItem.href}
                            href={href(subItem.href)}
                            onClick={() => setActiveDropdown(null)}
                            className={`group flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-150 ${
                              isSubActive
                                ? "bg-brand-soft/80 text-brand"
                                : "hover:bg-surface-soft text-ink"
                            }`}
                          >
                            <div
                              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl shadow-xs transition-colors duration-150 ${
                                isSubActive
                                  ? "bg-brand text-white"
                                  : "bg-surface-soft text-brand group-hover:bg-brand/10"
                              }`}
                            >
                              <Icon size={17} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-semibold leading-tight text-ink-heading group-hover:text-brand transition-colors">
                                {subItem.title}
                              </p>
                              <p className="mt-0.5 truncate text-[11px] text-ink-muted">
                                {subItem.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* HEADER ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <LangSwitcher label={tNav("language")} />
          <ThemeToggle />

          <Link
            href={href("/book-now")}
            className="btn-primary hidden !px-5 !py-2.5 text-xs font-semibold shadow-soft hover:shadow-card transition-all sm:inline-flex"
          >
            <span>{tNav("bookNow")}</span>
            <ArrowUpRight size={15} />
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-surface text-ink transition-colors hover:bg-surface-soft lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU ACCORDION DRAWER */}
      {mobileOpen && (
        <div className="border-t border-line/70 bg-surface/98 backdrop-blur-2xl shadow-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="container-page divide-y divide-line/40 py-4" aria-label="Mobile navigation">
            {navGroups.map((group) => {
              const isExpanded = mobileExpanded === group.id;

              return (
                <div key={group.id} className="py-2.5">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(isExpanded ? null : group.id)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-ink-heading hover:bg-surface-soft"
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      size={16}
                      className={`text-ink-muted transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-1 grid gap-1 pl-3 pr-1 pt-1 animate-in fade-in-0 duration-150">
                      {group.items.map((subItem) => {
                        const Icon = subItem.icon;
                        const isSubActive = pathname === href(subItem.href);

                        return (
                          <Link
                            key={subItem.href}
                            href={href(subItem.href)}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
                              isSubActive
                                ? "bg-brand-soft text-brand font-semibold"
                                : "text-ink hover:bg-surface-soft"
                            }`}
                          >
                            <div className="grid h-7 w-7 place-items-center rounded-lg bg-surface-soft text-brand">
                              <Icon size={15} />
                            </div>
                            <span>{subItem.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* MOBILE QUICK CTA & LANGUAGE */}
            <div className="space-y-4 pt-4">
              <Link
                href={href("/book-now")}
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center !py-3 text-sm font-semibold shadow-soft"
              >
                <span>{tNav("bookNow")}</span>
                <ArrowUpRight size={17} />
              </Link>

              <div>
                <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                  {tNav("language")}
                </p>
                <LangSwitcher variant="chips" label={tNav("language")} onPick={() => setMobileOpen(false)} />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
