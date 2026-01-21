import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
