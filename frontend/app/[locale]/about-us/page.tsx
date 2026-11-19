import Image from "next/image";
import { Quote } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function AboutUs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl leading-relaxed space-y-4 text-justify">
          <h2 className="font-display text-[26px] text-ink">{t("ourStory")}</h2>
          {paragraphs.slice(0, 2).map((p) => <p key={p} className="text-ink-muted">{p}</p>)}
          <div className="relative my-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-soft/40 via-surface-soft to-surface p-7 shadow-soft ring-1 ring-black/5 dark:ring-white/10">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand shadow-xs">
                <Quote size={20} className="rotate-180" />
              </div>
              <div className="space-y-2">
                <blockquote className="font-display text-[19px] font-medium italic leading-relaxed text-ink-heading">
                  &ldquo;{t("quote")}&rdquo;
                </blockquote>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{t("quoteBy")}</p>
              </div>
            </div>
          </div>
          {paragraphs.slice(2).map((p) => <p key={p} className="text-ink-muted">{p}</p>)}
          <div className="text-center pt-6">
            <Image src={images.terrace} alt="The rooftop terrace of Dahab Hostel" width={700} height={450} className="inline-block max-w-full rounded-[4px]" />
          </div>
          <div className="text-center pt-6"><ActionLink href="/contact-us">{t("contactUs")}</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
