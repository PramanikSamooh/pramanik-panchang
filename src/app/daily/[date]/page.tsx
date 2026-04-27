"use client";

import { useState, useEffect, useRef, use } from "react";
import { toPng } from "html-to-image";
import type { PanchangDay } from "@/lib/types";

const DEFAULT_CITY = { name: "Indore", lat: 22.7196, lng: 75.8577, tz: 330 };

const PRESET_CITIES = [
  { name: "Indore", lat: 22.7196, lng: 75.8577, tz: 330 },
  { name: "Ujjain", lat: 23.1765, lng: 75.7885, tz: 330 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, tz: 330 },
  { name: "Delhi", lat: 28.6139, lng: 77.209, tz: 330 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, tz: 330 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, tz: 330 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, tz: 330 },
];

const DEFAULT_FOOTER = {
  editor: "ब्रह्मचारी अनिल कुमार जैन",
  organisation: "अधिष्ठाता अमर ग्रंथालय",
  address: "श्री दिगम्बर जैन उदासीन आश्रम, 584 एम जी रोड, इन्दौर",
  phone: "9770872087",
};

interface PageProps {
  params: Promise<{ date: string }>;
}

export default function DailyPanchangPage({ params }: PageProps) {
  const { date: dateParam } = use(params);
  const [day, setDay] = useState<PanchangDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [footer, setFooter] = useState(DEFAULT_FOOTER);
  const [editingFooter, setEditingFooter] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
            date: dateParam,
            location: { lat: city.lat, lng: city.lng, tz: city.tz },
          }),
        });
        // Robust error handling: API may return HTML/text on a server crash, not JSON.
        const text = await res.text();
        let json: { days?: PanchangDay[]; error?: string } = {};
        try {
          json = text ? JSON.parse(text) : {};
        } catch {
          json = { error: text.slice(0, 500) || `HTTP ${res.status} ${res.statusText}` };
        }
        if (!res.ok || json.error) {
          setError(json.error ?? `HTTP ${res.status}`);
        } else {
          setDay(json.days?.[0] ?? null);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [dateParam, city]);

  const downloadPng = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2.5,
        backgroundColor: "#fff8e7",
      });
      const link = document.createElement("a");
      link.download = `panchang-${dateParam}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      alert("PNG export failed: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-400">Loading panchang for {dateParam}...</div>;
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>;
  if (!day) return <div className="p-8 text-gray-400">No data for {dateParam}.</div>;

  const formattedDate = formatDate(dateParam);

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      {/* Toolbar */}
      <div className="mx-auto mb-4 flex max-w-[640px] flex-wrap items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 p-3">
        <label className="text-xs text-gray-300">
          City:{" "}
          <select
            value={city.name}
            onChange={(e) => {
              const c = PRESET_CITIES.find((p) => p.name === e.target.value);
              if (c) setCity(c);
            }}
            className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
          >
            {PRESET_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => setEditingFooter((v) => !v)}
          className="rounded bg-gray-800 px-3 py-1 text-xs text-gray-300 hover:bg-gray-700"
        >
          {editingFooter ? "Done editing footer" : "Edit footer"}
        </button>
        <button
          onClick={downloadPng}
          className="ml-auto rounded bg-orange-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange-700"
        >
          ⬇ Download PNG
        </button>
      </div>

      {/* The card itself — designed to render to a single PNG for WhatsApp share */}
      <div className="mx-auto" style={{ maxWidth: 640 }}>
        <div
          ref={cardRef}
          className="font-serif text-gray-900"
          style={{
            background: "linear-gradient(180deg, #fff8e7 0%, #fff2d4 100%)",
            border: "6px double #b8860b",
            borderRadius: 12,
            padding: 12,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Banner with date + city inline */}
          <div
            style={{
              background: "linear-gradient(180deg, #8b1a1a 0%, #6d1414 100%)",
              color: "#ffd700",
              padding: "8px 12px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: "bold", lineHeight: 1.2, color: "#ffd700" }}>
              📅 {formattedDate}
              <br />
              📍 {city.name}
            </div>
            <div style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1, letterSpacing: 0.3 }}>
              ॥ तीर्थंकर वर्धमान जैन पंचांग ॥
              <div style={{ fontSize: 12, fontStyle: "italic", color: "#fff5b8", marginTop: 1 }}>
                Daily Panchang
              </div>
            </div>
            <div style={{ fontSize: 10, textAlign: "right", color: "#fff5b8" }}>
              {day.varaHi}<br />
              <span style={{ fontStyle: "italic" }}>{day.varaEn}</span>
            </div>
          </div>

          {/* ★ EVENTS HERO ★ — most prominent block on the card */}
          <EventsHero day={day} />

          {/* Two-column main panchang (compact) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6 }}>
            {/* Left — पंचांग */}
            <div style={{ border: "1px solid #b8860b", borderRadius: 6, background: "#fff8e0" }}>
              <div
                style={{
                  background: "#8b1a1a",
                  color: "#ffd700",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 12,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ☀ पंचांग ☀
              </div>
              <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse" }}>
                <tbody>
                  <KV label="तिथि" value={day.tithi.nameHi} time={day.tithi.endTime} />
                  <KV label="पक्ष" value={day.tithi.pakshaHi.replace(" पक्ष", "") + (day.masaIsAdhika ? " (अधिक)" : "")} />
                  <KV label="नक्षत्र" value={day.nakshatra?.nameHi} time={day.nakshatra?.endTime} />
                  <KV label="योग" value={day.yoga?.nameHi} time={day.yoga?.endTime} />
                  <KV label="करण" value={day.karana?.nameHi} time={day.karana?.endTime} />
                  <KV label="आनंदादि" value={day.anandadiYoga?.nameHi} />
                </tbody>
              </table>
            </div>

            {/* Right — सूर्य एवं चन्द्र गणना */}
            <div style={{ border: "1px solid #b8860b", borderRadius: 6, background: "#fff8e0" }}>
              <div
                style={{
                  background: "#8b1a1a",
                  color: "#ffd700",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 12,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ☀ सूर्य एवं चन्द्र ☀
              </div>
              <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse" }}>
                <tbody>
                  <KV label="सूर्योदय" value={day.sunTimes?.sunrise} />
                  <KV label="सूर्यास्त" value={day.sunTimes?.sunset} />
                  <KV label="चन्द्रोदय" value={day.sunTimes?.moonrise} />
                  <KV label="चन्द्रास्त" value={day.sunTimes?.moonset} />
                  <KV label="चन्द्र राशि" value={day.moonRashi?.nameHi} />
                  <KV label="सूर्य नक्षत्र" value={day.sunNakshatra?.nameHi} />
                </tbody>
              </table>
            </div>
          </div>

          {/* Compact samvat strip — single horizontal band */}
          <div
            style={{
              border: "1px solid #b8860b",
              borderRadius: 6,
              background: "#fff8e0",
              padding: "5px 8px",
              marginTop: 6,
              fontSize: 10.5,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 6,
              lineHeight: 1.4,
            }}
          >
            <div><strong style={{ color: "#8b1a1a" }}>वीर निर्वाण सं.</strong><br />{day.samvats?.virNirvan ?? "-"}</div>
            <div><strong style={{ color: "#8b1a1a" }}>म. जन्म सं.</strong><br />{day.samvats?.mahavirJanma ?? "-"}</div>
            <div><strong style={{ color: "#8b1a1a" }}>विक्रम सं.</strong><br />{day.samvats?.vikram ?? "-"}</div>
            <div><strong style={{ color: "#8b1a1a" }}>शक सं.</strong><br />{day.samvats?.shaka ?? "-"}</div>
            <div><strong style={{ color: "#8b1a1a" }}>माह (पूर्णि.)</strong><br />{day.hinduMonthPurnimanta?.hi}</div>
            <div><strong style={{ color: "#8b1a1a" }}>माह (अमां.)</strong><br />{day.hinduMonthAmanta?.hi}</div>
            <div><strong style={{ color: "#8b1a1a" }}>दिवस अवधि</strong><br />{day.dayDuration ?? "-"}</div>
            <div><strong style={{ color: "#8b1a1a" }}>ऋतु / अयन</strong><br />{day.ritu?.hi} / {day.ayana?.hi?.slice(0, 4)}</div>
          </div>

          {/* Three-column muhurta block: शुभ | दिशा शूल | अशुभ */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr 1.5fr", gap: 6, marginTop: 6 }}>
            {/* Shubh muhurta */}
            <div style={{ border: "1px solid #1e7a1e", borderRadius: 6, background: "#f0fff0" }}>
              <div
                style={{
                  background: "#1e7a1e",
                  color: "#fff",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 11,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ✓ शुभ मुहूर्त ✓
              </div>
              <table style={{ width: "100%", fontSize: 10, borderCollapse: "collapse" }}>
                <tbody>
                  <ShubhRow label="अभिजित" m={day.muhurtas?.abhijit} />
                  <ShubhRow label="ब्रह्म" m={day.muhurtas?.brahmaMuhurta} />
                </tbody>
              </table>
            </div>

            {/* Disha Shool */}
            <div style={{ border: "1px solid #6a1b9a", borderRadius: 6, background: "#f8f0ff", display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  background: "#6a1b9a",
                  color: "#fff",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 11,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ⊕ दिशा शूल ⊕
              </div>
              <div style={{ padding: "8px 4px", textAlign: "center", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 20, fontWeight: "bold", color: "#6a1b9a" }}>{day.dishaShool?.directionHi}</div>
                <div style={{ fontSize: 9, color: "#666" }}>यात्रा वर्जित</div>
              </div>
            </div>

            {/* Ashubh muhurta */}
            <div style={{ border: "1px solid #b22222", borderRadius: 6, background: "#fff5f0" }}>
              <div
                style={{
                  background: "#b22222",
                  color: "#fff",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 11,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ✗ अशुभ मुहूर्त ✗
              </div>
              <table style={{ width: "100%", fontSize: 10, borderCollapse: "collapse" }}>
                <tbody>
                  <AshubhRow label="राहु काल" m={day.muhurtas?.rahuKalam} />
                  <AshubhRow label="यमगंड" m={day.muhurtas?.yamganda} />
                  <AshubhRow label="गुलिक काल" m={day.muhurtas?.gulikaKalam} />
                  <AshubhRow label="कुलिक" m={day.muhurtas?.kulik} />
                  <AshubhRow label="कालवेला" m={day.muhurtas?.kalvela} />
                </tbody>
              </table>
            </div>
          </div>

          {/* Day Choghadiya — 4-column grid */}
          {day.choghadiya && (
            <div style={{ marginTop: 6, border: "1px solid #8b4513", borderRadius: 6, background: "#fffbf0" }}>
              <div
                style={{
                  background: "#8b4513",
                  color: "#ffd700",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 11,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                🪔 दिन का चौघड़िया 🪔
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: 0,
                  padding: 0,
                }}
              >
                {day.choghadiya.day.map((seg, i) => (
                  <div
                    key={i}
                    style={{
                      background: seg.type === "shubh" ? "#e8ffe8" : "#ffe8e8",
                      borderRight: i % 4 === 3 ? "none" : "1px solid #e8c890",
                      borderBottom: i < 4 ? "1px solid #e8c890" : "none",
                      padding: "3px 6px",
                      fontSize: 10,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        color: seg.type === "shubh" ? "#1e7a1e" : "#b22222",
                      }}
                    >
                      {seg.nameHi}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: "#5a3a0a" }}>
                      {seg.start}–{seg.end}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: 8,
              borderTop: "1px solid #b8860b",
              paddingTop: 6,
              fontSize: 10,
              textAlign: "center",
              color: "#5a3a0a",
            }}
          >
            {editingFooter ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <input
                  value={footer.editor}
                  onChange={(e) => setFooter((f) => ({ ...f, editor: e.target.value }))}
                  className="rounded border border-gray-300 px-2 py-1 text-xs"
                  placeholder="Editor name"
                />
                <input
                  value={footer.organisation}
                  onChange={(e) => setFooter((f) => ({ ...f, organisation: e.target.value }))}
                  className="rounded border border-gray-300 px-2 py-1 text-xs"
                  placeholder="Organisation"
                />
                <input
                  value={footer.address}
                  onChange={(e) => setFooter((f) => ({ ...f, address: e.target.value }))}
                  className="rounded border border-gray-300 px-2 py-1 text-xs"
                  placeholder="Address"
                />
                <input
                  value={footer.phone}
                  onChange={(e) => setFooter((f) => ({ ...f, phone: e.target.value }))}
                  className="rounded border border-gray-300 px-2 py-1 text-xs"
                  placeholder="Phone"
                />
              </div>
            ) : (
              <>
                <div>संपादक — <strong>{footer.editor}</strong></div>
                <div>{footer.organisation}</div>
                <div>{footer.address}</div>
                <div>📞 {footer.phone}</div>
                <div style={{ marginTop: 4, fontWeight: "bold", color: "#8b1a1a" }}>॥ जय जिनेन्द्र ॥</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KV({ label, value, time }: { label: string; value?: string | null; time?: string }) {
  return (
    <tr style={{ borderBottom: "1px dotted #d4af37" }}>
      <td style={{ padding: "2px 6px", color: "#8b1a1a", fontWeight: "bold", whiteSpace: "nowrap" }}>{label}</td>
      <td style={{ padding: "2px 6px", textAlign: "left" }}>{value || "-"}</td>
      <td style={{ padding: "2px 6px", textAlign: "right", fontFamily: "monospace", color: "#5a3a0a", fontSize: 9 }}>
        {time || ""}
      </td>
    </tr>
  );
}

function ShubhRow({ label, m }: { label: string; m?: { start: string; end: string } }) {
  return (
    <tr style={{ borderBottom: "1px dotted #c0e0c0" }}>
      <td style={{ padding: "2px 6px", color: "#1e7a1e", fontWeight: "bold" }}>{label}</td>
      <td style={{ padding: "2px 6px", textAlign: "right", fontFamily: "monospace", fontSize: 9 }}>
        {m ? `${m.start}–${m.end}` : "-"}
      </td>
    </tr>
  );
}

function AshubhRow({ label, m }: { label: string; m?: { start: string; end: string } }) {
  return (
    <tr style={{ borderBottom: "1px dotted #f0c0c0" }}>
      <td style={{ padding: "2px 6px", color: "#b22222", fontWeight: "bold", whiteSpace: "nowrap" }}>{label}</td>
      <td style={{ padding: "2px 6px", textAlign: "right", fontFamily: "monospace", fontSize: 9 }}>
        {m ? `${m.start}–${m.end}` : "-"}
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EventsHero — the main event highlight block
// Shows kalyanaks, parvs, vrats prominently with category badges and color-coding.
// This is the most important visual element on the daily card.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { labelHi: string; bg: string; fg: string; border: string; emoji: string }> = {
  panch_kalyanak: { labelHi: "कल्याणक", bg: "#fff8dc", fg: "#8b1a1a", border: "#d4af37", emoji: "🕉" },
  jain_parv:      { labelHi: "पर्व",     bg: "#fff5e0", fg: "#c2410c", border: "#e8730a", emoji: "🪔" },
  vrat:           { labelHi: "व्रत",     bg: "#fff0f5", fg: "#9a1c5c", border: "#b8860b", emoji: "🌸" },
  national:       { labelHi: "अवकाश",   bg: "#e8f5ff", fg: "#1e3a8a", border: "#1e88e5", emoji: "🇮🇳" },
  acharya:        { labelHi: "आचार्य",   bg: "#f0f8ff", fg: "#4b3a8a", border: "#7c3aed", emoji: "🕉" },
  muhurt:         { labelHi: "मुहूर्त",   bg: "#fff8e0", fg: "#5c4a0a", border: "#b8860b", emoji: "⏱" },
};

function EventsHero({ day }: { day: PanchangDay }) {
  if (!day.todayEvents || day.todayEvents.length === 0) {
    // Still show a small "no events" pill so the layout is consistent
    return (
      <div
        style={{
          marginTop: 6,
          padding: "6px 10px",
          background: "#fff8e0",
          border: "1px dashed #d4af37",
          borderRadius: 6,
          fontSize: 11,
          textAlign: "center",
          color: "#8b6e0a",
          fontStyle: "italic",
        }}
      >
        ॥ आज कोई विशेष पर्व/व्रत/कल्याणक नहीं है ॥
      </div>
    );
  }

  // Group events by category for a structured display
  const grouped: Record<string, typeof day.todayEvents> = {};
  for (const e of day.todayEvents) {
    const cat = e.category || "jain_parv";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(e);
  }

  // Order: panch_kalyanak, jain_parv, vrat, national, acharya, muhurt
  const ORDER = ["panch_kalyanak", "jain_parv", "vrat", "national", "acharya", "muhurt"];
  const ordered = ORDER.filter((c) => grouped[c]);

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
          fontSize: 11,
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
          const events = grouped[cat];
          return (
            <div key={cat} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
              <div
                style={{
                  background: meta.fg,
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: "bold",
                  padding: "2px 6px",
                  borderRadius: 10,
                  whiteSpace: "nowrap",
                  minWidth: 56,
                  textAlign: "center",
                  marginTop: 1,
                }}
              >
                {meta.emoji} {meta.labelHi}
              </div>
              <div style={{ flex: 1, fontSize: 13, lineHeight: 1.45, color: meta.fg, fontWeight: 600 }}>
                {events.map((e, i) => (
                  <span key={e.eventId}>
                    {i > 0 && <span style={{ color: "#aaa", margin: "0 4px" }}>•</span>}
                    {e.nameHi}
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

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
