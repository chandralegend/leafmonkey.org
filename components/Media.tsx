import Image from "next/image";

/**
 * Fills its (position:relative) parent. Renders a real image when `src` is set,
 * otherwise a tasteful placeholder that mirrors the design's image slots.
 */
export default function Media({
  src,
  alt,
  label,
  priority,
  dark,
}: {
  src?: string | null;
  alt: string;
  label?: string;
  priority?: boolean;
  dark?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 820px) 100vw, 1300px"
        style={{ objectFit: "cover" }}
      />
    );
  }
  return (
    <div
      aria-label={alt}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: dark
          ? "linear-gradient(135deg, rgba(242,236,221,0.06), rgba(242,236,221,0.02))"
          : "linear-gradient(135deg, #E4D9BF, #EDE4CF)",
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: dark ? "rgba(242,236,221,0.5)" : "rgba(92,75,60,0.55)",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        {label ?? "Image"}
      </span>
    </div>
  );
}
