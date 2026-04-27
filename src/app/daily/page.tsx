"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function todayLocal(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export default function DailyIndexPage() {
  const router = useRouter();
  const [date, setDate] = useState(todayLocal());

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="mx-auto max-w-md rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h1 className="mb-4 text-xl font-bold text-orange-500">Daily Panchang Card</h1>
        <p className="mb-4 text-sm text-gray-400">
          Pick a date to view a printable, shareable daily panchang card. The card includes tithi,
          nakshatra, yoga, karana, sunrise/sunset, all standard muhurtas, choghadiya, disha shool,
          samvats, and any festivals or kalyanaks for the day.
        </p>
        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
          />
          <button
            onClick={() => router.push(`/daily/${date}`)}
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            View →
          </button>
        </div>
        <button
          onClick={() => router.push(`/daily/${todayLocal()}`)}
          className="mt-3 w-full rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-orange-500 hover:text-orange-400"
        >
          Today&apos;s Panchang
        </button>
      </div>
    </div>
  );
}
