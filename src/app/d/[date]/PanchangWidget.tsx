"use client";

// Multi-page swipeable daily-panchang widget. Mobile-first. Shareable via /d/YYYY-MM-DD.
//
// Pages:
//   1 — आज का पंचांग    (essentials: tithi headline, events, sunrise/sunset)
//   2 — शुभ-अशुभ मुहूर्त  (muhurtas + disha shool + special yogas)
//   3 — चौघड़िया          (day + night)
//   4 — खगोलीय विवरण     (yoga, karana, padas, hora, rashi transits, panchak/bhadra/mool)
//   5 — संवत् एवं काल     (samvats, both maas conventions, day duration, ritu, ayana)

import { useState, useEffect, useRef, useCallback } from "react";
import type { PanchangDay } from "@/lib/types";
import {
  type NumberStyle,
  type TimeFormat,
  formatNumberStr,
  formatTimeStr,
  formatTimeRange,
  formatGregorianDate,
} from "@/lib/display-format";

// ─── Cities ──────────────────────────────────────────────────────────────────
interface City { name: string; lat: number; lng: number; tz: number; }
const PRESET_CITIES: City[] = [
  { name: "Indore", lat: 22.7196, lng: 75.8577, tz: 330 },
  { name: "Ujjain", lat: 23.1765, lng: 75.7885, tz: 330 },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126, tz: 330 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, tz: 330 },
  { name: "Delhi", lat: 28.6139, lng: 77.209, tz: 330 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, tz: 330 },
  { name: "Pune", lat: 18.5204, lng: 73.8567, tz: 330 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, tz: 330 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, tz: 330 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, tz: 330 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707, tz: 330 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867, tz: 330 },
];
const DEFAULT_CITY: City = PRESET_CITIES[0];

const LS = {
  numberStyle: "pramanik.numberStyle",
  timeFormat: "pramanik.timeFormat",
  city: "pramanik.city",
};
function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; }
  catch { return fallback; }
}
function writeLS<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat));
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
function nearestCity(lat: number, lng: number): City {
  let best = PRESET_CITIES[0]; let bestKm = Infinity;
  for (const c of PRESET_CITIES) {
    const km = haversineKm({ lat, lng }, c);
    if (km < bestKm) { bestKm = km; best = c; }
  }
  return best;
}

function tithiHeadline(day: PanchangDay): string {
  const adhika = day.masaIsAdhika ? " (अधिक)" : "";
  return `${day.hinduMonth.hi}${adhika} ${day.tithi.pakshaHi.replace(" पक्ष", "")} ${day.tithi.nameHi}`;
}
function todayLocalISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

const PAGE_TITLES = [
  { hi: "आज का पंचांग", en: "Today's Panchang" },
  { hi: "शुभ-अशुभ मुहूर्त", en: "Muhurtas" },
  { hi: "चौघड़िया", en: "Choghadiya" },
  { hi: "खगोलीय विवरण", en: "Astronomical Detail" },
  { hi: "संवत् एवं काल", en: "Samvats & Calendar" },
];
const TOTAL_PAGES = PAGE_TITLES.length;

