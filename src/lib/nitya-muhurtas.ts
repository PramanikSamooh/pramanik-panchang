// Trinta Nitya Muhurta — the 30 named muhurtas of the day (15 day + 15 night), each
// approximately 48 minutes wide (= 2 ghati). Day muhurtas are the equal 1/15ths of
// sunrise → sunset; night muhurtas are the equal 1/15ths of sunset → next sunrise.
//
// Each entry has a fixed name, base shubh/ashubh classification, करें (recommended
// activities) and न करें (avoided activities) in Hindi and English. A few entries have
// weekday-conditional classification — the engine resolves these via `condition` field.

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
  /** करें — recommended activities (Hindi). */
  doHi: string;
  /** करें — recommended activities (English). */
  doEn: string;
  /** न करें — avoided activities (Hindi). */
  dontHi: string;
  /** न करें — avoided activities (English). */
  dontEn: string;
}

// Day muhurtas 1..15 (sunrise → sunset, divided into 15 equal parts)
export const NITYA_MUHURTAS: NityaMuhurtaSpec[] = [
  { number:  1, nameHi: "रुद्र",       nameEn: "Rudra",       baseClass: "ashubh",
    doHi: "व्रत, संयम",                       doEn: "Vows, restraint",
    dontHi: "नए कार्य प्रारंभ",                dontEn: "Starting new ventures" },
  { number:  2, nameHi: "आहि",         nameEn: "Aahi",        baseClass: "ashubh",
    doHi: "आंतरिक/व्यक्त कार्य",              doEn: "Inner / personal work",
    dontHi: "कानूनी कार्य, प्रारंभ",            dontEn: "Legal work, beginnings" },
  { number:  3, nameHi: "मित्र",       nameEn: "Mitra",       baseClass: "shubh",
    doHi: "मित्रता, समझौते",                  doEn: "Friendship, agreements",
    dontHi: "झगड़े",                           dontEn: "Conflict" },
  { number:  4, nameHi: "पितृ",        nameEn: "Pitr",        baseClass: "ashubh",
    doHi: "पितृ तर्पण, दान",                  doEn: "Ancestor rites, charity",
    dontHi: "विवाद, गृहप्रवेश",                dontEn: "Disputes, housewarming" },
  { number:  5, nameHi: "वसु",         nameEn: "Vasu",        baseClass: "shubh",
    doHi: "धन लेन-देन, खरीद",                 doEn: "Money transactions, buying",
    dontHi: "अव्यवस्था",                       dontEn: "Disorder" },
  { number:  6, nameHi: "वाराह",       nameEn: "Varaha",      baseClass: "shubh",
    doHi: "मरम्मत, निर्माण",                   doEn: "Repair, construction",
    dontHi: "मुकदमेबाजी",                     dontEn: "Litigation" },
  { number:  7, nameHi: "विश्वेदेव",   nameEn: "Vishvedeva",  baseClass: "shubh",
    doHi: "दान, सेवा, टीम कार्य",              doEn: "Charity, service, teamwork",
    dontHi: "स्वार्थी कार्य",                  dontEn: "Selfish acts" },
  // Vidi: शुभ default, अशुभ on Monday (1) and Friday (5)
  { number:  8, nameHi: "विदि",         nameEn: "Vidi",        baseClass: "shubh",
    conditionVaras: [1, 5], conditionClass: "ashubh",
    doHi: "पढ़ाई, अनुबंध",                     doEn: "Study, contracts",
    dontHi: "(सोम/शुक्र को) समारोह, प्रारंभ",  dontEn: "(Mon/Fri) ceremonies, beginnings" },
  { number:  9, nameHi: "सुलमुर्वी",     nameEn: "Sulamurvi",  baseClass: "shubh",
    doHi: "यात्रा, नेटवर्किंग",                doEn: "Travel, networking",
    dontHi: "अधिक बातें",                     dontEn: "Excess talk" },
  { number: 10, nameHi: "पुरूहूत",      nameEn: "Puruhuta",    baseClass: "ashubh",
    doHi: "निजी उपासना",                       doEn: "Private worship",
    dontHi: "बड़े उपक्रम",                     dontEn: "Major undertakings" },
  { number: 11, nameHi: "वाहिनी",       nameEn: "Vahini",      baseClass: "ashubh",
    doHi: "योजना, तैयारी",                     doEn: "Planning, preparation",
    dontHi: "यात्रा प्रारम्भ",                  dontEn: "Starting travel" },
  { number: 12, nameHi: "नक्तंकरा",     nameEn: "Naktankara",  baseClass: "ashubh",
    doHi: "विज्ञान, रहस्यवाद",                  doEn: "Science, mysticism",
    dontHi: "सार्वजनिक आयोजन",                 dontEn: "Public events" },
  { number: 13, nameHi: "करण",          nameEn: "Karana",      baseClass: "shubh",
    doHi: "शुद्धिकरण, जल कार्य",                doEn: "Purification, water rites",
    dontHi: "चुगली",                            dontEn: "Gossip" },
  // Ardhamana: शुभ default, अशुभ on Sunday (0)
  { number: 14, nameHi: "अर्धमन",       nameEn: "Ardhamana",   baseClass: "shubh",
    conditionVaras: [0], conditionClass: "ashubh",
    doHi: "समझौते, संबंध",                      doEn: "Agreements, relationships",
    dontHi: "(रवि को) प्रतिष्ठा कार्य",          dontEn: "(Sun) consecration ceremonies" },
  { number: 15, nameHi: "भगा",          nameEn: "Bhaga",       baseClass: "ashubh",
    doHi: "दान",                                 doEn: "Charity",
    dontHi: "संपत्ति बाँटना",                    dontEn: "Property division" },

  // Night muhurtas 16..30 (sunset → next sunrise)
  { number: 16, nameHi: "गिरिश",        nameEn: "Girisha",     baseClass: "shubh",
    doHi: "कार्य का समापन",                     doEn: "Concluding work",
    dontHi: "जोखिम भरे आरम्भ",                  dontEn: "Risky beginnings" },
  { number: 17, nameHi: "अजगवद",        nameEn: "Ajagavada",   baseClass: "ashubh",
    doHi: "परीक्षण, लेखा-जोखा",                 doEn: "Testing, accounting",
    dontHi: "यात्रा, शल्यक्रिया",                dontEn: "Travel, surgery" },
  { number: 18, nameHi: "अहिर्बुध्न्य",  nameEn: "Ahirbudhnya", baseClass: "shubh",
    doHi: "अध्ययन, चिकित्सा",                  doEn: "Study, medical care",
    dontHi: "सतही प्रचार",                      dontEn: "Superficial publicity" },
  { number: 19, nameHi: "पुष्य",         nameEn: "Pushya",      baseClass: "shubh",
    doHi: "शिक्षा, पोषण",                       doEn: "Education, nourishment",
    dontHi: "गलत भोजन",                          dontEn: "Wrong diet" },
  { number: 20, nameHi: "अश्विनी",       nameEn: "Ashwini",     baseClass: "shubh",
    doHi: "उपचार, यात्रा, शुरुआत",              doEn: "Healing, travel, beginnings",
    dontHi: "विलम्ब",                            dontEn: "Procrastination" },
  { number: 21, nameHi: "यम",            nameEn: "Yama",        baseClass: "ashubh",
    doHi: "अनुशासन, नियम",                     doEn: "Discipline, rules",
    dontHi: "उत्सव, जोखिम",                     dontEn: "Celebration, risk" },
  { number: 22, nameHi: "अग्नि",         nameEn: "Agni",        baseClass: "shubh",
    doHi: "साहसिक कार्य, ऊर्जा",                 doEn: "Bold action, energy",
    dontHi: "क्रोध, जल्दबाज़ी",                  dontEn: "Anger, haste" },
  { number: 23, nameHi: "विधातु",        nameEn: "Vidhatu",     baseClass: "shubh",
    doHi: "दस्तावेज़, अनुबंध",                  doEn: "Documents, contracts",
    dontHi: "टालना",                             dontEn: "Procrastination" },
  { number: 24, nameHi: "कण्ड",          nameEn: "Kanda",       baseClass: "shubh",
    doHi: "कला, सजावट",                          doEn: "Art, decoration",
    dontHi: "अहंकार",                             dontEn: "Pride" },
  { number: 25, nameHi: "अदिति",         nameEn: "Aditi",       baseClass: "shubh",
    doHi: "क्षमा, दान",                           doEn: "Forgiveness, charity",
    dontHi: "कठोरता",                              dontEn: "Harshness" },
  { number: 26, nameHi: "जीव/अमृत",      nameEn: "Jiva/Amrit",  baseClass: "ati-shubh",
    doHi: "व्रत, साधना, स्वास्थ्य",              doEn: "Vows, sadhana, health",
    dontHi: "हानिकारक कार्य",                   dontEn: "Harmful actions" },
  { number: 27, nameHi: "विष्णु",        nameEn: "Vishnu",      baseClass: "shubh",
    doHi: "दीर्घकालीन योजना",                   doEn: "Long-term planning",
    dontHi: "जुआ",                                dontEn: "Gambling" },
  { number: 28, nameHi: "घुमद्द्युति",   nameEn: "Ghumadyuti",  baseClass: "shubh",
    doHi: "कला, संगीत",                           doEn: "Art, music",
    dontHi: "झगड़े",                                dontEn: "Quarrels" },
  { number: 29, nameHi: "ब्रह्म",        nameEn: "Brahma",      baseClass: "ati-shubh",
    doHi: "ध्यान, वेदाध्ययन",                    doEn: "Meditation, scripture study",
    dontHi: "व्यर्थ बातें",                       dontEn: "Idle talk" },
  { number: 30, nameHi: "समुद्र",        nameEn: "Samudra",     baseClass: "shubh",
    doHi: "यात्रा प्रारम्भ, शुद्धि",              doEn: "Beginning travel, purification",
    dontHi: "गंदगी, अपव्यय",                       dontEn: "Filth, waste" },
];

/** Resolve the effective classification for a given muhurta on a given vara (weekday 0-6). */
export function resolveNityaClass(spec: NityaMuhurtaSpec, vara: number): NityaShubhAshubh {
  if (spec.conditionVaras?.includes(vara) && spec.conditionClass) return spec.conditionClass;
  return spec.baseClass;
}
