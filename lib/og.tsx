import { SITE_NAME, SITE_URL } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const displayUrl = SITE_URL.replace(/^https?:\/\//, "");

/**
 * Branded Open Graph card (1200×630). Uses the palette + system fonts (no
 * network font fetch, so it stays reliable at build time). Every container with
 * multiple children sets display:flex per Satori's requirements.
 */
export function ogCard({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #1C2E22 0%, #20160A 100%)",
        color: "#F2ECDD",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      {/* top row: wordmark + eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              background: "#B8863B",
              marginRight: 16,
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>
            {SITE_NAME}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#E8C889",
            textTransform: "uppercase",
            letterSpacing: 4,
            fontSize: 22,
          }}
        >
          {eyebrow}
        </div>
      </div>

      {/* title */}
      <div
        style={{
          display: "flex",
          fontSize: title.length > 48 ? 64 : 82,
          lineHeight: 1.05,
          fontWeight: 600,
          maxWidth: 1000,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>

      {/* footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          fontSize: 24,
        }}
      >
        <div style={{ display: "flex", color: "#B8863B" }}>{footer}</div>
        <div style={{ display: "flex", color: "rgba(242,236,221,0.55)" }}>{displayUrl}</div>
      </div>
    </div>
  );
}
