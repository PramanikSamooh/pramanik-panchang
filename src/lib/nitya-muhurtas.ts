// Trinta Nitya Muhurta — the 30 named muhurtas of the day (15 day + 15 night), each
// approximately 48 minutes wide (= 2 ghati). Day muhurtas are the equal 1/15ths of
// sunrise → sunset; night muhurtas are the equal 1/15ths of sunset → next sunrise.
//
// Each entry has a fixed name, base shubh/ashubh classification, करें (recommended
// activities) and न करें (avoided activities). A few entries have weekday-conditional
// classification — the engine resolves these at compute time via the `condition` field.

export type NityaShubhAshubh = "shubh" | "ashubh" | "ati-shubh";

export interface NityaMuhurtaSpec {
  /** 1..30 (1..15 = day muhurtas, 16..30 = night muhurtas). */
  number: number;
  /** Hindi name. */
  nameHi: string;
  /** English transliteration. */
  nameEn: string;
  /** Default classification. May be overridden by `condition` for specific weekdays. */
  baseClass: NityaShubhAshubh;
  /** Optional vara override: e.g. "अर्धमन" is शुभ default but अशुभ on Sunday (vara=0). */
  conditionVaras?: number[]; // weekday indices (0=Sun..6=Sat) when classification flips
  /** Class to apply when the condition is met. */
  conditionClass?: NityaShubhAshubh;
  /** करें — recommended activities. */
  doHi: string;
  /** न करें — avoided activities. */
  dontHi: string;
}

