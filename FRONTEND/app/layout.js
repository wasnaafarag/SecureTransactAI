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

export const metadata = {
  title: {
    default: "SecureTransact AI- Real-Time Fraud & Anomaly Detection",
    template: "%s | SecureTransact AI",
  },
  description:
    "SecureTransact AI is an enterprise-grade fraud detection platform powered by Isolation Forest and DBSCAN. Detect transaction anomalies in under 50ms, backed by an immutable blockchain audit trail.",
  keywords: [
    "fraud detection",
    "anomaly detection",
    "isolation forest",
    "DBSCAN",
    "blockchain audit trail",
    "fintech security",
    "AI fraud prevention",
    "transaction monitoring",
    "machine learning security",
    "financial crime prevention",
  ],
  authors: [{ name: "SecureTransact Team", url: "https://securetransact.ai" }],
  creator: "SecureTransact AI",
  metadataBase: new URL("https://securetransact.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://securetransact.ai",
    siteName: "SecureTransact AI",
    title: "SecureTransact AI- Real-Time Fraud & Anomaly Detection",
    description:
      "AI-powered anomaly detection with sub-50ms latency and an immutable blockchain ledger. Stop financial fraud before it happens.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "SecureTransact AI Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "SecureTransact AI- Real-Time Fraud Detection",
    description:
      "Detect transaction anomalies in under 50ms using Isolation Forest + DBSCAN, backed by an immutable blockchain audit trail.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
