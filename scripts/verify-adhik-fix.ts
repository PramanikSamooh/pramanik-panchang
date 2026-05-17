// Verify the adhik-mas fix: count occurrences of Shrut Panchami and key Jyeshtha
// kalyanaks in 2026 (year with adhik Jyeshtha May 17 → June 14).
//
// Per Jain Vardhman Calendar convention these should fire in NIJA Jyeshtha (June)
// only, not adhik Jyeshtha (May). Previously the default policy "both" caused
// double firing.

import { generatePanchang } from "../src/lib/sweph-engine.ts";
import { getAllJainEvents } from "../src/data/jain-events.ts";

const LOC = { lat: 23.1765, lng: 75.7885, tz: 330 };
const events = getAllJainEvents();

// Span the whole adhik+nija Jyeshtha window: May 1 → July 31.
const days = generatePanchang({ startDate: new Date(2026, 4, 1), totalDays: 92, events, location: LOC });

// Find every day where these events fire.
// Find IDs containing key kalyanaks
const watchPatterns = ["shrut-panchami", "shantinath", "naminath", "dharmanath", "suparshvanath", "kunthunath"];

for (const pat of watchPatterns) {
  const firings = days.filter((d) => d.todayEvents.some((e) => e.eventId.includes(pat)));
  console.log(`\n${pat}: ${firings.length} firing(s)`);
  for (const d of firings) {
    const evts = d.todayEvents.filter((e) => e.eventId.includes(pat)).map((e) => e.eventId).join(", ");
    console.log(`  - ${d.date} (${d.varaEn}) — month=${d.hinduMonth.en}${d.masaIsAdhika ? " ADHIK" : ""}  events: ${evts}`);
  }
}
