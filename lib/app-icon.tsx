import { ImageResponse } from "next/og";

type AppIconOptions = {
  size: number;
  apple?: boolean;
};

export function createAppIcon({ size, apple = false }: AppIconOptions) {
  const inset = Math.round(size * 0.125);
  const cardRadius = Math.round(size * 0.18);
  const sealSize = Math.round(size * 0.28);
  const lineHeight = Math.max(8, Math.round(size * 0.038));
  const lineGap = Math.max(12, Math.round(size * 0.08));

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: apple
            ? "linear-gradient(180deg, #f8fbf8 0%, #edf3ee 100%)"
            : "linear-gradient(180deg, #f7f4ee 0%, #e9eeef 100%)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: size - inset * 2,
            height: size - inset * 2,
            borderRadius: cardRadius,
            border: "2px solid rgba(97,115,119,0.25)",
            background: "#fffdf9",
            overflow: "hidden",
            boxShadow: "0 18px 44px rgba(29,42,45,0.12)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: Math.round(size * 0.16),
              top: Math.round(size * 0.15),
              width: Math.round(size * 0.42),
              height: Math.round(size * 0.54),
              borderRadius: Math.round(size * 0.08),
              background: "#ffffff",
              border: "2px solid #617377",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: Math.round(size * 0.29),
              top: Math.round(size * 0.24),
              width: Math.round(size * 0.18),
              height: lineHeight,
              borderRadius: 999,
              background: "#617377",
              opacity: 0.78,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: Math.round(size * 0.29),
              top: Math.round(size * 0.24) + lineGap,
              width: Math.round(size * 0.13),
              height: lineHeight,
              borderRadius: 999,
              background: "#617377",
              opacity: 0.55,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: Math.round(size * 0.29),
              top: Math.round(size * 0.24) + lineGap * 2,
              width: Math.round(size * 0.15),
              height: lineHeight,
              borderRadius: 999,
              background: "#617377",
              opacity: 0.42,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: Math.round(size * 0.14),
              bottom: Math.round(size * 0.14),
              width: sealSize,
              height: sealSize,
              borderRadius: 999,
              background: "#1d2a2d",
              border: "2px solid rgba(255,255,255,0.16)",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                width: Math.round(sealSize * 0.18),
                height: Math.round(sealSize * 0.18),
                borderRadius: 999,
                background: "#f7f4ee",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: Math.round(size * 0.17),
              bottom: Math.round(size * 0.11),
              width: Math.round(sealSize * 0.42),
              height: Math.round(size * 0.038),
              borderRadius: 999,
              background: "#9e5440",
            }}
          />
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
