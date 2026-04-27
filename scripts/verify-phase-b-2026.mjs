// Phase B verification — panchak, bhadra (Vishti), mool (gandanta), special yogas vs Excel.
// Run: node scripts/verify-phase-b-2026.mjs

import { getPanchangam, Observer } from "@ishubhamx/panchangam-js";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 };
const observer = new Observer(LOC.lat, LOC.lng, 0);

function localDateStr(d) { return d.toLocaleDateString("sv"); }

const days = [];
for (let i = 0; i < 365; i++) {
  const d = new Date(2026, 0, 1 + i);
  if (d.getFullYear() > 2026) break;
  const p = getPanchangam(d, observer, { timezoneOffset: LOC.tz, calendarType: "purnimanta" });
  days.push({
    date: d,
    iso: localDateStr(d),
    nakshatra: (p.nakshatra ?? 0) + 1,
    karana: p.karana || "",
    moonRashi: p.moonRashi?.index,
    sunRashi: p.sunRashi?.index,
    sunNakshatra: p.sunNakshatra?.index,
    specialYogas: (p.specialYogas || []).map(s => s.name),
  });
}

// Helper: list date ranges where a predicate is true
function rangesWhere(pred) {
  const out = [];
  let start = null;
  for (const d of days) {
    if (pred(d)) {
      if (!start) start = d.iso;
    } else {
      if (start) { out.push(`${start} → ${prevIso}`); start = null; }
    }
    var prevIso = d.iso;
  }
  if (start) out.push(`${start} → ${days[days.length-1].iso}`);
  return out;
}

console.log("=== PANCHAK (moon in nakshatra 23-27) ===");
const panchakRanges = rangesWhere(d => d.nakshatra >= 23 && d.nakshatra <= 27);
for (const r of panchakRanges) console.log("  " + r);

console.log("\n=== BHADRA / VISHTI (whole-day flag) ===");
const bhadraRanges = rangesWhere(d => d.karana.toLowerCase().includes("vishti"));
for (const r of bhadraRanges.slice(0, 12)) console.log("  " + r);
console.log(`  (${bhadraRanges.length} ranges total)`);

console.log("\n=== MOOL / GANDANTA (moon in 1, 9, 10, 18, 19, 27) ===");
const moolRanges = rangesWhere(d => [1,9,10,18,19,27].includes(d.nakshatra));
for (const r of moolRanges.slice(0, 16)) console.log("  " + r);
console.log(`  (${moolRanges.length} ranges total)`);

console.log("\n=== Sun rashi transits ===");
let prev = null;
for (const d of days) {
  if (prev !== null && d.sunRashi !== prev) {
    console.log(`  ${d.iso}: sun enters rashi #${d.sunRashi + 1}`);
  }
  prev = d.sunRashi;
}

console.log("\n=== Moon rashi transits (first 30) ===");
prev = null;
let count = 0;
for (const d of days) {
  if (prev !== null && d.moonRashi !== prev) {
    console.log(`  ${d.iso}: moon enters rashi #${d.moonRashi + 1}`);
    count++;
    if (count >= 30) break;
  }
  prev = d.moonRashi;
}

console.log("\n=== Special yogas observed (sample) ===");
const yogaCounter = {};
for (const d of days) {
  for (const y of d.specialYogas) yogaCounter[y] = (yogaCounter[y] || 0) + 1;
}
console.log(yogaCounter);
