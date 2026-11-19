import "./globals.css";
import type { Viewport } from "next";
import { Plus_Jakarta_Sans, Sora, Noto_Kufi_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/app/_components/providers";
import { Toaster } from "react-hot-toast";
import { JsonLd, CookieConsent } from "@/app/_components/shared";
import { generateOrganizationSchema } from "@/app/_lib/seo";
import { images } from "@/app/_data";
import { routing } from "@/app/routing";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const display = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const arabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  const t = await getTranslations({ locale, namespace: "pages.home" });
  const title = t("metadataTitle");
  const description = t("metadataDescription");

  return {
    title,
    description,
    openGraph: { title, description, locale, images: [images.ogCover] },
    twitter: { title, description, images: [images.ogCover] },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5199a8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1418" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${sans.variable} ${display.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={generateOrganizationSchema()} />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}`,
          }}
        />
      </head>
      <body className={locale === "ar" ? "font-arabic" : "font-sans"} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              {children}
            </div>
            <CookieConsent />
            <Toaster position="top-right" toastOptions={{ className: "!rounded-2xl !border-line !bg-surface !text-ink !shadow-card" }} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
