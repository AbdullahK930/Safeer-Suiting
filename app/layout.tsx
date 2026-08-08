import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Libre_Baskerville } from "next/font/google";

import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";

// Display serif — headings, section titles
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body / UI text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Accent serif — quotes, testimonials, editorial callouts
const libreBaskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Safeer Suiting | Premium Bespoke Tailoring in Rawalpindi",

  description:
    "Premium bespoke tailoring since 2000. Three-piece suits, shalwar kameez, formal shirts and uniforms crafted with precision.",

  keywords: [
    "Safeer Suiting",
    "Tailor Rawalpindi",
    "Best Tailor Pakistan",
    "Three Piece Suit",
    "Shalwar Kameez",
    "Formal Shirts",
    "Uniform",
    "Bespoke Tailoring"
  ],

  openGraph:{
    title:"Safeer Suiting",
    description:"Premium Bespoke Tailoring Since 2000",
    images:["/images/opengraph-image.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
