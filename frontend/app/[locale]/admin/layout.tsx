import React from "react";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProfile } from "@/utils/supabase/auth";
import { AdminShell } from "./_components/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // ── Auth guard: require admin role ────────────────────────────────────────
  let profile;
  try {
    profile = await getProfile();
  } catch {
    // DB or Supabase unavailable
    profile = null;
  }

  // Optional local dev inspection mode only when explicitly enabled
  if (!profile && process.env.NODE_ENV === "development" && process.env.ADMIN_DEV_BYPASS === "true") {
    profile = {
      id: "dev-admin-id",
      email: "admin@dahabhostel.com",
      full_name: "Admin Developer",
      role: "admin",
      avatar_url: null,
      phone: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  if (!profile) {
    // Not logged in → redirect to login
    redirect(`/${locale}/login?next=/${locale}/admin/overview`);
  }

  if (profile.role !== "admin" && profile.role !== "staff") {
    // Logged in but not admin/staff → show clean Forbidden screen
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-soft p-4" dir={locale === "ar" ? "rtl" : "ltr"}>
        <div className="card-modern max-w-md p-8 text-center shadow-card ring-subtle">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-ink-heading mb-2">
            {locale === "ar" ? "الوصول مرفوض (403)" : "Access Denied (403)"}
          </h1>
          <p className="text-sm text-ink-muted mb-6">
            {t("auth.forbidden")}
          </p>
          <div className="flex justify-center gap-3">
            <a href={`/${locale}`} className="btn-outline text-xs px-4 py-2">
              {locale === "ar" ? "الرئيسية" : "Home"}
            </a>
            <a href={`/${locale}/login`} className="btn-primary text-xs px-4 py-2">
              {t("header.logout")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminShell
      locale={locale}
      profile={{
        name: profile.full_name ?? profile.email ?? "",
        email: profile.email ?? "",
        avatar: profile.avatar_url ?? undefined,
        role: profile.role,
      }}
    >
      {children}
    </AdminShell>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.meta" });
  return { title: t("title"), description: t("description") };
}
