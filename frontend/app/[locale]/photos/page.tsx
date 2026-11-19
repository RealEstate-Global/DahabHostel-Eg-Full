import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, GalleryGrid } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { gallery, images, site } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.photos" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function PhotosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.photos" });

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.terrace} />
        <div className="container-page section-pad">
          <h2 className="font-display text-[24px] text-ink mb-6">{t("heading")}</h2>
          <GalleryGrid photos={gallery} />
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-line-strong/50 to-transparent" />
          <h2 className="font-display text-[24px] text-ink mb-6">{t("videoHeading")}</h2>
          <div className="mx-auto max-w-[640px] my-8 aspect-video">
            <iframe className="w-full h-full border-0" src={`https://www.youtube.com/embed/${site.youtubeVideoId}`} title="Dahab Hostel video review" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <p className="text-center text-ink-muted">{t("videoCaption")}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
