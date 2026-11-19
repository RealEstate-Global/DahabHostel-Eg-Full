import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "es" }, { locale: "fr" }];
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/admin/overview`);
}
