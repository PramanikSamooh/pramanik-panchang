"use client";

// Homepage — daily panchang.
//
// Mobile-first, fit-to-window display. Settings and Download PNG are triggered from the
// hamburger menu in the layout via custom events.

import { useState, useEffect, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import type { PanchangDay } from "@/lib/types";
import {
  type NumberStyle,
  type TimeFormat,
  formatNumberStr,
  formatTimeStr,
  formatTimeRange,
  formatGregorianDate,
} from "@/lib/display-format";

// ─── Cities ────────────────────────────────────────────────────────────────
interface City {
  name: string;
  lat: number;
  lng: number;
  tz: number;
}
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
const DEFAULT_FOOTER = {
  editor: "ब्रह्मचारी अनिल कुमार जैन",
  organisation: "अधिष्ठाता अमर ग्रंथालय",
  address: "श्री दिगम्बर जैन उदासीन आश्रम, 584 एम जी रोड, इन्दौर",
  phone: "9770872087",
};

// ─── localStorage helpers ─────────────────────────────────────────────────
const LS = {
  numberStyle: "pramanik.numberStyle",
  timeFormat: "pramanik.timeFormat",
  city: "pramanik.city",
  autoDetectLocation: "pramanik.autoDetect",
  footer: "pramanik.footer",
};
function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}
function writeLS<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* ignore */ }
}

// ─── Geolocation ──────────────────────────────────────────────────────────
function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
function nearestPresetCity(coords: { lat: number; lng: number }): City {
  let best = PRESET_CITIES[0];
  let bestKm = haversineKm(coords, best);
  for (const c of PRESET_CITIES) {
    const km = haversineKm(coords, c);
    if (km < bestKm) { bestKm = km; best = c; }
  }
  return best;
}