// Day muhurtas 1..15 (sunrise → sunset, divided into 15 equal parts)
export const NITYA_MUHURTAS: NityaMuhurtaSpec[] = [
  { number:  1, nameHi: "रुद्र",       nameEn: "Rudra",       baseClass: "ashubh",
    doHi: "व्रत, संयम",
    dontHi: "नए कार्य प्रारंभ" },
  { number:  2, nameHi: "आहि",         nameEn: "Aahi",        baseClass: "ashubh",
    doHi: "आंतरिक/व्यक्त कार्य",
    dontHi: "कानूनी कार्य, प्रारंभ" },
  { number:  3, nameHi: "मित्र",       nameEn: "Mitra",       baseClass: "shubh",
    doHi: "मित्रता, समझौते",
    dontHi: "झगड़े" },
  { number:  4, nameHi: "पितृ",        nameEn: "Pitr",        baseClass: "ashubh",
    doHi: "पितृ तर्पण, दान",
    dontHi: "विवाद, गृहप्रवेश" },
  { number:  5, nameHi: "वसु",         nameEn: "Vasu",        baseClass: "shubh",
    doHi: "धन लेन-देन, खरीद",
    dontHi: "अव्यवस्था" },
  { number:  6, nameHi: "वाराह",       nameEn: "Varaha",      baseClass: "shubh",
    doHi: "मरम्मत, निर्माण",
    dontHi: "मुकदमेबाजी" },
  { number:  7, nameHi: "विश्वेदेव",   nameEn: "Vishvedeva",  baseClass: "shubh",
    doHi: "दान, सेवा, टीम कार्य",
    dontHi: "स्वार्थी कार्य" },
  // Vidi: शुभ default, अशुभ on Monday (1) and Friday (5)
  { number:  8, nameHi: "विदि",         nameEn: "Vidi",        baseClass: "shubh",
    conditionVaras: [1, 5], conditionClass: "ashubh",
    doHi: "पढ़ाई, अनुबंध",
    dontHi: "(सोम/शुक्र को) समारोह, प्रारंभ" },
  { number:  9, nameHi: "सुलमुर्वी",     nameEn: "Sulamurvi",  baseClass: "shubh",
    doHi: "यात्रा, नेटवर्किंग",
    dontHi: "अधिक बातें" },
  { number: 10, nameHi: "पुरूहूत",      nameEn: "Puruhuta",    baseClass: "ashubh",
    doHi: "निजी उपासना",
    dontHi: "बड़े उपक्रम" },
  { number: 11, nameHi: "वाहिनी",       nameEn: "Vahini",      baseClass: "ashubh",
    doHi: "योजना, तैयारी",
    dontHi: "यात्रा प्रारम्भ" },
  { number: 12, nameHi: "नक्तंकरा",     nameEn: "Naktankara",  baseClass: "ashubh",
    doHi: "विज्ञान, रहस्यवाद",
    dontHi: "सार्वजनिक आयोजन" },
  { number: 13, nameHi: "करण",          nameEn: "Karana",      baseClass: "shubh",
    doHi: "शुद्धिकरण, जल कार्य",
    dontHi: "चुगली" },
  // Ardhamana: शुभ default, अशुभ on Sunday (0)
  { number: 14, nameHi: "अर्धमन",       nameEn: "Ardhamana",   baseClass: "shubh",
    conditionVaras: [0], conditionClass: "ashubh",
    doHi: "समझौते, संबंध",
    dontHi: "(रवि को) प्रतिष्ठा कार्य" },
  { number: 15, nameHi: "भगा",          nameEn: "Bhaga",       baseClass: "ashubh",
    doHi: "दान",
    dontHi: "संपत्ति बाँटना" },

  // Night muhurtas 16..30 (sunset → next sunrise)
  { number: 16, nameHi: "गिरिश",        nameEn: "Girisha",     baseClass: "shubh",
    doHi: "कार्य का समापन",
    dontHi: "जोखिम भरे आरम्भ" },
  { number: 17, nameHi: "अजगवद",        nameEn: "Ajagavada",   baseClass: "ashubh",
    doHi: "परीक्षण, लेखा-जोखा",
    dontHi: "यात्रा, शल्यक्रिया" },
  { number: 18, nameHi: "अहिर्बुध्न्य",  nameEn: "Ahirbudhnya", baseClass: "shubh",
    doHi: "अध्ययन, चिकित्सा",
    dontHi: "सतही प्रचार" },
  { number: 19, nameHi: "पुष्य",         nameEn: "Pushya",      baseClass: "shubh",
    doHi: "शिक्षा, पोषण",
    dontHi: "गलत भोजन" },
  { number: 20, nameHi: "अश्विनी",       nameEn: "Ashwini",     baseClass: "shubh",
    doHi: "उपचार, यात्रा, शुरुआत",
    dontHi: "विलम्ब" },
  { number: 21, nameHi: "यम",            nameEn: "Yama",        baseClass: "ashubh",
    doHi: "अनुशासन, नियम",
    dontHi: "उत्सव, जोखिम" },
  { number: 22, nameHi: "अग्नि",         nameEn: "Agni",        baseClass: "shubh",
    doHi: "साहसिक कार्य, ऊर्जा",
    dontHi: "क्रोध, जल्दबाज़ी" },
  { number: 23, nameHi: "विधातु",        nameEn: "Vidhatu",     baseClass: "shubh",
    doHi: "दस्तावेज़, अनुबंध",
    dontHi: "टालना" },
  { number: 24, nameHi: "कण्ड",          nameEn: "Kanda",       baseClass: "shubh",
    doHi: "कला, सजावट",
    dontHi: "अहंकार" },
  { number: 25, nameHi: "अदिति",         nameEn: "Aditi",       baseClass: "shubh",
    doHi: "क्षमा, दान",
    dontHi: "कठोरता" },
  { number: 26, nameHi: "जीव/अमृत",      nameEn: "Jiva/Amrit",  baseClass: "ati-shubh",
    doHi: "व्रत, साधना, स्वास्थ्य",
    dontHi: "हानिकारक कार्य" },
  { number: 27, nameHi: "विष्णु",        nameEn: "Vishnu",      baseClass: "shubh",
    doHi: "दीर्घकालीन योजना",
    dontHi: "जुआ" },
  { number: 28, nameHi: "घुमद्द्युति",   nameEn: "Ghumadyuti",  baseClass: "shubh",
    doHi: "कला, संगीत",
    dontHi: "झगड़े" },
  { number: 29, nameHi: "ब्रह्म",        nameEn: "Brahma",      baseClass: "ati-shubh",
    doHi: "ध्यान, वेदाध्ययन",
    dontHi: "व्यर्थ बातें" },
  { number: 30, nameHi: "समुद्र",        nameEn: "Samudra",     baseClass: "shubh",
    doHi: "यात्रा प्रारम्भ, शुद्धि",
    dontHi: "गंदगी, अपव्यय" },
];

/** Resolve the effective classification for a given muhurta on a given vara (weekday 0-6). */
export function resolveNityaClass(spec: NityaMuhurtaSpec, vara: number): NityaShubhAshubh {
  if (spec.conditionVaras?.includes(vara) && spec.conditionClass) return spec.conditionClass;
  return spec.baseClass;
}
