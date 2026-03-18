import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter",
  weight: "100 900",
});

const playfair = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-playfair",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Brass & Bronze | Exquisite Lost-Wax Metal Artistry",
  description: "Discover the ancient soul of Manipur through handcrafted brass and bronze masterpieces. Forged in fire, finished by hand, preserved for generations.",
  keywords: ["Manipur Handicrafts", "Brass Art", "Bronze Sculpture", "Traditional Casting", "Heritage Metalwork"],
  openGraph: {
    title: "Brass & Bronze | Exquisite Lost-Wax Metal Artistry",
    description: "A heritage of heat, hands, and heart. Explore our collection of premium metal crafts.",
    type: "website",
    locale: "en_US",
    siteName: "Brass & Bronze",
  },
  robots: {
    index: true,
    follow: true,
  }
};

import SmoothScroll from "@/components/SmoothScroll";
import { LoadingProvider } from "@/components/LoadingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-brand-slate overflow-x-hidden`}
      >
        <LoadingProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LoadingProvider>
      </body>
    </html>
  );
}
