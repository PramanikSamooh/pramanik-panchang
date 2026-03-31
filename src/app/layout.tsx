import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pramanik Panchang Tool",
  description: "Jain Panchang Generator — Tithi Computation & Event Calendar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
            <a href="/" className="flex items-center gap-2 text-lg font-bold text-orange-500">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-sm text-white font-bold">P</span>
              Panchang Tool
            </a>
            <div className="flex gap-4 text-sm">
              <a href="/" className="text-gray-400 hover:text-orange-400">Generate</a>
              <a href="/events" className="text-gray-400 hover:text-orange-400">Events Master</a>
              <a href="/print-calendar" className="text-gray-400 hover:text-orange-400">Print Calendar</a>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-7xl px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
