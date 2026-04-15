"use client";

import { useState } from "react";

type ReleaseShareButtonProps = {
  title: string;
  url: string;
};

export function ReleaseShareButton({ title, url }: ReleaseShareButtonProps) {
  const [label, setLabel] = useState("Dela release");
  const [hint, setHint] = useState("Dela via systemet eller kopiera länken.");

  async function handleShare() {
    if (typeof navigator === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Lyssna på ${title} av Elektrisk Revy.`,
          url,
        });
        setLabel("Delat");
        setHint("Delat via enhetens delningsruta.");
        window.setTimeout(() => {
          setLabel("Dela release");
          setHint("Dela via systemet eller kopiera länken.");
        }, 1800);
        return;
      } catch {
        // Fall back to copy.
      }
    }

    const copyText = `${title}\n${url}`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(copyText);
      } else {
        throw new Error("Clipboard unavailable");
      }
      setLabel("Länk kopierad");
      setHint("Länken finns nu i urklippet.");
      window.setTimeout(() => {
        setLabel("Dela release");
        setHint("Dela via systemet eller kopiera länken.");
      }, 1800);
    } catch {
      window.prompt("Kopiera länken till releasen", copyText);
      setLabel("Kopiera manuellt");
      setHint("Klistra in länken där du vill dela den.");
      window.setTimeout(() => {
        setLabel("Dela release");
        setHint("Dela via systemet eller kopiera länken.");
      }, 2200);
    }
  }

  return (
    <span className="inline-flex flex-col gap-2">
      <button
        type="button"
        onClick={handleShare}
        aria-label={`Dela ${title}`}
        className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
        title={hint}
      >
        {label}
      </button>
      <span className="text-xs leading-5 text-ink/58">{hint}</span>
    </span>
  );
}
