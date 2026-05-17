// Liveness probe used by the Docker HEALTHCHECK. Returns immediately without
// touching the panchang engine — a request to `/` would redirect to
// /d/<today> and trigger a sweph compute, which can exceed the healthcheck
// timeout on cold start (Moshier ephemeris fallback is ~30× slower than .se1).

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ ok: true });
}
