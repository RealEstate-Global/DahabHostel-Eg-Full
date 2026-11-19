import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, RequestForm } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { getLocalizedTours } from "@/app/_lib/localized-data";
import { images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.toursPrices" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function ToursPrices({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.toursPrices" });
  const href = (p: string) => `/${locale}${p}`;
  const localizedTours = getLocalizedTours(locale);

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.toursBanner} />
        <div className="container-page section-pad grid grid-cols-1 md:grid-cols-[4fr_6fr] gap-12">
          <aside>
            <h2 className="font-display text-[22px] text-ink mb-4">{t("chooseTours")}</h2>
            <ul className="list-disc ms-6 text-ink-muted leading-relaxed space-y-1">
              {localizedTours.map((item) => (
                <li key={item.slug}>
                  <a className="text-brand hover:underline" href={href(`/our-tours/${item.slug}`)}>{item.title}</a>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6">
              <h2 className="font-display text-[20px] text-ink mb-3">{t("tailorTour")}</h2>
              <p className="text-ink-muted leading-relaxed">{t("tailorDesc")}</p>
            </div>
          </aside>
          <div>
            <h2 className="font-display text-[26px] text-ink mb-6">{t("requestPrice")}</h2>
            <RequestForm kind="tour" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
