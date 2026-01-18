import "./globals.css";

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GiftBox Pro | Curated Gift Boxes & Subscriptions",
  description:
    "Discover beautifully curated gift boxes for every occasion. Subscription options, bundle deals, and premium gifting experiences. Where memories come alive.",
  keywords: [
    "gift boxes",
    "curated gifts",
    "subscription boxes",
    "gift bundles",
    "premium gifts",
  ],
  openGraph: {
    title: "GiftBox Pro | Curated Gift Boxes & Subscriptions",
    description:
      "Discover beautifully curated gift boxes for every occasion. Where memories come alive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
