import { Header, Footer, PageHero, ContactForm } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { site, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Contact Us — Dahab Hostel Cairo", description: "Get in touch with Dahab Hostel in Downtown Cairo. We are glad to help with bookings, tours and airport pickup.", locale });
}

export default async function ContactUs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Contact Us" subtitle="Questions about your booking, tours or airport pickup? We are glad to help!" image={images.homeBanner} />
        <div className="container-page section-pad grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-12">
          <div>
            <h2 className="font-display text-[26px] text-ink mb-6">Get In Touch</h2>
            <ContactForm />
          </div>
          <aside className="bg-surface-soft border border-line rounded-2xl p-6 h-fit">
            <h2 className="font-display text-[20px] text-ink mb-4">Contact Details</h2>
            <ul className="space-y-4 text-ink-muted leading-relaxed">
              <li><strong className="block text-ink">Address</strong>{site.address}<br />{site.building}</li>
              <li><strong className="block text-ink">Phone</strong><a className="text-brand hover:underline" href={`tel:${site.phone}`}>{site.phone}</a><br /><a className="text-brand hover:underline" href={`tel:${site.mobile}`}>{site.mobile}</a></li>
              <li><strong className="block text-ink">Email</strong><a className="text-brand hover:underline" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><strong className="block text-ink">Reception</strong>Open 24/7</li>
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
