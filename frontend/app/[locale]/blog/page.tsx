import Image from "next/image";
import { Header, Footer, PageHero } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { blogPosts, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({ title: "Our News Blog — Dahab Hostel", description: "Travel tips and news from Dahab Hostel in Downtown Cairo.", locale });
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title="Our News Blog" subtitle="Stories, travel tips and updates from Dahab Hostel Cairo." image={images.homeBanner} />
        <div className="container-page section-pad grid grid-cols-1 sm:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.title} className="border border-line rounded-2xl overflow-hidden">
              <div className="relative w-full aspect-[4/3]"><Image src={post.image} alt={post.title} fill sizes="33vw" className="object-cover" /></div>
              <div className="p-6"><h2 className="font-display text-[20px] text-ink leading-snug">{post.title}</h2></div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
