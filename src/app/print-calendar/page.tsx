"use client";

import { useState, useEffect, useRef } from "react";
import type { PanchangDay } from "@/lib/types";

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

export default function PrintCalendarPage() {
  const [panchangData, setPanchangData] = useState<PanchangDay[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loaded, setLoaded] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load generated panchang from localStorage
    const saved = localStorage.getItem("pramanik_panchang_data");
    if (saved) {
      try {
        const data = JSON.parse(saved) as PanchangDay[];
        setPanchangData(data);
        if (data.length > 0) {
          setYear(parseInt(data[0].date.split("-")[0]));
        }
        setLoaded(true);
      } catch {
        setLoaded(true);
      }
    } else {
      setLoaded(true);
    }
  }, []);

  const monthDays = panchangData.filter((d) => {
    const m = parseInt(d.date.split("-")[1]) - 1;
    return m === selectedMonth;
  });

  // Build weeks grid
  const weeks: (PanchangDay | null)[][] = [];
  if (monthDays.length > 0) {
    const firstDate = new Date(monthDays[0].date);
    const startDay = firstDate.getDay(); // 0=Sun

    let currentWeek: (PanchangDay | null)[] = [];
    // Pad start
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }
    for (const day of monthDays) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    // Pad end
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
  }

  function handlePrint() {
    window.print();
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (panchangData.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-orange-500 mb-2">No Panchang Data</h2>
        <p className="text-gray-400 mb-4">Generate panchang data first from the home page, then come back here.</p>
        <a href="/" className="rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">
          Go to Generator
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Screen controls (hidden in print) */}
      <div className="no-print space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-500">Print Calendar</h1>
            <p className="mt-1 text-sm text-gray-400">Monthly calendar view — print or save as PDF</p>
          </div>
          <button
            onClick={handlePrint}
            className="rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
          >
            🖨️ Print / Save PDF
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(i)}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                selectedMonth === i
                  ? "bg-orange-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              for (let i = 0; i < 12; i++) {
                // Print all months hint
              }
              handlePrint();
            }}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:text-orange-400 hover:border-orange-500"
          >
            Print This Month
          </button>
        </div>
      </div>

      {/* Printable calendar */}
      <div ref={printRef} className="print-area">
        <div className="calendar-page">
          {/* Header */}
          <div className="cal-header">
            <div className="cal-title">
              <span className="cal-title-hi">प्रमाणिक पंचांग</span>
              <span className="cal-title-year">वीर नि.सं. {monthDays[0]?.vnsYear || year + 526} — {year}</span>
            </div>
            <div className="cal-month">
              {MONTHS_HI[selectedMonth]} / {MONTHS[selectedMonth]} {year}
            </div>
          </div>

          {/* Day headers */}
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
                          <div className="cal-date">{parseInt(day.date.split("-")[2])}</div>
                          <div className="cal-tithi">
                            {day.tithi.nameHi}
                            {day.kshayaTithi && <span className="cal-kshaya"> +{day.kshayaTithi.nameHi}</span>}
                            {day.isVriddhiRepeat && <span className="cal-vriddhi"> (वृ)</span>}
                          </div>
                          <div className="cal-paksha">
                            {day.tithi.pakshaHi === "शुक्ल पक्ष" ? "शु" : "कृ"} {day.tithi.number} · {day.hinduMonth.hi}
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
            प्रमाणिक समूह · munipramansagar.net · gunayatan.com · Pramanik Panchang {year}
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          nav { display: none !important; }
          main { padding: 0 !important; max-width: 100% !important; }
          .print-area { display: block !important; }
        }

        .calendar-page {
          background: white;
          color: #1a1a1a;
          padding: 20px;
          border-radius: 12px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .cal-header {
          text-align: center;
          margin-bottom: 16px;
          border-bottom: 3px solid #E8730A;
          padding-bottom: 12px;
        }

        .cal-title {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .cal-title-hi {
          font-size: 1.4rem;
          font-weight: 700;
          color: #E8730A;
        }

        .cal-title-year {
          font-size: 0.85rem;
          color: #666;
        }

        .cal-month {
          font-size: 1.6rem;
          font-weight: 700;
          color: #333;
        }

        .cal-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .cal-day-header {
          background: #E8730A;
          color: white;
          padding: 8px 4px;
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .cal-day-header.cal-sunday {
          background: #C0392B;
        }

        .cal-day-en {
          font-size: 0.65rem;
          font-weight: 400;
          opacity: 0.85;
        }

        .cal-cell {
          border: 1px solid #ddd;
          padding: 4px 5px;
          vertical-align: top;
          height: 95px;
          font-size: 0.7rem;
        }

        .cal-cell.cal-empty {
          background: #f9f9f9;
        }

        .cal-cell.cal-sunday {
          background: #fff5f5;
        }

        .cal-cell.cal-event-day {
          background: #fffbeb;
          border-color: #E8730A;
        }

        .cal-cell.cal-vrat {
          background: #f0fdf4;
          border-left: 3px solid #22C55E;
        }

        .cal-cell.cal-vrat.cal-event-day {
          background: #f0fdf4;
        }

        .cal-date {
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
          line-height: 1;
        }

        .cal-sunday .cal-date {
          color: #C0392B;
        }

        .cal-tithi {
          font-size: 0.7rem;
          color: #555;
          margin-top: 2px;
          font-weight: 500;
        }

        .cal-kshaya {
          color: #D97706;
          font-size: 0.6rem;
        }

        .cal-vriddhi {
          color: #3B82F6;
          font-size: 0.6rem;
        }

        .cal-paksha {
          font-size: 0.6rem;
          color: #888;
        }

        .cal-events {
          margin-top: 2px;
        }

        .cal-event-name {
          font-size: 0.55rem;
          font-weight: 600;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cal-event-name.cal-moksha {
          font-weight: 700;
          font-style: italic;
        }

        .cal-footer {
          text-align: center;
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px solid #ddd;
          font-size: 0.7rem;
          color: #999;
        }

        @media screen {
          .calendar-page {
            border: 1px solid #374151;
            background: white;
          }
        }

        @media print {
          .calendar-page {
            border: none;
            padding: 10px;
          }
          .cal-cell {
            height: 90px;
          }
        }
      `}</style>
    </>
  );
}
