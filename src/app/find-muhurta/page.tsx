"use client";

// Muhurta-finder — pick an event + date range, get day-by-day verdict from the
// scorer in `muhurta-finder.ts`. All events (including Jain pratishtha) are
// rule-based; no publisher lookup.

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { MUHURTA_EVENTS, type MuhurtaEventId } from "@/lib/muhurta-events";
import { scoreRange, type MuhurtaDayResult, type Verdict } from "@/lib/muhurta-finder";
import type { PanchangDay } from "@/lib/types";

interface SelectedCity {
  label: string;
  lat: number;
  lng: number;
  /** Numeric offset from UTC in minutes. */
  tz: number;
  tzName?: string;
}

interface GeocodeHit {
  label: string;
  lat: number;
  lng: number;
  tz: number;
  tzName: string;
}

const LS_CITY = "pramanik.findMuhurta.city";
function readSavedCity(): SelectedCity | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(LS_CITY);
    return v ? (JSON.parse(v) as SelectedCity) : null;
  } catch { return null; }
}
function writeSavedCity(c: SelectedCity | null) {
  if (typeof window === "undefined") return;
  try {
    if (c) localStorage.setItem(LS_CITY, JSON.stringify(c));
    else localStorage.removeItem(LS_CITY);
  } catch { /* ignore quota errors */ }
}

