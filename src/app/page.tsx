// Homepage redirects to /d/<today>. The daily-panchang widget at /d/[date] is the canonical
// landing page for end users; the homepage exists only so panchang.gunayatan.org/ also works.

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function todayLocalISOInIST(): string {
  // Server-side: use IST (UTC+5:30) so /d/<today> matches what most Indian users expect
  // when they open the bare URL near midnight.
  const now = new Date();
  const istMs = now.getTime() + 5.5 * 3600 * 1000;
  const ist = new Date(istMs);
  const y = ist.getUTCFullYear();
  const m = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const d = String(ist.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function Home() {
  redirect(`/d/${todayLocalISOInIST()}`);
}
