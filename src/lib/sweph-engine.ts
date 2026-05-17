// Server-side panchang engine using genuine Swiss Ephemeris (sweph npm package).
// This module is ONLY for server contexts (Node.js); native bindings cannot run in a browser.
// All planetary positions, sunrise/sunset, ayanamsa are computed via Swiss Ephemeris (or
// Moshier fallback when ephemeris files are absent — accuracy still far better than the prior
// astronomy-engine port).

import sweph from "sweph";
import {
  HINDU_MONTHS, TITHI_NAMES_HI, TITHI_NAMES_EN, getTithi15Name,
  NAKSHATRA_NAMES_HI, NAKSHATRA_NAMES_EN, YOGA_NAMES_HI,
  KARANA_NAMES_HI, RITU_HI, AYANA_HI, RASHI_NAMES_HI,
  type JainEvent,
} from "@/data/jain-events";
import { RAS_TYAG_BY_VARA } from "./ras-tyag";
import { NITYA_MUHURTAS, resolveNityaClass } from "./nitya-muhurtas";
import type { PanchangDay, EventSummary, UpcomingEvent, SpecialYogaPeriod } from "./types";

const C = sweph.constants;
// Lahiri (Chitrapaksha) — the standard ayanamsa used by Drik Panchang and most North Indian panchangs.
sweph.set_sid_mode(C.SE_SIDM_LAHIRI, 0, 0);
const SIDEREAL_FLAGS = C.SEFLG_SWIEPH | C.SEFLG_SIDEREAL | C.SEFLG_SPEED;
const TROPICAL_FLAGS = C.SEFLG_SWIEPH | C.SEFLG_SPEED;
const SE_CALC_RISE = 1;
const SE_CALC_SET = 2;

const VARA_HI = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
const VARA_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MASA_NAMES_EN = [
  "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
  "Ashwin", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna",
];

const RITU_EN = ["Vasant", "Grishma", "Varsha", "Sharad", "Hemant", "Shishir"];
const RASHI_EN = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const YOGA_NAMES_EN = [
  "Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda",
  "Sukarma","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata",
  "Harshana","Vajra","Siddhi","Vyatipata","Variyana","Parigha",
  "Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti",
];

const SIX_GHATI_MS = 144 * 60 * 1000;
const DAY_MS = 86400 * 1000;

export interface LocationConfig {
  lat: number;
  lng: number;
  tz: number; // timezone offset in minutes (IST = 330)
}

// ─────────────────────────────────────────────────────────────────────────────
// Time helpers
// ─────────────────────────────────────────────────────────────────────────────

/** JS Date → Julian Day (UT). 1970-01-01 UT = JD 2440587.5. */
function dateToJD(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

/** Inverse: Julian Day (UT) → JS Date. */
function jdToDate(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000);
}

