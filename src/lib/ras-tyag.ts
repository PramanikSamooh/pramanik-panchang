// Ras Tyag — the food/taste to renounce on each weekday, per Jain practice.
// Index 0 = Sunday, ..., 6 = Saturday (matches Date.getDay()).

export interface RasTyagItem {
  rasHi: string;       // The "ras" or item to give up (Hindi)
  rasEn: string;       // English label
  itemsHi: string;     // Hindi description of items typically included
  itemsEn: string;     // English description
  emoji: string;       // small visual cue
}

export const RAS_TYAG_BY_VARA: Record<number, RasTyagItem> = {
  0: { // रविवार — Sunday
    rasHi: "नमक",
    rasEn: "Salt",
    itemsHi: "नमक एवं नमकीन पदार्थ",
    itemsEn: "Salt and salty foods",
    emoji: "🧂",
  },
  1: { // सोमवार — Monday
    rasHi: "हरे फल / सब्ज़ियाँ",
    rasEn: "Green fruits/vegetables",
    itemsHi: "सब हरे फल एवं सब्ज़ियाँ",
    itemsEn: "All green fruits and vegetables",
    emoji: "🥬",
  },
  2: { // मंगलवार — Tuesday
    rasHi: "मीठा",
    rasEn: "Sweets",
    itemsHi: "मिठाई, गुड़, शक्कर के पदार्थ",
    itemsEn: "Sweets, jaggery, sugar items",
    emoji: "🍯",
  },
  3: { // बुधवार — Wednesday
    rasHi: "घी",
    rasEn: "Ghee",
    itemsHi: "घी एवं उससे बने पदार्थ",
    itemsEn: "Ghee and ghee-based items",
    emoji: "🥛",
  },
  4: { // गुरुवार — Thursday
    rasHi: "दूध",
    rasEn: "Milk",
    itemsHi: "दूध एवं दूध से बने पदार्थ",
    itemsEn: "Milk and milk products",
    emoji: "🥛",
  },
  5: { // शुक्रवार — Friday
    rasHi: "दही / खट्टा",
    rasEn: "Curd / sour",
    itemsHi: "दही, खट्टे पदार्थ",
    itemsEn: "Curd and sour items",
    emoji: "🥄",
  },
  6: { // शनिवार — Saturday
    rasHi: "तेल",
    rasEn: "Oil",
    itemsHi: "तेल एवं तेल से बने पदार्थ",
    itemsEn: "Oil and oil-based items",
    emoji: "🫒",
  },
};
