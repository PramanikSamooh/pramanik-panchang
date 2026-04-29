"use client";

import { useState, useEffect, useRef } from "react";
import type { PanchangDay } from "@/lib/types";
import { type NumberStyle, formatNumberStr } from "@/lib/display-format";
import { BRAND } from "@/lib/branding";

const NUMBER_STYLE_LS = "pramanik.numberStyle";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTHS_HI = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर",
];

const DAYS_HI = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
const DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarType = "wall" | "table" | "a4" | "a4img" | "a3";

const CALENDAR_TYPES: { key: CalendarType; label: string; desc: string; size: string; imageSize: string; imageRatio: string }[] = [
  { key: "wall", label: "Wall Calendar", desc: "Portrait, image on top, calendar below", size: "A3 (297×420mm) or 12×18 inch", imageSize: "2480 × 1600 px", imageRatio: "3:2 landscape" },
  { key: "table", label: "Table Calendar", desc: "Landscape, compact, tent-fold", size: "A5 Landscape (210×148mm) or 8×5 inch", imageSize: "1748 × 760 px", imageRatio: "2.3:1 wide landscape" },
  { key: "a4", label: "A4 Calendar", desc: "Standard A4, no image, large fonts", size: "A4 (210×297mm)", imageSize: "No image", imageRatio: "—" },
  { key: "a4img", label: "A4 with Image", desc: "A4 page with image on top", size: "A4 (210×297mm)", imageSize: "1748 × 800 px", imageRatio: "2.2:1 landscape" },
  { key: "a3", label: "A3 Poster", desc: "Large poster with image and calendar", size: "A3 (297×420mm)", imageSize: "2480 × 1470 px", imageRatio: "5:3 landscape" },
];

// Unique month key: "2026-04" format
interface MonthEntry {
  key: string; // "2026-04"
  month: number; // 0-11
  year: number;
  label: string; // "April 2026"
  labelHi: string; // "अप्रैल 2026"
}

