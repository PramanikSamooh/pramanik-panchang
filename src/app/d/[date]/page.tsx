// Server component for /d/[date]. Computes the panchang server-side so the page can:
//   - render fast (no client fetch round-trip)
//   - emit Open Graph metadata that includes the day's headline tithi and any events
//     (so a WhatsApp/Telegram preview shows real content, not a generic title)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { computeSingleDay } from "@/lib/sweph-engine";
import { getAllJainEvents } from "@/data/jain-events";
import type { PanchangDay } from "@/lib/types";
import PanchangWidget from "./PanchangWidget";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const INDORE = { lat: 22.7196, lng: 75.8577, tz: 330 };

interface Props {
  params: Promise<{ date: string }>;
}

function parseDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return new Date(y, mo - 1, d);
}

function tithiHeadline(day: PanchangDay): string {
  return `${day.hinduMonth.hi} ${day.tithi.pakshaHi.replace(" पक्ष", "")} ${day.tithi.nameHi}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const d = parseDate(date);
  if (!d) return { title: "Pramanik Jain Panchang" };
  const day = computeSingleDay(d, getAllJainEvents(), INDORE);
  if (!day) return { title: `Pramanik Jain Panchang — ${date}` };

  const headline = tithiHeadline(day);
  const eventsLine = day.todayEvents.slice(0, 3).map((e) => e.nameHi).join(" · ");
  const titleParts = [headline, day.varaHi, `VNS ${day.vnsYear}`].filter(Boolean);
  const description = eventsLine
    ? `${eventsLine} · ${day.varaHi} · सूर्योदय ${day.sunTimes?.sunrise ?? ""}`
    : `${day.varaHi} · सूर्योदय ${day.sunTimes?.sunrise ?? ""} · सूर्यास्त ${day.sunTimes?.sunset ?? ""}`;

  const title = `${titleParts.join(" · ")} — तीर्थंकर वर्धमान जैन पंचांग`;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary", title, description },
  };
}

export default async function DailyPage({ params }: Props) {
  const { date } = await params;
  const d = parseDate(date);
  if (!d) notFound();
  const day = computeSingleDay(d, getAllJainEvents(), INDORE);
  if (!day) notFound();

  return <PanchangWidget initialDay={day} initialDate={date} />;
}
