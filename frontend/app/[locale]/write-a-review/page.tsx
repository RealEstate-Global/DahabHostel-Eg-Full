import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { site, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.review" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function WriteAReview({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.review" });

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-[26px] text-ink mb-4">{t("heading")}</h2>
            <p className="leading-relaxed text-justify mb-4">{t("p1")}</p>
            <p className="leading-relaxed text-justify mb-4">{t("p2")}</p>
            <p><a className="text-brand hover:underline" href={site.tripAdvisorUrl} target="_blank" rel="noreferrer">{t("tripAdvisorLink")}</a></p>
          </div>
          <div>
            <h2 className="font-display text-[22px] text-ink mb-4">{t("hostelWorldHeading")}</h2>
            <p className="leading-relaxed text-justify"><a className="text-brand hover:underline" href={site.hostelWorldUrl} target="_blank" rel="noreferrer">{t("hostelWorldText")}</a></p>
            <p className="mt-6">{t("thanks")}</p>
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-soft/20 to-surface-soft p-6 shadow-soft ring-subtle">
              <p className="mb-2"><a className="text-brand hover:underline" href={site.googleReviewUrl} target="_blank" rel="noreferrer">{t("google")}</a></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
