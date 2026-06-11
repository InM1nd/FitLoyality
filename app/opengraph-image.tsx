import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FitLoyalty — turn silent churn into saved revenue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f2ec",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#ff7403",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            🔥
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: "#1a1a1a" }}>
            FITLOYALTY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.0,
              color: "#1a1a1a",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Members don&apos;t quit
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.0, color: "#1a1a1a" }}>
              on a
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                lineHeight: 1.0,
                color: "#fff",
                background: "#ff7403",
                padding: "6px 28px",
                borderRadius: 16,
              }}
            >
              STREAK.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, color: "#6b6b6b" }}>
            The retention OS for boutique fitness studios
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#ff7403" }}>
            €2,340 saved /mo
          </div>
        </div>
      </div>
    ),
    size,
  );
}
