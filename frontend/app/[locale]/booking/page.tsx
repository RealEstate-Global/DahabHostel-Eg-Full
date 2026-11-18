import { redirect } from "next/navigation";

export default async function OldBooking({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/book-now`);
}
