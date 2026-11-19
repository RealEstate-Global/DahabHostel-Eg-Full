"use client";

import { Header, Footer } from "@/app/_components/dahab";
import { site } from "@/app/_data";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("legal.privacy");

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
              <p className="eyebrow mb-2">Legal Policy</p>
              <h1 className="heading-display mb-3">
                {t("title")}
              </h1>
              <p className="text-sm font-medium text-ink-muted">
                {t("lastUpdated")} {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-10 text-ink leading-relaxed">
              {/* Introduction */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.intro.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.intro.content")}
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.collect.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.collect.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.collect.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.use.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.use.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.use.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.cookies.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.cookies.content")}
                </p>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.sharing.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.sharing.intro")}
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.sharing.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="rounded-xl bg-surface-soft p-4 text-sm text-ink-muted ring-subtle">
                  {t("sections.sharing.note")}
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.security.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.security.content")}
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.rights.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.rights.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.rights.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.children.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.children.content")}
                </p>
              </section>

              {/* International Data Transfers */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.international.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.international.content")}
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.updates.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.updates.content")}
                </p>
              </section>

              {/* Contact Us */}
              <section className="rounded-2xl border border-line bg-surface-soft/60 p-6 ring-subtle">
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.contact.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.contact.intro")}
                </p>
                <ul className="space-y-2 text-sm text-ink-muted">
                  <li><span className="font-semibold text-ink">Email:</span> {site.email}</li>
                  <li><span className="font-semibold text-ink">Phone:</span> {site.phone}</li>
                  <li><span className="font-semibold text-ink">Address:</span> {site.address}</li>
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
