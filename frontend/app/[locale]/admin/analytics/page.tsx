export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "es" }, { locale: "fr" }];
}

export default function AnalyticsPage() {
  const locale = "ar" === "ar" ? "ar" : "en";

  // Translate texts based on locale
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        analytics: "Analytics",
        dailyVisitors: "Daily Visitors",
        bookingsToday: "Bookings Today",
        conversionRate: "Conversion rate",
        revenueToday: "Revenue Today",
        bookingsOverTime: "Bookings Over Time",
        trafficSources: "Traffic Sources",
        demographics: "Guest Demographics",
        keyPerformance: "Key Performance Indicators",
        occupancyRate: "Occupancy Rate",
        averageBookingValue: "Average Booking Value",
      },
      ar: {
        analytics: "التحليلات",
        dailyVisitors: "زوار اليومية",
        bookingsToday: "حجوزات اليوم",
        conversionRate: "معدل التحويل",
        revenueToday: "إيرادات اليوم",
        bookingsOverTime: "الحجوزات عبر الزمن",
        trafficSources: "مصادر الحركة",
        demographics: " demographics",
        keyPerformance: "المؤشرات الرئيسية للأداء",
        occupancyRate: "معدل الإشغال",
        averageBookingValue: "متوسط قيمة الحجز",
      },
    };
    return translations[key]?.[locale] || translations[key]?.en || key;
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-ink-heading mb-6">
        {t("analytics")}
      </h2>

      {/* Traffic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Daily Visitors Card */}
        <div className="p-6 rounded-xl border border-border">
          <h5 className="font-medium text-ink-muted mb-3">
            {t("dailyVisitors")}
          </h5>
          <p className="text-3xl font-bold text-ink-heading">1,247</p>
          <p className="text-sm text-ink-muted">Today</p>
        </div>

        {/* Booking Conversions Card */}
        <div className="p-6 rounded-xl border border-border">
          <h5 className="font-medium text-ink-muted mb-3">
            {t("bookingsToday")}
          </h5>
          <p className="text-3xl font-bold text-ink-heading">23</p>
          <p className="text-sm text-ink-muted">
            {t("conversionRate")}: 3.2%
          </p>
        </div>

        {/* Revenue Card */}
        <div className="p-6 rounded-xl border border-border">
          <h5 className="font-medium text-ink-muted mb-3">
            {t("revenueToday")}
          </h5>
          <p className="text-3xl font-bold text-ink-heading">$4,580</p>
          <p className="text-sm text-ink-muted">USD</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Over Time */}
        <div className="p-6 rounded-xl border border-border">
          <h5 className="font-medium text-ink-muted mb-3">
            {t("bookingsOverTime")}
          </h5>
          <div className="h-40 rounded-lg bg-surface relative">
            {/* Chart placeholder would go here */}
            <p className="text-center text-ink-muted absolute inset-0">Chart</p>
          </div>
        </div>

        {/* Source Analysis */}
        <div className="p-6 rounded-xl border border-border">
          <h5 className="font-medium text-ink-muted mb-3">
            {t("trafficSources")}
          </h5>
          <ul className="list-disc list-inside space-y-2 text-sm text-ink-muted">
            <li>Organic Search: 45%</li>
            <li>Direct: 30%</li>
            <li>Social: 15%</li>
            <li>Referral: 10%</li>
          </ul>
        </div>

        {/* Demographics */}
        <div className="p-6 rounded-xl border border-border">
          <h5 className="font-medium text-ink-muted mb-3">
            {t("demographics")}
          </h5>
          <p className="text-xs text-ink-muted">
            Distribution by country visualized in chart
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-8 p-6 rounded-xl border border-border">
        <h5 className="font-medium text-ink-heading mb-4">
          {t("keyPerformance")}
        </h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-ink-muted">
              {t("occupancyRate")}
            </p>
            <p className="text-2xl font-bold text-ink-heading">78%</p>
          </div>
          <div>
            <p className="text-sm text-ink-muted">
              {t("averageBookingValue")}
            </p>
            <p className="text-2xl font-bold text-ink-heading">$187</p>
          </div>
        </div>
      </div>
    </section>
  );
}