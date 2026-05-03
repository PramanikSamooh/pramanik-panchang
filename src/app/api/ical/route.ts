// /api/ical?date=YYYY-MM-DD&days=N&lat=..&lng=..&tz=..
//
// Emits an RFC 5545 .ics file containing:
//   - VEVENT (all-day) for each Jain event on the day(s) — kalyanaks, parvas, vrats,
//     national holidays, etc.
//   - VEVENT (timed) for the day's auspicious & inauspicious windows so users can see
//     them inline in their calendar app — Abhijit, Brahma, Rahu Kalam, Yamganda,
//     Gulika, Dur-Muhurta, plus Bhadra periods.
//
// Default: single day (date param), Ujjain location. Range up to 31 days.

import { NextRequest, NextResponse } from "next/server";
import type { LocationConfig } from "@/lib/sweph-engine";
import type { PanchangDay } from "@/lib/types";
import { BRAND } from "@/lib/branding";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LOC: LocationConfig & { name: string } = {
  name: "Ujjain",
  lat: 23.1765,
  lng: 75.7885,
  tz: 330,
};

function parseDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const dt = new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]));
  return isNaN(dt.getTime()) ? null : dt;
}

/** Escape a string for use in an iCalendar TEXT value (RFC 5545 §3.3.11). */
function icsEscape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Fold a long iCal line at 75 octets (RFC 5545 §3.1). */
function fold(line: string): string {
  const limit = 73; // leave room for CRLF + leading space on continuation
  if (line.length <= 75) return line;
  let out = line.slice(0, limit);
  let rest = line.slice(limit);
  while (rest.length > limit) {
    out += "\r\n " + rest.slice(0, limit);
    rest = rest.slice(limit);
  }
  if (rest.length) out += "\r\n " + rest;
  return out;
}

/** "YYYY-MM-DD" → "YYYYMMDD" for VALUE=DATE. */
function dateOnly(s: string): string {
  return s.replace(/-/g, "");
}

/** Local "YYYY-MM-DD" + "HH:MM" + tz-offset-minutes → "YYYYMMDDTHHMMSS" + UTC offset → UTC time string.
 *  Returns the UTC timestamp in iCal "YYYYMMDDTHHMMSSZ" form so calendar apps render it correctly
 *  in any user's timezone. */
function localToUtcStamp(dateStr: string, hhmm: string, tzOffsetMinutes: number): string {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return "";
  const [y, mo, d] = dateStr.split("-").map(Number);
  const localMs = Date.UTC(y, mo - 1, d, parseInt(m[1]), parseInt(m[2])) - tzOffsetMinutes * 60 * 1000;
  const u = new Date(localMs);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${u.getUTCFullYear()}${pad(u.getUTCMonth() + 1)}${pad(u.getUTCDate())}T${pad(u.getUTCHours())}${pad(u.getUTCMinutes())}00Z`;
}

interface VEvent {
  uid: string;
  dtstart: string;       // either YYYYMMDD (all-day) or YYYYMMDDTHHMMSSZ (timed)
  dtend: string;
  isAllDay: boolean;
  summary: string;
  description?: string;
  category?: string;
}

function eventToVEventLines(e: VEvent): string[] {
  const lines: string[] = ["BEGIN:VEVENT"];
  lines.push(`UID:${e.uid}`);
  if (e.isAllDay) {
    lines.push(`DTSTART;VALUE=DATE:${e.dtstart}`);
    lines.push(`DTEND;VALUE=DATE:${e.dtend}`);
  } else {
    lines.push(`DTSTART:${e.dtstart}`);
    lines.push(`DTEND:${e.dtend}`);
  }
  lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`);
  lines.push(fold(`SUMMARY:${icsEscape(e.summary)}`));
  if (e.description) lines.push(fold(`DESCRIPTION:${icsEscape(e.description)}`));
  if (e.category) lines.push(`CATEGORIES:${icsEscape(e.category)}`);
  lines.push("END:VEVENT");
  return lines;
}

