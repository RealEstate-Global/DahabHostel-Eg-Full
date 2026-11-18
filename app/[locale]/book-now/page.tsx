import { Header, Footer, PageHero, ActionLink, RequestForm } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { rooms, roomRatesNote, images, site } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Book a Room — Dahab Hostel Cairo", description: "Book a dorm bed or private room at Hostelworld's Best Hostel in Egypt. Female-only dorm available. Free cancellation.", locale });
}

export default async function BookNow({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const href = (p: string) => `/${locale}${p}`;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Book a Room — Dahab Hostel Cairo" subtitle="Check availability and book instantly through our secure online booking system. Your Dahab hostel is the best accommodation deal in Cairo." image={images.homeBanner} />
        <div className="container-page section-pad">
          <h1 className="font-display text-[32px] text-ink text-center leading-relaxed max-w-[680px] mx-auto mb-8">Book your room now</h1>
          <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-10 items-start">
            <div>
              <h2 className="font-display text-[22px] text-ink mb-4">Room Rates</h2>
              <div className="divide-y divide-line border-y border-line">
                {rooms.map((room) => (
                  <div key={room.name} className="py-4 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-display text-[18px] text-ink">{room.name}</h3>
                      <p className="text-[13px] text-ink-muted mt-1">{room.description}</p>
                    </div>
                    <strong className="font-display text-[18px] text-ink whitespace-nowrap">{room.price}</strong>
                  </div>
                ))}
              </div>
              <p className="text-[13px] mt-3 text-ink-subtle">{roomRatesNote}</p>
              <div className="text-center mt-12">
                <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">Check Availability &amp; Book</a>
              </div>
              <p className="text-center mt-6 text-ink-muted">Questions about your booking? <a href={href("/contact-us")} className="text-brand hover:underline">Contact us</a> — we are glad to help!</p>
            </div>
            <aside className="space-y-6">
              <div className="border border-line rounded-2xl p-6 bg-surface-soft">
                <h2 className="font-display text-[20px] text-ink mb-4">Airport Pickup</h2>
                <p className="leading-relaxed text-[14px] mb-4">Book your Airport Pickup and you will find our representative waiting for you holding a sign of your name and Dahab hostel. From 550 EGP per car (1 to 3 PaX).</p>
                <ActionLink href="/airport-pickup-service">Order Airport Pickup</ActionLink>
              </div>
              <div className="border border-line rounded-2xl p-6">
                <h2 className="font-display text-[20px] text-ink mb-4">Prefer a custom request?</h2>
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
