"use client";

import { useState, useCallback } from "react";
import { getAllJainEvents } from "@/data/jain-events";
import type { PanchangDay, EventSummary } from "@/lib/types";
import type { JainEventCategory } from "@/data/jain-events";

type GenMode = "year" | "range";

const CATEGORY_OPTIONS: Array<{ key: JainEventCategory; label: string; defaultOn: boolean }> = [
  { key: "panch_kalyanak", label: "Panch Kalyanak", defaultOn: true },
  { key: "jain_parv", label: "Jain Parv", defaultOn: true },
  { key: "vrat", label: "Vrat", defaultOn: true },
  { key: "national", label: "National / Government", defaultOn: true },
  { key: "acharya", label: "Acharya Darpan", defaultOn: false },
  { key: "muhurt", label: "Muhurt", defaultOn: false },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const LOCATIONS = [
  { name: "Ujjain (Standard)", lat: 23.1765, lng: 75.7885, tz: 330 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, tz: 330 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090, tz: 330 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777, tz: 330 },
  { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, tz: 660 },
  { name: "Melbourne, Australia", lat: -37.8136, lng: 144.9631, tz: 660 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278, tz: 0 },
  { name: "New York, USA", lat: 40.7128, lng: -74.0060, tz: -300 },
  { name: "Custom", lat: 0, lng: 0, tz: 330 },
];

export default function Home() {
  const [genMode, setGenMode] = useState<GenMode>("year");
  const [year, setYear] = useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState(new Date().getMonth());
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [rangeMonths, setRangeMonths] = useState(12); // how many months
  const [locationIdx, setLocationIdx] = useState(0);
  const [customLat, setCustomLat] = useState("23.1765");
  const [customLng, setCustomLng] = useState("75.7885");
  const [customTz, setCustomTz] = useState("330");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [panchangData, setPanchangData] = useState<PanchangDay[]>([]);
  const [filterMonth, setFilterMonth] = useState<number>(-1); // -1 = all
  const [filterEvents, setFilterEvents] = useState(false);
  const [search, setSearch] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [exportCategories, setExportCategories] = useState<Set<JainEventCategory>>(
    () => new Set(CATEGORY_OPTIONS.filter((c) => c.defaultOn).map((c) => c.key)),
  );

  const toggleExportCategory = (key: JainEventCategory) => {
    setExportCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Produce a copy of panchangData with events filtered to the selected categories
  const dataForExport = (): PanchangDay[] =>
    panchangData.map((d) => ({
      ...d,
      todayEvents: d.todayEvents.filter((e) =>
        exportCategories.has(e.category as JainEventCategory),
      ),
      upcomingEvents: d.upcomingEvents, // upcoming don't carry category; keep as-is
    }));

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setPanchangData([]);

    let customEvents;
    try {
      const saved = localStorage.getItem("pramanik_jain_events");
      customEvents = saved ? JSON.parse(saved) : undefined;
    } catch {
      customEvents = undefined;
    }

    const loc = LOCATIONS[locationIdx];
    const lat = loc.name === "Custom" ? parseFloat(customLat) : loc.lat;
    const lng = loc.name === "Custom" ? parseFloat(customLng) : loc.lng;
    const tz = loc.name === "Custom" ? parseInt(customTz) : loc.tz;
    const locConfig = { lat, lng, tz };

    let body: Record<string, unknown>;
    if (genMode === "range") {
      let endMonth = startMonth + rangeMonths - 1;
      let endYear = startYear;
      while (endMonth > 11) { endMonth -= 12; endYear++; }
      setProgress({ done: 0, total: rangeMonths * 30 });
      body = {
        mode: "range",
        startMonth, startYear, endMonth, endYear,
        location: locConfig,
        customEvents,
      };
    } else {
      setProgress({ done: 0, total: 365 });
      body = {
        mode: "year",
        year,
        location: locConfig,
        customEvents,
      };
    }

    let data: PanchangDay[];
    try {
      const res = await fetch("/api/panchang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        alert("Failed to generate panchang: " + (err.error ?? res.statusText));
        setGenerating(false);
        return;
      }
      const json = await res.json();
      data = (json.days ?? []) as PanchangDay[];
      setProgress({ done: data.length, total: data.length });
    } catch (e) {
      alert("Network error generating panchang: " + (e instanceof Error ? e.message : String(e)));
      setGenerating(false);
      return;
    }

    setPanchangData(data);
    localStorage.setItem("pramanik_panchang_data", JSON.stringify(data));
    setGenerating(false);
  }, [genMode, year, startMonth, startYear, rangeMonths, locationIdx, customLat, customLng, customTz]);

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(dataForExport(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `panchang-${year}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const header = "Date,Day (Hi),Day (En),VNS Year,Tithi (Hi),Tithi (En),Paksha (Hi),Hindu Month (Hi),Start Time,End Time,Events\n";
    const rows = dataForExport().map((d) =>
      `${d.date},"${d.varaHi}","${d.varaEn}",${d.vnsYear},"${d.tithi.nameHi}","${d.tithi.nameEn}","${d.tithi.pakshaHi}","${d.hinduMonth.hi}","${d.tithi.startTime}","${d.tithi.endTime}","${d.todayEvents.map((e) => e.nameEn).join("; ")}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `panchang-${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add an event to a specific day
  const addEventToDay = (dayIdx: number, event: EventSummary) => {
    setPanchangData((prev) => {
      const updated = [...prev];
      const day = { ...updated[dayIdx] };
      day.todayEvents = [...day.todayEvents, event];
      updated[dayIdx] = day;
      return updated;
    });
  };

  // Remove an event from a specific day
  const removeEventFromDay = (dayIdx: number, eventId: string) => {
    setPanchangData((prev) => {
      const updated = [...prev];
      const day = { ...updated[dayIdx] };
      day.todayEvents = day.todayEvents.filter((e) => e.eventId !== eventId);
      updated[dayIdx] = day;
      return updated;
    });
  };

  // Filter data
  const filteredData = panchangData.filter((d) => {
    const date = new Date(d.date);
    if (filterMonth >= 0 && date.getMonth() !== filterMonth) return false;
    if (filterEvents && d.todayEvents.length === 0) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        d.date.includes(s) ||
        d.varaHi.includes(s) ||
        d.tithi.nameHi.includes(s) ||
        d.tithi.nameEn.toLowerCase().includes(s) ||
        d.hinduMonth.hi.includes(s) ||
        d.hinduMonth.en.toLowerCase().includes(s) ||
        d.todayEvents.some((e) => e.nameHi.includes(s) || e.nameEn.toLowerCase().includes(s))
      );
    }
    return true;
  });

  const eventDays = panchangData.filter((d) => d.todayEvents.length > 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-orange-500">Jain Panchang Generator</h1>
        <p className="mt-1 text-sm text-gray-400">
          Compute tithi for every day of the year, auto-match Jain events, review and export.
        </p>
      </div>

      {/* Generate Controls */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
        {/* Mode Toggle */}
        <div className="flex gap-2">
          <button onClick={() => setGenMode("year")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${genMode === "year" ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-400 border border-gray-700"}`}>
            Full Year
          </button>
          <button onClick={() => setGenMode("range")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${genMode === "range" ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-400 border border-gray-700"}`}>
            Custom Range
          </button>
        </div>

        <div className="flex items-end gap-4 flex-wrap">
          {genMode === "year" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Year</label>
              <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}
                className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none">
                {[2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Start Month</label>
                <select value={startMonth} onChange={(e) => setStartMonth(parseInt(e.target.value))}
                  className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none">
                  {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Start Year</label>
                <select value={startYear} onChange={(e) => setStartYear(parseInt(e.target.value))}
                  className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none">
                  {[2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Duration</label>
                <select value={rangeMonths} onChange={(e) => setRangeMonths(parseInt(e.target.value))}
                  className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none">
                  {[1, 2, 3, 4, 6, 12].map((n) => (
                    <option key={n} value={n}>{n} month{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
              <div className="text-xs text-gray-500 pb-2">
                {MONTHS[startMonth]} {startYear} → {MONTHS[(startMonth + rangeMonths - 1) % 12]} {startYear + Math.floor((startMonth + rangeMonths - 1) / 12)}
              </div>
            </>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Location</label>
            <select value={locationIdx} onChange={(e) => setLocationIdx(parseInt(e.target.value))}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none">
              {LOCATIONS.map((loc, i) => (
                <option key={loc.name} value={i}>{loc.name}</option>
              ))}
            </select>
          </div>

          {LOCATIONS[locationIdx].name === "Custom" && (
            <div className="flex gap-2">
              <div>
                <label className="mb-1 block text-[10px] text-gray-500">Lat</label>
                <input type="text" value={customLat} onChange={(e) => setCustomLat(e.target.value)}
                  className="w-20 rounded-lg border border-gray-700 bg-gray-800 px-2 py-2.5 text-sm focus:border-orange-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-[10px] text-gray-500">Lng</label>
                <input type="text" value={customLng} onChange={(e) => setCustomLng(e.target.value)}
                  className="w-20 rounded-lg border border-gray-700 bg-gray-800 px-2 py-2.5 text-sm focus:border-orange-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-[10px] text-gray-500">TZ</label>
                <input type="text" value={customTz} onChange={(e) => setCustomTz(e.target.value)}
                  className="w-16 rounded-lg border border-gray-700 bg-gray-800 px-2 py-2.5 text-sm focus:border-orange-500 focus:outline-none" />
              </div>
            </div>
          )}

          <button onClick={handleGenerate} disabled={generating}
            className="rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50">
            {generating ? `Generating... ${progress.done}/${progress.total}` : "Generate Panchang"}
          </button>
        </div>{/* end flex items-end */}

        {generating && (
          <div className="flex-1">
            <div className="h-2 rounded-full bg-gray-800">
              <div
                className="h-2 rounded-full bg-orange-500 transition-all"
                style={{ width: `${progress.total > 0 ? (progress.done / progress.total) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {panchangData.length > 0 && !generating && (
          <div className="flex flex-col gap-3 pt-2 border-t border-gray-800">
            <div>
              <div className="text-xs text-gray-400 mb-1.5">Categories to include in export:</div>
              <div className="flex flex-wrap gap-3">
                {CATEGORY_OPTIONS.map((cat) => (
                  <label key={cat.key} className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportCategories.has(cat.key)}
                      onChange={() => toggleExportCategory(cat.key)}
                      className="accent-orange-500"
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={handleDownloadJSON}
                className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm text-gray-300 hover:border-orange-500 hover:text-orange-400"
              >
                Download JSON
              </button>
              <button
                onClick={handleDownloadCSV}
                className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm text-gray-300 hover:border-orange-500 hover:text-orange-400"
              >
                Download CSV
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      {panchangData.length > 0 && (
        <div className="flex gap-4">
          <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center">
            <div className="text-2xl font-bold text-orange-500">{panchangData.length}</div>
            <div className="text-xs text-gray-400">Total Days</div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center">
            <div className="text-2xl font-bold text-green-400">{eventDays}</div>
            <div className="text-xs text-gray-400">Event Days</div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {panchangData.reduce((sum, d) => sum + d.todayEvents.length, 0)}
            </div>
            <div className="text-xs text-gray-400">Total Event Matches</div>
          </div>
        </div>
      )}

      {/* Filters */}
      {panchangData.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(parseInt(e.target.value))}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
          >
            <option value={-1}>All Months</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={filterEvents}
              onChange={(e) => setFilterEvents(e.target.checked)}
              className="accent-orange-500"
            />
            Events only
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tithi, event, month..."
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none w-64"
          />

          <span className="text-xs text-gray-500">
            Showing {filteredData.length} of {panchangData.length} days
          </span>
        </div>
      )}

      {/* Calendar Table */}
      {panchangData.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-800 bg-gray-900">
              <tr>
                <th className="px-3 py-2.5 text-left font-medium text-gray-400 w-28">Date</th>
                <th className="px-3 py-2.5 text-left font-medium text-gray-400 w-20">Day</th>
                <th className="px-3 py-2.5 text-left font-medium text-gray-400 w-16">VNS</th>
                <th className="px-3 py-2.5 text-left font-medium text-gray-400 w-28">VNS Date</th>
                <th className="px-3 py-2.5 text-left font-medium text-gray-400">Tithi</th>
                <th className="px-3 py-2.5 text-left font-medium text-gray-400 w-24">Paksha</th>
                <th className="px-3 py-2.5 text-left font-medium text-gray-400 w-20">Month</th>
                <th className="px-3 py-2.5 text-left font-medium text-gray-400">Events</th>
                <th className="px-3 py-2.5 text-right font-medium text-gray-400 w-16">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredData.map((day) => {
                const realIdx = panchangData.indexOf(day);
                const hasEvents = day.todayEvents.length > 0;
                return (
                  <tr
                    key={day.date}
                    className={`transition-colors ${hasEvents ? "bg-orange-500/5" : "hover:bg-gray-900/50"}`}
                  >
                    <td className="px-3 py-2 font-mono text-xs">{day.date}</td>
                    <td className="px-3 py-2">
                      <div className="text-xs">{day.varaHi}</div>
                      <div className="text-xs text-gray-500">{day.varaEn}</div>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-400">{day.vnsYear}</td>
                    <td className="px-3 py-2 text-xs">{day.vnsDateHi}</td>
                    <td className="px-3 py-2">
                      <div className="text-xs font-medium">{day.tithi.nameHi}</div>
                      <div className="text-xs text-gray-500">{day.tithi.nameEn}</div>
                      {day.kshayaTithi && (
                        <div className="mt-0.5 text-[10px] text-yellow-400" title="Kshaya tithi — skipped, merged into this day">
                          + क्षय: {day.kshayaTithi.nameHi} ({day.kshayaTithi.nameEn})
                        </div>
                      )}
                      {day.isVriddhiRepeat && (
                        <div className="mt-0.5 text-[10px] text-blue-400" title="Vriddhi — repeated tithi, events on prior day">
                          वृद्धि (repeat)
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 text-xs">{day.tithi.pakshaHi}</td>
                    <td className="px-3 py-2">
                      <div className="text-xs">{day.hinduMonth.hi}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {day.todayEvents.map((evt) => (
                          <span
                            key={evt.eventId}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: `${evt.colorTheme}20`,
                              color: evt.colorTheme,
                            }}
                          >
                            {evt.nameHi}
                            <button
                              onClick={() => removeEventFromDay(realIdx, evt.eventId)}
                              className="ml-0.5 text-red-400 hover:text-red-300"
                              title="Remove event"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                        {day.todayEvents.length === 0 && (
                          <span className="text-xs text-gray-600">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => setEditingIdx(editingIdx === realIdx ? null : realIdx)}
                        className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-800 hover:text-orange-400"
                      >
                        {editingIdx === realIdx ? "Close" : "+Event"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick Add Event Panel */}
      {editingIdx !== null && panchangData[editingIdx] && (
        <QuickAddEvent
          day={panchangData[editingIdx]}
          onAdd={(event) => {
            addEventToDay(editingIdx, event);
            setEditingIdx(null);
          }}
          onClose={() => setEditingIdx(null)}
        />
      )}
    </div>
  );
}

function QuickAddEvent({
  day,
  onAdd,
  onClose,
}: {
  day: PanchangDay;
  onAdd: (event: EventSummary) => void;
  onClose: () => void;
}) {
  const allEvents = getAllJainEvents();
  const [search, setSearch] = useState("");

  const filtered = allEvents.filter((e) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return e.nameHi.includes(s) || e.nameEn.toLowerCase().includes(s);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-orange-500">Add Event to {day.date}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search event..."
          className="mb-3 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
          autoFocus
        />
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {filtered.slice(0, 50).map((e) => (
            <button
              key={e.id}
              onClick={() =>
                onAdd({
                  eventId: e.id,
                  nameHi: e.nameHi,
                  nameEn: e.nameEn,
                  category: e.category,
                  colorTheme: e.colorTheme,
                })
              }
              className="flex w-full items-center justify-between rounded-lg border border-gray-800 px-3 py-2 text-left text-sm hover:border-orange-500/50 hover:bg-gray-800"
            >
              <div>
                <div className="font-medium">{e.nameHi}</div>
                <div className="text-xs text-gray-400">{e.nameEn}</div>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{ backgroundColor: `${e.colorTheme}20`, color: e.colorTheme }}
              >
                {e.category === "panch_kalyanak" ? "PK" : "Parv"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