/** Format a Date as HH:MM in the configured tz. */
function formatTime(d: Date | null, tzMinutes: number): string {
  if (!d || isNaN(d.getTime())) return "";
  // Round to the nearest minute (Drik Panchang and most published panchangs round;
  // truncating produced systematic 1-minute lows on every time field). Roll over
  // hours/days correctly when seconds push past 60.
  const ms = d.getTime() + tzMinutes * 60 * 1000;
  const rounded = new Date(Math.round(ms / 60000) * 60000);
  const hh = String(rounded.getUTCHours()).padStart(2, "0");
  const mm = String(rounded.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** Format as "yyyy-MM-dd" in the configured tz. */
function formatDateStr(date: Date, tzMinutes: number): string {
  const local = new Date(date.getTime() + tzMinutes * 60 * 1000);
  const y = local.getUTCFullYear();
  const m = String(local.getUTCMonth() + 1).padStart(2, "0");
  const d = String(local.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Format a duration in ms as "HH:MM". */
function formatDuration(ms: number): string {
  const totalMin = Math.round(ms / 60000);
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Astronomical primitives
// ─────────────────────────────────────────────────────────────────────────────

function sidLong(body: number, date: Date): number {
  // Use calc_ut so we pass UT directly (sweph handles Delta-T internally)
  const r = sweph.calc_ut(dateToJD(date), body, SIDEREAL_FLAGS);
  return r.data[0];
}

/** Sidereal longitude + daily speed in one call. Speed sign tells us retrograde. */
function sidLongAndSpeed(body: number, date: Date): { lon: number; speed: number } {
  const r = sweph.calc_ut(dateToJD(date), body, SIDEREAL_FLAGS);
  return { lon: r.data[0], speed: r.data[3] };
}

function tropLong(body: number, date: Date): number {
  const r = sweph.calc_ut(dateToJD(date), body, TROPICAL_FLAGS);
  return r.data[0];
}

/** Tithi at instant (1..30). Tithi is independent of ayanamsa. */
function tithiAt(date: Date): number {
  const moon = tropLong(C.SE_MOON, date);
  const sun = tropLong(C.SE_SUN, date);
  let diff = moon - sun;
  if (diff < 0) diff += 360;
  return Math.floor(diff / 12) + 1;
}

/** Nakshatra at instant (1..27). */
function nakshatraAt(date: Date): number {
  const moonSid = sidLong(C.SE_MOON, date);
  return Math.floor(moonSid / (360 / 27)) + 1;
}

/** Pada within the current nakshatra (1..4). Each nakshatra spans 13°20' = 800', divided into
 * four padas of 200' each (=3°20'). */
function nakshatraPadaAt(date: Date): number {
  const moonSid = sidLong(C.SE_MOON, date);
  const nakSpan = 360 / 27; // 13.333...
  const within = moonSid % nakSpan;
  return Math.min(4, Math.floor(within / (nakSpan / 4)) + 1);
}

/** Yoga at instant (1..27). */
function yogaAt(date: Date): number {
  const sunSid = sidLong(C.SE_SUN, date);
  const moonSid = sidLong(C.SE_MOON, date);
  let sum = sunSid + moonSid;
  while (sum >= 360) sum -= 360;
  return Math.floor(sum / (360 / 27)) + 1;
}

/** Karana at instant: returns name + half-tithi index 1..60. */
function karanaInfoAt(date: Date): { number: number; name: string } {
  const moon = tropLong(C.SE_MOON, date);
  const sun = tropLong(C.SE_SUN, date);
  let diff = moon - sun;
  if (diff < 0) diff += 360;
  const halfIdx = Math.floor(diff / 6); // 0..59
  const REPEAT = ["Bava", "Balava", "Kaulava", "Taitila", "Garaja", "Vanija", "Vishti"];
  const FIXED_FIRST = "Kimstughna";
  const FIXED_END = ["Shakuni", "Chatushpada", "Naga"];
  let name: string;
  if (halfIdx === 0) name = FIXED_FIRST;
  else if (halfIdx >= 57) name = FIXED_END[halfIdx - 57];
  else name = REPEAT[(halfIdx - 1) % 7];
  return { number: halfIdx + 1, name };
}

/**
 * Find the next instant in [start, end] where the modular function f returns target degrees.
 * f(t) is expected to be monotonically increasing modulo 360 over the search window.
 * Bisects to second precision.
 */
function findCrossing(
  start: Date,
  end: Date,
  target: number,
  f: (d: Date) => number,
): Date | null {
  const stepMs = 30 * 60 * 1000; // 30-minute coarse scan
  let prev = f(start);
  let prevT = start.getTime();
  let bracket: [number, number] | null = null;
  for (let t = prevT + stepMs; t <= end.getTime(); t += stepMs) {
    const cur = f(new Date(t));
    const a = ((prev - target + 540) % 360) - 180;
    const b = ((cur - target + 540) % 360) - 180;
    if (a < 0 && b >= 0) {
      bracket = [prevT, t];
      break;
    }
    prev = cur;
    prevT = t;
  }
  if (!bracket) return null;
  let lo = bracket[0], hi = bracket[1];
  while (hi - lo > 1000) {
    const mid = (lo + hi) / 2;
    const v = f(new Date(mid));
    const cmp = ((v - target + 540) % 360) - 180;
    if (cmp < 0) lo = mid; else hi = mid;
  }
  return new Date((lo + hi) / 2);
}

/** Sunrise/sunset for a calendar day at the observer's location.
 * `dayMidnightLocal` is a Date representing local midnight at the observer's tz. */
function sunRiseSet(dayMidnightLocal: Date, loc: LocationConfig): { sunrise: Date | null; sunset: Date | null } {
  // jdStart = JD at local midnight. rise_trans finds the next rise/set strictly after jdStart,
  // so this gives us today's first sunrise and today's first sunset.
  const jdStart = dateToJD(dayMidnightLocal);
  const geopos: [number, number, number] = [loc.lng, loc.lat, 0];

  function calc(rsmi: number): Date | null {
    try {
      const r = sweph.rise_trans(
        jdStart,
        C.SE_SUN,
        "",
        C.SEFLG_SWIEPH,
        rsmi,
        geopos,
        1013.25,
        15,
      );
      // RiseTrans.data is a single number (the JD of the event)
      if (typeof r.data === "number" && r.data > 0) {
        return jdToDate(r.data);
      }
    } catch {
      // ignore
    }
    return null;
  }

  return { sunrise: calc(SE_CALC_RISE), sunset: calc(SE_CALC_SET) };
}

/** Moonrise/moonset for the day.
 *
 * Hindu-panchang convention (matches Drik): moon's disc CENTER crossing the
 * GEOMETRIC horizon (no refraction). Distinct from the Sun convention which uses
 * upper limb + atmospheric refraction. Without these flags our moonrise was 4-5
 * min early and moonset 4-5 min late vs Drik. */
const MOON_RISE_BITS = (C.SE_BIT_DISC_CENTER ?? 256) | (C.SE_BIT_NO_REFRACTION ?? 512);

function moonRiseSet(dayMidnightLocal: Date, loc: LocationConfig): { moonrise: Date | null; moonset: Date | null } {
  // jdStart = JD at local midnight. rise_trans finds the next rise/set strictly after jdStart,
  // so this gives us today's first moonrise and moonset.
  const jdStart = dateToJD(dayMidnightLocal);
  const geopos: [number, number, number] = [loc.lng, loc.lat, 0];
  function calc(rsmi: number): Date | null {
    try {
      const r = sweph.rise_trans(jdStart, C.SE_MOON, "", C.SEFLG_SWIEPH, rsmi | MOON_RISE_BITS, geopos, 1013.25, 15);
      if (typeof r.data === "number" && r.data > 0) return jdToDate(r.data);
    } catch { /* ignore */ }
    return null;
  }
  return { moonrise: calc(SE_CALC_RISE), moonset: calc(SE_CALC_SET) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Tithi boundary lookup
// ─────────────────────────────────────────────────────────────────────────────

interface UdayaTithiInfo {
  tithi: number;
  paksha: "Shukla" | "Krishna";
  tithiStart: Date;
  tithiEnd: Date;
}

function moonMinusSun(d: Date): number {
  const moon = tropLong(C.SE_MOON, d);
  const sun = tropLong(C.SE_SUN, d);
  let diff = moon - sun;
  if (diff < 0) diff += 360;
  return diff;
}

function udayaTithiInfo(referenceInstant: Date): UdayaTithiInfo {
  const t = tithiAt(referenceInstant);
  const back = new Date(referenceInstant.getTime() - 2 * DAY_MS);
  const fwd = new Date(referenceInstant.getTime() + 2 * DAY_MS);
  const tithiStartAngle = (t - 1) * 12;
  const tithiEndAngle = (t * 12) % 360;
  const tithiStart = findCrossing(back, referenceInstant, tithiStartAngle, moonMinusSun) || back;
  const tithiEnd = findCrossing(referenceInstant, fwd, tithiEndAngle, moonMinusSun) || fwd;
  const paksha: "Shukla" | "Krishna" = t <= 15 ? "Shukla" : "Krishna";
  return { tithi: t, paksha, tithiStart, tithiEnd };
}

/** End time of the current nakshatra (when moon-sidereal crosses next 13°20' boundary). */
function nakshatraEndTime(referenceInstant: Date): Date | null {
  const naks = nakshatraAt(referenceInstant);
  const fwd = new Date(referenceInstant.getTime() + 2 * DAY_MS);
  const target = (naks * (360 / 27)) % 360;
  return findCrossing(referenceInstant, fwd, target, (d) => sidLong(C.SE_MOON, d));
}

/** End time of the current yoga. */
function yogaEndTime(referenceInstant: Date): Date | null {
  const y = yogaAt(referenceInstant);
  const fwd = new Date(referenceInstant.getTime() + 2 * DAY_MS);
  const target = (y * (360 / 27)) % 360;
  return findCrossing(referenceInstant, fwd, target, (d) => {
    const sun = sidLong(C.SE_SUN, d);
    const moon = sidLong(C.SE_MOON, d);
    let s = sun + moon;
    while (s >= 360) s -= 360;
    return s;
  });
}

/** End time of the current karana (next 6° boundary). */
function karanaEndTime(referenceInstant: Date): Date | null {
  const moon = tropLong(C.SE_MOON, referenceInstant);
  const sun = tropLong(C.SE_SUN, referenceInstant);
  let diff = moon - sun;
  if (diff < 0) diff += 360;
  const halfIdx = Math.floor(diff / 6);
  const target = ((halfIdx + 1) * 6) % 360;
  const fwd = new Date(referenceInstant.getTime() + DAY_MS);
  return findCrossing(referenceInstant, fwd, target, moonMinusSun);
}

/** All karanas that touch the civil window [start, end]. */
function karanasInWindow(start: Date, end: Date): Array<{ name: string; endTime: Date }> {
  const out: Array<{ name: string; endTime: Date }> = [];
  let cursor = start;
  while (cursor.getTime() < end.getTime()) {
    const cur = karanaInfoAt(cursor);
    const endT = karanaEndTime(cursor) ?? end;
    out.push({ name: cur.name, endTime: endT });
    cursor = new Date(endT.getTime() + 60_000); // step past the boundary
    if (out.length > 6) break; // safety
  }
  return out;
}

/** All yogas that touch the civil window [start, end]. */
function yogasInWindow(start: Date, end: Date): Array<{ index: number; endTime: Date }> {
  const out: Array<{ index: number; endTime: Date }> = [];
  let cursor = start;
  while (cursor.getTime() < end.getTime()) {
    const idx = yogaAt(cursor);
    const endT = yogaEndTime(cursor) ?? end;
    out.push({ index: idx, endTime: endT });
    cursor = new Date(endT.getTime() + 60_000);
    if (out.length > 4) break;
  }
  return out;
}

/** Lagna (rising sign / udaya lagna) at a given instant for the observer's location.
 * sweph.houses returns the tropical ascendant in `data.points[0]`. We subtract the ayanamsa
 * to convert to sidereal, then divide by 30 to get the rashi index 0..11 (Mesha = 0). */
function lagnaAt(date: Date, lat: number, lng: number): number {
  try {
    const jd = dateToJD(date);
    const r = sweph.houses(jd, lat, lng, "P");
    const ascTropical = r.data.points[0];
    if (typeof ascTropical !== "number") return 0;
    const ayan = sweph.get_ayanamsa(jd);
    let ascSid = ascTropical - ayan;
    while (ascSid < 0) ascSid += 360;
    while (ascSid >= 360) ascSid -= 360;
    return Math.floor(ascSid / 30);
  } catch {
    return 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Hindu month (Purnimanta + Amanta both)
// ─────────────────────────────────────────────────────────────────────────────

/** Find the most recent New Moon (Amavasya end) before a given date. */
// Direct moon-sun angle search. The moon-sun differential is a continuous,
// monotonically-increasing-modulo-360 function — exactly one Amavasya (angle=0)
// and exactly one Purnima (angle=180) per lunar cycle. So we can ESTIMATE where
// the nearest crossing is using the synodic period, then call findCrossing on
// a small bracket around the estimate. Robust by construction — does not depend
// on landing inside any tithi's time-of-day window (the bug fixed earlier).
const SYNODIC_MS = 29.530588 * DAY_MS;
const SEARCH_HALF_WINDOW_MS = 2 * DAY_MS; // synodic period varies by <±0.2 days

function findRecentAmavasya(date: Date): Date {
  // Time since the most recent 0-crossing ≈ (current angle / 360) × synodic.
  const M = moonMinusSun(date);
  const estAgo = (M / 360) * SYNODIC_MS;
  const estimate = new Date(date.getTime() - estAgo);
  const before = new Date(estimate.getTime() - SEARCH_HALF_WINDOW_MS);
  const after = new Date(estimate.getTime() + SEARCH_HALF_WINDOW_MS);
  return findCrossing(before, after, 0, moonMinusSun) ?? estimate;
}

/** Find the most recent Purnima before a given date. */
function findRecentPurnima(date: Date): Date {
  // If angle < 180, last Purnima was the prior cycle's 180-crossing (offset = M + 180).
  // If angle ≥ 180, last Purnima was earlier this cycle (offset = M - 180).
  const M = moonMinusSun(date);
  const offset = M < 180 ? (M + 180) : (M - 180);
  const estAgo = (offset / 360) * SYNODIC_MS;
  const estimate = new Date(date.getTime() - estAgo);
  const before = new Date(estimate.getTime() - SEARCH_HALF_WINDOW_MS);
  const after = new Date(estimate.getTime() + SEARCH_HALF_WINDOW_MS);
  return findCrossing(before, after, 180, moonMinusSun) ?? estimate;
}

/** Find the next Purnima at or after a given date. */
function findNextPurnima(date: Date): Date {
  // If angle ≤ 180, next Purnima is this cycle (forward = 180 − M).
  // If angle > 180, next Purnima is next cycle (forward = 540 − M).
  const M = moonMinusSun(date);
  const forward = M <= 180 ? (180 - M) : (540 - M);
  const estAhead = (forward / 360) * SYNODIC_MS;
  const estimate = new Date(date.getTime() + estAhead);
  const before = new Date(estimate.getTime() - SEARCH_HALF_WINDOW_MS);
  const after = new Date(estimate.getTime() + SEARCH_HALF_WINDOW_MS);
  return findCrossing(before, after, 180, moonMinusSun) ?? estimate;
}

/**
 * Hindu month index (0..11, Chaitra=0) under Amanta (month begins after Amavasya).
 * The masa is named after the rashi the Sun occupies at the START of the lunar month.
 * Convention: sun in Mesha at amavasya → Vaishakha. masa = (rashi + 1) mod 12.
 */
function masaIndexAmanta(date: Date): number {
  const startBoundary = findRecentAmavasya(date);
  const rashi = Math.floor(sidLong(C.SE_SUN, startBoundary) / 30);
  return (rashi + 1) % 12;
}

/**
 * Hindu month index under Purnimanta (month begins after Purnima).
 *
 * The Purnimanta month is named after the Amanta month that CONTAINS the next
 * Purnima — i.e. the Amanta month whose Amavasya immediately precedes that
 * Purnima. So:
 *   1. Find the next Purnima after `date`.
 *   2. Find the Amavasya immediately before that Purnima.
 *   3. Sun's rashi at THAT Amavasya determines the masa (rashi + 1) mod 12.
 *
 * This anchors the name to a single unambiguous point (an Amavasya in mid-month)
 * rather than a sankranti-adjacent boundary. Earlier implementations using
 * `findRecentPurnima ± offset` mis-named months when the Sun crossed sankranti
 * within a few days of a Purnima (produced "Ashwin" instead of "Bhadrapada" for
 * Sept 15, 2026 — cross-checked against Drik Panchang).
 */
function masaIndexPurnimanta(date: Date): number {
  const nextPurnima = findNextPurnima(date);
  const amavasyaBefore = findRecentAmavasya(nextPurnima);
  const rashi = Math.floor(sidLong(C.SE_SUN, amavasyaBefore) / 30);
  return (rashi + 1) % 12;
}

// ─────────────────────────────────────────────────────────────────────────────
// Eclipses (Surya Grahan / Chandra Grahan) + Sutak
// ─────────────────────────────────────────────────────────────────────────────

interface EclipseDetails {
  type: "surya" | "chandra";
  kind: "total" | "partial" | "annular" | "hybrid" | "penumbral";
  visible: boolean;
  /** Local YYYY-MM-DD of the peak. */
  eclipseDate: string;
  /** UTC: locally visible window if visible, else global. For DISPLAY. */
  startUtc: Date;
  maxUtc: Date;
  endUtc: Date;
  /** UTC: global astronomical contacts (used for sutak anchoring). */
  globalStartUtc: Date;
  globalEndUtc: Date;
  magnitude: number;
}

/** Classify the eclipse "kind" from the SE_ECL_* flag bits returned by sweph. */
function classifyEclipseKind(flag: number, type: "surya" | "chandra"): EclipseDetails["kind"] {
  if (flag & 4) return "total";
  if (flag & 8) return "annular";
  if (flag & 32) return type === "chandra" ? "partial" : "hybrid";
  if (flag & 16) return "partial";
  if (flag & 64) return "penumbral";
  return "partial";
}

/** Find the eclipse closest to `date` within ±2 days. Returns null if none.
 *
 *  Two sweph calls are made:
 *    1. `*_when_loc`  → visibility flag + locally-visible contact times
 *    2. `*_when`/`*_when_glob` → globally-true eclipse type + universal contact
 *       times (used for sutak start calculation, which is anchored to global
 *       umbra-begin / first-contact even if not locally visible at that moment).
 *
 *  Display "start/end" are the locally visible visible-window if visible,
 *  otherwise the global universal times. */
function findNearEclipse(
  date: Date,
  type: "surya" | "chandra",
  loc: LocationConfig,
): EclipseDetails | null {
  const geopos: [number, number, number] = [loc.lng, loc.lat, 0];
  const startJd = dateToJD(new Date(date.getTime() - 2 * DAY_MS));

  type EclResponse = { flag: number; data: number[]; attributes?: number[] };
  let local: EclResponse | null = null;
  let global: EclResponse | null = null;
  try {
    if (type === "surya") {
      local = sweph.sol_eclipse_when_loc(startJd, C.SEFLG_SWIEPH, geopos, false) as EclResponse;
      // sol_eclipse_when_glob has a numeric `backwards` arg (unlike the other three).
      global = sweph.sol_eclipse_when_glob(startJd, C.SEFLG_SWIEPH, 0, 0) as EclResponse;
    } else {
      local = sweph.lun_eclipse_when_loc(startJd, C.SEFLG_SWIEPH, geopos, false) as EclResponse;
      global = sweph.lun_eclipse_when(startJd, C.SEFLG_SWIEPH, 0, false) as EclResponse;
    }
  } catch { return null; }
  if (!global || !global.data || global.data[0] <= 0) return null;

  const peakJd = global.data[0];
  const peakUtc = jdToDate(peakJd);
  // Only accept if peak is within ±2 days of `date`.
  if (Math.abs(peakUtc.getTime() - date.getTime()) > 2 * DAY_MS) return null;

  // GLOBAL contact times (for sutak anchoring, even if not locally visible).
  // Per sweph C library headers:
  //   SOLAR sol_eclipse_when_glob:  [0]=max, [1]=noon if applicable, [2]=C1 (partial begin),
  //                                  [3]=central begin, [4]=central end, [5]=C4 (partial end)
  //   LUNAR lun_eclipse_when:       [0]=max, [1]=unused, [2]=umbra C1 (partial begin),
  //                                  [3]=umbra C4 (partial end), [4]=totality begin,
  //                                  [5]=totality end, [6]=penumbra begin, [7]=penumbra end
  // Sutak is anchored to the umbra/C1 ↔ C4 phase (sparsha → moksha), not penumbra.
  let globalStartJd: number;
  let globalEndJd: number;
  if (type === "surya") {
    globalStartJd = global.data[2] > 0 ? global.data[2] : peakJd;
    globalEndJd = global.data[5] > 0 ? global.data[5] : peakJd;
  } else {
    globalStartJd = global.data[2] > 0 ? global.data[2] : (global.data[6] > 0 ? global.data[6] : peakJd);
    globalEndJd = global.data[3] > 0 ? global.data[3] : (global.data[7] > 0 ? global.data[7] : peakJd);
  }

  // Eclipse classification — use GLOBAL flag (true type), not locally-visible bits.
  const globalFlag = global.flag ?? 0;
  const kind = classifyEclipseKind(globalFlag, type);

  // Visibility from location. CRITICAL: `*_when_loc` skips non-visible eclipses
  // and returns the NEXT visible one. So we must verify the _loc peak matches
  // the _glob peak within tight tolerance — otherwise _loc is reporting an
  // unrelated future eclipse and its flags say nothing about THIS eclipse.
  const localFlag = local?.flag ?? 0;
  const localPeakJd = local?.data?.[0] ?? 0;
  const peakMatchesLoc = localPeakJd > 0 && Math.abs(localPeakJd - peakJd) < 0.5; // within ½ day
  const visible = peakMatchesLoc && (localFlag & 128) !== 0; // SE_ECL_VISIBLE bit from _loc

  // Display contact times = GLOBAL astronomical contacts (sparsha → moksha).
  // We previously tried to show only the locally-visible visible window, but
  // sweph's _loc data[7] disambiguation (moonrise/set vs penumbra-end) is
  // tradition-dependent and caused garbled display. Showing global contacts
  // + a `visible` flag is unambiguous; users see the full astronomical timing
  // and a "visible from your location" indicator separately.
  const displayStartJd = globalStartJd;
  const displayEndJd = globalEndJd;

  const magnitude = global.attributes?.[0] ?? local?.attributes?.[0] ?? 0;

  return {
    type,
    kind,
    visible,
    eclipseDate: formatDateStr(peakUtc, loc.tz),
    startUtc: jdToDate(displayStartJd),
    maxUtc: peakUtc,
    endUtc: jdToDate(displayEndJd),
    magnitude,
    // Store global times separately for sutak calc (added below via type extension).
    globalStartUtc: jdToDate(globalStartJd),
    globalEndUtc: jdToDate(globalEndJd),
  } as EclipseDetails & { globalStartUtc: Date; globalEndUtc: Date };
}

/** Adhika maas detection: lunar month with no sankranti (sun stays in same rashi). */
function isAdhikaMaasAmanta(date: Date): boolean {
  const startBoundary = findRecentAmavasya(date);
  const fwdEnd = new Date(startBoundary.getTime() + 35 * DAY_MS);
  const nextAmavasya = findCrossing(
    new Date(startBoundary.getTime() + 24 * 3600 * 1000),
    fwdEnd,
    0,
    moonMinusSun,
  );
  const rashiStart = Math.floor(sidLong(C.SE_SUN, startBoundary) / 30);
  const rashiEnd = Math.floor(sidLong(C.SE_SUN, nextAmavasya || fwdEnd) / 30);
  return rashiStart === rashiEnd;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ritu, Ayana
// ─────────────────────────────────────────────────────────────────────────────

function rituFromMasa(masaIdx: number): { en: string; hi: string } {
  const en = RITU_EN[Math.floor(masaIdx / 2)];
  return { en, hi: RITU_HI[en] || en };
}

function ayanaFromSunLong(sunSidLong: number): { en: string; hi: string } {
  const en = sunSidLong >= 90 && sunSidLong < 270 ? "Dakshinayana" : "Uttarayana";
  return { en, hi: AYANA_HI[en] || en };
}

// ─────────────────────────────────────────────────────────────────────────────
// Muhurtas (auspicious + inauspicious time slots)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standard muhurta calculations based on sunrise/sunset.
 * The day from sunrise to sunset is divided into 8 equal parts (each ~90 min).
 * - Rahu Kalam: weekday-dependent slot index (0..7) of the day's 8 parts.
 * - Yamaganda Kalam: weekday-dependent slot index.
 * - Gulika Kalam: weekday-dependent slot index.
 * The day is also divided into 30 muhurtas (each ~48 min from sunrise to next sunrise).
 * - Abhijit Muhurta: 8th muhurta of the day (around solar noon), ~48 min centered on local noon.
 * - Kantaka Mrityu / Kulik / Yamghant / Kalvela: specific day-muhurta indices by weekday.
 *
 * Indices below are zero-based (slot 0 = first slot from sunrise).
 */
const RAHU_INDEX_BY_VARA: Record<number, number> = { 0: 7, 1: 1, 2: 6, 3: 4, 4: 5, 5: 3, 6: 2 };
const YAMAGANDA_INDEX_BY_VARA: Record<number, number> = { 0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 6, 6: 5 };
const GULIKA_INDEX_BY_VARA: Record<number, number> = { 0: 6, 1: 5, 2: 4, 3: 3, 4: 2, 5: 1, 6: 0 };

// Day-muhurta indices (0..14) for the 5 inauspicious sub-muhurtas. Source: standard Vedic muhurta tables.
// (These follow the vara wheel — values vary by tradition; using the most common Drik publication set.)
const KULIK_BY_VARA: Record<number, number> = { 0: 11, 1: 9, 2: 7, 3: 5, 4: 3, 5: 1, 6: 13 };
const KALVELA_BY_VARA: Record<number, number> = { 0: 9, 1: 7, 2: 5, 3: 3, 4: 1, 5: 13, 6: 11 };
const KANTAK_BY_VARA: Record<number, number> = { 0: 7, 1: 5, 2: 3, 3: 1, 4: 13, 5: 11, 6: 9 };
const YAMGHANT_BY_VARA: Record<number, number> = { 0: 5, 1: 3, 2: 1, 3: 13, 4: 11, 5: 9, 6: 7 };

interface MuhurtaSet {
  abhijit?: { start: string; end: string };
  rahuKalam?: { start: string; end: string };
  yamganda?: { start: string; end: string };
  gulikaKalam?: { start: string; end: string };
  kulik?: { start: string; end: string };
  kalvela?: { start: string; end: string };
  kantakMrityu?: { start: string; end: string };
  yamghant?: { start: string; end: string };
  brahmaMuhurta?: { start: string; end: string };
}

function computeMuhurtas(
  sunrise: Date, sunset: Date, vara: number, tz: number, nightMs?: number,
): MuhurtaSet {
  const dayMs = sunset.getTime() - sunrise.getTime();
  const eighth = dayMs / 8;
  const fifteenth = dayMs / 15;

  function slotEighth(idx: number) {
    const start = new Date(sunrise.getTime() + idx * eighth);
    const end = new Date(sunrise.getTime() + (idx + 1) * eighth);
    return { start: formatTime(start, tz), end: formatTime(end, tz) };
  }
  function slotFifteenth(idx: number) {
    const start = new Date(sunrise.getTime() + idx * fifteenth);
    const end = new Date(sunrise.getTime() + (idx + 1) * fifteenth);
    return { start: formatTime(start, tz), end: formatTime(end, tz) };
  }

  // Abhijit: 8th muhurta of the day = idx 7 of 15
  const abhijit = slotFifteenth(7);

  // Brahma Muhurta: night divided into 15 equal parts (night-muhurtas); Brahma is
  // the 14th part (i.e. the part ending one night-muhurta before sunrise). Matches
  // Drik Panchang's proportional convention. Caller passes nightMs = today's sunset
  // → tomorrow's sunrise (a sub-1-min proxy for the actual prior night, which is
  // yesterday's sunset → today's sunrise). Fallback: 24h - dayMs.
  const nightLen = nightMs && nightMs > 0 ? nightMs : (24 * 3600 * 1000 - dayMs);
  const nightPart = nightLen / 15;
  const brahmaStart = new Date(sunrise.getTime() - 2 * nightPart);
  const brahmaEnd = new Date(sunrise.getTime() - 1 * nightPart);

  return {
    abhijit,
    rahuKalam: slotEighth(RAHU_INDEX_BY_VARA[vara]),
    yamganda: slotEighth(YAMAGANDA_INDEX_BY_VARA[vara]),
    gulikaKalam: slotEighth(GULIKA_INDEX_BY_VARA[vara]),
    kulik: slotFifteenth(KULIK_BY_VARA[vara]),
    kalvela: slotFifteenth(KALVELA_BY_VARA[vara]),
    kantakMrityu: slotFifteenth(KANTAK_BY_VARA[vara]),
    yamghant: slotFifteenth(YAMGHANT_BY_VARA[vara]),
    brahmaMuhurta: { start: formatTime(brahmaStart, tz), end: formatTime(brahmaEnd, tz) },
  };
}

/** Extra named muhurtas: Vijaya, Godhuli, Pratah/Sayahna Sandhya, Nishita Kaal. */
function computeExtraMuhurtas(
  sunrise: Date, sunset: Date, nextSunrise: Date | null, tz: number,
): NonNullable<PanchangDay["extraMuhurtas"]> {
  const dayMs = sunset.getTime() - sunrise.getTime();
  const fifteenth = dayMs / 15;

  // Vijaya: 11th muhurta of the day (idx 10)
  const vijayaStart = new Date(sunrise.getTime() + 10 * fifteenth);
  const vijayaEnd = new Date(sunrise.getTime() + 11 * fifteenth);

  // Pratah Sandhya: ±12 min around sunrise
  const pratahStart = new Date(sunrise.getTime() - 12 * 60_000);
  const pratahEnd = new Date(sunrise.getTime() + 12 * 60_000);

  // Sayahna Sandhya: ±12 min around sunset
  const sayahnaStart = new Date(sunset.getTime() - 12 * 60_000);
  const sayahnaEnd = new Date(sunset.getTime() + 12 * 60_000);

  // Godhuli: ~24 min starting at sunset (cow-gathering twilight)
  const godhuliStart = sunset;
  const godhuliEnd = new Date(sunset.getTime() + 24 * 60_000);

  // Nishita: midnight ± 24 min, where solar midnight is the midpoint of sunset → next sunrise.
  // If we don't know next sunrise, fall back to civil midnight.
  let nishitaStart: Date;
  let nishitaEnd: Date;
  if (nextSunrise) {
    const midnight = new Date((sunset.getTime() + nextSunrise.getTime()) / 2);
    nishitaStart = new Date(midnight.getTime() - 24 * 60_000);
    nishitaEnd = new Date(midnight.getTime() + 24 * 60_000);
  } else {
    nishitaStart = new Date(sunset.getTime() + 5 * 3600_000);
    nishitaEnd = new Date(nishitaStart.getTime() + 48 * 60_000);
  }

  return {
    vijaya: { start: formatTime(vijayaStart, tz), end: formatTime(vijayaEnd, tz) },
    godhuli: { start: formatTime(godhuliStart, tz), end: formatTime(godhuliEnd, tz) },
    pratahSandhya: { start: formatTime(pratahStart, tz), end: formatTime(pratahEnd, tz) },
    sayahnaSandhya: { start: formatTime(sayahnaStart, tz), end: formatTime(sayahnaEnd, tz) },
    nishitaKaal: { start: formatTime(nishitaStart, tz), end: formatTime(nishitaEnd, tz) },
  };
}

/** 30 Nitya Muhurtas — 15 day muhurtas (sunrise → sunset, equal 1/15ths) +
 * 15 night muhurtas (sunset → next sunrise, equal 1/15ths). Each is ~48 minutes
 * in length and carries a fixed name + classification + recommended/avoided activities.
 * Vara-conditional muhurtas (e.g. अर्धमन / विदि) flip classification on specific weekdays. */
function computeNityaMuhurtas(
  sunrise: Date, sunset: Date, nextSunrise: Date | null, vara: number, tz: number,
): NonNullable<PanchangDay["nityaMuhurtas"]> {
  const out: NonNullable<PanchangDay["nityaMuhurtas"]> = [];
  const dayMs = sunset.getTime() - sunrise.getTime();
  const dayStep = dayMs / 15;
  // Day muhurtas 1..15
  for (let i = 0; i < 15; i++) {
    const spec = NITYA_MUHURTAS[i];
    const start = new Date(sunrise.getTime() + i * dayStep);
    const end = new Date(sunrise.getTime() + (i + 1) * dayStep);
    out.push({
      number: spec.number,
      nameHi: spec.nameHi,
      nameEn: spec.nameEn,
      classification: resolveNityaClass(spec, vara),
      doHi: spec.doHi,
      doEn: spec.doEn,
      dontHi: spec.dontHi,
      dontEn: spec.dontEn,
      startTime: formatTime(start, tz),
      endTime: formatTime(end, tz),
      period: "day",
    });
  }
  // Night muhurtas 16..30 — only if we know the next sunrise
  if (nextSunrise) {
    const nightMs = nextSunrise.getTime() - sunset.getTime();
    const nightStep = nightMs / 15;
    for (let i = 0; i < 15; i++) {
      const spec = NITYA_MUHURTAS[15 + i];
      const start = new Date(sunset.getTime() + i * nightStep);
      const end = new Date(sunset.getTime() + (i + 1) * nightStep);
      out.push({
        number: spec.number,
        nameHi: spec.nameHi,
        nameEn: spec.nameEn,
        classification: resolveNityaClass(spec, vara),
        doHi: spec.doHi,
        doEn: spec.doEn,
        dontHi: spec.dontHi,
        dontEn: spec.dontEn,
        startTime: formatTime(start, tz),
        endTime: formatTime(end, tz),
        period: "night",
      });
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Choghadiya — 8 day segments + 8 night segments
// ─────────────────────────────────────────────────────────────────────────────

// Day Choghadiya by weekday, 8 segments. Each entry is the type sequence starting at sunrise.
// Source: Standard Vedic Choghadiya table.
const DAY_CHOGHADIYA: Record<number, string[]> = {
  0: ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"], // Sunday
  1: ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit"], // Monday
  2: ["Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog"],   // Tuesday
  3: ["Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh"],  // Wednesday
  4: ["Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh"], // Thursday
  5: ["Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char"],  // Friday
  6: ["Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal"],  // Saturday
};

const NIGHT_CHOGHADIYA: Record<number, string[]> = {
  0: ["Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh"],
  1: ["Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char"],
  2: ["Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal"],
  3: ["Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg"],
  4: ["Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit"],
  5: ["Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog"],
  6: ["Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh"],
};

const CHOGHADIYA_HI: Record<string, string> = {
  Amrit: "अमृत", Kaal: "काल", Shubh: "शुभ", Rog: "रोग",
  Udveg: "उद्वेग", Char: "चल", Labh: "लाभ",
};

const CHOGHADIYA_TYPE: Record<string, "shubh" | "ashubh"> = {
  Amrit: "shubh", Shubh: "shubh", Labh: "shubh", Char: "shubh",
  Kaal: "ashubh", Rog: "ashubh", Udveg: "ashubh",
};

function computeChoghadiya(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  vara: number,
  tz: number,
): {
  day: Array<{ name: string; nameHi: string; type: "shubh" | "ashubh"; start: string; end: string }>;
  night: Array<{ name: string; nameHi: string; type: "shubh" | "ashubh"; start: string; end: string }>;
} {
  const daySegMs = (sunset.getTime() - sunrise.getTime()) / 8;
  const nightSegMs = (nextSunrise.getTime() - sunset.getTime()) / 8;
  const daySeq = DAY_CHOGHADIYA[vara];
  const nightSeq = NIGHT_CHOGHADIYA[vara];
  const day = daySeq.map((name, i) => ({
    name,
    nameHi: CHOGHADIYA_HI[name] || name,
    type: CHOGHADIYA_TYPE[name],
    start: formatTime(new Date(sunrise.getTime() + i * daySegMs), tz),
    end: formatTime(new Date(sunrise.getTime() + (i + 1) * daySegMs), tz),
  }));
  const night = nightSeq.map((name, i) => ({
    name,
    nameHi: CHOGHADIYA_HI[name] || name,
    type: CHOGHADIYA_TYPE[name],
    start: formatTime(new Date(sunset.getTime() + i * nightSegMs), tz),
    end: formatTime(new Date(sunset.getTime() + (i + 1) * nightSegMs), tz),
  }));
  return { day, night };
}

// ─────────────────────────────────────────────────────────────────────────────
// Disha Shool, Anandadi Yoga
// ─────────────────────────────────────────────────────────────────────────────

const DISHA_SHOOL: Record<number, { en: string; hi: string }> = {
  0: { en: "West", hi: "पश्चिम" },
  1: { en: "East", hi: "पूर्व" },
  2: { en: "North", hi: "उत्तर" },
  3: { en: "North", hi: "उत्तर" },
  4: { en: "South", hi: "दक्षिण" },
  5: { en: "West", hi: "पश्चिम" },
  6: { en: "East", hi: "पूर्व" },
};

// Vara Shoola — direction-to-face when starting an activity (Muhurta Chintamani convention).
// Distinct from Disha Shool (which is direction-to-avoid for travel).
const VARA_SHOOLA: Record<number, { en: string; hi: string }> = {
  0: { en: "South-East", hi: "आग्नेय" },
  1: { en: "South-West", hi: "नैऋत्य" },
  2: { en: "North-West", hi: "वायव्य" },
  3: { en: "North",      hi: "उत्तर" },
  4: { en: "North-East", hi: "ईशान्य" },
  5: { en: "West",       hi: "पश्चिम" },
  6: { en: "East",       hi: "पूर्व" },
};

// ── Tithi pravritti (5-cycle naming): Nanda 1/6/11, Bhadra 2/7/12, Jaya 3/8/13, Rikta 4/9/14, Purna 5/10/15
const TITHI_PRAVRITTI: Record<number, { nameHi: string; nameEn: string }> = {
  1: { nameHi: "नन्दा", nameEn: "Nanda" },
  2: { nameHi: "भद्रा", nameEn: "Bhadra" },
  3: { nameHi: "जया", nameEn: "Jaya" },
  4: { nameHi: "रिक्ता", nameEn: "Rikta" },
  0: { nameHi: "पूर्णा", nameEn: "Purna" }, // tithi % 5 == 0 (i.e. 5, 10, 15)
};

function tithiPravrittiOf(tithiInPaksha: number): { nameHi: string; nameEn: string } {
  return TITHI_PRAVRITTI[tithiInPaksha % 5];
}

// ── Hora lord: planetary hour ruler at sunrise.
// The vara's lord is the lord of the FIRST hora (sunrise + 0). Order of horas through the day
// follows the Chaldean sequence: Sat → Jup → Mars → Sun → Venus → Mercury → Moon → Sat...
// (We only surface the sunrise hora here.)
const VARA_LORD: Record<number, { en: string; hi: string }> = {
  0: { en: "Sun", hi: "सूर्य" },        // Sunday
  1: { en: "Moon", hi: "चन्द्र" },     // Monday
  2: { en: "Mars", hi: "मंगल" },       // Tuesday
  3: { en: "Mercury", hi: "बुध" },     // Wednesday
  4: { en: "Jupiter", hi: "गुरु" },    // Thursday
  5: { en: "Venus", hi: "शुक्र" },     // Friday
  6: { en: "Saturn", hi: "शनि" },      // Saturday
};

// Anandadi Yoga: 28 yogas in a cycle, indexed by (nakshatra + vara) mod 28.
const ANANDADI_NAMES = [
  "Anand", "Kaaldand", "Dhumra", "Prajapati", "Saumya", "Dhwajra", "Shrivatsa",
  "Vajra", "Mudgar", "Chhatra", "Maitra", "Manas", "Padma", "Lumbak",
  "Utpat", "Mrityu", "Kana", "Siddhi", "Shubh", "Amrit", "Musal",
  "Gad", "Matanga", "Raksha", "Char", "Sthir", "Pravardhaman", "Sankalp",
];
const ANANDADI_HI = [
  "आनन्द", "कालदण्ड", "धूम्र", "प्रजापति", "सौम्य", "ध्वज", "श्रीवत्स",
  "वज्र", "मुद्गर", "छत्र", "मित्र", "मानस", "पद्म", "लुम्बक",
  "उत्पात", "मृत्यु", "काण", "सिद्धि", "शुभ", "अमृत", "मूसल",
  "गद", "मातंग", "रक्ष", "चर", "स्थिर", "प्रवर्धमान", "संकल्प",
];
const ANANDADI_AUSPICIOUS_INDICES = new Set([0, 3, 4, 6, 10, 11, 12, 17, 18, 19, 22, 24, 25, 26, 27]);

function computeAnandadiYoga(nakshatra: number, vara: number) {
  const idx = ((nakshatra - 1) + vara) % 28;
  return {
    name: ANANDADI_NAMES[idx],
    nameHi: ANANDADI_HI[idx],
    type: ANANDADI_AUSPICIOUS_INDICES.has(idx) ? ("shubh" as const) : ("ashubh" as const),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Special yogas (Sarvarthasiddhi, Ravi Pushya, Guru Pushya, Tripushkar, Dvipushkar)
// ─────────────────────────────────────────────────────────────────────────────

// Sarvarthasiddhi: vara × nakshatra combinations. (Standard Drik table.)
const SARVARTHASIDDHI_BY_VARA: Record<number, number[]> = {
  0: [3, 8, 13, 22, 27],     // Sunday: Krittika, Pushya, Hasta, Shravana, Revati
  1: [4, 6, 23, 27, 22],     // Monday: Rohini, Ardra, Dhanishta, Revati, Shravana
  2: [1, 3, 23, 27, 8],
  3: [4, 6, 8, 13, 17],
  4: [3, 8, 13, 22, 27],
  5: [4, 6, 21, 22, 24, 27],
  6: [4, 8, 22, 27],
};

// Amrit Siddhi Yoga — single qualifying nakshatra per weekday (classical Drik table,
// corroborated by astrobix.com and standard panchang references):
//   Sun-Hasta, Mon-Mrigashira, Tue-Ashvini, Wed-Anuradha, Thu-Pushya, Fri-Revati, Sat-Rohini.
const AMRITSIDDHI_BY_VARA: Record<number, number> = {
  0: 13, 1: 5, 2: 1, 3: 17, 4: 8, 5: 27, 6: 4,
};

// Tripushkar: vara × nakshatra × tithi (last paksha-3) — common combinations
function isTripushkar(vara: number, naks: number, _tithi: number): boolean {
  // Standard: Sunday/Tuesday/Saturday + (Vishakha/Krittika/Uttarashada/Uttarabhadrapada/Punarvasu)
  if (![0, 2, 6].includes(vara)) return false;
  return [3, 16, 21, 26, 7].includes(naks);
}

function isDvipushkar(vara: number, naks: number, _tithi: number): boolean {
  // Standard: Sunday/Tuesday/Saturday + (Mrigashira/Chitra/Dhanishta)
  if (![0, 2, 6].includes(vara)) return false;
  return [5, 14, 23].includes(naks);
}

// ─────────────────────────────────────────────────────────────────────────────
// Planets, hora, dur-muhurta, bhadra mukh
// ─────────────────────────────────────────────────────────────────────────────

/** The 9 grahas in standard panchang order. Sweph body codes for each. */
const PLANETS: Array<{
  key: "sun" | "moon" | "mars" | "mercury" | "jupiter" | "venus" | "saturn" | "rahu" | "ketu";
  body: number; // sweph body id
  nameHi: string;
  nameEn: string;
  retrogradeable: boolean;
  combustible: boolean;
  /** Combustion limit in degrees (mean angular distance from Sun under which the planet is asta).
   *  Standard Bhrigu/Sanhita values used in published Indian panchangs. */
  combustLimit: number;
}> = [
  { key: "sun",     body: 0,                       nameHi: "सूर्य",   nameEn: "Sun",     retrogradeable: false, combustible: false, combustLimit: 0 },
  { key: "moon",    body: 1,                       nameHi: "चन्द्र",  nameEn: "Moon",    retrogradeable: false, combustible: false, combustLimit: 0 },
  { key: "mars",    body: 4,                       nameHi: "मंगल",   nameEn: "Mars",    retrogradeable: true,  combustible: true,  combustLimit: 17 },
  { key: "mercury", body: 2,                       nameHi: "बुध",    nameEn: "Mercury", retrogradeable: true,  combustible: true,  combustLimit: 14 },
  { key: "jupiter", body: 5,                       nameHi: "गुरु",   nameEn: "Jupiter", retrogradeable: true,  combustible: true,  combustLimit: 11 },
  { key: "venus",   body: 3,                       nameHi: "शुक्र",  nameEn: "Venus",   retrogradeable: true,  combustible: true,  combustLimit: 10 },
  { key: "saturn",  body: 6,                       nameHi: "शनि",    nameEn: "Saturn",  retrogradeable: true,  combustible: true,  combustLimit: 15 },
  // Rahu = lunar north node (mean). Always retrograde-by-convention but shown as "—" since it's nominal.
  // Ketu = Rahu + 180°. Computed below from Rahu.
  { key: "rahu",    body: 11 /* SE_TRUE_NODE */,   nameHi: "राहु",   nameEn: "Rahu",    retrogradeable: false, combustible: false, combustLimit: 0 },
  { key: "ketu",    body: -1 /* derived */,        nameHi: "केतु",   nameEn: "Ketu",    retrogradeable: false, combustible: false, combustLimit: 0 },
];

interface PlanetRow {
  key: "sun" | "moon" | "mars" | "mercury" | "jupiter" | "venus" | "saturn" | "rahu" | "ketu";
  nameHi: string;
  nameEn: string;
  degInRashi: number;
  rashi: { number: number; nameHi: string; nameEn: string };
  nakshatra: { number: number; nameHi: string; nameEn: string };
  retrograde: boolean;
  combust: boolean;
}

function computePlanets(sunrise: Date): PlanetRow[] {
  const sunLon = sidLong(0, sunrise);
  const out: PlanetRow[] = [];
  for (const p of PLANETS) {
    let lon: number;
    let speed = 0;
    if (p.key === "ketu") {
      // Ketu = Rahu + 180°
      const rahu = sidLongAndSpeed(11, sunrise);
      lon = (rahu.lon + 180) % 360;
    } else {
      const r = sidLongAndSpeed(p.body, sunrise);
      lon = r.lon;
      speed = r.speed;
    }
    const rashiIdx = Math.floor(lon / 30);
    const naksIdx = Math.floor(lon / (360 / 27));
    const degInRashi = lon - rashiIdx * 30;
    let combust = false;
    if (p.combustible) {
      let diff = Math.abs(((lon - sunLon + 540) % 360) - 180);
      diff = 180 - diff; // shortest separation 0..180
      combust = diff < p.combustLimit;
    }
    out.push({
      key: p.key,
      nameHi: p.nameHi,
      nameEn: p.nameEn,
      degInRashi,
      rashi: { number: rashiIdx + 1, nameHi: RASHI_NAMES_HI[rashiIdx] || "", nameEn: RASHI_EN[rashiIdx] || "" },
      nakshatra: { number: naksIdx + 1, nameHi: NAKSHATRA_NAMES_HI[naksIdx] || "", nameEn: NAKSHATRA_NAMES_EN[naksIdx] || "" },
      retrograde: p.retrogradeable && speed < 0,
      combust,
    });
  }
  return out;
}

/** Build the 24-hour hora ribbon spanning sunrise → next sunrise. The vara's planetary
 *  lord rules the first day-hora; subsequent horas follow the Chaldean order
 *  Sat → Jup → Mars → Sun → Venus → Mercury → Moon → Sat... applied backward (i.e., the
 *  next hora's lord is the next planet 4 positions ahead — equivalent to walking the
 *  Chaldean cycle in reverse). Day horas are equal partitions of (sunset−sunrise)/12;
 *  night horas of (next sunrise − sunset)/12. Each lord has a base shubh/ashubh quality
 *  (Jupiter/Venus/Moon/Mercury = shubh; Mars/Saturn/Sun = ashubh; the rest neutral). */
const CHALDEAN_ORDER: Array<{ en: string; hi: string; type: "shubh" | "ashubh" | "neutral" }> = [
  { en: "Saturn",  hi: "शनि",    type: "ashubh" },
  { en: "Jupiter", hi: "गुरु",   type: "shubh" },
  { en: "Mars",    hi: "मंगल",   type: "ashubh" },
  { en: "Sun",     hi: "सूर्य",  type: "ashubh" },
  { en: "Venus",   hi: "शुक्र",  type: "shubh" },
  { en: "Mercury", hi: "बुध",    type: "neutral" },
  { en: "Moon",    hi: "चन्द्र", type: "shubh" },
];
function chaldeanIndexFor(varaLordEn: string): number {
  return Math.max(0, CHALDEAN_ORDER.findIndex((p) => p.en === varaLordEn));
}

function computeHoraRibbon(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date | null,
  vara: number,
  tz: number,
): NonNullable<PanchangDay["horaRibbon"]> {
  const out: NonNullable<PanchangDay["horaRibbon"]> = [];
  const dayMs = sunset.getTime() - sunrise.getTime();
  const nightMs = (nextSunrise?.getTime() ?? sunset.getTime() + dayMs) - sunset.getTime();
  const dayHora = dayMs / 12;
  const nightHora = nightMs / 12;
  const startIdx = chaldeanIndexFor(VARA_LORD[vara].en);
  // Day horas
  for (let i = 0; i < 12; i++) {
    const lord = CHALDEAN_ORDER[(startIdx + i) % 7];
    const s = new Date(sunrise.getTime() + i * dayHora);
    const e = new Date(sunrise.getTime() + (i + 1) * dayHora);
    out.push({
      number: i + 1,
      period: "day",
      lordEn: lord.en,
      lordHi: lord.hi,
      type: lord.type,
      startTime: formatTime(s, tz),
      endTime: formatTime(e, tz),
    });
  }
  // Night horas continue the Chaldean cycle (no reset)
  for (let i = 0; i < 12; i++) {
    const lord = CHALDEAN_ORDER[(startIdx + 12 + i) % 7];
    const s = new Date(sunset.getTime() + i * nightHora);
    const e = new Date(sunset.getTime() + (i + 1) * nightHora);
    out.push({
      number: 13 + i,
      period: "night",
      lordEn: lord.en,
      lordHi: lord.hi,
      type: lord.type,
      startTime: formatTime(s, tz),
      endTime: formatTime(e, tz),
    });
  }
  return out;
}

/** Dur-muhurta windows. Each weekday has a fixed pair of inauspicious "muhurta-slots"
 *  inside the day half (sunrise → sunset divided into 15 muhurtas of 1/15th day-length each).
 *  Slot indices are 1-based. Some weekdays have only one slot. Source: Vishvavallabha. */
const DUR_MUHURTA_SLOTS: Record<number, number[]> = {
  0: [14],            // Sun: 14th
  1: [12, 14],        // Mon
  2: [4, 8, 9],       // Tue
  3: [5],             // Wed
  4: [8, 9],          // Thu
  5: [2, 8, 9],       // Fri
  6: [1, 2],          // Sat
};

function computeDurMuhurta(sunrise: Date, sunset: Date, vara: number, tz: number): Array<{ start: string; end: string; nameHi: string; nameEn: string }> {
  const slots = DUR_MUHURTA_SLOTS[vara] || [];
  const muhurtaMs = (sunset.getTime() - sunrise.getTime()) / 15;
  return slots.map((slot, i) => {
    const start = new Date(sunrise.getTime() + (slot - 1) * muhurtaMs);
    const end = new Date(sunrise.getTime() + slot * muhurtaMs);
    return {
      start: formatTime(start, tz),
      end: formatTime(end, tz),
      nameHi: slots.length > 1 ? `दुर्मुहूर्त ${i + 1}` : "दुर्मुहूर्त",
      nameEn: slots.length > 1 ? `Dur-Muhurta ${i + 1}` : "Dur-Muhurta",
    };
  });
}

/** Split a bhadra raw period into mukh / madhya / puchchha sub-segments based on the
 *  classical 5:2:1 (mukh:madhya:puchchha) duration ratio, normalized over the 8-part
 *  classical bhadra division. Different schools use varying ratios; we use the most
 *  common Drik convention. */
function splitBhadraIntoParts(
  startTime: string,
  endTime: string,
  startMs: number,
  endMs: number,
  tz: number,
): Array<{ startTime: string; endTime: string; part: "mukh" | "madhya" | "puchchha" }> {
  const total = endMs - startMs;
  if (total <= 0) return [{ startTime, endTime, part: "madhya" }];
  // Mukh = 5/8, Madhya = 2/8, Puchchha = 1/8
  const mukhEnd = startMs + (5 / 8) * total;
  const madhyaEnd = startMs + (7 / 8) * total;
  const fmt = (ms: number) => formatTime(new Date(ms), tz);
  return [
    { startTime: fmt(startMs), endTime: fmt(mukhEnd), part: "mukh" },
    { startTime: fmt(mukhEnd), endTime: fmt(madhyaEnd), part: "madhya" },
    { startTime: fmt(madhyaEnd), endTime: fmt(endMs), part: "puchchha" },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-day computation
// ─────────────────────────────────────────────────────────────────────────────

function computeDay(date: Date, loc: LocationConfig): PanchangDay | null {
  const { sunrise, sunset } = sunRiseSet(date, loc);
  if (!sunrise || !sunset) return null;

  // Reference instant for tithi: sunrise + 6 ghati (Jain rule)
  const ref = new Date(sunrise.getTime() + SIX_GHATI_MS);

  // Tithi
  const ut = udayaTithiInfo(ref);
  const tithiInPaksha = ut.paksha === "Shukla" ? ut.tithi : ut.tithi - 15;
  const tithiIdx = Math.min(Math.max(tithiInPaksha - 1, 0), 14);
  const tithi15 = tithiInPaksha === 15 ? getTithi15Name(ut.paksha) : null;

  // Nakshatra/yoga/karana at sunrise (standard convention)
  const naksRaw = nakshatraAt(sunrise);
  const naksIdx = Math.min(Math.max(naksRaw - 1, 0), 26);
  const yogaRaw = yogaAt(sunrise);
  const yogaIdx = Math.min(Math.max(yogaRaw - 1, 0), 26);
  const karana = karanaInfoAt(sunrise);

  // Hindu month — Purnimanta primary (matches Excel), Amanta also exposed
  const masaPIdx = masaIndexPurnimanta(ref);
  const masaAIdx = masaIndexAmanta(ref);
  const hinduMonthEn = MASA_NAMES_EN[masaPIdx];
  const hinduMonthHi = HINDU_MONTHS.find((m) => m.en === hinduMonthEn)?.hi || hinduMonthEn;
  const hinduMonthAmantaEn = MASA_NAMES_EN[masaAIdx];
  const hinduMonthAmantaHi = HINDU_MONTHS.find((m) => m.en === hinduMonthAmantaEn)?.hi || hinduMonthAmantaEn;
  const adhika = isAdhikaMaasAmanta(ref);

  // Rashi
  const moonRashi = Math.floor(sidLong(C.SE_MOON, sunrise) / 30);
  const sunRashi = Math.floor(sidLong(C.SE_SUN, sunrise) / 30);
  const sunNak = Math.floor(sidLong(C.SE_SUN, sunrise) / (360 / 27));

  // Ritu, ayana
  const ritu = rituFromMasa(masaPIdx);
  const ayana = ayanaFromSunLong(sidLong(C.SE_SUN, sunrise));

  // Vara
  const localDate = new Date(date.getTime() + loc.tz * 60 * 1000);
  const vara = localDate.getUTCDay();

  const dateStr = formatDateStr(date, loc.tz);
  const pakshaLabelHi = ut.paksha === "Shukla" ? "शुक्ल" : "कृष्ण";
  const adhikaSuffixHi = adhika ? " (अधिक)" : "";
  const adhikaSuffixEn = adhika ? " (Adhika)" : "";
  const tithiNameHi = tithi15 ? tithi15.hi : (TITHI_NAMES_HI[tithiIdx] || `तिथि ${tithiInPaksha}`);
  const tithiNameEn = tithi15 ? tithi15.en : (TITHI_NAMES_EN[tithiIdx] || `Tithi ${tithiInPaksha}`);
  const vnsDateHi = `${hinduMonthHi}${adhikaSuffixHi} ${pakshaLabelHi} ${tithiNameHi}`;
  const vnsDateEn = `${hinduMonthEn}${adhikaSuffixEn} ${ut.paksha} ${tithiNameEn}`;

  // Special yogas — the qualifying vara×nakshatra (and for Tripushkar/Dvipushkar also
  // tithi) combination breaks at whichever ends first: the nakshatra, the tithi (where
  // it factors in), or the next sunrise (when the vara rolls over). Drikpanchang and
  // other authoritative sources end Sarvarthasiddhi at next sunrise when the qualifying
  // nakshatra extends past Monday's end.
  //
  // `nextSunriseForBoundary` is the next-day sunrise; the choghadiya block below
  // computes its own `nextSunrise` from `date+DAY_MS` (local midnight) — we replicate
  // the same boundary here so both paths agree.
  const specialYogas: SpecialYogaPeriod[] = [];
  const sunriseT = formatTime(sunrise, loc.tz);
  const sunsetT = formatTime(sunset, loc.tz);
  const tomorrowMidnightForSY = new Date(date.getTime() + DAY_MS);
  const { sunrise: nextSunriseForBoundary } = sunRiseSet(tomorrowMidnightForSY, loc);
  const naksEnd = nakshatraEndTime(sunrise);
  function earliestMs(...candidates: Array<Date | null>): Date | null {
    let best: Date | null = null;
    for (const c of candidates) {
      if (!c) continue;
      if (!best || c.getTime() < best.getTime()) best = c;
    }
    return best;
  }
  const naksOrSunriseEnd = earliestMs(naksEnd, nextSunriseForBoundary);
  const naksTithiOrSunriseEnd = earliestMs(naksEnd, ut.tithiEnd, nextSunriseForBoundary);
  const naksOrSunriseEndT = formatTime(naksOrSunriseEnd, loc.tz);
  const naksTithiOrSunriseEndT = formatTime(naksTithiOrSunriseEnd, loc.tz);

  if (vara === 0 && naksRaw === 8) {
    specialYogas.push({ key: "ravipushya", nameHi: "रवि पुष्य योग", nameEn: "Ravi Pushya Yoga", startTime: sunriseT, endTime: naksOrSunriseEndT });
  }
  if (vara === 4 && naksRaw === 8) {
    specialYogas.push({ key: "gurupushya", nameHi: "गुरु पुष्य योग", nameEn: "Guru Pushya Yoga", startTime: sunriseT, endTime: naksOrSunriseEndT });
  }
  if ((SARVARTHASIDDHI_BY_VARA[vara] || []).includes(naksRaw)) {
    specialYogas.push({ key: "sarvarthasiddhi", nameHi: "सर्वार्थसिद्धि योग", nameEn: "Sarvarthasiddhi Yoga", startTime: sunriseT, endTime: naksOrSunriseEndT });
  }
  if (AMRITSIDDHI_BY_VARA[vara] === naksRaw) {
    specialYogas.push({ key: "amrit-siddhi", nameHi: "अमृत सिद्धि योग", nameEn: "Amrit Siddhi Yoga", startTime: sunriseT, endTime: naksOrSunriseEndT });
  }
  // Ravi Yoga — Moon's nakshatra is in the 4th, 6th, 9th, 10th, 13th, or 20th
  // position (1-indexed, inclusive) from Sun's nakshatra at sunrise. Window runs
  // from sunrise to end of current moon-nakshatra (capped at next sunrise).
  {
    const sunNak0 = sunNak; // 0-indexed
    const moonNak0 = naksRaw - 1;
    const distance = ((moonNak0 - sunNak0) + 27) % 27 + 1; // 1-indexed
    if ([4, 6, 9, 10, 13, 20].includes(distance)) {
      specialYogas.push({ key: "ravi", nameHi: "रवि योग", nameEn: "Ravi Yoga", startTime: sunriseT, endTime: naksOrSunriseEndT });
    }
  }
  if (isTripushkar(vara, naksRaw, ut.tithi)) {
    specialYogas.push({ key: "tripushkar", nameHi: "त्रिपुष्कर योग", nameEn: "Tripushkar Yoga", startTime: sunriseT, endTime: naksTithiOrSunriseEndT });
  }
  if (isDvipushkar(vara, naksRaw, ut.tithi)) {
    specialYogas.push({ key: "dvipushkar", nameHi: "द्विपुष्कर योग", nameEn: "Dvipushkar Yoga", startTime: sunriseT, endTime: naksTithiOrSunriseEndT });
  }

  // ── Eclipses (Surya Grahan / Chandra Grahan) + Sutak ───────────────────────
  // We search for the eclipse nearest to today's reference instant in each
  // family. If the eclipse or its sutak window overlaps THIS panchang day
  // (sunrise → next sunrise), we surface it.
  const eclipses: NonNullable<PanchangDay["eclipses"]> = [];
  const dayStartMs = sunrise.getTime();
  const dayEndMs = (nextSunriseForBoundary ?? new Date(sunrise.getTime() + DAY_MS)).getTime();
  for (const eType of ["surya", "chandra"] as const) {
    const ecl = findNearEclipse(ref, eType, loc);
    if (!ecl) continue;
    const sutakLeadMs = (eType === "surya" ? 12 : 9) * 3600 * 1000;
    // Sutak window: [global first contact − lead, global last contact].
    // Uses GLOBAL astronomical times — sutak doesn't care about local visibility
    // of the start moment, only whether the eclipse is visible at all.
    const sutakStartMs = ecl.globalStartUtc.getTime() - sutakLeadMs;
    const sutakEndMs = ecl.globalEndUtc.getTime();
    const eclipseOverlapsDay = ecl.endUtc.getTime() > dayStartMs && ecl.startUtc.getTime() < dayEndMs;
    const sutakOverlapsDay = ecl.visible && sutakEndMs > dayStartMs && sutakStartMs < dayEndMs;
    if (!eclipseOverlapsDay && !sutakOverlapsDay) continue;
    eclipses.push({
      type: ecl.type,
      kind: ecl.kind,
      visible: ecl.visible,
      eclipseDate: ecl.eclipseDate,
      startTime: formatTime(ecl.startUtc, loc.tz),
      maxTime: formatTime(ecl.maxUtc, loc.tz),
      endTime: formatTime(ecl.endUtc, loc.tz),
      sutakStart: ecl.visible ? formatTime(new Date(sutakStartMs), loc.tz) : undefined,
      sutakEnd: ecl.visible ? formatTime(new Date(sutakEndMs), loc.tz) : undefined,
      magnitude: ecl.magnitude,
    });
  }

  // Bhadra (Vishti karana) periods within the civil day — sample at 30-min intervals,
  // then split each contiguous Vishti window into mukh / madhya / puchchha.
  type BhadraSeg = { startTime: string; endTime: string; part?: "mukh" | "madhya" | "puchchha" };
  // Bhadra (Vishti karana) periods within the panchang day (sunrise → next sunrise).
  // Sampling started at local midnight earlier — leaked pre-sunrise hours into the
  // reported windows. Now we scan from sunrise to next sunrise.
  const bhadraPeriods: BhadraSeg[] = [];
  const rawWindows: Array<{ startMs: number; endMs: number }> = [];
  let bhadraOpen: Date | null = null;
  const scanStartMs = sunrise.getTime();
  const scanEndMs = (nextSunriseForBoundary ?? new Date(sunrise.getTime() + DAY_MS)).getTime();
  const SAMPLE_MS = 5 * 60 * 1000;
  // Refine a coarse-sample transition down to ~5-sec precision via bisection.
  function refineEdge(t0: number, t1: number, openingState: boolean): number {
    let lo = t0, hi = t1;
    while (hi - lo > 5000) {
      const mid = (lo + hi) / 2;
      const isVishti = karanaInfoAt(new Date(mid)).name === "Vishti";
      if (isVishti === openingState) lo = mid; else hi = mid;
    }
    return openingState ? hi : lo;
  }
  let prevWasVishti = karanaInfoAt(new Date(scanStartMs)).name === "Vishti";
  if (prevWasVishti) bhadraOpen = new Date(scanStartMs);
  for (let probeMs = scanStartMs + SAMPLE_MS; probeMs <= scanEndMs; probeMs += SAMPLE_MS) {
    const isVishti = karanaInfoAt(new Date(probeMs)).name === "Vishti";
    if (isVishti && !prevWasVishti) {
      const edge = refineEdge(probeMs - SAMPLE_MS, probeMs, false);
      bhadraOpen = new Date(edge);
    } else if (!isVishti && prevWasVishti && bhadraOpen) {
      const edge = refineEdge(probeMs - SAMPLE_MS, probeMs, true);
      rawWindows.push({ startMs: bhadraOpen.getTime(), endMs: edge });
      bhadraOpen = null;
    }
    prevWasVishti = isVishti;
  }
  if (bhadraOpen) {
    rawWindows.push({ startMs: bhadraOpen.getTime(), endMs: scanEndMs });
  }
  for (const w of rawWindows) {
    const startStr = formatTime(new Date(w.startMs), loc.tz);
    const endStr = formatTime(new Date(w.endMs), loc.tz);
    const parts = splitBhadraIntoParts(startStr, endStr, w.startMs, w.endMs, loc.tz);
    bhadraPeriods.push(...parts);
  }
  const isBhadraActive = bhadraPeriods.length > 0;

  const isPanchak = naksRaw >= 23 && naksRaw <= 27;
  const isMool = [1, 9, 10, 18, 19, 27].includes(naksRaw);

  // Muhurtas — Brahma Muhurta needs night length (sunset → next sunrise) to apply
  // the Drik-Panchang night/15 proportional formula. Reuse the already-computed
  // next-day sunrise from the special-yogas section.
  const nightMs = nextSunriseForBoundary ? nextSunriseForBoundary.getTime() - sunset.getTime() : undefined;
  const muhurtas = computeMuhurtas(sunrise, sunset, vara, loc.tz, nightMs);

  // Choghadiya — needs next day's sunrise (reuse from special-yogas section).
  const nextSunrise = nextSunriseForBoundary;
  const choghadiya = nextSunrise ? computeChoghadiya(sunrise, sunset, nextSunrise, vara, loc.tz) : undefined;

  // Extra muhurtas (Vijaya, Godhuli, Sandhya, Nishita)
  const extraMuhurtas = computeExtraMuhurtas(sunrise, sunset, nextSunrise, loc.tz);

  // 30 Nitya Muhurtas (15 day + 15 night)
  const nityaMuhurtas = computeNityaMuhurtas(sunrise, sunset, nextSunrise, vara, loc.tz);

  // Planet table at sunrise (longitude, rashi, nakshatra, retrograde, combust).
  const planets = computePlanets(sunrise);

  // 24-hour Hora ribbon (sunrise → next sunrise, day & night each split into 12 horas).
  const horaRibbon = computeHoraRibbon(sunrise, sunset, nextSunrise, vara, loc.tz);

  // Dur-muhurta — short inauspicious slots within the day half (1–3 per weekday).
  const durMuhurta = computeDurMuhurta(sunrise, sunset, vara, loc.tz);

  // Karana / yoga sequences for the civil day (sunrise → next sunrise)
  const dayEnd = nextSunrise ?? new Date(sunrise.getTime() + DAY_MS);
  const karanaSequence = karanasInWindow(sunrise, dayEnd).map((k) => ({
    nameHi: KARANA_NAMES_HI[k.name] || k.name,
    nameEn: k.name,
    endTime: formatTime(k.endTime, loc.tz),
  }));
  const yogaSequence = yogasInWindow(sunrise, dayEnd).map((y) => {
    const yi = Math.min(Math.max(y.index - 1, 0), 26);
    return {
      number: y.index,
      nameHi: YOGA_NAMES_HI[yi] || "",
      nameEn: YOGA_NAMES_EN[yi] || "",
      endTime: formatTime(y.endTime, loc.tz),
    };
  });

  // Lagna (rising sign) at sunrise
  const lagnaIdx = lagnaAt(sunrise, loc.lat, loc.lng);
  const lagna = {
    number: lagnaIdx + 1,
    nameHi: RASHI_NAMES_HI[lagnaIdx] || "",
    nameEn: RASHI_EN[lagnaIdx] || "",
  };

  // Anandadi yoga
  const anandadi = computeAnandadiYoga(naksRaw, vara);

  // Disha shool + Vara shoola
  const dishaShool = DISHA_SHOOL[vara];
  const varaShoola = VARA_SHOOLA[vara];

  // Day duration
  const dayDuration = formatDuration(sunset.getTime() - sunrise.getTime());

  // Samvats:
  //   Vikram Samvat ≈ civilYear + 56/57 (depends on Chaitra Shukla 1 boundary)
  //   Shaka Samvat  = civilYear - 78
  //   Vir Nirvan Samvat = civilYear + 526/527 (Mahavir's Nirvana, 527 BCE; boundary = Diwali)
  //   Mahavir Janma Samvat = civilYear + 598/599 (Mahavir's birth, 599 BCE; boundary = Mahavir
  //     Jayanti / Chaitra Shukla 13). VNS year fill-in (Diwali boundary) happens post-pass.
  const civilYear = localDate.getUTCFullYear();
  const samvats = {
    vikram: civilYear + 56,
    shaka: civilYear - 78,
    virNirvan: civilYear + 526,    // refined post-Diwali in second pass
    mahavirJanma: civilYear + 599,
  };

  // Moonrise / moonset for the same civil day
  const { moonrise, moonset } = moonRiseSet(date, loc);

  const day: PanchangDay = {
    date: dateStr,
    vnsYear: samvats.virNirvan, // refined later
    vnsDateHi,
    vnsDateEn,
    varaHi: VARA_HI[vara],
    varaEn: VARA_EN[vara],
    tithi: {
      number: tithiInPaksha,
      nameHi: tithi15 ? tithi15.hi : (TITHI_NAMES_HI[tithiIdx] || `तिथि ${tithiInPaksha}`),
      nameEn: tithi15 ? tithi15.en : (TITHI_NAMES_EN[tithiIdx] || `Tithi ${tithiInPaksha}`),
      pakshaHi: ut.paksha === "Shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष",
      pakshaEn: ut.paksha === "Shukla" ? "Shukla Paksha" : "Krishna Paksha",
      startTime: formatTime(ut.tithiStart, loc.tz),
      endTime: formatTime(ut.tithiEnd, loc.tz),
    },
    hinduMonth: { hi: hinduMonthHi, en: hinduMonthEn },
    hinduMonthAmanta: { hi: hinduMonthAmantaHi, en: hinduMonthAmantaEn },
    hinduMonthPurnimanta: { hi: hinduMonthHi, en: hinduMonthEn },
    todayEvents: [],
    upcomingEvents: [],
    nakshatra: {
      number: naksRaw,
      nameHi: NAKSHATRA_NAMES_HI[naksIdx] || "",
      nameEn: NAKSHATRA_NAMES_EN[naksIdx] || "",
      endTime: formatTime(nakshatraEndTime(sunrise), loc.tz),
    },
    yoga: {
      number: yogaRaw,
      nameHi: YOGA_NAMES_HI[yogaIdx] || "",
      nameEn: YOGA_NAMES_EN[yogaIdx] || "",
      endTime: formatTime(yogaEndTime(sunrise), loc.tz),
    },
    karana: {
      nameHi: KARANA_NAMES_HI[karana.name] || karana.name,
      nameEn: karana.name,
      endTime: formatTime(karanaEndTime(sunrise), loc.tz),
    },
    sunTimes: {
      sunrise: sunriseT,
      sunset: sunsetT,
      moonrise: formatTime(moonrise, loc.tz),
      moonset: formatTime(moonset, loc.tz),
    },
    rahuKalam: muhurtas.rahuKalam ? { start: muhurtas.rahuKalam.start, end: muhurtas.rahuKalam.end } : undefined,
    masaIsAdhika: adhika,
    ritu,
    ayana,
    moonRashi: { number: moonRashi + 1, nameHi: RASHI_NAMES_HI[moonRashi] || "", nameEn: RASHI_EN[moonRashi] || "" },
    sunRashi: { number: sunRashi + 1, nameHi: RASHI_NAMES_HI[sunRashi] || "", nameEn: RASHI_EN[sunRashi] || "" },
    sunNakshatra: { number: sunNak + 1, nameHi: NAKSHATRA_NAMES_HI[sunNak] || "", nameEn: NAKSHATRA_NAMES_EN[sunNak] || "" },
    specialYogas: specialYogas.length > 0 ? specialYogas : undefined,
    panchak: isPanchak,
    bhadra: isBhadraActive ? { active: true, periods: bhadraPeriods } : { active: false },
    mool: isMool,
    eclipses: eclipses.length > 0 ? eclipses : undefined,
    muhurtas,
    choghadiya,
    dishaShool: { direction: dishaShool.en, directionHi: dishaShool.hi },
    anandadiYoga: anandadi,
    dayDuration,
    samvats,
    rasTyag: RAS_TYAG_BY_VARA[vara],
    nakshatraPada: nakshatraPadaAt(sunrise),
    tithiPravritti: tithiPravrittiOf(tithiInPaksha),
    horaLordSunrise: { planetEn: VARA_LORD[vara].en, planetHi: VARA_LORD[vara].hi },
    karanaSequence,
    yogaSequence,
    lagnaAtSunrise: lagna,
    varaShoola: { direction: varaShoola.en, directionHi: varaShoola.hi },
    extraMuhurtas,
    nityaMuhurtas,
    planets,
    horaRibbon,
    durMuhurta: durMuhurta.length > 0 ? durMuhurta : undefined,
  };
  return day;
}

/** Lightweight tomorrow preview — just vara + tithi headline. Not the full panchang.
 * Used for the "कल" pill on page 5 of the daily widget. */
function computeTomorrowPreview(date: Date, loc: LocationConfig): NonNullable<PanchangDay["tomorrow"]> | null {
  const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const { sunrise } = sunRiseSet(tomorrow, loc);
  if (!sunrise) return null;
  const ref = new Date(sunrise.getTime() + SIX_GHATI_MS);
  const ut = udayaTithiInfo(ref);
  const tithiInPaksha = ut.paksha === "Shukla" ? ut.tithi : ut.tithi - 15;
  const tithiIdx = Math.min(Math.max(tithiInPaksha - 1, 0), 14);
  const tithi15 = tithiInPaksha === 15 ? getTithi15Name(ut.paksha) : null;
  const tithiNameHi = tithi15 ? tithi15.hi : (TITHI_NAMES_HI[tithiIdx] || `तिथि ${tithiInPaksha}`);
  const tithiNameEn = tithi15 ? tithi15.en : (TITHI_NAMES_EN[tithiIdx] || `Tithi ${tithiInPaksha}`);
  const masaPIdx = masaIndexPurnimanta(ref);
  const masaEn = MASA_NAMES_EN[masaPIdx];
  const masaHi = HINDU_MONTHS.find((m) => m.en === masaEn)?.hi || masaEn;
  const pakshaHi = ut.paksha === "Shukla" ? "शुक्ल" : "कृष्ण";
  const pakshaEn = ut.paksha;
  const local = new Date(tomorrow.getTime() + loc.tz * 60 * 1000);
  const varaIdx = local.getUTCDay();
  return {
    date: formatDateStr(tomorrow, loc.tz),
    varaHi: VARA_HI[varaIdx],
    varaEn: VARA_EN[varaIdx],
    tithiHeadlineHi: `${masaHi} ${pakshaHi} ${tithiNameHi}`,
    tithiHeadlineEn: `${masaEn} ${pakshaEn} ${tithiNameEn}`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Top-level generation
// ─────────────────────────────────────────────────────────────────────────────

export interface GenerateOptions {
  startDate: Date;     // local-tz midnight of the first day
  totalDays: number;
  events: JainEvent[];
  location: LocationConfig;
  onProgress?: (done: number, total: number) => void;
}

export function generatePanchang(opts: GenerateOptions): PanchangDay[] {
  const { startDate, totalDays, events, location, onProgress } = opts;
  const activeEvents = events.filter((e) => e.isActive);
  const allDays: PanchangDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + i,
    );
    const day = computeDay(date, location);
    if (day) allDays.push(day);
    onProgress?.(i + 1, totalDays);
  }

  // Match events. The seeded events DB mixes calendar conventions: kalyanaks/parvas come from
  // sources that variously use Amanta or Purnimanta naming (e.g., Diwali = Kartik Krishna 15 is
  // Amanta; Shantinath = Jyeshtha Krishna 14 is Purnimanta). Each match call is told which
  // convention is the "current month" name, and individual events declare their preferred
  // convention via `monthConvention` (default = "either" — match against either Amanta or
  // Purnimanta). Jain multi-day vrats explicitly set "amanta" so they don't double-fire.
  for (const day of allDays) {
    const paksha = day.tithi.pakshaEn.includes("Shukla") ? "Shukla" : "Krishna";
    const naksNum = day.nakshatra?.number ?? 0;
    const purnamantaMonth = day.hinduMonth.en;
    const amantaMonth = day.hinduMonthAmanta?.en ?? day.hinduMonth.en;
    // Always run BOTH passes — even when the two conventions agree on the month name. The
    // event's `monthConvention` decides which pass(es) it can match in. Skipping a pass when
    // names happen to agree would silently drop Amanta-only or Purnimanta-only events.
    const matchedP = matchEventsForDate(
      day.date, new Date(day.date).getFullYear(), purnamantaMonth, paksha,
      day.tithi.number, naksNum, !!day.masaIsAdhika, activeEvents, "purnimanta",
    );
    const matchedA = matchEventsForDate(
      day.date, new Date(day.date).getFullYear(), amantaMonth, paksha,
      day.tithi.number, naksNum, !!day.masaIsAdhika, activeEvents, "amanta",
    );
    // Merge, dedupe by eventId
    const seen = new Set<string>();
    const merged: typeof matchedP = [];
    for (const e of [...matchedP, ...matchedA]) {
      if (!seen.has(e.eventId)) { seen.add(e.eventId); merged.push(e); }
    }
    day.todayEvents = merged;
  }

  // Day-over-day transit detection
  for (let i = 1; i < allDays.length; i++) {
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

  // Kshaya & vriddhi
  for (let i = 1; i < allDays.length; i++) {
    const prev = allDays[i - 1];
    const curr = allDays[i];
    if (prev.hinduMonth.en === curr.hinduMonth.en && prev.tithi.pakshaEn === curr.tithi.pakshaEn) {
      const gap = curr.tithi.number - prev.tithi.number;
      if (gap === 2) {
        const skippedNum = prev.tithi.number + 1;
        const skippedIdx = Math.min(Math.max(skippedNum - 1, 0), 14);
        const skipped15 = skippedNum === 15
          ? getTithi15Name(prev.tithi.pakshaEn.includes("Shukla") ? "Shukla" : "Krishna")
          : null;
        prev.kshayaTithi = {
          number: skippedNum,
          nameHi: skipped15 ? skipped15.hi : (TITHI_NAMES_HI[skippedIdx] || `तिथि ${skippedNum}`),
          nameEn: skipped15 ? skipped15.en : (TITHI_NAMES_EN[skippedIdx] || `Tithi ${skippedNum}`),
        };
        const paksha = prev.tithi.pakshaEn.includes("Shukla") ? "Shukla" : "Krishna";
        const purnaM = prev.hinduMonth.en;
        const amantaM = prev.hinduMonthAmanta?.en ?? purnaM;
        // Always run both passes (see the matching loop above for why).
        const skippedP = matchEventsForDate(
          prev.date, new Date(prev.date).getFullYear(), purnaM, paksha,
          skippedNum, prev.nakshatra?.number ?? 0, !!prev.masaIsAdhika, activeEvents, "purnimanta",
        );
        const skippedA = matchEventsForDate(
          prev.date, new Date(prev.date).getFullYear(), amantaM, paksha,
          skippedNum, prev.nakshatra?.number ?? 0, !!prev.masaIsAdhika, activeEvents, "amanta",
        );
        const seen = new Set(prev.todayEvents.map((e) => e.eventId));
        for (const e of [...skippedP, ...skippedA]) {
          if (!seen.has(e.eventId)) { seen.add(e.eventId); prev.todayEvents.push(e); }
        }
      }
    }
    if (
      prev.hinduMonth.en === curr.hinduMonth.en &&
      prev.tithi.pakshaEn === curr.tithi.pakshaEn &&
      prev.tithi.number === curr.tithi.number
    ) {
      curr.isVriddhiRepeat = true;
      const seen = new Set(prev.todayEvents.map((e) => e.eventId));
      for (const e of curr.todayEvents) if (!seen.has(e.eventId)) prev.todayEvents.push(e);
      curr.todayEvents = [];
    }
  }

  // First-occurrence-wins (adhika-maas de-dup)
  //
  // Single-tithi events (like a kalyanak on Jyeshtha Krishna 14) can match twice in an adhika-maas
  // year — once in nija Jyeshtha and once in adhika Jyeshtha. We keep only the first match per
  // civil year. Adhika-aware matching (via `adhikaMaasPolicy`) already handles the policy;
  // this rule is a safety net for events without an explicit policy.
  //
  // EXEMPT (always fire, no de-dup):
  //  - fixedDate / nakshatraRule events (no calendar ambiguity)
  //  - tithiRange (multi-day vrats): these intrinsically fire multiple days, can legitimately
  //    fire in multiple months of the year (Ratnatraya: Magha + Chaitra + Bhadrapada), and the
  //    dual-calendar matching (Amanta + Purnimanta) produces gap-firings that shouldn't be
  //    suppressed. Their `adhikaMaasPolicy` already controls adhika behavior.
  {
    const eventLookup = new Map(activeEvents.map((e) => [e.id, e]));
    const lastFiredIdx = new Map<string, number>();
    for (let i = 0; i < allDays.length; i++) {
      const day = allDays[i];
      const filtered: typeof day.todayEvents = [];
      for (const evt of day.todayEvents) {
        const def = eventLookup.get(evt.eventId);
        const alwaysFire = !!(def?.fixedDate || def?.nakshatraRule || def?.tithiRange);
        if (alwaysFire) { filtered.push(evt); continue; }
        const last = lastFiredIdx.get(evt.eventId);
        if (last === undefined || last === i - 1) {
          filtered.push(evt);
          lastFiredIdx.set(evt.eventId, i);
        }
      }
      day.todayEvents = filtered;
    }
  }

  // Refine samvat year boundaries:
  //   Vir Nirvan Samvat — boundary = Diwali (Kartik Krishna Amavasya)
  //   Vikram Samvat — boundary = Chaitra Shukla 1 (start of new lunar year)
  //   Mahavir Janma Samvat — boundary = Chaitra Shukla 13 (Mahavir Jayanti)
  const approxDiwali: Record<number, string> = {
    2024: "2024-11-01", 2025: "2025-10-20", 2026: "2026-11-08", 2027: "2027-10-29",
    2028: "2028-10-17", 2029: "2029-11-05", 2030: "2030-10-26",
  };
  // Find each year's Chaitra Shukla 1 by scanning allDays (for Vikram Samvat boundary)
  const chaitraShukla1ByYear: Record<number, string> = {};
  for (const day of allDays) {
    const yr = new Date(day.date).getFullYear();
    if (
      day.hinduMonth.en === "Chaitra" &&
      day.tithi.pakshaEn.includes("Shukla") &&
      day.tithi.number === 1 &&
      !chaitraShukla1ByYear[yr]
    ) {
      chaitraShukla1ByYear[yr] = day.date;
    }
  }
  for (const day of allDays) {
    const d = new Date(day.date);
    const yr = d.getFullYear();
    // Vir Nirvan Samvat: increments at Diwali (Kartik Krishna Amavasya)
    const diwali = approxDiwali[yr] ? new Date(approxDiwali[yr]) : new Date(yr, 9, 25);
    const vns = d >= diwali ? yr + 527 : yr + 526;
    day.vnsYear = vns;
    // Vikram Samvat: increments at Chaitra Shukla 1
    const cs1 = chaitraShukla1ByYear[yr] ? new Date(chaitraShukla1ByYear[yr]) : new Date(yr, 2, 22);
    const vikram = d >= cs1 ? yr + 57 : yr + 56;
    // Mahavir Janma Samvat = Vir Nirvan Samvat + 73 (Mahavir lived 72 years; the "Janma Samvat"
    // is conventionally locked to the same Diwali boundary as Nirvan Samvat by the published
    // तीर्थंकर वर्धमान जैन पंचांग, both incrementing together).
    const mjs = vns + 73;
    if (day.samvats) {
      day.samvats.virNirvan = vns;
      day.samvats.vikram = vikram;
      day.samvats.mahavirJanma = mjs;
    }
  }

  // Upcoming events — up to 14 days ahead (capped by the generated window).
  for (let i = 0; i < allDays.length; i++) {
    const upcoming: UpcomingEvent[] = [];
    for (let j = i + 1; j < Math.min(i + 15, allDays.length); j++) {
      for (const evt of allDays[j].todayEvents) {
        upcoming.push({ eventId: evt.eventId, nameHi: evt.nameHi, nameEn: evt.nameEn, date: allDays[j].date });
      }
    }
    allDays[i].upcomingEvents = upcoming;
  }

  // Tomorrow preview — pull straight from the next day in the generated window when possible,
  // else compute it on the fly.
  for (let i = 0; i < allDays.length; i++) {
    const day = allDays[i];
    const next = allDays[i + 1];
    if (next) {
      const adhHi = next.masaIsAdhika ? " (अधिक)" : "";
      const adhEn = next.masaIsAdhika ? " (Adhika)" : "";
      day.tomorrow = {
        date: next.date,
        varaHi: next.varaHi,
        varaEn: next.varaEn,
        tithiHeadlineHi: `${next.hinduMonth.hi}${adhHi} ${next.tithi.pakshaHi.replace(" पक्ष", "")} ${next.tithi.nameHi}`,
        tithiHeadlineEn: `${next.hinduMonth.en}${adhEn} ${next.tithi.pakshaEn.replace(" Paksha", "")} ${next.tithi.nameEn}`,
      };
    } else {
      const [y, m, d] = day.date.split("-").map(Number);
      const todayDate = new Date(y, m - 1, d);
      const preview = computeTomorrowPreview(todayDate, location);
      if (preview) day.tomorrow = preview;
    }
  }

  return allDays;
}

// ─────────────────────────────────────────────────────────────────────────────
// Single-day computation (for daily-share card)
// ─────────────────────────────────────────────────────────────────────────────

export function computeSingleDay(date: Date, events: JainEvent[], location: LocationConfig): PanchangDay | null {
  // Window: 1 day before (for kshaya/vriddhi/transit detection where target is `curr`)
  // + target + 14 days after (for the "next 14 days" upcoming-events list and so the
  // target can be the `prev` in kshaya detection against tomorrow).
  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  const days = generatePanchang({ startDate, totalDays: 16, events, location });
  return days.find((d) => {
    const target = new Date(date);
    return d.date === formatDateStr(target, location.tz);
  }) ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Event matcher (mirrors the browser engine)
// ─────────────────────────────────────────────────────────────────────────────

function matchEventsForDate(
  dateStr: string,
  year: number,
  hinduMonth: string,
  paksha: string,
  tithiNumber: number,
  nakshatraNumber: number,
  masaIsAdhika: boolean,
  events: JainEvent[],
  /** Convention of the `hinduMonth` we were called with. Events whose `monthConvention`
   *  doesn't match this (and isn't "either") are skipped on this pass. */
  callerConvention: "amanta" | "purnimanta",
): EventSummary[] {
  const matched: EventSummary[] = [];
  const yearStr = String(year);
  for (const event of events) {
    // Convention filter — only applies to month/tithi-based events (fixedDate, nakshatraRule,
    // and gregorianOverrides events bypass calendar conventions entirely).
    const isCalendarBased = !event.fixedDate && !event.gregorianOverrides && !event.nakshatraRule;
    if (isCalendarBased) {
      const want = event.monthConvention ?? "either";
      if (want !== "either" && want !== callerConvention) continue;
    }
    let isMatch = false;
    if (event.fixedDate && dateStr.endsWith(event.fixedDate)) isMatch = true;
    else if (event.gregorianOverrides && event.gregorianOverrides[yearStr] === dateStr) isMatch = true;
    else if (event.nakshatraRule && event.nakshatraRule.nakshatraNumber === nakshatraNumber) isMatch = true;
    else if (
      event.tithiRange &&
      event.hinduMonth === hinduMonth &&
      event.hinduPaksha === paksha &&
      tithiNumber >= event.tithiRange.startTithi &&
      tithiNumber <= event.tithiRange.endTithi
    ) isMatch = true;
    else if (
      event.hinduMonth &&
      event.hinduMonth === hinduMonth &&
      event.hinduPaksha === paksha &&
      event.hinduTithi === tithiNumber
    ) isMatch = true;
    if (isMatch && !event.fixedDate && !event.gregorianOverrides?.[yearStr]) {
      const policy = event.adhikaMaasPolicy ?? "both";
      if (policy === "nija-only" && masaIsAdhika) isMatch = false;
      else if (policy === "adhika-only" && !masaIsAdhika) isMatch = false;
      else if (policy === "skip") isMatch = false;
    }
    if (isMatch) {
      matched.push({
        eventId: event.id, nameHi: event.nameHi, nameEn: event.nameEn,
        category: event.category, colorTheme: event.colorTheme,
      });
    }
  }
  return matched;
}
