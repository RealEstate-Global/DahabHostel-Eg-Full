import Image from "next/image";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { location, images, site } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Dahab Hostel Location — Downtown Cairo", description: location.subtitle, locale });
}

export default async function LocationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const href = (p: string) => `/${locale}${p}`;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={location.title} subtitle={location.subtitle} image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl leading-relaxed space-y-4">
          <p className="text-ink">{location.intro}</p>
          <div className="relative w-full aspect-[16/9] my-8 border border-line">
            <Image src={images.collage} alt="Dahab Hostel rooftop" fill sizes="760px" className="object-cover" />
          </div>
          <h2 className="font-display text-[24px] text-ink pt-4">How to get there?</h2>
          <ul className="list-disc pl-6 space-y-1 text-ink-muted">
            {location.directions.map((d) => <li key={d}>{d}</li>)}
          </ul>
          <h2 className="font-display text-[24px] text-ink pt-4">Taxi</h2>
          <p className="text-ink-muted">{location.taxi}</p>
          <h2 className="font-display text-[24px] text-ink pt-4">Metro</h2>
          <p className="text-ink-muted">{location.metro}</p>
          <h2 className="font-display text-[24px] text-ink pt-4">Airport Pickup</h2>
          <p className="text-ink-muted">You will find our representative waiting for you holding a sign of your name and Dahab hostel, after passport control and customs clearance.</p>
          <p className="text-ink-muted">From 1 to 3 PaX, from <strong>550 EGP</strong> per car. For groups of more than 3 PaX, <a className="text-brand hover:underline" href={href("/contact-us")}>contact us</a> for a quote.</p>
          <div className="mt-6"><ActionLink href="/airport-pickup-service">Order Airport Pickup Now</ActionLink></div>
          <h2 className="font-display text-[24px] text-ink pt-6">Things to see in the local area</h2>
          <ul className="list-disc pl-6 text-ink-muted">
            {location.nearby.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <p className="text-ink-muted">In the evenings, the local area has a wide variety of restaurants and lively nightspots.</p>
          <div className="mt-8 border-t border-line-strong pt-6 text-[14px] text-ink-muted">
            <p><strong className="text-ink">Address:</strong> {site.address}</p>
            <p><strong className="text-ink">Phone:</strong> {site.phone}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
