// One-shot dump: per-day angas for May 2026, used to reverse-engineer the published
// "माह के शुभ मुहूर्त" table from Pramanik Panchang into our rule constants.
//
// Run: npx tsx scripts/dump-may-2026.ts
//
// Columns: date | vara | tithi (paksha) | nakshatra# nakshatra | yoga# yoga | karana | panchak/bhadra/mool/sarvarthasiddhi/amritsiddhi | moonRashi

import { computeSingleDay } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 }; // Ujjain
const events = getAllJainEvents();

function pad(s: string, n: number): string {
  return (s + " ".repeat(n)).slice(0, n);
}

function flags(d: any): string {
  const out: string[] = [];
  if (d.panchak) out.push("panchak");
  if (d.bhadra?.active) out.push("bhadra");
  if (d.mool) out.push("mool");
  if (d.kshayaTithi) out.push(`kshaya:${d.kshayaTithi.number}`);
  if (d.isVriddhiRepeat) out.push("vriddhi");
  for (const sy of (d.specialYogas || [])) out.push(sy.nameEn);
  return out.join(",") || "—";
}

const VARA = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

console.log(
  pad("Date", 12) + " " +
  pad("V", 3) + " " +
  pad("Tithi", 18) + " " +
  pad("Nakshatra", 22) + " " +
  pad("Yoga", 18) + " " +
  pad("Karana", 10) + " " +
  pad("MoonR", 12) + " " +
  "Flags"
);
console.log("─".repeat(120));

for (let d = 1; d <= 31; d++) {
  const date = new Date(2026, 4, d); // May = month 4 (0-indexed)
  const day = computeSingleDay(date, events, LOC);
  if (!day) { console.log(`2026-05-${String(d).padStart(2, "0")}: NULL`); continue; }
  const dt = new Date(2026, 4, d);
  const vara = VARA[dt.getDay()];
  const paksha = day.tithi.pakshaEn.includes("Shukla") ? "S" : "K";
  console.log(
    pad(day.date, 12) + " " +
    pad(vara, 3) + " " +
    pad(`${paksha}${day.tithi.number} ${day.tithi.nameEn}`, 18) + " " +
    pad(`#${day.nakshatra?.number} ${day.nakshatra?.nameEn}`, 22) + " " +
    pad(`#${day.yoga?.number} ${day.yoga?.nameEn}`, 18) + " " +
    pad(`${day.karana?.nameEn}`, 10) + " " +
    pad(`${day.moonRashi?.nameEn}`, 12) + " " +
    flags(day)
  );
}
