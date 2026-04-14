"use client";

import { useState } from "react";

type ReleaseShareButtonProps = {
  title: string;
  url: string;
};

export function ReleaseShareButton({ title, url }: ReleaseShareButtonProps) {
  const [label, setLabel] = useState("Dela release");

  async function handleShare() {
    if (typeof navigator === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Lyssna på ${title}.`,
          url,
        });
        return;
      } catch {
        // Fall back to copy.
      }
    }

    await navigator.clipboard.writeText(url);
    setLabel("Länk kopierad");
    window.setTimeout(() => setLabel("Dela release"), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Dela ${title}`}
      className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
    >
      {label}
    </button>
  );
}
