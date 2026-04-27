// Verification script — spot-check 2026 panchang against Excel expected dates.
// Run: node scripts/verify-2026.mjs

import { getPanchangam, getUdayaTithiInfo, Observer } from "@ishubhamx/panchangam-js";

const SIX_GHATI_MS = 144 * 60 * 1000;
const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 }; // Ujjain IST

const MASA_ALIAS = { "Ashwina": "Ashwin", "Kartika": "Kartik" };
const norm = (n) => MASA_ALIAS[n] || n;

const observer = new Observer(LOC.lat, LOC.lng, 0);

function compute(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const p = getPanchangam(date, observer, { timezoneOffset: LOC.tz, calendarType: "purnimanta" });
  let tithi = p.tithi + 1;
  let paksha = p.paksha?.includes("Shukla") ? "Shukla" : "Krishna";
  if (p.sunrise) {
    try {
      const ref = new Date(p.sunrise.getTime() + SIX_GHATI_MS);
      const u = getUdayaTithiInfo(date, ref, observer);
      tithi = u.tithi;
      paksha = u.paksha?.includes("Shukla") ? "Shukla" : "Krishna";
    } catch {}
  }
  const tithiInPaksha = paksha === "Shukla" ? tithi : tithi - 15;
  return {
    date: dateStr,
    month: norm(p.masa?.name),
    paksha,
    tithi: tithiInPaksha,
    isAdhika: !!p.masa?.isAdhika,
    nakshatra: (p.nakshatra ?? 0) + 1,
  };
}

const CHECKS = [
  // [date, expected Hindu month, paksha, tithi, description]
  ["2026-03-30", "Chaitra",    "Shukla",  13, "Mahavir Jayanti (Chaitra Shukla 13)"],
  ["2026-04-19", "Vaishakha",  "Shukla",  3,  "Akshaya Tritiya (Excel: Apr 19)"],
  ["2026-06-13", "Jyeshtha",   "Krishna", 14, "Shantinath janma/tap/moksha (Nija Jyeshtha — library reports no adhika, so fires on first available)"],
  ["2026-11-09", "Kartik",     "Krishna", 15, "Diwali / Mahavir Nirvana (Amavasya)"],
  ["2026-09-16", "Bhadrapada", "Shukla",  5,  "Das Lakshan start (Paryushan day 1)"],
];

let pass = 0, fail = 0;
for (const [date, month, paksha, tithi, desc] of CHECKS) {
  const r = compute(date);
  const ok = r.month === month && r.paksha === paksha && r.tithi === tithi;
  const adhikaFlag = r.isAdhika ? " [ADHIKA]" : "";
  const mark = ok ? "✓" : "✗";
  console.log(`${mark} ${date}: ${desc}`);
  console.log(`   Expected: ${month} ${paksha} ${tithi}`);
  console.log(`   Actual:   ${r.month} ${paksha}? ${r.paksha}, tithi ${r.tithi}${adhikaFlag}, nakshatra ${r.nakshatra}`);
  if (ok) pass++; else fail++;
}

// Adhika-maas sanity — verify 2026 has an adhika Jyeshtha somewhere in May
const MAY = [];
for (let d = 1; d <= 31; d++) {
  const r = compute(`2026-05-${String(d).padStart(2, "0")}`);
  if (r.month === "Jyeshtha" && r.isAdhika) MAY.push(r.date);
}
console.log(`\nAdhika Jyeshtha days in May 2026: ${MAY.length > 0 ? MAY.join(", ") : "NONE — adhika not detected!"}`);

// Check June 2026 has nija Jyeshtha (not adhika)
const JUN12 = compute("2026-06-12");
console.log(`\nJune 12 2026 check: month=${JUN12.month} paksha=${JUN12.paksha} tithi=${JUN12.tithi} isAdhika=${JUN12.isAdhika}`);

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
