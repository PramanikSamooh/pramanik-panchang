import { TIRTHANKARAS } from "./tirthankaras";

export type JainEventCategory =
  | "panch_kalyanak"
  | "jain_parv"
  | "national"
  | "vrat"
  | "acharya"
  | "muhurt";

export interface JainEvent {
  id: string;
  category: JainEventCategory;
  tirthankaraNumber: number | null;
  kalyanakType: string | null; // garbh|janma|tap|gyan|moksha
  nameHi: string;
  nameEn: string;
  hinduMonth: string;
  hinduPaksha: string;
  hinduTithi: number;
  colorTheme: string;
  isActive: boolean;
  gregorianOverrides?: Record<string, string>;
  // Fixed Gregorian date (MM-DD) — for national holidays etc.
  fixedDate?: string; // e.g., "01-26" for Jan 26

  // Multi-day vrats — fires on every tithi from start..end (inclusive)
  tithiRange?: { startTithi: number; endTithi: number };
  // Nakshatra-driven events (e.g. Rohini Vrat, monthly on Rohini nakshatra)
  nakshatraRule?: { nakshatraNumber: number };
  // Adhika-maas policy — Digambara default is "nija-only"
  adhikaMaasPolicy?: "nija-only" | "both" | "adhika-only" | "skip";
  // Calendar convention for the month name. Default is "either" (matches both Amanta and
  // Purnimanta naming, used for kalyanaks/parvas that the Excel sources mix). Set to "amanta"
  // for events traditionally observed by Amanta convention — Jain vrats like Ratnatraya,
  // Pushpanjali, Labdhi Vidhan, Shodash Karan, Ashtahnika, Dash Lakshan all follow Amanta.
  monthConvention?: "amanta" | "purnimanta" | "either";
  // Whether this event should be included in export by default (false = opt-in, e.g. acharya)
  includeByDefault?: boolean;
  // For category "acharya"
  acharyaName?: string;
  acharyaEventType?: "diksha" | "samadhi" | "acharya-pad" | "muni-diksha" | "other";
  // Marks events whose tithi was changed from prior data (parastvchannel.com) to match the
  // 2026 तीर्थंकर वर्धमान जैन पंचांग Excel — pending confirmation from a jyotishacharya before
  // these are considered fully authoritative.
  pendingVerification?: { reason: string; previousTithi?: string };
}

export const KALYANAK_TYPES = [
  { key: "garbh", hi: "गर्भ कल्याणक", en: "Garbh Kalyanak" },
  { key: "janma", hi: "जन्म कल्याणक", en: "Janma Kalyanak" },
  { key: "tap", hi: "तप कल्याणक", en: "Tap Kalyanak (Diksha)" },
  { key: "gyan", hi: "केवलज्ञान कल्याणक", en: "Kevalgyan Kalyanak" },
  { key: "moksha", hi: "मोक्ष कल्याणक", en: "Moksha Kalyanak" },
];

export const HINDU_MONTHS = [
  { en: "Chaitra", hi: "चैत्र" },
  { en: "Vaishakha", hi: "वैशाख" },
  { en: "Jyeshtha", hi: "ज्येष्ठ" },
  { en: "Ashadha", hi: "आषाढ़" },
  { en: "Shravana", hi: "श्रावण" },
  { en: "Bhadrapada", hi: "भाद्रपद" },
  { en: "Ashwin", hi: "आश्विन" },
  { en: "Kartik", hi: "कार्तिक" },
  { en: "Margashirsha", hi: "मार्गशीर्ष" },
  { en: "Pausha", hi: "पौष" },
  { en: "Magha", hi: "माघ" },
  { en: "Phalguna", hi: "फाल्गुन" },
];

export const TITHI_NAMES_HI = [
  "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी",
  "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
  "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी",
];

// Nakshatras 1..27 — library uses 0-indexed; we add 1 when displaying
export const NAKSHATRA_NAMES_HI = [
  "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा",
  "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पूर्वाफाल्गुनी", "उत्तराफाल्गुनी",
  "हस्त", "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा",
  "मूल", "पूर्वाषाढ़ा", "उत्तराषाढ़ा", "श्रवण", "धनिष्ठा", "शतभिषा",
  "पूर्वाभाद्रपद", "उत्तराभाद्रपद", "रेवती",
];

export const NAKSHATRA_NAMES_EN = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

// Yogas 1..27
export const YOGA_NAMES_HI = [
  "विष्कम्भ", "प्रीति", "आयुष्मान", "सौभाग्य", "शोभन", "अतिगण्ड",
  "सुकर्मा", "धृति", "शूल", "गण्ड", "वृद्धि", "ध्रुव", "व्याघात",
  "हर्षण", "वज्र", "सिद्धि", "व्यतिपात", "वरीयान्", "परिघ",
  "शिव", "सिद्ध", "साध्य", "शुभ", "शुक्ल", "ब्रह्म", "इन्द्र", "वैधृति",
];

