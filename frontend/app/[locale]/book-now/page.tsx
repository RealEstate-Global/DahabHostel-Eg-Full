import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ActionLink, RequestForm } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { rooms, images, site } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.bookNow" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function BookNow({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.bookNow" });
  const href = (p: string) => `/${locale}${p}`;

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad">
          <h1 className="font-display text-[32px] text-ink text-center leading-relaxed max-w-[680px] mx-auto mb-8">{t("heading")}</h1>
          <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-10 items-start">
            <div>
              <h2 className="font-display text-[22px] text-ink mb-4">{t("roomRates")}</h2>
              <div className="space-y-3">
                {rooms.map((room) => (
                  <div key={room.name} className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-surface-soft/70 px-5 py-4 ring-subtle transition-all duration-200 hover:shadow-soft">
                    <div>
                      <h3 className="font-display text-[18px] text-ink">{room.name}</h3>
                      <p className="text-[13px] text-ink-muted mt-1">{room.description}</p>
                    </div>
                    <strong className="font-display text-[18px] text-ink whitespace-nowrap">{room.price}</strong>
                  </div>
                ))}
              </div>
              <p className="text-[13px] mt-3 text-ink-subtle">{t("ratesNote")}</p>
              <div className="text-center mt-12">
                <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">{t("checkAvailability")}</a>
              </div>
              <p className="text-center mt-6 text-ink-muted">{t("questions")} <a href={href("/contact-us")} className="text-brand hover:underline">{t("contactLink")}</a> {t("gladToHelp")}</p>
            </div>
            <aside className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-brand-soft/30 via-surface-soft to-surface p-6 shadow-soft ring-subtle">
                <h2 className="font-display text-[20px] text-ink mb-4">{t("airportPickup")}</h2>
                <p className="leading-relaxed text-[14px] mb-4">{t("airportPickupDesc")}</p>
                <ActionLink href="/airport-pickup-service">{t("orderPickup")}</ActionLink>
              </div>
              <div className="rounded-2xl bg-surface-soft/50 p-6 shadow-soft ring-subtle">
                <h2 className="font-display text-[20px] text-ink mb-4">{t("customRequest")}</h2>
                <RequestForm kind="booking" />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
