import "./globals.css";

import type { Metadata } from "next";
import CreatoDisplay from "next/font/local";

import { Navigation } from "@/components/layout/navigation";

const creatoDisplay = CreatoDisplay({
  src: [
    { path: "../public/fonts/CreatoDisplay-Thin.otf", weight: "100" },
    { path: "../public/fonts/CreatoDisplay-Regular.otf", weight: "400" },
    { path: "../public/fonts/CreatoDisplay-Medium.otf", weight: "500" },
    { path: "../public/fonts/CreatoDisplay-Bold.otf", weight: "700" },
    { path: "../public/fonts/CreatoDisplay-ExtraBold.otf", weight: "800" },
  ],
});

export const metadata: Metadata = {
  title: "Satu Klinik | Klinik Resmi Satu Sehat. Tanpa Ribet.",
  description: "Klinik Resmi Satu Sehat. Tanpa Ribet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body className={creatoDisplay.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
