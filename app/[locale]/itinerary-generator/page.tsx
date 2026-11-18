import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { tours, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Itinerary Generator — Dahab Hostel", description: "Plan your Egypt itinerary with our tours and day trips.", locale });
}

export default async function ItineraryGenerator({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const href = (p: string) => `/${locale}${p}`;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Itinerary Generator" subtitle="Tell us how long you are staying and we will help you plan your time in Egypt." image={images.toursBanner} />
        <div className="container-page section-pad">
          <h2 className="font-display text-[26px] text-ink mb-6">Pick your days and build a plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tours.map((t) => (
              <div key={t.slug} className="border border-line rounded-2xl p-6">
                <h3 className="font-display text-[20px] text-ink mb-1">{t.title}</h3>
                <p className="text-brand text-[13px] mb-3">{t.duration}</p>
                <p className="text-ink-muted text-[14px] leading-relaxed mb-4">{t.description}</p>
                <a className="text-brand hover:underline text-[13px]" href={href(`/our-tours/${t.slug}`)}>View tour details</a>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><ActionLink href="/tours-prices">Request a custom itinerary</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
