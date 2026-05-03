"use client";

// PanchangBody — client component holding the user's display settings (number style,
// time format, language, city). Parent server <page.tsx/> computes `day` once and hands
// it in; this component re-renders the page when the user changes any setting. Settings
// persist in localStorage so they stick across navigations.

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LocationConfig } from "@/lib/sweph-engine";
import type { PanchangDay } from "@/lib/types";
import { BRAND } from "@/lib/branding";
import {
  type NumberStyle,
  type TimeFormat,
  formatNumberStr,
  formatTimeStr,
  formatGregorianDate,
  type TimeContext,
} from "@/lib/display-format";

type Lang = "hi" | "en" | "both";

// Bundle of format helpers passed to every section so a single setting flip
// (number style or time format) re-renders all times & numbers consistently.
interface Fmt {
  time: (s: string | null | undefined) => string;
  range: (a?: string | null, b?: string | null) => string | undefined;
  num: (n: number | string | null | undefined) => string;
  date: (s: string) => string;
}

// City presets used by the autodetect / picker.
interface City { name: string; lat: number; lng: number; tz: number; }
const PRESET_CITIES: City[] = [
  { name: "Ujjain", lat: 23.1765, lng: 75.7885, tz: 330 },
  { name: "Indore", lat: 22.7196, lng: 75.8577, tz: 330 },
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

const LS = {
  numberStyle: "pramanik.numberStyle",
  timeFormat: "pramanik.timeFormat",
  city: "pramanik.city",
  lang: "pramanik.lang",
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

const DEFAULT_LOC: LocationConfig & { name: string } = {
  name: "Ujjain",
  lat: 23.1765,
  lng: 75.7885,
  tz: 330,
};

function parseDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const [, y, mo, d] = m;
  const dt = new Date(parseInt(y), parseInt(mo) - 1, parseInt(d));
  return isNaN(dt.getTime()) ? null : dt;
}

function parseLang(s?: string): Lang {
  if (s === "hi" || s === "en") return s;
  return "both";
}

/** "HH:MM" (24h) → minutes-since-local-midnight. */
function hhmmToMin(s: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
  if (!m) return -1;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

/** Current local time in IST (the panchang's tz) as minutes-since-midnight. */
function nowMinIST(): number {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 3600 * 1000);
  return ist.getUTCHours() * 60 + ist.getUTCMinutes();
}

/** Test if `now` (mins since midnight) falls inside [start, end]. End may wrap past midnight. */
function isActiveWindow(now: number, startStr: string, endStr: string): boolean {
  const s = hhmmToMin(startStr);
  const e = hhmmToMin(endStr);
  if (s < 0 || e < 0) return false;
  if (e >= s) return now >= s && now < e;
  return now >= s || now < e; // wraps past midnight
}

export default function PanchangBody({
  day, lang, loc, isToday, dateParam, debugMode,
}: {
  day: PanchangDay;
  lang: Lang;
  loc: LocationConfig & { name: string };
  isToday: boolean;
  dateParam: string;
  debugMode: boolean;
}) {
  // ── Display settings (number style, time format) live entirely client-side. We
  //    initialise from localStorage on mount; the first SSR pass uses the defaults
  //    (Western digits, 12h) so the static HTML and the post-hydrate render agree
  //    until preferences load.
  const [numberStyle, setNumberStyle] = useState<NumberStyle>("western");
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");
  const [hydrated, setHydrated] = useState(false);
  const [nowMin, setNowMin] = useState<number>(-1);

  useEffect(() => {
    setNumberStyle(readLS<NumberStyle>(LS.numberStyle, "western"));
    setTimeFormat(readLS<TimeFormat>(LS.timeFormat, "12h"));
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) writeLS(LS.numberStyle, numberStyle); }, [numberStyle, hydrated]);
  useEffect(() => { if (hydrated) writeLS(LS.timeFormat, timeFormat); }, [timeFormat, hydrated]);

  // Live tick: refresh the "now" cursor every minute when on today's date.
  useEffect(() => {
    if (!isToday) { setNowMin(-1); return; }
    const tick = () => setNowMin(nowMinIST());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [isToday]);

  // Build a render context once per change. Sections receive this `fmt` bundle
  // and call its helpers instead of touching raw HH:MM / digit strings.
  const ctx: TimeContext = { sunriseHHMM: day.sunTimes?.sunrise };
  const fmt: Fmt = {
    time: (s) => formatTimeStr(s, timeFormat, numberStyle, ctx),
    range: (a, b) => (!a || !b ? undefined : `${formatTimeStr(a, timeFormat, numberStyle, ctx)}–${formatTimeStr(b, timeFormat, numberStyle, ctx)}`),
    num: (n) => formatNumberStr(n, numberStyle),
    date: (s) => formatGregorianDate(s, numberStyle),
  };
  const fmtNum = fmt.num;
  const fmtDate = fmt.date;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <Header
          day={day}
          loc={loc}
          lang={lang}
          dateParam={dateParam}
          numberStyle={numberStyle}
          timeFormat={timeFormat}
          onNumberStyle={setNumberStyle}
          onTimeFormat={setTimeFormat}
          fmtNum={fmtNum}
          fmtDate={fmtDate}
        />

        {/* ── TL;DR verdict — combines tithi-pravritti, anandadi yoga, panchak/bhadra/mool, special yogas. ── */}
        <SectionVerdict day={day} lang={lang} />

        {/* ── Block 1: Essential / Now (Jain practice first) ── */}
        {isToday && <SectionLiveNow day={day} lang={lang} isToday={isToday} nowMin={nowMin} fmt={fmt} />}
        <SectionRasTyag day={day} lang={lang} isToday={isToday} />
        <SectionEvents day={day} lang={lang} isToday={isToday} />

        {/* Add-to-calendar (iCal export) shortcut */}
        <AddToCalendar day={day} lang={lang} dateParam={dateParam} />

        <Grid2>
          <SectionTomorrow day={day} lang={lang} isToday={isToday} fmt={fmt} />
          <SectionUpcoming day={day} lang={lang} fmt={fmt} />
        </Grid2>

        {/* ── Block 2: Full detail below ── */}
        <Divider label={lang === "en" ? "Full astronomical & muhurta detail" : "विस्तृत खगोलीय एवं मुहूर्त विवरण"} />

        <Grid3>
          <SectionPanchaAnga day={day} lang={lang} fmt={fmt} />
          <SectionSunMoon day={day} lang={lang} fmt={fmt} />
          <SectionRashi day={day} lang={lang} fmt={fmt} />
        </Grid3>

        {/* Planet table — sidereal longitude, rashi, nakshatra, retrograde, combust at sunrise */}
        <SectionPlanets day={day} lang={lang} fmt={fmt} />

        <Grid3>
          <SectionCalendar day={day} lang={lang} fmt={fmt} />
          <SectionAuspicious day={day} lang={lang} fmt={fmt} />
          <SectionInauspicious day={day} lang={lang} fmt={fmt} />
        </Grid3>

        <Grid3>
          <SectionDirections day={day} lang={lang} />
          <SectionPeriodFlags day={day} lang={lang} fmt={fmt} />
          <SectionSpecialYogas day={day} lang={lang} fmt={fmt} />
        </Grid3>

        <SectionChoghadiya day={day} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />
        <SectionHora day={day} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />
        <SectionNitya day={day} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />

        {/* Glossary — collapsible help for the technical terms used above */}
        <SectionGlossary lang={lang} />

        {debugMode && <SectionRawJson day={day} />}
        {!debugMode && (
          <div className="mt-6 text-center text-[10px] text-stone-500">
            Add{" "}
            <code className="rounded bg-stone-200 px-1 py-0.5 font-mono">?debug=1</code>{" "}
            to the URL to see the raw JSON.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────────────

function Header({
  day, loc, lang, dateParam, numberStyle, timeFormat, onNumberStyle, onTimeFormat, fmtNum, fmtDate,
}: {
  day: PanchangDay;
  loc: { name: string; lat: number; lng: number; tz: number };
  lang: Lang;
  dateParam: string;
  numberStyle: NumberStyle;
  timeFormat: TimeFormat;
  onNumberStyle: (n: NumberStyle) => void;
  onTimeFormat: (t: TimeFormat) => void;
  fmtNum: (n: number | string | null | undefined) => string;
  fmtDate: (s: string) => string;
}) {
  return (
    <header className="mb-4 border-b-2 border-stone-300 pb-3">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-xl font-bold tracking-tight text-stone-900">
          {lang !== "en" && <span>{BRAND.shortHi}</span>}
          {lang === "both" && <span className="ml-2 text-base font-normal text-stone-500">·</span>}
          {lang !== "hi" && <span className="ml-2 text-base font-normal text-stone-700">{BRAND.shortEn}</span>}
        </h1>
        <div className="flex flex-col items-end gap-2 text-xs">
          <InlineSettings
            dateParam={dateParam}
            currentLang={lang}
            currentCity={loc}
            numberStyle={numberStyle}
            timeFormat={timeFormat}
            onNumberStyle={onNumberStyle}
            onTimeFormat={onTimeFormat}
          />
        </div>
      </div>
      <div className="mt-1 text-sm text-stone-700">
        <strong>{fmtDate(day.date)}</strong> · {bilingual(day.varaHi, day.varaEn, lang)} · {loc.name}{" "}
        <span className="text-stone-500">({loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}, IST+0)</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <KV label={t(lang, "तिथि", "Date")} value={lang === "en" ? (day.vnsDateEn ?? day.vnsDateHi) : day.vnsDateHi} />
        <KV label={t(lang, "वी.नि.सं.", "Vir Nirvan Sa.")} value={fmtNum(day.samvats?.virNirvan)} />
        <KV label={t(lang, "म.जन्म सं.", "Mahavir Janma Sa.")} value={fmtNum(day.samvats?.mahavirJanma)} />
        <KV label={t(lang, "विक्रम सं.", "Vikram Sa.")} value={fmtNum(day.samvats?.vikram)} />
        <KV label={t(lang, "शक सं.", "Shaka Sa.")} value={fmtNum(day.samvats?.shaka)} />
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// InlineSettings — language pills + city autodetect + settings drawer.
// State for numberStyle/timeFormat is owned by PanchangBody; this component
// only renders + dispatches via callbacks. City + language go through URL
// params so the server component re-renders with the new values.
// ─────────────────────────────────────────────────────────────────────────────

function InlineSettings({
  dateParam, currentLang, currentCity, numberStyle, timeFormat, onNumberStyle, onTimeFormat,
}: {
  dateParam: string;
  currentLang: Lang;
  currentCity: { name: string; lat: number; lng: number; tz: number };
  numberStyle: NumberStyle;
  timeFormat: TimeFormat;
  onNumberStyle: (n: NumberStyle) => void;
  onTimeFormat: (t: TimeFormat) => void;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [open, setOpen] = useState(false);
  const [detecting, setDetecting] = useState(false);

  // Restore persisted city + language once (on first mount). If saved differs from
  // the URL, push the saved value into the URL so the server re-renders with it.
  const restoredRef = useRef(false);
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    const saved = readLS<City | null>(LS.city, null);
    if (saved && saved.name !== currentCity.name) pushCity(saved);
    const savedLang = readLS<Lang | null>(LS.lang, null);
    if (savedLang && !sp?.get("lang")) pushLang(savedLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pushCity = (c: City) => {
    writeLS(LS.city, c);
    const params = new URLSearchParams(sp?.toString() ?? "");
    params.set("city", c.name);
    params.set("lat", String(c.lat));
    params.set("lng", String(c.lng));
    params.set("tz", String(c.tz));
    router.replace(`/d/${dateParam}?${params.toString()}`);
  };
  const pushLang = (next: Lang) => {
    writeLS(LS.lang, next);
    const params = new URLSearchParams(sp?.toString() ?? "");
    params.set("lang", next);
    router.replace(`/d/${dateParam}?${params.toString()}`);
  };
  const detectLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      alert("Geolocation not available in this browser.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { pushCity(nearestCity(pos.coords.latitude, pos.coords.longitude)); setDetecting(false); },
      (err) => { setDetecting(false); alert("Could not detect location: " + err.message); },
      { timeout: 10000, maximumAge: 60_000 },
    );
  };

  const langPill = (key: Lang, label: string) => (
    <button
      key={key}
      onClick={() => pushLang(key)}
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors ${
        currentLang === key ? "bg-stone-800 text-white" : "bg-stone-200 text-stone-700 hover:bg-stone-300"
      }`}
    >
      {label}
    </button>
  );
  const optPill = <T extends string>(active: T, key: T, click: () => void, label: string) => (
    <button
      key={key}
      onClick={click}
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${
        active === key ? "bg-stone-800 text-white" : "bg-stone-200 text-stone-700 hover:bg-stone-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
      <div className="flex items-center gap-1 rounded-full border border-stone-300 bg-white p-0.5">
        {langPill("hi", "हिं")}
        {langPill("en", "EN")}
        {langPill("both", "both")}
      </div>
      <button
        onClick={detectLocation}
        disabled={detecting}
        title="Detect my city"
        className="rounded-full border border-stone-300 bg-white px-2 py-0.5 font-semibold text-stone-700 hover:bg-stone-100 disabled:opacity-50"
      >
        {detecting ? "…" : "📍"} {currentCity.name}
      </button>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-stone-300 bg-white px-2 py-0.5 font-semibold text-stone-700 hover:bg-stone-100"
      >
        ⚙ {open ? "close" : "settings"}
      </button>
      {open && (
        <div className="mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 shadow-sm">
          <div className="mb-3">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">City</div>
            <div className="flex flex-wrap gap-1">
              {PRESET_CITIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => pushCity(c)}
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    currentCity.name === c.name ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">Number style</div>
            <div className="flex gap-1">
              {optPill(numberStyle, "western" as NumberStyle, () => onNumberStyle("western"), "1234")}
              {optPill(numberStyle, "devanagari" as NumberStyle, () => onNumberStyle("devanagari"), "१२३४")}
            </div>
          </div>
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">Time format</div>
            <div className="flex gap-1">
              {optPill(timeFormat, "12h" as TimeFormat, () => onTimeFormat("12h"), "12h")}
              {optPill(timeFormat, "24h" as TimeFormat, () => onTimeFormat("24h"), "24h")}
              {optPill(timeFormat, "24plus" as TimeFormat, () => onTimeFormat("24plus"), "24+")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout primitives
// ─────────────────────────────────────────────────────────────────────────────

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>;
}
function Grid3({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function Divider({ label }: { label: string }) {
  return (
    <div className="mt-6 mb-2 flex items-center gap-3">
      <div className="h-px flex-1 bg-stone-300" />
      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{label}</span>
      <div className="h-px flex-1 bg-stone-300" />
    </div>
  );
}

function Section({
  title, hint, accent, children,
}: { title: string; hint?: string; accent?: string; children: React.ReactNode }) {
  return (
    <section
      className="mt-3 rounded-lg border bg-white"
      style={{ borderColor: accent ?? "#d6d3d1" }}
    >
      <header
        className="border-b px-3 py-1.5"
        style={{
          background: accent ? accent + "12" : "#f5f5f4",
          borderColor: accent ?? "#e7e5e4",
        }}
      >
        <h2 className="text-sm font-bold" style={{ color: accent ?? "#292524" }}>{title}</h2>
        {hint && <div className="text-[10px] text-stone-500">{hint}</div>}
      </header>
      <div className="p-3">{children}</div>
    </section>
  );
}

function CardSection({
  title, hint, children,
}: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-stone-300 bg-white">
      <header className="border-b border-stone-200 bg-stone-100 px-3 py-1.5">
        <h2 className="text-sm font-bold text-stone-800">{title}</h2>
        {hint && <div className="text-[10px] text-stone-500">{hint}</div>}
      </header>
      <div className="p-3">{children}</div>
    </section>
  );
}

function KV({
  label, value, time, mono = false,
}: { label: string; value?: React.ReactNode; time?: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-dotted border-stone-200 py-1 last:border-0">
      <span className="text-xs font-semibold text-stone-600">{label}</span>
      <span className="flex items-baseline gap-2 text-right">
        {value !== undefined && (
          <span className={`text-sm text-stone-900 ${mono ? "font-mono" : ""}`}>
            {value === null || value === "" ? "—" : value}
          </span>
        )}
        {time && <span className="font-mono text-xs text-stone-500">{time}</span>}
      </span>
    </div>
  );
}

function Badge({
  text, tone,
}: { text: string; tone: "green" | "red" | "amber" | "blue" | "purple" | "stone" | "orange" }) {
  const cls: Record<typeof tone, string> = {
    green: "bg-emerald-100 text-emerald-800 border-emerald-300",
    red: "bg-rose-100 text-rose-800 border-rose-300",
    amber: "bg-amber-100 text-amber-800 border-amber-300",
    blue: "bg-blue-100 text-blue-800 border-blue-300",
    purple: "bg-purple-100 text-purple-800 border-purple-300",
    stone: "bg-stone-100 text-stone-700 border-stone-300",
    orange: "bg-orange-100 text-orange-800 border-orange-300",
  };
  return <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold ${cls[tone]}`}>{text}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Bilingual helpers
// ─────────────────────────────────────────────────────────────────────────────

function bilingual(hi?: string | null, en?: string | null, lang?: Lang): string {
  if (lang === "hi") return hi ?? en ?? "";
  if (lang === "en") return en ?? hi ?? "";
  if (hi && en) return `${hi} (${en})`;
  return hi ?? en ?? "";
}

function t(lang: Lang, hi: string, en: string): string {
  if (lang === "en") return en;
  if (lang === "hi") return hi;
  return hi; // labels stay short; both-mode uses Hindi label, English shows in value
}

// Translate short status / classification badge text per language.
function badgeText(lang: Lang, key: string): string {
  if (lang === "en") return key;
  const hiMap: Record<string, string> = {
    "shubh": "शुभ",
    "ashubh": "अशुभ",
    "ati-shubh": "अति-शुभ",
    "active": "सक्रिय",
    "inactive": "निष्क्रिय",
    "kshaya": "क्षय",
    // Choghadiya transliterations (engine returns these in `name`)
    "Amrit": "अमृत",
    "Kaal": "काल",
    "Shubh": "शुभ",
    "Rog": "रोग",
    "Udveg": "उद्वेग",
    "Chal": "चल",
    "Labh": "लाभ",
  };
  return hiMap[key] ?? key;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section: Live Now (the hero — current chaughadiya + nitya muhurta + active flags)
// ─────────────────────────────────────────────────────────────────────────────

function SectionLiveNow({
  day, lang, isToday, nowMin, fmt,
}: { day: PanchangDay; lang: Lang; isToday: boolean; nowMin: number; fmt: Fmt }) {
  // Build "what's active right now" summary
  const dayChogh = day.choghadiya?.day ?? [];
  const nightChogh = day.choghadiya?.night ?? [];
  const allChogh = [...dayChogh, ...nightChogh];
  const activeChogh = isToday ? allChogh.find((s) => isActiveWindow(nowMin, s.start, s.end)) : null;

  const allNitya = day.nityaMuhurtas ?? [];
  const activeNitya = isToday ? allNitya.find((m) => isActiveWindow(nowMin, m.startTime, m.endTime)) : null;

  // Inauspicious windows currently active
  const checkActive = (m?: { start: string; end: string }) =>
    isToday && m ? isActiveWindow(nowMin, m.start, m.end) : false;
  const ashubhActive: Array<{ labelHi: string; labelEn: string; range: string }> = [];
  const M = day.muhurtas;
  if (M?.rahuKalam && checkActive(M.rahuKalam)) ashubhActive.push({ labelHi: "राहु काल", labelEn: "Rahu Kalam", range: fmt.range(M.rahuKalam.start, M.rahuKalam.end) ?? "" });
  if (M?.yamganda && checkActive(M.yamganda)) ashubhActive.push({ labelHi: "यमगण्ड", labelEn: "Yamaganda", range: fmt.range(M.yamganda.start, M.yamganda.end) ?? "" });
  if (M?.gulikaKalam && checkActive(M.gulikaKalam)) ashubhActive.push({ labelHi: "गुलिक काल", labelEn: "Gulika", range: fmt.range(M.gulikaKalam.start, M.gulikaKalam.end) ?? "" });

  // Auspicious windows currently active
  const shubhActive: Array<{ labelHi: string; labelEn: string; range: string }> = [];
  if (M?.abhijit && checkActive(M.abhijit)) shubhActive.push({ labelHi: "अभिजित", labelEn: "Abhijit", range: fmt.range(M.abhijit.start, M.abhijit.end) ?? "" });
  if (M?.brahmaMuhurta && checkActive(M.brahmaMuhurta)) shubhActive.push({ labelHi: "ब्रह्म मुहूर्त", labelEn: "Brahma", range: fmt.range(M.brahmaMuhurta.start, M.brahmaMuhurta.end) ?? "" });
  if (day.extraMuhurtas?.vijaya && checkActive(day.extraMuhurtas.vijaya)) shubhActive.push({ labelHi: "विजय", labelEn: "Vijaya", range: fmt.range(day.extraMuhurtas.vijaya.start, day.extraMuhurtas.vijaya.end) ?? "" });

  // Bhadra active right now (any of its periods)
  const bhadraActive = isToday && day.bhadra?.active && day.bhadra.periods?.some((p) => isActiveWindow(nowMin, p.startTime, p.endTime));

  const title = lang === "en"
    ? "Necessary Information — Right Now"
    : lang === "hi"
    ? "आवश्यक जानकारी — अभी"
    : "आवश्यक जानकारी · Necessary Information";

  return (
    <Section
      title={title}
      hint={isToday
        ? (lang === "en" ? `Live (server time = IST ${fmt.time(formatNowMin(nowMin))})` : `अभी (सर्वर समय IST ${fmt.time(formatNowMin(nowMin))})`)
        : (lang === "en" ? "Live highlights only show on today's date" : "लाइव संकेत केवल आज की तिथि पर दिखते हैं")}
      accent="#c2410c"
    >
      {!isToday && (
        <div className="rounded bg-stone-100 px-3 py-2 text-xs italic text-stone-600">
          {lang === "en"
            ? "This page is for a different date — \"currently active\" highlights are hidden. Open today's date to see live highlights."
            : "यह पृष्ठ अन्य तिथि का है — \"अभी सक्रिय\" संकेत छुपे हैं। आज की तिथि खोलें।"}
        </div>
      )}

      {isToday && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Current chaughadiya */}
          <div className="rounded-lg border border-stone-300 bg-stone-50 p-3">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">
              {t(lang, "अभी का चौघड़िया", "Current Choghadiya")}
            </div>
            {activeChogh ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold" style={{ color: activeChogh.type === "shubh" ? "#15803d" : "#b91c1c" }}>
                    {bilingual(activeChogh.nameHi, activeChogh.name, lang)}
                  </span>
                  <Badge text={badgeText(lang, activeChogh.type)} tone={activeChogh.type === "shubh" ? "green" : "red"} />
                </div>
                <div className="font-mono text-xs text-stone-600">{fmt.range(activeChogh.start, activeChogh.end)}</div>
              </>
            ) : (
              <div className="text-xs italic text-stone-500">—</div>
            )}
          </div>

          {/* Current nitya muhurta */}
          <div className="rounded-lg border border-stone-300 bg-stone-50 p-3">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">
              {t(lang, "अभी का नित्य मुहूर्त", "Current Nitya Muhurta")}
            </div>
            {activeNitya ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-mono text-stone-500">#{fmt.num(activeNitya.number)}</span>
                  <span className="text-lg font-bold text-stone-900">{bilingual(activeNitya.nameHi, activeNitya.nameEn, lang)}</span>
                  <Badge
                    text={badgeText(lang, activeNitya.classification)}
                    tone={activeNitya.classification === "ati-shubh" ? "amber" : activeNitya.classification === "shubh" ? "green" : "red"}
                  />
                </div>
                <div className="font-mono text-xs text-stone-600">{fmt.range(activeNitya.startTime, activeNitya.endTime)}</div>
                <div className="mt-1.5 text-xs">
                  <div><span className="font-bold text-emerald-700">{t(lang, "करें:", "Do:")}</span> <span className="text-stone-700">{lang === "en" ? (activeNitya.doEn ?? activeNitya.doHi) : activeNitya.doHi}</span></div>
                  <div><span className="font-bold text-rose-700">{t(lang, "न करें:", "Don't:")}</span> <span className="text-stone-700">{lang === "en" ? (activeNitya.dontEn ?? activeNitya.dontHi) : activeNitya.dontHi}</span></div>
                </div>
              </>
            ) : (
              <div className="text-xs italic text-stone-500">—</div>
            )}
          </div>
        </div>
      )}

      {/* Active inauspicious / auspicious flags */}
      {isToday && (ashubhActive.length > 0 || shubhActive.length > 0 || bhadraActive) && (
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {ashubhActive.length > 0 && (
            <div className="rounded border border-rose-300 bg-rose-50 p-2">
              <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-rose-800">
                ⚠ {t(lang, "अभी अशुभ", "Inauspicious now")}
              </div>
              <ul className="text-xs text-rose-900">
                {ashubhActive.map((a, i) => (
                  <li key={i}>· <strong>{bilingual(a.labelHi, a.labelEn, lang)}</strong> <span className="font-mono text-rose-700">({a.range})</span></li>
                ))}
                {bhadraActive && <li>· <strong>{bilingual("भद्रा", "Bhadra", lang)}</strong></li>}
              </ul>
            </div>
          )}
          {shubhActive.length > 0 && (
            <div className="rounded border border-emerald-300 bg-emerald-50 p-2">
              <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                ✓ {t(lang, "अभी शुभ", "Auspicious now")}
              </div>
              <ul className="text-xs text-emerald-900">
                {shubhActive.map((a, i) => (
                  <li key={i}>· <strong>{bilingual(a.labelHi, a.labelEn, lang)}</strong> <span className="font-mono text-emerald-700">({a.range})</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Period flags (always shown — relevant whether or not "today") */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {day.panchak && <Badge text={t(lang, "पंचक सक्रिय", "Panchak active")} tone="red" />}
        {day.bhadra?.active && <Badge text={t(lang, "भद्रा (विष्टि)", "Bhadra (Vishti)")} tone="red" />}
        {day.mool && <Badge text={t(lang, "मूल / गण्डान्त", "Mool / Gandanta")} tone="red" />}
        {day.specialYogas?.map((sy, i) => (
          <Badge key={i} text={bilingual(sy.nameHi, sy.nameEn, lang)} tone="green" />
        ))}
      </div>
    </Section>
  );
}

function formatNowMin(m: number): string {
  if (m < 0) return "—";
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sections — Jain practice (top)
// ─────────────────────────────────────────────────────────────────────────────

function SectionRasTyag({ day, lang, isToday }: { day: PanchangDay; lang: Lang; isToday: boolean }) {
  if (!day.rasTyag) return null;
  const titleHi = isToday ? "रस त्याग — आज क्या त्याग करें" : "रस त्याग — इस दिन क्या त्याग करें";
  const titleEn = isToday ? "Ras Tyag — Renunciation today" : "Ras Tyag — Renunciation for this day";
  return (
    <Section
      title={t(lang, titleHi, titleEn)}
      accent="#1a8b3a"
    >
      <div className="flex items-baseline gap-3">
        <div className="text-3xl">{day.rasTyag.emoji}</div>
        <div>
          <div className="text-base font-bold text-stone-900">{bilingual(day.rasTyag.rasHi, day.rasTyag.rasEn, lang)}</div>
          <div className="text-sm text-stone-700">{lang === "en" ? day.rasTyag.itemsEn : day.rasTyag.itemsHi}</div>
        </div>
      </div>
    </Section>
  );
}

function SectionEvents({ day, lang, isToday }: { day: PanchangDay; lang: Lang; isToday: boolean }) {
  const titleHi = isToday ? "आज के पर्व · कल्याणक · व्रत" : "इस दिन के पर्व · कल्याणक · व्रत";
  const titleEn = isToday ? "Today's Events — Parva · Kalyanak · Vrat" : "Events on this day — Parva · Kalyanak · Vrat";
  const emptyHi = isToday ? "आज कोई विशेष पर्व नहीं" : "इस दिन कोई विशेष पर्व नहीं";
  const emptyEn = isToday ? "No special events today" : "No special events on this day";
  return (
    <Section
      title={t(lang, titleHi, titleEn)}
      accent="#8b1a1a"
    >
      {day.todayEvents.length === 0 ? (
        <div className="py-2 text-center text-xs italic text-stone-500">
          {t(lang, emptyHi, emptyEn)}
        </div>
      ) : (
        <ul className="space-y-1">
          {day.todayEvents.map((e) => (
            <li key={e.eventId} className="flex items-baseline gap-3 border-b border-dotted border-stone-200 py-1 last:border-0">
              <Badge text={e.category} tone="purple" />
              <div>
                <div className="text-sm font-semibold text-stone-900">
                  {lang === "en" ? e.nameEn : e.nameHi}
                  {lang === "both" && <span className="ml-2 text-xs font-normal text-stone-500">{e.nameEn}</span>}
                </div>
              </div>
              <span className="ml-auto inline-block h-3 w-3 rounded-full" style={{ background: e.colorTheme }} title={e.colorTheme} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function SectionTomorrow({ day, lang, isToday, fmt }: { day: PanchangDay; lang: Lang; isToday: boolean; fmt: Fmt }) {
  if (!day.tomorrow) return null;
  const titleHi = isToday ? "कल" : "अगला दिन";
  const titleEn = isToday ? "Tomorrow" : "Next day";
  const linkHi = isToday ? "कल का विवरण देखें" : "अगले दिन का विवरण देखें";
  const linkEn = isToday ? "Open tomorrow's detail" : "Open next day's detail";
  return (
    <Section title={t(lang, titleHi, titleEn)} accent="#0f766e">
      <KV label={t(lang, "दिनांक", "Date")} value={fmt.date(day.tomorrow.date)} mono />
      <KV label={t(lang, "वार", "Vara")} value={lang === "en" ? (day.tomorrow.varaEn ?? day.tomorrow.varaHi) : day.tomorrow.varaHi} />
      <KV label={t(lang, "तिथि", "Tithi")} value={lang === "en" ? (day.tomorrow.tithiHeadlineEn ?? day.tomorrow.tithiHeadlineHi) : day.tomorrow.tithiHeadlineHi} />
      <a
        href={`/d/${day.tomorrow.date}?lang=${lang}`}
        className="mt-2 inline-block text-xs text-blue-700 underline hover:no-underline"
      >
        ↗ {t(lang, linkHi, linkEn)}
      </a>
    </Section>
  );
}

function SectionUpcoming({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  if (!day.upcomingEvents || day.upcomingEvents.length === 0) return null;
  return (
    <Section
      title={t(lang, `आगामी पर्व (${fmt.num(day.upcomingEvents.length)})`, `Upcoming (${fmt.num(day.upcomingEvents.length)})`)}
      hint={t(lang, "अगले 30 दिन", "Next 30 days")}
      accent="#0f766e"
    >
      <ul className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
        {day.upcomingEvents.slice(0, 16).map((e, i) => (
          <li key={`${e.eventId}-${i}`} className="flex items-baseline justify-between border-b border-dotted border-stone-200 py-1">
            <span className="text-xs text-stone-800">{lang === "en" ? e.nameEn : e.nameHi}</span>
            <span className="font-mono text-[10px] text-stone-500">{fmt.date(e.date)}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sections — Full detail (below the divider)
// ─────────────────────────────────────────────────────────────────────────────

function SectionPanchaAnga({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  return (
    <CardSection
      title={t(lang, "पञ्चाङ्ग — पाँच अंग", "Panchanga — Five Angas")}
      hint={t(lang, "तिथि · नक्षत्र · योग · करण · वार", "Tithi · Nakshatra · Yoga · Karana · Vara")}
    >
      <KV label={t(lang, "तिथि", "Tithi")} value={lang === "en" ? `${day.tithi.nameEn} ${day.tithi.pakshaEn}` : bilingual(`${day.tithi.nameHi} (${day.tithi.pakshaHi})`, `${day.tithi.nameEn} ${day.tithi.pakshaEn}`, lang)} time={t(lang, `समाप्ति ${fmt.time(day.tithi.endTime)}`, `ends ${fmt.time(day.tithi.endTime)}`)} />
      <KV label={t(lang, "तिथि प्रारम्भ", "Tithi start")} time={fmt.time(day.tithi.startTime)} mono />
      {day.kshayaTithi && (
        <KV label={t(lang, "क्षय तिथि", "Kshaya tithi")}
            value={<><Badge text={badgeText(lang, "kshaya")} tone="amber" /> {bilingual(day.kshayaTithi.nameHi, day.kshayaTithi.nameEn, lang)}
              <span className="ml-2 text-[10px] font-normal italic text-stone-500">
                {t(lang, "(अगली तिथि छूटी — आज में जोड़ी)", "(skipped tithi — merged into today)")}
              </span>
            </>} />
      )}
      {day.isVriddhiRepeat && (
        <KV label={t(lang, "वृद्धि", "Vriddhi")}
            value={<><Badge text={t(lang, "पुनरावृत्ति दिन", "repeat day")} tone="blue" />
              <span className="ml-2 text-[10px] font-normal italic text-stone-500">
                {t(lang, "(कल भी यही तिथि — व्रत/पर्व पहले दिन गिनें)", "(same tithi yesterday — count vrat/parva from the first day)")}
              </span>
            </>} />
      )}
      <KV label={t(lang, "नक्षत्र", "Nakshatra")} value={`${bilingual(day.nakshatra?.nameHi, day.nakshatra?.nameEn, lang)} #${fmt.num(day.nakshatra?.number)}`} time={day.nakshatra?.endTime ? t(lang, `समाप्ति ${fmt.time(day.nakshatra.endTime)}`, `ends ${fmt.time(day.nakshatra.endTime)}`) : undefined} />
      <KV label={t(lang, "नक्षत्र पाद", "Nakshatra Pada")} value={day.nakshatraPada ? `${fmt.num(day.nakshatraPada)}/${fmt.num(4)}` : undefined} />
      <KV label={t(lang, "योग", "Yoga")} value={`${bilingual(day.yoga?.nameHi, day.yoga?.nameEn, lang)} #${fmt.num(day.yoga?.number)}`} time={day.yoga?.endTime ? t(lang, `समाप्ति ${fmt.time(day.yoga.endTime)}`, `ends ${fmt.time(day.yoga.endTime)}`) : undefined} />
      {day.yogaSequence && day.yogaSequence.length > 1 && (
        <KV label={t(lang, "योग क्रम", "Yoga sequence")}
            value={day.yogaSequence.map((y) => `${lang === "en" ? y.nameEn : y.nameHi} (→${fmt.time(y.endTime)})`).join(" · ")} />
      )}
      <KV label={t(lang, "करण", "Karana")} value={bilingual(day.karana?.nameHi, day.karana?.nameEn, lang)} time={day.karana?.endTime ? t(lang, `समाप्ति ${fmt.time(day.karana.endTime)}`, `ends ${fmt.time(day.karana.endTime)}`) : undefined} />
      {day.karanaSequence && day.karanaSequence.length > 1 && (
        <KV label={t(lang, "करण क्रम", "Karana sequence")}
            value={day.karanaSequence.map((k) => `${lang === "en" ? k.nameEn : k.nameHi} (→${fmt.time(k.endTime)})`).join(" · ")} />
      )}
      <KV label={t(lang, "वार", "Vara")} value={bilingual(day.varaHi, day.varaEn, lang)} />
      <KV label={t(lang, "तिथि प्रवृत्ति", "Tithi Pravritti")}
          value={day.tithiPravritti ? <>
            {bilingual(day.tithiPravritti.nameHi, day.tithiPravritti.nameEn, lang)}
            <span className="ml-2 text-[10px] italic text-stone-500">
              — {lang === "en"
                  ? (TITHI_PRAVRITTI_HINTS[day.tithiPravritti.nameEn] ?? "")
                  : (TITHI_PRAVRITTI_HINTS_HI[day.tithiPravritti.nameEn] ?? "")}
            </span>
          </> : undefined} />
    </CardSection>
  );
}

function SectionSunMoon({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  return (
    <CardSection title={t(lang, "सूर्य · चन्द्र", "Sun · Moon")} hint={t(lang, "उदय/अस्त एवं दिवस अवधि", "Rise/set and day duration")}>
      <KV label={t(lang, "सूर्योदय", "Sunrise")} time={fmt.time(day.sunTimes?.sunrise)} mono />
      <KV label={t(lang, "सूर्यास्त", "Sunset")} time={fmt.time(day.sunTimes?.sunset)} mono />
      <KV label={t(lang, "चन्द्रोदय", "Moonrise")} time={day.sunTimes?.moonrise ? fmt.time(day.sunTimes.moonrise) : "—"} mono />
      <KV label={t(lang, "चन्द्रास्त", "Moonset")} time={day.sunTimes?.moonset ? fmt.time(day.sunTimes.moonset) : "—"} mono />
      <KV label={t(lang, "दिवस अवधि", "Day duration")} value={day.dayDuration ? fmt.num(day.dayDuration) : undefined} mono />
      <KV label={t(lang, "ऋतु", "Ritu")} value={day.ritu ? bilingual(day.ritu.hi, day.ritu.en, lang) : undefined} />
      <KV label={t(lang, "अयन", "Ayana")} value={day.ayana ? bilingual(day.ayana.hi, day.ayana.en, lang) : undefined} />
    </CardSection>
  );
}

function SectionRashi({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  return (
    <CardSection title={t(lang, "राशि · नक्षत्र · लग्न", "Rashi · Nakshatra · Lagna")} hint={t(lang, "ग्रह स्थिति", "Position summary")}>
      <KV
        label={t(lang, "चन्द्र राशि", "Moon Rashi")}
        value={day.moonRashi ? `${bilingual(day.moonRashi.nameHi, day.moonRashi.nameEn, lang)} #${fmt.num(day.moonRashi.number)}` : undefined}
        time={day.moonRashi?.entryTime ? t(lang, `प्रवेश ${fmt.time(day.moonRashi.entryTime)}`, `entered ${fmt.time(day.moonRashi.entryTime)}`) : undefined}
      />
      <KV
        label={t(lang, "सूर्य राशि", "Sun Rashi")}
        value={day.sunRashi ? `${bilingual(day.sunRashi.nameHi, day.sunRashi.nameEn, lang)} #${fmt.num(day.sunRashi.number)}` : undefined}
        time={day.sunRashi?.entryTime ? t(lang, `प्रवेश ${fmt.time(day.sunRashi.entryTime)}`, `entered ${fmt.time(day.sunRashi.entryTime)}`) : undefined}
      />
      <KV
        label={t(lang, "सूर्य नक्षत्र", "Sun Nakshatra")}
        value={day.sunNakshatra ? `${bilingual(day.sunNakshatra.nameHi, day.sunNakshatra.nameEn, lang)} #${fmt.num(day.sunNakshatra.number)}` : undefined}
        time={day.sunNakshatra?.entryTime ? t(lang, `प्रवेश ${fmt.time(day.sunNakshatra.entryTime)}`, `entered ${fmt.time(day.sunNakshatra.entryTime)}`) : undefined}
      />
      <KV
        label={t(lang, "उदय लग्न", "Udaya Lagna")}
        value={day.lagnaAtSunrise ? `${bilingual(day.lagnaAtSunrise.nameHi, day.lagnaAtSunrise.nameEn, lang)} #${fmt.num(day.lagnaAtSunrise.number)}` : undefined}
      />
      <KV
        label={t(lang, "सूर्योदय होरा", "Sunrise Hora Lord")}
        value={day.horaLordSunrise ? bilingual(day.horaLordSunrise.planetHi, day.horaLordSunrise.planetEn, lang) : undefined}
      />
    </CardSection>
  );
}

function SectionCalendar({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  return (
    <CardSection title={t(lang, "मास · संवत्", "Maas · Samvats")} hint={t(lang, "दोनों परम्पराएँ + अधिक मास", "Both Amanta and Purnimanta")}>
      <KV label={t(lang, "माह (पूर्णिमान्त)", "Maas (Purnimanta)")} value={day.hinduMonthPurnimanta ? bilingual(day.hinduMonthPurnimanta.hi, day.hinduMonthPurnimanta.en, lang) : undefined} />
      <KV label={t(lang, "माह (अमान्त)", "Maas (Amanta)")} value={day.hinduMonthAmanta ? bilingual(day.hinduMonthAmanta.hi, day.hinduMonthAmanta.en, lang) : undefined} />
      <KV
        label={t(lang, "अधिक मास", "Adhika Maas")}
        value={day.masaIsAdhika ? <Badge text={t(lang, "अधिक", "adhika")} tone="amber" /> : <Badge text={t(lang, "निज", "nija")} tone="stone" />}
      />
      {day.masaIsAdhika && (
        <div className="ml-2 text-[10px] italic text-amber-700">
          {t(lang,
            "अधिक मास में जैन व्रत/कल्याणक स्थगित — निज मास में मनाए जाते हैं।",
            "In adhika maas, Jain vrats / kalyanaks are deferred to the nija (regular) month.")}
        </div>
      )}
      <KV label={t(lang, "VNS तिथि", "VNS date")} value={lang === "en" ? (day.vnsDateEn ?? day.vnsDateHi) : day.vnsDateHi} />
      <KV label={t(lang, "वी.नि. संवत्", "Vir Nirvan Sa.")} value={fmt.num(day.samvats?.virNirvan)} mono />
      <KV label={t(lang, "म. जन्म संवत्", "Mahavir Janma Sa.")} value={fmt.num(day.samvats?.mahavirJanma)} mono />
      <KV label={t(lang, "विक्रम संवत्", "Vikram Sa.")} value={fmt.num(day.samvats?.vikram)} mono />
      <KV label={t(lang, "शक संवत्", "Shaka Sa.")} value={fmt.num(day.samvats?.shaka)} mono />
    </CardSection>
  );
}

function SectionAuspicious({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  return (
    <CardSection title={t(lang, "शुभ मुहूर्त", "Auspicious Windows")} hint={t(lang, "कार्य आरम्भ हेतु अनुकूल", "Recommended periods")}>
      <KV label={t(lang, "अभिजित", "Abhijit")} time={fmt.range(day.muhurtas?.abhijit?.start, day.muhurtas?.abhijit?.end)} mono />
      <KV label={t(lang, "विजय", "Vijaya")} time={fmt.range(day.extraMuhurtas?.vijaya?.start, day.extraMuhurtas?.vijaya?.end)} mono />
      <KV label={t(lang, "ब्रह्म मुहूर्त", "Brahma Muhurta")} time={fmt.range(day.muhurtas?.brahmaMuhurta?.start, day.muhurtas?.brahmaMuhurta?.end)} mono />
      <KV label={t(lang, "गोधूलि", "Godhuli")} time={fmt.range(day.extraMuhurtas?.godhuli?.start, day.extraMuhurtas?.godhuli?.end)} mono />
      <KV label={t(lang, "प्रातः सन्ध्या", "Pratah Sandhya")} time={fmt.range(day.extraMuhurtas?.pratahSandhya?.start, day.extraMuhurtas?.pratahSandhya?.end)} mono />
      <KV label={t(lang, "सायं सन्ध्या", "Sayahna Sandhya")} time={fmt.range(day.extraMuhurtas?.sayahnaSandhya?.start, day.extraMuhurtas?.sayahnaSandhya?.end)} mono />
      <KV label={t(lang, "निशीथ काल", "Nishita Kaal")} time={fmt.range(day.extraMuhurtas?.nishitaKaal?.start, day.extraMuhurtas?.nishitaKaal?.end)} mono />
      <KV
        label={t(lang, "आनंदादि योग", "Anandadi Yoga")}
        value={day.anandadiYoga ? <>
          {bilingual(day.anandadiYoga.nameHi, day.anandadiYoga.name, lang)}{" "}
          <Badge text={badgeText(lang, day.anandadiYoga.type)} tone={day.anandadiYoga.type === "shubh" ? "green" : "red"} />
        </> : undefined}
      />
    </CardSection>
  );
}

function SectionInauspicious({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  return (
    <CardSection title={t(lang, "अशुभ मुहूर्त", "Inauspicious Windows")} hint={t(lang, "सावधानी; कार्य आरम्भ न करें", "Avoid important undertakings")}>
      <KV label={t(lang, "राहु काल", "Rahu Kalam")} time={fmt.range(day.muhurtas?.rahuKalam?.start, day.muhurtas?.rahuKalam?.end)} mono />
      <KV label={t(lang, "यमगण्ड", "Yamaganda")} time={fmt.range(day.muhurtas?.yamganda?.start, day.muhurtas?.yamganda?.end)} mono />
      <KV label={t(lang, "गुलिक काल", "Gulika Kalam")} time={fmt.range(day.muhurtas?.gulikaKalam?.start, day.muhurtas?.gulikaKalam?.end)} mono />
      <KV label={t(lang, "कुलिक", "Kulik")} time={fmt.range(day.muhurtas?.kulik?.start, day.muhurtas?.kulik?.end)} mono />
      <KV label={t(lang, "कालवेला", "Kalvela")} time={fmt.range(day.muhurtas?.kalvela?.start, day.muhurtas?.kalvela?.end)} mono />
      <KV label={t(lang, "कण्टक / मृत्यु", "Kantak / Mrityu")} time={fmt.range(day.muhurtas?.kantakMrityu?.start, day.muhurtas?.kantakMrityu?.end)} mono />
      <KV label={t(lang, "यमघण्ट", "Yamghant")} time={fmt.range(day.muhurtas?.yamghant?.start, day.muhurtas?.yamghant?.end)} mono />
      {day.durMuhurta && day.durMuhurta.length > 0 && day.durMuhurta.map((d, i) => (
        <KV key={i}
            label={day.durMuhurta!.length > 1 ? t(lang, `दुर्मुहूर्त ${i + 1}`, `Dur-Muhurta ${i + 1}`) : t(lang, "दुर्मुहूर्त", "Dur-Muhurta")}
            time={fmt.range(d.start, d.end)} mono />
      ))}
    </CardSection>
  );
}

function SectionDirections({ day, lang }: { day: PanchangDay; lang: Lang }) {
  return (
    <CardSection title={t(lang, "दिशा", "Directions")} hint={t(lang, "दिशा शूल · वार शूल", "Disha Shool · Vara Shoola")}>
      <KV
        label={t(lang, "दिशा शूल (यात्रा वर्जित)", "Disha Shool (avoid travel)")}
        value={day.dishaShool ? bilingual(day.dishaShool.directionHi, day.dishaShool.direction, lang) : undefined}
      />
      <KV
        label={t(lang, "वार शूल (मुख दिशा)", "Vara Shoola (face direction)")}
        value={day.varaShoola ? bilingual(day.varaShoola.directionHi, day.varaShoola.direction, lang) : undefined}
      />
    </CardSection>
  );
}

function SectionPeriodFlags({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  return (
    <CardSection title={t(lang, "पंचक · भद्रा · मूल", "Panchak · Bhadra · Mool")}>
      <KV label={t(lang, "पंचक", "Panchak")} value={day.panchak ? <Badge text={badgeText(lang, "active")} tone="red" /> : <Badge text={badgeText(lang, "inactive")} tone="stone" />} />
      <KV label={t(lang, "भद्रा (विष्टि)", "Bhadra (Vishti)")} value={day.bhadra?.active ? <Badge text={badgeText(lang, "active")} tone="red" /> : <Badge text={badgeText(lang, "inactive")} tone="stone" />} />
      {day.bhadra?.active && day.bhadra.periods && day.bhadra.periods.length > 0 && (
        <div className="ml-2 mt-1 space-y-0.5">
          {day.bhadra.periods.map((p, i) => {
            const partLabel = p.part
              ? (lang === "en"
                  ? (p.part === "mukh" ? "Mukh (head — most inauspicious)" : p.part === "madhya" ? "Madhya (middle)" : "Puchchha (tail — travel ok)")
                  : (p.part === "mukh" ? "मुख (सर्वाधिक अशुभ)" : p.part === "madhya" ? "मध्य" : "पुच्छ (यात्रा शुभ)"))
              : null;
            const partTone = p.part === "mukh" ? "red" : p.part === "puchchha" ? "green" : "amber";
            return (
              <div key={i} className="flex items-baseline gap-2 text-xs">
                <span className="font-mono text-stone-600">· {fmt.range(p.startTime, p.endTime)}</span>
                {partLabel && <Badge text={partLabel} tone={partTone as "red" | "green" | "amber"} />}
              </div>
            );
          })}
        </div>
      )}
      <KV label={t(lang, "मूल / गण्डान्त", "Mool / Gandanta")} value={day.mool ? <Badge text={badgeText(lang, "active")} tone="red" /> : <Badge text={badgeText(lang, "inactive")} tone="stone" />} />
    </CardSection>
  );
}

function SectionSpecialYogas({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  return (
    <CardSection title={t(lang, "विशेष योग", "Special Yogas")} hint={t(lang, "वार × नक्षत्र संयोग", "Vara × nakshatra combinations")}>
      {!day.specialYogas || day.specialYogas.length === 0 ? (
        <div className="py-2 text-center text-xs italic text-stone-500">
          {t(lang, "कोई विशेष योग नहीं", "No special yogas")}
        </div>
      ) : (
        <ul>
          {day.specialYogas.map((sy, i) => (
            <li key={i} className="flex items-baseline justify-between border-b border-dotted border-stone-200 py-1 last:border-0">
              <span className="text-sm font-bold text-stone-800">{bilingual(sy.nameHi, sy.nameEn, lang)}</span>
              <span className="font-mono text-xs text-stone-600">{fmt.range(sy.startTime, sy.endTime)}</span>
            </li>
          ))}
        </ul>
      )}
    </CardSection>
  );
}

function SectionChoghadiya({
  day, lang, nowMin, isToday, fmt,
}: { day: PanchangDay; lang: Lang; nowMin: number; isToday: boolean; fmt: Fmt }) {
  if (!day.choghadiya) return null;
  return (
    <Section title={t(lang, "दिन-रात्रि चौघड़िया (8+8)", "Choghadiya (8+8 segments)")} hint={t(lang, "दिन एवं रात्रि के 8-8 बराबर भाग", "Day & night divided into 8 equal parts each")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChoghadiyaTable label={t(lang, "दिन का चौघड़िया", "Day Choghadiya")} segments={day.choghadiya.day} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />
        <ChoghadiyaTable label={t(lang, "रात्रि का चौघड़िया", "Night Choghadiya")} segments={day.choghadiya.night} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />
      </div>
      <ChoghadiyaGlossary lang={lang} />
    </Section>
  );
}

// One-line "what is each choghadiya for" mini-legend, shown below the day/night tables.
function ChoghadiyaGlossary({ lang }: { lang: Lang }) {
  const ROWS: Array<{ key: string; nameHi: string; nameEn: string; type: "shubh" | "ashubh" | "neutral"; descHi: string; descEn: string }> = [
    { key: "Amrit",  nameHi: "अमृत",   nameEn: "Amrit",  type: "shubh",   descHi: "सर्वोत्तम — कोई भी कार्य",            descEn: "Best — any beginning" },
    { key: "Shubh",  nameHi: "शुभ",    nameEn: "Shubh",  type: "shubh",   descHi: "विवाह, गृहप्रवेश, पूजा",              descEn: "Marriage, housewarming, worship" },
    { key: "Labh",   nameHi: "लाभ",    nameEn: "Labh",   type: "shubh",   descHi: "व्यापार, धन-सम्बन्धी कार्य",          descEn: "Business, financial dealings" },
    { key: "Chal",   nameHi: "चल",     nameEn: "Chal",   type: "neutral", descHi: "यात्रा, सामान्य काम (मध्यम)",         descEn: "Travel, ordinary work (neutral)" },
    { key: "Kaal",   nameHi: "काल",    nameEn: "Kaal",   type: "ashubh",  descHi: "वर्जित — कोई शुभ आरम्भ नहीं",         descEn: "Avoid — no auspicious starts" },
    { key: "Rog",    nameHi: "रोग",    nameEn: "Rog",    type: "ashubh",  descHi: "रोग-योग, चिकित्सा-कार्य ही करें",     descEn: "Disease aspect — only medical work" },
    { key: "Udveg",  nameHi: "उद्वेग", nameEn: "Udveg",  type: "ashubh",  descHi: "तनाव, विवाद — आरम्भ न करें",           descEn: "Stress, disputes — avoid starts" },
  ];
  return (
    <div className="mt-3 rounded border border-stone-200 bg-stone-50 p-2">
      <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-stone-500">
        {t(lang, "चौघड़िया — किसके लिए शुभ?", "Choghadiya — what each is for")}
      </div>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-0.5 text-[11px] sm:grid-cols-2">
        {ROWS.map((r) => (
          <li key={r.key} className="flex items-baseline gap-2">
            <Badge text={badgeText(lang, r.nameEn)} tone={r.type === "shubh" ? "green" : r.type === "ashubh" ? "red" : "stone"} />
            <span className="text-stone-700">{lang === "en" ? r.descEn : r.descHi}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChoghadiyaTable({
  label, segments, lang, nowMin, isToday, fmt,
}: {
  label: string;
  segments: NonNullable<PanchangDay["choghadiya"]>["day"];
  lang: Lang;
  nowMin: number;
  isToday: boolean;
  fmt: Fmt;
}) {
  return (
    <div>
      <div className="mb-1 text-xs font-bold text-stone-700">{label}</div>
      <table className="w-full text-xs">
        <thead className="border-b border-stone-300 text-left text-stone-600">
          <tr>
            <th className="pb-1 font-semibold">#</th>
            <th className="pb-1 font-semibold">{t(lang, "नाम", "Name")}</th>
            <th className="pb-1 font-semibold">{t(lang, "वर्ग", "Type")}</th>
            <th className="pb-1 text-right font-semibold">{t(lang, "समय", "Time")}</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((seg, i) => {
            const active = isToday && isActiveWindow(nowMin, seg.start, seg.end);
            return (
              <tr key={i} className={`border-b border-dotted border-stone-200 last:border-0 ${active ? "bg-orange-50" : ""}`}>
                <td className="py-1 font-mono">{fmt.num(i + 1)}{active && " ⚡"}</td>
                <td className="py-1 font-bold">
                  <span style={{ color: seg.type === "shubh" ? "#15803d" : "#b91c1c" }}>{bilingual(seg.nameHi, seg.name, lang)}</span>
                </td>
                <td className="py-1"><Badge text={badgeText(lang, seg.type)} tone={seg.type === "shubh" ? "green" : "red"} /></td>
                <td className="py-1 text-right font-mono text-stone-600">{fmt.range(seg.start, seg.end)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SectionNitya({
  day, lang, nowMin, isToday, fmt,
}: { day: PanchangDay; lang: Lang; nowMin: number; isToday: boolean; fmt: Fmt }) {
  if (!day.nityaMuhurtas || day.nityaMuhurtas.length === 0) return null;
  const dayM = day.nityaMuhurtas.filter((m) => m.period === "day");
  const nightM = day.nityaMuhurtas.filter((m) => m.period === "night");
  return (
    <Section title={t(lang, "30 नित्य मुहूर्त", "30 Nitya Muhurtas")} hint={t(lang, "दो घटी मुहूर्त — सूर्योदय→सूर्यास्त 15, सूर्यास्त→अगला सूर्योदय 15", "Sunrise→sunset in 15, sunset→next sunrise in 15 (each ≈ 48 min)")}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NityaTable label={t(lang, "दिन के 15 मुहूर्त", "Day muhurtas")} rows={dayM} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />
        <NityaTable label={t(lang, "रात्रि के 15 मुहूर्त", "Night muhurtas")} rows={nightM} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />
      </div>
    </Section>
  );
}

function NityaTable({
  label, rows, lang, nowMin, isToday, fmt,
}: {
  label: string;
  rows: NonNullable<PanchangDay["nityaMuhurtas"]>;
  lang: Lang;
  nowMin: number;
  isToday: boolean;
  fmt: Fmt;
}) {
  return (
    <div>
      <div className="mb-1 text-xs font-bold text-stone-700">{label}</div>
      <table className="w-full text-xs">
        <thead className="border-b border-stone-300 text-left text-stone-600">
          <tr>
            <th className="pb-1 font-semibold">#</th>
            <th className="pb-1 font-semibold">{t(lang, "नाम", "Name")}</th>
            <th className="pb-1 font-semibold">{t(lang, "वर्ग", "Class")}</th>
            <th className="pb-1 font-semibold">{t(lang, "समय", "Time")}</th>
            <th className="pb-1 pr-2 font-semibold text-emerald-700">✓ {t(lang, "करें", "Do")}</th>
            <th className="border-l border-stone-300 pb-1 pl-2 font-semibold text-rose-700">✕ {t(lang, "न करें", "Don't")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => {
            const tone = m.classification === "ati-shubh" ? "amber" : m.classification === "shubh" ? "green" : "red";
            const active = isToday && isActiveWindow(nowMin, m.startTime, m.endTime);
            return (
              <tr key={m.number} className={`border-b border-dotted border-stone-200 align-top last:border-0 ${active ? "bg-orange-50" : ""}`}>
                <td className="py-1 font-mono">{fmt.num(m.number)}{active && " ⚡"}</td>
                <td className="py-1 font-bold">
                  {bilingual(m.nameHi, m.nameEn, lang)}
                </td>
                <td className="py-1"><Badge text={badgeText(lang, m.classification)} tone={tone} /></td>
                <td className="py-1 font-mono text-stone-600">{fmt.range(m.startTime, m.endTime)}</td>
                <td className="py-1 pr-2 text-emerald-800">{lang === "en" ? (m.doEn ?? m.doHi) : m.doHi}</td>
                <td className="border-l border-stone-200 py-1 pl-2 text-rose-800">{lang === "en" ? (m.dontEn ?? m.dontHi) : m.dontHi}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SectionRawJson({ day }: { day: PanchangDay }) {
  return (
    <Section title="Raw JSON" hint="Engine output as returned by /api/panchang">
      <details open>
        <summary className="cursor-pointer text-xs text-blue-700 underline hover:no-underline">show / hide</summary>
        <pre className="mt-2 max-h-[600px] overflow-auto rounded bg-stone-900 p-3 text-[10px] text-stone-100">
{JSON.stringify(day, null, 2)}
        </pre>
      </details>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Verdict — TL;DR card combining tithi-pravritti / anandadi yoga / panchak-bhadra-mool
// / specialYogas into one one-line headline + an overall favorable/mixed/inauspicious tone.
// ─────────────────────────────────────────────────────────────────────────────

function SectionVerdict({ day, lang }: { day: PanchangDay; lang: Lang }) {
  const positives: string[] = [];
  const negatives: string[] = [];
  if (day.tithiPravritti) {
    const hint = TITHI_PRAVRITTI_HINTS[day.tithiPravritti.nameEn] ?? "";
    if (hint) positives.push(`${lang === "en" ? day.tithiPravritti.nameEn : day.tithiPravritti.nameHi} — ${lang === "en" ? hint : (TITHI_PRAVRITTI_HINTS_HI[day.tithiPravritti.nameEn] ?? hint)}`);
  }
  if (day.anandadiYoga) {
    if (day.anandadiYoga.type === "shubh") positives.push(`${bilingual(day.anandadiYoga.nameHi, day.anandadiYoga.name, lang)} (${badgeText(lang, "shubh")})`);
    else negatives.push(`${bilingual(day.anandadiYoga.nameHi, day.anandadiYoga.name, lang)} (${badgeText(lang, "ashubh")})`);
  }
  for (const sy of day.specialYogas ?? []) {
    positives.push(bilingual(sy.nameHi, sy.nameEn, lang));
  }
  if (day.panchak) negatives.push(t(lang, "पंचक", "Panchak"));
  if (day.bhadra?.active) negatives.push(t(lang, "भद्रा", "Bhadra"));
  if (day.mool) negatives.push(t(lang, "मूल / गण्डान्त", "Mool / Gandanta"));

  const verdict: { tone: "green" | "amber" | "red"; labelHi: string; labelEn: string } =
    negatives.length === 0 && positives.length > 0
      ? { tone: "green", labelHi: "अनुकूल दिन", labelEn: "Favorable day" }
      : negatives.length > 0 && positives.length > 0
      ? { tone: "amber", labelHi: "मिश्रित दिन — सतर्क रहें", labelEn: "Mixed — proceed mindfully" }
      : negatives.length > 0
      ? { tone: "red", labelHi: "सावधानी का दिन", labelEn: "Use caution" }
      : { tone: "green", labelHi: "सामान्य दिन", labelEn: "Ordinary day" };

  const accent = verdict.tone === "green" ? "#15803d" : verdict.tone === "amber" ? "#b45309" : "#b91c1c";
  return (
    <Section
      title={t(lang, "आज का सार", "Today's verdict")}
      hint={t(lang, "तिथि-प्रवृत्ति, आनंदादि योग, पंचक/भद्रा/मूल और विशेष योगों का संक्षेप",
                   "Summary of tithi-pravritti, anandadi yoga, panchak/bhadra/mool, and special yogas")}
      accent={accent}
    >
      <div className="mb-2 text-base font-bold" style={{ color: accent }}>
        {t(lang, verdict.labelHi, verdict.labelEn)}
      </div>
      {positives.length > 0 && (
        <div className="mb-1 text-xs text-emerald-900">
          <strong className="text-emerald-700">✓ {t(lang, "अनुकूल:", "Favorable:")}</strong> {positives.join(" · ")}
        </div>
      )}
      {negatives.length > 0 && (
        <div className="text-xs text-rose-900">
          <strong className="text-rose-700">⚠ {t(lang, "सावधानी:", "Caution:")}</strong> {negatives.join(" · ")}
        </div>
      )}
    </Section>
  );
}

// One-line "what is it for" hints for each tithi-pravritti category.
const TITHI_PRAVRITTI_HINTS: Record<string, string> = {
  Nanda: "joy, celebration, music",
  Bhadra: "service, healing, journeys",
  Jaya: "victory, contracts, debate",
  Rikta: "destruction, demolition (avoid auspicious starts)",
  Purna: "completion, rituals, fulfillment",
};
const TITHI_PRAVRITTI_HINTS_HI: Record<string, string> = {
  Nanda: "उत्सव, संगीत, आनंद",
  Bhadra: "सेवा, चिकित्सा, यात्रा",
  Jaya: "विजय, अनुबंध, वाद-विवाद",
  Rikta: "रिक्तता — शुभ कार्य आरम्भ न करें",
  Purna: "पूर्णता, अनुष्ठान, सम्पन्नता",
};

// ─────────────────────────────────────────────────────────────────────────────
// Planets — sidereal longitude, rashi, nakshatra, retrograde, combust at sunrise
// ─────────────────────────────────────────────────────────────────────────────

function SectionPlanets({ day, lang, fmt }: { day: PanchangDay; lang: Lang; fmt: Fmt }) {
  if (!day.planets || day.planets.length === 0) return null;
  return (
    <Section
      title={t(lang, "ग्रह स्थिति (सूर्योदय)", "Planet positions (at sunrise)")}
      hint={t(lang, "लाहिरी अयनांश; डिग्री राशि के भीतर", "Lahiri ayanamsa; degrees within the rashi")}
      accent="#0c4a6e"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="border-b border-stone-300 text-left text-stone-600">
            <tr>
              <th className="pb-1 font-semibold">{t(lang, "ग्रह", "Planet")}</th>
              <th className="pb-1 font-semibold">{t(lang, "राशि", "Rashi")}</th>
              <th className="pb-1 text-right font-semibold">°</th>
              <th className="pb-1 font-semibold">{t(lang, "नक्षत्र", "Nakshatra")}</th>
              <th className="pb-1 font-semibold">{t(lang, "वक्री", "Retro")}</th>
              <th className="pb-1 font-semibold">{t(lang, "अस्त", "Combust")}</th>
            </tr>
          </thead>
          <tbody>
            {day.planets.map((p) => (
              <tr key={p.key} className="border-b border-dotted border-stone-200 last:border-0">
                <td className="py-1 font-bold">{bilingual(p.nameHi, p.nameEn, lang)}</td>
                <td className="py-1">{bilingual(p.rashi.nameHi, p.rashi.nameEn, lang)}</td>
                <td className="py-1 text-right font-mono text-stone-700">{fmt.num(p.degInRashi.toFixed(2))}°</td>
                <td className="py-1">{bilingual(p.nakshatra.nameHi, p.nakshatra.nameEn, lang)}</td>
                <td className="py-1">{p.retrograde ? <Badge text={t(lang, "वक्री", "R")} tone="amber" /> : <span className="text-stone-400">—</span>}</td>
                <td className="py-1">{p.combust ? <Badge text={t(lang, "अस्त", "Asta")} tone="red" /> : <span className="text-stone-400">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[10px] text-stone-500">
        {t(lang,
          "वक्री = ग्रह पीछे चल रहा हो (नई शुरुआत स्थगित)। अस्त = ग्रह सूर्य के अत्यधिक निकट (विवाह/पूजा/प्रतिष्ठा कार्य वर्जित)।",
          "R = retrograde (delay new ventures). Combust = planet too close to the Sun (avoid marriages, consecrations, major rituals).")}
      </p>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 24-hour Hora ribbon
// ─────────────────────────────────────────────────────────────────────────────

function SectionHora({ day, lang, nowMin, isToday, fmt }: { day: PanchangDay; lang: Lang; nowMin: number; isToday: boolean; fmt: Fmt }) {
  if (!day.horaRibbon || day.horaRibbon.length === 0) return null;
  const dayH = day.horaRibbon.filter((h) => h.period === "day");
  const nightH = day.horaRibbon.filter((h) => h.period === "night");
  return (
    <Section
      title={t(lang, "होरा (24 घंटे)", "Hora (24 hours)")}
      hint={t(lang, "ग्रह-होरा — दिन व रात्रि के 12-12 भाग; प्रत्येक होरा का स्वामी ग्रह",
                   "Planetary hours — 12 day + 12 night; each hora ruled by a planet")}
      accent="#312e81"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <HoraTable label={t(lang, "दिन की 12 होरा", "Day horas")} rows={dayH} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />
        <HoraTable label={t(lang, "रात्रि की 12 होरा", "Night horas")} rows={nightH} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />
      </div>
      <p className="mt-2 text-[10px] text-stone-500">
        {t(lang,
          "बृहस्पति/शुक्र/चन्द्र/बुध की होरा शुभ; मंगल/शनि/सूर्य की होरा अशुभ। कार्य उसी ग्रह की होरा में करें।",
          "Jupiter/Venus/Moon/Mercury horas are shubh; Mars/Saturn/Sun horas are ashubh. Match work to the right planet's hour.")}
      </p>
    </Section>
  );
}

function HoraTable({
  label, rows, lang, nowMin, isToday, fmt,
}: {
  label: string;
  rows: NonNullable<PanchangDay["horaRibbon"]>;
  lang: Lang;
  nowMin: number;
  isToday: boolean;
  fmt: Fmt;
}) {
  return (
    <div>
      <div className="mb-1 text-xs font-bold text-stone-700">{label}</div>
      <table className="w-full text-xs">
        <thead className="border-b border-stone-300 text-left text-stone-600">
          <tr>
            <th className="pb-1 font-semibold">#</th>
            <th className="pb-1 font-semibold">{t(lang, "स्वामी", "Lord")}</th>
            <th className="pb-1 font-semibold">{t(lang, "वर्ग", "Type")}</th>
            <th className="pb-1 text-right font-semibold">{t(lang, "समय", "Time")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((h) => {
            const active = isToday && isActiveWindow(nowMin, h.startTime, h.endTime);
            const tone = h.type === "shubh" ? "green" : h.type === "ashubh" ? "red" : "stone";
            return (
              <tr key={h.number} className={`border-b border-dotted border-stone-200 last:border-0 ${active ? "bg-orange-50" : ""}`}>
                <td className="py-1 font-mono">{fmt.num(h.number)}{active && " ⚡"}</td>
                <td className="py-1 font-bold">{bilingual(h.lordHi, h.lordEn, lang)}</td>
                <td className="py-1"><Badge text={badgeText(lang, h.type)} tone={tone} /></td>
                <td className="py-1 text-right font-mono text-stone-600">{fmt.range(h.startTime, h.endTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Glossary — collapsible help panel
// ─────────────────────────────────────────────────────────────────────────────

const GLOSSARY: Array<{ termHi: string; termEn: string; descHi: string; descEn: string }> = [
  { termHi: "तिथि", termEn: "Tithi", descHi: "चन्द्र-दिन; सूर्य-चन्द्र अंतर का 12° का खंड। 1-15 शुक्ल पक्ष + 1-15 कृष्ण पक्ष = 30 तिथियाँ।",
    descEn: "Lunar day. 12° increment of moon-sun separation. 30 tithis in a lunar month (15 waxing + 15 waning)." },
  { termHi: "नक्षत्र", termEn: "Nakshatra", descHi: "27 तारा-समूह; आकाश का 360°/27 = 13°20' खंड जिसमें चन्द्र स्थित हो।",
    descEn: "27 lunar mansions, each spanning 13°20'. Tells where the moon is in the zodiac." },
  { termHi: "योग", termEn: "Yoga", descHi: "सूर्य-चन्द्र की जुड़ी अंशों का खंड। 27 योग; प्रत्येक का अपना शुभ/अशुभ स्वभाव।",
    descEn: "Sum of sun & moon longitudes; 27 yogas, each with its own auspicious/inauspicious nature." },
  { termHi: "करण", termEn: "Karana", descHi: "तिथि का आधा भाग। 11 करण; भद्रा (विष्टि) सबसे अशुभ।",
    descEn: "Half-tithi. 11 karanas; Vishti (Bhadra) is the most inauspicious." },
  { termHi: "होरा", termEn: "Hora", descHi: "दिन/रात्रि के 24 घंटे, प्रत्येक एक ग्रह के स्वामित्व में। शुभ कार्य उसी ग्रह की होरा में करें।",
    descEn: "24 planetary hours. Time matching the planet whose blessing you seek." },
  { termHi: "राहु काल", termEn: "Rahu Kalam", descHi: "दिन का अशुभ डेढ़-घंटे का खंड (वार-आधारित)। नई शुरुआत वर्जित।",
    descEn: "Inauspicious 90-minute slot per day (varies by weekday). Avoid new ventures." },
  { termHi: "अभिजित", termEn: "Abhijit", descHi: "मध्यान्ह का सर्वोत्तम मुहूर्त (~48 मिनट)। बुधवार को छोड़ अधिकांश कार्यों के लिए शुभ।",
    descEn: "Most auspicious midday muhurta (~48 min). Favorable for most actions except on Wednesdays." },
  { termHi: "ब्रह्म मुहूर्त", termEn: "Brahma Muhurta", descHi: "सूर्योदय से ~96 मिनट पहले। ध्यान, अध्ययन के लिए सर्वोत्तम।",
    descEn: "~96 minutes before sunrise. Optimal for meditation, study, sadhana." },
  { termHi: "पंचक", termEn: "Panchak", descHi: "चन्द्र धनिष्ठा (२)–रेवती में हो (5 नक्षत्र)। दक्षिण यात्रा, ईंधन-संग्रह, चारपाई-बनाना वर्जित।",
    descEn: "Moon in last 5 nakshatras (Dhanishta(2)..Revati). Avoid southbound travel, fuel storage, bed-making." },
  { termHi: "भद्रा", termEn: "Bhadra", descHi: "विष्टि करण सक्रिय। कोई भी शुभ कार्य वर्जित। मुख-भाग सर्वाधिक अशुभ; पुच्छ-भाग में यात्रा शुभ।",
    descEn: "Vishti karana active. Avoid all auspicious work. Mukh (head) most inauspicious; puchchha (tail) acceptable for travel." },
  { termHi: "मूल / गण्डान्त", termEn: "Mool / Gandanta", descHi: "चन्द्र मूल नक्षत्र (अश्विनी, आश्लेषा, मघा, ज्येष्ठा, मूल, रेवती) में। यज्ञोपवीत, गृहप्रवेश वर्जित।",
    descEn: "Moon in transition-junction nakshatras. Avoid sacred-thread, housewarming, marriage." },
  { termHi: "वक्री", termEn: "Retrograde (Vakri)", descHi: "ग्रह पृथ्वी से देखते हुए पीछे चलता दिखे। नई शुरुआत स्थगित, समीक्षा/पुनरावलोकन शुभ।",
    descEn: "Planet appears to move backward from Earth. Delay new starts; review and revise instead." },
  { termHi: "अस्त", termEn: "Combust (Asta)", descHi: "ग्रह सूर्य के अत्यधिक निकट (तेज नष्ट)। विवाह, प्रतिष्ठा, पूजा-कर्म वर्जित।",
    descEn: "Planet too close to the Sun (energy obscured). Avoid marriages, consecrations, major rituals." },
  { termHi: "चौघड़िया", termEn: "Choghadiya", descHi: "दिन व रात्रि के 8-8 भाग। अमृत/शुभ/लाभ शुभ; काल/रोग/उद्वेग अशुभ; चल मध्यम।",
    descEn: "8 day + 8 night segments. Amrit/Shubh/Labh good; Kaal/Rog/Udveg bad; Chal neutral." },
  { termHi: "नित्य मुहूर्त", termEn: "Nitya Muhurta", descHi: "30 दो-घटी मुहूर्त (15 दिन + 15 रात्रि)। प्रत्येक का अपना नाम, स्वभाव, करें/न करें।",
    descEn: "30 two-ghati muhurtas (15 day + 15 night). Each has its own name, nature, and do/don't list." },
  { termHi: "तिथि प्रवृत्ति", termEn: "Tithi Pravritti", descHi: "तिथि-समूह का स्वभाव — नंदा, भद्रा, जया, रिक्ता, पूर्णा।",
    descEn: "Quality of the tithi group: Nanda (joy), Bhadra (service), Jaya (victory), Rikta (avoid), Purna (completion)." },
  { termHi: "अनंदादि योग", termEn: "Anandadi Yoga", descHi: "वार × नक्षत्र संयोग का 28-चक्र; प्रत्येक का अपना शुभ/अशुभ नाम।",
    descEn: "28-cycle vara×nakshatra combo with named auspicious/inauspicious effect." },
  { termHi: "विशेष योग", termEn: "Special Yogas", descHi: "रवि, सर्वार्थसिद्धि, अमृत-सिद्धि, रवि/गुरु पुष्य, त्रि/द्वि-पुष्कर — विशेष शुभ संयोग।",
    descEn: "Ravi, Sarvarthasiddhi, Amrit-siddhi, Ravi/Guru Pushya, Tri/Dvi-pushkar — exceptionally auspicious vara×nakshatra combos." },
  { termHi: "दिशा शूल", termEn: "Disha Shool", descHi: "वार-आधारित 'अशुभ दिशा'। उस दिशा में यात्रा वर्जित।",
    descEn: "Weekday-based 'forbidden direction'. Avoid travel toward it that day." },
  { termHi: "आचमन / मुहूर्त", termEn: "Muhurta", descHi: "एक मुहूर्त ≈ 48 मिनट = 2 घटी = 1/30 दिन।",
    descEn: "One muhurta ≈ 48 min = 2 ghati = 1/30 of the day." },
];

function SectionGlossary({ lang }: { lang: Lang }) {
  return (
    <Section
      title={t(lang, "शब्दकोश — पंचांग के शब्द", "Glossary — panchang terms")}
      hint={t(lang, "हर शब्द का संक्षिप्त अर्थ", "Brief meaning of each term used above")}
      accent="#475569"
    >
      <details>
        <summary className="cursor-pointer text-xs font-semibold text-stone-700 hover:underline">
          {t(lang, "खोलें / बंद करें", "Open / close")}
        </summary>
        <dl className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div key={g.termEn}>
              <dt className="text-xs font-bold text-stone-800">{lang === "en" ? g.termEn : g.termHi}{lang === "both" && <span className="ml-1 text-[10px] font-normal text-stone-500">{g.termEn}</span>}</dt>
              <dd className="text-[11px] text-stone-600">{lang === "en" ? g.descEn : g.descHi}</dd>
            </div>
          ))}
        </dl>
      </details>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Add-to-calendar — generates a /api/ical?date=YYYY-MM-DD download for the day's events.
// ─────────────────────────────────────────────────────────────────────────────

function AddToCalendar({ day, lang, dateParam }: { day: PanchangDay; lang: Lang; dateParam: string }) {
  const url = `/api/ical?date=${dateParam}`;
  return (
    <div className="mt-3 flex items-center justify-end">
      <a
        href={url}
        download={`panchang-${day.date}.ics`}
        className="rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-100"
        title={t(lang, "इस दिन के पर्व/मुहूर्त .ics के रूप में डाउनलोड करें", "Download this day's events / muhurtas as .ics")}
      >
        📅 {t(lang, "कैलेंडर में जोड़ें (.ics)", "Add to Calendar (.ics)")}
      </a>
    </div>
  );
}
