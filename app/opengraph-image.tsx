import { ImageResponse } from "next/og";
import { profile } from "@/lib/site";

export const alt = `${profile.name} — Data Analyst · SQL, Python, AI`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview: the positioning, the evidence, and nothing decorative. */
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
          background: "#070b14",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#e9eefb",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9cc4ff",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              YB
            </div>
            <div style={{ fontSize: 26, color: "#aebbd4" }}>{profile.name}</div>
          </div>

          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
            Data. AI.{" "}
            <span style={{ color: "#5b9bff", marginLeft: 20 }}>Engineering.</span>
          </div>

          <div style={{ display: "flex", fontSize: 30, color: "#aebbd4", maxWidth: 940, lineHeight: 1.4 }}>
            Data analyst · three and a half years in Unit 8200 · advanced SQL and Python · public,
            reproducible analysis
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 56, fontSize: 24, lineHeight: 1, color: "#8498b8" }}>
          <div style={{ display: "flex" }}>49,941 crashes analysed</div>
          <div style={{ display: "flex" }}>2 h → 5 min pipeline</div>
          <div style={{ display: "flex" }}>Aman Award, 2025 (team)</div>
        </div>
      </div>
    ),
    size,
  );
}
