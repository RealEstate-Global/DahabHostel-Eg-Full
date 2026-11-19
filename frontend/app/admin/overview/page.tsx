export default function OverviewPage() {
  const locale = "ar" === "ar" ? "ar" : "en";

  // Translate texts based on locale
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        overview: "Overview",
        totalTours: "Total Tours",
        activeBookings: "Active Bookings",
        occupancyRate: "Occupancy Rate",
        recentActivity: "Recent Activity",
        newTourAdded: "New tour added",
        priceUpdated: "Price updated",
      },
      ar: {
        overview: "نظرة عامة",
        totalTours: "إجمالي الجولات",
        activeBookings: "الحجوزات النشطة",
        occupancyRate: "معدل الإشغال",
        recentActivity: "نشاط حديث",
        newTourAdded: "جولة جديدة أضيفت",
        priceUpdated: "تم تحديث السعر",
      },
    };
    return translations[key]?.[locale] || translations[key]?.en || key;
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-ink-heading mb-6">
        {t("overview")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Cards */}
        <article className="p-5 rounded-xl border border-border hover:transition-colors hover:border-brand">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-brand-soft flex-shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <path d="M0 0h24v24H0V0z" fill="none" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-ink-muted">
                {t("totalTours")}
              </p>
              <p className="text-2xl font-bold text-ink-heading">24</p>
            </div>
          </div>
        </article>

        <article className="p-5 rounded-xl border border-border hover:transition-colors hover:border-brand">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-brand-soft flex-shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M18 20v-8l-6-4h12l-6 4z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-ink-muted">
                {t("activeBookings")}
              </p>
              <p className="text-2xl font-bold text-ink-heading">156</p>
            </div>
          </div>
        </article>

        <article className="p-5 rounded-xl border border-border">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-surface-soft flex-shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-ink-muted" viewBox="0 0 24 24">
                <path d="M10 8L8 10h4l-2 2-4-4 4-4-2-2h4l2 2 8-8" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-ink-muted">
                {t("occupancyRate")}
              </p>
              <p className="text-2xl font-bold text-ink-heading">78%</p>
            </div>
          </div>
        </article>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 p-5 rounded-xl border border-border">
        <h3 className="text-semibold text-ink-heading mb-4">
          {t("recentActivity")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface/50">
            <svg className="w-5 h-5 text-ink-muted" viewBox="0 0 24 24">
              <path d="M17 2L12 7l-5 5L7 2" />
            </svg>
            <div>
              <p className="font-medium text-ink-heading">
                {t("newTourAdded")}
              </p>
              <p className="text-xs text-ink-muted">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface/50">
            <svg className="w-5 h-5 text-ink-muted" viewBox="0 0 24 24">
              <path d="M17 2L12 7l-5 5L7 2" />
            </svg>
            <div>
              <p className="font-medium text-ink-heading">
                {t("priceUpdated")}
              </p>
              <p className="text-xs text-ink-muted">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}