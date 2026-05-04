import { notFound } from "next/navigation";
import { ChapterShell } from "@/components/learn/ChapterShell";
import { getChapter } from "@/lib/learn/chapters";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const en = (
    <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/40 p-8">
      <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
        Chapter coming soon
      </div>
      <h2 className="mt-2 text-xl font-bold text-gray-100">
        We&rsquo;re still writing this one.
      </h2>
      <p className="mt-3 text-gray-400">{chapter.summary}</p>
      <p className="mt-4 text-sm text-gray-500">
        The earlier chapters lay the groundwork for this one. If you
        haven&rsquo;t read them yet, start from the beginning.
      </p>
    </div>
  );

  const hi = (
    <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/40 p-8">
      <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
        अध्याय शीघ्र आ रहा है
      </div>
      <h2 className="mt-2 text-xl font-bold text-gray-100">
        यह अध्याय अभी लिखा जा रहा है।
      </h2>
      <p className="mt-3 text-gray-400">{chapter.summaryHi}</p>
      <p className="mt-4 text-sm text-gray-500">
        पिछले अध्याय इसकी पृष्ठभूमि तैयार करते हैं। यदि आपने उन्हें नहीं पढ़ा,
        तो आरम्भ से प्रारम्भ कीजिए।
      </p>
    </div>
  );

  return <ChapterShell chapter={chapter} en={en} hi={hi} />;
}