// ─── Helpers ──────────────────────────────────────────────────────────────
function tithiHeadline(day: PanchangDay): string {
  const month = day.hinduMonth.hi;
  const paksha = day.tithi.pakshaHi.replace(" पक्ष", "");
  const tithi = day.tithi.nameHi;
  const adhika = day.masaIsAdhika ? " (अधिक)" : "";
  return `${month}${adhika} ${paksha} ${tithi}`;
}
function todayLocalISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ──────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  // Settings
  const [numberStyle, setNumberStyle] = useState<NumberStyle>("western");
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");
  const [city, setCity] = useState<City>(DEFAULT_CITY);
  const [autoDetect, setAutoDetect] = useState(true);
  const [footer, setFooter] = useState(DEFAULT_FOOTER);
  const [date, setDate] = useState(todayLocalISO());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingFooter, setEditingFooter] = useState(false);

  // Data
  const [day, setDay] = useState<PanchangDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // ── Restore from localStorage on mount + auto-detect location + URL ?date=
  useEffect(() => {
    setNumberStyle(readLS<NumberStyle>(LS.numberStyle, "western"));
    setTimeFormat(readLS<TimeFormat>(LS.timeFormat, "12h"));
    const savedAutoDetect = readLS<boolean>(LS.autoDetectLocation, true);
    setAutoDetect(savedAutoDetect);
    const savedCity = readLS<City | null>(LS.city, null);
    if (savedCity) setCity(savedCity);
    setFooter(readLS(LS.footer, DEFAULT_FOOTER));

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const qd = params.get("date");
      if (qd && /^\d{4}-\d{2}-\d{2}$/.test(qd)) setDate(qd);
    }

    if (savedAutoDetect && !savedCity && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const detected = nearestPresetCity({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setCity(detected);
          writeLS(LS.city, detected);
        },
        () => {},
        { timeout: 5000, maximumAge: 1000 * 60 * 60 * 24 },
      );
    }
  }, []);

  // ── Persist on change
  useEffect(() => writeLS(LS.numberStyle, numberStyle), [numberStyle]);
  useEffect(() => writeLS(LS.timeFormat, timeFormat), [timeFormat]);
  useEffect(() => writeLS(LS.city, city), [city]);
  useEffect(() => writeLS(LS.autoDetectLocation, autoDetect), [autoDetect]);
  useEffect(() => writeLS(LS.footer, footer), [footer]);

  // ── Fetch panchang on date/city change
  useEffect(() => {
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch("/api/panchang", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "single",
            date,
            location: { lat: city.lat, lng: city.lng, tz: city.tz },
          }),
        });
        const text = await res.text();
        let json: { days?: PanchangDay[]; error?: string } = {};
        try { json = text ? JSON.parse(text) : {}; }
        catch { json = { error: text.slice(0, 500) || `HTTP ${res.status}` }; }
        if (!res.ok || json.error) setError(json.error ?? `HTTP ${res.status}`);
        else setDay(json.days?.[0] ?? null);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [date, city]);

  // ── Tell the hamburger menu when a card is ready to download
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("pramanik:daily-ready", { detail: { ready: !!day && !loading } }),
    );
  }, [day, loading]);

  // ── PNG export sized for WhatsApp Status (1080 wide, height auto)
  const downloadPng = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      // Render at 1080 CSS pixels wide (status story dimension). pixelRatio=1 keeps the file
      // exactly 1080 wide. Height is whatever the content needs.
      const node = cardRef.current;
      const naturalWidth = node.offsetWidth || 720;
      const targetWidth = 1080;
      const scale = targetWidth / naturalWidth;
      const dataUrl = await toPng(node, {
        backgroundColor: "#fff8e7",
        canvasWidth: targetWidth,
        canvasHeight: Math.round(node.offsetHeight * scale),
        pixelRatio: 1,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${naturalWidth}px`,
          height: `${node.offsetHeight}px`,
        },
      });
      const link = document.createElement("a");
      link.download = `panchang-${date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      alert("PNG export failed: " + (e instanceof Error ? e.message : String(e)));
    }
  }, [date]);

  // ── Listen for hamburger-menu events
  useEffect(() => {
    const onSettings = () => setSettingsOpen(true);
    const onDownload = () => downloadPng();
    window.addEventListener("pramanik:open-settings", onSettings);
    window.addEventListener("pramanik:download-png", onDownload);
    return () => {
      window.removeEventListener("pramanik:open-settings", onSettings);
      window.removeEventListener("pramanik:download-png", onDownload);
    };
  }, [downloadPng]);

  const requestGeolocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      alert("Browser geolocation is not available.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const detected = nearestPresetCity({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setCity(detected);
        writeLS(LS.city, detected);
      },
      (err) => alert("Could not detect location: " + err.message),
      { timeout: 8000 },
    );
  }, []);

  const fmtTime = (t: string | undefined | null) => formatTimeStr(t, timeFormat, numberStyle);
  const fmtRange = (m: { start: string; end: string } | undefined | null) =>
    m ? formatTimeRange(m.start, m.end, timeFormat, numberStyle) : "-";
  const fmtNum = (n: string | number | null | undefined) => formatNumberStr(n, numberStyle);

  return (
    <>
      {/* Compact in-page top bar (just date + city; menu lives in the layout's header) */}
      <div className="border-b border-gray-800 bg-gray-900/60 px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-gray-100"
          />
          <button
            onClick={() => setDate(todayLocalISO())}
            className="rounded border border-gray-700 px-2.5 py-1.5 text-xs text-gray-300 hover:border-orange-500"
          >
            Today
          </button>
          <select
            value={city.name}
            onChange={(e) => {
              const c = PRESET_CITIES.find((p) => p.name === e.target.value);
              if (c) setCity(c);
            }}
            className="rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-gray-100"
          >
            {PRESET_CITIES.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={requestGeolocation}
            title="Detect my location"
            className="rounded border border-gray-700 px-2 py-1.5 text-xs text-gray-300 hover:border-orange-500"
          >
            📍
          </button>
        </div>
      </div>

      {/* Loading / error */}
      {loading && (
        <div className="p-12 text-center text-gray-500">Loading panchang…</div>
      )}
      {error && (
        <div className="m-3 rounded-lg border border-red-700 bg-red-950/40 p-4 text-sm text-red-300">
          Error: {error}
        </div>
      )}

      {/* Card — fit-to-window. The card grows to fill the viewport's width. PNG export
          renders the same node at 1080px wide via a CSS transform. */}
      {day && !loading && (
        <div className="px-2 py-3 sm:px-4">
          <div
            ref={cardRef}
            className="font-serif text-gray-900"
            style={{
              background: "linear-gradient(180deg, #fff8e7 0%, #fff2d4 100%)",
              border: "5px double #b8860b",
              borderRadius: 10,
              padding: "10px 10px 12px",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
              margin: "0 auto",
            }}
          >
            {/* ── BANNER ── */}
            <div
              style={{
                background: "linear-gradient(180deg, #8b1a1a 0%, #6d1414 100%)",
                color: "#ffd700",
                padding: "8px 10px",
                borderRadius: 6,
                textAlign: "center",
                letterSpacing: 0.3,
              }}
            >
              <div style={{ fontSize: "min(5vw, 22px)", fontWeight: "bold", lineHeight: 1.15 }}>
                ॥ तीर्थंकर वर्धमान जैन पंचांग ॥
              </div>
              <div style={{ fontSize: "min(2.7vw, 12px)", fontStyle: "italic", color: "#fff5b8", marginTop: 2 }}>
                {city.name}, India · {formatGregorianDate(day.date, numberStyle)} ({day.varaEn})
              </div>
            </div>

            {/* ── HEADLINE: complete tithi ── */}
            <div
              style={{
                marginTop: 8,
                background: "linear-gradient(135deg, #fff8dc 0%, #ffd700 50%, #fff8dc 100%)",
                border: "2px solid #b8860b",
                borderRadius: 8,
                padding: "10px 12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "min(2.5vw, 11px)", color: "#5a3a0a", letterSpacing: 1 }}>आज की तिथि</div>
              <div
                style={{
                  fontSize: "min(7vw, 30px)",
                  fontWeight: "bold",
                  color: "#8b1a1a",
                  lineHeight: 1.15,
                  marginTop: 3,
                }}
              >
                {tithiHeadline(day)}
              </div>
              <div style={{ fontSize: "min(3vw, 13px)", color: "#5a3a0a", marginTop: 4 }}>
                {day.varaHi} · वीर निर्वाण संवत् <strong>{fmtNum(day.samvats?.virNirvan)}</strong>
                {" "}· महावीर जन्म संवत् <strong>{fmtNum(day.samvats?.mahavirJanma)}</strong>
              </div>
            </div>

            {/* ── EVENTS HERO ── */}
            <EventsHero day={day} />

            {/* ── TWO-COLUMN PANCHANG ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6 }}>
              <Card title="☀ पंचांग ☀" headerBg="#8b1a1a" headerFg="#ffd700">
                <table style={{ width: "100%", fontSize: "min(3vw, 13px)", borderCollapse: "collapse" }}>
                  <tbody>
                    <KV label="तिथि" value={day.tithi.nameHi} time={fmtTime(day.tithi.endTime)} />
                    <KV label="नक्षत्र" value={day.nakshatra?.nameHi} time={fmtTime(day.nakshatra?.endTime)} />
                    <KV label="योग" value={day.yoga?.nameHi} time={fmtTime(day.yoga?.endTime)} />
                    <KV label="करण" value={day.karana?.nameHi} time={fmtTime(day.karana?.endTime)} />
                    <KV label="वार" value={day.varaHi} />
                    <KV label="आनंदादि" value={day.anandadiYoga?.nameHi} />
                  </tbody>
                </table>
              </Card>
              <Card title="☀ सूर्य एवं चन्द्र ☀" headerBg="#8b1a1a" headerFg="#ffd700">
                <table style={{ width: "100%", fontSize: "min(3vw, 13px)", borderCollapse: "collapse" }}>
                  <tbody>
                    <KV label="सूर्योदय" time={fmtTime(day.sunTimes?.sunrise)} />
                    <KV label="सूर्यास्त" time={fmtTime(day.sunTimes?.sunset)} />
                    <KV label="चन्द्रोदय" time={fmtTime(day.sunTimes?.moonrise)} />
                    <KV label="चन्द्रास्त" time={fmtTime(day.sunTimes?.moonset)} />
                    <KV label="चन्द्र राशि" value={day.moonRashi?.nameHi} />
                    <KV label="सूर्य नक्षत्र" value={day.sunNakshatra?.nameHi} />
                  </tbody>
                </table>
              </Card>
            </div>

            {/* ── COMPACT SAMVAT/MAAS/DISHA STRIP ── */}
            <div
              style={{
                border: "1px solid #b8860b",
                borderRadius: 6,
                background: "#fff8e0",
                padding: "6px 8px",
                marginTop: 6,
                fontSize: "min(2.6vw, 11px)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 6,
                lineHeight: 1.4,
              }}
            >
              <div><strong style={{ color: "#8b1a1a" }}>विक्रम सं.</strong><br />{fmtNum(day.samvats?.vikram)}</div>
              <div><strong style={{ color: "#8b1a1a" }}>शक सं.</strong><br />{fmtNum(day.samvats?.shaka)}</div>
              <div><strong style={{ color: "#8b1a1a" }}>दिवस अवधि</strong><br />{fmtNum(day.dayDuration)}</div>
              <div><strong style={{ color: "#8b1a1a" }}>ऋतु</strong><br />{day.ritu?.hi}</div>
              <div><strong style={{ color: "#8b1a1a" }}>अयन</strong><br />{day.ayana?.hi}</div>
              <div><strong style={{ color: "#8b1a1a" }}>माह (पूर्णि.)</strong><br />{day.hinduMonthPurnimanta?.hi}</div>
              <div><strong style={{ color: "#8b1a1a" }}>माह (अमां.)</strong><br />{day.hinduMonthAmanta?.hi}</div>
              <div><strong style={{ color: "#8b1a1a" }}>दिशा शूल</strong><br /><span style={{ color: "#6a1b9a", fontWeight: "bold" }}>{day.dishaShool?.directionHi}</span></div>
            </div>

            {/* ── MUHURTAS ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 6, marginTop: 6 }}>
              <Card title="✓ शुभ मुहूर्त ✓" headerBg="#1e7a1e" headerFg="#fff" border="#1e7a1e" body="#f0fff0">
                <table style={{ width: "100%", fontSize: "min(2.6vw, 11px)", borderCollapse: "collapse" }}>
                  <tbody>
                    <ShubhRow label="अभिजित" range={fmtRange(day.muhurtas?.abhijit)} />
                    <ShubhRow label="ब्रह्म" range={fmtRange(day.muhurtas?.brahmaMuhurta)} />
                  </tbody>
                </table>
              </Card>
              <Card title="✗ अशुभ मुहूर्त ✗" headerBg="#b22222" headerFg="#fff" border="#b22222" body="#fff5f0">
                <table style={{ width: "100%", fontSize: "min(2.6vw, 11px)", borderCollapse: "collapse" }}>
                  <tbody>
                    <AshubhRow label="राहु काल" range={fmtRange(day.muhurtas?.rahuKalam)} />
                    <AshubhRow label="यमगंड" range={fmtRange(day.muhurtas?.yamganda)} />
                    <AshubhRow label="गुलिक काल" range={fmtRange(day.muhurtas?.gulikaKalam)} />
                    <AshubhRow label="कुलिक" range={fmtRange(day.muhurtas?.kulik)} />
                    <AshubhRow label="कालवेला" range={fmtRange(day.muhurtas?.kalvela)} />
                  </tbody>
                </table>
              </Card>
            </div>

            {/* ── DAY CHOGHADIYA ── */}
            {day.choghadiya && (
              <div style={{ marginTop: 6, border: "1px solid #8b4513", borderRadius: 6, background: "#fffbf0" }}>
                <div
                  style={{
                    background: "#8b4513",
                    color: "#ffd700",
                    textAlign: "center",
                    padding: "4px 0",
                    fontWeight: "bold",
                    fontSize: "min(2.8vw, 12px)",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}
                >
                  🪔 दिन का चौघड़िया 🪔
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0 }}>
                  {day.choghadiya.day.map((seg, i) => (
                    <div
                      key={i}
                      style={{
                        background: seg.type === "shubh" ? "#e8ffe8" : "#ffe8e8",
                        borderRight: i % 4 === 3 ? "none" : "1px solid #e8c890",
                        borderBottom: i < 4 ? "1px solid #e8c890" : "none",
                        padding: "5px 4px",
                        fontSize: "min(2.6vw, 11px)",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontWeight: "bold", color: seg.type === "shubh" ? "#1e7a1e" : "#b22222" }}>
                        {seg.nameHi}
                      </div>
                      <div style={{ fontFamily: "monospace", fontSize: "min(2.3vw, 10px)", color: "#5a3a0a" }}>
                        {fmtTime(seg.start)}–{fmtTime(seg.end)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FOOTER ── */}
            <div
              style={{
                marginTop: 10,
                borderTop: "1px solid #b8860b",
                paddingTop: 6,
                fontSize: "min(2.4vw, 11px)",
                textAlign: "center",
                color: "#5a3a0a",
                lineHeight: 1.5,
              }}
            >
              <div>संपादक — <strong>{footer.editor}</strong></div>
              <div>{footer.organisation} · {footer.address}</div>
              <div>📞 {footer.phone}</div>
              <div style={{ marginTop: 4, fontWeight: "bold", color: "#8b1a1a", fontSize: "min(2.7vw, 12px)" }}>
                ॥ जय जिनेन्द्र ॥
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {settingsOpen && (
        <SettingsModal
          numberStyle={numberStyle}
          setNumberStyle={setNumberStyle}
          timeFormat={timeFormat}
          setTimeFormat={setTimeFormat}
          autoDetect={autoDetect}
          setAutoDetect={setAutoDetect}
          footer={footer}
          setFooter={setFooter}
          editingFooter={editingFooter}
          setEditingFooter={setEditingFooter}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </>
  );
}

// ─── Settings modal ───────────────────────────────────────────────────────

function SettingsModal({
  numberStyle, setNumberStyle, timeFormat, setTimeFormat,
  autoDetect, setAutoDetect, footer, setFooter, editingFooter, setEditingFooter, onClose,
}: {
  numberStyle: NumberStyle;
  setNumberStyle: (v: NumberStyle) => void;
  timeFormat: TimeFormat;
  setTimeFormat: (v: TimeFormat) => void;
  autoDetect: boolean;
  setAutoDetect: (v: boolean) => void;
  footer: typeof DEFAULT_FOOTER;
  setFooter: React.Dispatch<React.SetStateAction<typeof DEFAULT_FOOTER>>;
  editingFooter: boolean;
  setEditingFooter: (v: boolean) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-orange-500">⚙ Settings</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-md text-gray-300 hover:bg-gray-800">✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wide text-gray-500">Number Style</label>
            <div className="flex gap-2">
              <button
                onClick={() => setNumberStyle("western")}
                className={`flex-1 rounded px-3 py-2 text-xs ${numberStyle === "western" ? "bg-orange-600 text-white" : "border border-gray-700 text-gray-300"}`}
              >
                1, 2, 3 (Western)
              </button>
              <button
                onClick={() => setNumberStyle("devanagari")}
                className={`flex-1 rounded px-3 py-2 text-xs ${numberStyle === "devanagari" ? "bg-orange-600 text-white" : "border border-gray-700 text-gray-300"}`}
              >
                १, २, ३ (देवनागरी)
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wide text-gray-500">Time Format</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFormat("12h")}
                className={`flex-1 rounded px-3 py-2 text-xs ${timeFormat === "12h" ? "bg-orange-600 text-white" : "border border-gray-700 text-gray-300"}`}
              >
                12-hour (AM/PM)
              </button>
              <button
                onClick={() => setTimeFormat("24h")}
                className={`flex-1 rounded px-3 py-2 text-xs ${timeFormat === "24h" ? "bg-orange-600 text-white" : "border border-gray-700 text-gray-300"}`}
              >
                24-hour
              </button>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-gray-300">
              <input
                type="checkbox"
                checked={autoDetect}
                onChange={(e) => setAutoDetect(e.target.checked)}
                className="accent-orange-500"
              />
              Auto-detect location next visit
            </label>
          </div>
          <div className="border-t border-gray-800 pt-3">
            <label className="mb-2 block text-[10px] uppercase tracking-wide text-gray-500">Card Footer</label>
            {editingFooter ? (
              <div className="space-y-2">
                <input value={footer.editor} onChange={(e) => setFooter((f) => ({ ...f, editor: e.target.value }))}
                  placeholder="Editor name"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-gray-100" />
                <input value={footer.organisation} onChange={(e) => setFooter((f) => ({ ...f, organisation: e.target.value }))}
                  placeholder="Organisation"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-gray-100" />
                <input value={footer.address} onChange={(e) => setFooter((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Address"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-gray-100" />
                <input value={footer.phone} onChange={(e) => setFooter((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="Phone"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-gray-100" />
                <button onClick={() => setEditingFooter(false)} className="rounded bg-orange-600 px-3 py-1.5 text-xs text-white">
                  Done
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="truncate">{footer.editor} · {footer.phone}</span>
                <button onClick={() => setEditingFooter(true)} className="rounded border border-gray-700 px-2 py-1 hover:border-orange-500">
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────

function Card({
  title, headerBg, headerFg,
  border = "#b8860b", body = "#fff8e0",
  children,
}: {
  title: string;
  headerBg: string;
  headerFg: string;
  border?: string;
  body?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 6, background: body }}>
      <div
        style={{
          background: headerBg,
          color: headerFg,
          textAlign: "center",
          padding: "3px 0",
          fontWeight: "bold",
          fontSize: "min(2.8vw, 12px)",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function KV({ label, value, time }: { label: string; value?: string | null; time?: string }) {
  return (
    <tr style={{ borderBottom: "1px dotted #d4af37" }}>
      <td style={{ padding: "3px 6px", color: "#8b1a1a", fontWeight: "bold", whiteSpace: "nowrap" }}>{label}</td>
      <td style={{ padding: "3px 6px", textAlign: "left" }}>{value || ""}</td>
      <td style={{ padding: "3px 6px", textAlign: "right", fontFamily: "monospace", color: "#5a3a0a", fontSize: "0.85em" }}>
        {time || ""}
      </td>
    </tr>
  );
}

function ShubhRow({ label, range }: { label: string; range: string }) {
  return (
    <tr style={{ borderBottom: "1px dotted #c0e0c0" }}>
      <td style={{ padding: "3px 6px", color: "#1e7a1e", fontWeight: "bold" }}>{label}</td>
      <td style={{ padding: "3px 6px", textAlign: "right", fontFamily: "monospace", fontSize: "0.85em" }}>{range}</td>
    </tr>
  );
}

function AshubhRow({ label, range }: { label: string; range: string }) {
  return (
    <tr style={{ borderBottom: "1px dotted #f0c0c0" }}>
      <td style={{ padding: "3px 6px", color: "#b22222", fontWeight: "bold", whiteSpace: "nowrap" }}>{label}</td>
      <td style={{ padding: "3px 6px", textAlign: "right", fontFamily: "monospace", fontSize: "0.85em" }}>{range}</td>
    </tr>
  );
}

const CATEGORY_META: Record<string, { labelHi: string; bg: string; fg: string; emoji: string }> = {
  panch_kalyanak: { labelHi: "कल्याणक", bg: "#fff8dc", fg: "#8b1a1a", emoji: "🕉" },
  jain_parv:      { labelHi: "पर्व",     bg: "#fff5e0", fg: "#c2410c", emoji: "🪔" },
  vrat:           { labelHi: "व्रत",     bg: "#fff0f5", fg: "#9a1c5c", emoji: "🌸" },
  national:       { labelHi: "अवकाश",   bg: "#e8f5ff", fg: "#1e3a8a", emoji: "🇮🇳" },
  acharya:        { labelHi: "आचार्य",   bg: "#f0f8ff", fg: "#4b3a8a", emoji: "🕉" },
  muhurt:         { labelHi: "मुहूर्त",   bg: "#fff8e0", fg: "#5c4a0a", emoji: "⏱" },
};

function EventsHero({ day }: { day: PanchangDay }) {
  // Group seeded events; inject ras tyag inside the व्रत group.
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
      <div
        style={{
          marginTop: 6,
          padding: "8px 12px",
          background: "#fff8e0",
          border: "1px dashed #d4af37",
          borderRadius: 6,
          fontSize: "min(2.7vw, 12px)",
          textAlign: "center",
          color: "#8b6e0a",
          fontStyle: "italic",
        }}
      >
        ॥ आज कोई विशेष पर्व/व्रत/कल्याणक नहीं है ॥
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 8,
        background: "linear-gradient(135deg, #fff8dc 0%, #fff2c8 50%, #fff8dc 100%)",
        border: "2px solid #d4af37",
        borderRadius: 8,
        padding: "8px 10px",
        boxShadow: "inset 0 0 0 1px #ffe080",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "min(2.6vw, 11px)",
          fontWeight: "bold",
          color: "#8b1a1a",
          letterSpacing: 1,
          marginBottom: 6,
        }}
      >
        ✦ ✦ ✦ आज का विशेष ✦ ✦ ✦
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {ordered.map((cat) => {
          const meta = CATEGORY_META[cat] || CATEGORY_META.jain_parv;
          const items = grouped[cat];
          return (
            <div key={cat} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
              <div
                style={{
                  background: meta.fg,
                  color: "#fff",
                  fontSize: "min(2.2vw, 10px)",
                  fontWeight: "bold",
                  padding: "3px 6px",
                  borderRadius: 10,
                  whiteSpace: "nowrap",
                  minWidth: 56,
                  textAlign: "center",
                  marginTop: 1,
                }}
              >
                {meta.emoji} {meta.labelHi}
              </div>
              <div style={{ flex: 1, fontSize: "min(3.3vw, 14px)", lineHeight: 1.45, color: meta.fg, fontWeight: 600 }}>
                {items.map((it, i) => (
                  <span key={it.key}>
                    {i > 0 && <span style={{ color: "#aaa", margin: "0 4px" }}>•</span>}
                    {it.label}
                    {it.sub && (
                      <span style={{ color: "#777", fontWeight: 400, fontSize: "0.85em" }}> ({it.sub})</span>
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
