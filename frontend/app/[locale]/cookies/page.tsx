"use client";

import { Header, Footer } from "@/app/_components/dahab";
import { site } from "@/app/_data";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function CookiePolicyPage() {
  const t = useTranslations("legal.cookies");
  const tLabels = useTranslations("common.legalLabels");
  const locale = useLocale();

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-surface-soft py-12 sm:py-20">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-modern p-6 sm:p-12 shadow-soft ring-subtle"
          >
            <div className="mb-10 border-b border-line pb-8">
              <p className="eyebrow mb-2">{tLabels("policy")}</p>
              <h1 className="heading-display mb-3">
                {t("title")}
              </h1>
              <p className="text-sm font-medium text-ink-muted">
                {t("lastUpdated")} {new Date().toLocaleDateString(locale)}
              </p>
            </div>

            <div className="space-y-10 text-ink leading-relaxed">
              {/* Section 1: What Are Cookies */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.what.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.what.content")}
                </p>
              </section>

              {/* Section 2: How We Use Cookies */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.how.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.how.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.how.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 3: Types of Cookies */}
              <section>
                <h2 className="mb-6 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.types.title")}
                </h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {["essential", "performance", "functionality", "targeting"].map((type) => (
                    <div key={type} className="rounded-2xl border border-line bg-surface-soft/60 p-5 ring-subtle">
                      <h3 className="mb-2 font-display text-lg font-bold text-ink-heading">
                        {t(`sections.types.${type}.title`)}
                      </h3>
                      <p className="mb-3 text-sm text-ink-muted">
                        {t(`sections.types.${type}.description`)}
                      </p>
                      <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                        Duration: {t(`sections.types.${type}.duration`)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Third-Party Cookies */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.third_party.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.third_party.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.third_party.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 5: Managing Cookies */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.managing.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.managing.intro")}
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.managing.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="rounded-xl bg-surface-soft p-4 text-sm text-ink-muted ring-subtle">
                  {t("sections.managing.note")}
                </p>
              </section>

              {/* Section 6: Browser Instructions */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.browser.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.browser.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.browser.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 7: Local Storage */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.storage.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.storage.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.storage.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 8: DNT Signals */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.dnt.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.dnt.content")}
                </p>
              </section>

              {/* Section 9: Updates */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.updates.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.updates.content")}
                </p>
              </section>

              {/* Section 10: Contact */}
              <section className="rounded-2xl border border-line bg-surface-soft/60 p-6 ring-subtle">
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.contact.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.contact.intro")}
                </p>
                <ul className="space-y-2 text-sm text-ink-muted">
                  <li><span className="font-semibold text-ink">{tLabels("email")}</span> {site.email}</li>
                  <li><span className="font-semibold text-ink">{tLabels("phone")}</span> {site.phone}</li>
                  <li><span className="font-semibold text-ink">{tLabels("address")}</span> {site.address}</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
