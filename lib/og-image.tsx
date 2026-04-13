import { ImageResponse } from "next/og";

type OgImageOptions = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  calm?: boolean;
};

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export const ogImageContentType = "image/png";

export function createOgImage({
  eyebrow,
  title,
  description,
  accent = "#9e5440",
  calm = false,
}: OgImageOptions) {
  const background = calm
    ? "linear-gradient(180deg, #f7faf7 0%, #edf4ef 100%)"
    : "linear-gradient(180deg, #f7f4ee 0%, #e9eeef 100%)";
  const surface = calm ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.72)";
  const border = calm ? "rgba(111,127,120,0.18)" : "rgba(97,115,119,0.18)";
  const ink = "#1d2a2d";
  const steel = calm ? "#5a6c66" : "#617377";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background,
          color: ink,
          padding: "44px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "32px",
            border: `1px solid ${border}`,
            background: surface,
            boxShadow: "0 24px 70px rgba(29,42,45,0.10)",
            padding: "42px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "810px" }}>
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  borderRadius: "999px",
                  border: `1px solid ${border}`,
                  background: "rgba(255,255,255,0.82)",
                  color: steel,
                  padding: "10px 16px",
                  fontSize: 18,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {eyebrow}
              </div>
              <div style={{ fontSize: 68, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.04em" }}>
                {title}
              </div>
              <div style={{ fontSize: 30, lineHeight: 1.35, color: steel, maxWidth: "860px" }}>
                {description}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: 178,
                height: 178,
                borderRadius: 34,
                border: `1px solid ${border}`,
                background: "#fffdf9",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 18,
                  borderRadius: 26,
                  border: `3px solid ${steel}`,
                  background: "#ffffff",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 46,
                  top: 46,
                  width: 58,
                  height: 8,
                  borderRadius: 999,
                  background: steel,
                  opacity: 0.75,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 46,
                  top: 68,
                  width: 42,
                  height: 8,
                  borderRadius: 999,
                  background: steel,
                  opacity: 0.52,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 28,
                  bottom: 28,
                  width: 64,
                  height: 64,
                  borderRadius: 999,
                  background: ink,
                  border: "2px solid rgba(255,255,255,0.18)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 53,
                  bottom: 58,
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#f7f4ee",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 46,
                  bottom: 36,
                  width: 28,
                  height: 10,
                  borderRadius: 999,
                  background: accent,
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: steel }}>
                Fiktiv bedömningsinstans
              </div>
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em" }}>
                Förnedringskassan
              </div>
            </div>
            <div
              style={{
                display: "flex",
                borderRadius: "999px",
                background: calm ? "rgba(232,241,234,0.95)" : "rgba(29,42,45,0.92)",
                color: calm ? ink : "#f7f4ee",
                padding: "12px 18px",
                fontSize: 18,
              }}
            >
              {calm
                ? "Tillfälligt undantag från ordinarie tonläge"
                : "Satirisk parodi. Inte en myndighet."}
            </div>
          </div>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
