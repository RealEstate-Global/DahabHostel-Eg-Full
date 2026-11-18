import { redirect } from "next/navigation";

export default async function OldContact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/contact-us`);
}
