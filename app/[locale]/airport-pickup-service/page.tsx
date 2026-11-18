import { Header, Footer, PageHero, RequestForm, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { airportPickupPrices, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Cheap Cairo Airport Pickup Taxi Service", description: "Pickup at Cairo or Sphinx airport and straight to the hostel, for the best price day or night. 24/7 reception.", locale });
}

export default async function AirportPickup({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Airport Pickup Request" subtitle="We will be waiting for you with a sign of your name after passport control." image={images.homeBanner} />
        <div className="container-page section-pad grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-12">
          <div>
            <p className="leading-relaxed mb-6"><strong className="text-ink">Prices:</strong><br />Cairo Airport <strong>550 EGP</strong> per car (1 to 3 PaX)<br />Sphinx Airport <strong>1000 EGP</strong> per car (1 to 3 PaX)</p>
            <RequestForm kind="pickup" />
          </div>
          <aside className="leading-relaxed md:pt-[112px]">
            <p className="mb-4">Book your Airport Pickup and you will find our representative waiting for you holding a sign of your name and Dahab hostel, after you finish passport control and customs clearance.</p>
            <p className="font-bold text-ink-muted">Prices</p>
            <ul className="list-disc pl-6 text-ink-muted mb-4">
              {airportPickupPrices.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <p className="mb-5"><strong className="text-ink">Note:</strong> You must have a room booking with us before you can order your airport pickup.</p>
            <ActionLink href="/book-now">Book your room now</ActionLink>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