// Karanas (repeating 7 + fixed 4)
export const KARANA_NAMES_HI: Record<string, string> = {
  "Bava": "बव", "Balava": "बालव", "Kaulava": "कौलव", "Taitila": "तैतिल",
  "Garaja": "गर", "Vanija": "वणिज", "Vishti": "विष्टि",
  "Shakuni": "शकुनि", "Chatushpada": "चतुष्पद", "Naga": "नाग", "Kimstughna": "किंस्तुघ्न",
};

// Ritu (6 seasons)
export const RITU_HI: Record<string, string> = {
  "Vasant": "वसंत", "Grishma": "ग्रीष्म", "Varsha": "वर्षा",
  "Sharad": "शरद", "Hemant": "हेमंत", "Shishir": "शिशिर",
};

// Ayana (2)
export const AYANA_HI: Record<string, string> = {
  "Uttarayana": "उत्तरायण", "Dakshinayana": "दक्षिणायण",
};

// Rashi (12)
export const RASHI_NAMES_HI = [
  "मेष", "वृष", "मिथुन", "कर्क", "सिंह", "कन्या",
  "तुला", "वृश्चिक", "धनु", "मकर", "कुम्भ", "मीन",
];

export const TITHI_NAMES_EN = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi",
];

export function getTithi15Name(paksha: string): { hi: string; en: string } {
  return paksha === "Shukla"
    ? { hi: "पूर्णिमा", en: "Purnima" }
    : { hi: "अमावस्या", en: "Amavasya" };
}

// Month name mapping: calendar shorthand → our standard names
const MONTH_MAP: Record<string, string> = {
  "Chaitra": "Chaitra", "Vaishakh": "Vaishakha", "Jeth": "Jyeshtha",
  "Ashadhh": "Ashadha", "Shravan": "Shravana", "Bhadarvo": "Bhadrapada",
  "Aaso": "Ashwin", "Kartak": "Kartik", "Magshar": "Margashirsha",
  "Posh": "Pausha", "Mahaa": "Magha", "Faagan": "Phalguna",
};

// Helper to create a Panch Kalyanak event from the Uttar Puran data
function pk(
  tNum: number, kType: string,
  month: string, paksha: "Shukla" | "Krishna", tithi: number,
  pendingVerification?: { reason: string; previousTithi?: string }
): JainEvent {
  const t = TIRTHANKARAS.find((x) => x.number === tNum)!;
  const kLabel = KALYANAK_TYPES.find((x) => x.key === kType)!;
  const mappedMonth = MONTH_MAP[month] || month;
  // tithi 30 in Vad = Amavasya (Krishna 15), tithi 15 in Sud = Purnima (Shukla 15)
  const actualTithi = (paksha === "Krishna" && tithi === 30) ? 15 : tithi;
  return {
    id: `${t.nameEn.toLowerCase().replace(/\s+/g, "-")}-${kType}`,
    category: "panch_kalyanak",
    tirthankaraNumber: tNum,
    kalyanakType: kType,
    nameHi: `भगवान ${t.nameHi} — ${kLabel.hi}`,
    nameEn: `Bhagwan ${t.nameEn} — ${kLabel.en}`,
    hinduMonth: mappedMonth,
    hinduPaksha: paksha,
    hinduTithi: actualTithi,
    colorTheme: t.colorTheme,
    isActive: true,
    ...(pendingVerification ? { pendingVerification } : {}),
  };
}

// ═══════════════════════════════════════════════════════════════
// PANCH KALYANAK DATA — Source: parastvchannel.com (official)
// ═══════════════════════════════════════════════════════════════

