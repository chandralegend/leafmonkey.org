/** Green wipe-up intro shown briefly on first paint of the home page. */
export default function IntroOverlay() {
  return (
    <div
      aria-hidden
      id="intro"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--canopy)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
        animation: "wipeUp 1s cubic-bezier(.76,0,.24,1) 1.6s forwards",
      }}
    >
      <div style={{ fontSize: 48, animation: "floatUp .8s cubic-bezier(.19,1,.22,1) .2s both" }}>
        🐒
      </div>
      <div
        className="mono"
        style={{
          color: "var(--gold)",
          fontSize: 12,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          animation: "floatUp .8s cubic-bezier(.19,1,.22,1) .45s both",
          overflow: "hidden",
        }}
      >
        Leaf&nbsp;Monkey&nbsp;Labs
      </div>
      <div
        style={{
          width: 140,
          height: 1,
          background: "rgba(242,236,221,0.2)",
          position: "relative",
          overflow: "hidden",
          marginTop: 8,
          animation: "floatUp .8s .6s both",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--gold)",
            transformOrigin: "left",
            animation: "lineGrow 1.4s cubic-bezier(.76,0,.24,1) .7s forwards",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
