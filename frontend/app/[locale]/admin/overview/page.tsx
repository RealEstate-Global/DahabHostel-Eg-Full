import { getTranslations } from "next-intl/server";
import {
  CalendarCheck,
  MapPin,
  Plane,
  Mail,
  BedDouble,
  Route,
  Star,
  FileText,
  Users,
  MessageSquare,
} from "lucide-react";
import { KpiCard } from "../_components/kpi-card";
import { RecentActivityList } from "../_components/recent-activity";
import { RequestsBarChart, RequestsPieChart } from "../_components/overview-charts";
import {
  getDashboardCounts,
  getRecentActivity,
  getBookingRequestsByDate,
  getRequestsByType,
} from "@/utils/supabase/admin-queries";

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.overview" });

  // Fetch all data in parallel
  let counts: Awaited<ReturnType<typeof getDashboardCounts>>;
  let activity: Awaited<ReturnType<typeof getRecentActivity>>;
  let chartData: Awaited<ReturnType<typeof getBookingRequestsByDate>>;
  let pieData: Awaited<ReturnType<typeof getRequestsByType>>;
  try {
    [counts, activity, chartData, pieData] = await Promise.all([
      getDashboardCounts(),
      getRecentActivity(10),
      getBookingRequestsByDate(30),
      getRequestsByType(),
    ]);
  } catch {
    // If DB is unavailable, show empty state
    counts = {
      bookingRequests: 0,
      tourRequests: 0,
      airportPickups: 0,
      contactMessages: 0,
      activeRooms: 0,
      totalRooms: 0,
      activeTours: 0,
      totalTours: 0,
      pendingReviews: 0,
      approvedReviews: 0,
      publishedPosts: 0,
      totalProfiles: 0,
    };
    activity = [];
    chartData = [];
    pieData = [];
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
        <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <KpiCard
          label={t("bookingRequests")}
          value={counts.bookingRequests}
          icon={CalendarCheck}
          variant="brand"
        />
        <KpiCard
          label={t("tourRequests")}
          value={counts.tourRequests}
          icon={MapPin}
          variant="success"
        />
        <KpiCard
          label={t("airportPickups")}
          value={counts.airportPickups}
          icon={Plane}
          variant="warning"
        />
        <KpiCard
          label={t("contactMessages")}
          value={counts.contactMessages}
          icon={Mail}
          variant="default"
        />
        <KpiCard
          label={t("pendingReviews")}
          value={counts.pendingReviews}
          icon={Star}
          variant="destructive"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label={t("activeRooms")}
          value={counts.activeRooms}
          subtitle={t("ofTotal", { total: counts.totalRooms })}
          icon={BedDouble}
          variant="brand"
        />
        <KpiCard
          label={t("activeTours")}
          value={counts.activeTours}
          subtitle={t("ofTotal", { total: counts.totalTours })}
          icon={Route}
          variant="success"
        />
        <KpiCard
          label={t("publishedPosts")}
          value={counts.publishedPosts}
          icon={FileText}
          variant="default"
        />
        <KpiCard
          label={t("totalUsers")}
          value={counts.totalProfiles}
          icon={Users}
          variant="default"
        />
      </div>

      {/* Charts + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bar Chart */}
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-soft lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-ink-heading">
            {t("requestsOverTime")}
          </h3>
          <RequestsBarChart data={chartData} />
        </div>

        {/* Pie Chart */}
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="mb-4 text-sm font-semibold text-ink-heading">
            {t("requestsByType")}
          </h3>
          <RequestsPieChart data={pieData} locale={locale} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-soft">
        <h3 className="mb-4 text-sm font-semibold text-ink-heading">
          {t("recentActivity")}
        </h3>
        <RecentActivityList items={activity} locale={locale} />
      </div>
    </div>
  );
}
