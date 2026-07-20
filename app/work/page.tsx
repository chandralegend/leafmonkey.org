import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, getSettings } from "@/lib/content";
import { themeTokens } from "@/lib/productTheme";
import Media from "@/components/Media";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import InnerFx from "@/components/InnerFx";

const WORK_DESC =
  "Research-grade products we've built and shipped, plus the transformation and research engagements that don't fit in an app store.";

export const metadata: Metadata = {
  title: "Work",
  description: WORK_DESC,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
    title: "Work — Leaf Monkey Labs",
    description: WORK_DESC,
  },
  twitter: { card: "summary_large_image", title: "Work — Leaf Monkey Labs", description: WORK_DESC },
};

const ENGAGEMENTS = [
  { n: "01", title: "Digital Transformation", desc: "Process automation, data platforms, and internal tooling for established businesses.", tag: "Ongoing" },
  { n: "02", title: "Applied AI Research", desc: "Research feeding directly into products — submitted to ISPASS, MDPI, and IEEE.", tag: "Published" },
  { n: "03", title: "Founder Support", desc: "Scoping, architecture, and hands-on build partnership from sketch to shipped.", tag: "Early-stage" },
];

export default async function WorkPage() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  const featured = products.find((p) => p.entry.featured) ?? products[0];
  const rest = products.filter((p) => p.slug !== featured?.slug);
  const filters = Array.from(new Set(products.map((p) => p.entry.category)));

  return (
    <>
      <SiteNav active="work" />
      <InnerFx />

      <section style={{ padding: "180px 40px 80px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 28 }}>Selected work</p>
        <h1 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(48px,8vw,128px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "var(--canopy)", marginBottom: 36 }}>
          Products in the <span className="pf" style={{ color: "var(--gold)" }}>wild.</span>
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
          <p className="reveal" style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: "var(--grey)", maxWidth: 480 }}>
            Research-grade products we&apos;ve built and shipped — plus the transformation and research engagements that don&apos;t fit in an app store.
          </p>
          <div className="mono reveal" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--canopy)", color: "var(--sand)", padding: "8px 16px", borderRadius: 100 }}>All</span>
            {filters.map((f) => (
              <span key={f} style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(45,74,52,0.25)", color: "var(--grey)", padding: "8px 16px", borderRadius: 100 }}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 40px 40px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <div className="big-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {featured && (() => {
            const t = themeTokens(featured.entry.theme);
            return (
              <Link href={`/work/${featured.slug}`} className="projcard reveal" style={{ gridColumn: "1 / -1", display: "block", background: t.bg, color: t.text, borderRadius: 22, overflow: "hidden" }}>
                <div className="big-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 0, alignItems: "stretch" }}>
                  <div style={{ position: "relative", minHeight: 340, overflow: "hidden" }}>
                    <div className="proj-img" style={{ position: "absolute", inset: 0, transition: "transform .7s cubic-bezier(.19,1,.22,1)" }}>
                      <Media src={featured.entry.cover} alt={`${featured.entry.name} product shot`} label={`${featured.entry.name} — product shot`} dark={featured.entry.theme !== "gold"} />
                    </div>
                  </div>
                  <div style={{ padding: "clamp(32px,4vw,56px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: t.tag }}>{featured.entry.category} · Featured case study</span>
                    <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(40px,5vw,76px)", lineHeight: 0.95, margin: "14px 0 18px" }}>{featured.entry.name}</h2>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: t.muted, marginBottom: 28, maxWidth: 420 }}>{featured.entry.description}</p>
                    <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: t.text }}>Read case study <span className="proj-arrow" style={{ transition: "transform .4s cubic-bezier(.19,1,.22,1)" }}>↗</span></span>
                  </div>
                </div>
              </Link>
            );
          })()}

          {rest.map((p) => {
            const t = themeTokens(p.entry.theme);
            return (
              <Link key={p.slug} href={`/work/${p.slug}`} className="projcard reveal" style={{ display: "block", background: t.bg, color: t.text, borderRadius: 22, overflow: "hidden" }}>
                <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
                  <div className="proj-img" style={{ position: "absolute", inset: 0, transition: "transform .7s cubic-bezier(.19,1,.22,1)" }}>
                    <Media src={p.entry.cover} alt={`${p.entry.name} product shot`} label={`${p.entry.name} — product shot`} dark={p.entry.theme !== "gold"} />
                  </div>
                </div>
                <div style={{ padding: "36px 32px 40px" }}>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: t.tag }}>{p.entry.category}</span>
                  <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,3.4vw,48px)", lineHeight: 1, margin: "12px 0 14px" }}>{p.entry.name}</h2>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: t.muted, marginBottom: 24 }}>{p.entry.description}</p>
                  <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: t.text }}>Read case study <span className="proj-arrow" style={{ transition: "transform .4s cubic-bezier(.19,1,.22,1)" }}>↗</span></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section style={{ padding: "120px 40px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <h2 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(30px,4vw,56px)", lineHeight: 1, letterSpacing: "-0.02em" }}>Beyond the app store.</h2>
          <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bark)" }}>Client &amp; research engagements</p>
        </div>
        <div style={{ borderTop: "1px solid rgba(45,74,52,0.15)" }}>
          {ENGAGEMENTS.map((e) => (
            <div key={e.n} className="reveal" style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr auto", gap: 24, alignItems: "center", padding: "32px 4px", borderBottom: "1px solid rgba(45,74,52,0.15)" }}>
              <span className="mono" style={{ fontSize: 12, color: "var(--gold)" }}>{e.n}</span>
              <h3 className="serif" style={{ fontWeight: 400, fontSize: "clamp(20px,2vw,28px)" }}>{e.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--grey)" }}>{e.desc}</p>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bark)" }}>{e.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter
        settings={settings}
        heading={<>Have something<br />worth building? <span className="pf" style={{ color: "var(--gold)" }}>Let&apos;s talk.</span></>}
      />
    </>
  );
}
