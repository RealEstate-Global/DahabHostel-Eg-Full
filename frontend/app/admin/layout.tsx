import "./globals.css";
import { SidebarNavItem } from "@/app/_components/sidebar-nav-item";
import { ThemeToggle } from "@/app/_components/dahab/theme-toggle";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/_lib/auth-options";
import { usePathname } from "next/navigation";

import OverviewPage from "@/app/admin/overview/page";
import ContentPage from "@/app/admin/content/page";
import ManagementPage from "@/app/admin/management/page";
import AnalyticsPage from "@/app/admin/analytics/page";

export const metadata = {
  title: "Admin Dashboard - Dahab Hostel",
  description: "Admin dashboard for Dahab Hostel Cairo - Content Management & Analytics",
};

export default async function AdminLayout() {
  const session = await getServerSession(authOptions);
  const pathname = usePathname();

  // Direct access for now - no login required
  // In production, you would add: if (!session) return <Redirect to="/login" />

  const locale = pathname.split("/")[2] || "en";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="min-h-screen bg-background text-text">
        <div className="flex h-screen">

          {/* Sidebar */}
          <aside className="w-64 bg-sidebar flex-shrink-0 border-r border-border flex flex-col">
            <div className="flex h-16 items-center justify-between px-6 border-b border-border">
              <h2 className="text-xl font-bold text-ink-heading">
                <a href="/admin/overview" className="hover:text-brand transition-colors">
                  Dahab Admin
                </a>
              </h2>
              <ThemeToggle />
            </div>

            <nav className="flex-1 flex flex-col overflow-y-auto p-4 space-y-2">
              <SidebarNavItem
                items={[
                  { label: "Overview", href: "/admin/overview", icon: "LayoutDashboard" },
                  { label: "Content", href: "/admin/content", icon: "LibraryBooks" },
                  { label: "Management", href: "/admin/management", icon: "Settings" },
                  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
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
              {pathname === "/admin/overview" && <OverviewPage />}
              {pathname === "/admin/content" && <ContentPage />}
              {pathname === "/admin/management" && <ManagementPage />}
              {pathname === "/admin/analytics" && <AnalyticsPage />}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}