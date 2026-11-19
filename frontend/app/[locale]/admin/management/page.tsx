import { getTranslations } from "next-intl/server";
import {
  getAdminProfiles,
  getAdminBookingRequests,
  getAdminTourRequests,
  getAdminAirportPickups,
  getAdminContactMessages,
} from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { UserRoleSelect } from "../_components/admin-actions";
import { Users, CalendarCheck, MapPin, Plane, Mail } from "lucide-react";
import { format } from "date-fns";

export default async function ManagementPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string; page?: string; search?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const activeTab = sp.tab ?? "users";
  const page = parseInt(sp.page ?? "1", 10);

  const t = await getTranslations({ locale, namespace: "admin" });
  const tUsers = await getTranslations({ locale, namespace: "admin.usersMgmt" });
  const tBookings = await getTranslations({ locale, namespace: "admin.bookings" });
  const tTourReqs = await getTranslations({ locale, namespace: "admin.tourReqs" });
  const tPickups = await getTranslations({ locale, namespace: "admin.pickups" });
  const tContacts = await getTranslations({ locale, namespace: "admin.contactMsgs" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  let usersRes = { data: [] as Record<string, unknown>[], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  let bookingsRes = { data: [] as Record<string, unknown>[], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  let tourReqsRes = { data: [] as Record<string, unknown>[], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  let pickupsRes = { data: [] as Record<string, unknown>[], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  let contactsRes = { data: [] as Record<string, unknown>[], total: 0, page: 1, pageSize: 20, totalPages: 0 };

  try {
    const [u, b, tr, p, c] = await Promise.all([
      getAdminProfiles({ page: activeTab === "users" ? page : 1, search: sp.search }),
      getAdminBookingRequests({ page: activeTab === "bookings" ? page : 1, search: sp.search }),
      getAdminTourRequests({ page: activeTab === "tour-requests" ? page : 1, search: sp.search }),
      getAdminAirportPickups({ page: activeTab === "pickups" ? page : 1, search: sp.search }),
      getAdminContactMessages({ page: activeTab === "contacts" ? page : 1, search: sp.search }),
    ]);
    usersRes = u as unknown as typeof usersRes;
    bookingsRes = b as unknown as typeof bookingsRes;
    tourReqsRes = tr as unknown as typeof tourReqsRes;
    pickupsRes = p as unknown as typeof pickupsRes;
    contactsRes = c as unknown as typeof contactsRes;
  } catch {
    // Keep empty fallbacks
  }

  const userColumns = [
    { key: "full_name", labelKey: "name" },
    { key: "email", labelKey: "email" },
    { key: "phone", labelKey: "phone" },
    {
      key: "role",
      labelKey: "role",
      render: (row: Record<string, unknown>) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            row.role === "admin"
              ? "bg-destructive/10 text-destructive"
              : row.role === "staff"
                ? "bg-brand/10 text-brand"
                : "bg-surface-soft text-ink-muted"
          }`}
        >
          {String(row.role ?? "guest")}
        </span>
      ),
    },
    {
      key: "created_at",
      labelKey: "createdAt",
      render: (row: Record<string, unknown>) =>
        format(new Date(row.created_at as string), "dd MMM yyyy"),
    },
  ];

  const bookingColumns = [
    { key: "name", labelKey: "name" },
    { key: "email", labelKey: "email" },
    { key: "room", labelKey: "room" },
    {
      key: "check_in",
      labelKey: "checkIn",
      render: (row: Record<string, unknown>) =>
        row.check_in ? format(new Date(row.check_in as string), "dd MMM yyyy") : "—",
    },
    {
      key: "check_out",
      labelKey: "checkOut",
      render: (row: Record<string, unknown>) =>
        row.check_out ? format(new Date(row.check_out as string), "dd MMM yyyy") : "—",
    },
    { key: "guests", labelKey: "guests" },
  ];

  const tourReqColumns = [
    { key: "name", labelKey: "name" },
    { key: "email", labelKey: "email" },
    { key: "guests", labelKey: "guests" },
    { key: "period", labelKey: "period" },
    { key: "destinations", labelKey: "destinations" },
  ];

  const pickupColumns = [
    { key: "name", labelKey: "name" },
    { key: "email", labelKey: "email" },
    { key: "airport", labelKey: "airport" },
    { key: "flight_no", labelKey: "flight" },
    { key: "arrival_date", labelKey: "arrivalDate" },
    { key: "persons", labelKey: "persons" },
  ];

  const contactColumns = [
    { key: "name", labelKey: "name" },
    { key: "email", labelKey: "email" },
    { key: "subject", labelKey: "subject" },
    {
      key: "message",
      labelKey: "message",
      render: (row: Record<string, unknown>) => (
        <span className="line-clamp-2 max-w-xs text-xs text-ink-muted">
          {(row.message as string) || "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-ink-heading">
          {t("managementPage.title")}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          {t("managementPage.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <a
          href={`/${locale}/admin/management?tab=users`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "users"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tUsers("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{usersRes.total}</p>
            </div>
          </div>
        </a>

        <a
          href={`/${locale}/admin/management?tab=bookings`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "bookings"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tBookings("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{bookingsRes.total}</p>
            </div>
          </div>
        </a>

        <a
          href={`/${locale}/admin/management?tab=tour-requests`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "tour-requests"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-star/10 text-star">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tTourReqs("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{tourReqsRes.total}</p>
            </div>
          </div>
        </a>

        <a
          href={`/${locale}/admin/management?tab=pickups`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "pickups"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-star/10 text-star">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tPickups("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{pickupsRes.total}</p>
            </div>
          </div>
        </a>

        <a
          href={`/${locale}/admin/management?tab=contacts`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "contacts"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-soft text-ink-muted">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tContacts("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{contactsRes.total}</p>
            </div>
          </div>
        </a>
      </div>

      {/* Tab content */}
      {activeTab === "users" && (
        <AdminDataTable
          columns={userColumns}
          data={usersRes.data}
          total={usersRes.total}
          page={usersRes.page}
          pageSize={usersRes.pageSize}
          totalPages={usersRes.totalPages}
          emptyMessage={tUsers("empty")}
          locale={locale}
          basePath={`/${locale}/admin/management`}
          actions={(row) => (
            <UserRoleSelect
              id={row.id as string}
              currentRole={(row.role as string) ?? "guest"}
            />
          )}
        />
      )}

      {activeTab === "bookings" && (
        <AdminDataTable
          columns={bookingColumns}
          data={bookingsRes.data}
          total={bookingsRes.total}
          page={bookingsRes.page}
          pageSize={bookingsRes.pageSize}
          totalPages={bookingsRes.totalPages}
          emptyMessage={tBookings("empty")}
          locale={locale}
          basePath={`/${locale}/admin/management`}
        />
      )}

      {activeTab === "tour-requests" && (
        <AdminDataTable
          columns={tourReqColumns}
          data={tourReqsRes.data}
          total={tourReqsRes.total}
          page={tourReqsRes.page}
          pageSize={tourReqsRes.pageSize}
          totalPages={tourReqsRes.totalPages}
          emptyMessage={tTourReqs("empty")}
          locale={locale}
          basePath={`/${locale}/admin/management`}
        />
      )}

      {activeTab === "pickups" && (
        <AdminDataTable
          columns={pickupColumns}
          data={pickupsRes.data}
          total={pickupsRes.total}
          page={pickupsRes.page}
          pageSize={pickupsRes.pageSize}
          totalPages={pickupsRes.totalPages}
          emptyMessage={tPickups("empty")}
          locale={locale}
          basePath={`/${locale}/admin/management`}
        />
      )}

      {activeTab === "contacts" && (
        <AdminDataTable
          columns={contactColumns}
          data={contactsRes.data}
          total={contactsRes.total}
          page={contactsRes.page}
          pageSize={contactsRes.pageSize}
          totalPages={contactsRes.totalPages}
          emptyMessage={tContacts("empty")}
          locale={locale}
          basePath={`/${locale}/admin/management`}
        />
      )}
    </div>
  );
}