const PANCH_KALYANAK: JainEvent[] = [
  // 1. Aadinath (Rushabhdev)
  pk(1, "garbh",  "Ashadhh",  "Krishna", 2),
  pk(1, "janma",  "Chaitra",  "Krishna", 9),
  pk(1, "tap",    "Chaitra",  "Krishna", 9),
  pk(1, "gyan",   "Faagan",   "Krishna", 11),
  pk(1, "moksha", "Mahaa",    "Krishna", 14),

  // 2. Ajitnath — tap on Magha Shukla 9 (per 2026 Excel), janma on Magha Shukla 10
  pk(2, "garbh",  "Jeth",     "Krishna", 15), // Amavasya
  pk(2, "janma",  "Mahaa",    "Shukla", 10),
  pk(2, "tap",    "Mahaa",    "Shukla", 9, { reason: "2026 Excel; previously bundled with janma on Shukla 10", previousTithi: "Magha Shukla 10" }),
  pk(2, "gyan",   "Posh",     "Shukla", 11),
  pk(2, "moksha", "Chaitra",  "Shukla", 5),

  // 3. Sambhavnath
  pk(3, "garbh",  "Faagan",   "Shukla", 8),
  pk(3, "janma",  "Kartak",   "Shukla", 15), // Purnima
  pk(3, "tap",    "Magshar",  "Shukla", 15), // Purnima
  pk(3, "gyan",   "Kartak",   "Krishna", 4),
  pk(3, "moksha", "Chaitra",  "Shukla", 6),

  // 4. Abhinandannath
  pk(4, "garbh",  "Vaishakh", "Shukla", 6),
  pk(4, "janma",  "Mahaa",    "Shukla", 12),
  pk(4, "tap",    "Mahaa",    "Shukla", 12),
  pk(4, "gyan",   "Posh",     "Shukla", 14),
  pk(4, "moksha", "Vaishakh", "Shukla", 6),

  // 5. Sumatinath — tap on Vaishakh Shukla 9 (per 2026 Excel); janma/gyan/moksha bundled on Chaitra Shukla 11
  pk(5, "garbh",  "Shravan",  "Shukla", 2),
  pk(5, "janma",  "Chaitra",  "Shukla", 11),
  pk(5, "tap",    "Vaishakh", "Shukla", 9, { reason: "2026 Excel; previously bundled with janma/gyan/moksha on Chaitra Shukla 11", previousTithi: "Chaitra Shukla 11" }),
  pk(5, "gyan",   "Chaitra",  "Shukla", 11),
  pk(5, "moksha", "Chaitra",  "Shukla", 11),

  // 6. Padmaprabh — janma/tap on Kartik Krishna 13 (per 2026 Excel), not Shukla 13
  pk(6, "garbh",  "Mahaa",    "Krishna", 6),
  pk(6, "janma",  "Kartak",   "Krishna", 13, { reason: "2026 Excel; paksha changed Shukla→Krishna", previousTithi: "Kartik Shukla 13" }),
  pk(6, "tap",    "Kartak",   "Krishna", 13, { reason: "2026 Excel; paksha changed Shukla→Krishna", previousTithi: "Kartik Shukla 13" }),
  pk(6, "gyan",   "Chaitra",  "Shukla", 15), // Purnima
  pk(6, "moksha", "Faagan",   "Krishna", 4),

  // 7. Suparshvanath
  pk(7, "garbh",  "Bhadarvo", "Shukla", 6),
  pk(7, "janma",  "Jeth",     "Shukla", 12),
  pk(7, "tap",    "Jeth",     "Shukla", 12),
  pk(7, "gyan",   "Faagan",   "Krishna", 6),
  pk(7, "moksha", "Faagan",   "Krishna", 7),

  // 8. Chandraprabh — moksha on Phalguna Krishna 7 (per 2026 Excel, combined with gyan)
  // Note: Excel sheet has an additional Phalguna Shukla 7 row for moksha — kept out as likely typo
  pk(8, "garbh",  "Chaitra",  "Krishna", 5),
  pk(8, "janma",  "Posh",     "Krishna", 11),
  pk(8, "tap",    "Posh",     "Krishna", 11),
  pk(8, "gyan",   "Faagan",   "Krishna", 7),
  pk(8, "moksha", "Faagan",   "Krishna", 7, { reason: "2026 Excel; paksha changed Shukla→Krishna (combined with gyan). Excel also lists Phalguna Shukla 7 — likely a typo, dropped here", previousTithi: "Phalguna Shukla 7" }),

  // 9. Pushpadant (Suvidhinath) — moksha on Bhadrapada Shukla 8 (per 2026 Excel), not Ashwin Shukla 8
  pk(9, "garbh",  "Faagan",   "Krishna", 9),
  pk(9, "janma",  "Magshar",  "Shukla", 1),
  pk(9, "tap",    "Magshar",  "Shukla", 1),
  pk(9, "gyan",   "Kartak",   "Shukla", 2),
  pk(9, "moksha", "Bhadarvo", "Shukla", 8, { reason: "2026 Excel; month changed Ashwin→Bhadrapada", previousTithi: "Ashwin Shukla 8" }),

  // 10. Sheetalnath
  pk(10, "garbh",  "Chaitra",  "Krishna", 8),
  pk(10, "janma",  "Mahaa",    "Krishna", 12),
  pk(10, "tap",    "Mahaa",    "Krishna", 12),
  pk(10, "gyan",   "Posh",     "Krishna", 14),
  pk(10, "moksha", "Aaso",     "Shukla", 8),

  // 11. Shreyansnath — garbh on Jyeshtha Krishna 6 (per 2026 Excel), not Krishna 8
  pk(11, "garbh",  "Jeth",     "Krishna", 6, { reason: "2026 Excel; tithi changed 8→6", previousTithi: "Jyeshtha Krishna 8" }),
  pk(11, "janma",  "Faagan",   "Krishna", 11),
  pk(11, "tap",    "Faagan",   "Krishna", 11),
  pk(11, "gyan",   "Mahaa",    "Krishna", 15), // Amavasya
  pk(11, "moksha", "Shravan",  "Shukla", 15), // Purnima

  // 12. Vasupujya — gyan on Magha Shukla 2 (per 2026 Excel), not Bhadrapada Shukla 2
  pk(12, "garbh",  "Ashadhh",  "Krishna", 6),
  pk(12, "janma",  "Faagan",   "Krishna", 14),
  pk(12, "tap",    "Faagan",   "Krishna", 14),
  pk(12, "gyan",   "Mahaa",    "Shukla", 2, { reason: "2026 Excel; month changed Bhadrapada→Magha", previousTithi: "Bhadrapada Shukla 2" }),
  pk(12, "moksha", "Bhadarvo", "Shukla", 14),

  // 13. Vimalnath — moksha on Ashadha Krishna 8 (per 2026 Excel), not Krishna 6
  pk(13, "garbh",  "Jeth",     "Krishna", 10),
  pk(13, "janma",  "Mahaa",    "Shukla", 4),
  pk(13, "tap",    "Mahaa",    "Shukla", 4),
  pk(13, "gyan",   "Mahaa",    "Shukla", 6),
  pk(13, "moksha", "Ashadhh",  "Krishna", 8, { reason: "2026 Excel; tithi changed 6→8", previousTithi: "Ashadha Krishna 6" }),

  // 14. Anantnath
  pk(14, "garbh",  "Kartak",   "Krishna", 1),
  pk(14, "janma",  "Jeth",     "Krishna", 12),
  pk(14, "tap",    "Jeth",     "Krishna", 12),
  pk(14, "gyan",   "Chaitra",  "Krishna", 15), // Amavasya
  pk(14, "moksha", "Chaitra",  "Krishna", 15), // Amavasya

  // 15. Dharmnath — garbh on Vaishakha Krishna 13 (per 2026 Excel), not Shukla 8
  pk(15, "garbh",  "Vaishakh", "Krishna", 13, { reason: "2026 Excel; paksha+tithi changed Shukla 8 → Krishna 13", previousTithi: "Vaishakha Shukla 8" }),
  pk(15, "janma",  "Mahaa",    "Shukla", 13),
  pk(15, "tap",    "Mahaa",    "Shukla", 13),
  pk(15, "gyan",   "Posh",     "Shukla", 15), // Purnima
  pk(15, "moksha", "Jeth",     "Shukla", 4),

  // 16. Shantinath
  pk(16, "garbh",  "Bhadarvo", "Krishna", 7),
  pk(16, "janma",  "Jeth",     "Krishna", 14),
  pk(16, "tap",    "Jeth",     "Krishna", 14),
  pk(16, "gyan",   "Posh",     "Shukla", 10),
  pk(16, "moksha", "Jeth",     "Krishna", 14),

  // 17. Kunthunath
  pk(17, "garbh",  "Shravan",  "Krishna", 10),
  pk(17, "janma",  "Vaishakh", "Shukla", 1),
  pk(17, "tap",    "Vaishakh", "Shukla", 1),
  pk(17, "gyan",   "Chaitra",  "Shukla", 3),
  pk(17, "moksha", "Vaishakh", "Shukla", 1),

  // 18. Arnath
  pk(18, "garbh",  "Faagan",   "Shukla", 3),
  pk(18, "janma",  "Magshar",  "Shukla", 14),
  pk(18, "tap",    "Magshar",  "Shukla", 10),
  pk(18, "gyan",   "Kartak",   "Shukla", 12),
  pk(18, "moksha", "Chaitra",  "Krishna", 15), // Amavasya

  // 19. Mallinath
  pk(19, "garbh",  "Chaitra",  "Shukla", 1),
  pk(19, "janma",  "Magshar",  "Shukla", 11),
  pk(19, "tap",    "Magshar",  "Shukla", 11),
  pk(19, "gyan",   "Posh",     "Krishna", 2),
  pk(19, "moksha", "Faagan",   "Shukla", 5),

  // 20. Munisuvratnath
  pk(20, "garbh",  "Shravan",  "Krishna", 2),
  pk(20, "janma",  "Vaishakh", "Krishna", 10),
  pk(20, "tap",    "Vaishakh", "Krishna", 10),
  pk(20, "gyan",   "Vaishakh", "Krishna", 9),
  pk(20, "moksha", "Faagan",   "Krishna", 12),

  // 21. Naminath
  pk(21, "garbh",  "Aaso",     "Krishna", 2),
  pk(21, "janma",  "Ashadhh",  "Krishna", 10),
  pk(21, "tap",    "Ashadhh",  "Krishna", 10),
  pk(21, "gyan",   "Magshar",  "Shukla", 11),
  pk(21, "moksha", "Vaishakh", "Krishna", 14),

  // 22. Neminath — moksha on Ashadha Shukla 7 (per 2026 Excel), not Shukla 8
  pk(22, "garbh",  "Kartak",   "Shukla", 6),
  pk(22, "janma",  "Shravan",  "Shukla", 6),
  pk(22, "tap",    "Shravan",  "Shukla", 6),
  pk(22, "gyan",   "Aaso",     "Shukla", 1),
  pk(22, "moksha", "Ashadhh",  "Shukla", 7, { reason: "2026 Excel; tithi changed 8→7", previousTithi: "Ashadha Shukla 8" }),

  // 23. Parshvanath
  pk(23, "garbh",  "Vaishakh", "Krishna", 2),
  pk(23, "janma",  "Posh",     "Krishna", 11),
  pk(23, "tap",    "Posh",     "Krishna", 11),
  pk(23, "gyan",   "Chaitra",  "Krishna", 4),
  pk(23, "moksha", "Shravan",  "Shukla", 7),

  // 24. Mahaveer
  pk(24, "garbh",  "Ashadhh",  "Shukla", 6),
  pk(24, "janma",  "Chaitra",  "Shukla", 13),
  pk(24, "tap",    "Magshar",  "Krishna", 10),
  pk(24, "gyan",   "Vaishakh", "Shukla", 10),
  pk(24, "moksha", "Kartak",   "Krishna", 15), // Amavasya
];

