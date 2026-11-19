import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { tours, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.tours" });
  return generateSEO({
    title: t("title"),
    description: t("subtitle"),
    locale,
  });
}

export default async function OurTours({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.tours" });
  const href = (p: string) => `/${locale}${p}`;
  const groups = [
    { name: t("history"), items: tours.filter((item) => item.category === "history") },
    { name: t("adventure"), items: tours.filter((item) => item.category !== "history") },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.toursBanner} />
        <div className="bg-surface">
          {groups.map((group) => (
            <section key={group.name} className={`section-pad ${group.name === t("adventure") ? "bg-surface-soft" : ""}`}>
              <div className="container-page">
                <div className="mb-8">
                  <p className="eyebrow">{t("curated")}</p>
                  <h2 className="heading-display mt-2">{group.name}</h2>
                </div>
                <div className="surface-grid">
                  {group.items.map((tourItem) => (
                    <Link key={tourItem.slug} href={href(`/our-tours/${tourItem.slug}`)} className="card-modern card-hover group overflow-hidden text-center">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image src={tourItem.image} alt={tourItem.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand backdrop-blur">{tourItem.duration}</span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-lg font-semibold leading-snug text-ink-heading">{tourItem.title}</h3>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">{t("discoverMore")}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
          <section className="container-page section-pad text-center">
            <p className="text-ink-muted leading-relaxed mb-6">{t("tourismSince")}</p>
            <ActionLink href="/tours-prices">{t("requestPrices")}</ActionLink>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
