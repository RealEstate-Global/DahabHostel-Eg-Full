import { Header, Footer, PageHero } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { cityInfo, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: cityInfo.title, description: cityInfo.subtitle, locale });
}

export default async function CityInfo({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="City Info" subtitle={cityInfo.subtitle} image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl">
          {cityInfo.sections.map((s) => (
            <section key={s.title} className="mb-8">
              <h2 className="font-display text-[22px] text-ink mb-2">{s.title}</h2>
              <p className="leading-relaxed text-justify text-ink-muted">{s.text}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