// ═══════════════════════════════════════════════════════════════
// JAIN PARV — Major festivals (Digambar)
// ═══════════════════════════════════════════════════════════════

// Das Lakshan (10 Uttam Dharm) — occurs in 3 months: Magha, Chaitra, Bhadrapada
// Each runs Shukla Panchami (5) to Chaturdashi (14)
const DAS_LAKSHAN_DHARM = [
  { num: 1, hi: "उत्तम क्षमा धर्म", en: "Uttam Kshama Dharm", tithi: 5 },
  { num: 2, hi: "उत्तम मार्दव धर्म", en: "Uttam Mardav Dharm", tithi: 6 },
  { num: 3, hi: "उत्तम आर्जव धर्म", en: "Uttam Aarjav Dharm", tithi: 7 },
  { num: 4, hi: "उत्तम सत्य धर्म", en: "Uttam Satya Dharm", tithi: 8 },
  { num: 5, hi: "उत्तम शौच धर्म", en: "Uttam Sauch Dharm", tithi: 9 },
  { num: 6, hi: "उत्तम संयम धर्म", en: "Uttam Sayam Dharm", tithi: 10 },
  { num: 7, hi: "उत्तम तप धर्म", en: "Uttam Tap Dharm", tithi: 11 },
  { num: 8, hi: "उत्तम त्याग धर्म", en: "Uttam Tayag Dharm", tithi: 12 },
  { num: 9, hi: "उत्तम आकिंचन्य धर्म", en: "Uttam Aakinchanya Dharm", tithi: 13 },
  { num: 10, hi: "उत्तम ब्रह्मचर्य धर्म", en: "Uttam Bramcharya Dharm", tithi: 14 },
];

