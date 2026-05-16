// Test different moonrise flag combinations to find which matches Drik Panchang.
// Drik for May 18, 2026 Ujjain: moonrise 06:48, moonset 21:00.

import sweph from "sweph";

const C = sweph.constants as Record<string, number>;
console.log("Available SE_BIT_* constants:");
for (const k of Object.keys(C)) {
  if (k.startsWith("SE_BIT_") || k.startsWith("SE_CALC_")) {
    console.log(`  ${k} = ${C[k]}`);
  }
}

const SE_CALC_RISE = 1;
const SE_CALC_SET = 2;

const LOC_UJJAIN = { lat: 23.1765, lng: 75.7885, tz: 330 };
const geopos: [number, number, number] = [LOC_UJJAIN.lng, LOC_UJJAIN.lat, 0];

// May 18, 2026 midnight IST = May 17 18:30 UT
const dt = new Date(Date.UTC(2026, 4, 17, 18, 30, 0));
const jdStart = 2440587.5 + dt.getTime() / 86400000;

function fmtUtcToIst(jd: number): string {
  const utcMs = (jd - 2440587.5) * 86400000;
  const ist = new Date(utcMs + 330 * 60 * 1000);
  const hh = String(ist.getUTCHours()).padStart(2, "0");
  const mm = String(ist.getUTCMinutes()).padStart(2, "0");
  const ss = String(ist.getUTCSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function tryFlags(label: string, extraBits: number) {
  const rise = sweph.rise_trans(jdStart, C.SE_MOON, "", C.SEFLG_SWIEPH, SE_CALC_RISE | extraBits, geopos, 1013.25, 15);
  const set  = sweph.rise_trans(jdStart, C.SE_MOON, "", C.SEFLG_SWIEPH, SE_CALC_SET  | extraBits, geopos, 1013.25, 15);
  const r = typeof rise.data === "number" ? fmtUtcToIst(rise.data) : "—";
  const s = typeof set.data === "number" ? fmtUtcToIst(set.data) : "—";
  console.log(`  ${label.padEnd(50)} rise=${r}  set=${s}`);
}

console.log("\nMay 18, 2026 Ujjain — moonrise/moonset under various flag combos:\n");
console.log(`  Drik reference                                     rise=06:48      set=21:00`);
tryFlags("default (no bit flags)", 0);
tryFlags("DISC_CENTER", C.SE_BIT_DISC_CENTER ?? 256);
tryFlags("NO_REFRACTION", C.SE_BIT_NO_REFRACTION ?? 512);
tryFlags("DISC_CENTER + NO_REFRACTION", (C.SE_BIT_DISC_CENTER ?? 256) | (C.SE_BIT_NO_REFRACTION ?? 512));
tryFlags("GEOCTR_NO_ECL_LAT", C.SE_BIT_GEOCTR_NO_ECL_LAT ?? 1024);
tryFlags("HINDU_RISING", C.SE_BIT_HINDU_RISING ?? 2048);
tryFlags("DISC_BOTTOM", C.SE_BIT_DISC_BOTTOM ?? 8192);
tryFlags("DISC_CENTER + GEOCTR_NO_ECL_LAT", (C.SE_BIT_DISC_CENTER ?? 256) | (C.SE_BIT_GEOCTR_NO_ECL_LAT ?? 1024));

// Sun rise/set comparison
console.log("\nSUN rise/set May 18 2026 Ujjain — Drik says rise=05:45, set=19:02");
function tryFlagsSun(label: string, extraBits: number) {
  const rise = sweph.rise_trans(jdStart, C.SE_SUN, "", C.SEFLG_SWIEPH, SE_CALC_RISE | extraBits, geopos, 1013.25, 15);
  const set  = sweph.rise_trans(jdStart, C.SE_SUN, "", C.SEFLG_SWIEPH, SE_CALC_SET  | extraBits, geopos, 1013.25, 15);
  const r = typeof rise.data === "number" ? fmtUtcToIst(rise.data) : "—";
  const s = typeof set.data === "number" ? fmtUtcToIst(set.data) : "—";
  console.log(`  ${label.padEnd(50)} rise=${r}  set=${s}`);
}
tryFlagsSun("default (no bit flags)", 0);
tryFlagsSun("DISC_CENTER + NO_REFRACTION", (C.SE_BIT_DISC_CENTER ?? 256) | (C.SE_BIT_NO_REFRACTION ?? 512));
