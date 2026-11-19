import Link from "next/link";
import { MouseEvent } from "react";

interface SidebarNavItemProps {
  items: {
    label: string;
    href: string;
    icon: string;
  }[];
}

export function SidebarNavItem({ items }: SidebarNavItemProps) {
  return (
    <nav className="space-y-1">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface/50 hover:text-ink-heading focus:bg-surface/50 focus:text-ink-heading focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          <svg
            className="w-4 h-4 mr-3 text-ink-muted group-hover:text-brand"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d={item.icon} />
          </svg>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}