const DAS_LAKSHAN_MONTHS = [
  { month: "Magha", monthHi: "माघ", color: "#7B68EE" },
  { month: "Chaitra", monthHi: "चैत्र", color: "#9370DB" },
  { month: "Bhadrapada", monthHi: "भाद्रपद", color: "#8A2BE2" },
];

// ── Vrat generator — recurring tithi/nakshatra-based vrats from Excel "माह के प्रमुख व्रत" ──
function generateVrats(): JainEvent[] {
  const events: JainEvent[] = [];
  const VRAT_COLOR = "#B8860B";

  // Rohini Vrat — fires whenever moon is in Rohini nakshatra (nakshatra #4)
  events.push({
    id: "rohini-vrat",
    category: "vrat", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "रोहिणी व्रत", nameEn: "Rohini Vrat",
    hinduMonth: "", hinduPaksha: "", hinduTithi: 0,
    colorTheme: VRAT_COLOR, isActive: true,
    nakshatraRule: { nakshatraNumber: 4 },
  });

  // Ashtahnika (Ashtahinika) Parva — Shukla 8 → Shukla 15, three times a year
  const ASHTAHNIKA_MONTHS = [
    { m: "Kartik", hi: "कार्तिक" },
    { m: "Phalguna", hi: "फाल्गुन" },
    { m: "Ashadha", hi: "आषाढ़" },
  ];
  for (const { m, hi } of ASHTAHNIKA_MONTHS) {
    events.push({
      id: `ashtahnika-${m.toLowerCase()}`,
      category: "vrat", tirthankaraNumber: null, kalyanakType: null,
      nameHi: `अष्टाह्निका व्रत (${hi})`, nameEn: `Ashtahnika Vrat (${m})`,
      hinduMonth: m, hinduPaksha: "Shukla", hinduTithi: 0,
      tithiRange: { startTithi: 8, endTithi: 15 },
      monthConvention: "amanta",
      colorTheme: VRAT_COLOR, isActive: true,
    });
  }

  // Ratnatraya Vrat — Shukla 13 to Purnima (15), three times a year (Magha, Chaitra, Bhadrapada)
  const RATNATRAYA_MONTHS = [
    { m: "Magha", hi: "माघ" },
    { m: "Chaitra", hi: "चैत्र" },
    { m: "Bhadrapada", hi: "भाद्रपद" },
  ];
  for (const { m, hi } of RATNATRAYA_MONTHS) {
    events.push({
      id: `ratnatraya-${m.toLowerCase()}`,
      category: "vrat", tirthankaraNumber: null, kalyanakType: null,
      nameHi: `रत्नत्रय व्रत (${hi})`, nameEn: `Ratnatraya Vrat (${m})`,
      hinduMonth: m, hinduPaksha: "Shukla", hinduTithi: 0,
      tithiRange: { startTithi: 13, endTithi: 15 },
      monthConvention: "amanta",
      colorTheme: VRAT_COLOR, isActive: true,
    });
  }

  // Pushpanjali Vrat — Shukla 5 to Shukla 9, three times a year (Magha, Chaitra, Bhadrapada)
  const PUSHPANJALI_MONTHS = RATNATRAYA_MONTHS;
  for (const { m, hi } of PUSHPANJALI_MONTHS) {
    events.push({
      id: `pushpanjali-${m.toLowerCase()}`,
      category: "vrat", tirthankaraNumber: null, kalyanakType: null,
      nameHi: `पुष्पांजलि व्रत (${hi})`, nameEn: `Pushpanjali Vrat (${m})`,
      hinduMonth: m, hinduPaksha: "Shukla", hinduTithi: 0,
      tithiRange: { startTithi: 5, endTithi: 9 },
      monthConvention: "amanta",
      colorTheme: VRAT_COLOR, isActive: true,
    });
  }

  // Labdhi Vidhan Vrat — Shukla 1 to Shukla 3, three times a year (Magha, Chaitra, Bhadrapada)
  for (const { m, hi } of RATNATRAYA_MONTHS) {
    events.push({
      id: `labdhi-vidhan-${m.toLowerCase()}`,
      category: "vrat", tirthankaraNumber: null, kalyanakType: null,
      nameHi: `लब्धि विधान व्रत (${hi})`, nameEn: `Labdhi Vidhan Vrat (${m})`,
      hinduMonth: m, hinduPaksha: "Shukla", hinduTithi: 0,
      tithiRange: { startTithi: 1, endTithi: 3 },
      monthConvention: "amanta",
      colorTheme: VRAT_COLOR, isActive: true,
    });
  }

  // Shodash Karan Vrat — starts 3×/year on tithi (Pausha/Phalguna/Shravana) Shukla 14; ends
  // ~15 days later on the next Krishna 1 of the following month. Seed as start+end markers.
  // Verified against the 2026 तीर्थंकर वर्धमान जैन पंचांग which shows exactly these 3 cycles:
  //   पौष शु. 14 (Jan 2) → माघ कृ. 1 (Jan 4)
  //   फाल्गुन शु. 14 (Mar 2) → चैत्र कृ. 1 (Mar 4)
  //   श्रावण शु. 14 (Aug 26-27 vriddhi) → भाद्रपद कृ. 1 (Aug 29)
  const SHODASH_KARAN = [
    { startMonth: "Pausha", startHi: "पौष", endMonth: "Magha", endHi: "माघ" },
    { startMonth: "Phalguna", startHi: "फाल्गुन", endMonth: "Chaitra", endHi: "चैत्र" },
    { startMonth: "Shravana", startHi: "श्रावण", endMonth: "Bhadrapada", endHi: "भाद्रपद" },
  ];
  for (const s of SHODASH_KARAN) {
    events.push({
      id: `shodash-karan-start-${s.startMonth.toLowerCase()}`,
      category: "vrat", tirthankaraNumber: null, kalyanakType: null,
      nameHi: `षोडश कारण व्रत प्रारम्भ (${s.startHi})`, nameEn: `Shodash Karan Vrat Start (${s.startMonth})`,
      hinduMonth: s.startMonth, hinduPaksha: "Shukla", hinduTithi: 14,
      monthConvention: "amanta",
      colorTheme: VRAT_COLOR, isActive: true,
    });
    events.push({
      id: `shodash-karan-end-${s.endMonth.toLowerCase()}`,
      category: "vrat", tirthankaraNumber: null, kalyanakType: null,
      nameHi: `षोडश कारण व्रत पूर्ण (${s.endHi})`, nameEn: `Shodash Karan Vrat End (${s.endMonth})`,
      hinduMonth: s.endMonth, hinduPaksha: "Krishna", hinduTithi: 1,
      monthConvention: "amanta",
      colorTheme: VRAT_COLOR, isActive: true,
    });
  }

  return events;
}

