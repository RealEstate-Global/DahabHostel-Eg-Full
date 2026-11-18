import { Header, Footer, PageHero } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { site, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Write a Review — Dahab Hostel Cairo", description: "Stayed with us? Leave a review on Google, Hostelworld, Booking.com or Tripadvisor.", locale });
}

export default async function WriteAReview({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Write a Review" subtitle="How was Dahab Hostel?" image={images.homeBanner} />
        <div className="container-page section-pad max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-[26px] text-ink mb-4">How was Dahab Hostel?</h2>
            <p className="leading-relaxed text-justify mb-4">Thank you for choosing Dahab Hostel for your recent stay in Cairo. We'd be grateful if you would review us on TripAdvisor.</p>
            <p className="leading-relaxed text-justify mb-4">Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.</p>
            <p>Write a review of <a className="text-brand hover:underline" href={site.tripAdvisorUrl} target="_blank" rel="noreferrer">Dahab Hostel</a></p>
          </div>
          <div>
            <h2 className="font-display text-[22px] text-ink mb-4">Have you booked through HostelWorld?</h2>
            <p className="leading-relaxed text-justify"><a className="text-brand hover:underline" href={site.hostelWorldUrl} target="_blank" rel="noreferrer">Log in to your HostelWorld account</a> to write a review about Dahab hostel.</p>
            <p className="mt-6">Thanks again, and we hope you'll choose Dahab Hostel the next time you're in Cairo.</p>
            <div className="mt-8 border border-line rounded-2xl bg-surface-soft p-6">
              <p className="mb-2">Prefer Google? <a className="text-brand hover:underline" href={site.googleReviewUrl} target="_blank" rel="noreferrer">Write a Google review</a></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
