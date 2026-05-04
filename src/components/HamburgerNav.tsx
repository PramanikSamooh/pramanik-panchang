"use client";

// HamburgerNav — slide-out hamburger menu used by the root layout.
// Pure navigation. The full panchang at /d/[date] has its own settings bar;
// other admin pages (Generate, Events, Print Calendar) are linked from here.

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/branding";

const NAV_LINKS = [
  { href: "/", label: "Daily Panchang", emoji: "📿" },
  { href: "/learn", label: "Learn to see Panchang", emoji: "📖" },
  { href: "/generate", label: "Generate Year", emoji: "📅" },
  { href: "/events", label: "Events Master", emoji: "🪔" },
  { href: "/print-calendar", label: "Print Calendar", emoji: "🖨" },
];

export default function HamburgerNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Auto-close drawer on route change.
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950/85 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-200 hover:bg-gray-800 active:bg-gray-700"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <a href="/" className="flex items-center gap-2 text-base font-bold text-orange-400">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">P</span>
            <span className="hidden sm:inline">{BRAND.shortHi}</span>
            <span className="sm:hidden">पंचांग</span>
          </a>
        </div>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px]"
          aria-hidden
        />
      )}

      {/* Slide-out drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 max-w-[85vw] transform border-r border-gray-800 bg-gray-950 shadow-2xl transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <div className="text-sm font-bold text-orange-400">Menu</div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-300 hover:bg-gray-800"
          >✕</button>
        </div>

        <nav className="px-2 py-3">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/" || pathname.startsWith("/d/")
                : pathname.startsWith(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-orange-600/20 text-orange-300"
                    : "text-gray-300 hover:bg-gray-800 hover:text-orange-300"
                }`}
              >
                <span className="text-base">{link.emoji}</span>
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-800 px-4 py-3 text-center text-[10px] text-gray-500">
          ॥ जय जिनेन्द्र ॥
          <div className="mt-1">panchang.gunayatan.org</div>
        </div>
      </aside>
    </>
  );
}
