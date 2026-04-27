// Sanity check the new sweph-engine — pick a few days, print all fields.
// Run: node --experimental-strip-types scripts/verify-sweph-2026.mjs
// Or: npx tsx scripts/verify-sweph-2026.mjs

import { generatePanchang, computeSingleDay } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 22.7196, lng: 75.8577, tz: 330 }; // Indore, IST
const events = getAllJainEvents();

const TEST_DATES = [
  "2026-03-30", "2026-04-19",
  "2026-05-13", "2026-05-14", "2026-05-15", "2026-05-16",
  "2026-09-15", "2026-09-16", "2026-11-09",
];

for (const ds of TEST_DATES) {
  const [y, m, d] = ds.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const day = computeSingleDay(date, events, LOC);
  if (!day) { console.log(ds + ": NULL"); continue; }
  console.log("─".repeat(70));
  console.log(`Date: ${day.date}  Vara: ${day.varaHi} (${day.varaEn})  VNS: ${day.vnsYear}`);
  console.log(`Tithi: ${day.tithi.nameHi} ${day.tithi.pakshaHi} (${day.tithi.startTime}–${day.tithi.endTime})`);
  console.log(`Nakshatra: ${day.nakshatra?.nameHi} (ends ${day.nakshatra?.endTime})`);
  console.log(`Yoga: ${day.yoga?.nameHi} (ends ${day.yoga?.endTime})`);
  console.log(`Karana: ${day.karana?.nameHi} (ends ${day.karana?.endTime})`);
  console.log(`Hindu Month (Purnimanta): ${day.hinduMonthPurnimanta?.hi}  Amanta: ${day.hinduMonthAmanta?.hi}  Adhika: ${day.masaIsAdhika}`);
  console.log(`Sunrise: ${day.sunTimes?.sunrise}  Sunset: ${day.sunTimes?.sunset}  Day Duration: ${day.dayDuration}`);
  console.log(`Moonrise: ${day.sunTimes?.moonrise}  Moonset: ${day.sunTimes?.moonset}`);
  console.log(`Moon Rashi: ${day.moonRashi?.nameHi}  Sun Rashi: ${day.sunRashi?.nameHi}  Sun Nakshatra: ${day.sunNakshatra?.nameHi}`);
  console.log(`Ritu: ${day.ritu?.hi}  Ayana: ${day.ayana?.hi}`);
  console.log(`Disha Shool: ${day.dishaShool?.directionHi}`);
  console.log(`Anandadi Yoga: ${day.anandadiYoga?.nameHi} (${day.anandadiYoga?.type})`);
  console.log(`Panchak: ${day.panchak}  Mool: ${day.mool}  Bhadra: ${day.bhadra?.active} (${day.bhadra?.periods?.length || 0} period(s))`);
  if (day.muhurtas) {
    console.log(`Abhijit: ${day.muhurtas.abhijit?.start}–${day.muhurtas.abhijit?.end}`);
    console.log(`Rahu Kalam: ${day.muhurtas.rahuKalam?.start}–${day.muhurtas.rahuKalam?.end}`);
    console.log(`Yamganda: ${day.muhurtas.yamganda?.start}–${day.muhurtas.yamganda?.end}`);
    console.log(`Gulika: ${day.muhurtas.gulikaKalam?.start}–${day.muhurtas.gulikaKalam?.end}`);
    console.log(`Brahma Muhurta: ${day.muhurtas.brahmaMuhurta?.start}–${day.muhurtas.brahmaMuhurta?.end}`);
  }
  if (day.choghadiya) {
    console.log(`Day Choghadiya: ${day.choghadiya.day.map((c) => `${c.nameHi} ${c.start}-${c.end}`).join(" | ")}`);
  }
  if (day.specialYogas?.length) {
    console.log(`Special Yogas: ${day.specialYogas.map((s) => s.nameHi).join(", ")}`);
  }
  if (day.todayEvents.length) {
    console.log(`Events: ${day.todayEvents.map((e) => e.nameHi).join(", ")}`);
  }
}
