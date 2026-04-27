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
    fetch("/api/panchang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "single",
        date: dateParam,
        location: { lat: city.lat, lng: city.lng, tz: city.tz },
      }),
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.error) setError(j.error);
        else setDay(j.days?.[0] ?? null);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
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
            border: "8px double #b8860b",
            borderRadius: 12,
            padding: 16,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Banner */}
          <div
            style={{
              background: "linear-gradient(180deg, #8b1a1a 0%, #6d1414 100%)",
              color: "#ffd700",
              textAlign: "center",
              padding: "10px 8px",
              borderRadius: 6,
              fontSize: 22,
              fontWeight: "bold",
              letterSpacing: 0.5,
            }}
          >
            ॥ तीर्थंकर वर्धमान जैन पंचांग दैनिक ॥
          </div>

          {/* Date + City + "Daily Panchang" caption */}
          <div className="flex items-center justify-between" style={{ padding: "8px 4px" }}>
            <div style={{ background: "#fff5e0", borderRadius: 6, padding: "4px 10px" }}>
              <div style={{ fontSize: 14, color: "#8b1a1a", fontWeight: "bold" }}>📅 {formattedDate}</div>
              <div style={{ fontSize: 11, color: "#666" }}>📍 {city.name}, India</div>
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#8b1a1a",
                fontWeight: "bold",
                fontStyle: "italic",
                fontFamily: "serif",
              }}
            >
              ॥ Daily Panchang ॥
            </div>
          </div>

          {/* Two-column main panchang */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
            {/* Left — पंचांग */}
            <div style={{ border: "1px solid #b8860b", borderRadius: 6, background: "#fff8e0" }}>
              <div
                style={{
                  background: "#8b1a1a",
                  color: "#ffd700",
                  textAlign: "center",
                  padding: "4px 0",
                  fontWeight: "bold",
                  fontSize: 13,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ☀ पंचांग ☀
              </div>
              <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                <tbody>
                  <KV label="तिथि" value={day.tithi.nameHi} time={day.tithi.endTime} />
                  <KV label="नक्षत्र" value={day.nakshatra?.nameHi} time={day.nakshatra?.endTime} />
                  <KV
                    label="करण"
                    value={day.karana?.nameHi}
                    time={day.karana?.endTime}
                  />
                  <KV label="पक्ष" value={day.tithi.pakshaHi.replace(" पक्ष", "")} />
                  <KV label="योग" value={day.yoga?.nameHi} time={day.yoga?.endTime} />
                  <KV label="वार" value={day.varaHi} />
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
                  padding: "4px 0",
                  fontWeight: "bold",
                  fontSize: 13,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ☀ सूर्य एवं चन्द्र गणना ☀
              </div>
              <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                <tbody>
                  <KV label="सूर्योदय" value={day.sunTimes?.sunrise} />
                  <KV label="सूर्यास्त" value={day.sunTimes?.sunset} />
                  <KV label="चन्द्रोदय" value={day.sunTimes?.moonrise} />
                  <KV label="चन्द्रास्त" value={day.sunTimes?.moonset} />
                  <KV label="चन्द्र राशि" value={day.moonRashi?.nameHi} />
                  <KV label="सूर्य नक्षत्र" value={day.sunNakshatra?.nameHi} />
                  <KV label="ऋतु" value={day.ritu?.hi} />
                </tbody>
              </table>
            </div>
          </div>

          {/* Samvat band */}
          <div
            style={{
              border: "1px solid #b8860b",
              borderRadius: 6,
              background: "#fff8e0",
              padding: "6px 10px",
              marginTop: 6,
              fontSize: 11,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 4,
            }}
          >
            <div>
              <strong>वीर निर्वाण संवत्</strong>: {day.samvats?.virNirvan ?? "-"}
            </div>
            <div>
              <strong>विक्रम संवत्</strong>: {day.samvats?.vikram ?? "-"}
            </div>
            <div>
              <strong>शक संवत्</strong>: {day.samvats?.shaka ?? "-"}
            </div>
            <div>
              <strong>महावीर जन्म संवत्</strong>: {day.samvats?.mahavirJanma ?? "-"}
            </div>
            <div>
              <strong>दिवस अवधि</strong>: {day.dayDuration ?? "-"}
            </div>
            <div>
              <strong>अयन</strong>: {day.ayana?.hi ?? "-"}
            </div>
            <div style={{ gridColumn: "span 3" }}>
              <strong>माह अमान्त</strong>: {day.hinduMonthAmanta?.hi}
              {"   "}
              <strong>माह पूर्णिमान्त</strong>: {day.hinduMonthPurnimanta?.hi}
              {day.masaIsAdhika ? " (अधिक)" : ""}
            </div>
          </div>

          {/* Shubh muhurta + Disha shool */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6 }}>
            <div style={{ border: "1px solid #1e7a1e", borderRadius: 6, background: "#f0fff0" }}>
              <div
                style={{
                  background: "#1e7a1e",
                  color: "#fff",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 12,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ☀ शुभ मुहूर्त ☀
              </div>
              <div style={{ padding: "6px 8px", fontSize: 11 }}>
                <div>
                  <strong>अभिजित</strong>: {day.muhurtas?.abhijit?.start}–{day.muhurtas?.abhijit?.end}
                </div>
                <div>
                  <strong>ब्रह्म</strong>: {day.muhurtas?.brahmaMuhurta?.start}–{day.muhurtas?.brahmaMuhurta?.end}
                </div>
                <div>
                  <strong>आनंदादि</strong>: {day.anandadiYoga?.nameHi}
                </div>
              </div>
            </div>
            <div style={{ border: "1px solid #6a1b9a", borderRadius: 6, background: "#f8f0ff" }}>
              <div
                style={{
                  background: "#6a1b9a",
                  color: "#fff",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 12,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                ☀ दिशा शूल ☀
              </div>
              <div style={{ padding: "6px 8px", fontSize: 13, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: "bold", color: "#6a1b9a" }}>
                  {day.dishaShool?.directionHi}
                </div>
                <div style={{ fontSize: 10, color: "#666" }}>(आज इस दिशा में यात्रा वर्जित)</div>
              </div>
            </div>
          </div>

          {/* Ashubh muhurta */}
          <div style={{ marginTop: 6, border: "1px solid #b22222", borderRadius: 6, background: "#fff5f0" }}>
            <div
              style={{
                background: "#b22222",
                color: "#fff",
                textAlign: "center",
                padding: "3px 0",
                fontWeight: "bold",
                fontSize: 12,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              ☀ अशुभ मुहूर्त ☀
            </div>
            <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse" }}>
              <tbody>
                <AshubhRow label="राहु काल" m={day.muhurtas?.rahuKalam} />
                <AshubhRow label="यमगंड" m={day.muhurtas?.yamganda} />
                <AshubhRow label="गुलिक काल" m={day.muhurtas?.gulikaKalam} />
                <AshubhRow label="कुलिक" m={day.muhurtas?.kulik} />
                <AshubhRow label="कालवेला" m={day.muhurtas?.kalvela} />
                <AshubhRow label="कंटक / मृत्यु" m={day.muhurtas?.kantakMrityu} />
                <AshubhRow label="यमघण्ट" m={day.muhurtas?.yamghant} />
              </tbody>
            </table>
          </div>

          {/* Day Choghadiya */}
          {day.choghadiya && (
            <div style={{ marginTop: 6, border: "1px solid #8b4513", borderRadius: 6, background: "#fffbf0" }}>
              <div
                style={{
                  background: "#8b4513",
                  color: "#ffd700",
                  textAlign: "center",
                  padding: "3px 0",
                  fontWeight: "bold",
                  fontSize: 12,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                🪔 दिन का चौघड़िया 🪔
              </div>
              <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse" }}>
                <tbody>
                  {day.choghadiya.day.map((seg, i) => (
                    <tr
                      key={i}
                      style={{
                        background: seg.type === "shubh" ? "#f0fff0" : "#fff0f0",
                      }}
                    >
                      <td style={{ padding: "3px 8px", fontWeight: "bold", color: seg.type === "shubh" ? "#1e7a1e" : "#b22222" }}>
                        {seg.nameHi}
                      </td>
                      <td style={{ padding: "3px 8px", textAlign: "right", fontFamily: "monospace" }}>
                        {seg.start} – {seg.end}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Today's events */}
          {day.todayEvents.length > 0 && (
            <div
              style={{
                marginTop: 6,
                border: "1px solid #d4af37",
                borderRadius: 6,
                background: "#fffbe5",
                padding: "6px 10px",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: "bold", color: "#8b1a1a", marginBottom: 3 }}>
                आज के पर्व / कल्याणक:
              </div>
              <div style={{ fontSize: 11, lineHeight: 1.5 }}>
                {day.todayEvents.map((e) => e.nameHi).join(" • ")}
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
      <td style={{ padding: "3px 8px", color: "#8b1a1a", fontWeight: "bold", whiteSpace: "nowrap" }}>{label}</td>
      <td style={{ padding: "3px 8px", textAlign: "left" }}>{value || "-"}</td>
      <td style={{ padding: "3px 8px", textAlign: "right", fontFamily: "monospace", color: "#5a3a0a" }}>
        {time || ""}
      </td>
    </tr>
  );
}

function AshubhRow({ label, m }: { label: string; m?: { start: string; end: string } }) {
  return (
    <tr style={{ borderBottom: "1px dotted #f0c0c0" }}>
      <td style={{ padding: "3px 8px", color: "#b22222", fontWeight: "bold" }}>{label}</td>
      <td style={{ padding: "3px 8px", textAlign: "right", fontFamily: "monospace" }}>
        {m ? `${m.start} – ${m.end}` : "-"}
      </td>
    </tr>
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
