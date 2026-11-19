import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { images, site } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.location" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function LocationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.location" });
  const href = (p: string) => `/${locale}${p}`;
  const directions = t.raw("directions") as string[];
  const nearby = t.raw("nearby") as string[];

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl leading-relaxed space-y-4">
          <p className="text-ink">{t("intro")}</p>
          <div className="relative w-full aspect-[16/9] my-8 overflow-hidden rounded-2xl shadow-soft ring-subtle">
            <Image src={images.collage} alt="Dahab Hostel rooftop" fill sizes="760px" className="object-cover" />
          </div>
          <h2 className="font-display text-[24px] text-ink pt-4">{t("howToGetThere")}</h2>
          <ul className="list-disc pl-6 space-y-1 text-ink-muted">
            {directions.map((d) => <li key={d}>{d}</li>)}
          </ul>
          <h2 className="font-display text-[24px] text-ink pt-4">{t("taxiTitle")}</h2>
          <p className="text-ink-muted">{t("taxi")}</p>
          <h2 className="font-display text-[24px] text-ink pt-4">{t("metroTitle")}</h2>
          <p className="text-ink-muted">{t("metro")}</p>
          <h2 className="font-display text-[24px] text-ink pt-4">{t("pickupTitle")}</h2>
          <p className="text-ink-muted">{t("pickup")}</p>
          <p className="text-ink-muted">{t("pickupPrice")}</p>
          <div className="mt-6"><ActionLink href="/airport-pickup-service">{t("orderPickup")}</ActionLink></div>
          <h2 className="font-display text-[24px] text-ink pt-6">{t("nearbyTitle")}</h2>
          <ul className="list-disc pl-6 text-ink-muted">
            {nearby.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <p className="text-ink-muted">{t("evenings")}</p>
          <div className="mt-8 rounded-2xl bg-surface-soft/70 p-5 ring-subtle text-[14px] text-ink-muted">
            <p><strong className="text-ink">Address:</strong> {site.address}</p>
            <p><strong className="text-ink">Phone:</strong> {site.phone}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
