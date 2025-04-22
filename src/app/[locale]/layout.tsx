// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import LanguageSwitcher from "@/components/lang-switcher";

// Fuentes de Google
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"] });

// Metadata del sitio
export const metadata: Metadata = {
  title: "Cyberpunk Tarot",
  description: "Inspired in Cyberpunk 2077 by CD Projekt",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  const messages = await getMessages({ locale });

  if (!messages) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.className} ${roboto.className} font-sans antialiased bg-white text-black`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageSwitcher />
          <div className="min-h-screen flex flex-col">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
