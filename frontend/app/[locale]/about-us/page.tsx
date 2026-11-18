import Image from "next/image";
import { Header, Footer, PageHero, ActionLink } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { about, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: about.title, description: about.subtitle, locale });
}

export default async function AboutUs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={about.title} subtitle={about.subtitle} image={images.homeBanner} />
        <div className="container-page section-pad max-w-4xl leading-relaxed space-y-4 text-justify">
          <h2 className="font-display text-[26px] text-ink">Our Story</h2>
          {about.paragraphs.slice(0, 2).map((p) => <p key={p} className="text-ink-muted">{p}</p>)}
          <blockquote className="border-l-[5px] border-line-strong ml-5 pl-5 my-6 font-display text-[19px] text-ink italic">&ldquo;{about.quote}&rdquo;</blockquote>
          <p className="text-ink-muted">{about.quoteBy}</p>
          {about.paragraphs.slice(2).map((p) => <p key={p} className="text-ink-muted">{p}</p>)}
          <div className="text-center pt-6">
            <Image src={images.terrace} alt="The rooftop terrace of Dahab Hostel" width={700} height={450} className="inline-block max-w-full rounded-[4px]" />
          </div>
          <div className="text-center pt-6"><ActionLink href="/contact-us">Contact Us</ActionLink></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