function generateDasLakshan(): JainEvent[] {
  const events: JainEvent[] = [];
  for (const m of DAS_LAKSHAN_MONTHS) {
    // Das Lakshan Parva start marker
    events.push({
      id: `das-lakshan-start-${m.month.toLowerCase()}`,
      category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
      nameHi: "दस लक्षण पर्व प्रारम्भ", nameEn: "Das Lakshan Parva Start",
      hinduMonth: m.month, hinduPaksha: "Shukla", hinduTithi: 5,
      monthConvention: "amanta",
      colorTheme: m.color, isActive: true,
    });
    // 10 individual Dharm days
    for (const d of DAS_LAKSHAN_DHARM) {
      events.push({
        id: `das-lakshan-${d.num}-${m.month.toLowerCase()}`,
        category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
        nameHi: d.hi, nameEn: d.en,
        hinduMonth: m.month, hinduPaksha: "Shukla", hinduTithi: d.tithi,
        monthConvention: "amanta",
        colorTheme: m.color, isActive: true,
      });
    }
  }
  return events;
}

const JAIN_PARV: JainEvent[] = [
  {
    id: "mahavir-jayanti",
    category: "jain_parv", tirthankaraNumber: 24, kalyanakType: null,
    nameHi: "महावीर जयंती", nameEn: "Mahavir Jayanti",
    hinduMonth: "Chaitra", hinduPaksha: "Shukla", hinduTithi: 13,
    colorTheme: "#D4AF37", isActive: true,
  },
  {
    id: "akshaya-tritiya",
    category: "jain_parv", tirthankaraNumber: 1, kalyanakType: null,
    nameHi: "अक्षय तृतीया (दान दिवस)", nameEn: "Akshaya Tritiya (Daan Divas)",
    hinduMonth: "Vaishakha", hinduPaksha: "Shukla", hinduTithi: 3,
    colorTheme: "#D4AF37", isActive: true,
  },
  {
    id: "shrut-panchami",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "श्रुत पंचमी", nameEn: "Shrut Panchami",
    hinduMonth: "Jyeshtha", hinduPaksha: "Shukla", hinduTithi: 5,
    colorTheme: "#4169E1", isActive: true,
  },
  {
    id: "guru-purnima",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "गुरु पूर्णिमा", nameEn: "Guru Purnima",
    hinduMonth: "Ashadha", hinduPaksha: "Shukla", hinduTithi: 15,
    colorTheme: "#E8730A", isActive: true,
  },
  {
    id: "rakshabandhan",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "रक्षाबंधन", nameEn: "Rakshabandhan",
    hinduMonth: "Shravana", hinduPaksha: "Shukla", hinduTithi: 15,
    colorTheme: "#FF6B35", isActive: true,
  },
  {
    id: "anant-chaturdashi",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "अनन्त चतुर्दशी", nameEn: "Anant Chaturdashi",
    hinduMonth: "Bhadrapada", hinduPaksha: "Shukla", hinduTithi: 14,
    colorTheme: "#4682B4", isActive: true,
  },
  {
    id: "kshamavani",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "क्षमावाणी", nameEn: "Kshamavani",
    hinduMonth: "Ashwin", hinduPaksha: "Krishna", hinduTithi: 1,
    colorTheme: "#20B2AA", isActive: true,
  },
  {
    id: "diwali-mahavir-nirvan",
    category: "jain_parv", tirthankaraNumber: 24, kalyanakType: null,
    nameHi: "दीपावली (महावीर निर्वाण दिवस)", nameEn: "Diwali (Mahavir Nirvan Diwas)",
    hinduMonth: "Kartik", hinduPaksha: "Krishna", hinduTithi: 15,
    colorTheme: "#D4AF37", isActive: true,
  },
  {
    id: "nutan-varsh",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "नूतन वर्ष (वीर नि.सं.)", nameEn: "Nutan Varsh (New Year)",
    hinduMonth: "Kartik", hinduPaksha: "Shukla", hinduTithi: 1,
    colorTheme: "#D4AF37", isActive: true,
  },
  {
    id: "gyan-panchami",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "ज्ञान पंचमी", nameEn: "Gyan Panchami",
    hinduMonth: "Kartik", hinduPaksha: "Shukla", hinduTithi: 5,
    colorTheme: "#4169E1", isActive: true,
  },
  {
    id: "sugandh-dashami",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "सुगंध दशमी", nameEn: "Sugandh Dashami",
    hinduMonth: "Chaitra", hinduPaksha: "Shukla", hinduTithi: 10,
    colorTheme: "#FF69B4", isActive: true,
  },
  {
    id: "jin-shasan-diwas",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "जिन शासन दिवस", nameEn: "Jin Shasan Diwas",
    hinduMonth: "Chaitra", hinduPaksha: "Shukla", hinduTithi: 1,
    colorTheme: "#E8730A", isActive: true,
  },
  {
    id: "siddha-chakra-pujan",
    category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "सिद्ध चक्र पूजन", nameEn: "Siddha Chakra Pujan",
    hinduMonth: "Ashwin", hinduPaksha: "Shukla", hinduTithi: 1,
    colorTheme: "#9370DB", isActive: true,
  },
  // Das Lakshan (3 months × 10 days + start markers)
  ...generateDasLakshan(),

  // ── Vrat category (recurring, tithi/nakshatra rules) ──
  ...generateVrats(),

  // ── National / Government observances (from Excel "शासकीय अवकास आदि विशेष") ──
  ...generateNationalHolidays(),
];

