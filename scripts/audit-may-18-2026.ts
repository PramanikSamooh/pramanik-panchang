// Comprehensive audit: our engine vs Drikpanchang for May 18, 2026 (Ujjain).
// Run: npx tsx scripts/audit-may-18-2026.ts

import { computeSingleDay } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 }; // Ujjain
const events = getAllJainEvents();
const date = new Date(2026, 4, 18); // May 18
const day = computeSingleDay(date, events, LOC);

if (!day) { console.error("Engine returned null!"); process.exit(1); }

// Drikpanchang reference values for May 18, 2026 Ujjain (fetched separately):
const drikRef = {
  sunrise: "05:45",
  sunset: "19:02",        // 07:02 PM
  moonrise: "06:48",
  moonset: "21:00",        // 09:00 PM
  tithi: { name: "Dwitiya", paksha: "Shukla", endTime: "17:53" },
  nakshatra: { name: "Rohini", endTime: "11:32" },
  yoga: { name: "Sukarma", endTime: "21:48" },
  karana1: { name: "Balava", endTime: "07:46" },
  karana2: { name: "Kaulava", endTime: "17:53" },
  vara: "Monday",
  hinduMonth: "Jyeshtha (Adhik)",
  rahuKalam: { start: "07:24", end: "09:04" },
  yamganda: { start: "10:44", end: "12:23" },
  gulika: { start: "14:03", end: "15:43" },
  abhijit: { start: "11:57", end: "12:50" },
  brahmaMuhurta: { start: "04:19", end: "05:02" },
  sarvarthasiddhi: { start: "05:45", endLabel: "Whole day (next sunrise 05:44 May 19)" },
  amritsiddhi: "present",
  shakaSamvat: 1948,
  vikramSamvat: 2083,
};

function pad(s: string, n: number) { return (s + " ".repeat(n)).slice(0, n); }

function compare(label: string, our: any, theirs: any, note: string = "") {
  const ourStr = our === undefined || our === null ? "—" : String(our);
  const theirStr = theirs === undefined || theirs === null ? "—" : String(theirs);
  const ok = ourStr === theirStr;
  const mark = ok ? "✓" : "✗";
  console.log(`  ${mark}  ${pad(label, 24)} | ours: ${pad(ourStr, 22)} | drik: ${pad(theirStr, 28)} ${note}`);
  return ok;
}

console.log("\n══ AUDIT: May 18, 2026 (Ujjain) — our engine vs Drikpanchang ══\n");

console.log("─ Time anchors ─");
compare("Sunrise", day.sunTimes?.sunrise, drikRef.sunrise);
compare("Sunset", day.sunTimes?.sunset, drikRef.sunset);
compare("Moonrise", day.sunTimes?.moonrise, drikRef.moonrise);
compare("Moonset", day.sunTimes?.moonset, drikRef.moonset);

console.log("\n─ Panchanga ─");
compare("Vara", day.varaEn, drikRef.vara);
compare("Tithi name", day.tithi.nameEn, drikRef.tithi.name);
compare("Tithi paksha", day.tithi.pakshaEn.replace(" Paksha", ""), drikRef.tithi.paksha);
compare("Tithi end", day.tithi.endTime, drikRef.tithi.endTime);
compare("Nakshatra name", day.nakshatra?.nameEn, drikRef.nakshatra.name);
compare("Nakshatra end", day.nakshatra?.endTime, drikRef.nakshatra.endTime);
compare("Yoga name", day.yoga?.nameEn, drikRef.yoga.name);
compare("Yoga end", day.yoga?.endTime, drikRef.yoga.endTime);
compare("Karana (current)", day.karana?.nameEn, drikRef.karana1.name);
compare("Karana end", day.karana?.endTime, drikRef.karana1.endTime);

console.log("\n─ Karana sequence (multi-karana day) ─");
if (day.karanaSequence) {
  for (let i = 0; i < day.karanaSequence.length; i++) {
    const k = day.karanaSequence[i];
    console.log(`  · ours #${i + 1}: ${k.nameEn} ends ${k.endTime}`);
  }
}
console.log(`  · drik #1: ${drikRef.karana1.name} ends ${drikRef.karana1.endTime}`);
console.log(`  · drik #2: ${drikRef.karana2.name} ends ${drikRef.karana2.endTime}`);

console.log("\n─ Month ─");
const ourMonth = `${day.hinduMonth.en}${day.masaIsAdhika ? " (Adhik)" : ""}`;
compare("Hindu month", ourMonth, drikRef.hinduMonth);

console.log("\n─ Muhurtas ─");
compare("Rahu Kalam start", day.muhurtas?.rahuKalam?.start, drikRef.rahuKalam.start);
compare("Rahu Kalam end", day.muhurtas?.rahuKalam?.end, drikRef.rahuKalam.end);
compare("Yamganda start", day.muhurtas?.yamganda?.start, drikRef.yamganda.start);
compare("Yamganda end", day.muhurtas?.yamganda?.end, drikRef.yamganda.end);
compare("Gulika start", day.muhurtas?.gulikaKalam?.start, drikRef.gulika.start);
compare("Gulika end", day.muhurtas?.gulikaKalam?.end, drikRef.gulika.end);
compare("Abhijit start", day.muhurtas?.abhijit?.start, drikRef.abhijit.start);
compare("Abhijit end", day.muhurtas?.abhijit?.end, drikRef.abhijit.end);
compare("Brahma Muh. start", day.muhurtas?.brahmaMuhurta?.start, drikRef.brahmaMuhurta.start);
compare("Brahma Muh. end", day.muhurtas?.brahmaMuhurta?.end, drikRef.brahmaMuhurta.end);

console.log("\n─ Samvats ─");
compare("Shaka Samvat", day.samvats?.shaka, drikRef.shakaSamvat);
compare("Vikram Samvat", day.samvats?.vikram, drikRef.vikramSamvat);

console.log("\n─ Special yogas ─");
console.log("  ours:");
for (const sy of day.specialYogas ?? []) {
  console.log(`    · ${sy.nameEn}: ${sy.startTime} → ${sy.endTime}`);
}
console.log("  drik:");
console.log(`    · Sarvartha Siddhi Yoga: ${drikRef.sarvarthasiddhi.start} → ${drikRef.sarvarthasiddhi.endLabel}`);
console.log(`    · Amrita Siddhi Yoga: present`);

console.log("\n─ Period flags ─");
console.log(`  Panchak: ours=${day.panchak}    (drik shows separate Mrityu Panchaka label — different concept)`);
console.log(`  Bhadra:  ours=${day.bhadra?.active}    (drik: not flagged on May 18)`);
console.log(`  Mool:    ours=${day.mool}`);
