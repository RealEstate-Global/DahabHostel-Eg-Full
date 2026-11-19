import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora, Noto_Kufi_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/app/_components/providers";
import { Toaster } from "react-hot-toast";
import { JsonLd, CookieConsent } from "@/app/_components/shared";
import { generateOrganizationSchema } from "@/app/_lib/seo";
import { site, images } from "@/app/_data";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || site.url;

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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: site.title, template: "%s | Dahab Hostel Cairo" },
  description: site.description,
  keywords: site.keywords.split(", "),
  authors: [{ name: "Dahab Hostel" }],
  creator: "Dahab Hostel",
  publisher: "Dahab Hostel",
  applicationName: "Dahab Hostel",
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: site.ogSiteName,
    title: site.title,
    description: site.description,
    images: [{ url: images.ogCover, width: 1200, height: 630, alt: "Dahab Hostel rooftop" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [images.ogCover] },
  robots: { index: true, follow: true },
};

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
