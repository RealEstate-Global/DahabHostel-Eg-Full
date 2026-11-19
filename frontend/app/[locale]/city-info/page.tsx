import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.cityInfo" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function CityInfo({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.cityInfo" });
  const sections = t.raw("sections") as Array<{ title: string; text: string }>;

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl">
          {sections.map((s) => (
            <section key={s.title} className="mb-8">
              <h2 className="font-display text-[22px] text-ink mb-2">{s.title}</h2>
              <p className="leading-relaxed text-justify text-ink-muted">{s.text}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
