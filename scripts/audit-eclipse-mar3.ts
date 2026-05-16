// Cross-check the Mar 3, 2026 Chandra Grahan visible from Ujjain.
// Per Drik Panchang and astronomy sources for Ujjain:
//   - This is a total lunar eclipse; moon rises during the eclipse so only
//     latter half is visible from India.
//   - Sutak (9h before partial-begin) should apply since the eclipse is visible.

import { computeSingleDay } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 };
const events = getAllJainEvents();

for (const dateStr of ["2026-03-03", "2026-03-04", "2026-02-17", "2026-08-28"]) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const day = computeSingleDay(new Date(y, m - 1, d), events, LOC);
  if (!day) continue;
  console.log(`── ${dateStr} (${day.varaEn})`);
  if (!day.eclipses || day.eclipses.length === 0) {
    console.log("  (no eclipse / sutak)\n");
    continue;
  }
  for (const e of day.eclipses) {
    console.log(`  ★ ${e.type === "surya" ? "Surya Grahan" : "Chandra Grahan"} (${e.kind}) — visible: ${e.visible}`);
    console.log(`    eclipse: ${e.startTime} → ${e.maxTime} → ${e.endTime}  magnitude=${e.magnitude?.toFixed(3)}`);
    if (e.visible) console.log(`    sutak:   ${e.sutakStart} → ${e.sutakEnd}`);
  }
  console.log();
}

console.log("--- Drik reference for Mar 3, 2026 Ujjain (Chandra Grahan) ---");
console.log("  Type: Total lunar eclipse");
console.log("  Visible: Yes (moon rises during eclipse from India)");
console.log("  Penumbra begin: 13:43 IST (not visible — before moonrise)");
console.log("  Umbra begin:    15:00 IST (not visible)");
console.log("  Total begin:    16:17 IST (not visible — before moonrise ~18:30 in Ujjain)");
console.log("  Greatest:       17:11 IST");
console.log("  Total end:      18:06 IST");
console.log("  Umbra end:      19:23 IST");
console.log("  Penumbra end:   20:39 IST");
console.log("  Sutak start:    ~ 9 hours before umbra-begin = 06:00 IST");