export default function PanchangWidget({
  initialDay,
  initialDate,
}: {
  initialDay: PanchangDay;
  initialDate: string;
}) {
  const [day, setDay] = useState<PanchangDay>(initialDay);
  const [date, setDate] = useState(initialDate);
  const [city, setCity] = useState<City>(DEFAULT_CITY);
  const [numberStyle, setNumberStyle] = useState<NumberStyle>("western");
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");
  const [pageIdx, setPageIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // ── Restore settings from localStorage on mount
  useEffect(() => {
    setNumberStyle(readLS<NumberStyle>(LS.numberStyle, "western"));
    setTimeFormat(readLS<TimeFormat>(LS.timeFormat, "12h"));
    const savedCity = readLS<City | null>(LS.city, null);
    if (savedCity) setCity(savedCity);
  }, []);
  useEffect(() => writeLS(LS.numberStyle, numberStyle), [numberStyle]);
  useEffect(() => writeLS(LS.timeFormat, timeFormat), [timeFormat]);
  useEffect(() => writeLS(LS.city, city), [city]);

  // ── Re-fetch when date or city changes (skip the very first pass — server gave us initialDay)
  const firstFetchRef = useRef(true);
  useEffect(() => {
    if (firstFetchRef.current) {
      firstFetchRef.current = false;
      return;
    }
    setLoading(true);
    fetch("/api/panchang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "single",
        date,
        location: { lat: city.lat, lng: city.lng, tz: city.tz },
      }),
    })
      .then((r) => r.text())
      .then((t) => { try { return JSON.parse(t); } catch { return { error: t.slice(0, 300) }; } })
      .then((j) => {
        if (j.error) console.error(j.error);
        else if (j.days?.[0]) setDay(j.days[0]);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [date, city]);

  // ── Navigation
  const next = useCallback(() => setPageIdx((p) => Math.min(p + 1, TOTAL_PAGES - 1)), []);
  const prev = useCallback(() => setPageIdx((p) => Math.max(p - 1, 0)), []);

  // ── Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  // ── Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // ── Share button (Web Share API + clipboard fallback)
  // Builds a compact, reader-friendly message: tithi headline + first kalyanak/parv/vrat names,
  // then the URL on its own line. WhatsApp's preview renders the URL as a rich card via OG tags.
  const buildShareMessage = (url: string): string => {
    const lines: string[] = [];
    lines.push(`॥ ${tithiHeadline(day)} ॥`);
    lines.push(`${day.varaHi} · ${formatGregorianDate(day.date, numberStyle)}`);
    // Highlight kalyanaks/parvs/vrats prominently if present
    const kal = day.todayEvents?.filter((e) => e.category === "panch_kalyanak") ?? [];
    const parv = day.todayEvents?.filter((e) => e.category === "jain_parv") ?? [];
    const vrat = day.todayEvents?.filter((e) => e.category === "vrat") ?? [];
    if (kal.length) lines.push(`🕉 कल्याणक: ${kal.map((e) => e.nameHi).join(", ")}`);
    if (parv.length) lines.push(`🪔 पर्व: ${parv.map((e) => e.nameHi).join(", ")}`);
    if (vrat.length) lines.push(`🌸 व्रत: ${vrat.map((e) => e.nameHi).join(", ")}`);
    if (day.rasTyag) lines.push(`रस त्याग: ${day.rasTyag.rasHi} ${day.rasTyag.emoji}`);
    lines.push("");
    lines.push(url);
    return lines.join("\n");
  };

  const onShare = async () => {
    if (typeof window === "undefined") return;
    // If the viewer is on today's date, share the universal /d/today link so the recipient
    // also sees today's panchang whenever they open it. Otherwise share the specific date URL.
    const isToday = date === todayLocalISO();
    const origin = window.location.origin;
    const url = isToday ? `${origin}/d/today` : `${origin}/d/${date}`;
    const message = buildShareMessage(url);

    // Web Share API: pass message in `text`, drop the separate `url` so WhatsApp doesn't append
    // the URL twice (once from text, once from url).
    const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void> };
    if (typeof nav.share === "function") {
      try {
        await nav.share({ title: tithiHeadline(day), text: message });
        return;
      } catch {
        /* user cancelled — fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(message);
      setShareToast("कॉपी हो गया — WhatsApp में पेस्ट करें · Copied!");
      setTimeout(() => setShareToast(null), 2500);
    } catch {
      setShareToast("Could not copy. Long-press the address bar to share.");
      setTimeout(() => setShareToast(null), 3500);
    }
  };

  // ── Date jumper helpers (URL changes too)
  const goToDate = (d: string) => {
    setDate(d);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/d/${d}`);
    }
  };
  const shiftDay = (dt: number) => {
    const [y, m, dd] = date.split("-").map(Number);
    const cur = new Date(y, m - 1, dd);
    cur.setDate(cur.getDate() + dt);
    const nd = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`;
    goToDate(nd);
  };

  const fmtTime = (t: string | undefined | null) => formatTimeStr(t, timeFormat, numberStyle);
  const fmtRange = (m: { start: string; end: string } | undefined | null) =>
    m ? formatTimeRange(m.start, m.end, timeFormat, numberStyle) : "—";
  const fmtNum = (n: string | number | null | undefined) => formatNumberStr(n, numberStyle);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 text-stone-900">
      {/* ── HEADER ── */}
      <header className="sticky top-[49px] z-30 border-b border-amber-300 bg-amber-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center gap-1.5 px-2 py-2">
          <button
            onClick={() => shiftDay(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-lg font-bold text-stone-800 active:bg-amber-300"
            aria-label="Previous day"
          >‹</button>
          <input
            type="date"
            value={date}
            onChange={(e) => goToDate(e.target.value)}
            className="flex-1 rounded-full border border-amber-300 bg-white px-2 py-1.5 text-center text-[14px] font-medium text-stone-800"
          />
          <button
            onClick={() => shiftDay(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-lg font-bold text-stone-800 active:bg-amber-300"
            aria-label="Next day"
          >›</button>
          <button
            onClick={() => goToDate(todayLocalISO())}
            className="rounded-full bg-amber-200 px-3 py-1.5 text-[13px] font-bold text-stone-800 active:bg-amber-300"
            aria-label="Today"
          >आज</button>
          <button
            onClick={onShare}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-base text-white active:bg-orange-700"
            aria-label="Share"
          >↗</button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200 text-base text-stone-700 active:bg-stone-300"
            aria-label="Settings"
          >⚙</button>
        </div>
        {loading && <div className="h-0.5 w-full animate-pulse bg-orange-500" />}
      </header>

      {/* ── PAGES ── */}
      <main
        className="relative mx-auto max-w-md px-2.5 pb-20 pt-2.5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {pageIdx === 0 && <Page1Essentials day={day} city={city} fmtTime={fmtTime} fmtNum={fmtNum} />}
        {pageIdx === 1 && <Page2Muhurtas day={day} fmtRange={fmtRange} />}
        {pageIdx === 2 && <Page3Choghadiya day={day} fmtTime={fmtTime} />}
        {pageIdx === 3 && <Page4Astronomical day={day} fmtTime={fmtTime} fmtNum={fmtNum} />}
        {pageIdx === 4 && <Page5Calendar day={day} fmtNum={fmtNum} />}
      </main>

      {/* ── BOTTOM NAV (page indicator + arrows) ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-amber-300 bg-amber-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center gap-2 px-3 py-2.5">
          <button
            onClick={prev}
            disabled={pageIdx === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-stone-800 active:bg-amber-300 disabled:opacity-30"
          >‹</button>
          <div className="flex flex-1 flex-col items-center">
            <div className="text-[13px] font-bold text-stone-800">{PAGE_TITLES[pageIdx].hi}</div>
            <div className="mt-1.5 flex gap-1.5">
              {PAGE_TITLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPageIdx(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === pageIdx ? "w-5 bg-orange-600" : "w-1.5 bg-amber-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={next}
            disabled={pageIdx === TOTAL_PAGES - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-stone-800 active:bg-amber-300 disabled:opacity-30"
          >›</button>
        </div>
      </nav>

      {/* ── SHARE TOAST ── */}
      {shareToast && (
        <div className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full bg-stone-900 px-4 py-2 text-xs text-white shadow-lg">
          {shareToast}
        </div>
      )}

      {/* ── SETTINGS MODAL ── */}
      {settingsOpen && (
        <SettingsModal
          numberStyle={numberStyle}
          setNumberStyle={setNumberStyle}
          timeFormat={timeFormat}
          setTimeFormat={setTimeFormat}
          city={city}
          setCity={setCity}
          onDetectLocation={() => {
            if (typeof navigator === "undefined" || !navigator.geolocation) {
              alert("Browser geolocation not available.");
              return;
            }
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const c = nearestCity(pos.coords.latitude, pos.coords.longitude);
                setCity(c);
              },
              (err) => alert("Could not detect location: " + err.message),
              { timeout: 8000 },
            );
          }}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
}

// ─── SHARED UI BUILDING BLOCKS ───────────────────────────────────────────────

function PageHeader({ titleHi, subtitle }: { titleHi: string; subtitle?: string }) {
  return (
    <div className="mb-2.5 text-center">
      <h2 className="text-lg font-bold tracking-wide text-stone-800">{titleHi}</h2>
      {subtitle && <div className="text-[12px] text-stone-600">{subtitle}</div>}
    </div>
  );
}

function Section({
  title, accent = "#8b1a1a", children,
}: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <section className="mb-2.5 overflow-hidden rounded-xl border border-amber-300 bg-white shadow-sm">
      <div
        className="px-3 py-2 text-center text-[14px] font-bold tracking-wide text-white"
        style={{ background: accent }}
      >
        {title}
      </div>
      <div className="px-3 py-2">{children}</div>
    </section>
  );
}

function Row({ label, value, time, accent = "#8b1a1a" }: { label: string; value?: React.ReactNode; time?: string; accent?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-dashed border-amber-200 py-2 last:border-0">
      <span className="text-[15px] font-bold" style={{ color: accent }}>{label}</span>
      <span className="flex items-baseline gap-2 text-right">
        {value && <span className="text-[16px] font-medium text-stone-800">{value}</span>}
        {time && <span className="font-mono text-[14px] text-stone-600">{time}</span>}
      </span>
    </div>
  );
}

function Pill({ label, value, accent = "#8b1a1a" }: { label: string; value: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-lg bg-amber-50 px-3 py-2">
      <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>{label}</div>
      <div className="mt-0.5 text-[18px] font-bold text-stone-800">{value}</div>
    </div>
  );
}

// ─── PAGE 1 — ESSENTIALS ─────────────────────────────────────────────────────

function Page1Essentials({
  day, city, fmtTime, fmtNum,
}: {
  day: PanchangDay;
  city: City;
  fmtTime: (t: string | undefined | null) => string;
  fmtNum: (n: string | number | null | undefined) => string;
}) {
  return (
    <div>
      {/* Compact banner with city + Gregorian date inline */}
      <div className="rounded-xl bg-gradient-to-b from-red-800 to-red-900 px-3 py-2 text-center text-amber-300">
        <div className="text-[15px] font-bold">॥ तीर्थंकर वर्धमान जैन पंचांग ॥</div>
        <div className="text-[12px] text-amber-200/90">
          {city.name} · {formatGregorianDate(day.date, "western")}
        </div>
      </div>

      {/* Headline tithi — large + readable */}
      <div className="mt-2.5 rounded-2xl border-2 border-amber-500 bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-100 px-3 py-3 text-center shadow-md">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-stone-700">आज की तिथि</div>
        <div className="mt-1 text-[26px] font-bold leading-tight text-red-900">
          {day.hinduMonth.hi}{day.masaIsAdhika && <span className="text-[18px]"> (अधिक)</span>} {day.tithi.pakshaHi.replace(" पक्ष", "")} {day.tithi.nameHi}
        </div>
        <div className="mt-1.5 text-[16px] font-bold text-stone-800">{day.varaHi}</div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[13px] text-stone-700">
          <div className="rounded bg-white/70 px-2 py-1.5">
            <span className="block text-[11px] font-semibold text-red-900">वीर निर्वाण संवत्</span>
            <span className="text-[18px] font-bold text-stone-900">{fmtNum(day.samvats?.virNirvan)}</span>
          </div>
          <div className="rounded bg-white/70 px-2 py-1.5">
            <span className="block text-[11px] font-semibold text-red-900">महावीर जन्म संवत्</span>
            <span className="text-[18px] font-bold text-stone-900">{fmtNum(day.samvats?.mahavirJanma)}</span>
          </div>
        </div>
      </div>

      {/* Events hero — bigger */}
      <EventsHero day={day} />

      {/* Sun/Moon — 2x2 pill grid */}
      <Section title="🌅 सूर्य एवं चन्द्र">
        <div className="grid grid-cols-2 gap-2">
          <Pill label="सूर्योदय" value={fmtTime(day.sunTimes?.sunrise)} />
          <Pill label="सूर्यास्त" value={fmtTime(day.sunTimes?.sunset)} />
          <Pill label="चन्द्रोदय" value={fmtTime(day.sunTimes?.moonrise) || "—"} />
          <Pill label="चन्द्रास्त" value={fmtTime(day.sunTimes?.moonset) || "—"} />
        </div>
      </Section>
    </div>
  );
}

// ─── PAGE 2 — MUHURTAS ───────────────────────────────────────────────────────

function Page2Muhurtas({
  day, fmtRange,
}: {
  day: PanchangDay;
  fmtRange: (m: { start: string; end: string } | undefined | null) => string;
}) {
  return (
    <div>
      <PageHeader titleHi="शुभ-अशुभ मुहूर्त" subtitle={`${tithiHeadline(day)} · ${day.varaHi}`} />

      <Section title="✓ शुभ मुहूर्त" accent="#1e7a1e">
        <Row label="अभिजित" time={fmtRange(day.muhurtas?.abhijit)} accent="#1e7a1e" />
        <Row label="ब्रह्म मुहूर्त" time={fmtRange(day.muhurtas?.brahmaMuhurta)} accent="#1e7a1e" />
        <Row label="आनंदादि योग" value={day.anandadiYoga ? `${day.anandadiYoga.nameHi} (${day.anandadiYoga.type === "shubh" ? "शुभ" : "अशुभ"})` : "—"} accent="#1e7a1e" />
      </Section>

      <Section title="✗ अशुभ मुहूर्त" accent="#b22222">
        <Row label="राहु काल" time={fmtRange(day.muhurtas?.rahuKalam)} accent="#b22222" />
        <Row label="यमगंड" time={fmtRange(day.muhurtas?.yamganda)} accent="#b22222" />
        <Row label="गुलिक काल" time={fmtRange(day.muhurtas?.gulikaKalam)} accent="#b22222" />
        <Row label="कुलिक" time={fmtRange(day.muhurtas?.kulik)} accent="#b22222" />
        <Row label="कालवेला" time={fmtRange(day.muhurtas?.kalvela)} accent="#b22222" />
        <Row label="कंटक / मृत्यु" time={fmtRange(day.muhurtas?.kantakMrityu)} accent="#b22222" />
        <Row label="यमघण्ट" time={fmtRange(day.muhurtas?.yamghant)} accent="#b22222" />
      </Section>

      <Section title="दिशा शूल" accent="#6a1b9a">
        <div className="py-1 text-center">
          <div className="text-[26px] font-bold text-purple-800">{day.dishaShool?.directionHi}</div>
          <div className="text-[12px] text-stone-600">आज इस दिशा में यात्रा वर्जित</div>
        </div>
      </Section>

      {day.specialYogas && day.specialYogas.length > 0 && (
        <Section title="आज सक्रिय विशेष योग" accent="#5b21b6">
          <ul>
            {day.specialYogas.map((sy, i) => (
              <li key={i} className="flex items-center justify-between border-b border-dashed border-amber-200 py-1.5 text-[14px] last:border-0">
                <span className="font-bold text-stone-800">{sy.nameHi}</span>
                <span className="font-mono text-[12px] text-stone-600">{sy.startTime}–{sy.endTime}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

// ─── PAGE 3 — CHOGHADIYA ─────────────────────────────────────────────────────

function Page3Choghadiya({ day, fmtTime }: { day: PanchangDay; fmtTime: (t: string | undefined | null) => string }) {
  return (
    <div>
      <PageHeader titleHi="चौघड़िया" subtitle="दिन एवं रात्रि के 8-8 भाग" />

      <Section title="🪔 दिन का चौघड़िया" accent="#8b4513">
        <ChoghadiyaGrid segments={day.choghadiya?.day || []} fmtTime={fmtTime} />
      </Section>

      <Section title="🌙 रात का चौघड़िया" accent="#1e3a8a">
        <ChoghadiyaGrid segments={day.choghadiya?.night || []} fmtTime={fmtTime} />
      </Section>

      <div className="rounded-lg bg-amber-100 p-2 text-center text-[12px] text-stone-700">
        <span className="font-bold">शुभ:</span> अमृत · शुभ · लाभ &nbsp;·&nbsp;
        <span className="font-bold">अशुभ:</span> काल · रोग · उद्वेग
      </div>
    </div>
  );
}

function ChoghadiyaGrid({
  segments, fmtTime,
}: {
  segments: NonNullable<PanchangDay["choghadiya"]>["day"];
  fmtTime: (t: string | undefined | null) => string;
}) {
  if (!segments.length) return <div className="py-2 text-center text-sm text-stone-500">—</div>;
  return (
    <div className="grid grid-cols-2 gap-2">
      {segments.map((seg, i) => (
        <div
          key={i}
          className="rounded-lg border-2 px-2 py-1.5 text-center"
          style={{
            borderColor: seg.type === "shubh" ? "#86efac" : "#fca5a5",
            background: seg.type === "shubh" ? "#f0fdf4" : "#fef2f2",
          }}
        >
          <div
            className="text-[15px] font-bold"
            style={{ color: seg.type === "shubh" ? "#166534" : "#991b1b" }}
          >
            {seg.nameHi}
          </div>
          <div className="font-mono text-[12px] text-stone-600">
            {fmtTime(seg.start)}–{fmtTime(seg.end)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PAGE 4 — ASTRONOMICAL DETAIL ────────────────────────────────────────────

function Page4Astronomical({
  day, fmtTime, fmtNum,
}: {
  day: PanchangDay;
  fmtTime: (t: string | undefined | null) => string;
  fmtNum: (n: string | number | null | undefined) => string;
}) {
  return (
    <div>
      <PageHeader titleHi="खगोलीय विवरण" subtitle="योग · करण · पाद · होरा · राशि · पंचक/भद्रा/मूल" />

      <Section title="योग एवं करण" accent="#7c2d12">
        <Row label="योग" value={`${day.yoga?.nameHi} (${fmtNum(day.yoga?.number)})`} time={fmtTime(day.yoga?.endTime)} accent="#7c2d12" />
        <Row label="करण" value={day.karana?.nameHi} time={fmtTime(day.karana?.endTime)} accent="#7c2d12" />
        <Row label="नक्षत्र पाद" value={day.nakshatraPada ? `${fmtNum(day.nakshatraPada)}/4` : "—"} accent="#7c2d12" />
        <Row label="तिथि प्रवृत्ति" value={day.tithiPravritti?.nameHi} accent="#7c2d12" />
        <Row label="सूर्योदय होरा स्वामी" value={day.horaLordSunrise?.planetHi} accent="#7c2d12" />
      </Section>

      <Section title="राशि एवं नक्षत्र" accent="#1e3a8a">
        <Row
          label="चन्द्र राशि"
          value={day.moonRashi?.nameHi}
          time={day.moonRashi?.entryTime ? `प्रवेश ${fmtTime(day.moonRashi.entryTime)}` : undefined}
          accent="#1e3a8a"
        />
        <Row
          label="सूर्य राशि"
          value={day.sunRashi?.nameHi}
          time={day.sunRashi?.entryTime ? `प्रवेश ${fmtTime(day.sunRashi.entryTime)}` : undefined}
          accent="#1e3a8a"
        />
        <Row
          label="सूर्य नक्षत्र"
          value={day.sunNakshatra?.nameHi}
          time={day.sunNakshatra?.entryTime ? `प्रवेश ${fmtTime(day.sunNakshatra.entryTime)}` : undefined}
          accent="#1e3a8a"
        />
      </Section>

      <Section title="पंचक · भद्रा · मूल" accent="#9a1c5c">
        <Row
          label="पंचक"
          value={day.panchak ? <span className="rounded bg-rose-100 px-2 py-0.5 text-rose-800">सक्रिय</span> : "—"}
          accent="#9a1c5c"
        />
        <Row
          label="भद्रा (विष्टि)"
          value={
            day.bhadra?.active ? (
              <span className="rounded bg-rose-100 px-2 py-0.5 text-rose-800">
                सक्रिय
                {day.bhadra.periods && day.bhadra.periods.length > 0 && (
                  <span className="ml-1 text-[13px]">
                    ({day.bhadra.periods.map((p) => `${fmtTime(p.startTime)}–${fmtTime(p.endTime)}`).join(", ")})
                  </span>
                )}
              </span>
            ) : "—"
          }
          accent="#9a1c5c"
        />
        <Row
          label="मूल / गण्डान्त"
          value={day.mool ? <span className="rounded bg-rose-100 px-2 py-0.5 text-rose-800">सक्रिय</span> : "—"}
          accent="#9a1c5c"
        />
      </Section>

    </div>
  );
}

// ─── PAGE 5 — CALENDAR CONTEXT ───────────────────────────────────────────────

function Page5Calendar({
  day, fmtNum,
}: {
  day: PanchangDay;
  fmtNum: (n: string | number | null | undefined) => string;
}) {
  return (
    <div>
      <PageHeader titleHi="संवत् एवं काल" subtitle="समय व्यवस्था एवं आगामी पर्व" />

      <Section title="संवत्" accent="#8b1a1a">
        <div className="grid grid-cols-2 gap-2">
          <Pill label="वीर निर्वाण" value={fmtNum(day.samvats?.virNirvan)} />
          <Pill label="महावीर जन्म" value={fmtNum(day.samvats?.mahavirJanma)} />
          <Pill label="विक्रम" value={fmtNum(day.samvats?.vikram)} />
          <Pill label="शक" value={fmtNum(day.samvats?.shaka)} />
        </div>
      </Section>

      <Section title="मास एवं काल" accent="#7c2d12">
        <Row label="माह (पूर्णिमान्त)" value={day.hinduMonthPurnimanta?.hi} accent="#7c2d12" />
        <Row label="माह (अमान्त)" value={day.hinduMonthAmanta?.hi} accent="#7c2d12" />
        <Row label="अधिक मास" value={day.masaIsAdhika ? "हाँ" : "नहीं"} accent="#7c2d12" />
        <Row label="ऋतु" value={day.ritu?.hi} accent="#7c2d12" />
        <Row label="अयन" value={day.ayana?.hi} accent="#7c2d12" />
        <Row label="दिवस अवधि" value={fmtNum(day.dayDuration)} accent="#7c2d12" />
      </Section>

      {day.upcomingEvents && day.upcomingEvents.length > 0 && (
        <Section title="आगामी पर्व (30 दिन)" accent="#0f766e">
          <ul>
            {day.upcomingEvents.slice(0, 8).map((e, i) => (
              <li key={i} className="flex items-baseline justify-between gap-2 border-b border-dashed border-amber-200 py-1.5 last:border-0">
                <span className="text-[15px] text-stone-800">{e.nameHi}</span>
                <span className="font-mono text-[13px] text-stone-600">{e.date}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <div className="mt-2 rounded-lg bg-stone-100 p-2.5 text-center text-[13px] text-stone-700">
        <div>संपादक — <b>ब्रह्मचारी अनिल कुमार जैन</b></div>
        <div className="text-[12px] text-stone-600">अधिष्ठाता अमर ग्रंथालय, इन्दौर</div>
        <div className="mt-1 text-[14px] font-bold text-red-900">॥ जय जिनेन्द्र ॥</div>
      </div>
    </div>
  );
}

// ─── EventsHero (page 1) ─────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { labelHi: string; fg: string; emoji: string }> = {
  panch_kalyanak: { labelHi: "कल्याणक", fg: "#8b1a1a", emoji: "🕉" },
  jain_parv:      { labelHi: "पर्व",     fg: "#c2410c", emoji: "🪔" },
  vrat:           { labelHi: "व्रत",     fg: "#9a1c5c", emoji: "🌸" },
  national:       { labelHi: "अवकाश",   fg: "#1e3a8a", emoji: "🇮🇳" },
  acharya:        { labelHi: "आचार्य",   fg: "#4b3a8a", emoji: "🕉" },
  muhurt:         { labelHi: "मुहूर्त",   fg: "#5c4a0a", emoji: "⏱" },
};

function EventsHero({ day }: { day: PanchangDay }) {
  const grouped: Record<string, Array<{ key: string; label: string; sub?: string }>> = {};
  for (const e of day.todayEvents || []) {
    const cat = e.category || "jain_parv";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push({ key: e.eventId, label: e.nameHi });
  }
  if (day.rasTyag) {
    if (!grouped.vrat) grouped.vrat = [];
    grouped.vrat.push({
      key: "ras-tyag",
      label: `रस त्याग — ${day.rasTyag.rasHi} ${day.rasTyag.emoji}`,
      sub: day.rasTyag.itemsHi,
    });
  }
  const ORDER = ["panch_kalyanak", "jain_parv", "vrat", "national", "acharya", "muhurt"];
  const ordered = ORDER.filter((c) => grouped[c]);
  if (ordered.length === 0) {
    return (
      <div className="mt-2.5 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-2.5 text-center text-[14px] italic text-stone-600">
        आज कोई विशेष पर्व/व्रत/कल्याणक नहीं है
      </div>
    );
  }
  return (
    <div className="mt-2.5 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-yellow-50 to-amber-100 p-3 shadow-md">
      <div className="mb-2 text-center text-[13px] font-bold uppercase tracking-widest text-red-900">
        ✦ आज का विशेष ✦
      </div>
      <div className="space-y-2">
        {ordered.map((cat) => {
          const meta = CATEGORY_META[cat] || CATEGORY_META.jain_parv;
          return (
            <div key={cat} className="flex items-start gap-2">
              <span
                className="mt-0.5 inline-block min-w-[64px] rounded-full px-2 py-1 text-center text-[11px] font-bold text-white"
                style={{ background: meta.fg }}
              >
                {meta.emoji} {meta.labelHi}
              </span>
              <div className="flex-1 text-[16px] font-semibold leading-snug" style={{ color: meta.fg }}>
                {grouped[cat].map((it, i) => (
                  <span key={it.key}>
                    {i > 0 && <span className="mx-1 text-stone-400">•</span>}
                    {it.label}
                    {it.sub && (
                      <span className="text-[12px] font-normal text-stone-500"> ({it.sub})</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SETTINGS MODAL ──────────────────────────────────────────────────────────

function SettingsModal({
  numberStyle, setNumberStyle, timeFormat, setTimeFormat,
  city, setCity, onDetectLocation, onClose,
}: {
  numberStyle: NumberStyle;
  setNumberStyle: (v: NumberStyle) => void;
  timeFormat: TimeFormat;
  setTimeFormat: (v: TimeFormat) => void;
  city: City;
  setCity: (c: City) => void;
  onDetectLocation: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-red-900">⚙ Settings</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full text-stone-600 hover:bg-stone-100">✕</button>
        </div>

        <div className="space-y-4">
          {/* Number style */}
          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-wide text-stone-500">अंक शैली</label>
            <div className="flex gap-2">
              <button
                onClick={() => setNumberStyle("western")}
                className={`flex-1 rounded-lg py-2 text-xs ${numberStyle === "western" ? "bg-orange-600 text-white" : "border border-stone-300 text-stone-700"}`}
              >1, 2, 3</button>
              <button
                onClick={() => setNumberStyle("devanagari")}
                className={`flex-1 rounded-lg py-2 text-xs ${numberStyle === "devanagari" ? "bg-orange-600 text-white" : "border border-stone-300 text-stone-700"}`}
              >१, २, ३</button>
            </div>
          </div>

          {/* Time format */}
          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-wide text-stone-500">समय प्रारूप</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFormat("12h")}
                className={`flex-1 rounded-lg py-2 text-xs ${timeFormat === "12h" ? "bg-orange-600 text-white" : "border border-stone-300 text-stone-700"}`}
              >12-hour AM/PM</button>
              <button
                onClick={() => setTimeFormat("24h")}
                className={`flex-1 rounded-lg py-2 text-xs ${timeFormat === "24h" ? "bg-orange-600 text-white" : "border border-stone-300 text-stone-700"}`}
              >24-hour</button>
            </div>
          </div>

          {/* City */}
          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-wide text-stone-500">स्थान</label>
            <div className="flex gap-2">
              <select
                value={city.name}
                onChange={(e) => {
                  const c = PRESET_CITIES.find((p) => p.name === e.target.value);
                  if (c) setCity(c);
                }}
                className="flex-1 rounded-lg border border-stone-300 px-2 py-2 text-xs text-stone-800"
              >
                {PRESET_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
              <button
                onClick={onDetectLocation}
                className="rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-700"
              >📍 Detect</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
