import type { Metadata, Viewport } from "next";
import HamburgerNav from "@/components/HamburgerNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "तीर्थंकर वर्धमान जैन पंचांग — Pramanik Jain Panchang",
  description:
    "Authentic Digambara Jain Daily Panchang — tithi, nakshatra, yoga, karana, sunrise/sunset, muhurtas, choghadiya, kalyanaks, parvas, vrats. Computed using Swiss Ephemeris.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8b1a1a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <HamburgerNav />
        {/* Pages decide their own padding. Homepage uses fit-to-window; other pages use a
            standard container via the .pageContent CSS class applied inside the page itself. */}
        <main>{children}</main>
      </body>
    </html>
  );
}
