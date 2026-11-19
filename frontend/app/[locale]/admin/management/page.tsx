export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "es" }, { locale: "fr" }];
}

export default function ManagementPage() {
  const locale = "ar" === "ar" ? "ar" : "en"; // Simple locale detection

  // Translate texts based on locale
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        administration: "Management",
        users: "Users",
        userManagement: "Manage user accounts",
        settings: "Settings",
        generalSettings: "General site settings",
        partnerships: "Partnerships",
        partnershipManagement: "Manage tourism partnerships",
      },
      ar: {
        administration: "الإدارة",
        users: "المستخدمين",
        userManagement: "إدارة حسابات المستخدمين",
        settings: "الإعدادات",
        generalSettings: "إعدادات الموقع العام",
        partnerships: "الشركاء",
        partnershipManagement: "إدارة شركاء السياحة",
      },
    };
    return translations[key]?.[locale] || translations[key]?.en || key;
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-ink-heading mb-6">
        {t("administration")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Management */}
        <div className="p-6 rounded-xl border border-border">
          <h4 className="font-medium text-ink-heading mb-4">
            {t("users")}
          </h4>
          <p className="text-sm text-ink-muted">
            {t("userManagement")}
          </p>
          <p className="mt-2 text-brand font-medium">342 users</p>
        </div>

        {/* Settings */}
        <div className="p-6 rounded-xl border border-border">
          <h4 className="font-medium text-ink-heading mb-4">
            {t("settings")}
          </h4>
          <p className="text-sm text-ink-muted">
            {t("generalSettings")}
          </p>
          <p className="mt-2 text-brand font-medium">12 settings</p>
        </div>

        {/* Partnerships */}
        <div className="p-6 rounded-xl border border-border">
          <h4 className="font-medium text-ink-heading mb-4">
            {t("partnerships")}
          </h4>
          <p className="text-sm text-ink-muted">
            {t("partnershipManagement")}
          </p>
          <p className="mt-2 text-brand font-medium">8 partnerships</p>
        </div>
      </div>
    </section>
  );
}