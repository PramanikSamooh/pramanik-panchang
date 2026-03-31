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
