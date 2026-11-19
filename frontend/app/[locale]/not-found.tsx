"use client";

import { useLocale, useTranslations } from "next-intl";
import { RecoveryScreen } from "@/app/_components/shared/recovery-screen";

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations("common.notFound");
  const tNav = useTranslations("nav");
  const tA11y = useTranslations("common.accessibility");
  const links = [
    { label: tNav("ourTours"), href: `/${locale}/our-tours`, icon: "compass" as const },
    { label: tNav("location"), href: `/${locale}/location`, icon: "map" as const },
    { label: tNav("photos"), href: `/${locale}/photos`, icon: "map" as const },
  ];

  return (
    <RecoveryScreen
      variant="notFound"
      dir={locale === "ar" ? "rtl" : "ltr"}
      title={t("title")}
      description={t("description")}
      primaryLabel={t("backHome")}
      homeHref={`/${locale}`}
      secondaryLabel={t("contactUs")}
      secondaryHref={`/${locale}/contact-us`}
      links={links}
      linksLabel={tA11y("helpfulPages")}
    />
  );
}
