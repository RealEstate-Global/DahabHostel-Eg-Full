import { redirect } from "next/navigation";

export default async function OldDestinations({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/our-tours`);
}
