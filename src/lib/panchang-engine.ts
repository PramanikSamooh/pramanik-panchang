import {
  HINDU_MONTHS, TITHI_NAMES_HI, TITHI_NAMES_EN, getTithi15Name,
  NAKSHATRA_NAMES_HI, NAKSHATRA_NAMES_EN, YOGA_NAMES_HI,
  KARANA_NAMES_HI, RITU_HI, AYANA_HI, RASHI_NAMES_HI,
  type JainEvent,
} from "@/data/jain-events";
import type { PanchangDay, EventSummary, UpcomingEvent, SpecialYogaPeriod } from "./types";

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

// Normalize library's masa.name to our canonical English month names
const MASA_ALIAS: Record<string, string> = {
  "Ashwina": "Ashwin",
  "Kartika": "Kartik",
  "Pausha": "Pausha",
  "Magha": "Magha",
};
function normalizeMasaName(name: string): string {
  return MASA_ALIAS[name] || name;
}

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
      // Jain Digambara panchang typically uses Purnimanta (month ends on Purnima), matching the
      // authoritative "तीर्थंकर वर्धमान जैन पंचांग" source. Setting explicit calendarType here so
      // the output's month labels match the Excel for cross-verification.
      pResult = getPanchangam(date, observer, { timezoneOffset: location.tz, calendarType: "purnimanta" });
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

    // Hindu month from masa (library returns "Ashwina"/"Kartika" — normalize to our canonical names)
    const rawMasaName = pResult.masa?.name || "Unknown";
    const hinduMonthEn = normalizeMasaName(rawMasaName);
    const hinduMonthHi = HINDU_MONTHS.find((m) => m.en === hinduMonthEn)?.hi || hinduMonthEn;
    const masaIsAdhika = !!pResult.masa?.isAdhika;

    // Detect Diwali (Kartik Krishna Amavasya = tithi 30 or Krishna 15)
    if (hinduMonthEn === "Kartik" && paksha === "Krishna" && tithiInPaksha >= 14) {
      if (!diwaliDate) diwaliDate = date;
    }

    // Nakshatra (library nakshatra is 0-indexed)
    const nakshatraIdx = Math.min(Math.max(pResult.nakshatra ?? 0, 0), 26);
    const nakshatraNumber = nakshatraIdx + 1; // 1..27

    // Match events (tithi rules + Gregorian overrides + nakshatra + adhika-maas policy)
    const todayEvents = matchEventsForDate(
      dateStr, date.getFullYear(), hinduMonthEn, paksha, tithiInPaksha,
      nakshatraNumber, masaIsAdhika, activeEvents
    );

    // VNS date string (append adhika/nija label if applicable)
    const pakshaLabelHi = paksha === "Shukla" ? "शुक्ल" : "कृष्ण";
    const adhikaSuffixHi = masaIsAdhika ? " (अधिक)" : "";
    const vnsDateHi = `${hinduMonthHi}${adhikaSuffixHi} ${pakshaLabelHi} ${tithiInPaksha}`;

    // Yoga / karana
    const yogaIdx = Math.min(Math.max(pResult.yoga ?? 0, 0), 26);
    const yogaNameEn = [
      "Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda",
      "Sukarman","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata",
      "Harshana","Vajra","Siddhi","Vyatipata","Variyana","Parigha",
      "Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti",
    ][yogaIdx];
    const karanaName = pResult.karana || "";

    // ── Phase B: rashi, panchak, bhadra, mool, special yogas ──
    // Moon rashi (1..12; library exposes 0-indexed)
    const moonRashiIdx = Math.min(Math.max((pResult.moonRashi?.index ?? 0), 0), 11);
    const sunRashiIdx = Math.min(Math.max((pResult.sunRashi?.index ?? 0), 0), 11);
    const sunNakIdx = Math.min(Math.max((pResult.sunNakshatra?.index ?? 0), 0), 26);
    const RASHI_EN = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

    // Panchak: moon nakshatra ∈ {Dhanishta(2nd half / #23 second pada), Shatabhisha(24), P-Bhadrapada(25), U-Bhadrapada(26), Revati(27)}.
    // For simplicity we mark panchak when moon is in any of {23,24,25,26,27} for now. Pada-level
    // precision (only Dhanishta 2nd half) is a future refinement.
    const isPanchak = nakshatraNumber >= 23 && nakshatraNumber <= 27;
    // Bhadra: any karana transition with name = Vishti during the day
    const bhadraPeriods: Array<{ startTime: string; endTime: string }> = [];
    if (Array.isArray(pResult.karanaTransitions)) {
      for (const kt of pResult.karanaTransitions) {
        if (kt.name && kt.name.toLowerCase().includes("vishti")) {
          bhadraPeriods.push({
            startTime: formatTime(kt.startTime),
            endTime: formatTime(kt.endTime),
          });
        }
      }
    }
    const isBhadraActive = bhadraPeriods.length > 0 || karanaName.toLowerCase().includes("vishti");
    // Mool / Gandanta: moon in any of the rashi-junction nakshatras Ashlesha(9), Magha(10),
    // Jyeshtha(18), Mula(19), Revati(27), Ashwini(1). Per the Jain panchang's "मूल" sheet, all
    // six are flagged. (A finer rule could limit to specific padas, but for Phase B this is
    // sufficient to match the Excel.)
    const isMool = [1, 9, 10, 18, 19, 27].includes(nakshatraNumber);

    // Special yogas — library exposes a list of named yogas active on this date
    const SPECIAL_YOGA_KEY_MAP: Record<string, SpecialYogaPeriod["key"]> = {
      "ravi yoga": "ravi", "raviyoga": "ravi",
      "sarvarthasiddhi yoga": "sarvarthasiddhi", "sarvartha siddhi yoga": "sarvarthasiddhi",
      "amrit siddhi yoga": "amrit-siddhi", "amritsiddhi yoga": "amrit-siddhi",
      "ravi pushya yoga": "ravipushya", "ravipushya": "ravipushya",
      "guru pushya yoga": "gurupushya", "gurupushya": "gurupushya",
      "tripushkar yoga": "tripushkar", "tripushkara yoga": "tripushkar",
      "dvipushkar yoga": "dvipushkar", "dvipushkara yoga": "dvipushkar",
    };
    const SPECIAL_YOGA_HI: Record<SpecialYogaPeriod["key"], { hi: string; en: string }> = {
      ravi:           { hi: "रवियोग",         en: "Ravi Yoga" },
      sarvarthasiddhi:{ hi: "सर्वार्थसिद्धि योग", en: "Sarvarthasiddhi Yoga" },
      "amrit-siddhi": { hi: "अमृत सिद्धि योग",  en: "Amrit Siddhi Yoga" },
      ravipushya:     { hi: "रवि पुष्य योग",   en: "Ravi Pushya Yoga" },
      gurupushya:     { hi: "गुरु पुष्य योग",  en: "Guru Pushya Yoga" },
      tripushkar:     { hi: "त्रिपुष्कर योग",   en: "Tripushkar Yoga" },
      dvipushkar:     { hi: "द्विपुष्कर योग",   en: "Dvipushkar Yoga" },
    };
    const specialYogas: SpecialYogaPeriod[] = [];
    if (Array.isArray(pResult.specialYogas)) {
      for (const sy of pResult.specialYogas) {
        const lookup = SPECIAL_YOGA_KEY_MAP[(sy.name || "").toLowerCase().trim()];
        if (!lookup) continue;
        const labels = SPECIAL_YOGA_HI[lookup];
        // Library doesn't expose per-yoga start/end Date objects on this object; populate sunrise→sunset
        // as a placeholder window. Day-over-day refinement comes in a later pass.
        specialYogas.push({
          key: lookup,
          nameHi: labels.hi,
          nameEn: labels.en,
          startTime: formatTime(pResult.sunrise),
          endTime: formatTime(pResult.sunset),
        });
      }
    }

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
      nakshatra: {
        number: nakshatraNumber,
        nameHi: NAKSHATRA_NAMES_HI[nakshatraIdx] || "",
        nameEn: NAKSHATRA_NAMES_EN[nakshatraIdx] || "",
        endTime: formatTime(pResult.nakshatraEndTime),
      },
      yoga: {
        number: yogaIdx + 1,
        nameHi: YOGA_NAMES_HI[yogaIdx] || "",
        nameEn: yogaNameEn || "",
        endTime: formatTime(pResult.yogaEndTime),
      },
      karana: karanaName
        ? {
            nameHi: KARANA_NAMES_HI[karanaName] || karanaName,
            nameEn: karanaName,
            endTime: formatTime(pResult.karanaTransitions?.[0]?.endTime ?? null),
          }
        : undefined,
      sunTimes: {
        sunrise: formatTime(pResult.sunrise),
        sunset: formatTime(pResult.sunset),
        moonrise: formatTime(pResult.moonrise),
        moonset: formatTime(pResult.moonset),
      },
      rahuKalam: (pResult.rahuKalamStart && pResult.rahuKalamEnd) ? {
        start: formatTime(pResult.rahuKalamStart),
        end: formatTime(pResult.rahuKalamEnd),
      } : undefined,
      masaIsAdhika,
      ritu: pResult.ritu ? { hi: RITU_HI[pResult.ritu] || pResult.ritu, en: pResult.ritu } : undefined,
      ayana: pResult.ayana ? { hi: AYANA_HI[pResult.ayana] || pResult.ayana, en: pResult.ayana } : undefined,
      moonRashi: pResult.moonRashi ? {
        number: moonRashiIdx + 1,
        nameHi: RASHI_NAMES_HI[moonRashiIdx] || "",
        nameEn: RASHI_EN[moonRashiIdx] || pResult.moonRashi.name || "",
      } : undefined,
      sunRashi: pResult.sunRashi ? {
        number: sunRashiIdx + 1,
        nameHi: RASHI_NAMES_HI[sunRashiIdx] || "",
        nameEn: RASHI_EN[sunRashiIdx] || pResult.sunRashi.name || "",
      } : undefined,
      sunNakshatra: pResult.sunNakshatra ? {
        number: sunNakIdx + 1,
        nameHi: NAKSHATRA_NAMES_HI[sunNakIdx] || "",
        nameEn: NAKSHATRA_NAMES_EN[sunNakIdx] || pResult.sunNakshatra.name || "",
      } : undefined,
      specialYogas: specialYogas.length > 0 ? specialYogas : undefined,
      panchak: isPanchak,
      bhadra: isBhadraActive ? { active: true, periods: bhadraPeriods.length > 0 ? bhadraPeriods : undefined } : { active: false },
      mool: isMool,
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
        const prevNakshatra = prev.nakshatra?.number ?? 0;
        const prevMasaIsAdhika = prev.masaIsAdhika ?? false;
        const skippedEvents = matchEventsForDate(
          prev.date, new Date(prev.date).getFullYear(), prev.hinduMonth.en, paksha,
          skippedNum, prevNakshatra, prevMasaIsAdhika, activeEvents
        );
        if (skippedEvents.length > 0) {
          const existingIds = new Set(allDays[i - 1].todayEvents.map((e) => e.eventId));
          for (const evt of skippedEvents) {
            if (!existingIds.has(evt.eventId)) {
              allDays[i - 1].todayEvents.push(evt);
            }
          }
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

  // ── Day-over-day transit detection for moonRashi / sunRashi / sunNakshatra ──
  // When the value differs from the previous day, mark this day as the transit day with
  // entryTime = the day's sunrise (placeholder; finer interpolation can come in a later pass).
  for (let i = 0; i < allDays.length; i++) {
    if (i === 0) continue;
    const prev = allDays[i - 1];
    const curr = allDays[i];
    if (curr.moonRashi && prev.moonRashi && curr.moonRashi.number !== prev.moonRashi.number) {
      curr.moonRashi = { ...curr.moonRashi, entryTime: curr.sunTimes?.sunrise };
    }
    if (curr.sunRashi && prev.sunRashi && curr.sunRashi.number !== prev.sunRashi.number) {
      curr.sunRashi = { ...curr.sunRashi, entryTime: curr.sunTimes?.sunrise };
    }
    if (curr.sunNakshatra && prev.sunNakshatra && curr.sunNakshatra.number !== prev.sunNakshatra.number) {
      curr.sunNakshatra = { ...curr.sunNakshatra, entryTime: curr.sunTimes?.sunrise };
    }
  }

  // ── First-occurrence-wins (adhika maas handling) ──
  // For tithi-based events: when a Hindu month repeats in the year (adhika maas), the event
  // should fire only on the FIRST occurrence per civil year. Without this pass an event like
  // Shantinath janma would fire twice in 2026 (both Jyeshthas).
  //
  // Multi-day vrats (with tithiRange) should fire on EVERY day in their tithi window during the
  // first matching month — but not repeat in a second month. This is implemented by tracking the
  // last-fired day index per eventId; consecutive-day firings are kept (multi-day vrat continuing),
  // gap firings are dropped (re-occurrence in adhika month).
  //
  // Excluded from de-duplication entirely (always fire):
  //   - fixed-Gregorian events (national holidays)
  //   - nakshatra-rule events (Rohini Vrat — designed to recur monthly when moon enters Rohini)
  {
    const eventLookup = new Map(activeEvents.map((e) => [e.id, e]));
    const lastFiredIdx = new Map<string, number>();
    for (let i = 0; i < allDays.length; i++) {
      const day = allDays[i];
      const filtered: typeof day.todayEvents = [];
      for (const evt of day.todayEvents) {
        const def = eventLookup.get(evt.eventId);
        const alwaysFire = !!(def?.fixedDate || def?.nakshatraRule);
        if (alwaysFire) {
          filtered.push(evt);
          continue;
        }
        const last = lastFiredIdx.get(evt.eventId);
        if (last === undefined || last === i - 1) {
          // First firing or consecutive-day continuation of a multi-day vrat
          filtered.push(evt);
          lastFiredIdx.set(evt.eventId, i);
        }
        // else: gap firing in a later month — drop (event already fired earlier in the year)
      }
      day.todayEvents = filtered;
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
  nakshatraNumber: number,
  masaIsAdhika: boolean,
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
    // Nakshatra rule (e.g. Rohini Vrat — fires whenever moon is in Rohini)
    else if (event.nakshatraRule && event.nakshatraRule.nakshatraNumber === nakshatraNumber) {
      isMatch = true;
    }
    // Tithi range (multi-day vrat — fires on every tithi in [start..end])
    else if (
      event.tithiRange &&
      event.hinduMonth === hinduMonth &&
      event.hinduPaksha === paksha &&
      tithiNumber >= event.tithiRange.startTithi &&
      tithiNumber <= event.tithiRange.endTithi
    ) {
      isMatch = true;
    }
    // Single-tithi rule
    else if (
      event.hinduMonth &&
      event.hinduMonth === hinduMonth &&
      event.hinduPaksha === paksha &&
      event.hinduTithi === tithiNumber
    ) {
      isMatch = true;
    }

    // Adhika-maas gate (only applies to events selected by a Hindu-month rule, not fixedDate/Gregorian)
    // Default "both" so events fire on every occurrence of the month (adhika + nija).
    // Per-event override to "nija-only" or "adhika-only" allows fine-grained control.
    if (isMatch && !event.fixedDate && !event.gregorianOverrides?.[yearStr]) {
      const policy = event.adhikaMaasPolicy ?? "both";
      if (policy === "nija-only" && masaIsAdhika) isMatch = false;
      else if (policy === "adhika-only" && !masaIsAdhika) isMatch = false;
      else if (policy === "skip") isMatch = false;
      // "both" → always match
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
