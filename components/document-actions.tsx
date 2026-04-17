"use client";

import { useMemo, useState } from "react";
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";

import { siteUrl } from "@/lib/site-url";

type ShareTarget =
  | {
      label: string;
      kind: "link";
      buildHref: (url: string, title: string, text: string) => string;
    }
  | {
      label: string;
      kind: "copy";
      buildCopyText: (url: string, title: string, text: string) => string;
    }
  | {
      label: string;
      kind: "system";
    };

type DocumentActionsProps = {
  title: string;
  text: string;
  pdfFilename: string;
  sharePath?: string;
  shareTitle?: string;
  className?: string;
  buttonLabel?: string;
  showSave?: boolean;
  showShare?: boolean;
};

type ShareNavigator = Navigator & {
  share?: (data: ShareData) => Promise<void>;
};

const shareTargets: ShareTarget[] = [
  {
    label: "X",
    kind: "link",
    buildHref: (url, title, text) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n${text}`)}&url=${encodeURIComponent(url)}`,
  },
  {
    label: "Facebook",
    kind: "link",
    buildHref: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "Messenger",
    kind: "link",
    buildHref: (url) => `fb-messenger://share/?link=${encodeURIComponent(url)}`,
  },
  {
    label: "WhatsApp",
    kind: "link",
    buildHref: (url, title, text) =>
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${text}\n${url}`)}`,
  },
  {
    label: "Telegram",
    kind: "link",
    buildHref: (url, title, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title}\n${text}`)}`,
  },
  {
    label: "E-post",
    kind: "link",
    buildHref: (url, title, text) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${text}\n\n${url}`)}`,
  },
  {
    label: "Kopiera text",
    kind: "copy",
    buildCopyText: (url, title, text) => `${title}\n\n${text}\n\n${url}`,
  },
  {
    label: "Systemmeny",
    kind: "system",
  },
];

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const paragraphs = text.replace(/\r\n/g, "\n").split("\n");
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }

    const words = paragraph.split(/\s+/);
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= maxWidth) {
        current = next;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }

    if (current) lines.push(current);
  }

  return lines;
}

async function buildPdfBlob(title: string, text: string, filename: string) {
  const pdf = await PDFDocument.create();
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pageWidth = 595;
  const pageHeight = 842;
  const marginX = 54;
  const marginTop = 56;
  const marginBottom = 58;
  const bodySize = 11.5;
  const lineHeight = 16;
  const maxWidth = pageWidth - marginX * 2;

  let page = pdf.addPage([pageWidth, pageHeight]);
  let cursorY = pageHeight - marginTop;

  const addPage = () => {
    page = pdf.addPage([pageWidth, pageHeight]);
    cursorY = pageHeight - marginTop;
  };

  const ensureSpace = (needed = lineHeight) => {
    if (cursorY - needed < marginBottom) {
      addPage();
    }
  };

  page.drawText(title, {
    x: marginX,
    y: cursorY,
    font: fontBold,
    size: 20,
    color: rgb(0.11, 0.16, 0.17),
  });
  cursorY -= 30;

  page.drawText("Skapad för delning och intern ordning", {
    x: marginX,
    y: cursorY,
    font: fontRegular,
    size: 9.5,
    color: rgb(0.37, 0.42, 0.41),
  });
  cursorY -= 22;

  for (const paragraph of text.replace(/\r\n/g, "\n").split("\n")) {
    if (!paragraph.trim()) {
      cursorY -= 6;
      continue;
    }

    const lines = wrapText(paragraph, fontRegular, bodySize, maxWidth);
    for (const line of lines) {
      ensureSpace();
      page.drawText(line, {
        x: marginX,
        y: cursorY,
        font: fontRegular,
        size: bodySize,
        color: rgb(0.12, 0.17, 0.18),
      });
      cursorY -= lineHeight;
    }

    cursorY -= 6;
  }

  const footer = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  const footerText = `${title} • ${footer}`;
  ensureSpace();
  page.drawText(footerText, {
    x: marginX,
    y: marginBottom - 18,
    font: fontRegular,
    size: 8.5,
    color: rgb(0.43, 0.48, 0.47),
  });

  const bytes = await pdf.save();
  return new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function DocumentActions({
  title,
  text,
  pdfFilename,
  sharePath = "/",
  shareTitle,
  className = "",
  buttonLabel = "Beslutshandling",
  showSave = true,
  showShare = true,
}: DocumentActionsProps) {
  const [open, setOpen] = useState(false);
  const [saveLabel, setSaveLabel] = useState("Spara PDF");
  const [shareLabel, setShareLabel] = useState("Dela");
  const shareUrl = useMemo(() => siteUrl(sharePath), [sharePath]);
  const heading = shareTitle ?? title;
  const summary = text.length > 160 ? `${text.slice(0, 157)}...` : text;

  async function handleSavePdf() {
    if (!text) return;

    setSaveLabel("Sparar...");

    try {
      const blob = await buildPdfBlob(title, text, pdfFilename);
      downloadBlob(blob, pdfFilename);
      setSaveLabel("PDF sparad");
    } catch {
      setSaveLabel("Misslyckades");
    } finally {
      window.setTimeout(() => setSaveLabel("Spara PDF"), 1800);
    }
  }

  async function handleShareTarget(target: ShareTarget) {
    const nav = window.navigator as ShareNavigator;

    if (target.kind === "system") {
      if (typeof nav.share === "function") {
        try {
          await nav.share({
            title: heading,
            text: summary,
            url: shareUrl,
          });
          setShareLabel("Delat");
        } catch {
          await nav.clipboard.writeText(`${heading}\n\n${summary}\n\n${shareUrl}`);
          setShareLabel("Kopierat");
        }
      } else {
        await nav.clipboard.writeText(`${heading}\n\n${summary}\n\n${shareUrl}`);
        setShareLabel("Kopierat");
      }

      window.setTimeout(() => setShareLabel("Dela"), 1800);
      return;
    }

    if (target.kind === "copy") {
      await nav.clipboard.writeText(target.buildCopyText(shareUrl, heading, summary));
      setShareLabel("Kopierat");
      window.setTimeout(() => setShareLabel("Dela"), 1800);
      return;
    }

    window.open(target.buildHref(shareUrl, heading, summary), "_blank", "noopener,noreferrer");
    setShareLabel("Delat");
    window.setTimeout(() => setShareLabel("Dela"), 1800);
  }

  return (
    <div className={`rounded-[1.1rem] border border-steel/15 bg-white/82 p-3 shadow-slip ${className}`.trim()}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink/64">{buttonLabel}</p>
          <p className="mt-1 text-xs leading-5 text-ink/68">Diskret spara- och delningsrad för dokumentet.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {showSave ? (
            <button
              type="button"
              onClick={() => void handleSavePdf()}
              disabled={!text}
              className="tap-target inline-flex min-h-10 items-center rounded-full border border-steel/20 bg-paper px-4 py-2 text-xs font-medium text-ink transition hover:border-steel/45 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saveLabel}
            </button>
          ) : null}
          {showShare ? (
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              disabled={!text}
              className="tap-target inline-flex min-h-10 items-center rounded-full border border-[#c8102e] bg-[#c8102e] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#ad0d27] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {shareLabel}
            </button>
          ) : null}
        </div>
      </div>

      {showShare && open && text ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {shareTargets.map((target) => (
            <button
              key={target.label}
              type="button"
              onClick={() => void handleShareTarget(target)}
              className="tap-target rounded-full border border-steel/15 bg-white/90 px-3 py-2 text-left text-[11px] font-medium text-ink transition hover:border-steel/35 hover:bg-white"
            >
              {target.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
