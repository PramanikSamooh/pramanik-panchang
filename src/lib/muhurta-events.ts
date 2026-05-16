// Muhurta-finder rule data — 10 sanskara events sourced from **Muhurta Chintamani**
// (Daivajna Sri Rama, c. 1600 CE) with cross-reference to Drik Panchang's sanskara
// pages and Pt. Mihir Chandra Sharma's edition.
//
// The scorer in `muhurta-finder.ts` applies these rules against each `PanchangDay`
// and produces a verdict (favorable / mixed / avoid) + reasons + sub-day windows.
//
// Conventions:
//   - tithi numbers are 1..15 within a paksha (1 = Pratipada, 15 = Purnima or Amavasya).
//   - nakshatra numbers are 1..27 (1 = Ashwini, 27 = Revati).
//   - yoga numbers are 1..27 (1 = Vishkambha, 17 = Vyatipata, 27 = Vaidhriti).
//   - vara numbers are 0..6 (0 = Sunday, 6 = Saturday).
//   - rashi numbers are 0..11 (0 = Mesha, 11 = Meena).
//
// Universal hard exclusions not encoded per-event (the engine applies them globally
// to every shubh-karma): Vyatipata yoga (17), Vaidhriti yoga (27), Vishti karana
// (Bhadra). Per-event toggles for Panchak, Mool, Amavasya, paksha preferences.

export type MuhurtaEventId =
  | "graha_pravesh"
  | "vivah"
  | "mundan"
  | "vidyarambh"
  | "karna_vedh"
  | "annaprashan"
  | "vahan_kraya"
  | "vyapar_arambh"
  | "bhoomi_pujan"
  | "namakaran"
  // Jain pratishtha (consecration) events — rules from Pratishtha Pradip
  // (Pt. Nathulal Jain Shastri, 1998) and Vasunandi's Pratishtha Sara Sangraha
  // tradition (cited via PP).
  | "bimba_pratishtha"
  | "panch_kalyanak"
  | "jinalaya_shilanyas"
  | "mandir_kalash_pratishtha"
  | "vedi_pratishtha"
  | "dhvajarohan";

export interface MuhurtaEventRules {
  id: MuhurtaEventId;
  nameHi: string;
  nameEn: string;
  descHi: string;
  descEn: string;
  source: string;
  /** Multi-day events (e.g. Panch Kalyanak mahotsava). When set, the scorer
   *  validates the lookahead window [start … start+days-1] is also clean of
   *  hard exclusions (Vyatipata/Vaidhriti yoga, Bhadra if `avoidBhadra`,
   *  Guru/Shukra combust). User can pick from `options` in the UI. */
  multiDay?: {
    defaultDays: number;
    options: number[];
  };
  rules: {
    favorableTithis?: number[];
    avoidTithis?: number[];
    avoidTithisShukla?: number[];
    avoidTithisKrishna?: number[];

    favorableNakshatras?: number[];
    avoidNakshatras?: number[];

    favorableYogas?: number[];
    avoidYogas?: number[];

    favorableVaras?: number[];
    avoidVaras?: number[];

    avoidKrishnaPaksha?: boolean;
    /** Shukla strongly preferred; Krishna 1..10 acceptable. */
    preferShuklaPaksha?: boolean;

    avoidBhadra?: boolean;
    avoidPanchak?: boolean;
    avoidMool?: boolean;
    avoidAmavasya?: boolean;

    favorableMoonRashis?: number[];
    avoidMoonRashis?: number[];

    /** Require sun in Uttarayana (sidereal Capricorn → Gemini, ~mid-Jan to mid-Jul). */
    requireUttarayana?: boolean;

    notesHi?: string;
    notesEn?: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// The 10 sanskara events — rules per Muhurta Chintamani (verified)
// ─────────────────────────────────────────────────────────────────────────────

export const MUHURTA_EVENTS: MuhurtaEventRules[] = [
  // 1 ─────────────────────────────────────────────────────────────────────────
  {
    id: "graha_pravesh",
    nameHi: "गृह प्रवेश",
    nameEn: "Graha Pravesh",
    descHi: "नवीन गृह में प्रथम प्रवेश (अपूर्व / सपूर्व / द्वन्द्वज भेद)",
    descEn: "First entry into a new home (apurva / sapurva / dwandwah types)",
    source: "Muhurta Chintamani — Vastu-Vichara Prakarana",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 12, 13],
      avoidTithis: [1, 4, 6, 8, 9, 14, 15],
      // Rohini, Mrigashira, U-Phalguni, Hasta, Chitra, Anuradha, U-Ashadha, U-Bhadrapada, Revati
      favorableNakshatras: [4, 5, 12, 13, 14, 17, 21, 26, 27],
      // Bharani, Krittika, Ardra, Ashlesha, Magha, Jyestha, Mula
      avoidNakshatras: [2, 3, 6, 9, 10, 18, 19],
      avoidYogas: [17, 19, 27], // Vyatipata, Parigha (first half), Vaidhriti
      favorableVaras: [1, 3, 4, 5], // Mon, Wed, Thu, Fri
      avoidVaras: [0, 2, 6], // Sun, Tue, Sat
      avoidBhadra: true,
      avoidPanchak: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      notesHi: "अपूर्व-गृह-प्रवेश: माघ-फाल्गुन-वैशाख-ज्येष्ठ श्रेष्ठ; चातुर्मास (आषाढ़ शुक्ल 11 → कार्तिक शुक्ल 11) तथा होलाष्टक, मलमास, गुरु-शुक्र-अस्त, ग्रहण भी वर्जित — ज्योतिषाचार्य से पुष्टि करें।",
      notesEn: "Apurva (new) graha pravesh: months Magh-Phalgun-Vaishakh-Jyeshtha best; Chaturmas (Ashadha S11 → Kartik S11), Holashtak, Malmaas, Guru/Shukra asta, eclipses also exclude — confirm with a Jyotishacharya.",
    },
  },

