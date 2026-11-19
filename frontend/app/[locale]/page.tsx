import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink, SectionTitle } from "@/app/_components/dahab";
import { generateSEO, generateBreadcrumbSchema } from "@/app/_lib/seo";
import { JsonLd } from "@/app/_components/shared";
import { site, images, tours, gallery } from "@/app/_data";
import { Compass, ShieldCheck, Clock, MapPin, Sparkles, ArrowUpRight, Quote, Star } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({
    title: "Best Hostel in Egypt — Dahab Hostel Downtown Cairo",
    description: site.description,
    keywords: site.keywords.split(", "),
    locale,
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.home" });
  const base = process.env.NEXT_PUBLIC_BASE_URL || site.url;
  const breadcrumbs = generateBreadcrumbSchema([{ name: "Home", url: `${base}/${locale}` }]);
  const href = (p: string) => `/${locale}${p}`;

  const highlights = [
    { icon: MapPin, value: t("highlights.prime"), label: t("highlights.talaatHarb") },
    { icon: Clock, value: t("highlights.reception"), label: t("highlights.receptionLabel") },
    { icon: ShieldCheck, value: t("highlights.award"), label: t("highlights.awardLabel") },
    { icon: Compass, value: t("highlights.since"), label: t("highlights.sinceLabel") },
  ];

  const providedItems = t.raw("provide.items") as string[];

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <Header />
      <main>
        {/* HERO */}
        <PageHero
          title={t("title")}
          subtitle={t("subtitle")}
          image={images.homeBanner}
          height="min-h-[78vh]"
        />
        <div className="container-page relative -mt-10 z-10">
          <div className="grid grid-cols-2 gap-3 rounded-3xl bg-surface/95 p-4 shadow-card ring-subtle backdrop-blur-xl sm:grid-cols-4 sm:p-6">
            {highlights.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-surface-soft">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Icon size={18} /></span>
                <div className="min-w-0"><p className="font-display text-sm font-semibold text-ink-heading">{value}</p><p className="text-[11px] leading-tight text-ink-muted sm:text-xs">{label}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* AWARDS */}
        <section className="container-page section-pad !pt-16 text-center">
          <p className="eyebrow">{t("awards.eyebrow")}</p>
          <h2 className="heading-display mx-auto mt-3 max-w-3xl">{t("awards.title")}</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {[images.awardBestHostelEgypt, images.awardBestSmallHostelAfrica].map((a, i) => (
              <Link key={a} href={site.tripAdvisorUrl} target="_blank" rel="noreferrer" className="group" aria-label={`HOSCAR 2026 award ${i + 1}`}>
                <Image src={a} alt="HOSCAR Awards 2026" width={180} height={180} className="h-auto w-[140px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 sm:w-[175px]" />
              </Link>
            ))}
          </div>
          <div className="mt-10"><ActionLink href="/book-now">{t("awards.reserveBed")}</ActionLink></div>
        </section>

        {/* EXPERIENCE */}
        <section className="bg-surface-soft section-pad">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <div className="relative animate-fade-up">
              <div className="overflow-hidden rounded-[2rem] shadow-card"><Image src={images.collage} alt="Dahab Hostel rooftop collage" width={800} height={600} className="h-full w-full object-cover" /></div>
              <div className="absolute -bottom-6 -right-4 hidden w-44 rounded-2xl bg-surface p-4 shadow-lift ring-subtle sm:block">
                <Sparkles className="mb-2 text-brand" size={20} />
                <p className="font-display text-sm font-semibold text-ink-heading">{t("experience.badge")}</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">{t("experience.eyebrow")}</p>
              <h2 className="heading-display mt-3">{t("experience.title")}</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-muted">
                <p>{t("experience.p1")}</p>
                <p>{t("experience.p2")}</p>
              </div>
              <div className="relative mt-7 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-soft/50 via-surface to-surface-soft p-6 shadow-soft ring-subtle transition-all duration-300 hover:shadow-card">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand shadow-xs">
                    <Quote size={20} className="rotate-180" />
                  </div>
                  <div className="space-y-2">
                    <blockquote className="font-display text-[17px] font-medium italic leading-relaxed text-ink-heading sm:text-lg">
                      &ldquo;{t("experience.quote")}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-brand">
                      <div className="flex items-center text-star">
                        <Star size={13} className="fill-current" />
                        <Star size={13} className="fill-current" />
                        <Star size={13} className="fill-current" />
                        <Star size={13} className="fill-current" />
                        <Star size={13} className="fill-current" />
                      </div>
                      <span className="text-ink-muted">· {t("experience.guestFavorite")}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink href="/about-us">{t("experience.ourStory")}</ActionLink>
                <ActionLink href="/photos" variant="outline">{t("experience.explorePhotos")}</ActionLink>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE PROVIDE */}
        <section className="relative overflow-hidden section-pad">
          <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${images.provideBanner})` }} />
          <div className="absolute inset-0 -z-10 bg-surface-dark/80" />
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow !text-brand-light">{t("provide.eyebrow")}</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{t("provide.title")}</h2>
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {providedItems.map((p) => (
                <div key={p} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:bg-white/10">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-brand-light" />{p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOURS */}
        <section className="container-page section-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow={t("tours.eyebrow")}>{t("tours.title")}</SectionTitle>
            <Link href={href("/our-tours")} className="link-brand inline-flex items-center gap-1 text-sm">{t("tours.allTrips")} <ArrowUpRight size={15} /></Link>
          </div>
          <p className="-mt-4 mb-10 max-w-3xl text-[15px] leading-relaxed text-ink-muted">{t("tours.desc")}</p>
          <div className="surface-grid">
            {tours.slice(0, 6).map((tItem) => (
              <Link key={tItem.slug} href={href(`/our-tours/${tItem.slug}`)} className="card-modern card-hover group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={tItem.image} alt={tItem.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand backdrop-blur">{tItem.duration}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink-heading">{tItem.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">{t("tours.discoverMore")} <ArrowUpRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ActionLink href="/itinerary-generator" variant="outline">{t("tours.buildItinerary")}</ActionLink>
            <ActionLink href="/tours-prices">{t("tours.requestPrice")}</ActionLink>
          </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section className="bg-surface-soft section-pad">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionTitle eyebrow={t("gallery.eyebrow")}>{t("gallery.title")}</SectionTitle>
              <ActionLink href="/photos" variant="outline">{t("gallery.viewAll")}</ActionLink>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((p) => (
                <div key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft ring-subtle">
                  <Image src={p.src} alt={p.caption} fill sizes="25vw" className="object-cover transition-transform duration-700 hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-page section-pad">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-8 py-14 text-center shadow-lift sm:px-16">
            <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
            <p className="eyebrow !text-white/80">{t("cta.eyebrow")}</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">{t("cta.desc")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn !bg-surface !text-brand hover:!-translate-y-0.5">{t("cta.checkAvailability")} <ArrowUpRight size={16} /></Link>
              <Link href={href("/airport-pickup-service")} className="btn !border !border-white/50 !text-white hover:!bg-white/10">{t("cta.arrangePickup")}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
