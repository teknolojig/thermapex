import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thermapex - Bakır Boru Sistemleri",
  description: "PE İzolasyonlu bakır borular ve endüstriyel bakır çözümleri. Yüksek kaliteli bakır boru sistemleri üreticisi.",
  keywords: "bakır boru, PE izolasyon, endüstriyel bakır, thermapex, bakır sistemleri",
  authors: [{ name: "Thermapex" }],
  openGraph: {
    title: "Thermapex - Bakır Boru Sistemleri",
    description: "PE İzolasyonlu bakır borular ve endüstriyel bakır çözümleri",
    url: "https://thermapex.com",
    siteName: "Thermapex",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
