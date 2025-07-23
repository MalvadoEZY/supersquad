import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supersquad.ai – Your Elite AI Agent Team for Business Growth",
  description:
    "Supersquad.ai gives you a team of smart AI agents to automate social media, sales, content, and customer support. Designed for modern small businesses.",
  keywords: [
    "AI Agents",
    "AI Automation",
    "Business Automation",
    "SaaS Tools",
    "Social Media AI",
    "Sales Outreach AI",
    "Customer Support AI",
    "Supersquad",
    "Next.js SaaS",
    "Small Business AI",
  ],
  authors: [{ name: "Supersquad.ai Team", url: "https://supersquad.ai" }],
  creator: "Supersquad.ai",
  metadataBase: new URL("https://supersquad.ai"),
  openGraph: {
    title: "Supersquad.ai – Your AI-Powered Business Task Force",
    description:
      "Run your business smarter with Supersquad.ai – a set of AI agents that automate your social media, sales, and support. Built for small businesses.",
    url: "https://supersquad.ai",
    siteName: "Supersquad.ai",
    images: [
      {
        url: "https://supersquad.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Supersquad.ai – AI Agents for Business Automation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supersquad.ai – Your AI-Powered Business Task Force",
    description:
      "A team of AI agents to automate your business – from social media to sales. Built for modern teams and solopreneurs.",
    images: ["https://supersquad.ai/og-image.jpg"],
    creator: "@supersquadai", // change if needed
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
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
