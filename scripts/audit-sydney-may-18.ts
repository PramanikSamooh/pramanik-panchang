// Audit Sydney, Australia for May 18, 2026 — verify timezone handling outside India.
// Drik reference: sunrise 06:42, sunset 17:01, moonrise 08:22, moonset 17:51,
// tithi Dwitiya upto 22:23, Rohini upto 16:02, Sukarma upto 02:18 May 19.

import { computeSingleDay } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

// Sydney: AEST = UTC+10 = 600 minutes (no daylight saving in May)
const LOC = { lat: -33.8688, lng: 151.2093, tz: 600 };
const events = getAllJainEvents();
const day = computeSingleDay(new Date(2026, 4, 18), events, LOC);
if (!day) { console.error("null"); process.exit(1); }

function cmp(label: string, ours: any, theirs: any) {
  const o = String(ours ?? "—");
  const t = String(theirs ?? "—");
  console.log(`  ${o === t ? "✓" : "✗"}  ${(label + " ".repeat(22)).slice(0, 22)} | ours: ${(o + " ".repeat(18)).slice(0, 18)} | drik: ${t}`);
}

console.log("\n══ AUDIT: May 18, 2026 (Sydney, Australia — UTC+10) ══\n");
cmp("Sunrise", day.sunTimes?.sunrise, "06:42");
cmp("Sunset", day.sunTimes?.sunset, "17:01");
cmp("Moonrise", day.sunTimes?.moonrise, "08:22");
cmp("Moonset", day.sunTimes?.moonset, "17:51");
cmp("Tithi paksha", day.tithi.pakshaEn.replace(" Paksha", ""), "Shukla");
cmp("Tithi name", day.tithi.nameEn, "Dwitiya");
cmp("Tithi end", day.tithi.endTime, "22:23");
cmp("Nakshatra name", day.nakshatra?.nameEn, "Rohini");
cmp("Nakshatra end", day.nakshatra?.endTime, "16:02");
cmp("Yoga name", day.yoga?.nameEn, "Sukarma");
cmp("Rahu start", day.muhurtas?.rahuKalam?.start, "07:59");
cmp("Rahu end", day.muhurtas?.rahuKalam?.end, "09:17");
cmp("Abhijit start", day.muhurtas?.abhijit?.start, "11:31");
cmp("Abhijit end", day.muhurtas?.abhijit?.end, "12:12");
cmp("Hindu month", `${day.hinduMonth.en}${day.masaIsAdhika ? " (Adhik)" : ""}`, "Jyeshtha (Adhik)");
