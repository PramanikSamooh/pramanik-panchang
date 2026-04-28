// /d/today — universal permalink that always redirects to the current day in IST.
// Used so a single share link (e.g. panchang.gunayatan.org/d/today) keeps showing today's
// panchang regardless of when the recipient opens it.

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function todayInIST(): string {
  const now = new Date();
  const istMs = now.getTime() + 5.5 * 3600 * 1000;
  const ist = new Date(istMs);
  const y = ist.getUTCFullYear();
  const m = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const d = String(ist.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function TodayRedirect() {
  redirect(`/d/${todayInIST()}`);
}
