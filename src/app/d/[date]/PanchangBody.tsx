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

        {/* ── Block 1: Essential / Now (Jain practice first) ── */}
        {isToday && <SectionLiveNow day={day} lang={lang} isToday={isToday} nowMin={nowMin} fmt={fmt} />}
        <SectionRasTyag day={day} lang={lang} isToday={isToday} />
        <SectionEvents day={day} lang={lang} isToday={isToday} />

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
        <SectionNitya day={day} lang={lang} nowMin={nowMin} isToday={isToday} fmt={fmt} />

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
            value={<><Badge text={badgeText(lang, "kshaya")} tone="amber" /> {bilingual(day.kshayaTithi.nameHi, day.kshayaTithi.nameEn, lang)}</>} />
      )}
      {day.isVriddhiRepeat && <KV label={t(lang, "वृद्धि", "Vriddhi")} value={<Badge text={t(lang, "पुनरावृत्ति दिन", "repeat day")} tone="blue" />} />}
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
      <KV label={t(lang, "तिथि प्रवृत्ति", "Tithi Pravritti")} value={day.tithiPravritti ? bilingual(day.tithiPravritti.nameHi, day.tithiPravritti.nameEn, lang) : undefined} />
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
        <div className="ml-2 mt-1">
          {day.bhadra.periods.map((p, i) => (
            <div key={i} className="text-xs font-mono text-stone-600">· {fmt.range(p.startTime, p.endTime)}</div>
          ))}
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
    </Section>
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
            <th className="pb-1 font-semibold">{t(lang, "करें", "Do")}</th>
            <th className="pb-1 font-semibold">{t(lang, "न करें", "Don't")}</th>
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
                <td className="py-1 text-stone-700">{lang === "en" ? (m.doEn ?? m.doHi) : m.doHi}</td>
                <td className="py-1 text-stone-700">{lang === "en" ? (m.dontEn ?? m.dontHi) : m.dontHi}</td>
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
