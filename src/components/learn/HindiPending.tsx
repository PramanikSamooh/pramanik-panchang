import Link from "next/link";

export function HindiPending() {
  return (
    <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/40 p-8">
      <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
        हिन्दी अनुवाद शीघ्र आ रहा है
      </div>
      <h2 className="mt-2 text-xl font-bold text-gray-100">
        यह अध्याय अभी हिन्दी में लिखा जा रहा है।
      </h2>
      <p className="mt-3 text-gray-300">
        अंग्रेज़ी संस्करण पूर्ण रूप से उपलब्ध है। हिन्दी संस्करण तैयार होते ही
        इस पृष्ठ पर आ जायेगा।
      </p>
      <p className="mt-4 text-sm text-gray-500">
        ऊपर दाहिनी ओर के टॉगल से{" "}
        <Link href="#" className="text-orange-400 underline">
          English
        </Link>{" "}
        पर स्विच कर के अंग्रेज़ी संस्करण पढ़ सकते हैं।
      </p>
    </div>
  );
}
