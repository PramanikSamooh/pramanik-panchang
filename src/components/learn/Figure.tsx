type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  captionHi?: string;
  number?: string;
};

export function Figure({ src, alt, caption, captionHi, number }: FigureProps) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-gray-400">
        {number && (
          <span className="mr-2 font-semibold text-orange-400">
            Fig. {number}
          </span>
        )}
        <span className="text-gray-300">{caption}</span>
        {captionHi && (
          <span className="mt-1 block text-gray-500" lang="hi">
            {captionHi}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function FigurePlaceholder({
  caption,
  captionHi,
  number,
  promptHint,
}: {
  caption: string;
  captionHi?: string;
  number?: string;
  promptHint?: string;
}) {
  return (
    <figure className="my-10">
      <div className="flex aspect-[16/9] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700 bg-gray-900/50 p-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
          Image coming soon
        </div>
        <div className="mt-3 max-w-md text-sm text-gray-400">{caption}</div>
        {promptHint && (
          <div className="mt-4 max-w-md rounded-md bg-gray-950 px-3 py-2 text-xs text-gray-500">
            Prompt: {promptHint}
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-gray-400">
        {number && (
          <span className="mr-2 font-semibold text-orange-400">
            Fig. {number}
          </span>
        )}
        <span className="text-gray-300">{caption}</span>
        {captionHi && (
          <span className="mt-1 block text-gray-500" lang="hi">
            {captionHi}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
