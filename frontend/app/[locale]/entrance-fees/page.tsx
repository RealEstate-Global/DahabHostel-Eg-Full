import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { getLocalizedEntranceFees, getLocalizedFeeNotes } from "@/app/_lib/localized-data";
import { images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.entranceFees" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function EntranceFeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.entranceFees" });
  const localizedFees = getLocalizedEntranceFees(locale);
  const localizedNotes = getLocalizedFeeNotes(locale);

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl space-y-12">
          {localizedFees.map((g) => (
            <div key={g.group} className="rounded-2xl bg-surface p-6 shadow-soft ring-subtle">
              <h2 className="font-display text-[22px] text-ink mb-3">{g.group}</h2>
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="border-b border-line-strong/60 text-start">
                    <th className="py-2.5 pe-4 font-bold text-ink text-start">{t("sightseeing")}</th>
                    <th className="py-2.5 text-end font-bold text-ink whitespace-nowrap">{t("feesExcluded")}</th>
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map(([name, price]) => (
                    <tr key={name} className="border-b border-line/40 transition-colors hover:bg-brand-soft/20"><td className="py-2.5 pe-4 text-start">{name}</td><td className="py-2.5 text-end text-ink font-medium whitespace-nowrap">{price}</td></tr>
                  ))}
                  {g.addons?.map(([name, price]) => (
                    <tr key={name} className="border-b border-line/40 transition-colors hover:bg-brand-soft/20"><td className="py-2.5 pe-4 text-start">{name}</td><td className="py-2.5 text-end text-ink font-medium whitespace-nowrap">{price}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div className="rounded-2xl bg-gradient-to-br from-brand-soft/30 via-surface-soft to-surface p-6 shadow-soft ring-subtle space-y-3 text-[14px] leading-relaxed">
            {localizedNotes.map((n) => <p key={n}>{n}</p>)}
          </div>
          <div className="text-center"><ActionLink href="/tours-prices">{t("requestPrices")}</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