function generateNationalHolidays(): JainEvent[] {
  const C_PRIMARY = "#1E88E5";
  const C_COMMEMORATIVE = "#4CAF50";
  const C_RELIGIOUS = "#FF6B35";
  const C_OBSERVANCE = "#9E9E9E";

  const natl = (
    id: string, nameHi: string, nameEn: string, fixedDate: string,
    color = C_COMMEMORATIVE
  ): JainEvent => ({
    id, category: "national", tirthankaraNumber: null, kalyanakType: null,
    nameHi, nameEn, hinduMonth: "", hinduPaksha: "", hinduTithi: 0,
    colorTheme: color, isActive: true, fixedDate,
  });

  return [
    // January
    natl("new-year-day", "नव वर्ष प्रारंभ", "New Year's Day", "01-01", C_COMMEMORATIVE),
    natl("national-youth-day", "राष्ट्रीय युवा दिवस", "National Youth Day", "01-12"),
    natl("makar-sankranti", "मकर संक्रांति", "Makar Sankranti", "01-14", C_RELIGIOUS),
    natl("netaji-jayanti", "नेताजी सुभाषचन्द्र जयंती", "Netaji Subhash Chandra Jayanti", "01-23"),
    natl("republic-day", "गणतंत्र दिवस", "Republic Day", "01-26", C_PRIMARY),
    natl("gandhi-nirvan-divas", "गाँधी निर्वाण दिवस", "Gandhi Nirvan Divas", "01-29"),

    // February
    natl("ravidas-jayanti", "रविदास जयन्ती", "Ravidas Jayanti", "02-01"),
    natl("world-cancer-day", "विश्व कैंसर दिवस", "World Cancer Day", "02-04", C_OBSERVANCE),
    natl("shivaji-jayanti-feb", "छत्रपति शिवाजी जयंती", "Chhatrapati Shivaji Jayanti", "02-19"),

    // April
    natl("ambedkar-jayanti", "डॉ. अम्बेडकर जयंती", "Dr. Ambedkar Jayanti", "04-14"),
    // Daan Divas is the same day as Akshaya Tritiya (Vaishakh Shukla 3) — merged into that entry.
    natl("earth-day", "पृथ्वी दिवस", "Earth Day", "04-22", C_OBSERVANCE),

    // May
    natl("labour-day", "अंतरराष्ट्रीय श्रमिक दिवस", "International Labour Day", "05-01"),
    natl("tagore-jayanti", "रवीन्द्रनाथ टैगौर जयंती", "Rabindranath Tagore Jayanti", "05-07"),
    natl("anti-tobacco-day", "विश्व तम्बाकू निषेध दिवस", "World No Tobacco Day", "05-31", C_OBSERVANCE),

    // July
    natl("yug-parivartan-divas", "युग परिवर्तन दिवस", "Yug Parivartan Divas", "07-30"),

    // August
    natl("independence-day", "स्वतंत्रता दिवस", "Independence Day", "08-15", C_PRIMARY),

    // September
    natl("hindi-divas", "हिन्दी दिवस", "Hindi Divas", "09-14"),

    // October
    natl("gandhi-jayanti", "महात्मा गाँधी जयंती", "Mahatma Gandhi Jayanti", "10-02", C_PRIMARY),

    // November
    natl("children-day", "बाल दिवस (प. नेहरू जयंती)", "Children's Day (Nehru Jayanti)", "11-14"),

    // December
    natl("world-aids-day", "विश्व एड्स दिवस", "World AIDS Day", "12-01", C_OBSERVANCE),
    natl("christmas", "क्रिसमस", "Christmas", "12-25", C_RELIGIOUS),
  ];
}

// ═══════════════════════════════════════════════════════════════

export function getAllJainEvents(): JainEvent[] {
  return [...JAIN_PARV, ...PANCH_KALYANAK];
}

export function getJainParv(): JainEvent[] {
  return JAIN_PARV;
}

export function getKalyanakTypes() {
  return KALYANAK_TYPES;
}