/** Add 1 day to a YYYYMMDD string (used for all-day DTEND, which is exclusive in iCal). */
function addOneDay(yyyymmdd: string): string {
  const y = parseInt(yyyymmdd.slice(0, 4));
  const mo = parseInt(yyyymmdd.slice(4, 6));
  const d = parseInt(yyyymmdd.slice(6, 8));
  const next = new Date(y, mo - 1, d + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}`;
}

function buildVEvents(day: PanchangDay, tz: number): VEvent[] {
  const out: VEvent[] = [];
  const dateOnlyStr = dateOnly(day.date);
  const dtendAllDay = addOneDay(dateOnlyStr);

  // Jain events (kalyanaks, parvas, vrats, national, etc.)
  for (const e of day.todayEvents) {
    out.push({
      uid: `${e.eventId}-${day.date}@panchang.gunayatan.org`,
      dtstart: dateOnlyStr,
      dtend: dtendAllDay,
      isAllDay: true,
      summary: `${e.nameHi} · ${e.nameEn}`,
      description: `${BRAND.shortHi} / ${BRAND.shortEn} — ${e.category}`,
      category: e.category,
    });
  }

  // Auspicious time-bounded windows
  const M = day.muhurtas;
  const E = day.extraMuhurtas;
  const addTimed = (key: string, hi: string, en: string, range?: { start: string; end: string }, category = "muhurt") => {
    if (!range || !range.start || !range.end) return;
    const s = localToUtcStamp(day.date, range.start, tz);
    const e = localToUtcStamp(day.date, range.end, tz);
    if (!s || !e) return;
    out.push({
      uid: `${key}-${day.date}@panchang.gunayatan.org`,
      dtstart: s, dtend: e, isAllDay: false,
      summary: `${hi} · ${en}`,
      category,
    });
  };
  addTimed("abhijit", "अभिजित मुहूर्त", "Abhijit Muhurta", M?.abhijit, "muhurt-shubh");
  addTimed("brahma",  "ब्रह्म मुहूर्त", "Brahma Muhurta", M?.brahmaMuhurta, "muhurt-shubh");
  addTimed("vijaya",  "विजय मुहूर्त",   "Vijaya Muhurta", E?.vijaya, "muhurt-shubh");
  addTimed("godhuli", "गोधूलि",         "Godhuli",        E?.godhuli, "muhurt-shubh");
  addTimed("nishita", "निशीथ काल",      "Nishita Kaal",   E?.nishitaKaal, "muhurt-shubh");

  // Inauspicious time-bounded windows
  addTimed("rahu",    "राहु काल",       "Rahu Kalam",     M?.rahuKalam, "muhurt-ashubh");
  addTimed("yamganda","यमगण्ड",          "Yamaganda",      M?.yamganda, "muhurt-ashubh");
  addTimed("gulika",  "गुलिक काल",      "Gulika Kalam",   M?.gulikaKalam, "muhurt-ashubh");

  // Dur-muhurta slots
  if (day.durMuhurta) {
    day.durMuhurta.forEach((d, i) => {
      addTimed(`dur-${i + 1}`, d.nameHi || "दुर्मुहूर्त", d.nameEn || "Dur-Muhurta", { start: d.start, end: d.end }, "muhurt-ashubh");
    });
  }

  // Bhadra periods
  if (day.bhadra?.active && day.bhadra.periods) {
    day.bhadra.periods.forEach((p, i) => {
      const partLabelHi = p.part === "mukh" ? " (मुख)" : p.part === "madhya" ? " (मध्य)" : p.part === "puchchha" ? " (पुच्छ)" : "";
      const partLabelEn = p.part === "mukh" ? " (mukh)" : p.part === "madhya" ? " (madhya)" : p.part === "puchchha" ? " (puchchha)" : "";
      addTimed(`bhadra-${i + 1}`, `भद्रा${partLabelHi}`, `Bhadra${partLabelEn}`, { start: p.startTime, end: p.endTime }, "muhurt-ashubh");
    });
  }

  return out;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const dateParam = url.searchParams.get("date");
    if (!dateParam) {
      return NextResponse.json({ error: "Missing 'date' query param (YYYY-MM-DD)" }, { status: 400 });
    }
    const dt = parseDate(dateParam);
    if (!dt) return NextResponse.json({ error: "Invalid date format; use YYYY-MM-DD" }, { status: 400 });

    const days = Math.max(1, Math.min(31, parseInt(url.searchParams.get("days") || "1") || 1));
    const lat = parseFloat(url.searchParams.get("lat") || String(DEFAULT_LOC.lat));
    const lng = parseFloat(url.searchParams.get("lng") || String(DEFAULT_LOC.lng));
    const tz = parseInt(url.searchParams.get("tz") || String(DEFAULT_LOC.tz));
    const loc: LocationConfig = { lat, lng, tz };

    // Lazy-load engine + events (mirrors /api/panchang error handling).
    const [{ generatePanchang }, { getAllJainEvents }] = await Promise.all([
      import("@/lib/sweph-engine"),
      import("@/data/jain-events"),
    ]);

    const allEvents = getAllJainEvents();
    const generated = generatePanchang({
      startDate: dt,
      totalDays: days,
      events: allEvents,
      location: loc,
    });

    const lines: string[] = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//Pramanik Group//${BRAND.longEn}//EN`,
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:${icsEscape(`${BRAND.shortEn} — ${dateParam}${days > 1 ? ` (+${days - 1}d)` : ""}`)}`,
      `X-WR-CALDESC:${icsEscape("Jain Digambara panchang — events, muhurtas, choghadiya")}`,
    ];

    for (const day of generated) {
      const vevents = buildVEvents(day, tz);
      for (const v of vevents) {
        lines.push(...eventToVEventLines(v));
      }
    }

    lines.push("END:VCALENDAR");
    const body = lines.join("\r\n") + "\r\n";

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="panchang-${dateParam}.ics"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[/api/ical] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