function todayInIST(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 3600 * 1000);
  const y = ist.getUTCFullYear();
  const m = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const d = String(ist.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

function formatDateForDisplay(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

const VERDICT_STYLES: Record<Verdict, { label: string; labelHi: string; bg: string; ring: string; text: string }> = {
  favorable: { label: "Favorable", labelHi: "श्रेष्ठ", bg: "bg-emerald-50", ring: "ring-emerald-300", text: "text-emerald-900" },
  mixed:     { label: "Mixed",     labelHi: "मिश्रित", bg: "bg-amber-50",   ring: "ring-amber-300",   text: "text-amber-900"   },
  avoid:     { label: "Avoid",     labelHi: "वर्जित",  bg: "bg-rose-50",    ring: "ring-rose-300",    text: "text-rose-900"    },
};

export default function FindMuhurtaPage() {
  const [eventId, setEventId] = useState<MuhurtaEventId>("graha_pravesh");
  const [startDate, setStartDate] = useState<string>(todayInIST());
  const [endDate, setEndDate] = useState<string>(addDays(todayInIST(), 30));
  const [multiDayLength, setMultiDayLength] = useState<number | null>(null);
  const [city, setCity] = useState<SelectedCity | null>(null);
  const [cityQuery, setCityQuery] = useState<string>("");
  const [cityHits, setCityHits] = useState<GeocodeHit[]>([]);
  const [cityLoading, setCityLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<"hi" | "en">("hi");
  const [showOnlyFavorable, setShowOnlyFavorable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>("");
  const [results, setResults] = useState<MuhurtaDayResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Restore saved city on first mount.
  useEffect(() => {
    const saved = readSavedCity();
    if (saved) setCity(saved);
  }, []);

  // Debounced geocode search.
  const searchSeqRef = useRef(0);
  useEffect(() => {
    const q = cityQuery.trim();
    if (q.length < 2) { setCityHits([]); return; }
    const seq = ++searchSeqRef.current;
    setCityLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}&limit=6`);
        const data = (await res.json()) as { results?: GeocodeHit[] };
        if (seq !== searchSeqRef.current) return; // stale
        setCityHits(data.results ?? []);
      } catch {
        if (seq === searchSeqRef.current) setCityHits([]);
      } finally {
        if (seq === searchSeqRef.current) setCityLoading(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [cityQuery]);

  const selectCity = useCallback((c: GeocodeHit) => {
    const sel: SelectedCity = { label: c.label, lat: c.lat, lng: c.lng, tz: c.tz, tzName: c.tzName };
    setCity(sel);
    writeSavedCity(sel);
    setCityQuery("");
    setCityHits([]);
  }, []);

  const clearCity = useCallback(() => {
    setCity(null);
    writeSavedCity(null);
  }, []);

  const selectedEvent = useMemo(
    () => MUHURTA_EVENTS.find((e) => e.id === eventId)!,
    [eventId],
  );

  // When the user switches event, reset / initialize the duration selector.
  useEffect(() => {
    if (selectedEvent.multiDay) {
      setMultiDayLength(selectedEvent.multiDay.defaultDays);
    } else {
      setMultiDayLength(null);
    }
  }, [selectedEvent]);

  const handleFind = useCallback(async () => {
    setErrorMsg("");
    setResults([]);

    if (!city) {
      setErrorMsg(lang === "hi" ? "कृपया पहले नगर चुनें।" : "Please pick a city first.");
      return;
    }
    if (startDate > endDate) {
      setErrorMsg(lang === "hi" ? "अंतिम तिथि प्रारम्भिक से बाद की होनी चाहिए।" : "End date must be on or after start date.");
      return;
    }
    // Cap at ~3 months to keep the panchang computation responsive.
    const [sy, sm, sd] = startDate.split("-").map(Number);
    const [ey, em, ed] = endDate.split("-").map(Number);
    const sDate = new Date(sy, sm - 1, sd);
    const eDate = new Date(ey, em - 1, ed);
    const dayCount = Math.round((eDate.getTime() - sDate.getTime()) / 86400000) + 1;
    if (dayCount > 92) {
      setErrorMsg(lang === "hi" ? "अधिकतम 92 दिनों का परिसर — कृपया तिथि-परिसर छोटा करें।" : "Maximum range is 92 days — please narrow the date range.");
      return;
    }

    setLoading(true);
    setProgress(lang === "hi" ? "पंचांग गणना…" : "Computing panchang…");

    try {
      // The API supports a "range" mode keyed by start/end MONTH. We expand to whole
      // months covering our window, then filter results to the exact date range.
      const res = await fetch("/api/panchang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "range",
          startMonth: sDate.getMonth(),
          startYear: sDate.getFullYear(),
          endMonth: eDate.getMonth(),
          endYear: eDate.getFullYear(),
          location: { lat: city.lat, lng: city.lng, tz: city.tz },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { days: PanchangDay[] };
      const inRange = data.days.filter((d) => d.date >= startDate && d.date <= endDate);
      setProgress(lang === "hi" ? "मुहूर्त-गणना…" : "Scoring days…");
      const scored = scoreRange(inRange, selectedEvent, {
        multiDayLength: multiDayLength ?? undefined,
      });
      setResults(scored);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
    } finally {
      setLoading(false);
      setProgress("");
    }
  }, [startDate, endDate, city, selectedEvent, multiDayLength, lang]);

  const filteredResults = useMemo(() => {
    return showOnlyFavorable ? results.filter((r) => r.verdict === "favorable") : results;
  }, [results, showOnlyFavorable]);

  const counts = useMemo(() => {
    const c = { favorable: 0, mixed: 0, avoid: 0 };
    for (const r of results) c[r.verdict]++;
    return c;
  }, [results]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <header className="mb-5 border-b-2 border-stone-300 pb-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-xl font-bold tracking-tight">
              {lang === "hi" ? "मुहूर्त खोजक" : "Muhurta Finder"}
              <span className="ml-2 text-sm font-normal text-stone-600">
                {lang === "hi" ? "— मुहूर्त चिंतामणि अनुसार" : "— per Muhurta Chintamani"}
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang("hi")}
                className={`rounded px-2 py-0.5 text-xs ${lang === "hi" ? "bg-stone-800 text-white" : "bg-stone-200"}`}
              >हिन्दी</button>
              <button
                onClick={() => setLang("en")}
                className={`rounded px-2 py-0.5 text-xs ${lang === "en" ? "bg-stone-800 text-white" : "bg-stone-200"}`}
              >English</button>
              <a href="/" className="ml-2 text-xs text-blue-700 underline hover:no-underline">
                {lang === "hi" ? "← आज का पंचांग" : "← Today's Panchang"}
              </a>
            </div>
          </div>
          <p className="mt-1 text-sm text-stone-700">
            {lang === "hi"
              ? "अपना कार्य / संस्कार चुनें, तिथि-परिसर चुनें, और मुहूर्त-शुद्धि वाले दिन देखें। नियम: मुहूर्त चिंतामणि (दैवज्ञ श्री राम, c. 1600 CE)।"
              : "Pick an event/sanskara and date range to see which days have muhurta-shuddhi. Rules: Muhurta Chintamani (Daivajna Sri Rama, c. 1600 CE)."}
          </p>
        </header>

        {/* Form */}
        <section className="mb-5 rounded-lg border border-stone-300 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {/* Event dropdown */}
            <div className="sm:col-span-2 md:col-span-2">
              <label className="block text-xs font-semibold text-stone-700">
                {lang === "hi" ? "कार्य / संस्कार" : "Event / Sanskara"}
              </label>
              <select
                value={eventId}
                onChange={(e) => setEventId(e.target.value as MuhurtaEventId)}
                className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-1.5 text-sm"
              >
                {MUHURTA_EVENTS.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {lang === "hi" ? ev.nameHi : ev.nameEn}
                  </option>
                ))}
              </select>
              <div className="mt-1 text-[11px] italic text-stone-600">
                {lang === "hi" ? selectedEvent.descHi : selectedEvent.descEn}
              </div>
              <div className="text-[10px] text-stone-500">
                {lang === "hi" ? "स्रोत: " : "Source: "}{selectedEvent.source}
              </div>
            </div>

            {/* Start date */}
            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {lang === "hi" ? "प्रारम्भिक तिथि" : "Start date"}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-1.5 text-sm"
              />
            </div>

            {/* End date */}
            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {lang === "hi" ? "अंतिम तिथि" : "End date"}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-1.5 text-sm"
              />
            </div>

            {/* City — geocoded free-text search */}
            <div className="sm:col-span-2 md:col-span-2 relative">
              <label className="block text-xs font-semibold text-stone-700">
                {lang === "hi" ? "नगर" : "City"}
                {cityLoading && <span className="ml-2 text-[10px] font-normal text-stone-500">{lang === "hi" ? "खोज रहे हैं…" : "searching…"}</span>}
              </label>
              {city ? (
                <div className="mt-1 flex items-center justify-between rounded border border-emerald-300 bg-emerald-50 px-2 py-1.5 text-sm">
                  <div className="min-w-0 flex-1 truncate" title={city.label}>
                    <span className="font-semibold text-emerald-900">{city.label.split(",")[0]}</span>
                    <span className="ml-2 text-[10px] text-stone-500">
                      {city.lat.toFixed(3)}, {city.lng.toFixed(3)} · UTC{city.tz >= 0 ? "+" : ""}{(city.tz / 60).toFixed(2).replace(/\.00$/, "")}
                      {city.tzName ? ` · ${city.tzName}` : ""}
                    </span>
                  </div>
                  <button
                    onClick={clearCity}
                    className="ml-2 rounded border border-stone-300 bg-white px-1.5 py-0.5 text-[10px] text-stone-700 hover:bg-stone-100"
                  >
                    {lang === "hi" ? "बदलें" : "change"}
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={cityQuery}
                    onChange={(e) => setCityQuery(e.target.value)}
                    placeholder={lang === "hi" ? "नगर खोजें… (जैसे Indore, Delhi, London)" : "Search city… (e.g. Indore, Delhi, London)"}
                    className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-1.5 text-sm"
                    autoComplete="off"
                  />
                  {cityHits.length > 0 && (
                    <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded border border-stone-300 bg-white shadow-lg">
                      {cityHits.map((h, i) => (
                        <li key={`${h.lat},${h.lng},${i}`}>
                          <button
                            type="button"
                            onClick={() => selectCity(h)}
                            className="block w-full px-2 py-1.5 text-left text-xs hover:bg-amber-50"
                          >
                            <div className="font-semibold text-stone-900">{h.label.split(",")[0]}</div>
                            <div className="truncate text-[10px] text-stone-500">{h.label}</div>
                            <div className="font-mono text-[10px] text-stone-400">
                              {h.lat.toFixed(3)}, {h.lng.toFixed(3)} · {h.tzName} (UTC{h.tz >= 0 ? "+" : ""}{(h.tz / 60).toFixed(2).replace(/\.00$/, "")})
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {cityQuery.length >= 2 && !cityLoading && cityHits.length === 0 && (
                    <div className="mt-1 text-[11px] italic text-stone-500">
                      {lang === "hi" ? "कोई परिणाम नहीं मिला।" : "No matches found."}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Multi-day duration (only shown when selected event is multi-day) */}
            {selectedEvent.multiDay && multiDayLength !== null && (
              <div className="sm:col-span-2 md:col-span-2">
                <label className="block text-xs font-semibold text-stone-700">
                  {lang === "hi" ? "महोत्सव अवधि" : "Mahotsava duration"}
                </label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedEvent.multiDay.options.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setMultiDayLength(n)}
                      className={`rounded border px-3 py-1 text-xs ${
                        multiDayLength === n
                          ? "border-amber-500 bg-amber-100 font-semibold text-amber-900"
                          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      {n} {lang === "hi" ? "दिन" : "days"}
                    </button>
                  ))}
                </div>
                <div className="mt-1 text-[10px] italic text-stone-500">
                  {lang === "hi"
                    ? `प्रारम्भ दिन तथा आगामी ${multiDayLength - 1} दिन — व्यतीपात/वैधृति/भद्रा/गुरु-शुक्र-अस्त सत्यापित`
                    : `Start day + next ${multiDayLength - 1} days validated for Vyatipata/Vaidhriti/Bhadra/Guru-Shukra asta`}
                </div>
              </div>
            )}

            {/* Quick range buttons */}
            <div className="sm:col-span-2 md:col-span-2 flex flex-wrap items-end gap-2">
              {[
                { label: lang === "hi" ? "30 दिन" : "30 days", n: 30 },
                { label: lang === "hi" ? "60 दिन" : "60 days", n: 60 },
                { label: lang === "hi" ? "90 दिन" : "90 days", n: 90 },
              ].map((opt) => (
                <button
                  key={opt.n}
                  onClick={() => { setStartDate(todayInIST()); setEndDate(addDays(todayInIST(), opt.n)); }}
                  className="rounded border border-stone-300 bg-stone-50 px-2 py-1 text-xs hover:bg-stone-100"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={handleFind}
              disabled={loading || !city}
              className="rounded bg-amber-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
              title={!city ? (lang === "hi" ? "पहले नगर चुनें" : "Pick a city first") : ""}
            >
              {loading ? (progress || (lang === "hi" ? "गणना…" : "Computing…")) : (lang === "hi" ? "मुहूर्त खोजें" : "Find Muhurta")}
            </button>
            {results.length > 0 && (
              <label className="text-xs">
                <input
                  type="checkbox"
                  checked={showOnlyFavorable}
                  onChange={(e) => setShowOnlyFavorable(e.target.checked)}
                  className="mr-1 align-middle"
                />
                {lang === "hi" ? "केवल श्रेष्ठ दिन दिखाएँ" : "Show only favorable days"}
              </label>
            )}
          </div>
          {errorMsg && (
            <div className="mt-3 rounded bg-rose-50 px-3 py-2 text-xs text-rose-900 ring-1 ring-rose-300">
              {errorMsg}
            </div>
          )}
        </section>

        {/* Per-event notes */}
        {(selectedEvent.rules.notesHi || selectedEvent.rules.notesEn) && (
          <div className="mb-5 rounded border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            <strong className="mr-1">{lang === "hi" ? "टिप्पणी:" : "Note:"}</strong>
            {lang === "hi" ? selectedEvent.rules.notesHi : selectedEvent.rules.notesEn}
          </div>
        )}

        {/* Results summary */}
        {results.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded bg-emerald-100 px-2 py-1 ring-1 ring-emerald-300">
              {lang === "hi" ? "श्रेष्ठ" : "Favorable"}: <strong>{counts.favorable}</strong>
            </span>
            <span className="rounded bg-amber-100 px-2 py-1 ring-1 ring-amber-300">
              {lang === "hi" ? "मिश्रित" : "Mixed"}: <strong>{counts.mixed}</strong>
            </span>
            <span className="rounded bg-rose-100 px-2 py-1 ring-1 ring-rose-300">
              {lang === "hi" ? "वर्जित" : "Avoid"}: <strong>{counts.avoid}</strong>
            </span>
            <span className="ml-auto text-stone-500">
              {results.length} {lang === "hi" ? "दिन गणना किए गए" : "days scored"}
            </span>
          </div>
        )}

        {/* Results grid */}
        <section className="space-y-2">
          {filteredResults.map((r) => {
            const s = VERDICT_STYLES[r.verdict];
            return (
              <div
                key={r.date}
                className={`rounded-lg ${s.bg} px-3 py-2 ring-1 ${s.ring}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${s.text} bg-white ring-1 ${s.ring}`}>
                      {lang === "hi" ? s.labelHi : s.label}
                    </span>
                    <a href={`/d/${r.date}?lang=${lang}`} className="font-semibold text-stone-900 underline-offset-2 hover:underline">
                      {formatDateForDisplay(r.date)}
                    </a>
                    {r.endDate && r.durationDays && (
                      <span className="rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-semibold text-amber-200">
                        → {formatDateForDisplay(r.endDate)} · {r.durationDays} {lang === "hi" ? "दिन" : "day"}
                      </span>
                    )}
                    <span className="text-xs text-stone-600">
                      · {lang === "hi" ? r.varaHi : r.varaEn}
                      · {lang === "hi" ? r.tithiHeadlineHi : r.tithiHeadlineEn}
                      {r.nakshatraHi && <> · {lang === "hi" ? r.nakshatraHi : r.nakshatraEn}</>}
                    </span>
                  </div>
                  {r.windows.length > 0 && (
                    <div className="text-[10px] text-stone-700">
                      {r.windows.length} {lang === "hi" ? "मुहूर्त-खण्ड" : "windows"}
                    </div>
                  )}
                </div>

                {/* Reasons */}
                {r.reasons.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px]">
                    {r.reasons.map((rs, i) => (
                      <span
                        key={i}
                        className={
                          rs.kind === "+"
                            ? "text-emerald-800"
                            : rs.kind === "x"
                            ? "font-semibold text-rose-900"
                            : "text-rose-700"
                        }
                      >
                        {rs.kind === "+" ? "✓ " : rs.kind === "x" ? "✗ " : "· "}
                        {lang === "hi" ? rs.textHi : rs.textEn}
                      </span>
                    ))}
                  </div>
                )}

                {/* Recommended windows */}
                {r.windows.length > 0 && r.verdict !== "avoid" && (
                  <div className="mt-1.5 flex flex-wrap gap-2 text-[11px]">
                    {r.windows.map((w, i) => (
                      <span
                        key={i}
                        className={`rounded px-1.5 py-0.5 ring-1 ${
                          w.rank === "ati-shubh"
                            ? "bg-emerald-100 text-emerald-900 ring-emerald-300"
                            : "bg-white text-stone-800 ring-stone-300"
                        }`}
                      >
                        {lang === "hi" ? w.labelHi : w.labelEn} <span className="font-mono">{w.start}–{w.end}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {!loading && results.length > 0 && filteredResults.length === 0 && (
            <div className="rounded bg-stone-100 px-3 py-4 text-center text-sm italic text-stone-600">
              {lang === "hi"
                ? "इस परिसर में कोई 'श्रेष्ठ' दिन नहीं — फ़िल्टर हटा कर सभी देखें या परिसर बढ़ाएँ।"
                : "No 'favorable' days in this range — uncheck the filter to see all, or widen the date range."}
            </div>
          )}
        </section>

        <footer className="mt-8 border-t border-stone-200 pt-3 text-[10px] text-stone-500">
          {lang === "hi"
            ? "नियम-स्रोत: मुहूर्त चिंतामणि (दैवज्ञ श्री राम, c. 1600 CE)। जैन प्रतिष्ठा-नियम: प्रतिष्ठा प्रदीप (पं. नाथूलाल जैन) तथा वसुनन्दि आचार्य की प्रतिष्ठा सार संग्रह परम्परा। यह उपकरण मुहूर्त-शुद्धि का प्रारम्भिक संकेत है — महत्वपूर्ण कार्यों के लिए ज्योतिषाचार्य से पुष्टि अनिवार्य।"
            : "Rule source: Muhurta Chintamani (Daivajna Sri Rama, c. 1600 CE). Jain pratishtha rules: Pratishtha Pradip (Pt. Nathulal Jain) and Acharya Vasunandi's Pratishtha Sara Sangraha tradition. This finder is a preliminary indication of muhurta-shuddhi — confirmation by a Jyotishacharya is essential for important events."}
        </footer>
      </div>
    </div>
  );
}
