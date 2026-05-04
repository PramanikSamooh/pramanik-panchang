type TermProps = {
  en: string;
  hi: string;
  meaning?: string;
};

/** Inline bilingual term: English (देवनागरी) — meaning. */
export function Term({ en, hi, meaning }: TermProps) {
  return (
    <span className="whitespace-nowrap">
      <strong className="text-orange-300">{en}</strong>
      <span className="mx-1 text-gray-500">·</span>
      <span lang="hi" className="text-gray-300">
        {hi}
      </span>
      {meaning && <span className="text-gray-400"> ({meaning})</span>}
    </span>
  );
}

/** Callout for a key concept the reader should remember. */
export function KeyIdea({
  title,
  titleHi,
  children,
}: {
  title: string;
  titleHi?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="my-8 rounded-xl border-l-4 border-orange-500 bg-orange-500/5 p-5">
      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-orange-400">
        Key idea
      </div>
      <div className="text-base font-semibold text-gray-100">
        {title}
        {titleHi && (
          <span className="ml-2 text-gray-400 font-normal" lang="hi">
            — {titleHi}
          </span>
        )}
      </div>
      <div className="mt-2 text-gray-300">{children}</div>
    </aside>
  );
}
