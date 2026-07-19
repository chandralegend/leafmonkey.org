/**
 * Decorative botanical layer for the hero. Tropical leaves rise from the bottom
 * edge — denser at the corners, sparse in the middle so they never crowd the
 * headline — bridging the warm-sand hero into the green marquee below.
 * Pure inline SVG, no external images, respects the palette.
 */

// A single leaf blade, tip up, base at the origin (0,0), ~196 tall.
const LEAF = "M0 0 C 30 -46 22 -140 0 -196 C -22 -140 -30 -46 0 0 Z";
const RIB = "M0 -8 L0 -184";

type Leaf = { deg: number; s: number; fill: string; op: number; rib?: boolean };
type Cluster = { x: number; y: number; leaves: Leaf[] };

const CANOPY = "var(--canopy)";
const DEEP = "var(--canopy-deep)";
const BARK = "var(--bark)";
const GOLD = "var(--gold)";

const CLUSTERS: Cluster[] = [
  // bottom-left — the fullest cluster
  {
    x: 95,
    y: 415,
    leaves: [
      { deg: -34, s: 0.82, fill: GOLD, op: 0.13 },
      { deg: -12, s: 1.18, fill: CANOPY, op: 0.17, rib: true },
      { deg: 12, s: 0.98, fill: BARK, op: 0.14 },
      { deg: 34, s: 1.08, fill: DEEP, op: 0.18, rib: true },
      { deg: 56, s: 0.82, fill: CANOPY, op: 0.12 },
      { deg: 76, s: 0.66, fill: CANOPY, op: 0.1 },
    ],
  },
  {
    x: 255,
    y: 420,
    leaves: [
      { deg: 6, s: 0.62, fill: DEEP, op: 0.12 },
      { deg: 26, s: 0.82, fill: CANOPY, op: 0.13, rib: true },
      { deg: 48, s: 0.6, fill: BARK, op: 0.11 },
    ],
  },
  // sparse middle — small and faint
  {
    x: 560,
    y: 438,
    leaves: [
      { deg: -12, s: 0.44, fill: BARK, op: 0.08 },
      { deg: 10, s: 0.52, fill: CANOPY, op: 0.09 },
    ],
  },
  {
    x: 905,
    y: 438,
    leaves: [
      { deg: 12, s: 0.44, fill: BARK, op: 0.08 },
      { deg: -10, s: 0.52, fill: CANOPY, op: 0.09 },
    ],
  },
  {
    x: 1195,
    y: 420,
    leaves: [
      { deg: -6, s: 0.62, fill: DEEP, op: 0.12 },
      { deg: -26, s: 0.82, fill: CANOPY, op: 0.13, rib: true },
      { deg: -48, s: 0.6, fill: BARK, op: 0.11 },
    ],
  },
  // bottom-right — mirrors the left cluster
  {
    x: 1350,
    y: 415,
    leaves: [
      { deg: 34, s: 0.82, fill: GOLD, op: 0.13 },
      { deg: 12, s: 1.18, fill: CANOPY, op: 0.17, rib: true },
      { deg: -12, s: 0.98, fill: BARK, op: 0.14 },
      { deg: -34, s: 1.08, fill: DEEP, op: 0.18, rib: true },
      { deg: -56, s: 0.82, fill: CANOPY, op: 0.12 },
      { deg: -76, s: 0.66, fill: CANOPY, op: 0.1 },
    ],
  },
];

export default function HeroFoliage() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "min(52vh, 460px)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      {CLUSTERS.map((c, ci) => (
        <g key={ci} transform={`translate(${c.x} ${c.y})`}>
          {c.leaves.map((l, li) => (
            <g key={li} transform={`rotate(${l.deg}) scale(${l.s})`}>
              <path d={LEAF} fill={l.fill} fillOpacity={l.op} />
              {l.rib && (
                <path
                  d={RIB}
                  fill="none"
                  stroke={DEEP}
                  strokeOpacity={Math.min(l.op * 1.5, 0.3)}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              )}
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
