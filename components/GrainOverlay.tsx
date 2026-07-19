const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: "-50%",
        zIndex: 9998,
        pointerEvents: "none",
        opacity: 0.045,
        mixBlendMode: "multiply",
        animation: "grain 8s steps(8) infinite",
        backgroundImage: `url("${GRAIN}")`,
      }}
    />
  );
}
