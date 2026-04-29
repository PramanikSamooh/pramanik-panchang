// Display-format utilities — number style (Western 123 vs Devanagari १२३) and
// time format (12-hour AM/PM, 24-hour, or 24+ panchang style where times in the
// early next morning render as 24:30, 26:00, 28:15 etc.).
// These run client-side; the engine output is always in Western digits + 24h time
// and the UI converts at render time based on user preference.

export type NumberStyle = "western" | "devanagari";
export type TimeFormat = "24h" | "12h" | "24plus";

const DEV_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/** Convert all digits in a string to Devanagari (or leave unchanged for "western"). */
export function formatNumberStr(s: string | number | null | undefined, style: NumberStyle): string {
  if (s === null || s === undefined) return "";
  const str = String(s);
  if (style === "western") return str;
  return str.replace(/\d/g, (d) => DEV_DIGITS[Number(d)]);
}

/** Reference for the "24+" mode — the day's sunrise (HH:MM) used to decide whether an
 * early-morning end-time belongs to the current panchang day or the next. */
export interface TimeContext {
  sunriseHHMM?: string;
}

/** Convert a "HH:MM" 24-hour string to the requested format with optional Devanagari digits.
 *
 * 24+ rule (Drik Panchang convention, civil-midnight anchored):
 *   If the time's hour is less than today's sunrise hour (e.g., end time 02:30 and sunrise 05:57),
 *   treat the time as belonging to the next morning and render it as `(hour + 24):mm`.
 *   So 02:30 → 26:30, 05:00 → 29:00. Times past sunrise stay as normal HH:MM.
 */
export function formatTimeStr(
  hhmm: string | null | undefined,
  timeFormat: TimeFormat,
  numberStyle: NumberStyle,
  ctx?: TimeContext,
): string {
  if (!hhmm) return "";
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return hhmm;
  let h = parseInt(m[1], 10);
  const min = m[2];
  if (timeFormat === "12h") {
    const isPm = h >= 12;
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const ampm = isPm ? "PM" : "AM";
    return `${formatNumberStr(h12, numberStyle)}:${formatNumberStr(min, numberStyle)} ${ampm}`;
  }
  if (timeFormat === "24plus" && ctx?.sunriseHHMM) {
    const srMatch = /^(\d{1,2}):(\d{2})$/.exec(ctx.sunriseHHMM.trim());
    if (srMatch) {
      const srHour = parseInt(srMatch[1], 10);
      const srMin = parseInt(srMatch[2], 10);
      const tMin = h * 60 + parseInt(min, 10);
      const sunriseMin = srHour * 60 + srMin;
      // If time is between civil midnight (00:00) and today's sunrise, it belongs to "tomorrow's
      // early hours" relative to today — display as 24+.
      if (tMin < sunriseMin) {
        h = h + 24;
      }
    }
  }
  // 24h or 24plus — pad hour, allow >=24 to render naturally
  const hh = h < 100 ? String(h).padStart(2, "0") : String(h);
  return `${formatNumberStr(hh, numberStyle)}:${formatNumberStr(min, numberStyle)}`;
}

/** Convert a "HH:MM–HH:MM" range. */
export function formatTimeRange(
  start: string | null | undefined,
  end: string | null | undefined,
  timeFormat: TimeFormat,
  numberStyle: NumberStyle,
  ctx?: TimeContext,
): string {
  if (!start || !end) return "-";
  return `${formatTimeStr(start, timeFormat, numberStyle, ctx)} – ${formatTimeStr(end, timeFormat, numberStyle, ctx)}`;
}

/** Convert a date "YYYY-MM-DD" to a friendly display ("28 Apr 2026" with optional Devanagari digits). */
export function formatGregorianDate(dateStr: string, numberStyle: NumberStyle): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${formatNumberStr(d, numberStyle)} ${months[m - 1]} ${formatNumberStr(y, numberStyle)}`;
}

/** Hindi tithi number names — for displaying "द्वादशी" rather than "12". */
export const TITHI_HI_FULL_NAMES = [
  "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी",
  "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
  "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा/अमावस्या",
];
