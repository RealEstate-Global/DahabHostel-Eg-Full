import { getTranslations } from "next-intl/server";
import { getAdminRooms } from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { RoomRowActions } from "../_components/admin-actions";
import { RoomEditor } from "../_components/room-editor";
import type { Database } from "@/utils/supabase/types";

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.rooms" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  let rooms: Record<string, unknown>[] = [];
  let loadError = false;
  try {
    const data = await getAdminRooms();
    rooms = data as unknown as Record<string, unknown>[];
  } catch {
    loadError = true;
  }

  const columns = [
    { key: "name", labelKey: "name" },
    { key: "slug", labelKey: "slug" },
    {
      key: "category",
      labelKey: "category",
      render: (row: Record<string, unknown>) => (
        <span className="rounded-full bg-surface-soft px-2.5 py-0.5 text-xs font-medium text-ink-heading">
          {String(row.category ?? "—")}
        </span>
      ),
    },
    {
      key: "price_egp",
      labelKey: "price",
      render: (row: Record<string, unknown>) => `${row.price_egp} EGP`,
    },
    { key: "capacity", labelKey: "capacity" },
    {
      key: "is_active",
      labelKey: "status",
      render: (row: Record<string, unknown>) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            row.is_active
              ? "bg-success/10 text-success"
              : "bg-surface-soft text-ink-muted"
          }`}
        >
          {row.is_active ? tTable("active") : tTable("inactive")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand">
            {t("roomCount", { count: rooms.length })}
          </span>
          <RoomEditor />
        </div>
      </div>

      <AdminDataTable
        columns={columns}
        data={rooms}
        total={rooms.length}
        page={1}
        pageSize={100}
        totalPages={1}
        emptyMessage={t("empty")}
        locale={locale}
        basePath={`/${locale}/admin/rooms`}
        loadError={loadError}
        actions={(row) => (
          <RoomRowActions room={row as unknown as Database["public"]["Tables"]["rooms"]["Row"]} />
        )}
      />
    </div>
  );
}
