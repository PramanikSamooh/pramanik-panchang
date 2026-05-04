"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "hi";

const KEY = "pramanik_learn_lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "hi" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-700 bg-gray-900 p-1 text-xs">
      <button
        onClick={() => setLang("en")}
        className={`rounded-md px-3 py-1 transition ${
          lang === "en"
            ? "bg-orange-500 text-white"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLang("hi")}
        className={`rounded-md px-3 py-1 transition ${
          lang === "hi"
            ? "bg-orange-500 text-white"
            : "text-gray-400 hover:text-gray-200"
        }`}
        lang="hi"
      >
        हिन्दी
      </button>
    </div>
  );
}
