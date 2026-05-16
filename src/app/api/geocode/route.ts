// Geocode API — turns a free-text city query into [{ label, lat, lng, tz }] entries
// the UI can offer as suggestions. Uses Nominatim (OpenStreetMap) for the lat/lng
// lookup and `tz-lookup` for the IANA timezone, then converts that to a numeric
// minutes-from-UTC offset for the current moment.

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// tz-lookup has no TS types — declare a minimal shape.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const tzLookup = require("tz-lookup") as (lat: number, lng: number) => string;

interface NominatimHit {
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  class?: string;
  importance?: number;
}

interface GeocodeResult {
  label: string;
  lat: number;
  lng: number;
  /** IANA timezone name, e.g. "Asia/Kolkata". */
  tzName: string;
  /** Numeric offset from UTC in minutes for the current moment. */
  tz: number;
}

function ianaToMinutes(ianaName: string, at: Date = new Date()): number {
  // Use Intl to extract the shortOffset string (e.g. "GMT+5:30" or "GMT-04:00")
  // for the given timezone at the given moment, then parse it into minutes.
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaName,
    timeZoneName: "shortOffset",
    hour: "numeric",
  });
  const parts = fmt.formatToParts(at);
  const offsetStr = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  // Forms: "GMT", "GMT+5", "GMT+5:30", "GMT-04:00"
  const m = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(offsetStr);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  const hours = parseInt(m[2], 10);
  const mins = m[3] ? parseInt(m[3], 10) : 0;
  return sign * (hours * 60 + mins);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "8", 10) || 8, 15);

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", q);
    url.searchParams.set("format", "json");
    url.searchParams.set("addressdetails", "0");
    url.searchParams.set("limit", String(limit));

    const res = await fetch(url.toString(), {
      headers: {
        // Nominatim usage policy: identify the application + a contact URL.
        "User-Agent": "pramanik-panchang-finder/1.0 (panchang.gunayatan.org)",
        "Accept-Language": "en",
      },
    });
    if (!res.ok) {
      return NextResponse.json({ error: `Geocoder HTTP ${res.status}`, results: [] }, { status: 502 });
    }
    const hits = (await res.json()) as NominatimHit[];

    const results: GeocodeResult[] = hits.map((h) => {
      const lat = parseFloat(h.lat);
      const lng = parseFloat(h.lon);
      let tzName = "UTC";
      try { tzName = tzLookup(lat, lng); } catch { /* leave as UTC */ }
      const tz = ianaToMinutes(tzName);
      return { label: h.display_name, lat, lng, tzName, tz };
    });

    return NextResponse.json({ results });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg, results: [] }, { status: 500 });
  }
}
