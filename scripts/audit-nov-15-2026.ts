// Post-Diwali audit for Nov 15, 2026 (Ujjain) — checks year/samvat handling
// across the Vir Nirvan boundary (Diwali = Nov 9, 2026).

import { computeSingleDay } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 };
const events = getAllJainEvents();
const day = computeSingleDay(new Date(2026, 10, 15), events, LOC);
if (!day) { console.error("null"); process.exit(1); }

console.log("\n══ AUDIT: Nov 15, 2026 (Ujjain) — post-Diwali year boundary ══\n");

function cmp(label: string, ours: any, theirs: any) {
  const o = String(ours ?? "—");
  const t = String(theirs ?? "—");
  console.log(`  ${o === t ? "✓" : "✗"}  ${(label + " ".repeat(22)).slice(0, 22)} | ours: ${(o + " ".repeat(18)).slice(0, 18)} | drik: ${t}`);
}

cmp("Sunrise", day.sunTimes?.sunrise, "06:40");
cmp("Sunset", day.sunTimes?.sunset, "17:42");
cmp("Tithi paksha", day.tithi.pakshaEn.replace(" Paksha", ""), "Shukla");
cmp("Tithi name", day.tithi.nameEn, "Shashthi");
cmp("Purnimanta month", day.hinduMonth.en, "Kartika");
cmp("Amanta month", day.hinduMonthAmanta?.en, "Kartika");
cmp("Vikram Samvat", day.samvats?.vikram, 2083);
cmp("Shaka Samvat", day.samvats?.shaka, 1948);
console.log(`  ?  Vir Nirvan Samvat      | ours: ${day.samvats?.virNirvan}                | (expected 2553 — post-Diwali)`);
console.log(`  ?  Mahavir Janma Samvat   | ours: ${day.samvats?.mahavirJanma}                | (expected 2626 = VNS + 73)`);
