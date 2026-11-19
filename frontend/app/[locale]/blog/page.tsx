import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Header, Footer, PageHero } from "@/app/_components/dahab";
import { generateSEO } from "@/app/_lib/seo";
import { blogPosts, images } from "@/app/_data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return generateSEO({ title: t("title"), description: t("subtitle"), locale });
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });

  return (
    <>
      <Header />
      <main className="bg-surface">
        <PageHero title={t("title")} subtitle={t("subtitle")} image={images.homeBanner} />
        <div className="container-page section-pad grid grid-cols-1 sm:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.title} className="card-modern overflow-hidden shadow-soft ring-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
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
