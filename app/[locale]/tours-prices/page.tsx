import { Header, Footer, PageHero, RequestForm } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { tours, site, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Request Tour Prices — Dahab Hostel", description: "Tell us your period of stay and destinations of interest and we will tailor a tour and price for you.", locale });
}

export default async function ToursPrices({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const href = (p: string) => `/${locale}${p}`;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Request Tour Prices" subtitle="Fixed prices, small groups. Choose from our tours or tell us what you would like to see." image={images.toursBanner} />
        <div className="container-page section-pad grid grid-cols-1 md:grid-cols-[4fr_6fr] gap-12">
          <aside>
            <h2 className="font-display text-[22px] text-ink mb-4">Choose from our tours</h2>
            <ul className="list-disc pl-6 text-ink-muted leading-relaxed space-y-1">
              {tours.map((t) => <li key={t.slug}><a className="text-brand hover:underline" href={href(`/our-tours/${t.slug}`)}>{t.title}</a></li>)}
            </ul>
            <div className="border-t border-line mt-8 pt-6">
              <h2 className="font-display text-[20px] text-ink mb-3">Want to tailor your own tour?</h2>
              <p className="text-ink-muted leading-relaxed">Just inform us of your period of stay in Egypt and destinations of interest and we will tailor a tour for you!</p>
            </div>
          </aside>
          <div>
            <h2 className="font-display text-[26px] text-ink mb-6">Request a price</h2>
            <RequestForm kind="tour" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
