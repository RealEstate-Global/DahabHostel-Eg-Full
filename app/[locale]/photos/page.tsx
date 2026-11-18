import { Header, Footer, PageHero, GalleryGrid } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { gallery, images, site } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Photos of Dahab Hostel Cairo", description: "See our rooms, dorms, rooftop terrace and the view over Downtown Cairo. Real photos taken at the hostel.", locale });
}

export default async function PhotosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Photos of Dahab Hostel Cairo" subtitle="See our rooms, dorms, rooftop terrace and the view over Downtown Cairo. Real photos of the hostel, taken at the hostel." image={images.terrace} />
        <div className="container-page section-pad">
          <h2 className="font-display text-[24px] text-ink mb-6">Our Rooms &amp; Common Areas</h2>
          <GalleryGrid photos={gallery} />
          <hr className="border-t border-line-strong my-10" />
          <h2 className="font-display text-[24px] text-ink mb-6">Watch a Video Review</h2>
          <div className="mx-auto max-w-[640px] my-8 aspect-video">
            <iframe className="w-full h-full border-0" src={`https://www.youtube.com/embed/${site.youtubeVideoId}`} title="Dahab Hostel video review" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <p className="text-center text-ink-muted">Travelling to Egypt: Is it Safe? Real travelers at Dahab Hostel in Cairo share their thoughts.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
