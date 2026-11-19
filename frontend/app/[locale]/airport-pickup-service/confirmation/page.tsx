import { Header, Footer } from "@/app/_components/dahab";
import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PickupConfirmation({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "confirmation.pickup" });
  const href = (p: string) => `/${locale}${p}`;
  return (
    <>
      <Header />
      <main className="bg-surface-soft flex-1 min-h-[60vh]">
        <div className="container-page py-20 md:py-28">
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 max-w-[640px] mx-auto">
            <div className="shrink-0 w-14 h-14 rounded-full border-[3px] border-success bg-success-soft/40 flex items-center justify-center text-success"><CheckCircle2 size={32} strokeWidth={3} /></div>
            <div className="pt-0.5">
              <h1 className="font-display text-[28px] md:text-[32px] text-ink-heading leading-snug mb-1">{t("title")}</h1>
              <p className="font-display text-[22px] md:text-[26px] text-ink-heading leading-snug mb-5">{t("sent")}</p>
              <p className="text-[15px] text-ink-muted leading-relaxed mb-2">{t("reply")}</p>
              <p className="text-[15px] text-ink-muted leading-relaxed">{t("questions")} <a className="text-brand hover:underline" href={href("/contact-us")}>{t("contact")}</a>.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
