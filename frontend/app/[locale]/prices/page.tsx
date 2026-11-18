import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { rooms, roomRatesNote, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Room Prices — Dahab Hostel Cairo", description: "Best prices for dorm beds and private rooms in Downtown Cairo. Female-only dorm available, free cancellation.", locale });
}

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Room Rates" subtitle="Best Prices for dorm beds and private rooms in Downtown Cairo." image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h1 className="font-display text-[32px] text-ink">Room Rates</h1>
            <p className="text-[15px]">{roomRatesNote}</p>
          </div>
          {rooms.map((room) => (
            <div key={room.name} className="mb-7">
              <h2 className="font-display text-[19px] text-ink flex flex-wrap justify-between gap-2"><span>{room.name}</span><strong>{room.price}</strong></h2>
              <p className="leading-relaxed text-ink-muted">{room.description}</p>
            </div>
          ))}
          <div className="mt-10"><ActionLink href="/book-now">Book Now</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
