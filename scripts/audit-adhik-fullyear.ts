// Full audit of the 2026 Adhik Jyeshtha window — confirms the engine reproduces
// the Tirthankar Vardhman Calendar 2026 event placement.
//
// Vardhman convention (verified visually from calendar pages 5-7):
//   - Adhik Jyeshtha (Amanta): May 17 → Jun 14 (Amavasya boundaries).
//   - During the adhik window NO parvas / kalyanaks / vrats fire.
//   - Events resume Jun 15 (Nija Jyeshtha Shukla 1).
//   - Pre-adhik events (e.g. kshaya-merged Krishna 14 → Trayodashi on May 15
//     which is still in Vaishakha Amanta) DO fire — they're outside the
//     adhik window.
//   - Nakshatra observances (Rohini Vrat) fire monthly regardless.

import { generatePanchang } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 };
const events = getAllJainEvents();
const days = generatePanchang({ startDate: new Date(2026, 4, 1), totalDays: 92, events, location: LOC });

// Published Vardhman 2026 placements (verified against the calendar PDF
// pages 5-7, May-Jul window with adhik Jyeshtha — corrections after user
// reading the high-res scans):
const VARDHMAN_REFS: Array<{ date: string; expect: string[] }> = [
  // MAY (Pratham/Adhik Jyeshtha page header)
  { date: "2026-05-08", expect: ["shreyanasanatha-garbh"] },                        // 8 - श्रेयांसनाथ गर्भ
  { date: "2026-05-15", expect: ["shantinatha-janma", "shantinatha-tap", "shantinatha-moksha"] }, // 15 - शान्ति जयन्ती - तप
  // May 16 — "Shani Amavasya" label only, no Tirthankar event.
  // JUNE (Dwitiya/Nija Jyeshtha page header)
  { date: "2026-06-18", expect: ["dharmanatha-moksha"] },                            // 18 - धर्मनाथ मोक्ष
  { date: "2026-06-26", expect: ["suparshvanatha-janma", "suparshvanatha-tap"] },    // 26 - सुपार्श्वनाथ जन्म-तप
];

console.log("PART A — calendar-published placements\n");
let aOk = 0, aMiss = 0;
for (const ref of VARDHMAN_REFS) {
  const day = days.find((d) => d.date === ref.date);
  const found = day?.todayEvents.map((e) => e.eventId) ?? [];
  for (const want of ref.expect) {
    const hit = found.some((id) => id.includes(want));
    console.log(`  ${hit ? "✓" : "✗"} ${ref.date}  expect=${want.padEnd(28)}  found=${found.join(", ") || "(none)"}`);
    if (hit) aOk++; else aMiss++;
  }
}
console.log(`\n  Total: ${aOk}/${aOk + aMiss} match\n`);

// PART B — confirm NO month-anchored events fire inside Adhik Jyeshtha (May 17 → Jun 14)
console.log("PART B — adhik mas suppression (May 17 → Jun 14)\n");
const adhikDays = days.filter((d) => d.date >= "2026-05-17" && d.date <= "2026-06-14");
let leaks = 0;
for (const d of adhikDays) {
  if (!d.todayEvents.length) continue;
  // Look up event definitions to distinguish nakshatra/fixed events (allowed) from month-anchored (should be suppressed).
  const lookup = new Map(events.map((e) => [e.id, e]));
  for (const evt of d.todayEvents) {
    const def = lookup.get(evt.eventId);
    if (!def) continue;
    const allowed = !!(def.fixedDate || def.gregorianOverrides || def.nakshatraRule);
    if (!allowed) {
      console.log(`  ✗ LEAK ${d.date} (${d.varaEn})  ${evt.eventId} [${def.category}]  — month-anchored event fired during adhik`);
      leaks++;
    }
  }
}
if (leaks === 0) console.log("  ✓ Zero leaks. All month-anchored events correctly suppressed in adhik zone.");
else console.log(`\n  ✗ ${leaks} leaks found.`);

// PART C — confirm parvas resume in nija portion (Jun 15+)
console.log("\nPART C — nija resumption (Jun 15 → Jul 13)\n");
const nijaDays = days.filter((d) => d.date >= "2026-06-15" && d.date <= "2026-07-13");
const nijaEvents = nijaDays.flatMap((d) => d.todayEvents.map((e) => ({ date: d.date, id: e.eventId, name: e.nameHi })));
const KEY_NIJA = ["shrut-panchami", "dharmanatha-moksha", "suparshvanatha"];
for (const k of KEY_NIJA) {
  const hits = nijaEvents.filter((e) => e.id.includes(k));
  console.log(`  ${hits.length > 0 ? "✓" : "✗"} ${k.padEnd(20)} → ${hits.map((h) => `${h.date} ${h.id}`).join(", ") || "(not fired in nija!)"}`);
}

// PART D — confirm Rohini Vrat (nakshatraRule) keeps firing through adhik
console.log("\nPART D — Rohini Vrat (nakshatra-based, monthly)\n");
const rohini = days.filter((d) => d.todayEvents.some((e) => e.eventId === "rohini-vrat"));
console.log(`  Found ${rohini.length} firings across the 92-day window (expect ~3):`);
for (const d of rohini) console.log(`    - ${d.date} (${d.varaEn})${d.masaIsAdhika ? " [adhik]" : ""}`);
