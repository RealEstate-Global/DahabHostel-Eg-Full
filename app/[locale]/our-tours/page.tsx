import Image from "next/image";
import Link from "next/link";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { tours, site, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({
    title: "Egypt Budget Tours and Day Trips",
    description: "Budget tours everywhere in Egypt: Pyramids, City tours, White Desert, Aswan/Luxor cruises. Fixed prices, small groups.",
    locale,
  });
}

export default async function OurTours({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const href = (p: string) => `/${locale}${p}`;
  const groups = [
    { name: "History and Culture", items: tours.filter((t) => t.category === "history") },
    { name: "Adventure and Leisure", items: tours.filter((t) => t.category !== "history") },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero title="Our Tours" subtitle="We arrange budget tours everywhere in Egypt with the best quality. Fixed prices, small groups, book at reception or before you arrive." image={images.toursBanner} />
        <div className="bg-surface">
          {groups.map((group) => (
            <section key={group.name} className={`section-pad border-t border-line ${group.name.startsWith("Adventure") ? "bg-surface-soft" : ""}`}>
              <div className="container-page">
                <div className="mb-8">
                  <p className="eyebrow">Curated experiences</p>
                  <h2 className="heading-display mt-2">{group.name}</h2>
                </div>
                <div className="surface-grid">
                  {group.items.map((t) => (
                    <Link key={t.slug} href={href(`/our-tours/${t.slug}`)} className="card-modern card-hover group overflow-hidden text-center">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image src={t.image} alt={t.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand backdrop-blur">{t.duration}</span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-lg font-semibold leading-snug text-ink-heading">{t.title}</h3>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">Discover more →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
          <section className="container-page section-pad text-center border-t border-line">
            <p className="text-ink-muted leading-relaxed mb-6">Dahab hostel has been successfully in the tourism business in Cairo since 1998. Our aim is to allow our guests to save time, effort and money.</p>
            <ActionLink href="/tours-prices">Request Tour Prices</ActionLink>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
