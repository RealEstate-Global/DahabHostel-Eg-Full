import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { entranceFees, feeNotes, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Egypt Entrance Fees", description: "Entrance fees for Giza, Cairo, Luxor, Aswan, Siwa, Fayoum, White Desert and Alexandria so you can plan your days and budget.", locale });
}

export default async function EntranceFeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Egypt Entrance Fees" subtitle="Plan your days and your budget with our guide to entrance fees at Egypt's main sightseeing sites." image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl space-y-12">
          {entranceFees.map((g) => (
            <div key={g.group}>
              <h2 className="font-display text-[22px] text-ink mb-3">{g.group}</h2>
              <table className="w-full text-[14px]">
                <thead><tr className="border-b border-line-strong text-left"><th className="py-2 pr-4 font-bold text-ink">Sightseeing</th><th className="py-2 text-right font-bold text-ink whitespace-nowrap">Entrance Fees (Excluded)</th></tr></thead>
                <tbody>
                  {g.rows.map(([name, price]) => (
                    <tr key={name} className="border-b border-line"><td className="py-2 pr-4">{name}</td><td className="py-2 text-right text-ink whitespace-nowrap">{price}</td></tr>
                  ))}
                  {g.addons?.map(([name, price]) => (
                    <tr key={name} className="border-b border-line"><td className="py-2 pr-4">{name}</td><td className="py-2 text-right text-ink whitespace-nowrap">{price}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div className="border border-line rounded-2xl bg-surface-soft p-6 space-y-3 text-[14px] leading-relaxed">
            {feeNotes.map((n) => <p key={n}>{n}</p>)}
          </div>
          <div className="text-center"><ActionLink href="/tours-prices">Request Tour Prices</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
