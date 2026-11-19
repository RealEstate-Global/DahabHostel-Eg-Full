"use client";

import { Header, Footer } from "@/app/_components/dahab";
import { site } from "@/app/_data";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TermsOfServicePage() {
  const t = useTranslations("legal.terms");

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
              <p className="eyebrow mb-2">Legal Terms</p>
              <h1 className="heading-display mb-3">
                {t("title")}
              </h1>
              <p className="text-sm font-medium text-ink-muted">
                {t("lastUpdated")} {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-10 text-ink leading-relaxed">
              {/* Agreement to Terms */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.agreement.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.agreement.content")}
                </p>
              </section>

              {/* Use License */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.license.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.license.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.license.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Booking and Reservations */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.booking.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.booking.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.booking.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.payment.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.payment.content")}
                </p>
              </section>

              {/* Cancellation and Refund */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.cancellation.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.cancellation.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.cancellation.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Travel Documents */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.travel_docs.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.travel_docs.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.travel_docs.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.liability.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.liability.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.liability.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* User Conduct */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.conduct.title")}
                </h2>
                <p className="mb-4 text-ink">
                  {t("sections.conduct.intro")}
                </p>
                <ul className="list-disc space-y-2 pl-6 text-ink">
                  {t.raw("sections.conduct.items").map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.ip.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.ip.content")}
                </p>
              </section>

              {/* Dispute Resolution */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.dispute.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.dispute.content")}
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="mb-3 font-display text-2xl font-bold text-ink-heading">
                  {t("sections.changes.title")}
                </h2>
                <p className="text-ink">
                  {t("sections.changes.content")}
                </p>
              </section>

              {/* Contact Information */}
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
