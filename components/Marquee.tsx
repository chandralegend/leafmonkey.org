/** Scrolling ticker of studio capabilities. */
export default function Marquee({ items }: { items: readonly string[] }) {
  const list = items.length ? items : ["Digital Transformation", "AI-Native Products", "Applied Research", "Founder Support"];
  const seq = [...list, ...list];
  return (
    <div
      style={{
        background: "var(--canopy)",
        color: "var(--sand)",
        padding: "22px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderTop: "1px solid rgba(184,134,59,0.2)",
      }}
    >
      <div style={{ display: "inline-flex", animation: "marquee 28s linear infinite" }}>
        <span
          className="serif"
          style={{ fontSize: 24, fontWeight: 300, display: "inline-flex", alignItems: "center" }}
        >
          {seq.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              {item}
              <span style={{ color: "var(--gold)", margin: "0 28px" }}>✦</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
