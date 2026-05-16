// Muhurta-finder scoring engine.
//
// Input: a PanchangDay + a MuhurtaEventRules. Output: a verdict (favorable / mixed /
// avoid), an ordered list of reasons (positive and negative), and a set of recommended
// sub-day windows derived by intersecting the day's choghadiya + abhijit + brahma muhurta
// with the day's "clean" intervals (outside bhadra).
//
// Universal hard exclusions applied to every event:
//   - Yoga = Vyatipata (17) or Vaidhriti (27) → automatic AVOID
//   - Karana = Vishti (Bhadra active) when `avoidBhadra` is set → contributes to AVOID
//
// The scoring is conservative: any single hard exclusion produces AVOID. Without a
// hard exclusion, the day is FAVORABLE if no negatives apply; MIXED if some negatives
// and some positives co-exist.

import type { PanchangDay } from "./types";
import type { MuhurtaEventRules } from "./muhurta-events";
import {
  NAKSHATRA_NAMES_HI_BY_NUM, NAKSHATRA_NAMES_EN_BY_NUM,
  YOGA_NAMES_HI_BY_NUM, YOGA_NAMES_EN_BY_NUM,
} from "./muhurta-events";

export type Verdict = "favorable" | "mixed" | "avoid";

export interface MuhurtaReason {
  /** "+" positive (supports muhurta) / "-" negative (degrades) / "x" hard exclusion */
  kind: "+" | "-" | "x";
  textHi: string;
  textEn: string;
}

export interface RecommendedWindow {
  start: string; // HH:MM
  end: string;
  labelHi: string;
  labelEn: string;
  /** "ati-shubh" boosts ranking when a special yoga overlaps. */
  rank: "ati-shubh" | "shubh";
}

export interface MuhurtaDayResult {
  date: string;
  varaHi: string;
  varaEn: string;
  tithiHeadlineHi: string;
  tithiHeadlineEn: string;
  nakshatraHi?: string;
  nakshatraEn?: string;
  verdict: Verdict;
  reasons: MuhurtaReason[];
  windows: RecommendedWindow[];
  /** For multi-day events: end date (inclusive) of the proposed window. */
  endDate?: string;
  /** For multi-day events: number of days. */
  durationDays?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const VARA_INDEX_FROM_EN: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

const VARA_NAMES_HI = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];

function varaIndex(day: PanchangDay): number {
  return VARA_INDEX_FROM_EN[day.varaEn] ?? 0;
}

function pakshaIsShukla(day: PanchangDay): boolean {
  return day.tithi.pakshaEn.includes("Shukla");
}

/** Sidereal Capricorn (9) through Gemini (2) — Uttarayana per drik-Jain convention. */
function isUttarayana(day: PanchangDay): boolean {
  const sunRashi = day.sunRashi?.number;
  if (sunRashi === undefined) return true; // unknown — don't gate
  return sunRashi >= 9 || sunRashi <= 2;
}

// ─────────────────────────────────────────────────────────────────────────────
// Universal hard exclusions
// ─────────────────────────────────────────────────────────────────────────────

