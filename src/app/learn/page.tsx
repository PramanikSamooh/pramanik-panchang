"use client";

import Link from "next/link";
import { CHAPTERS } from "@/lib/learn/chapters";
import { LanguageToggle, useLanguage } from "@/components/learn/LanguageContext";

export default function LearnHome() {
  const { lang } = useLanguage();
  const panchangChapters = CHAPTERS.filter((c) => c.part === "panchang");
  const hi = lang === "hi";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex justify-end">
        <LanguageToggle />
      </div>

      <header className="mb-12 border-b border-gray-800 pb-10 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
          {hi ? "एक स्व-शिक्षण पुस्तक" : "A self-help book"}
        </div>
        <h1 className="text-4xl font-bold text-gray-50 sm:text-5xl" lang={lang}>
          {hi ? "पंचांग को समझना" : "Understanding Panchang"}
        </h1>
        <p className="mt-3 text-xl text-gray-400" lang={hi ? "en" : "hi"}>
          {hi ? "Understanding Panchang" : "पंचांग को समझना"}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300" lang={lang}>
          {hi ? (
            <>
              यह पुस्तक उन पाठकों के लिए है जिन्हें खगोल विज्ञान अथवा ज्योतिष
              की <em>शून्य</em> पृष्ठभूमि है, परन्तु जो तिथि, नक्षत्र, चौघड़िया
              और मुहूर्त का अर्थ &mdash; वस्तुतः &mdash; समझना चाहते हैं, यह
              जानना चाहते हैं कि ये कहाँ से आते हैं, और दैनिक पंचांग कैसे पढ़ा
              जाये।
            </>
          ) : (
            <>
              A book for people who have <em>zero</em> background in astronomy
              or astrology, but want to understand &mdash; really understand
              &mdash; what tithi, nakshatra, choghadiya, and muhurta mean,
              where they come from, and how to read a daily panchang.
            </>
          )}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-bold text-gray-100" lang={lang}>
          {hi ? "इसे कैसे पढ़ें" : "How to read this"}
        </h2>
        <ul className="space-y-3 text-gray-300" lang={lang}>
          {hi ? (
            <>
              <li>
                <strong className="text-orange-300">आरम्भ से शुरू कीजिए।</strong>{" "}
                हर अध्याय पिछले पर आधारित है। यदि आप कोई छोड़ देंगे, तो आगे
                कोई शब्द ऐसा मिलेगा जो आपको ज्ञात नहीं होगा।
              </li>
              <li>
                <strong className="text-orange-300">शान्ति से पढ़िए।</strong>{" "}
                एक दिन में एक अध्याय पर्याप्त है। चित्र देखिए, अनुच्छेद पढ़िए,
                फिर चित्र देखिए।
              </li>
              <li>
                <strong className="text-orange-300">उपकरण से मिलाकर देखिए।</strong>{" "}
                जब अध्याय कोई अवधारणा प्रस्तुत करे, तो{" "}
                <Link href="/" className="text-orange-400 underline">
                  दैनिक पंचांग
                </Link>{" "}
                खोलिए और उसी अवधारणा को किसी वास्तविक दिन में पहचानिए।
              </li>
            </>
          ) : (
            <>
              <li>
                <strong className="text-orange-300">Start at the beginning.</strong>{" "}
                Each chapter builds on the previous one. If you skip ahead you
                will hit a word you do not know.
              </li>
              <li>
                <strong className="text-orange-300">Take it slow.</strong> A
                chapter a day is plenty. Look at the figure, read the
                paragraph, look at the figure again.
              </li>
              <li>
                <strong className="text-orange-300">Cross-check with the tool.</strong>{" "}
                When a chapter introduces a concept, open{" "}
                <Link href="/" className="text-orange-400 underline">
                  the daily panchang
                </Link>{" "}
                and find that concept on a real day.
              </li>
            </>
          )}
        </ul>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-gray-100" lang={lang}>
            {hi ? "पुस्तक 1 — पंचांग" : "Book 1 — Panchang"}
          </h2>
          <span className="text-sm text-gray-500" lang={lang}>
            {panchangChapters.length} {hi ? "अध्याय" : "chapters"}
          </span>
        </div>

        <ol className="space-y-3">
          {panchangChapters.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/learn/${c.slug}`}
                className="group block rounded-xl border border-gray-800 p-5 transition hover:border-orange-500/50 hover:bg-gray-900"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-900 font-bold text-orange-400 group-hover:bg-orange-500 group-hover:text-white">
                    {c.number === 0 ? "—" : c.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-100 group-hover:text-orange-300" lang={lang}>
                      {hi ? c.titleHi : c.title}
                    </div>
                    <div className="text-sm text-gray-500" lang={hi ? "en" : "hi"}>
                      {hi ? c.title : c.titleHi}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400" lang={lang}>
                      {hi ? c.summaryHi : c.summary}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500" lang={lang}>
          {hi ? "अगला आ रहा है" : "Coming next"}
        </div>
        <h3 className="mt-1 text-xl font-bold text-gray-100" lang={lang}>
          {hi ? "पुस्तक 2 — कुण्डली पढ़ना" : "Book 2 — Reading a Kundli"}
        </h3>
        <p className="mt-2 text-gray-400" lang={lang}>
          {hi ? (
            <>
              पंचांग में निपुणता के बाद हम जन्म-कुण्डली की ओर बढ़ेंगे &mdash;
              चार्ट के प्रकार (लग्न, राशि, नवांश), बारह भाव, ग्रह-दशा, और
              कुण्डली कैसे वास्तव में पढ़ी जाये।
            </>
          ) : (
            <>
              Once we are comfortable with panchang, we will move to birth
              charts &mdash; chart types (Lagna, Rashi, Navamsa), the twelve
              houses, planetary dasha, and how to actually read a kundli.
            </>
          )}
        </p>
      </section>
    </div>
  );
}
