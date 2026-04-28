"use client";

// HamburgerNav — a slide-out hamburger menu used by the root layout.
// Holds the primary nav links plus actions that pages can emit/listen for via window
// CustomEvents (so a single menu can cleanly drive the homepage's Settings / Download PNG
// without prop-drilling through Next.js layout boundaries).

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Daily Panchang", emoji: "📿" },
  { href: "/generate", label: "Generate Year", emoji: "📅" },
  { href: "/events", label: "Events Master", emoji: "🪔" },
  { href: "/print-calendar", label: "Print Calendar", emoji: "🖨" },
];

export default function HamburgerNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [canDownload, setCanDownload] = useState(false);
  const [showHomeActions, setShowHomeActions] = useState(false);

  // Listen for the homepage announcing it has a card to download.
  useEffect(() => {
    function onReady(e: Event) {
      const detail = (e as CustomEvent<{ ready: boolean }>).detail;
      setCanDownload(!!detail?.ready);
    }
    window.addEventListener("pramanik:daily-ready", onReady as EventListener);
    return () => window.removeEventListener("pramanik:daily-ready", onReady as EventListener);
  }, []);

  // Show "Settings" and "Download PNG" only on the homepage.
  useEffect(() => {
    setShowHomeActions(pathname === "/" || pathname === "");
  }, [pathname]);

  // Close the menu on route change (defensive — Next 16 client navigations).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const triggerSettings = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("pramanik:open-settings"));
  };
  const triggerDownload = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("pramanik:download-png"));
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950/85 backdrop-blur-sm"
      >
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
          <a href="/" className="flex items-center gap-2 text-base font-bold text-orange-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">P</span>
            <span className="hidden sm:inline">तीर्थंकर वर्धमान जैन पंचांग</span>
            <span className="sm:hidden">पंचांग</span>
          </a>
          {/* Home-page quick actions surfaced in the header on wider screens */}
          {showHomeActions && (
            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <button
                onClick={triggerSettings}
                className="rounded-md border border-gray-700 px-3 py-1.5 text-xs text-gray-200 hover:border-orange-500 hover:text-orange-400"
              >
                ⚙ Settings
              </button>
              <button
                onClick={triggerDownload}
                disabled={!canDownload}
                className="rounded-md bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
              >
                ⬇ Share PNG
              </button>
            </div>
          )}
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
          <div className="text-sm font-bold text-orange-500">Menu</div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-300 hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        <nav className="px-2 py-3">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
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

        {/* Home-page actions appear inside the drawer when on / */}
        {showHomeActions && (
          <div className="border-t border-gray-800 px-2 py-3">
            <div className="mb-1 px-3 text-[10px] uppercase tracking-wide text-gray-500">
              Daily Panchang
            </div>
            <button
              onClick={triggerSettings}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-200 hover:bg-gray-800 hover:text-orange-300"
            >
              <span className="text-base">⚙</span>
              <span>Settings</span>
            </button>
            <button
              onClick={triggerDownload}
              disabled={!canDownload}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-200 hover:bg-gray-800 hover:text-orange-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500"
            >
              <span className="text-base">⬇</span>
              <span>Download PNG (WhatsApp)</span>
            </button>
          </div>
        )}

        <div className="absolute bottom-0 w-full border-t border-gray-800 px-4 py-3 text-center text-[10px] text-gray-500">
          ॥ जय जिनेन्द्र ॥
          <div className="mt-1">panchang.gunayatan.org</div>
        </div>
      </aside>
    </>
  );
}