export default function PrintCalendarPage() {
  const [panchangData, setPanchangData] = useState<PanchangDay[]>([]);
  const [selectedMonthKey, setSelectedMonthKey] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [calendarType, setCalendarType] = useState<CalendarType>("a4");
  const [showImages, setShowImages] = useState(false);
  const [monthImages, setMonthImages] = useState<Record<string, string>>({}); // keyed by "2026-04"

  // Number style — shared with the homepage via the same localStorage key.
  const [numberStyle, setNumberStyleState] = useState<NumberStyle>("western");
  const fmtNum = (n: string | number | null | undefined) => formatNumberStr(n, numberStyle);

  // Persist number style and mirror it back into localStorage so the homepage and other pages stay in sync.
  const setNumberStyle = (v: NumberStyle) => {
    setNumberStyleState(v);
    try { localStorage.setItem(NUMBER_STYLE_LS, JSON.stringify(v)); } catch {}
  };

  const printRef = useRef<HTMLDivElement>(null);

  // Derive available months from generated data
  const availableMonths: MonthEntry[] = (() => {
    const seen = new Set<string>();
    const months: MonthEntry[] = [];
    for (const d of panchangData) {
      const [y, m] = d.date.split("-");
      const key = `${y}-${m}`;
      if (!seen.has(key)) {
        seen.add(key);
        const mi = parseInt(m) - 1;
        const yi = parseInt(y);
        months.push({
          key,
          month: mi,
          year: yi,
          label: `${MONTHS[mi]} ${yi}`,
          labelHi: `${MONTHS_HI[mi]} ${yi}`,
        });
      }
    }
    return months;
  })();

  useEffect(() => {
    // Restore number-style preference (shared with the homepage's settings modal).
    try {
      const ns = localStorage.getItem(NUMBER_STYLE_LS);
      if (ns) {
        const parsed = JSON.parse(ns) as NumberStyle;
        if (parsed === "western" || parsed === "devanagari") setNumberStyleState(parsed);
      }
    } catch {}
    const saved = localStorage.getItem("pramanik_panchang_data");
    if (saved) {
      try {
        const data = JSON.parse(saved) as PanchangDay[];
        setPanchangData(data);
        // Auto-select first month
        if (data.length > 0) {
          const [y, m] = data[0].date.split("-");
          setSelectedMonthKey(`${y}-${m}`);
        }
        setLoaded(true);
      } catch { setLoaded(true); }
    } else {
      setLoaded(true);
    }
    const savedImages = localStorage.getItem("pramanik_calendar_images");
    if (savedImages) {
      try { setMonthImages(JSON.parse(savedImages)); } catch {}
    }
  }, []);

  function handleImageUpload(monthKey: string, file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const updated = { ...monthImages, [monthKey]: url };
      setMonthImages(updated);
      localStorage.setItem("pramanik_calendar_images", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  }

  function removeImage(monthKey: string) {
    const updated = { ...monthImages };
    delete updated[monthKey];
    setMonthImages(updated);
    localStorage.setItem("pramanik_calendar_images", JSON.stringify(updated));
  }

  const selectedEntry = availableMonths.find((m) => m.key === selectedMonthKey);
  const monthDays = panchangData.filter((d) => {
    const [y, m] = d.date.split("-");
    return `${y}-${m}` === selectedMonthKey;
  });

  // Build weeks grid
  const weeks: (PanchangDay | null)[][] = [];
  if (monthDays.length > 0) {
    const firstDate = new Date(monthDays[0].date);
    const startDay = firstDate.getDay();
    let currentWeek: (PanchangDay | null)[] = [];
    for (let i = 0; i < startDay; i++) currentWeek.push(null);
    for (const day of monthDays) {
      currentWeek.push(day);
      if (currentWeek.length === 7) { weeks.push(currentWeek); currentWeek = []; }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }
  }

  if (!loaded) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" /></div>;
  }

  if (panchangData.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-orange-500 mb-2">No Panchang Data</h2>
        <p className="text-gray-400 mb-4">Generate panchang data first from the Generate page.</p>
        <a href="/generate" className="rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">Go to Generator</a>
      </div>
    );
  }

  const currentTypeInfo = CALENDAR_TYPES.find((t) => t.key === calendarType)!;
  const isLandscape = calendarType === "table";
  const hasImage = showImages && monthImages[selectedMonthKey];

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      {/* ── Screen Controls (hidden in print) ── */}
      <div className="no-print space-y-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-orange-500">Print Calendar</h1>
            <p className="mt-1 text-sm text-gray-400">Configure and print monthly calendars</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-gray-700 bg-gray-900 p-1 text-xs">
              <button
                onClick={() => setNumberStyle("western")}
                className={`rounded px-2.5 py-1 ${numberStyle === "western" ? "bg-orange-600 text-white" : "text-gray-300 hover:text-orange-400"}`}
                title="Western digits 1, 2, 3"
              >
                123
              </button>
              <button
                onClick={() => setNumberStyle("devanagari")}
                className={`rounded px-2.5 py-1 ${numberStyle === "devanagari" ? "bg-orange-600 text-white" : "text-gray-300 hover:text-orange-400"}`}
                title="Devanagari digits १, २, ३"
              >
                १२३
              </button>
            </div>
            <button onClick={() => window.print()} className="rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Calendar Type */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Calendar Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CALENDAR_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setCalendarType(t.key)}
                className={`rounded-lg border p-3 text-left ${
                  calendarType === t.key ? "border-orange-500 bg-orange-500/10" : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className={`text-sm font-semibold ${calendarType === t.key ? "text-orange-400" : "text-gray-300"}`}>{t.label}</div>
                <div className="text-[10px] text-gray-500 mt-1">{t.desc}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">Paper: {t.size}</div>
                <div className="text-[10px] text-gray-600">Image: {t.imageSize}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Toggle */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-300">Calendar Images</h3>
              <p className="text-xs text-gray-500">Add images for each month (shown on top of calendar)</p>
            </div>
            <button
              onClick={() => setShowImages(!showImages)}
              className={`h-6 w-11 rounded-full transition-colors ${showImages ? "bg-green-500" : "bg-gray-600"}`}
            >
              <div className={`h-5 w-5 rounded-full bg-white transition-transform ${showImages ? "translate-x-5.5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {showImages && (
            <div className="mb-3 rounded-lg bg-gray-800 px-3 py-2 text-xs">
              <span className="text-orange-400 font-semibold">Recommended image size for {currentTypeInfo.label}:</span>{" "}
              <span className="text-gray-300">{currentTypeInfo.imageSize} ({currentTypeInfo.imageRatio})</span>
              <span className="text-gray-500 ml-2">— Use landscape images. Images will be scaled to fit width.</span>
            </div>
          )}
          {showImages && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {availableMonths.map((m) => (
                <div key={m.key} className="text-center">
                  <div className="text-[10px] text-gray-400 mb-1">{m.label}</div>
                  {monthImages[m.key] ? (
                    <div className="relative">
                      <img src={monthImages[m.key]} alt={m.label} className="w-full h-16 object-cover rounded border border-gray-700" />
                      <button
                        onClick={() => removeImage(m.key)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
                      >×</button>
                    </div>
                  ) : (
                    <label className="block w-full h-16 rounded border border-dashed border-gray-700 flex items-center justify-center cursor-pointer hover:border-orange-500 text-[10px] text-gray-500">
                      + Add
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(m.key, file);
                        }}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Month Selector */}
        <div className="flex gap-2 flex-wrap">
          {availableMonths.map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedMonthKey(m.key)}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                selectedMonthKey === m.key ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Printable Calendar ── */}
      <div ref={printRef} className="print-area">
        <div className={`calendar-page cal-type-${calendarType}`}>

          {/* Image (if enabled) */}
          {hasImage && (
            <div className="cal-image">
              <img src={monthImages[selectedMonthKey]} alt={selectedEntry?.label || ""} />
            </div>
          )}

          {/* Calendar section — pushed to bottom */}
          <div className="cal-table-wrapper">
          {/* Header */}
          <div className="cal-header">
            <div className="cal-title">
              <span className="cal-title-hi">प्रमाणिक पंचांग</span>
              <span className="cal-title-year">वीर नि.सं. {fmtNum(monthDays[0]?.vnsYear) || ""} — {fmtNum(selectedEntry?.year) || ""}</span>
            </div>
            <div className="cal-month">
              {selectedEntry ? `${selectedEntry.labelHi} / ${selectedEntry.label}` : ""}
            </div>
          </div>

          {/* Calendar Grid */}
          <table className="cal-table">
            <thead>
              <tr>
                {DAYS_HI.map((d, i) => (
                  <th key={d} className={`cal-day-header ${i === 0 ? "cal-sunday" : ""}`}>
                    <div>{d}</div>
                    <div className="cal-day-en">{DAYS_EN[i]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, wi) => (
                <tr key={wi}>
                  {week.map((day, di) => (
                    <td
                      key={di}
                      className={`cal-cell ${!day ? "cal-empty" : ""} ${di === 0 ? "cal-sunday" : ""} ${day?.todayEvents.length ? "cal-event-day" : ""} ${!day?.isVriddhiRepeat && (day?.tithi.number === 8 || day?.tithi.number === 14 || day?.kshayaTithi?.number === 8 || day?.kshayaTithi?.number === 14) ? "cal-vrat" : ""}`}
                    >
                      {day && (
                        <>
                          <div className="cal-date">{fmtNum(parseInt(day.date.split("-")[2]))}</div>
                          <div className="cal-tithi">
                            {day.tithi.nameHi}
                            {day.kshayaTithi && <span className="cal-kshaya"> +{day.kshayaTithi.nameHi}</span>}
                            {day.isVriddhiRepeat && <span className="cal-vriddhi"> (वृ)</span>}
                          </div>
                          <div className="cal-paksha">
                            {day.tithi.pakshaHi === "शुक्ल पक्ष" ? "शु" : "कृ"} {fmtNum(day.tithi.number)} · {day.hinduMonth.hi}
                          </div>
                          {day.todayEvents.length > 0 && (
                            <div className="cal-events">
                              {day.todayEvents.map((evt) => {
                                const name = evt.nameHi.replace(/^भगवान\s+/, "");
                                const isMoksha = evt.eventId.endsWith("-moksha");
                                const color = isMoksha ? "#8B0000" : "#E8730A";
                                return (
                                  <div key={evt.eventId} className={`cal-event-name ${isMoksha ? "cal-moksha" : ""}`} style={{ color }}>
                                    {name.length > 30 ? name.slice(0, 28) + "…" : name}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="cal-footer">
            प्रमाणिक समूह · munipramansagar.net · gunayatan.com · {BRAND.shortEn} {fmtNum(selectedEntry?.year) || ""}
          </div>
          </div>{/* end cal-table-wrapper */}
        </div>
      </div>

      {/* ── Styles ── */}
      <style jsx global>{`
        /* ═══ Print Rules ═══ */
        @media print {
          body { background: white !important; color: black !important; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          nav { display: none !important; }
          main { padding: 0 !important; max-width: 100% !important; }
          .print-area { display: block !important; }
        }

        /* ═══ Common ═══ */
        .calendar-page {
          background: white;
          color: #1a1a1a;
          padding: 20px;
          padding-top: 40px; /* margin for pin hole / spiral binding */
          border-radius: 12px;
          font-family: 'Segoe UI', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .cal-image {
          width: 100%;
          overflow: hidden;
          border-radius: 8px 8px 0 0;
          margin-bottom: 8px;
          background: #f5f0e8;
          flex-shrink: 0;
        }

        .cal-table-wrapper {
          margin-top: auto; /* push calendar to bottom */
        }
        .cal-image img {
          width: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        .cal-header {
          text-align: center;
          margin-bottom: 12px;
          border-bottom: 3px solid #E8730A;
          padding-bottom: 8px;
        }
        .cal-title {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2px;
        }
        .cal-title-hi { font-size: 1.3rem; font-weight: 700; color: #E8730A; }
        .cal-title-year { font-size: 0.8rem; color: #666; }
        .cal-month { font-size: 1.5rem; font-weight: 700; color: #333; }

        .cal-table { width: 100%; border-collapse: collapse; table-layout: fixed; }

        .cal-day-header {
          background: #E8730A; color: white;
          padding: 6px 3px; text-align: center;
          font-size: 0.8rem; font-weight: 600;
        }
        .cal-day-header.cal-sunday { background: #C0392B; }
        .cal-day-en { font-size: 0.6rem; font-weight: 400; opacity: 0.85; }

        .cal-cell {
          border: 1px solid #ddd; padding: 3px 4px;
          vertical-align: top; font-size: 0.65rem;
        }
        .cal-cell.cal-empty { background: #f9f9f9; }
        .cal-cell.cal-sunday { background: #fff5f5; }
        .cal-cell.cal-event-day { background: #fffbeb; border-color: #E8730A; }
        .cal-cell.cal-vrat { background: #f0fdf4; border-left: 3px solid #22C55E; }
        .cal-cell.cal-vrat.cal-event-day { background: #f0fdf4; }

        .cal-date { font-size: 1rem; font-weight: 700; color: #333; line-height: 1; }
        .cal-sunday .cal-date { color: #C0392B; }
        .cal-tithi { font-size: 0.65rem; color: #555; margin-top: 1px; font-weight: 500; }
        .cal-kshaya { color: #D97706; font-size: 0.55rem; }
        .cal-vriddhi { color: #3B82F6; font-size: 0.55rem; }
        .cal-paksha { font-size: 0.55rem; color: #888; }
        .cal-events { margin-top: 1px; }
        .cal-event-name {
          font-size: 0.5rem; font-weight: 600;
          line-height: 1.15; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .cal-event-name.cal-moksha { font-weight: 700; font-style: italic; }
        .cal-footer {
          text-align: center; margin-top: 8px; padding-top: 6px;
          border-top: 1px solid #ddd; font-size: 0.65rem; color: #999;
        }

        /* ═══ Wall Calendar (A3 Portrait — image top, calendar bottom) ═══ */
        .cal-type-wall .cal-image { height: 380px; }
        .cal-type-wall .cal-image img { height: 380px; }
        .cal-type-wall .cal-cell { height: 75px; }
        .cal-type-wall { padding-top: 50px; } /* extra space for spiral/pin */
        @media print {
          .cal-type-wall { padding: 10px; padding-top: 45px; min-height: 100vh; }
          .cal-type-wall .cal-image { height: 360px; }
          @page { size: A3 portrait; margin: 8mm; }
        }

        /* ═══ Table Calendar (A5 Landscape — compact, tent-fold) ═══ */
        .cal-type-table .cal-image { height: 180px; }
        .cal-type-table .cal-image img { height: 180px; }
        .cal-type-table .cal-cell { height: 55px; padding: 2px 3px; }
        .cal-type-table .cal-date { font-size: 0.85rem; }
        .cal-type-table .cal-tithi { font-size: 0.55rem; }
        .cal-type-table .cal-paksha { font-size: 0.5rem; }
        .cal-type-table .cal-event-name { font-size: 0.45rem; }
        .cal-type-table .cal-header { margin-bottom: 6px; padding-bottom: 4px; }
        .cal-type-table .cal-title-hi { font-size: 1rem; }
        .cal-type-table .cal-month { font-size: 1.1rem; }
        .cal-type-table .cal-footer { font-size: 0.5rem; margin-top: 4px; }
        @media print {
          .cal-type-table { padding: 6px; }
          @page { size: A5 landscape; margin: 5mm; }
        }

        /* ═══ A4 Calendar (no image, large fonts, full page stretched) ═══ */
        .cal-type-a4 .cal-image { display: none; }
        .cal-type-a4 .cal-table-wrapper { margin-top: 0; flex: 1; display: flex; flex-direction: column; }
        .cal-type-a4 .cal-table { flex: 1; display: flex; flex-direction: column; }
        .cal-type-a4 .cal-table thead { flex-shrink: 0; }
        .cal-type-a4 .cal-table tbody { flex: 1; display: flex; flex-direction: column; }
        .cal-type-a4 .cal-table tbody tr { flex: 1; display: flex; }
        .cal-type-a4 .cal-table tbody tr td { flex: 1; }
        .cal-type-a4 .cal-table thead tr { display: flex; }
        .cal-type-a4 .cal-table thead tr th { flex: 1; }
        .cal-type-a4 { padding: 12px; padding-top: 10px; height: 100vh; }
        .cal-type-a4 .cal-date { font-size: 1.6rem; font-weight: 800; }
        .cal-type-a4 .cal-tithi { font-size: 0.85rem; }
        .cal-type-a4 .cal-paksha { font-size: 0.7rem; }
        .cal-type-a4 .cal-event-name { font-size: 0.65rem; }
        .cal-type-a4 .cal-day-header { padding: 8px 4px; font-size: 0.9rem; }
        .cal-type-a4 .cal-day-en { font-size: 0.7rem; }
        .cal-type-a4 .cal-title-hi { font-size: 1.6rem; }
        .cal-type-a4 .cal-month { font-size: 1.8rem; }
        .cal-type-a4 .cal-header { margin-bottom: 8px; flex-shrink: 0; }
        .cal-type-a4 .cal-footer { flex-shrink: 0; }
        .cal-type-a4 .cal-cell { padding: 5px 6px; }
        .cal-type-a4 .cal-kshaya { font-size: 0.65rem; }
        .cal-type-a4 .cal-vriddhi { font-size: 0.65rem; }
        @media print {
          .cal-type-a4 { padding: 6px; height: 100vh; }
          @page { size: A4 portrait; margin: 6mm; }
        }

        /* ═══ A4 with Image ═══ */
        .cal-type-a4img .cal-image { height: 280px; }
        .cal-type-a4img .cal-image img { height: 280px; }
        .cal-type-a4img .cal-cell { height: 60px; padding: 3px 4px; }
        .cal-type-a4img .cal-date { font-size: 1rem; }
        .cal-type-a4img .cal-tithi { font-size: 0.6rem; }
        .cal-type-a4img .cal-paksha { font-size: 0.5rem; }
        .cal-type-a4img .cal-event-name { font-size: 0.45rem; }
        .cal-type-a4img .cal-header { margin-bottom: 6px; padding-bottom: 4px; }
        .cal-type-a4img .cal-title-hi { font-size: 1.1rem; }
        .cal-type-a4img .cal-month { font-size: 1.2rem; }
        .cal-type-a4img .cal-footer { font-size: 0.5rem; margin-top: 4px; }
        @media print {
          .cal-type-a4img { padding: 8px; }
          .cal-type-a4img .cal-image { height: 260px; }
          @page { size: A4 portrait; margin: 6mm; }
        }

        /* ═══ A3 Poster (Large — image + calendar) ═══ */
        .cal-type-a3 .cal-image { height: 350px; }
        .cal-type-a3 .cal-image img { height: 350px; }
        .cal-type-a3 .cal-cell { height: 85px; }
        .cal-type-a3 .cal-date { font-size: 1.2rem; }
        .cal-type-a3 .cal-title-hi { font-size: 1.6rem; }
        .cal-type-a3 .cal-month { font-size: 1.8rem; }
        .cal-type-a3 { padding-top: 50px; }
        @media print {
          .cal-type-a3 { padding: 12px; padding-top: 45px; min-height: 100vh; }
          @page { size: A3 portrait; margin: 8mm; }
        }

        /* ═══ Screen preview border ═══ */
        @media screen {
          .calendar-page { border: 1px solid #374151; }
        }
      `}</style>
    </div>
  );
}
