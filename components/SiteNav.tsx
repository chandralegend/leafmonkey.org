import Link from "next/link";

type Key = "work" | "insights" | "about" | "contact";

const LINKS: { href: string; label: string; key: Key }[] = [
  { href: "/work", label: "Work", key: "work" },
  { href: "/insights", label: "Insights", key: "insights" },
  { href: "/about", label: "About", key: "about" },
  { href: "/#contact", label: "Contact", key: "contact" },
];

/** Solid, blurred nav used on the inner pages. */
export default function SiteNav({ active }: { active?: Key }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 180,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "22px 40px",
        background: "rgba(242,236,221,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(45,74,52,0.08)",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "baseline", gap: 8, color: "var(--canopy)" }}
      >
        <span className="serif" style={{ fontWeight: 500, fontSize: 17, letterSpacing: "-0.3px" }}>
          Leaf&nbsp;Monkey
        </span>
        <span
          className="mono"
          style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}
        >
          Labs
        </span>
      </Link>
      <div
        className="mono"
        id="navlinks"
        style={{
          display: "flex",
          gap: 28,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--grey)",
        }}
      >
        {LINKS.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            className="navlink"
            style={active === l.key ? { color: "var(--gold)" } : undefined}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
