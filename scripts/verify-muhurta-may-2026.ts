// Verify our muhurta-finder scoring against the published Pramanik Panchang
// "माह के शुभ मुहूर्त" table for May 2026.
//
// Run: npx tsx scripts/verify-muhurta-may-2026.ts

import { generatePanchang } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";
import { MUHURTA_EVENTS } from "../src/lib/muhurta-events.ts";
import { scoreRange } from "../src/lib/muhurta-finder.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 };
const events = getAllJainEvents();
const days = generatePanchang({ startDate: new Date(2026, 4, 1), totalDays: 31, events, location: LOC });

// Spot-check sample (one row per event we have published data for).
const PUBLISHED: Record<string, number[]> = {
  graha_pravesh: [4, 8, 13],
  vivah: [1, 3, 5, 6, 7, 8, 13, 14],
  mundan: [3, 4, 9, 10, 11, 13, 14],
  vidyarambh: [3, 6, 7, 14],
  vahan_kraya: [1, 4, 10, 11, 14],
  vyapar_arambh: [2, 6, 7],
  namakaran: [4, 13, 14],
};

// Jain pratishtha events — no publisher cross-check; just show what our engine produces.
const JAIN_EVENTS = ["bimba_pratishtha", "panch_kalyanak", "jinalaya_shilanyas", "mandir_kalash_pratishtha", "vedi_pratishtha", "dhvajarohan"];

console.log("─".repeat(60));
console.log("PART A — Hindu sanskara events (cross-check vs publisher)");
console.log("─".repeat(60) + "\n");

for (const ev of MUHURTA_EVENTS) {
  const pubDays = PUBLISHED[ev.id];
  if (!pubDays) continue;

  const scored = scoreRange(days, ev);
  const favorable = scored.filter((s) => s.verdict === "favorable").map((s) => parseInt(s.date.slice(-2), 10));
  const mixed = scored.filter((s) => s.verdict === "mixed").map((s) => parseInt(s.date.slice(-2), 10));

  const matched = pubDays.filter((d) => favorable.includes(d) || mixed.includes(d));
  const missed = pubDays.filter((d) => !favorable.includes(d) && !mixed.includes(d));

  console.log(`── ${ev.nameEn} (${ev.id})`);
  console.log(`   Published days:    ${pubDays.join(", ")}`);
  console.log(`   Our 'favorable':   ${favorable.join(", ")}`);
  console.log(`   Our 'mixed':       ${mixed.join(", ")}`);
  console.log(`   Matched (fav+mix): ${matched.length}/${pubDays.length}`);
  if (missed.length) console.log(`   ✗ Missed:          ${missed.join(", ")}`);
  console.log();
}

console.log("─".repeat(60));
console.log("PART B — Jain pratishtha events (Uttarayana-restricted; many days will be 'avoid')");
console.log("─".repeat(60) + "\n");

for (const ev of MUHURTA_EVENTS) {
  if (!JAIN_EVENTS.includes(ev.id)) continue;
  const scored = scoreRange(days, ev);
  const favorable = scored.filter((s) => s.verdict === "favorable");
  const mixed = scored.filter((s) => s.verdict === "mixed");
  const avoid = scored.filter((s) => s.verdict === "avoid");
  console.log(`── ${ev.nameEn} (${ev.id})${ev.multiDay ? ` [multi-day, default ${ev.multiDay.defaultDays}d]` : ""}`);
  if (ev.multiDay) {
    if (favorable.length) {
      console.log(`   Favorable starts:`);
      for (const f of favorable) console.log(`     - ${f.date} → ${f.endDate} (${f.durationDays}d)`);
    } else {
      console.log(`   Favorable starts: (none)`);
    }
    console.log(`   Mixed: ${mixed.length} | Avoid: ${avoid.length}`);
  } else {
    console.log(`   Favorable: ${favorable.map((s) => parseInt(s.date.slice(-2), 10)).join(", ") || "(none)"}`);
    console.log(`   Mixed:     ${mixed.map((s) => parseInt(s.date.slice(-2), 10)).join(", ") || "(none)"}`);
    console.log(`   Avoid:     ${avoid.length} days`);
  }
  console.log();
}

console.log("─".repeat(60));
console.log("PART C — Panch Kalyanak with different durations (5/7/9)");
console.log("─".repeat(60) + "\n");

const pk = MUHURTA_EVENTS.find((e) => e.id === "panch_kalyanak")!;
for (const dur of [5, 7, 9]) {
  const scored = scoreRange(days, pk, { multiDayLength: dur });
  const fav = scored.filter((s) => s.verdict === "favorable");
  console.log(`-- ${dur}-day mahotsava --`);
  if (fav.length === 0) {
    console.log(`   No fully-favorable ${dur}-day windows.`);
  } else {
    for (const f of fav) console.log(`   ✓ ${f.date} → ${f.endDate}`);
  }
  console.log();
}
