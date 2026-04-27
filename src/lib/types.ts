export interface PanchangDay {
  date: string; // YYYY-MM-DD
  vnsYear: number;
  vnsDateHi: string; // e.g., "चैत्र शुक्ल 13"
  varaHi: string;
  varaEn: string;
  tithi: {
    number: number; // 1-15 within paksha
    nameHi: string;
    nameEn: string;
    pakshaHi: string;
    pakshaEn: string;
    startTime: string;
    endTime: string;
  };
  hinduMonth: { hi: string; en: string };
  todayEvents: EventSummary[];
  upcomingEvents: UpcomingEvent[];
  // Kshaya (skipped) tithi — merged into this day
  kshayaTithi?: {
    number: number;
    nameHi: string;
    nameEn: string;
  };
  // Vriddhi (repeated) tithi — this is the second day of same tithi
  isVriddhiRepeat?: boolean;

  // ── Phase A astronomical fields (all optional, backwards-compatible) ──
  nakshatra?: {
    number: number; // 1-27
    nameHi: string;
    nameEn: string;
    endTime: string;
  };
  yoga?: {
    number: number; // 1-27
    nameHi: string;
    nameEn: string;
    endTime: string;
  };
  karana?: {
    nameHi: string;
    nameEn: string;
    endTime: string;
  };
  sunTimes?: {
    sunrise: string;
    sunset: string;
    moonrise?: string;
    moonset?: string;
  };
  rahuKalam?: { start: string; end: string };
  masaIsAdhika?: boolean;
  ritu?: { hi: string; en: string };
  ayana?: { hi: string; en: string };

  // ── Phase B fields ──
  moonRashi?: { number: number; nameHi: string; nameEn: string; entryTime?: string };
  sunRashi?: { number: number; nameHi: string; nameEn: string; entryTime?: string };
  sunNakshatra?: { number: number; nameHi: string; nameEn: string; entryTime?: string };
  specialYogas?: SpecialYogaPeriod[];
  panchak?: boolean;       // moon in Dhanishta(2nd half), Shatabhisha, P-Bhadra, U-Bhadra, Revati
  bhadra?: { active: boolean; periods?: Array<{ startTime: string; endTime: string }> };
  mool?: boolean;          // moon in gandanta nakshatras (Ashlesha, Magha, Jyeshtha, Mula, Revati, Ashwini)
}

// ── Phase B (reserved — shipped in subsequent release) ──
export interface SpecialYogaPeriod {
  key:
    | "ravi"
    | "sarvarthasiddhi"
    | "amrit-siddhi"
    | "ravipushya"
    | "gurupushya"
    | "tripushkar"
    | "dvipushkar";
  nameHi: string;
  nameEn: string;
  startTime: string;
  endTime: string;
}

export interface EventSummary {
  eventId: string;
  nameHi: string;
  nameEn: string;
  category: string;
  colorTheme: string;
}

export interface UpcomingEvent {
  eventId: string;
  nameHi: string;
  nameEn: string;
  date: string; // YYYY-MM-DD
}
