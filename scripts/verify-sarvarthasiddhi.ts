// Verify Sarvarthasiddhi yoga end time vs Drikpanchang for May 18, 2026 (Ujjain).
//
// Drikpanchang shows:  05:45 AM, May 18  →  05:44 AM, May 19  (Sarvarthasiddhi)
// Run: npx tsx scripts/verify-sarvarthasiddhi.ts

import { computeSingleDay } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 }; // Ujjain
const events = getAllJainEvents();

for (const dateStr of ["2026-05-18", "2026-05-14", "2026-05-21", "2026-05-08", "2026-05-09", "2026-05-20", "2026-05-27"]) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const day = computeSingleDay(date, events, LOC);
  if (!day) { console.log(`${dateStr}: NULL`); continue; }
  console.log(`── ${dateStr} (${day.varaEn})`);
  console.log(`   Sunrise: ${day.sunTimes?.sunrise}  Sunset: ${day.sunTimes?.sunset}`);
  console.log(`   Nakshatra: ${day.nakshatra?.nameEn} (#${day.nakshatra?.number}) ends ${day.nakshatra?.endTime}`);
  if (day.specialYogas?.length) {
    for (const sy of day.specialYogas) {
      console.log(`   ★ ${sy.nameEn}: ${sy.startTime} → ${sy.endTime}`);
    }
  } else {
    console.log(`   (no special yogas)`);
  }
  console.log();
}
