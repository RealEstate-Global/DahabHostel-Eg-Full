"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/app/_components/dahab/theme-toggle";
import { LangSwitcher } from "@/app/_components/dahab/lang-switcher";
import { cn } from "@/app/_lib/utils";
import {
  LayoutDashboard,
  CalendarCheck,
  MapPin,
  Plane,
  BedDouble,
  Route,
  Ticket,
  Image,
  FileText,
  Star,
  Mail,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { adminSignOut } from "../_actions";

interface AdminShellProps {
  locale: string;
  profile: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  children: React.ReactNode;
}

interface NavItem {
  key: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  labelKey: string;
  items: NavItem[];
}

function getNavGroups(locale: string): NavGroup[] {
  const base = `/${locale}/admin`;
  return [
    {
      labelKey: "nav.overview",
      items: [
        { key: "nav.overview", href: `${base}/overview`, icon: LayoutDashboard },
      ],
    },
    {
      labelKey: "nav.groupRequests",
      items: [
        { key: "nav.management", href: `${base}/management`, icon: Settings },
        { key: "nav.bookings", href: `${base}/bookings`, icon: CalendarCheck },
        { key: "nav.tourRequests", href: `${base}/tour-requests`, icon: MapPin },
        { key: "nav.airportPickups", href: `${base}/airport-pickups`, icon: Plane },
        { key: "nav.contacts", href: `${base}/contacts`, icon: Mail },
      ],
    },
    {
      labelKey: "nav.groupContent",
      items: [
        { key: "nav.content", href: `${base}/content`, icon: FileText },
        { key: "nav.rooms", href: `${base}/rooms`, icon: BedDouble },
        { key: "nav.tours", href: `${base}/tours`, icon: Route },
        { key: "nav.entranceFees", href: `${base}/entrance-fees`, icon: Ticket },
        { key: "nav.gallery", href: `${base}/gallery`, icon: Image },
        { key: "nav.blog", href: `${base}/blog`, icon: FileText },
        { key: "nav.reviews", href: `${base}/reviews`, icon: Star },
      ],
    },
    {
      labelKey: "nav.groupManagement",
      items: [
        { key: "nav.users", href: `${base}/users`, icon: Users },
        { key: "nav.analytics", href: `${base}/analytics`, icon: BarChart3 },
        { key: "nav.settings", href: `${base}/settings`, icon: Settings },
      ],
    },
  ];
}

export function AdminShell({ locale, profile, children }: AdminShellProps) {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navGroups = getNavGroups(locale);
  const isRTL = locale === "ar";

  const closeMobile = useCallback(() => setSidebarOpen(false), []);

  // Find current page title
  let currentTitle = t("nav.overview");
  for (const group of navGroups) {
    for (const item of group.items) {
      if (pathname.includes(item.href)) {
        currentTitle = t(item.key);
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background" dir={isRTL ? "rtl" : "ltr"}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col border-line bg-surface transition-all duration-300 lg:relative lg:z-auto",
          isRTL ? "right-0 border-s" : "left-0 border-e",
          sidebarOpen
            ? "translate-x-0"
            : isRTL
              ? "translate-x-full lg:translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-[68px]" : "w-64"
        )}
      >
        {/* Brand */}
        <div className="flex h-14 items-center justify-between border-b border-line px-4">
          {!collapsed && (
            <Link
              href={`/${locale}/admin/overview`}
              className="text-lg font-bold text-ink-heading transition-colors hover:text-brand"
            >
              {t("nav.brand")}
            </Link>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink-heading lg:block"
            aria-label={collapsed ? t("nav.expand") : t("nav.collapse")}
          >
            {isRTL ? (
              collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
          </button>
          {/* Mobile close */}
          <button
            onClick={closeMobile}
            className="rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-surface-soft lg:hidden"
            aria-label={t("nav.closeMenu")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group, gi) => (
            <div key={gi} className="mb-4">
              {!collapsed && (
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                  {t(group.labelKey)}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        collapsed && "justify-center px-2",
                        isActive
                          ? "bg-brand/10 text-brand"
                          : "text-ink-muted hover:bg-surface-soft hover:text-ink-heading"
                      )}
                      title={collapsed ? t(item.key) : undefined}
                    >
                      <Icon className={cn("h-[18px] w-[18px] flex-shrink-0", isActive && "text-brand")} />
                      {!collapsed && <span>{t(item.key)}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Profile / Footer */}
        <div className="border-t border-line p-3">
          {!collapsed && (
            <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-heading">{profile.name}</p>
                <p className="truncate text-xs text-ink-muted">{profile.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={async () => {
              await adminSignOut();
              window.location.href = `/${locale}/login`;
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-destructive/10 hover:text-destructive",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-[18px] w-[18px]" />
            {!collapsed && <span>{t("header.logout")}</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-14 items-center gap-4 border-b border-line bg-surface px-4 lg:px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-surface-soft lg:hidden"
            aria-label={t("nav.openMenu")}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page title */}
          <h1 className="text-lg font-semibold text-ink-heading">{currentTitle}</h1>

          <div className="flex-1" />

          {/* Header actions */}
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-surface-soft p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
