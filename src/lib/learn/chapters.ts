export type Chapter = {
  slug: string;
  number: number;
  title: string;
  titleHi: string;
  summary: string;
  summaryHi: string;
  part: "panchang" | "kundli";
};

export const CHAPTERS: Chapter[] = [
  {
    slug: "foreword",
    number: 0,
    title: "Foreword — Why this book",
    titleHi: "प्राक्कथन — यह पुस्तक क्यों",
    summary:
      "Who this book is for, what we will cover, and the difference between astronomy and astrology.",
    summaryHi:
      "यह पुस्तक किसके लिए है, इसमें क्या-क्या आएगा, और खगोल विज्ञान तथा ज्योतिष में मूल अंतर।",
    part: "panchang",
  },
  {
    slug: "time-and-sky",
    number: 1,
    title: "Time and the Sky",
    titleHi: "काल और आकाश",
    summary:
      "How the Sun, Moon, and Earth move — and why a single 'day' actually has several different definitions.",
    summaryHi:
      "सूर्य, चन्द्र और पृथ्वी की गतियाँ — और क्यों ‘एक दिन’ की वास्तव में कई अलग-अलग परिभाषाएँ होती हैं।",
    part: "panchang",
  },
  {
    slug: "tithi",
    number: 2,
    title: "Tithi — The Lunar Day",
    titleHi: "तिथि — चन्द्र दिवस",
    summary:
      "The 12° Sun–Moon angle, the 30 tithis, Shukla and Krishna paksha, and the Jain udaya-tithi 6-ghati rule.",
    summaryHi:
      "सूर्य–चन्द्र का 12° का अंतर, 30 तिथियाँ, शुक्ल-कृष्ण पक्ष और जैन उदय-तिथि का 6-घटी नियम।",
    part: "panchang",
  },
  {
    slug: "vara",
    number: 3,
    title: "Vara — The Weekday",
    titleHi: "वार — सप्ताह का दिन",
    summary:
      "Why we have seven days, how each is ruled by a graha, and the connection to the hora system.",
    summaryHi:
      "सात वार क्यों हैं, हर वार का स्वामी ग्रह कौन है, और होरा-पद्धति से इनका संबंध।",
    part: "panchang",
  },
  {
    slug: "nakshatra",
    number: 4,
    title: "Nakshatra — The 27 Lunar Mansions",
    titleHi: "नक्षत्र — 27 चन्द्र-मंडल",
    summary:
      "How the Moon's monthly path is divided into 27 segments, their symbols, and what each one carries.",
    summaryHi:
      "चन्द्रमा का मासिक मार्ग 27 खंडों में कैसे विभाजित है, उनके चिह्न, और प्रत्येक नक्षत्र का स्वभाव।",
    part: "panchang",
  },
  {
    slug: "yoga",
    number: 5,
    title: "Yoga — Sun + Moon Combined",
    titleHi: "योग — सूर्य और चन्द्र का संयोग",
    summary: "The 27 yogas formed from the combined longitude of Sun and Moon.",
    summaryHi: "सूर्य और चन्द्र के संयुक्त देशांतर से बनने वाले 27 योग।",
    part: "panchang",
  },
  {
    slug: "karana",
    number: 6,
    title: "Karana — Half a Tithi",
    titleHi: "करण — आधी तिथि",
    summary: "The 11 karanas, the four fixed and seven moving, and the role of Bhadra.",
    summaryHi: "ग्यारह करण — चार स्थिर और सात चर — तथा भद्रा की भूमिका।",
    part: "panchang",
  },
  {
    slug: "rashi-and-nakshatra",
    number: 7,
    title: "Rashi and Nakshatra",
    titleHi: "राशि और नक्षत्र",
    summary:
      "The 12 rashis, how the 27 nakshatras map onto them, and the idea of padas (quarters).",
    summaryHi:
      "12 राशियाँ, उन पर 27 नक्षत्रों का विन्यास, और पाद (चरण) की अवधारणा।",
    part: "panchang",
  },
  {
    slug: "grahas",
    number: 8,
    title: "The Nine Grahas",
    titleHi: "नवग्रह",
    summary:
      "Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu — what each one signifies.",
    summaryHi:
      "सूर्य, चन्द्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु — हर ग्रह का अपना स्वभाव और कारकत्व।",
    part: "panchang",
  },
  {
    slug: "time-units",
    number: 9,
    title: "Time Units — Ghati, Pal, Muhurta, Prahar",
    titleHi: "काल-मान — घटी, पल, मुहूर्त, प्रहर",
    summary:
      "How traditional Indian time units stack up, and how they map to the modern 24-hour clock.",
    summaryHi:
      "पारम्परिक भारतीय काल-इकाइयों की संरचना, और आधुनिक 24-घंटे की घड़ी से उनका मेल।",
    part: "panchang",
  },
  {
    slug: "choghadiya",
    number: 10,
    title: "Choghadiya — Eight Periods of Day and Night",
    titleHi: "चौघड़िया — दिन-रात के आठ काल",
    summary:
      "Where the seven names come from, how the day and night sequences differ, and how to use them.",
    summaryHi:
      "सात नाम कहाँ से आते हैं, दिन और रात के क्रम में अंतर क्यों है, और इनका व्यावहारिक उपयोग।",
    part: "panchang",
  },
  {
    slug: "muhurta",
    number: 11,
    title: "Muhurta, Rahu Kaal, and the Daily Time Map",
    titleHi: "मुहूर्त, राहु काल और दैनिक काल-नक्शा",
    summary:
      "The 30 muhurtas, Abhijit, Brahma muhurta, Rahu Kaal, Yamaganda, Gulika.",
    summaryHi:
      "30 मुहूर्त, अभिजित्, ब्रह्म मुहूर्त, राहु काल, यमगण्ड और गुलिक काल।",
    part: "panchang",
  },
  {
    slug: "auspicious-combinations",
    number: 12,
    title: "Auspicious and Inauspicious Combinations",
    titleHi: "शुभ-अशुभ योग",
    summary:
      "Tripushkar, Dwipushkar, Amrit Siddhi, Sarvarth Siddhi, Panchak, Bhadra.",
    summaryHi:
      "त्रिपुष्कर, द्विपुष्कर, अमृत सिद्धि, सर्वार्थ सिद्धि, पंचक और भद्रा।",
    part: "panchang",
  },
  {
    slug: "reading-a-panchang",
    number: 13,
    title: "How to Read a Daily Panchang",
    titleHi: "दैनिक पंचांग कैसे पढ़ें",
    summary:
      "A real day, walked through end-to-end using the Pramanik Panchang tool.",
    summaryHi:
      "एक वास्तविक दिन का पूरा पठन — प्रामाणिक पंचांग उपकरण के साथ चरण-दर-चरण।",
    part: "panchang",
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function getAdjacentChapters(slug: string): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const idx = CHAPTERS.findIndex((c) => c.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? CHAPTERS[idx - 1] : null,
    next: idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null,
  };
}
