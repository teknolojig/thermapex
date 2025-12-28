import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thermapex - Türkiye'nin Lider Bakır Boru Tedarikçisi",
  description: "Bakır boru, LWC bakır boru, kangal bakır boru, boy bakır boru ve izolasyonlu bakır boru tedarikçisi. Yüksek kalite, rekabetçi fiyat, %100 müşteri memnuniyeti.",
  keywords: ["bakır boru", "LWC bakır boru", "kangal bakır boru", "boy bakır boru", "izolasyonlu bakır boru", "bakır pul"],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
