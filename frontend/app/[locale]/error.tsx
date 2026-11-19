"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RecoveryScreen } from "@/app/_components/shared/recovery-screen";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useLocale();
  const t = useTranslations("common.error");
  useEffect(() => { console.error("Error boundary caught:", error); }, [error]);

  return (
    <RecoveryScreen
      variant="error"
      dir={locale === "ar" ? "rtl" : "ltr"}
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      primaryLabel={t("retry")}
      retry={reset}
      secondaryLabel={t("goHome")}
      secondaryHref={`/${locale}`}
    />
  );
}
