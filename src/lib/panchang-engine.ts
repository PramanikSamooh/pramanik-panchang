import { HINDU_MONTHS, TITHI_NAMES_HI, TITHI_NAMES_EN, getTithi15Name, type JainEvent } from "@/data/jain-events";
import type { PanchangDay, EventSummary, UpcomingEvent } from "./types";

const VARA_HI = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
const VARA_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatTime(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
}

function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Generate panchang data for an entire year using @ishubhamx/panchangam-js.
 * Uses the Jain reckoning: tithi active at sunrise + 6 ghati (144 minutes).
 */
const SIX_GHATI_MS = 144 * 60 * 1000;

export interface LocationConfig {
  lat: number;
  lng: number;
  tz: number; // timezone offset in minutes (IST = 330)
}

/**
 * Generate panchang for a date range (startMonth/startYear to endMonth/endYear).
 * Months are 0-indexed (0=Jan, 11=Dec). Can span across years (e.g., May 2026 to April 2027).
 */
export async function generateRangePanchang(
  startMonth: number, startYear: number,
  endMonth: number, endYear: number,
  events: JainEvent[],
  location: LocationConfig = { lat: 23.1765, lng: 75.7885, tz: 330 },
  onProgress?: (done: number, total: number) => void
): Promise<PanchangDay[]> {
  const startDate = new Date(startYear, startMonth, 1);
  const endDate = new Date(endYear, endMonth + 1, 0); // last day of end month
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000) + 1;

  return generatePanchangForRange(startDate, totalDays, events, location, onProgress);
}

export async function generateYearPanchang(
  year: number,
  events: JainEvent[],
  location: LocationConfig = { lat: 23.1765, lng: 75.7885, tz: 330 },
  onProgress?: (done: number, total: number) => void
): Promise<PanchangDay[]> {
  const startDate = new Date(year, 0, 1);
  const totalDays = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;

  return generatePanchangForRange(startDate, totalDays, events, location, onProgress);
}

