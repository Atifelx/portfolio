import { ImageResponse } from "next/og";

export const alt = "Atif Shaikh, Forward Deployed Engineer";
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
          background: "#ffffff",
          color: "#14161b",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              color: "#0f7a55",
              background: "#e7f3ee",
              border: "2px solid #b7dccb",
              borderRadius: 999,
              padding: "10px 26px",
            }}
          >
            <div style={{ width: 16, height: 16, background: "#0f7a55", borderRadius: 8, marginRight: 14 }} />
            Open to remote roles worldwide
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, lineHeight: 1, letterSpacing: -5 }}>Atif Shaikh</div>
          <div style={{ fontSize: 46, lineHeight: 1.15, marginTop: 24, maxWidth: 1000 }}>
            Forward Deployed Engineer. Full-stack developer who ships AI to production on the cloud.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#5b616e" }}>
          Working directly with enterprise customers · Remote with clients since 2019
        </div>
      </div>
    ),
    size
  );
}
