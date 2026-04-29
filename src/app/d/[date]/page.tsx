// /d/[date] — server entry: parses params, computes the panchang server-side, emits
// Open Graph metadata, then mounts the client-side <PanchangBody/> which holds the
// user's display settings (number style, time format, language) and re-renders
// formatters live as those settings change.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { computeSingleDay, type LocationConfig } from "@/lib/sweph-engine";
import { getAllJainEvents } from "@/data/jain-events";
import { BRAND } from "@/lib/branding";
import PanchangBody from "./PanchangBody";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

type Lang = "hi" | "en" | "both";

interface PageProps {
  params: Promise<{ date: string }>;
  searchParams: Promise<{
    lat?: string; lng?: string; tz?: string; city?: string;
    lang?: string; debug?: string;
  }>;
}

const DEFAULT_LOC: LocationConfig & { name: string } = {
  name: "Ujjain",
  lat: 23.1765,
  lng: 75.7885,
  tz: 330,
};

function parseDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const [, y, mo, d] = m;
  const dt = new Date(parseInt(y), parseInt(mo) - 1, parseInt(d));
  return isNaN(dt.getTime()) ? null : dt;
}

function parseLang(s?: string): Lang {
  if (s === "hi" || s === "en") return s;
  return "both";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  const dt = parseDate(date);
  if (!dt) return { title: BRAND.longEn };
  const day = computeSingleDay(dt, getAllJainEvents(), DEFAULT_LOC);
  if (!day) return { title: `${BRAND.longEn} — ${date}` };
  const headline = `${day.hinduMonth.hi} ${day.tithi.pakshaHi.replace(" पक्ष", "")} ${day.tithi.nameHi}`;
  const eventsLine = day.todayEvents.slice(0, 3).map((e) => e.nameHi).join(" · ");
  const titleParts = [headline, day.varaHi, `VNS ${day.vnsYear}`].filter(Boolean);
  const description = eventsLine
    ? `${eventsLine} · ${day.varaHi} · सूर्योदय ${day.sunTimes?.sunrise ?? ""}`
    : `${day.varaHi} · सूर्योदय ${day.sunTimes?.sunrise ?? ""} · सूर्यास्त ${day.sunTimes?.sunset ?? ""}`;
  const title = `${titleParts.join(" · ")} — ${BRAND.shortHi}`;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary", title, description },
  };
}

function todayInIST(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 3600 * 1000);
  const y = ist.getUTCFullYear();
  const m = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const d = String(ist.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default async function DailyPanchangPage({ params, searchParams }: PageProps) {
  const { date: dateParam } = await params;
  const sp = await searchParams;
  const dt = parseDate(dateParam);
  if (!dt) notFound();

  const loc: LocationConfig & { name: string } = {
    name: sp.city ?? DEFAULT_LOC.name,
    lat: sp.lat ? parseFloat(sp.lat) : DEFAULT_LOC.lat,
    lng: sp.lng ? parseFloat(sp.lng) : DEFAULT_LOC.lng,
    tz: sp.tz ? parseInt(sp.tz) : DEFAULT_LOC.tz,
  };
  const lang = parseLang(sp.lang);
  const debugMode = sp.debug === "1";

  const day = computeSingleDay(dt, getAllJainEvents(), loc);
  if (!day) {
    return (
      <div className="mx-auto max-w-5xl p-8 text-center text-stone-700">
        Could not compute panchang for {dateParam}.
      </div>
    );
  }

  const isToday = day.date === todayInIST();

  return (
    <PanchangBody
      day={day}
      lang={lang}
      loc={loc}
      isToday={isToday}
      dateParam={dateParam}
      debugMode={debugMode}
    />
  );
}
