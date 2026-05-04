"use client";

import Link from "next/link";
import { CHAPTERS, getAdjacentChapters, type Chapter } from "@/lib/learn/chapters";
import { LanguageToggle, useLanguage } from "./LanguageContext";

type Props = {
  chapter: Chapter;
  en: React.ReactNode;
  hi: React.ReactNode;
};

export function ChapterShell({ chapter, en, hi }: Props) {
  const { lang } = useLanguage();
  const { prev, next } = getAdjacentChapters(chapter.slug);

  const headerEyebrowEn =
    chapter.number === 0 ? "Foreword" : `Chapter ${chapter.number}`;
  const headerEyebrowHi =
    chapter.number === 0 ? "प्राक्कथन" : `अध्याय ${chapter.number}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
              {lang === "hi" ? "पुस्तक 1 — पंचांग" : "Book 1 — Panchang"}
            </span>
          </div>
          <ol className="space-y-1 text-sm">
            {CHAPTERS.filter((c) => c.part === "panchang").map((c) => {
              const active = c.slug === chapter.slug;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/learn/${c.slug}`}
                    className={`block rounded-md px-3 py-2 leading-snug transition ${
                      active
                        ? "bg-orange-500/10 text-orange-300"
                        : "text-gray-400 hover:bg-gray-900 hover:text-gray-100"
                    }`}
                  >
                    <span className="mr-2 text-xs text-gray-500">
                      {c.number === 0 ? "—" : c.number.toString().padStart(2, "0")}
                    </span>
                    <span lang={lang}>{lang === "hi" ? c.titleHi : c.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </aside>

      <article className="min-w-0">
        <header className="mb-8 border-b border-gray-800 pb-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
              <span lang={lang}>{lang === "hi" ? headerEyebrowHi : headerEyebrowEn}</span>
            </div>
            <LanguageToggle />
          </div>
          <h1
            className="text-3xl font-bold text-gray-50 sm:text-4xl"
            lang={lang}
          >
            {lang === "hi" ? chapter.titleHi : chapter.title}
          </h1>
          <p className="mt-2 text-lg text-gray-400" lang={lang === "hi" ? "en" : "hi"}>
            {lang === "hi" ? chapter.title : chapter.titleHi}
          </p>
        </header>

        <div className="prose-book" lang={lang}>
          {lang === "hi" ? hi : en}
        </div>

        <nav className="mt-16 grid gap-3 border-t border-gray-800 pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/learn/${prev.slug}`}
              className="group rounded-lg border border-gray-800 p-4 transition hover:border-orange-500/50 hover:bg-gray-900"
            >
              <div className="text-xs uppercase tracking-wider text-gray-500">
                {lang === "hi" ? "← पिछला" : "← Previous"}
              </div>
              <div className="mt-1 font-semibold text-gray-100 group-hover:text-orange-300" lang={lang}>
                {lang === "hi" ? prev.titleHi : prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/learn/${next.slug}`}
              className="group rounded-lg border border-gray-800 p-4 text-right transition hover:border-orange-500/50 hover:bg-gray-900"
            >
              <div className="text-xs uppercase tracking-wider text-gray-500">
                {lang === "hi" ? "अगला →" : "Next →"}
              </div>
              <div className="mt-1 font-semibold text-gray-100 group-hover:text-orange-300" lang={lang}>
                {lang === "hi" ? next.titleHi : next.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