async function generatePanchangForRange(
  startDate: Date,
  totalDays: number,
  events: JainEvent[],
  location: LocationConfig,
  onProgress?: (done: number, total: number) => void
): Promise<PanchangDay[]> {
  const { getPanchangam, getUdayaTithiInfo } = await import("@ishubhamx/panchangam-js");
  const { Observer } = await import("@ishubhamx/panchangam-js");

  const observer = new Observer(location.lat, location.lng, 0);
  const activeEvents = events.filter((e) => e.isActive);
  let diwaliDate: Date | null = null;
  const allDays: PanchangDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const dateStr = formatDateStr(date);
    const dayOfWeek = date.getDay();

    let pResult;
    try {
      pResult = getPanchangam(date, observer, { timezoneOffset: location.tz });
    } catch (e) {
      console.error(`Error computing panchang for ${dateStr}:`, e);
      continue;
    }

    // Jain reckoning: tithi active at sunrise + 6 ghati (144 min) — returns 1-30
    let udayaTithi = 1;
    let udayaPaksha = "Shukla";
    let tithiStart: Date | null = null;
    let tithiEnd: Date | null = null;

    if (pResult.sunrise) {
      try {
        const jainRef = new Date(pResult.sunrise.getTime() + SIX_GHATI_MS);
        const udaya = getUdayaTithiInfo(date, jainRef, observer);
        udayaTithi = udaya.tithi; // 1-30 (1-15 Shukla, 16-30 Krishna)
        udayaPaksha = udaya.paksha?.includes("Shukla") ? "Shukla" : "Krishna";
        tithiStart = udaya.tithiStart;
        tithiEnd = udaya.tithiEnd;
      } catch {
        // Fallback to raw tithi + 1
        udayaTithi = pResult.tithi + 1;
        udayaPaksha = pResult.paksha?.includes("Shukla") ? "Shukla" : "Krishna";
        tithiStart = pResult.tithiStartTime;
        tithiEnd = pResult.tithiEndTime;
      }
    } else {
      udayaTithi = pResult.tithi + 1;
      udayaPaksha = pResult.paksha?.includes("Shukla") ? "Shukla" : "Krishna";
      tithiStart = pResult.tithiStartTime;
      tithiEnd = pResult.tithiEndTime;
    }

    // Convert absolute tithi (1-30) to within-paksha (1-15)
    const paksha: "Shukla" | "Krishna" = udayaPaksha === "Shukla" ? "Shukla" : "Krishna";
    const tithiInPaksha = paksha === "Shukla" ? udayaTithi : udayaTithi - 15;
    const tithiIdx = Math.min(Math.max(tithiInPaksha - 1, 0), 14);
    // 15th tithi: Purnima (Shukla) or Amavasya (Krishna)
    const tithi15 = tithiInPaksha === 15 ? getTithi15Name(paksha) : null;

    // Hindu month from masa
    const masaName = pResult.masa?.name || "Unknown";
    const hinduMonthEn = masaName;
    const hinduMonthHi = HINDU_MONTHS.find((m) => m.en === hinduMonthEn)?.hi || masaName;

    // Detect Diwali (Kartik Krishna Amavasya = tithi 30 or Krishna 15)
    if (hinduMonthEn === "Kartik" && paksha === "Krishna" && tithiInPaksha >= 14) {
      if (!diwaliDate) diwaliDate = date;
    }

    // Match events (tithi rules + Gregorian overrides)
    const todayEvents = matchEventsForDate(dateStr, date.getFullYear(), hinduMonthEn, paksha, tithiInPaksha, activeEvents);

    // VNS date string
    const pakshaLabelHi = paksha === "Shukla" ? "शुक्ल" : "कृष्ण";
    const vnsDateHi = `${hinduMonthHi} ${pakshaLabelHi} ${tithiInPaksha}`;

    allDays.push({
      date: dateStr,
      vnsYear: 0, // Filled after Diwali found
      vnsDateHi,
      varaHi: VARA_HI[dayOfWeek],
      varaEn: VARA_EN[dayOfWeek],
      tithi: {
        number: tithiInPaksha,
        nameHi: tithi15 ? tithi15.hi : (TITHI_NAMES_HI[tithiIdx] || `तिथि ${tithiInPaksha}`),
        nameEn: tithi15 ? tithi15.en : (TITHI_NAMES_EN[tithiIdx] || `Tithi ${tithiInPaksha}`),
        pakshaHi: paksha === "Shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष",
        pakshaEn: paksha === "Shukla" ? "Shukla Paksha" : "Krishna Paksha",
        startTime: formatTime(tithiStart),
        endTime: formatTime(tithiEnd),
      },
      hinduMonth: { hi: hinduMonthHi, en: hinduMonthEn },
      todayEvents,
      upcomingEvents: [],
    });

    onProgress?.(i + 1, totalDays);
  }

  // Detect kshaya (skipped) tithis and merge their events into the previous day
  for (let i = 1; i < allDays.length; i++) {
    const prev = allDays[i - 1];
    const curr = allDays[i];
    // Same paksha, same month — check if a tithi was skipped
    if (prev.hinduMonth.en === curr.hinduMonth.en &&
        prev.tithi.pakshaEn === curr.tithi.pakshaEn) {
      const gap = curr.tithi.number - prev.tithi.number;
      if (gap === 2) {
        // One tithi skipped (kshaya)
        const skippedNum = prev.tithi.number + 1;
        const skippedIdx = Math.min(Math.max(skippedNum - 1, 0), 14);
        const skipped15 = skippedNum === 15 ? getTithi15Name(prev.tithi.pakshaEn.includes("Shukla") ? "Shukla" : "Krishna") : null;
        const skippedNameHi = skipped15 ? skipped15.hi : (TITHI_NAMES_HI[skippedIdx] || `तिथि ${skippedNum}`);
        const skippedNameEn = skipped15 ? skipped15.en : (TITHI_NAMES_EN[skippedIdx] || `Tithi ${skippedNum}`);

        // Mark kshaya on the previous day
        allDays[i - 1].kshayaTithi = {
          number: skippedNum,
          nameHi: skippedNameHi,
          nameEn: skippedNameEn,
        };

        // Match events for the skipped tithi and merge into previous day
        const paksha = prev.tithi.pakshaEn.includes("Shukla") ? "Shukla" : "Krishna";
        const skippedEvents = matchEventsForDate(prev.date, new Date(prev.date).getFullYear(), prev.hinduMonth.en, paksha, skippedNum, activeEvents);
        if (skippedEvents.length > 0) {
          allDays[i - 1].todayEvents = [...allDays[i - 1].todayEvents, ...skippedEvents];
        }
      }
    }
    // Detect vriddhi (repeated tithi) — same tithi on consecutive days
    if (prev.hinduMonth.en === curr.hinduMonth.en &&
        prev.tithi.pakshaEn === curr.tithi.pakshaEn &&
        prev.tithi.number === curr.tithi.number) {
      // Second day is the repeat — mark it and move its events to the first day
      allDays[i].isVriddhiRepeat = true;
      // Move any matched events from the repeat day to the first day
      if (allDays[i].todayEvents.length > 0) {
        const existingIds = new Set(allDays[i - 1].todayEvents.map(e => e.eventId));
        for (const evt of allDays[i].todayEvents) {
          if (!existingIds.has(evt.eventId)) {
            allDays[i - 1].todayEvents.push(evt);
          }
        }
        allDays[i].todayEvents = []; // Clear events from repeat day
      }
    }
  }

  // Set VNS year — handle date ranges spanning multiple years
  const approxDiwali: Record<number, string> = {
    2024: "2024-11-01", 2025: "2025-10-20", 2026: "2026-11-08", 2027: "2027-10-29",
    2028: "2028-10-17", 2029: "2029-11-05", 2030: "2030-10-26",
  };
  for (const day of allDays) {
    const d = new Date(day.date);
    const yr = d.getFullYear();
    // Use detected Diwali if in same year, else use approx
    let diwali = diwaliDate && diwaliDate.getFullYear() === yr ? diwaliDate : null;
    if (!diwali) {
      diwali = approxDiwali[yr] ? new Date(approxDiwali[yr]) : new Date(yr, 9, 25);
    }
    day.vnsYear = d >= diwali ? yr + 527 : yr + 526;
  }

  // Second pass: fill upcoming events (next 30 days)
  for (let i = 0; i < allDays.length; i++) {
    const upcoming: UpcomingEvent[] = [];
    for (let j = i + 1; j < Math.min(i + 31, allDays.length); j++) {
      for (const evt of allDays[j].todayEvents) {
        upcoming.push({
          eventId: evt.eventId,
          nameHi: evt.nameHi,
          nameEn: evt.nameEn,
          date: allDays[j].date,
        });
      }
    }
    allDays[i].upcomingEvents = upcoming;
  }

  return allDays;
}

function matchEventsForDate(
  dateStr: string,
  year: number,
  hinduMonth: string,
  paksha: string,
  tithiNumber: number,
  events: JainEvent[]
): EventSummary[] {
  const matched: EventSummary[] = [];
  const yearStr = String(year);

  for (const event of events) {
    let isMatch = false;

    // Check fixed Gregorian date (e.g., "01-26" for Republic Day)
    if (event.fixedDate && dateStr.endsWith(event.fixedDate)) {
      isMatch = true;
    }
    // Check Gregorian override (takes priority over tithi)
    else if (event.gregorianOverrides && event.gregorianOverrides[yearStr] === dateStr) {
      isMatch = true;
    }
    // Then check tithi rule
    else if (
      event.hinduMonth &&
      event.hinduMonth === hinduMonth &&
      event.hinduPaksha === paksha &&
      event.hinduTithi === tithiNumber
    ) {
      isMatch = true;
    }

    if (isMatch) {
      matched.push({
        eventId: event.id,
        nameHi: event.nameHi,
        nameEn: event.nameEn,
        category: event.category,
        colorTheme: event.colorTheme,
      });
    }
  }
  return matched;
}
