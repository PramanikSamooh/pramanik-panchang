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

  // ── Muhurta fields (for daily-share cards) ──
  muhurtas?: {
    abhijit?: { start: string; end: string };       // most auspicious mid-day muhurta
    rahuKalam?: { start: string; end: string };     // inauspicious — unchanged from rahuKalam above (kept for printable card layout)
    yamganda?: { start: string; end: string };      // inauspicious
    gulikaKalam?: { start: string; end: string };   // inauspicious
    kulik?: { start: string; end: string };         // inauspicious
    kalvela?: { start: string; end: string };       // inauspicious — kalvela / yamghant
    kantakMrityu?: { start: string; end: string };  // inauspicious
    yamghant?: { start: string; end: string };      // inauspicious (yamchant)
    dushtaMuhurta?: Array<{ start: string; end: string }>; // 1-2 inauspicious slots
    brahmaMuhurta?: { start: string; end: string }; // pre-dawn auspicious
  };

  // Choghadiya — 8 day segments and 8 night segments. Each segment is one of:
  // amrit, kaal, shubh, rog, udveg, chal, labh
  choghadiya?: {
    day: Array<{ name: string; nameHi: string; type: "shubh" | "ashubh"; start: string; end: string }>;
    night: Array<{ name: string; nameHi: string; type: "shubh" | "ashubh"; start: string; end: string }>;
  };

  // Disha Shool — inauspicious direction for travel based on day of week
  dishaShool?: { direction: string; directionHi: string };

  // Anandadi Yoga — auspicious/inauspicious based on nakshatra+vara combination, 28-cycle
  anandadiYoga?: { name: string; nameHi: string; type: "shubh" | "ashubh" };

  // Day duration (sunset - sunrise) — formatted "HH:MM"
  dayDuration?: string;

  // Samvats
  samvats?: {
    vikram: number;       // Vikram Samvat (e.g., 2083)
    shaka: number;        // Shaka Samvat
    virNirvan: number;    // Vir Nirvana Samvat (e.g., 2552)
    mahavirJanma: number; // Mahavir Janma Samvat (e.g., 2625)
  };

  // Both calendar conventions for header display
  hinduMonthAmanta?: { hi: string; en: string };
  hinduMonthPurnimanta?: { hi: string; en: string };

  // Ras Tyag — the food/taste traditionally given up on this weekday (Jain practice)
  rasTyag?: { rasHi: string; rasEn: string; itemsHi: string; itemsEn: string; emoji: string };

  // ── Jyotisha extras (for the multi-page widget's astronomical detail page) ──
  /** Pada (1-4) of the moon's current nakshatra */
  nakshatraPada?: number;
  /** Tithi pravritti — nanda/bhadra/jaya/rikta/purna */
  tithiPravritti?: { nameHi: string; nameEn: string };
  /** Planetary lord of the first hora at sunrise (Sun/Moon/Mars/etc.) */
  horaLordSunrise?: { planetEn: string; planetHi: string };
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
