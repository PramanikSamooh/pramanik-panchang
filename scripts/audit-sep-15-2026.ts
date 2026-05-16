// Cross-check audit for September 15, 2026 (Ujjain) — varied test date.
// Run: npx tsx scripts/audit-sep-15-2026.ts

import { computeSingleDay } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 };
const events = getAllJainEvents();
const day = computeSingleDay(new Date(2026, 8, 15), events, LOC);
if (!day) { console.error("null"); process.exit(1); }

const ref = {
  sunrise: "06:13", sunset: "18:31",
  tithi: { name: "Chaturthi", paksha: "Shukla", endTime: "07:44" },
  nakshatra: { name: "Swati", endTime: "15:21" },
  yoga: { name: "Indra", endTime: "12:20" },
  karana1: { name: "Vishti", endTime: "07:44" },
  vara: "Tuesday",
  hinduMonth: "Bhadrapada",
  rahu: { start: "15:26", end: "16:58" },
  yamganda: { start: "09:18", end: "10:50" },
  abhijit: { start: "11:57", end: "12:47" },
  brahma: { start: "04:40", end: "05:27" },
  bhadra: { start: "06:13", end: "07:44" },
};

function pad(s: string, n: number) { return (s + " ".repeat(n)).slice(0, n); }
function cmp(label: string, ours: any, theirs: any) {
  const o = ours === undefined || ours === null ? "—" : String(ours);
  const t = theirs === undefined || theirs === null ? "—" : String(theirs);
  console.log(`  ${o === t ? "✓" : "✗"}  ${pad(label, 22)} | ours: ${pad(o, 18)} | drik: ${pad(t, 18)}`);
}

console.log("\n══ AUDIT: Sept 15, 2026 (Ujjain) ══\n");
cmp("Sunrise", day.sunTimes?.sunrise, ref.sunrise);
cmp("Sunset", day.sunTimes?.sunset, ref.sunset);
cmp("Vara", day.varaEn, ref.vara);
cmp("Tithi name", day.tithi.nameEn, ref.tithi.name);
cmp("Tithi paksha", day.tithi.pakshaEn.replace(" Paksha", ""), ref.tithi.paksha);
cmp("Tithi end", day.tithi.endTime, ref.tithi.endTime);
cmp("Nakshatra name", day.nakshatra?.nameEn, ref.nakshatra.name);
cmp("Nakshatra end", day.nakshatra?.endTime, ref.nakshatra.endTime);
cmp("Yoga name", day.yoga?.nameEn, ref.yoga.name);
cmp("Yoga end", day.yoga?.endTime, ref.yoga.endTime);
cmp("Karana", day.karana?.nameEn, ref.karana1.name);
cmp("Karana end", day.karana?.endTime, ref.karana1.endTime);
cmp("Hindu month", day.hinduMonth.en, ref.hinduMonth);
cmp("Rahu start", day.muhurtas?.rahuKalam?.start, ref.rahu.start);
cmp("Rahu end", day.muhurtas?.rahuKalam?.end, ref.rahu.end);
cmp("Yamganda start", day.muhurtas?.yamganda?.start, ref.yamganda.start);
cmp("Yamganda end", day.muhurtas?.yamganda?.end, ref.yamganda.end);
cmp("Abhijit start", day.muhurtas?.abhijit?.start, ref.abhijit.start);
cmp("Abhijit end", day.muhurtas?.abhijit?.end, ref.abhijit.end);
cmp("Brahma start", day.muhurtas?.brahmaMuhurta?.start, ref.brahma.start);
cmp("Brahma end", day.muhurtas?.brahmaMuhurta?.end, ref.brahma.end);
console.log(`\nBhadra (ours): active=${day.bhadra?.active} periods=${day.bhadra?.periods?.length ?? 0}`);
if (day.bhadra?.periods) {
  for (const p of day.bhadra.periods) console.log(`  · ${p.startTime}-${p.endTime} (${p.part ?? "—"})`);
}
console.log(`Bhadra (drik): ${ref.bhadra.start} - ${ref.bhadra.end}`);
console.log(`\nSpecial yogas (ours): ${(day.specialYogas ?? []).map((s) => `${s.nameEn} ${s.startTime}-${s.endTime}`).join(", ") || "(none)"}`);
console.log(`Special yogas (drik): Ravi Yoga 06:13-15:21`);
