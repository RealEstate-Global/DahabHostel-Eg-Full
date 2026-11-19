import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Header, Footer, ActionLink, RequestForm } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { getLocalizedTour } from "@/app/_lib/localized-data";
import { tours } from "@/app/_data";

export function generateStaticParams() {
  return ["en", "ar", "fr", "es"].flatMap((locale) =>
    tours.map((t) => ({ locale, slug: t.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale } = await params;
  const tour = getLocalizedTour(slug, locale);
  if (!tour) return {};
  return generateSEO({ title: tour.cardTitle, description: tour.description, locale });
}

export default async function TourDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.tourDetail" });
  const tour = getLocalizedTour(slug, locale);
  if (!tour) notFound();

  return (
    <>
      <Header />
      <main className="bg-surface">
        <div className="container-page section-pad">
          <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-10">
            <article className="leading-relaxed">
              <h1 className="font-display text-[30px] text-ink mb-2">{tour.title}</h1>
              <p className="text-brand font-semibold mb-6">{tour.duration}</p>
              <p className="mb-8 text-justify">{tour.description}</p>
              {tour.gallery && tour.gallery.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-6">
                  {tour.gallery.map((img) => (
                    <figure key={img.src}>
                      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-soft ring-subtle">
                        <Image src={img.src} alt={img.caption} fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover" />
                      </div>
                      <figcaption className="text-[13px] text-ink-subtle mt-2">{img.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {tour.highlights && tour.highlights.length > 0 && (
                <section className="my-6">
                  <h2 className="font-bold text-ink text-[17px] mb-2">{t("details")}</h2>
                  <ul className="list-disc ms-6 text-ink-muted mb-4">{tour.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                </section>
              )}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <section className="my-6 space-y-6">
                  <h2 className="font-bold text-ink text-[17px] mb-2">{t("itinerary")}</h2>
                  {tour.itinerary.map((d) => (
                    <div key={d.day} className="section">
                      <h3 className="font-bold text-ink mb-1">{d.day}</h3>
                      <p className="text-ink-muted leading-relaxed">{d.text}</p>
                    </div>
                  ))}
                </section>
              )}
              {tour.inclusions && tour.inclusions.length > 0 && (
                <section className="my-6">
                  <h2 className="font-bold text-ink mb-1">{t("inclusions")}</h2>
                  <ul className="list-disc ms-6 text-ink-muted leading-relaxed">{tour.inclusions.map((i) => <li key={i}>{i}</li>)}</ul>
                </section>
              )}
              {tour.exclusions && tour.exclusions.length > 0 && (
                <section className="my-6">
                  <h2 className="font-bold text-ink mb-1">{t("exclusions")}</h2>
                  <ul className="list-disc ms-6 text-ink-muted leading-relaxed">{tour.exclusions.map((i) => <li key={i}>{i}</li>)}</ul>
                </section>
              )}
              {tour.notes && tour.notes.length > 0 && (
                <section className="my-6">
                  <h2 className="font-bold text-ink mb-1">{t("tripNotes")}</h2>
                  <ul className="list-disc ms-6 text-ink-muted leading-relaxed">{tour.notes.map((i) => <li key={i}>{i}</li>)}</ul>
                </section>
              )}
            </article>
            <aside className="card-modern text-center md:sticky md:top-24 h-fit bg-surface-soft p-6">
              <h2 className="font-display text-xl font-semibold text-ink-heading mb-3">{t("requestPrice")}</h2>
              <p className="text-ink-muted text-[14px] mb-4">{t("requestPriceDesc")}</p>
              <RequestForm kind="tour" />
            </aside>
          </div>
          <div className="text-center mt-10"><ActionLink href="/our-tours">{t("backToAll")}</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