  // 2 ─────────────────────────────────────────────────────────────────────────
  {
    id: "vivah",
    nameHi: "विवाह",
    nameEn: "Vivah (Marriage)",
    descHi: "विवाह संस्कार — सबसे जटिल मुहूर्त (नवांश-शुद्धि, चन्द्र-बल, तारा-बल सहित)",
    descEn: "Marriage — most complex muhurta (Navamsa-shuddhi, Chandra-bala, Tara-bala)",
    source: "Muhurta Chintamani — Vivaha Prakaranam (ch. 5-6); Brihat Samhita ch. 100",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13],
      avoidTithis: [1, 4, 6, 8, 9, 12, 14, 15],
      avoidTithisKrishna: [11, 12, 13, 14, 15],
      // Rohini, Mrigashira, Magha (excl. pada 1), U-Phalguni, Hasta, Swati, Anuradha,
      // Mula (excl. pada 1), U-Ashadha, U-Bhadrapada, Revati (excl. last pada)
      favorableNakshatras: [4, 5, 10, 12, 13, 15, 17, 19, 21, 26, 27],
      // Bharani, Krittika, Ardra, Ashlesha, Jyestha, P-Phalguni, P-Ashadha, P-Bhadrapada
      avoidNakshatras: [2, 3, 6, 9, 11, 18, 20, 25],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5], // Sun also acceptable but secondary
      avoidVaras: [2, 6],
      avoidBhadra: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      notesHi: "विवाह में और भी कई शर्तें हैं — खर-मास, चातुर्मास, गुरु-शुक्र अस्त, होलाष्टक, मलमास, सिंहस्थ गुरु, चन्द्र-बल, तारा-बल — यह यंत्र इन पर ध्यान नहीं देता; ज्योतिषाचार्य से पुष्टि अनिवार्य।",
      notesEn: "Vivah has many further checks — Khar-maas, Chaturmas, Guru/Shukra asta, Holashtak, Malmaas, Singhastha-Guru, Chandra-bala, Tara-bala — NOT checked by this finder. Confirm with a Jyotishacharya is essential.",
    },
  },

  // 3 ─────────────────────────────────────────────────────────────────────────
  {
    id: "mundan",
    nameHi: "मुण्डन / चूड़ाकरण",
    nameEn: "Mundan / Chudakarana",
    descHi: "बालक का प्रथम केश-मुण्डन — आमतौर पर 3, 5 या 7वें वर्ष में",
    descEn: "Child's first head-shaving — typically 3rd, 5th or 7th year",
    source: "Muhurta Chintamani — Sanskara Prakarana (Chudakarana)",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13],
      avoidTithis: [1, 4, 6, 8, 9, 14, 15],
      // Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Chitra, Swati, Jyestha (Mundan-special),
      // Shravana, Dhanishtha, Shatabhisha, Revati
      favorableNakshatras: [1, 5, 7, 8, 13, 14, 15, 18, 22, 23, 24, 27],
      avoidNakshatras: [2, 3, 6, 9, 10, 16, 19], // Bharani, Krittika, Ardra, Ashlesha, Magha, Vishakha, Mula
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [0, 2, 6], // Friday inauspicious for girl child — UI to flag separately
      avoidBhadra: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      requireUttarayana: true,
      notesHi: "बालक के जन्म-नक्षत्र, जन्म-माह में वर्जित; उत्तरायण (मकर-मिथुन) में करना। कन्या के लिए शुक्रवार त्यागें।",
      notesEn: "Avoid child's janma-nakshatra and janma-masa; perform only in Uttarayana (Sun in Capricorn through Gemini). Friday inauspicious for girl child.",
    },
  },

  // 4 ─────────────────────────────────────────────────────────────────────────
  {
    id: "vidyarambh",
    nameHi: "विद्यारम्भ / अक्षराभ्यास",
    nameEn: "Vidyarambh / Aksharabhyas",
    descHi: "बालक की औपचारिक शिक्षा का प्रारम्भ; पारम्परिक रूप से वसन्त पंचमी सर्वोत्तम",
    descEn: "Start of child's formal education; traditionally Vasant Panchami is best of year",
    source: "Muhurta Chintamani — Sanskara Prakarana (Vidyarambha)",
    rules: {
      favorableTithis: [2, 3, 5, 6, 7, 10, 11, 12],
      avoidTithis: [1, 4, 8, 9, 14, 15],
      // Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, U-Phalguni, Hasta, Chitra, Swati,
      // Anuradha, U-Ashadha, Shravana, Dhanishtha, Shatabhisha, U-Bhadrapada, Revati
      favorableNakshatras: [1, 4, 5, 7, 8, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26, 27],
      avoidNakshatras: [2, 3, 10, 18],
      avoidYogas: [17, 19, 27],
      favorableVaras: [3, 4, 5], // Wed (Mercury), Thu (Jupiter), Fri (Venus)
      avoidVaras: [1, 2, 6], // Mon excluded (Moon = mind, not intellect for first letters)
      avoidBhadra: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      requireUttarayana: true,
      notesHi: "बुधवार-गुरुवार विशेष श्रेष्ठ; पुष्य नक्षत्र अति-शुभ; गुरु-पुष्य, बुध-पुष्य, सर्वार्थसिद्धि योग में अति-उत्तम। पारम्परिक उम्र 5वें वर्ष में।",
      notesEn: "Wednesday and Thursday especially good; Pushya nakshatra is excellent; Guru-Pushya, Budha-Pushya, Sarvarthasiddhi yogas are best. Traditional age is 5th year.",
    },
  },

  // 5 ─────────────────────────────────────────────────────────────────────────
  {
    id: "karna_vedh",
    nameHi: "कर्ण वेध",
    nameEn: "Karna Vedh (Ear Piercing)",
    descHi: "कर्ण-छेदन संस्कार — 6/7/8वें माह या 3/5वें वर्ष में मध्याह्न से पूर्व",
    descEn: "Ear-piercing — at 6/7/8 months or 3rd/5th year; before mid-day",
    source: "Muhurta Chintamani — Sanskara Prakarana (Karnavedha)",
    rules: {
      favorableTithis: [2, 3, 5, 6, 7, 10, 11, 12, 13],
      avoidTithis: [1, 4, 8, 9, 14, 15],
      // Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Chitra, Anuradha, Shravana, Dhanishtha, Revati
      favorableNakshatras: [1, 5, 7, 8, 13, 14, 17, 22, 23, 27],
      avoidNakshatras: [2, 3, 6, 9, 10, 18, 19],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [0, 2, 6],
      avoidBhadra: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      requireUttarayana: true,
      notesHi: "केवल अपराह्न से पूर्व (दोपहर से पहले) करना। बालक के जन्म-नक्षत्र-मास में वर्जित। पुत्र: दायाँ कर्ण पहले; कन्या: बायाँ कर्ण पहले।",
      notesEn: "Only before Aparahna (afternoon). Avoid child's janma-nakshatra-maas. Boys: right ear first; Girls: left ear first.",
    },
  },

  // 6 ─────────────────────────────────────────────────────────────────────────
  {
    id: "annaprashan",
    nameHi: "अन्नप्राशन",
    nameEn: "Annaprashan",
    descHi: "बालक को प्रथम बार अन्न-ग्रहण — पुत्र 6/8/10/12वें माह में; पुत्री 5/7/9/11वें माह में",
    descEn: "First feeding of solid food — boys at 6/8/10/12 months; girls at 5/7/9/11 months",
    source: "Muhurta Chintamani — Sanskara Prakarana (Annaprashan)",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15], // Purnima acceptable for this
      avoidTithis: [1, 4, 6, 8, 9, 12, 14],
      // Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, U-Phalguni, Hasta, Chitra, Swati,
      // Anuradha, U-Ashadha, Shravana, Dhanishtha, Shatabhisha, U-Bhadrapada, Revati
      favorableNakshatras: [1, 4, 5, 7, 8, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 10, 18, 19],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [0, 2, 6],
      avoidBhadra: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      notesHi: "मध्याह्न से पूर्व करना। माता-पिता के जन्म-नक्षत्र पर वर्जित। बालक की जन्म-स्थिति (पंचक/मूल/भद्रा) पर अलग नियम।",
      notesEn: "Best done before noon. Avoid parents' janma-nakshatra. Special rules if child was born in Panchak/Mool/Bhadra.",
    },
  },

  // 7 ─────────────────────────────────────────────────────────────────────────
  {
    id: "vahan_kraya",
    nameHi: "वाहन क्रय",
    nameEn: "Vahan Kraya (Vehicle Purchase)",
    descHi: "नवीन वाहन क्रय अथवा प्रथम-प्रयोग; चर / द्विस्वभाव लग्न श्रेष्ठ",
    descEn: "Purchase or first use of a new vehicle; movable / dual-natured lagna preferred",
    source: "Muhurta Chintamani — Yatra Prakarana (extended for modern vehicles)",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15],
      avoidTithis: [1, 4, 6, 8, 9, 12, 14],
      // Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, U-Phalguni, Hasta, Chitra, Swati,
      // Anuradha, U-Ashadha, Shravana (chara), Dhanishtha (chara), Shatabhisha (chara), U-Bhadrapada, Revati
      favorableNakshatras: [1, 4, 5, 7, 8, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 10, 18, 19],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5], // Sun also acceptable
      avoidVaras: [2, 6], // Tue, Sat avoided — accident-prone
      avoidBhadra: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      notesHi: "चर नक्षत्र (पुनर्वसु, स्वाती, श्रवण, धनिष्ठा, शतभिषा) श्रेष्ठ — गतिमान कार्यों के लिए। मंगल-शनिवार दुर्घटना-कारक माने जाते हैं।",
      notesEn: "Chara (movable) nakshatras — Punarvasu, Swati, Shravana, Dhanishtha, Shatabhisha — best for motion. Tuesday/Saturday considered accident-prone.",
    },
  },

  // 8 ─────────────────────────────────────────────────────────────────────────
  {
    id: "vyapar_arambh",
    nameHi: "व्यापार आरम्भ",
    nameEn: "Vyapar Arambh (Business Opening)",
    descHi: "नवीन व्यापार, दुकान-उद्घाटन, खाता-बही प्रारम्भ — गुरुवार लक्ष्मी-दिवस",
    descEn: "New business, shop opening, accounts-book inauguration — Thursday is Lakshmi-day",
    source: "Muhurta Chintamani — Aarambha-siddhi / Vyavahara Prakarana",
    rules: {
      favorableTithis: [1, 2, 3, 5, 6, 7, 10, 11, 13, 15],
      avoidTithis: [4, 8, 9, 12, 14],
      // Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, U-Phalguni, Hasta, Chitra, Swati,
      // Anuradha, U-Ashadha, Shravana, Dhanishtha, U-Bhadrapada, Revati
      favorableNakshatras: [1, 4, 5, 7, 8, 12, 13, 14, 15, 17, 21, 22, 23, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 10, 18, 19],
      avoidYogas: [17, 19, 27],
      favorableVaras: [3, 4, 5], // Wed (Mercury / commerce), Thu (Jupiter / Lakshmi), Fri (Venus)
      avoidVaras: [0, 2, 6],
      avoidBhadra: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      notesHi: "गुरुवार लक्ष्मी-दिवस — सर्वोत्तम; पुष्य नक्षत्र अति-शुभ; गुरु-पुष्य, सर्वार्थसिद्धि योग में अति-उत्तम। धनतेरस, दीपावली, अक्षय तृतीया भी श्रेष्ठ। राहुकाल त्यागें।",
      notesEn: "Thursday is Lakshmi-day, strongly preferred; Pushya nakshatra excellent; Guru-Pushya, Sarvarthasiddhi peak. Dhanteras, Diwali, Akshaya Tritiya also auspicious. Avoid Rahu Kalam.",
    },
  },

  // 9 ─────────────────────────────────────────────────────────────────────────
  {
    id: "bhoomi_pujan",
    nameHi: "भूमि पूजन / शिलान्यास",
    nameEn: "Bhoomi Pujan / Shilanyas",
    descHi: "भवन-निर्माण के लिए भूमि-पूजन तथा शिलान्यास; स्थिर नक्षत्र श्रेष्ठ",
    descEn: "Ground-breaking and foundation-laying; Sthira (fixed) nakshatras strongly preferred",
    source: "Muhurta Chintamani — Vastu Prakarana (Shilanyas)",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15],
      avoidTithis: [1, 4, 6, 8, 9, 12, 14],
      // Rohini, Mrigashira, Pushya, U-Phalguni (Sthira), Hasta, Chitra, Swati, Anuradha,
      // U-Ashadha (Sthira), Shravana, Dhanishtha, Shatabhisha, U-Bhadrapada (Sthira), Revati
      favorableNakshatras: [4, 5, 8, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 10, 18, 19],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [0, 2, 6],
      avoidBhadra: true,
      avoidPanchak: true, // strictly avoided for construction
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      requireUttarayana: true,
      notesHi: "ध्रुव (स्थिर) नक्षत्र — रोहिणी, उत्तरा-फाल्गुनी, उत्तरा-षाढ़, उत्तरा-भाद्रपद — अति-शुभ; पंचक में निर्माण कठोरतया वर्जित।",
      notesEn: "Dhruva (fixed) nakshatras — Rohini, U-Phalguni, U-Ashadha, U-Bhadrapada — most auspicious. Construction during Panchak is strictly forbidden.",
    },
  },

  // 10 ────────────────────────────────────────────────────────────────────────
  {
    id: "namakaran",
    nameHi: "नामकरण",
    nameEn: "Namakaran (Naming)",
    descHi: "बालक का नामकरण — जन्म के 11वें/12वें दिन (मुहूर्त अनावश्यक) या विलम्बित होने पर ये नियम",
    descEn: "Naming ceremony — 11th/12th day post-birth (no muhurta needed if on time); rules apply if delayed",
    source: "Muhurta Chintamani — Sanskara Prakarana (Namakarana)",
    rules: {
      favorableTithis: [1, 2, 3, 5, 7, 10, 11, 12, 13],
      avoidTithis: [4, 6, 8, 9, 14, 15],
      // Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, U-Phalguni, Hasta, Chitra, Swati,
      // Anuradha, U-Ashadha, Shravana, Dhanishtha, Shatabhisha, U-Bhadrapada, Revati
      favorableNakshatras: [1, 4, 5, 7, 8, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 10, 18, 19],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [0, 2, 6],
      avoidBhadra: true,
      avoidMool: true,
      avoidAmavasya: true,
      preferShuklaPaksha: true,
      notesHi: "मध्याह्न से पूर्व करना। उस दिन के नक्षत्र-अक्षर से बालक का नाम रखने की परम्परा है। यदि 11वें/12वें दिन कर रहे हैं तो मुहूर्त-शुद्धि अनावश्यक।",
      notesEn: "Best before noon. Tradition: name the child using the akshar of the day's nakshatra. If performed on 11th/12th day post-birth, no muhurta check needed.",
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Jain pratishtha events — rules from Pratishtha Pradip (Pt. Nathulal Jain
  // Shastri, 1998, 2nd ed.) directly anchored to Vasunandi (~6th c. CE) /
  // Jayasena / Asadhara citation chains preserved in PP §25, §29, §30. Per
  // verse "देवमूर्ति-प्रतिष्ठायां स्थिर-लग्नोत्तरायणे" the universal Jain rule
  // is Sthira-lagna + Uttarayana for any deity image consecration.
  //
  // Universal Jain divergences from Hindu Muhurta Chintamani:
  //   - Mula (19) ACCEPTED for image-consecration (Tirthankar association),
  //     but explicitly excluded for shilanyas (earth-digging).
  //   - Magha (10) moderately auspicious.
  //   - Krishna paksha sharply restricted: tithis 1, 2, 5 only.
  //   - Shukla 12 (Dwadashi) is contraindicated — opposite of Hindu MC.
  //   - Uttarayana is MANDATORY (encoded via requireUttarayana).
  //   - Shatabhisha (24) is bivalent: auspicious for "entry/opening" karyas,
  //     but on avoid-list for foundation/dhvaja-raising.
  //   - Performer (yajamana) janma-nakshatra and 10/16/18/23/25 from it are
  //     excluded — not encoded in the engine; surfaced as a note instead.
  //
  // Ordering below reflects the agent's priority ranking (most-requested first).

  // 11 ────────────────────────────────────────────────────────────────────────
  {
    id: "bimba_pratishtha",
    nameHi: "बिम्ब प्रतिष्ठा",
    nameEn: "Bimba Pratishtha",
    descHi: "एकल जिन-मूर्ति की प्रतिष्ठा — परिवार या मन्दिर हेतु; पूर्वाह्ण काल में",
    descEn: "Single Jin-image installation — for home or temple; performed in pūrvāhṇa (forenoon)",
    source: "Pratishtha Pradip §25, §65, §76 (Pt. Nathulal Jain Shastri) — Vasunandi-Jayasena citation chain",
    rules: {
      favorableTithis: [1, 2, 3, 5, 7, 10, 11, 13, 15],
      avoidTithis: [4, 6, 8, 9, 12, 14],
      avoidTithisKrishna: [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      // Shatabhisha (24) accepted here for "entry-symbolism" per verse
      // "शतभिषपुस्स धणिट्ठा...". Mula (19) accepted per Jain convention.
      favorableNakshatras: [4, 5, 7, 8, 12, 13, 17, 19, 21, 22, 23, 24, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 16],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [0, 2, 6],
      avoidBhadra: true,
      avoidAmavasya: true,
      requireUttarayana: true,
      notesHi: "स्थिर लग्न (वृष/सिंह/वृश्चिक/कुम्भ) मुहूर्त-क्षण पर अनिवार्य; सप्तम स्थान में सूर्य/मंगल/शनि/राहु/शुक्र वर्जित। यजमान के जन्म-नक्षत्र तथा उससे 10वें, 16वें, 18वें, 23वें, 25वें नक्षत्र भी त्याज्य। गुरु-शुक्र अस्त, ग्रहण, अधिक/क्षय मास, सूतक त्यागें। पूर्वाह्ण काल में करें।",
      notesEn: "Sthira lagna (Taurus/Leo/Scorpio/Aquarius) mandatory at the muhurta-instant; 7th house must be free of Sun, Mars, Saturn, Rahu, Venus. Avoid the yajamana's janma-nakshatra and the 10th, 16th, 18th, 23rd, 25th from it. No Guru/Shukra-asta, eclipses, adhik/kshaya maas, sutaka. Performed in forenoon (pūrvāhṇa).",
    },
  },

  // 12 ────────────────────────────────────────────────────────────────────────
  {
    id: "panch_kalyanak",
    nameHi: "पंच कल्याणक प्रतिष्ठा",
    nameEn: "Panch Kalyanak Pratishtha",
    descHi: "तीर्थंकर मूर्ति का पंच-कल्याणक प्रतिष्ठा महोत्सव (5/7/9 दिन) — पूरे काल का सत्यापन",
    descEn: "Tirthankar's Panch Kalyanak consecration mahotsava (5/7/9 days) — full window validated",
    source: "Pratishtha Pradip §21, §25, Part 2 (Pt. Nathulal Jain Shastri)",
    multiDay: { defaultDays: 5, options: [5, 7, 9] },
    rules: {
      // PP p. 53-54 explicit shukla list.
      favorableTithis: [1, 2, 5, 10, 13, 15],
      avoidTithis: [4, 6, 8, 9, 12, 14],
      avoidTithisKrishna: [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      // Pushya, U-trio, Mrigashira, Mula (Jain), Anuradha, Hasta, Shravan, Revati.
      favorableNakshatras: [5, 7, 8, 12, 13, 17, 19, 21, 22, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 16, 24],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [2, 6],
      avoidBhadra: true,
      avoidAmavasya: true,
      requireUttarayana: true,
      notesHi: "पूरे 5-9 दिन के महोत्सव-काल में गुरु-अस्त, शुक्र-अस्त, ग्रहण, होलाष्टक, सूतक नहीं होना चाहिए। पुष्य नक्षत्र विशेष शुभ। प्रत्येक कल्याणक का उप-मुहूर्त — जन्म-कल्याणक: सोमवार; ज्ञान-कल्याणक: बुधवार; मोक्ष-कल्याणक: गुरुवार। चैत्र, पौष, अधिक-मास में वर्जित।",
      notesEn: "Throughout the full 5-9 day mahotsava no Guru-asta, Shukra-asta, eclipse, Holashtak, or sutaka permitted. Pushya nakshatra especially auspicious. Sub-muhurtas per kalyanak: Janma → Monday; Jnana → Wednesday; Moksha → Thursday. Chaitra, Pausha, Adhik-maas excluded.",
    },
  },

  // 13 ────────────────────────────────────────────────────────────────────────
  {
    id: "jinalaya_shilanyas",
    nameHi: "जिनालय शिलान्यास",
    nameEn: "Jinalaya Shilanyas",
    descHi: "नवीन जैन मन्दिर का भूमिपूजन तथा शिलान्यास — खनन एवं शिला-स्थापना दोनों के लिए स्वतंत्र मुहूर्त",
    descEn: "Foundation laying of a new Jain temple — distinct muhurtas for excavation (khana-karya) and stone-placement (shila-sthapana)",
    source: "Pratishtha Pradip §7, §9, §10 (Pt. Nathulal Jain Shastri)",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13],
      // PP p. 33-37: Purnima excluded for foundation (earth-disturbance).
      avoidTithis: [4, 6, 8, 9, 12, 14, 15],
      avoidTithisKrishna: [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      // Per Prakrit verse "ध्रुवमिउ कर पुस्स धणिट्ठ सयभिसा साई". Notably Shatabhisha
      // accepted here (earth-stability symbolism) but Mula explicitly EXCLUDED
      // — divergence from general Jain rule because of digging operation.
      favorableNakshatras: [4, 5, 8, 12, 13, 15, 21, 22, 23, 24, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 16, 19],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [0, 2, 6],
      avoidBhadra: true,
      avoidPanchak: true, // construction during panchak strictly forbidden
      avoidMool: true,    // Mool/Gandanta nakshatras excluded for earth-work
      avoidAmavasya: true,
      requireUttarayana: true,
      notesHi: "खनन-कार्य तथा शिला-स्थापना के लिए स्वतंत्र मुहूर्त — खनन हेतु चर लग्न (मेष/कर्क/तुला/मकर); शिला-स्थापना हेतु स्थिर लग्न। चैत्र, चातुर्मास (आषाढ़ शुक्ल 11 → कार्तिक शुक्ल 11), पितृ-पक्ष, अधिक-मास, होलाष्टक में वर्जित। आषाढ़ का पूर्वार्ध केवल खनन के लिए स्वीकार्य।",
      notesEn: "Distinct muhurtas for digging (khana-karya) and stone-laying (shila-sthapana) — Chara (movable) lagna for digging, Sthira (fixed) for stone placement. Avoid Chaitra, Chaturmas (Ashadha S11 → Kartik S11), Pitru Paksha, Adhik-maas, Holashtak. First half of Ashadha acceptable for digging only.",
    },
  },

  // 14 ────────────────────────────────────────────────────────────────────────
  {
    id: "mandir_kalash_pratishtha",
    nameHi: "मन्दिर कलश प्रतिष्ठा",
    nameEn: "Mandir Kalash Pratishtha",
    descHi: "मन्दिर शिखर पर कलश-स्थापना — स्थिर लग्न पर पूर्वाह्ण-काल में",
    descEn: "Temple finial (kalash) installation on the shikhara — Sthira lagna, forenoon",
    source: "Pratishtha Pradip §72, §18 (Mana-stambha + Shikhar) (Pt. Nathulal Jain Shastri)",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15],
      avoidTithis: [4, 6, 8, 9, 12, 14],
      avoidTithisKrishna: [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      favorableNakshatras: [4, 5, 7, 8, 12, 13, 21, 22, 23, 26, 27],
      avoidNakshatras: [2, 3, 6, 9, 16],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [2, 6],
      avoidBhadra: true,
      avoidAmavasya: true,
      requireUttarayana: true,
      notesHi: "स्थिर लग्न (वृष/सिंह/वृश्चिक/कुम्भ) — कलश शिखर का स्थिरता-प्रतीक। मूल बिम्ब-प्रतिष्ठा से पूर्व अथवा सहवर्ती करना। पूर्वाह्ण-काल श्रेष्ठ। चातुर्मास, पितृ-पक्ष, ग्रहण, अधिक-मास में वर्जित।",
      notesEn: "Sthira lagna (Taurus/Leo/Scorpio/Aquarius) — kalash symbolizes fixity at the apex. Performed before or concurrent with main bimba-pratishtha. Forenoon (pūrvāhṇa) best. Avoid Chaturmas, Pitru Paksha, eclipses, Adhik-maas.",
    },
  },

  // 15 ────────────────────────────────────────────────────────────────────────
  {
    id: "vedi_pratishtha",
    nameHi: "वेदी / मानस्तंभ प्रतिष्ठा",
    nameEn: "Vedi / Mana-stambha Pratishtha",
    descHi: "वेदी (आसन-पीठ) तथा मानस्तंभ का प्रतिष्ठा-संस्कार — मन्दिर के भीतर",
    descEn: "Vedi (altar throne) and Mana-stambha (pillar) consecration — within the temple",
    source: "Pratishtha Pradip §17, §18, §65 (Pt. Nathulal Jain Shastri)",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15],
      avoidTithis: [4, 6, 8, 9, 12, 14],
      avoidTithisKrishna: [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      favorableNakshatras: [4, 5, 7, 8, 12, 13, 17, 21, 22, 23, 26, 27],
      // Shatabhisha (24) on avoid-list for vedi specifically.
      avoidNakshatras: [2, 3, 6, 9, 16, 24],
      avoidYogas: [17, 19, 27],
      favorableVaras: [1, 3, 4, 5],
      avoidVaras: [0, 2, 6], // Sunday excluded for vedi (per encyclopedia)
      avoidBhadra: true,
      avoidAmavasya: true,
      requireUttarayana: true,
      notesHi: "वेदी हेतु स्थिर लग्न; मानस्तंभ-निर्माण के लिए द्विस्वभाव लग्न (मिथुन/कन्या/धनु/मीन) स्वीकार्य। सप्तम स्थान में सूर्य/मंगल/शनि/राहु/शुक्र वर्जित (श्लोक: 'रवि: कुजोऽर्कजो राहु: शुक्रो वा सप्तमस्थित: हन्ति')। चातुर्मास, पितृ-पक्ष, ग्रहण, अधिक-क्षय मास, सूतक त्यागें।",
      notesEn: "Sthira lagna for vedi; Dwiswabhava (Gemini/Virgo/Sagittarius/Pisces) acceptable for Mana-stambha. 7th house must be free of Sun/Mars/Saturn/Rahu/Venus (verse: 'ravi: kujo'rkajo rāhu: śukro vā saptamasthita: hanti'). Avoid Chaturmas, Pitru Paksha, eclipses, adhik/kshaya maas, sutaka.",
    },
  },

  // 16 ────────────────────────────────────────────────────────────────────────
  {
    id: "dhvajarohan",
    nameHi: "ध्वजारोहण",
    nameEn: "Dhvajarohan (Flag Hoisting)",
    descHi: "मन्दिर शिखर पर ध्वज-दण्ड एवं ध्वजा-आरोहण — रवि-वार स्वीकार्य",
    descEn: "Flag-pole and flag hoisting on the temple shikhara — Sunday is acceptable",
    source: "Pratishtha Pradip §57, §74, §75 (Pt. Nathulal Jain Shastri)",
    rules: {
      favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15],
      avoidTithis: [4, 6, 8, 9, 14],
      avoidTithisKrishna: [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      favorableNakshatras: [5, 7, 8, 12, 13, 22, 23, 26, 27],
      // Shatabhisha (24) avoided for dhvaja-raising (different from bimba).
      avoidNakshatras: [2, 6, 9, 16, 24],
      avoidYogas: [17, 19, 27],
      // Unique to dhvajarohan: Sunday is permitted (Sun/flag symbolism).
      favorableVaras: [0, 1, 4, 5],
      avoidVaras: [2, 6],
      avoidBhadra: true,
      avoidAmavasya: true,
      // Uttarayana strongly preferred for initial installation; relaxed for
      // annual recurring dhvajarohan. We surface as a note rather than block.
      notesHi: "प्रथम ध्वज-दण्ड स्थापना हेतु उत्तरायण श्रेष्ठ; वार्षिक पुनरावृत्ति में लचीला। ध्वज-दण्ड का काष्ठ-कर्तन मृदु नक्षत्रों (मृगशिरा/चित्रा/अनुराधा/रेवती) में करें (§74 ध्वज-दण्ड शुद्धि)। ग्रहण, सूतक, अधिक-मास त्यागें।",
      notesEn: "Uttarayana preferred for initial installation; flexible for annual recurring dhvajarohan. The flag-pole wood-cutting (§74 Dhvaja Danda Shuddhi) should use Mridu nakshatras (Mrigashira/Chitra/Anuradha/Revati). Avoid eclipses, sutaka, Adhik-maas.",
    },
  },
];

export function getMuhurtaEvent(id: MuhurtaEventId): MuhurtaEventRules | undefined {
  return MUHURTA_EVENTS.find((e) => e.id === id);
}

// ─────────────────────────────────────────────────────────────────────────────
// Reference: nakshatra & yoga names by number — used by the scorer to format reasons.
// ─────────────────────────────────────────────────────────────────────────────

export const NAKSHATRA_NAMES_HI_BY_NUM: Record<number, string> = {
  1: "अश्विनी", 2: "भरणी", 3: "कृत्तिका", 4: "रोहिणी", 5: "मृगशिरा", 6: "आर्द्रा",
  7: "पुनर्वसु", 8: "पुष्य", 9: "आश्लेषा", 10: "मघा", 11: "पूर्वाफाल्गुनी", 12: "उत्तराफाल्गुनी",
  13: "हस्त", 14: "चित्रा", 15: "स्वाती", 16: "विशाखा", 17: "अनुराधा", 18: "ज्येष्ठा",
  19: "मूल", 20: "पूर्वाषाढ़ा", 21: "उत्तराषाढ़ा", 22: "श्रवण", 23: "धनिष्ठा", 24: "शतभिषा",
  25: "पूर्वाभाद्रपद", 26: "उत्तराभाद्रपद", 27: "रेवती",
};

export const NAKSHATRA_NAMES_EN_BY_NUM: Record<number, string> = {
  1: "Ashwini", 2: "Bharani", 3: "Krittika", 4: "Rohini", 5: "Mrigashira", 6: "Ardra",
  7: "Punarvasu", 8: "Pushya", 9: "Ashlesha", 10: "Magha", 11: "Purvaphalguni", 12: "Uttaraphalguni",
  13: "Hasta", 14: "Chitra", 15: "Swati", 16: "Vishakha", 17: "Anuradha", 18: "Jyeshtha",
  19: "Mula", 20: "Purvashadha", 21: "Uttarashadha", 22: "Shravana", 23: "Dhanishtha", 24: "Shatabhisha",
  25: "Purvabhadrapada", 26: "Uttarabhadrapada", 27: "Revati",
};

export const YOGA_NAMES_HI_BY_NUM: Record<number, string> = {
  1: "विष्कम्भ", 2: "प्रीति", 3: "आयुष्मान", 4: "सौभाग्य", 5: "शोभन", 6: "अतिगण्ड",
  7: "सुकर्मा", 8: "धृति", 9: "शूल", 10: "गण्ड", 11: "वृद्धि", 12: "ध्रुव",
  13: "व्याघात", 14: "हर्षण", 15: "वज्र", 16: "सिद्धि", 17: "व्यतीपात", 18: "वरीयान",
  19: "परिघ", 20: "शिव", 21: "सिद्ध", 22: "साध्य", 23: "शुभ", 24: "शुक्ल",
  25: "ब्रह्म", 26: "इन्द्र", 27: "वैधृति",
};

export const YOGA_NAMES_EN_BY_NUM: Record<number, string> = {
  1: "Vishkambha", 2: "Priti", 3: "Ayushman", 4: "Saubhagya", 5: "Shobhana", 6: "Atiganda",
  7: "Sukarma", 8: "Dhriti", 9: "Shoola", 10: "Ganda", 11: "Vriddhi", 12: "Dhruva",
  13: "Vyaghata", 14: "Harshana", 15: "Vajra", 16: "Siddhi", 17: "Vyatipata", 18: "Variyana",
  19: "Parigha", 20: "Shiva", 21: "Siddha", 22: "Sadhya", 23: "Shubha", 24: "Shukla",
  25: "Brahma", 26: "Indra", 27: "Vaidhriti",
};
