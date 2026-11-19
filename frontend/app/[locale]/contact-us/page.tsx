import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero, ContactForm } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { site, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function ContactUs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-12">
          <div>
            <h2 className="font-display text-[26px] text-ink mb-6">{t("heading")}</h2>
            <ContactForm />
          </div>
          <aside className="rounded-2xl bg-gradient-to-br from-brand-soft/20 via-surface-soft to-surface p-6 shadow-soft ring-subtle h-fit">
            <h2 className="font-display text-[20px] text-ink mb-4">{t("details")}</h2>
            <ul className="space-y-4 text-ink-muted leading-relaxed">
              <li><strong className="block text-ink">{t("address")}</strong>{site.address}<br />{site.building}</li>
              <li><strong className="block text-ink">{t("phone")}</strong><a className="text-brand hover:underline" href={`tel:${site.phone}`}>{site.phone}</a><br /><a className="text-brand hover:underline" href={`tel:${site.mobile}`}>{site.mobile}</a></li>
              <li><strong className="block text-ink">{t("email")}</strong><a className="text-brand hover:underline" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><strong className="block text-ink">{t("reception")}</strong>{t("receptionTime")}</li>
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
