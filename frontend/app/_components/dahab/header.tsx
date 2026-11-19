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
} from "lucide-react";
import { images } from "@/app/_data";
import { ThemeToggle } from "./theme-toggle";
import { LangSwitcher } from "./lang-switcher";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const href = (p: string) => `/${locale}${p}`;

  const navGroups = [
    {
      id: "tours",
      title: tNav("ourTours"),
      items: [
        {
          title: tNav("ourTours"),
          href: "/our-tours",
          icon: Compass,
          desc: tNav("descriptions.ourTours"),
        },
        {
          title: tNav("requestTourPrices"),
          href: "/tours-prices",
          icon: Receipt,
          desc: tNav("descriptions.requestTourPrices"),
        },
        {
          title: tNav("entranceFees"),
          href: "/entrance-fees",
          icon: Ticket,
          desc: tNav("descriptions.entranceFees"),
        },
      ],
    },
    {
      id: "pricing",
      title: tNav("pricingBooking"),
      items: [
        {
          title: tNav("onlineBooking"),
          href: "/book-now",
          icon: CalendarCheck,
          desc: tNav("descriptions.onlineBooking"),
        },
        {
          title: tNav("roomRates"),
          href: "/prices",
          icon: BedDouble,
          desc: tNav("descriptions.roomRates"),
        },
        {
          title: tNav("servicesBrochure"),
          href: "/services-brochure",
          icon: FileText,
          desc: tNav("descriptions.servicesBrochure"),
        },
        {
          title: tNav("airportPickup"),
          href: "/airport-pickup-service",
          icon: Car,
          desc: tNav("descriptions.airportPickup"),
        },
      ],
    },
    {
      id: "city",
      title: tNav("cityGuide"),
      items: [
        {
          title: tNav("location"),
          href: "/location",
          icon: MapPin,
          desc: tNav("descriptions.location"),
        },
        {
          title: tNav("photos"),
          href: "/photos",
          icon: Camera,
          desc: tNav("descriptions.photos"),
        },
        {
          title: tNav("cityInfo"),
          href: "/city-info",
          icon: Landmark,
          desc: tNav("descriptions.cityInfo"),
        },
        {
          title: tNav("newsBlog"),
          href: "/blog",
          icon: Newspaper,
          desc: tNav("descriptions.newsBlog"),
        },
      ],
    },
    {
      id: "about",
      title: tNav("aboutUs"),
      items: [
        {
          title: tNav("aboutUs"),
          href: "/about-us",
          icon: Users,
          desc: tNav("descriptions.aboutUs"),
        },
        {
          title: tNav("contactUs"),
          href: "/contact-us",
          icon: Mail,
          desc: tNav("descriptions.contactUs"),
        },
        {
          title: tNav("writeReview"),
          href: "/write-a-review",
          icon: Star,
          desc: tNav("descriptions.writeReview"),
        },
        {
          title: tNav("adminDashboard"),
          href: "/admin/overview",
          icon: Landmark,
          desc: tNav("descriptions.adminDashboard"),
        },
      ],
    },
  ];

  // Track scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-nav-dropdown]")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMouseEnter = (groupId: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(groupId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Mobile drawer content
  const MobileDrawer = () => {
    return (
      <div className="border-t border-line bg-surface shadow-2xl lg:hidden animate-in slide-in-from-top-2 duration-200">
        <nav className="container-page divide-y divide-line/60 py-4" aria-label={tNav("mobileNavigation")}>
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
                    size={15}
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand" : "text-ink-subtle"}`}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-2 space-y-1 pl-2">
                    {group.items.map((subItem) => {
                      const Icon = subItem.icon;
                      const isSubActive = pathname === href(subItem.href);

                      return (
                        <Link
                          key={subItem.href}
                          href={href(subItem.href)}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 rounded-xl p-2.5 text-sm transition-all ${isSubActive ? "bg-brand-soft font-semibold text-brand" : "text-ink hover:bg-surface-soft"}`}
                        >
                          <div
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${isSubActive ? "bg-brand text-primary-foreground" : "bg-surface-soft text-brand"}`}
                          >
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold leading-tight text-ink-heading">{subItem.title}</p>
                            <p className="truncate text-xs text-ink-muted">{subItem.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-line bg-surface/95 shadow-md backdrop-blur-md" : "border-b border-line/80 bg-surface shadow-xs"}`}
      >
        <div className="container-page flex h-[74px] items-center justify-between gap-4">
          {/* LOGO */}
          <Link
            href={href("/")}
            className="group relative flex shrink-0 items-center rounded-2xl bg-surface px-3 py-1.5 shadow-xs ring-subtle transition-transform duration-300 hover:scale-105"
            aria-label={tNav("headerHome")}
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
            aria-label={tNav("mainNavigation")}
            data-nav-dropdown
          >
            {navGroups.map((group) => {
              const isOpen = activeDropdown === group.id;
              const isGroupActive = group.items.some((item) => pathname === href(item.href));

              return (
                <div key={group.id} className="relative" onMouseEnter={() => handleMouseEnter(group.id)} onMouseLeave={handleMouseLeave}>
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                    aria-expanded={isOpen}
                    className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-200 ${isGroupActive || isOpen ? "bg-brand-soft text-brand shadow-xs" : "text-ink-muted hover:bg-surface-soft hover:text-ink-heading"}`}
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-brand" : "text-ink-subtle group-hover:text-ink-heading"}`}
                    />
                  </button>

                  {/* DROPDOWN MENU POPOVER - SEMANTIC ELEVATED SURFACE */}
                  {isOpen && (
                    <div
                      className="absolute left-1/2 top-full z-50 mt-2 w-[340px] -translate-x-1/2 rounded-2xl border border-line bg-surface-raised p-2 shadow-2xl ring-subtle animate-in fade-in-0 zoom-in-95 duration-150"
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
                              className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-150 ${isSubActive ? "bg-brand-soft text-brand" : "hover:bg-brand-soft/50 text-ink"}`}
                            >
                              <div
                                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl shadow-xs transition-colors duration-150 ${isSubActive ? "bg-brand text-primary-foreground" : "bg-surface-soft text-brand group-hover:bg-brand group-hover:text-primary-foreground"}`}
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
              className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-surface text-ink shadow-xs transition-colors hover:bg-surface-soft lg:hidden"
              aria-label={tNav("toggleNavigationMenu")}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU ACCORDION DRAWER */}
      {mobileOpen && <MobileDrawer />}

    </>
  );
}
