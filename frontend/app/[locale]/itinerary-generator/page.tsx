import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { tours, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.itinerary" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function ItineraryGenerator({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.itinerary" });
  const href = (p: string) => `/${locale}${p}`;

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.toursBanner} />
        <div className="container-page section-pad">
          <h2 className="font-display text-[26px] text-ink mb-6">{t("heading")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tours.map((item) => (
              <div key={item.slug} className="rounded-2xl bg-surface-soft/50 p-6 shadow-soft ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-card">
                <h3 className="font-display text-[20px] text-ink mb-1">{item.title}</h3>
                <p className="text-brand text-[13px] mb-3">{item.duration}</p>
                <p className="text-ink-muted text-[14px] leading-relaxed mb-4">{item.description}</p>
                <a className="text-brand hover:underline text-[13px]" href={href(`/our-tours/${item.slug}`)}>{t("viewDetails")}</a>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><ActionLink href="/tours-prices">{t("requestCustom")}</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
