// Display-format utilities — number style (Western 123 vs Devanagari १२३) and
// time format (24-hour HH:MM vs 12-hour h:MM AM/PM).
// These run client-side; the engine output is always in Western digits + 24h time
// and the UI converts at render time based on user preference.

export type NumberStyle = "western" | "devanagari";
export type TimeFormat = "24h" | "12h";

const DEV_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/** Convert all digits in a string to Devanagari (or leave unchanged for "western"). */
export function formatNumberStr(s: string | number | null | undefined, style: NumberStyle): string {
  if (s === null || s === undefined) return "";
  const str = String(s);
  if (style === "western") return str;
  return str.replace(/\d/g, (d) => DEV_DIGITS[Number(d)]);
}

/** Convert a "HH:MM" 24-hour string to the requested format with optional Devanagari digits. */
export function formatTimeStr(
  hhmm: string | null | undefined,
  timeFormat: TimeFormat,
  numberStyle: NumberStyle,
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
  // 24h — pad hour to 2 digits
  const hh = String(h).padStart(2, "0");
  return `${formatNumberStr(hh, numberStyle)}:${formatNumberStr(min, numberStyle)}`;
}

/** Convert a "HH:MM–HH:MM" range. */
export function formatTimeRange(
  start: string | null | undefined,
  end: string | null | undefined,
  timeFormat: TimeFormat,
  numberStyle: NumberStyle,
): string {
  if (!start || !end) return "-";
  return `${formatTimeStr(start, timeFormat, numberStyle)} – ${formatTimeStr(end, timeFormat, numberStyle)}`;
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
