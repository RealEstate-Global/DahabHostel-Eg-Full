import { getTranslations } from "next-intl/server";
import {
  getBookingRequestsByDate,
  getRequestsByType,
  getAdminRooms,
  getAdminTours,
  getAdminReviews,
} from "@/utils/supabase/admin-queries";
import { RequestsBarChart, RequestsPieChart } from "../_components/overview-charts";

export default async function AnalyticsAdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ days?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "admin.analyticsPage" });

  const days = parseInt(sp.days ?? "30", 10);

  let chartData: Awaited<ReturnType<typeof getBookingRequestsByDate>> = [];
  let pieData: Awaited<ReturnType<typeof getRequestsByType>> = [];
  let rooms: Awaited<ReturnType<typeof getAdminRooms>> = [];
  let tours: Awaited<ReturnType<typeof getAdminTours>> = [];
  let reviews: Awaited<ReturnType<typeof getAdminReviews>> = {
    data: [],
    total: 0,
    page: 1,
    pageSize: 100,
    totalPages: 0,
  };
  try {
    [chartData, pieData, rooms, tours, reviews] = await Promise.all([
      getBookingRequestsByDate(days),
      getRequestsByType(),
      getAdminRooms(),
      getAdminTours(),
      getAdminReviews({ pageSize: 100 }),
    ]);
  } catch {
    chartData = [];
    pieData = [];
    rooms = [];
    tours = [];
    reviews = {
      data: [],
      total: 0,
      page: 1,
      pageSize: 100,
      totalPages: 0,
    };
  }

  // Calculate real metrics
  const totalCapacity = rooms.reduce((acc, r) => acc + (r.capacity ?? 1), 0);
  const avgRating =
    reviews.data.length > 0
      ? (
          reviews.data.reduce((acc, r) => acc + (r.rating ?? 0), 0) /
          reviews.data.length
        ).toFixed(1)
      : "—";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
        </div>

        {/* Date range filters */}
        <div className="flex items-center gap-2">
          <a
            href={`/${locale}/admin/analytics?days=7`}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              days === 7
                ? "bg-brand text-white"
                : "border border-line bg-surface text-ink-muted hover:text-ink-heading"
            }`}
          >
            {t("last7")}
          </a>
          <a
            href={`/${locale}/admin/analytics?days=30`}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              days === 30
                ? "bg-brand text-white"
                : "border border-line bg-surface text-ink-muted hover:text-ink-heading"
            }`}
          >
            {t("last30")}
          </a>
          <a
            href={`/${locale}/admin/analytics?days=90`}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              days === 90
                ? "bg-brand text-white"
                : "border border-line bg-surface text-ink-muted hover:text-ink-heading"
            }`}
          >
            {t("last90")}
          </a>
        </div>
      </div>

      {/* Summary KPI Cards from real calculations */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="text-sm text-ink-muted">{t("roomDistribution")}</p>
          <p className="mt-1 text-2xl font-bold text-ink-heading">{rooms.length}</p>
          <p className="mt-0.5 text-xs text-ink-muted">Total bed capacity: {totalCapacity}</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="text-sm text-ink-muted">{t("tourInventory")}</p>
          <p className="mt-1 text-2xl font-bold text-ink-heading">{tours.length}</p>
          <p className="mt-0.5 text-xs text-ink-muted">{tours.filter((t) => t.is_active).length} active</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="text-sm text-ink-muted">{t("reviewRatings")}</p>
          <p className="mt-1 text-2xl font-bold text-ink-heading">{avgRating} / 5</p>
          <p className="mt-0.5 text-xs text-ink-muted">{reviews.total} total reviews</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="text-sm text-ink-muted">{t("requestsByType")}</p>
          <p className="mt-1 text-2xl font-bold text-ink-heading">
            {pieData.reduce((acc, d) => acc + d.value, 0)}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">Total incoming requests</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-line bg-surface p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-ink-heading">
            {t("bookingsOverTime")} ({days}d)
          </h3>
          <RequestsBarChart data={chartData} />
        </div>

        <div className="rounded-xl border border-line bg-surface p-5">
          <h3 className="mb-4 text-sm font-semibold text-ink-heading">
            {t("requestsByType")}
          </h3>
          <RequestsPieChart data={pieData} locale={locale} />
        </div>
      </div>
    </div>
  );
}
