import React from "react";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProfile } from "@/utils/supabase/auth";
import { AdminShell } from "./_components/admin-shell";
import { AdminLoadError } from "./_components/admin-load-error";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });

  // ── Auth guard: admin-only until staff permissions are explicitly modeled. ──
  let profile;
  let profileLoadError = false;
  try {
    profile = await getProfile();
  } catch {
    profileLoadError = true;
    profile = null;
  }

  if (profileLoadError) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-surface-soft p-4" dir={locale === "ar" ? "rtl" : "ltr"}>
        <div className="w-full max-w-xl">
          <AdminLoadError locale={locale} retryHref={`/${locale}/admin/overview`} />
        </div>
      </div>
    );
  }

  if (!profile) {
    // Not logged in → redirect to login
    redirect(`/${locale}/login?next=/${locale}/admin/overview`);
  }

  if (profile.role !== "admin") {
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
            {t("auth.forbidden")}
          </h1>
          <p className="text-sm text-ink-muted mb-6">
            {t("auth.unauthorized")}
          </p>
          <div className="flex justify-center gap-3">
            <a href={`/${locale}`} className="btn-outline text-xs px-4 py-2">
              {t("nav.overview")}
            </a>
            <a href={`/${locale}/login`} className="btn-primary text-xs px-4 py-2">
              {t("auth.signIn")}
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
  const tMeta = await getTranslations({ locale, namespace: "admin.meta" });
  return { title: tMeta("title"), description: tMeta("description") };
}
