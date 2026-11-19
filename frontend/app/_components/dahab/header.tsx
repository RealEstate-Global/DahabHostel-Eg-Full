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

const DESCRIPTIONS: Record<string, Record<string, string>> = {
  en: {
    ourTours: "Pyramids, Nile, Sinai & Desert Adventures",
    requestTourPrices: "Custom itineraries & group discounts",
    entranceFees: "Official ticket prices for Egypt monuments",
    onlineBooking: "Instant confirmation & flexible check-in",
    roomRates: "Private rooms & dorm bed price guide",
    servicesBrochure: "Rooftop terrace, breakfast & amenities",
    airportPickup: "24/7 hassle-free Cairo airport transfer",
    location: "Talaat Harb Square & Downtown Cairo map",
    photos: "Rooftop garden, rooms & hostel vibes",
    cityInfo: "Local food, metro stations & safety tips",
    newsBlog: "Travel guides, news & stories",
    aboutUs: "Cairo's downtown oasis since 1998",
    contactUs: "Direct WhatsApp, phone, email & address",
    writeReview: "Read feedback & share your experience",
  },
  ar: {
    ourTours: "أهرامات الجيزة، النيل، وسفاري الصحراء",
    requestTourPrices: "خطط رحلات خاصة وأسعار للمجموعات",
    entranceFees: "أسعار تذاكر المعالم السياحية والمتاحف",
    onlineBooking: "تأكيد فوري للحجز وإلغاء مرن",
    roomRates: "دليل أسعار الغرف الخاصة والأسرة المشتركة",
    servicesBrochure: "التراس، الإفطار وكافة مرافق الإقامة",
    airportPickup: "توصيل واستقبال من مطار القاهرة 24/7",
    location: "ميدان طلعت حرب وخريطة وسط البلد",
    photos: "صور تراس السطح، الغرف وأجواء الهوستل",
    cityInfo: "دليل المطاعم ومحطات المترو وأمان المدينة",
    newsBlog: "مقالات السفر، الأخبار وقصص المسافرين",
    aboutUs: "واحة المسافرين في قلب القاهرة منذ 1998",
    contactUs: "واتساب، هاتف، بريد إلكتروني وعنواننا",
    writeReview: "آراء النزلاء ومشاركة تجربتك معنا",
  },
  es: {
    ourTours: "Pirámides, Nilo, Sinaí y desiertos",
    requestTourPrices: "Itinerarios personalizados y ofertas",
    entranceFees: "Precios oficiales de monumentos en Egipto",
    onlineBooking: "Confirmación instantánea y cancelación flexible",
    roomRates: "Guía de precios de habitaciones y dormitorios",
    servicesBrochure: "Terraza, desayuno y comodidades",
    airportPickup: "Traslado al aeropuerto de El Cairo 24/7",
    location: "Plaza Talaat Harb y centro de El Cairo",
    photos: "Terraza en la azotea, habitaciones y fotos",
    cityInfo: "Comida local, estaciones de metro y consejos",
    newsBlog: "Guías de viaje, noticias e historias",
    aboutUs: "Oasis en el centro de El Cairo desde 1998",
    contactUs: "WhatsApp, teléfono, correo y ubicación",
    writeReview: "Lee opiniones y comparte tu experiencia",
  },
  fr: {
    ourTours: "Pyramides, Nil, Sinaï et aventures désertiques",
    requestTourPrices: "Itinéraires sur mesure et tarifs groupes",
    entranceFees: "Prix officiels des billets des monuments",
    onlineBooking: "Confirmation immédiate et conditions souples",
    roomRates: "Guide des tarifs des chambres et dortoirs",
    servicesBrochure: "Terrasse sur le toit, petit-déjeuner et services",
    airportPickup: "Transfert aéroport du Caire 24h/24 et 7j/7",
    location: "Place Talaat Harb et centre-ville du Caire",
    photos: "Terrasse, chambres et ambiance de l'auberge",
    cityInfo: "Gastronomie locale, métro et conseils pratiques",
    newsBlog: "Guides de voyage, actualités et récits",
    aboutUs: "Oasis au centre du Caire depuis 1998",
    contactUs: "WhatsApp, téléphone, e-mail et adresse",
    writeReview: "Avis des voyageurs et partage d'expérience",
  },
};

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

  const getDesc = (key: string) => {
    const lang = DESCRIPTIONS[locale] || DESCRIPTIONS.en;
    return lang[key] || DESCRIPTIONS.en[key] || "";
  };

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
          desc: getDesc("ourTours"),
          icon: Compass,
        },
        {
          title: tFooter("requestTourPrices"),
          href: "/tours-prices",
          desc: getDesc("requestTourPrices"),
          icon: Receipt,
        },
        {
          title: tFooter("entranceFees"),
          href: "/entrance-fees",
          desc: getDesc("entranceFees"),
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
          desc: getDesc("onlineBooking"),
          icon: CalendarCheck,
          featured: true,
        },
        {
          title: tFooter("roomRates"),
          href: "/prices",
          desc: getDesc("roomRates"),
          icon: BedDouble,
        },
        {
          title: tNav("servicesBrochure"),
          href: "/services-brochure",
          desc: getDesc("servicesBrochure"),
          icon: FileText,
        },
        {
          title: tFooter("airportPickup"),
          href: "/airport-pickup-service",
          desc: getDesc("airportPickup"),
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
          desc: getDesc("location"),
          icon: MapPin,
        },
        {
          title: tNav("photos"),
          href: "/photos",
          desc: getDesc("photos"),
          icon: Camera,
        },
        {
          title: tNav("cityInfo"),
          href: "/city-info",
          desc: getDesc("cityInfo"),
          icon: Landmark,
        },
        {
          title: tFooter("newsBlog"),
          href: "/blog",
          desc: getDesc("newsBlog"),
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
          desc: getDesc("aboutUs"),
          icon: Users,
        },
        {
          title: tNav("contactUs"),
          href: "/contact-us",
          desc: getDesc("contactUs"),
          icon: Mail,
        },
        {
          title: tFooter("writeReview"),
          href: "/write-a-review",
          desc: getDesc("writeReview"),
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
          ? "border-b border-line bg-white/95 dark:bg-[#0c161a]/95 shadow-md backdrop-blur-md"
          : "border-b border-line/80 bg-white dark:bg-[#0c161a] shadow-xs"
      }`}
    >
      <div className="container-page flex h-[74px] items-center justify-between gap-4">
        {/* LOGO */}
        <Link
          href={href("/")}
          className="group relative flex shrink-0 items-center rounded-2xl bg-white px-3 py-1.5 shadow-xs ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 dark:bg-white/95"
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
                      ? "bg-brand-soft text-brand shadow-xs"
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

                {/* DROPDOWN MENU POPOVER - SOLID OPAQUE BACKGROUND WITH CLEAN SHADOW */}
                {isOpen && (
                  <div
                    className="absolute left-1/2 top-full z-50 mt-2 w-[340px] -translate-x-1/2 rounded-2xl border border-line bg-white p-2 shadow-2xl ring-1 ring-black/10 dark:border-line-strong dark:bg-[#121f24] dark:ring-white/10 animate-in fade-in-0 zoom-in-95 duration-150"
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
                            className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-150 ${
                              isSubActive
                                ? "bg-brand-soft text-brand"
                                : "hover:bg-brand-soft/50 dark:hover:bg-brand-soft/20 text-ink"
                            }`}
                          >
                            <div
                              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl shadow-xs transition-colors duration-150 ${
                                isSubActive
                                  ? "bg-brand text-white"
                                  : "bg-surface-soft text-brand group-hover:bg-brand group-hover:text-white dark:bg-surface-soft dark:text-brand"
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
            className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-white text-ink shadow-xs transition-colors hover:bg-surface-soft dark:bg-[#121f24] lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU ACCORDION DRAWER - 100% OPAQUE */}
      {mobileOpen && (
        <div className="border-t border-line bg-white shadow-2xl dark:bg-[#0c161a] lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="container-page divide-y divide-line/60 py-4" aria-label="Mobile navigation">
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
                            <div className="flex-1 min-w-0">
                              <span className="block font-semibold text-ink-heading">{subItem.title}</span>
                              <span className="block truncate text-[11px] text-ink-muted">{subItem.desc}</span>
                            </div>
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