function applyUniversalExclusions(day: PanchangDay, reasons: MuhurtaReason[]): boolean {
  let hardExclude = false;
  const yogaNum = day.yoga?.number;
  if (yogaNum === 17) { // Vyatipata
    reasons.push({ kind: "x", textHi: "व्यतीपात योग — सर्वशुभकर्म वर्जित", textEn: "Vyatipata yoga — bars all shubh karma" });
    hardExclude = true;
  }
  if (yogaNum === 27) { // Vaidhriti
    reasons.push({ kind: "x", textHi: "वैधृति योग — सर्वशुभकर्म वर्जित", textEn: "Vaidhriti yoga — bars all shubh karma" });
    hardExclude = true;
  }
  return hardExclude;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule application
// ─────────────────────────────────────────────────────────────────────────────

function applyRules(day: PanchangDay, ev: MuhurtaEventRules): {
  verdict: Verdict;
  reasons: MuhurtaReason[];
} {
  const reasons: MuhurtaReason[] = [];
  const r = ev.rules;

  let hardExclude = applyUniversalExclusions(day, reasons);
  let negatives = 0;
  let positives = 0;

  // ── Tithi ────────────────────────────────────────────────────────────────
  const tNum = day.tithi.number;
  const shukla = pakshaIsShukla(day);
  const isAmavasya = !shukla && tNum === 15;
  const isPurnima = shukla && tNum === 15;

  if (r.avoidAmavasya && isAmavasya) {
    reasons.push({ kind: "x", textHi: "अमावस्या वर्जित", textEn: "Amavasya — avoided" });
    hardExclude = true;
  }
  // Dedupe: only count one tithi-avoid even if both the general and paksha-specific lists fire.
  const tithiAvoided =
    r.avoidTithis?.includes(tNum) ||
    (shukla && r.avoidTithisShukla?.includes(tNum)) ||
    (!shukla && r.avoidTithisKrishna?.includes(tNum));
  if (tithiAvoided) {
    reasons.push({ kind: "-", textHi: `तिथि ${day.tithi.nameHi} (${shukla ? "शुक्ल" : "कृष्ण"} ${tNum}) वर्जित`, textEn: `Tithi ${day.tithi.nameEn} (${shukla ? "Shukla" : "Krishna"} ${tNum}) avoided` });
    negatives++;
  }
  if (r.favorableTithis?.includes(tNum) && !r.avoidTithis?.includes(tNum)) {
    reasons.push({ kind: "+", textHi: `तिथि ${day.tithi.nameHi} (${tNum}) श्रेष्ठ`, textEn: `Tithi ${day.tithi.nameEn} (${tNum}) favorable` });
    positives++;
  }
  if (r.preferShuklaPaksha && !shukla && tNum > 10) {
    reasons.push({ kind: "-", textHi: "कृष्ण पक्ष एकादशी के बाद की तिथि — शुक्ल पक्ष श्रेष्ठ", textEn: "Krishna paksha post-Ekadashi — Shukla preferred" });
    negatives++;
  }

  // ── Nakshatra ────────────────────────────────────────────────────────────
  const nNum = day.nakshatra?.number;
  if (nNum !== undefined) {
    const nHi = NAKSHATRA_NAMES_HI_BY_NUM[nNum];
    const nEn = NAKSHATRA_NAMES_EN_BY_NUM[nNum];
    if (r.avoidNakshatras?.includes(nNum)) {
      reasons.push({ kind: "-", textHi: `नक्षत्र ${nHi} वर्जित`, textEn: `Nakshatra ${nEn} avoided` });
      negatives++;
    }
    if (r.favorableNakshatras?.includes(nNum)) {
      reasons.push({ kind: "+", textHi: `नक्षत्र ${nHi} श्रेष्ठ`, textEn: `Nakshatra ${nEn} favorable` });
      positives++;
    }
  }

  // ── Yoga ─────────────────────────────────────────────────────────────────
  const yNum = day.yoga?.number;
  if (yNum !== undefined) {
    const yHi = YOGA_NAMES_HI_BY_NUM[yNum];
    const yEn = YOGA_NAMES_EN_BY_NUM[yNum];
    if (r.avoidYogas?.includes(yNum) && yNum !== 17 && yNum !== 27) {
      // 17, 27 already counted as hard exclusion above
      reasons.push({ kind: "-", textHi: `योग ${yHi} वर्जित`, textEn: `Yoga ${yEn} avoided` });
      negatives++;
    }
    if (r.favorableYogas?.includes(yNum)) {
      reasons.push({ kind: "+", textHi: `योग ${yHi} श्रेष्ठ`, textEn: `Yoga ${yEn} favorable` });
      positives++;
    }
  }

  // ── Vara ─────────────────────────────────────────────────────────────────
  const v = varaIndex(day);
  if (r.avoidVaras?.includes(v)) {
    reasons.push({ kind: "-", textHi: `${VARA_NAMES_HI[v]} वर्जित`, textEn: `${day.varaEn} avoided` });
    negatives++;
  }
  if (r.favorableVaras?.includes(v)) {
    reasons.push({ kind: "+", textHi: `${VARA_NAMES_HI[v]} श्रेष्ठ`, textEn: `${day.varaEn} favorable` });
    positives++;
  }

  // ── Karana = Vishti (Bhadra) ─────────────────────────────────────────────
  if (r.avoidBhadra && day.bhadra?.active) {
    reasons.push({ kind: "-", textHi: "भद्रा (विष्टि) सक्रिय — कार्य भद्रा के बाद करें", textEn: "Bhadra (Vishti) active — perform after bhadra ends" });
    negatives++;
  }

  // ── Panchak / Mool ───────────────────────────────────────────────────────
  if (r.avoidPanchak && day.panchak) {
    reasons.push({ kind: "-", textHi: "पंचक सक्रिय", textEn: "Panchak active" });
    negatives++;
  }
  if (r.avoidMool && day.mool) {
    reasons.push({ kind: "-", textHi: "मूल / गण्डान्त", textEn: "Mool / Gandanta" });
    negatives++;
  }

  // ── Moon rashi ───────────────────────────────────────────────────────────
  const mr = day.moonRashi?.number;
  if (mr !== undefined) {
    if (r.avoidMoonRashis?.includes(mr)) {
      reasons.push({ kind: "-", textHi: `चन्द्र-राशि ${day.moonRashi?.nameHi} वर्जित`, textEn: `Moon in ${day.moonRashi?.nameEn} avoided` });
      negatives++;
    }
    if (r.favorableMoonRashis?.includes(mr)) {
      reasons.push({ kind: "+", textHi: `चन्द्र-राशि ${day.moonRashi?.nameHi} श्रेष्ठ`, textEn: `Moon in ${day.moonRashi?.nameEn} favorable` });
      positives++;
    }
  }

  // ── Uttarayana ───────────────────────────────────────────────────────────
  if (r.requireUttarayana && !isUttarayana(day)) {
    reasons.push({ kind: "-", textHi: "दक्षिणायन — संस्कार-कर्म के लिए शास्त्र-सम्मत नहीं", textEn: "Dakshinayana — not preferred for sanskara karma" });
    negatives++;
  }

  // ── Special yogas (bonuses) — Sarvarthasiddhi/Amrit/Pushya combos are "ati-shubh"
  // and per classical convention can overcome several minor doshas. Weight them at +2.
  let hasAtiShubh = false;
  for (const sy of day.specialYogas ?? []) {
    if (sy.key === "sarvarthasiddhi") {
      reasons.push({ kind: "+", textHi: "सर्वार्थसिद्धि योग — अति-शुभ (दोषनाशक)", textEn: "Sarvarthasiddhi yoga — ati-shubh (overrides minor doshas)" });
      positives += 2; hasAtiShubh = true;
    } else if (sy.key === "amrit-siddhi") {
      reasons.push({ kind: "+", textHi: "अमृत सिद्धि योग — अति-शुभ", textEn: "Amrit Siddhi yoga — ati-shubh" });
      positives += 2; hasAtiShubh = true;
    } else if (sy.key === "gurupushya") {
      reasons.push({ kind: "+", textHi: "गुरु-पुष्य योग — अति-शुभ", textEn: "Guru-Pushya yoga — ati-shubh" });
      positives += 2; hasAtiShubh = true;
    } else if (sy.key === "ravipushya") {
      reasons.push({ kind: "+", textHi: "रवि-पुष्य योग — अति-शुभ", textEn: "Ravi-Pushya yoga — ati-shubh" });
      positives += 2; hasAtiShubh = true;
    } else if (sy.key === "ravi") {
      reasons.push({ kind: "+", textHi: "रवि योग", textEn: "Ravi yoga" });
      positives++;
    }
  }

  // Adhika maas — generally avoid for new shubh karma
  if (day.masaIsAdhika) {
    reasons.push({ kind: "-", textHi: "अधिक मास — नवीन शुभ-कर्म वर्जित", textEn: "Adhika maas — avoid new shubh karma" });
    negatives++;
  }

  // ── Verdict ──────────────────────────────────────────────────────────────
  // - Hard exclusions (Vyatipata/Vaidhriti/Amavasya-when-blocked) → AVOID regardless.
  // - Net score = positives - negatives. With an ati-shubh special yoga (Sarvarthasiddhi
  //   etc.) we soften the "avoid" threshold by 1 — classical convention is that these
  //   yogas remit minor doshas.
  const net = positives - negatives;
  const avoidThreshold = hasAtiShubh ? -3 : -2;
  let verdict: Verdict;
  if (hardExclude) verdict = "avoid";
  else if (net >= 2) verdict = "favorable";
  else if (net <= avoidThreshold) verdict = "avoid";
  else verdict = "mixed";

  return { verdict, reasons };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-day windows: intersect Abhijit / non-Rahu choghadiya / special yoga windows
// ─────────────────────────────────────────────────────────────────────────────

function timeOverlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): { start: string; end: string } | null {
  const s = aStart > bStart ? aStart : bStart;
  const e = aEnd < bEnd ? aEnd : bEnd;
  return s < e ? { start: s, end: e } : null;
}

function buildRecommendedWindows(day: PanchangDay): RecommendedWindow[] {
  const out: RecommendedWindow[] = [];

  // Abhijit muhurta is universally auspicious (except sometimes Wednesday).
  if (day.muhurtas?.abhijit) {
    out.push({
      start: day.muhurtas.abhijit.start,
      end: day.muhurtas.abhijit.end,
      labelHi: "अभिजित मुहूर्त",
      labelEn: "Abhijit Muhurta",
      rank: "shubh",
    });
  }

  // Brahma muhurta (pre-dawn) — auspicious for spiritual karma.
  if (day.muhurtas?.brahmaMuhurta) {
    out.push({
      start: day.muhurtas.brahmaMuhurta.start,
      end: day.muhurtas.brahmaMuhurta.end,
      labelHi: "ब्रह्म मुहूर्त",
      labelEn: "Brahma Muhurta",
      rank: "shubh",
    });
  }

  // Vijaya muhurta (11th muhurta of day) — "victorious" slot.
  if (day.extraMuhurtas?.vijaya) {
    out.push({
      start: day.extraMuhurtas.vijaya.start,
      end: day.extraMuhurtas.vijaya.end,
      labelHi: "विजय मुहूर्त",
      labelEn: "Vijaya Muhurta",
      rank: "shubh",
    });
  }

  // Special yogas — if Sarvarthasiddhi or Amrit Siddhi is active, surface that window.
  for (const sy of day.specialYogas ?? []) {
    if (sy.key === "sarvarthasiddhi" || sy.key === "amrit-siddhi" || sy.key === "gurupushya" || sy.key === "ravipushya") {
      out.push({
        start: sy.startTime,
        end: sy.endTime,
        labelHi: sy.nameHi,
        labelEn: sy.nameEn,
        rank: "ati-shubh",
      });
    }
  }

  // Sort by start time
  out.sort((a, b) => a.start.localeCompare(b.start));
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function scoreDay(day: PanchangDay, ev: MuhurtaEventRules): MuhurtaDayResult {
  const { verdict, reasons } = applyRules(day, ev);
  const windows = verdict === "avoid" ? [] : buildRecommendedWindows(day);

  return {
    date: day.date,
    varaHi: day.varaHi,
    varaEn: day.varaEn,
    tithiHeadlineHi: `${day.tithi.pakshaHi.replace(" पक्ष", "")} ${day.tithi.nameHi}`,
    tithiHeadlineEn: `${day.tithi.pakshaEn.replace(" Paksha", "")} ${day.tithi.nameEn}`,
    nakshatraHi: day.nakshatra?.nameHi,
    nakshatraEn: day.nakshatra?.nameEn,
    verdict,
    reasons,
    windows,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Multi-day validation — for events like Panch Kalyanak (5-9 day mahotsava):
// the start day must score Favorable/Mixed AND every day in the lookahead
// window must be free of hard doshas (Vyatipata/Vaidhriti yoga, Bhadra when
// the event blocks it, Jupiter/Venus combust). Any inner-day hard fail demotes
// the start verdict to Avoid with a labelled reason.
// ─────────────────────────────────────────────────────────────────────────────

interface InnerDayFailure {
  date: string;
  reasonHi: string;
  reasonEn: string;
}

function checkInnerDay(day: PanchangDay, ev: MuhurtaEventRules): InnerDayFailure | null {
  if (day.yoga?.number === 17) {
    return { date: day.date, reasonHi: "व्यतीपात योग", reasonEn: "Vyatipata yoga" };
  }
  if (day.yoga?.number === 27) {
    return { date: day.date, reasonHi: "वैधृति योग", reasonEn: "Vaidhriti yoga" };
  }
  if (ev.rules.avoidBhadra && day.bhadra?.active) {
    return { date: day.date, reasonHi: "भद्रा सक्रिय", reasonEn: "Bhadra active" };
  }
  const jupiter = day.planets?.find((p) => p.key === "jupiter");
  if (jupiter?.combust) {
    return { date: day.date, reasonHi: "गुरु अस्त (बृहस्पति अस्त)", reasonEn: "Guru-asta (Jupiter combust)" };
  }
  const venus = day.planets?.find((p) => p.key === "venus");
  if (venus?.combust) {
    return { date: day.date, reasonHi: "शुक्र अस्त", reasonEn: "Shukra-asta (Venus combust)" };
  }
  return null;
}

function fmtShortDate(yyyymmdd: string): string {
  const [, m, d] = yyyymmdd.split("-");
  return `${parseInt(d, 10)}/${parseInt(m, 10)}`;
}

function scoreDayWithLookahead(
  startIdx: number,
  days: PanchangDay[],
  ev: MuhurtaEventRules,
  duration: number,
): MuhurtaDayResult {
  const start = days[startIdx];
  const base = scoreDay(start, ev);
  base.durationDays = duration;

  const endIdx = startIdx + duration - 1;
  if (endIdx >= days.length) {
    // Cannot validate full window inside the loaded range.
    base.verdict = "mixed";
    base.reasons = [
      ...base.reasons,
      {
        kind: "-",
        textHi: `${duration}-दिवसीय खिड़की पूरी नहीं हो रही — तिथि-परिसर बढ़ाएँ`,
        textEn: `Cannot validate the full ${duration}-day window — extend the search range`,
      },
    ];
    base.windows = [];
    return base;
  }

  base.endDate = days[endIdx].date;

  // If the start itself is "avoid", no need to look further.
  if (base.verdict === "avoid") return base;

  // Check each inner day (skip the start, already scored).
  const failures: InnerDayFailure[] = [];
  for (let i = startIdx + 1; i <= endIdx; i++) {
    const f = checkInnerDay(days[i], ev);
    if (f) failures.push(f);
  }
  if (failures.length === 0) return base;

  base.verdict = "avoid";
  base.windows = [];
  for (const f of failures) {
    base.reasons.push({
      kind: "x",
      textHi: `दिवस ${fmtShortDate(f.date)} में दोष: ${f.reasonHi}`,
      textEn: `Day ${fmtShortDate(f.date)} in window has: ${f.reasonEn}`,
    });
  }
  return base;
}

export function scoreRange(
  days: PanchangDay[],
  ev: MuhurtaEventRules,
  opts?: { multiDayLength?: number },
): MuhurtaDayResult[] {
  if (ev.multiDay) {
    const duration = opts?.multiDayLength ?? ev.multiDay.defaultDays;
    return days.map((_, i) => scoreDayWithLookahead(i, days, ev, duration));
  }
  return days.map((d) => scoreDay(d, ev));
}
