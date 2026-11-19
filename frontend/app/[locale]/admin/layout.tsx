import React from "react";
import { SidebarNavItem } from "@/app/_components/sidebar-nav-item";
import { ThemeToggle } from "@/app/_components/dahab/theme-toggle";


export const metadata = {
  title: "Admin Dashboard - Dahab Hostel",
  description: "Admin dashboard for Dahab Hostel Cairo - Content Management & Analytics",
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Direct access for now - no login required
  // In production, you would add: if (!session) return <Redirect to="/login" />

  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "en";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar flex-shrink-0 border-r border-border flex flex-col">
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <h2 className="text-xl font-bold text-ink-heading">
            <a href={`/${locale}/admin/overview`} className="hover:text-brand transition-colors">
              Dahab Admin
            </a>
          </h2>
          <ThemeToggle />
        </div>

        <nav className="flex-1 flex flex-col overflow-y-auto p-4 space-y-2">
          <SidebarNavItem
            items={[
              { label: "Overview", href: `/${locale}/admin/overview`, icon: "LayoutDashboard" },
              { label: "Content", href: `/${locale}/admin/content`, icon: "LibraryBooks" },
              { label: "Management", href: `/${locale}/admin/management`, icon: "Settings" },
              { label: "Analytics", href: `/${locale}/admin/analytics`, icon: "BarChart3" },
            ]}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-ink-heading">
            {locale === "ar" ? "لوحة تحكم" : "Admin Dashboard"}
          </h1>
        </header>

        <div className="min-h-[400px]">
          {children}
        </div>
      </main>
    </div>
  );
}