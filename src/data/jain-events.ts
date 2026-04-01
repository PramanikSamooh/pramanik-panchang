import { TIRTHANKARAS } from "./tirthankaras";

export interface JainEvent {
  id: string;
  category: "panch_kalyanak" | "jain_parv" | "national";
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
  month: string, paksha: "Shukla" | "Krishna", tithi: number
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
  };
}

// ═══════════════════════════════════════════════════════════════
// PANCH KALYANAK DATA — from Uttar Puran (authoritative source)
// Sud = Shukla, Vad = Krishna
// 30 in Vad = Amavasya, 15 in Sud = Purnima
// ═══════════════════════════════════════════════════════════════

// Data source: Uttar Puran (Digambar authoritative)
// Sud = Shukla, Vad = Krishna, 30 in Vad = Amavasya (Krishna 15)
const PANCH_KALYANAK: JainEvent[] = [
  // 1. Rushabhdev (Adinath)
  pk(1, "garbh",  "Jeth",     "Krishna", 2),
  pk(1, "janma",  "Faagan",   "Krishna", 9),
  pk(1, "tap",    "Faagan",   "Krishna", 9),
  pk(1, "gyan",   "Mahaa",    "Krishna", 11),
  pk(1, "moksha", "Posh",     "Krishna", 14),

  // 2. Ajitnath
  pk(2, "garbh",  "Vaishakh", "Krishna", 15), // Vad-30 = Amavasya
  pk(2, "janma",  "Mahaa",    "Shukla", 10),
  pk(2, "tap",    "Mahaa",    "Shukla", 9),
  pk(2, "gyan",   "Posh",     "Shukla", 11),
  pk(2, "moksha", "Chaitra",  "Shukla", 5),

  // 3. Sambhavnath
  pk(3, "garbh",  "Faagan",   "Shukla", 8),
  pk(3, "janma",  "Kartak",   "Shukla", 15), // Purnima
  pk(3, "tap",    "Magshar",  "Shukla", 15), // Purnima
  pk(3, "gyan",   "Aaso",     "Krishna", 4),
  pk(3, "moksha", "Chaitra",  "Shukla", 6),

  // 4. Abhinandan
  pk(4, "garbh",  "Vaishakh", "Shukla", 6),
  pk(4, "janma",  "Mahaa",    "Shukla", 12),
  pk(4, "tap",    "Mahaa",    "Shukla", 14),
  pk(4, "gyan",   "Posh",     "Shukla", 14),
  pk(4, "moksha", "Vaishakh", "Shukla", 6),

  // 5. Sumatinath
  pk(5, "garbh",  "Shravan",  "Shukla", 2),
  pk(5, "janma",  "Chaitra",  "Shukla", 11),
  pk(5, "tap",    "Vaishakh", "Shukla", 9),
  pk(5, "gyan",   "Chaitra",  "Shukla", 11),
  pk(5, "moksha", "Chaitra",  "Shukla", 11),

  // 6. Padmaprabha
  pk(6, "garbh",  "Posh",     "Krishna", 6),
  pk(6, "janma",  "Aaso",     "Krishna", 13),
  pk(6, "tap",    "Aaso",     "Krishna", 13),
  pk(6, "gyan",   "Chaitra",  "Shukla", 15), // Purnima
  pk(6, "moksha", "Mahaa",    "Krishna", 4),

  // 7. Suparshvanath
  pk(7, "garbh",  "Bhadarvo", "Shukla", 6),
  pk(7, "janma",  "Jeth",     "Shukla", 12),
  pk(7, "tap",    "Jeth",     "Shukla", 12),
  pk(7, "gyan",   "Mahaa",    "Krishna", 6),
  pk(7, "moksha", "Mahaa",    "Krishna", 7),

  // 8. Chandraprabha
  pk(8, "garbh",  "Faagan",   "Krishna", 5),
  pk(8, "janma",  "Magshar",  "Krishna", 11),
  pk(8, "tap",    "Magshar",  "Krishna", 11),
  pk(8, "gyan",   "Mahaa",    "Krishna", 7),
  pk(8, "moksha", "Mahaa",    "Krishna", 7),

  // 9. Pushpadant (Suvidhinath)
  pk(9, "garbh",  "Mahaa",    "Krishna", 9),
  pk(9, "janma",  "Magshar",  "Shukla", 1),
  pk(9, "tap",    "Magshar",  "Shukla", 1),
  pk(9, "gyan",   "Kartak",   "Shukla", 2),
  pk(9, "moksha", "Bhadarvo", "Shukla", 8),

  // 10. Sheetalnath
  pk(10, "garbh",  "Faagan",   "Krishna", 8),
  pk(10, "janma",  "Posh",     "Krishna", 12),
  pk(10, "tap",    "Posh",     "Krishna", 12),
  pk(10, "gyan",   "Magshar",  "Krishna", 14),
  pk(10, "moksha", "Aaso",     "Shukla", 8),

  // 11. Shreyansnath
  pk(11, "garbh",  "Vaishakh", "Krishna", 6),
  pk(11, "janma",  "Mahaa",    "Krishna", 11),
  pk(11, "tap",    "Mahaa",    "Krishna", 11),
  pk(11, "gyan",   "Posh",     "Krishna", 15), // Vad-30 = Amavasya
  pk(11, "moksha", "Shravan",  "Shukla", 15), // Purnima

  // 12. Vasupujya
  pk(12, "garbh",  "Jeth",     "Krishna", 6),
  pk(12, "janma",  "Mahaa",    "Krishna", 14),
  pk(12, "tap",    "Mahaa",    "Krishna", 14),
  pk(12, "gyan",   "Mahaa",    "Shukla", 2),
  pk(12, "moksha", "Bhadarvo", "Shukla", 14),

  // 13. Vimalnath
  pk(13, "garbh",  "Vaishakh", "Krishna", 10),
  pk(13, "janma",  "Mahaa",    "Shukla", 4),
  pk(13, "tap",    "Mahaa",    "Shukla", 4),
  pk(13, "gyan",   "Mahaa",    "Shukla", 6),
  pk(13, "moksha", "Jeth",     "Krishna", 8),

  // 14. Anantnath
  pk(14, "garbh",  "Aaso",     "Krishna", 1),
  pk(14, "janma",  "Vaishakh", "Krishna", 12),
  pk(14, "tap",    "Vaishakh", "Krishna", 12),
  pk(14, "gyan",   "Faagan",   "Krishna", 15), // Vad-30 = Amavasya
  pk(14, "moksha", "Faagan",   "Krishna", 15), // Vad-30 = Amavasya

  // 15. Dharmnath
  pk(15, "garbh",  "Chaitra",  "Krishna", 13),
  pk(15, "janma",  "Mahaa",    "Shukla", 13),
  pk(15, "tap",    "Mahaa",    "Shukla", 13),
  pk(15, "gyan",   "Posh",     "Shukla", 15), // Purnima
  pk(15, "moksha", "Jeth",     "Shukla", 4),

  // 16. Shantinath
  pk(16, "garbh",  "Shravan",  "Krishna", 7),
  pk(16, "janma",  "Vaishakh", "Krishna", 14),
  pk(16, "tap",    "Vaishakh", "Krishna", 14),
  pk(16, "gyan",   "Posh",     "Shukla", 10),
  pk(16, "moksha", "Magshar",  "Krishna", 14),

  // 17. Kunthunath
  pk(17, "garbh",  "Ashadhh",  "Krishna", 10),
  pk(17, "janma",  "Vaishakh", "Shukla", 1),
  pk(17, "tap",    "Vaishakh", "Shukla", 1),
  pk(17, "gyan",   "Chaitra",  "Shukla", 3),
  pk(17, "moksha", "Vaishakh", "Shukla", 1),

  // 18. Arahnath
  pk(18, "garbh",  "Vaishakh", "Shukla", 3),
  pk(18, "janma",  "Magshar",  "Shukla", 14),
  pk(18, "tap",    "Magshar",  "Shukla", 10),
  pk(18, "gyan",   "Kartak",   "Shukla", 12),
  pk(18, "moksha", "Faagan",   "Krishna", 15), // Vad-30 = Amavasya

  // 19. Mallinath
  pk(19, "garbh",  "Chaitra",  "Shukla", 1),
  pk(19, "janma",  "Magshar",  "Shukla", 11),
  pk(19, "tap",    "Magshar",  "Shukla", 11),
  pk(19, "gyan",   "Magshar",  "Krishna", 2),
  pk(19, "moksha", "Faagan",   "Shukla", 5),

  // 20. Munisuvratnath
  pk(20, "garbh",  "Ashadhh",  "Krishna", 2),
  pk(20, "janma",  "Chaitra",  "Krishna", 10),
  pk(20, "tap",    "Chaitra",  "Krishna", 10),
  pk(20, "gyan",   "Chaitra",  "Krishna", 9),
  pk(20, "moksha", "Mahaa",    "Krishna", 12),

  // 21. Naminath
  pk(21, "garbh",  "Bhadarvo", "Krishna", 2),
  pk(21, "janma",  "Jeth",     "Krishna", 10),
  pk(21, "tap",    "Jeth",     "Krishna", 10),
  pk(21, "gyan",   "Magshar",  "Shukla", 11),
  pk(21, "moksha", "Chaitra",  "Krishna", 14),

  // 22. Neminath
  pk(22, "garbh",  "Kartak",   "Shukla", 6),
  pk(22, "janma",  "Shravan",  "Shukla", 6),
  pk(22, "tap",    "Shravan",  "Shukla", 6),
  pk(22, "gyan",   "Aaso",     "Shukla", 1),
  pk(22, "moksha", "Ashadhh",  "Shukla", 7),

  // 23. Parshvanath
  pk(23, "garbh",  "Chaitra",  "Krishna", 2),
  pk(23, "janma",  "Magshar",  "Krishna", 11),
  pk(23, "tap",    "Magshar",  "Krishna", 11),
  pk(23, "gyan",   "Faagan",   "Krishna", 4),
  pk(23, "moksha", "Shravan",  "Shukla", 7),

  // 24. Mahaveer
  pk(24, "garbh",  "Ashadhh",  "Shukla", 6),
  pk(24, "janma",  "Chaitra",  "Shukla", 13),
  pk(24, "tap",    "Kartak",   "Krishna", 10),
  pk(24, "gyan",   "Vaishakh", "Shukla", 10),
  pk(24, "moksha", "Aaso",     "Krishna", 15), // Vad-30 = Amavasya
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

function generateDasLakshan(): JainEvent[] {
  const events: JainEvent[] = [];
  for (const m of DAS_LAKSHAN_MONTHS) {
    // Das Lakshan Parva start marker
    events.push({
      id: `das-lakshan-start-${m.month.toLowerCase()}`,
      category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
      nameHi: "दस लक्षण पर्व प्रारम्भ", nameEn: "Das Lakshan Parva Start",
      hinduMonth: m.month, hinduPaksha: "Shukla", hinduTithi: 5,
      colorTheme: m.color, isActive: true,
    });
    // 10 individual Dharm days
    for (const d of DAS_LAKSHAN_DHARM) {
      events.push({
        id: `das-lakshan-${d.num}-${m.month.toLowerCase()}`,
        category: "jain_parv", tirthankaraNumber: null, kalyanakType: null,
        nameHi: d.hi, nameEn: d.en,
        hinduMonth: m.month, hinduPaksha: "Shukla", hinduTithi: d.tithi,
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
    nameHi: "अक्षय तृतीया", nameEn: "Akshaya Tritiya",
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

  // ── National Holidays (fixed Gregorian dates) ──
  {
    id: "republic-day",
    category: "national", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "गणतंत्र दिवस", nameEn: "Republic Day",
    hinduMonth: "", hinduPaksha: "", hinduTithi: 0,
    colorTheme: "#1E88E5", isActive: true, fixedDate: "01-26",
  },
  {
    id: "independence-day",
    category: "national", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "स्वतंत्रता दिवस", nameEn: "Independence Day",
    hinduMonth: "", hinduPaksha: "", hinduTithi: 0,
    colorTheme: "#E8730A", isActive: true, fixedDate: "08-15",
  },
  {
    id: "gandhi-jayanti",
    category: "national", tirthankaraNumber: null, kalyanakType: null,
    nameHi: "गांधी जयंती", nameEn: "Gandhi Jayanti",
    hinduMonth: "", hinduPaksha: "", hinduTithi: 0,
    colorTheme: "#4CAF50", isActive: true, fixedDate: "10-02",
  },
];

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
