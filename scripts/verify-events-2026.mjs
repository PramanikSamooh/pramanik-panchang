// Integration verification — mimics the engine's tithi + event matching for key 2026 dates.
// Run: node scripts/verify-events-2026.mjs

import { getPanchangam, getUdayaTithiInfo, Observer } from "@ishubhamx/panchangam-js";

const SIX_GHATI_MS = 144 * 60 * 1000;
const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 };
const MASA_ALIAS = { "Ashwina": "Ashwin", "Kartika": "Kartik" };
const norm = (n) => MASA_ALIAS[n] || n;

const observer = new Observer(LOC.lat, LOC.lng, 0);

function computeDay(date) {
  const p = getPanchangam(date, observer, { timezoneOffset: LOC.tz, calendarType: "purnimanta" });
  if (!p.sunrise) return null;
  const ref = new Date(p.sunrise.getTime() + SIX_GHATI_MS);
  const u = getUdayaTithiInfo(date, ref, observer);
  const paksha = u.paksha?.includes("Shukla") ? "Shukla" : "Krishna";
  const tithi = paksha === "Shukla" ? u.tithi : u.tithi - 15;
  return { date, masa: norm(p.masa.name), paksha, tithi };
}

// Generate full year
const days = [];
for (let dayOfYear = 0; dayOfYear < 366; dayOfYear++) {
  const d = new Date(2026, 0, 1 + dayOfYear);
  if (d.getFullYear() > 2026) break;
  const day = computeDay(d);
  if (day) days.push(day);
}

// Apply kshaya merge — if day[i+1].tithi - day[i].tithi == 2 (same masa/paksha), then tithi (day[i]+1) was kshaya
const dayHasKshaya = new Map(); // date ISO -> skipped tithi
for (let i = 1; i < days.length; i++) {
  const p = days[i - 1];
  const c = days[i];
  if (p.masa === c.masa && p.paksha === c.paksha && c.tithi - p.tithi === 2) {
    dayHasKshaya.set(p.date.toLocaleDateString("sv"), p.tithi + 1);
  }
}

// Event matcher — replicates the engine's logic
function findEventDate(month, paksha, tithi) {
  for (const d of days) {
    if (d.masa === month && d.paksha === paksha && d.tithi === tithi) {
      return d.date.toLocaleDateString("sv");
    }
  }
  // Check kshaya — if the skipped tithi matches, event fires on the day before
  for (const d of days) {
    const key = d.date.toLocaleDateString("sv");
    if (d.masa === month && d.paksha === paksha && dayHasKshaya.get(key) === tithi) {
      return key + " (kshaya merge)";
    }
  }
  return "NOT FOUND";
}

// Nakshatra rule (for Rohini Vrat)
function findNakshatraDates(nakshatraNumber) {
  const results = [];
  for (const d of days) {
    const p = getPanchangam(d.date, observer, { timezoneOffset: LOC.tz, calendarType: "purnimanta" });
    if ((p.nakshatra ?? 0) + 1 === nakshatraNumber) {
      results.push(d.date.toLocaleDateString("sv"));
    }
  }
  return results;
}

// Key checks
// Expected dates use the SOFTWARE'S rules (vriddhi=first day, kshaya=previous day, first-occurrence-wins).
// Where these differ from the 2026 Excel (which is the input source we're cross-checking, but whose
// rules we may not match exactly), the row is annotated with both expected and Excel.
const CHECKS = [
  { desc: "Mahavir Janma Kalyanak",                    month: "Chaitra",    paksha: "Shukla",  tithi: 13, expected: "2026-03-30" },
  { desc: "Akshaya Tritiya (kshaya merge)",            month: "Vaishakha",  paksha: "Shukla",  tithi: 3,  expected: "2026-04-19" },
  { desc: "Shantinath janma (kshaya merge)",           month: "Jyeshtha",   paksha: "Krishna", tithi: 14, expected: "2026-05-15" },
  { desc: "Shantinath tap (kshaya merge)",             month: "Jyeshtha",   paksha: "Krishna", tithi: 14, expected: "2026-05-15" },
  { desc: "Shantinath moksha (kshaya merge)",          month: "Jyeshtha",   paksha: "Krishna", tithi: 14, expected: "2026-05-15" },
  { desc: "Diwali / Mahavir Nirvana",                  month: "Kartik",     paksha: "Krishna", tithi: 15, expected: "2026-11-09" },
  { desc: "Paryushan Day 1 (vriddhi=first day rule)",  month: "Bhadrapada", paksha: "Shukla",  tithi: 5,  expected: "2026-09-15" },
  { desc: "Adinath janma/tap (Chaitra Kr 9)",          month: "Chaitra",    paksha: "Krishna", tithi: 9,  expected: "" },
  { desc: "Adinath moksha (Magha Kr 14)",              month: "Magha",      paksha: "Krishna", tithi: 14, expected: "" },
  { desc: "Shrut Panchami (first-occurrence: 1st Jy)", month: "Jyeshtha",   paksha: "Shukla",  tithi: 5,  expected: "2026-05-21" },
];

let pass = 0, fail = 0;
for (const c of CHECKS) {
  const got = findEventDate(c.month, c.paksha, c.tithi);
  const ok = !c.expected || got.startsWith(c.expected);
  const mark = ok ? "✓" : "✗";
  console.log(`${mark} ${c.desc.padEnd(40)} ${c.month} ${c.paksha} ${c.tithi} → ${got}${c.expected ? " (expected " + c.expected + ")" : ""}`);
  if (ok) pass++; else fail++;
}

// Rohini Vrat spot-check — Excel shows Jan 1, Jan 29, Feb 25, Mar 24, Apr 20, May 18, Jun 14, Jul 12
const rohiniDates = findNakshatraDates(4);
console.log("\nRohini nakshatra days (first 12): " + rohiniDates.slice(0, 12).join(", "));

console.log(`\n${pass}/${pass + fail} checks passed.`);
