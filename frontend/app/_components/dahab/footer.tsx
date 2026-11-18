import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { footerNav, site, socialLinks, images } from "@/app/_data";
import { Facebook, Instagram, Youtube, Star, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const icons: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tripadvisor: Star,
};

const columns = [
  { id: "ourInfo", links: footerNav.ourInfo },
  { id: "ourServices", links: footerNav.ourServices },
  { id: "followUs", links: footerNav.followUs },
];

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const href = (p: string) => `/${locale}${p}`;

  return (
    <footer className="relative overflow-hidden bg-[#0d1b1e] text-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />

      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="inline-flex rounded-2xl bg-white/95 p-4 shadow-lg">
              <Image src={images.logo} alt="Dahab Hostel" width={150} height={90} className="h-auto w-[130px]" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {t("description")}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((s) => {
                const Icon = icons[s.icon] || Star;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.id}>
                <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                  {t(`columns.${col.id}`)}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={href(l.href)} className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white">
                        {t(`links.${l.id}`)}
                        <ArrowUpRight size={13} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="my-12 h-px bg-white/10" />

        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">{t("getInTouch")}</p>
            <p className="mt-4 text-lg font-medium">{site.address}</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 hover:text-white"><Phone size={15} className="text-brand-light" /> {site.phone}</a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail size={15} className="text-brand-light" /> {site.email}</a>
              <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-brand-light" /> {t("talaatHarb")}</span>
            </div>
          </div>
          <Link href={href("/book-now")} className="btn-primary justify-self-start md:justify-self-end">
            {t("bookYourRoom")} <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Dahab Hostel Cairo. {t("rights")}</p>
          <div className="flex gap-5">
            <Link className="hover:text-white" href={href("/privacy")}>{t("privacy")}</Link>
            <Link className="hover:text-white" href={href("/terms")}>{t("terms")}</Link>
            <Link className="hover:text-white" href={href("/cookies")}>{t("cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
