import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { provided, images, site } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Services Brochure — Dahab Hostel", description: "Dorms and private rooms, rooftop terraces, 24/7 reception, airport pickup and budget tours.", locale });
}

export default async function ServicesBrochure({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Services Brochure" subtitle="Everything you need for a comfortable, affordable stay in the heart of Cairo." image={images.provideBanner} />
        <div className="container-page section-pad">
          <h2 className="font-display text-[28px] text-ink text-center mb-10">What we provide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {provided.map((p) => (
              <div key={p} className="border border-line rounded-2xl bg-surface-soft p-6 text-ink font-semibold">{p}</div>
            ))}
          </div>
          <div className="text-center mt-12 space-x-4">
            <ActionLink href="/book-now">Book Now</ActionLink>
            <ActionLink href="/our-tours" variant="outline">Explore Tours</ActionLink>
          </div>
          <p className="text-center text-ink-muted mt-10">Dahab hostel has been in the tourism business in Cairo since {site.foundSince}.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
