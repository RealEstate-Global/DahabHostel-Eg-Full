import React from "react";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProfile } from "@/utils/supabase/auth";
import { AdminShell } from "./_components/admin-shell";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "es" }, { locale: "fr" }];
}

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
    // DB or Supabase unavailable — show unauthorized
    profile = null;
  }

  if (!profile || (profile.role !== "admin" && profile.role !== "staff")) {
    // Not logged in or not admin → redirect to login with return URL
    redirect(`/${locale}/login?next=/${locale}/admin/overview`);
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
