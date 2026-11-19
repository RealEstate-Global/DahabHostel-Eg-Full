import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, RequestForm, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pickup" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function AirportPickup({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pickup" });

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-12">
          <div>
            <div className="leading-relaxed mb-6">
              <strong className="block text-ink">{t("prices")}</strong>
              <p>{t("cairoAirport")}</p>
              <p>{t("sphinxAirport")}</p>
            </div>
            <RequestForm kind="pickup" />
          </div>
          <aside className="leading-relaxed md:pt-[112px]">
            <p className="mb-4">{t("desc")}</p>
            <p className="font-bold text-ink-muted">{t("prices")}</p>
            <ul className="list-disc pl-6 text-ink-muted mb-4">
              <li>{t("cairoAirport")}</li>
              <li>{t("sphinxAirport")}</li>
            </ul>
            <p className="mb-5"><strong className="text-ink">{t("note")}</strong></p>
            <ActionLink href="/book-now">{t("bookRoom")}</ActionLink>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
