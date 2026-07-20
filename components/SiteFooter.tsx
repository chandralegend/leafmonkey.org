import type { Settings } from "@/lib/content";

export default function SiteFooter({
  settings,
  heading,
  glow = true,
}: {
  settings: Settings | null;
  heading?: React.ReactNode;
  glow?: boolean;
}) {
  const email = settings?.email ?? "hello@leafmonkey.org";
  const url = settings?.url ?? "https://leafmonkey.org";
  const metaLines =
    settings?.metaLines && settings.metaLines.length
      ? settings.metaLines
      : ["COLOMBO, SRI LANKA", "DIGITAL · AI-NATIVE · RESEARCH", "ISPASS · MDPI · IEEE"];
  const tagline = (settings?.tagline ?? "Native to the canopy. Built for the wild.")
    .toUpperCase()
    .replace(/\.$/, "");
  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <footer
      style={{
        background: "var(--canopy-deep)",
        color: "var(--sand)",
        padding: heading ? "120px 40px 44px" : "100px 40px 44px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {glow && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90vw",
            height: "60vw",
            maxHeight: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(184,134,59,0.13),transparent 65%)",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ maxWidth: 1300, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {heading && (
          <h2
            className="serif reveal"
            style={{
              fontWeight: 300,
              fontSize: "clamp(40px,6.5vw,104px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: 48,
            }}
          >
            {heading}
          </h2>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
            alignItems: "flex-end",
            borderTop: "1px solid rgba(242,236,221,0.15)",
            paddingTop: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <a
              href={`mailto:${email}`}
              className="serif mag"
              style={{
                fontSize: "clamp(22px,3vw,38px)",
                fontWeight: 300,
                color: "var(--sand)",
                transition: "transform .35s cubic-bezier(.19,1,.22,1)",
                transformOrigin: "left",
                display: "inline-block",
              }}
            >
              {email}
            </a>
            <a
              href={url}
              className="mono navlink"
              style={{
                fontSize: 13,
                letterSpacing: "0.1em",
                color: "rgba(242,236,221,0.6)",
                width: "fit-content",
              }}
            >
              {displayUrl} ↗
            </a>
          </div>
          <div
            className="mono"
            style={{
              textAlign: "right",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "rgba(242,236,221,0.5)",
              lineHeight: 2,
            }}
          >
            {metaLines.map((l, i) => (
              <span key={i}>
                {l}
                {i < metaLines.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="serif" style={{ fontWeight: 500, fontSize: 16 }}>
              Leaf Monkey
            </span>
            <span
              className="mono"
              style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}
            >
              Labs
            </span>
          </div>
          <p
            className="mono"
            style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(242,236,221,0.3)" }}
          >
            © 2026 — {tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
