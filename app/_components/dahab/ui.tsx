"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

export function PageHero({ title, subtitle, image, height = "min-h-[420px]" }: {
  title: string;
  subtitle?: string;
  image: string;
  height?: string;
}) {
  return (
    <section className={`relative isolate flex items-end overflow-hidden ${height}`}>
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 -z-10 bg-hero-shade" />
      <div className="container-page relative pb-14 pt-28 sm:pb-20">
        <div className="animate-fade-up max-w-3xl">
          <span className="eyebrow !text-white/80">Dahab Hostel · Cairo</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ children, eyebrow, className = "" }: { children: React.ReactNode; eyebrow?: string; className?: string }) {
  return (
    <div className={`mb-8 ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="heading-display">{children}</h2>
      <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-brand to-brand-light" />
    </div>
  );
}

export function ActionLink({ href, children, variant = "primary", external = false }: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
}) {
  const locale = useLocale();
  const url = external ? href : `/${locale}${href}`;
  return (
    <Link
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={variant === "primary" ? "btn-primary" : "btn-outline"}
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container-page section-pad ${className}`}>{children}</div>;
}
