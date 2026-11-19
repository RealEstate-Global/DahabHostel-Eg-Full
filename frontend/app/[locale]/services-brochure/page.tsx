import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function ServicesBrochure({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  const tHome = await getTranslations({ locale, namespace: "pages.home" });
  const providedItems = tHome.raw("provide.items") as string[];

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.provideBanner} />
        <div className="container-page section-pad">
          <h2 className="font-display text-[28px] text-ink text-center mb-10">{t("heading")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {providedItems.map((p) => (
              <div key={p} className="rounded-2xl bg-gradient-to-br from-brand-soft/20 to-surface-soft p-6 text-ink font-semibold shadow-soft ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-card">{p}</div>
            ))}
          </div>
          <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
            <ActionLink href="/book-now">{t("bookNow")}</ActionLink>
            <ActionLink href="/our-tours" variant="outline">{t("exploreTours")}</ActionLink>
          </div>
          <p className="text-center text-ink-muted mt-10">{t("since")}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
