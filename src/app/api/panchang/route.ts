import { NextRequest, NextResponse } from "next/server";
import type { LocationConfig } from "@/lib/sweph-engine";
import type { JainEvent } from "@/data/jain-events";

// Force Node.js runtime — sweph is a native binding, can't run on Edge
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PanchangRequest {
  mode: "year" | "range" | "single";
  year?: number;
  startMonth?: number; // 0-indexed
  startYear?: number;
  endMonth?: number;
  endYear?: number;
  date?: string; // YYYY-MM-DD for single mode
  location: LocationConfig;
  customEvents?: JainEvent[];
}

export async function POST(req: NextRequest) {
  try {
    // Lazy-load the engine and events so any module-load failure (e.g., sweph native binary
    // missing) is caught here and returned as a structured JSON error instead of a generic
    // "Internal Server Error" HTML page.
    const [{ generatePanchang, computeSingleDay }, { getAllJainEvents }] = await Promise.all([
      import("@/lib/sweph-engine"),
      import("@/data/jain-events"),
    ]);

    const body = (await req.json()) as PanchangRequest;
    const events = body.customEvents ?? getAllJainEvents();

    if (body.mode === "single" && body.date) {
      const [y, m, d] = body.date.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      const day = computeSingleDay(date, events, body.location);
      return NextResponse.json({ days: day ? [day] : [] });
    }

    let startDate: Date;
    let totalDays: number;

    if (body.mode === "range") {
      if (
        body.startMonth === undefined ||
        body.startYear === undefined ||
        body.endMonth === undefined ||
        body.endYear === undefined
      ) {
        return NextResponse.json({ error: "Missing range parameters" }, { status: 400 });
      }
      startDate = new Date(body.startYear, body.startMonth, 1);
      const endDate = new Date(body.endYear, body.endMonth + 1, 0);
      totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
    } else if (body.mode === "year" && body.year !== undefined) {
      startDate = new Date(body.year, 0, 1);
      totalDays = (body.year % 4 === 0 && (body.year % 100 !== 0 || body.year % 400 === 0)) ? 366 : 365;
    } else {
      return NextResponse.json({ error: "Invalid mode or missing parameters" }, { status: 400 });
    }

    const days = generatePanchang({
      startDate,
      totalDays,
      events,
      location: body.location,
    });

    return NextResponse.json({ days });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : undefined;
    console.error("[/api/panchang] error:", msg, stack);
    return NextResponse.json({ error: msg, stack: process.env.NODE_ENV === "production" ? undefined : stack }, { status: 500 });
  }
}

// Health probe — GET /api/panchang returns OK if the engine module loads cleanly.
export async function GET() {
  try {
    await import("@/lib/sweph-engine");
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
