import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Figtree } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Digital Mahadata Prima - Digital Transformation Solutions",
  description: "Empowering businesses through innovative digital solutions, data analytics, and cutting-edge technology for sustainable growth in the digital era.",
  keywords: "digital transformation, data analytics, cloud solutions, cybersecurity, AI, machine learning, business intelligence",
  authors: [{ name: "Digital Mahadata Prima" }],
  openGraph: {
    title: "Digital Mahadata Prima - Digital Transformation Solutions",
    description: "Empowering businesses through innovative digital solutions, data analytics, and cutting-edge technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} ${figtree.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
