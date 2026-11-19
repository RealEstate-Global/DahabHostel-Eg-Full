import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { getLocalizedRooms } from "@/app/_lib/localized-data";
import { images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.prices" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.prices" });
  const tBook = await getTranslations({ locale, namespace: "pages.bookNow" });
  const localizedRooms = getLocalizedRooms(locale);

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("heading")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h1 className="font-display text-[32px] text-ink">{t("heading")}</h1>
            <p className="text-[15px] text-ink-muted">{tBook("ratesNote")}</p>
          </div>
          <div className="space-y-4">
            {localizedRooms.map((room) => (
              <div key={room.name} className="rounded-2xl bg-surface-soft/60 p-5 ring-subtle transition-all duration-200 hover:shadow-soft">
                <h2 className="font-display text-[19px] text-ink flex flex-wrap justify-between gap-2">
                  <span>{room.name}</span>
                  <strong className="text-brand">{room.price}</strong>
                </h2>
                <p className="leading-relaxed text-ink-muted text-sm mt-1">{room.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><ActionLink href="/book-now">{t("bookNow")}</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
