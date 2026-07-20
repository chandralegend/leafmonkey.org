import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getFeaturedPost, getSettings } from "@/lib/content";
import Media from "@/components/Media";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import InnerFx from "@/components/InnerFx";

const INSIGHTS_DESC =
  "Field notes on research-grade engineering, AI-native product design, and building software that's proudly, specifically Sri Lankan.";

export const metadata: Metadata = {
  title: "Insights",
  description: INSIGHTS_DESC,
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    url: "/insights",
    title: "Insights — Leaf Monkey Labs",
    description: INSIGHTS_DESC,
  },
  twitter: { card: "summary_large_image", title: "Insights — Leaf Monkey Labs", description: INSIGHTS_DESC },
};

export default async function InsightsPage() {
  const [posts, featured, settings] = await Promise.all([
    getPosts(),
    getFeaturedPost(),
    getSettings(),
  ]);
  const grid = posts.filter((p) => p.slug !== featured?.slug);
  const email = settings?.email ?? "hello@leafmonkey.org";

  return (
    <>
      <SiteNav active="insights" />
      <InnerFx />

      {/* HERO */}
      <section style={{ padding: "180px 40px 70px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 28 }}>Insights</p>
        <h1 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(48px,8vw,128px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "var(--canopy)", marginBottom: 32 }}>
          Field notes from<br />the <span className="pf" style={{ color: "var(--gold)" }}>canopy.</span>
        </h1>
        <p className="reveal" style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: "var(--grey)", maxWidth: 520 }}>
          On research-grade engineering, AI-native product design, and building software that&apos;s proudly, specifically Sri Lankan.
        </p>
      </section>

      {/* FEATURED */}
      {featured && (
        <section style={{ padding: "0 40px 90px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <Link href={`/insights/${featured.slug}`} className="post reveal" style={{ display: "block" }}>
            <div className="feat" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "clamp(28px,4vw,56px)", alignItems: "center", background: "var(--canopy)", color: "var(--sand)", borderRadius: 22, overflow: "hidden" }}>
              <div style={{ position: "relative", minHeight: 360, overflow: "hidden" }}>
                <div className="post-img" style={{ position: "absolute", inset: 0, transition: "transform .7s cubic-bezier(.19,1,.22,1)" }}>
                  <Media src={featured.entry.cover} alt={featured.entry.title} label="Featured cover" dark />
                </div>
              </div>
              <div style={{ padding: "clamp(32px,4vw,56px) clamp(32px,4vw,56px) clamp(32px,4vw,56px) 0" }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>Featured · {featured.entry.category}</div>
                <h2 className="serif post-title" style={{ fontWeight: 400, fontSize: "clamp(28px,3.4vw,50px)", lineHeight: 1.05, marginBottom: 20 }}>{featured.entry.title}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(242,236,221,0.7)", marginBottom: 28, maxWidth: 460 }}>{featured.entry.excerpt}</p>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(242,236,221,0.55)" }}>{featured.entry.readTime}</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* GRID */}
      <section style={{ padding: "0 40px 120px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <div className="posts" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "36px 28px" }}>
          {grid.map((p) => (
            <Link key={p.slug} href={`/insights/${p.slug}`} className="post reveal" style={{ display: "block" }}>
              <div style={{ position: "relative", height: 220, borderRadius: 16, overflow: "hidden", background: "var(--sand-3)", marginBottom: 22 }}>
                <div className="post-img" style={{ position: "absolute", inset: 0, transition: "transform .7s cubic-bezier(.19,1,.22,1)" }}>
                  <Media src={p.entry.cover} alt={p.entry.title} label={`Cover — ${p.entry.category}`} />
                </div>
              </div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{p.entry.category} · {p.entry.readTime.replace(/ read$/, "")}</div>
              <h3 className="serif post-title" style={{ fontWeight: 400, fontSize: 26, lineHeight: 1.15, marginBottom: 12 }}>{p.entry.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--grey)" }}>{p.entry.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: "0 40px 120px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <div className="reveal" style={{ background: "var(--floor)", color: "var(--sand)", borderRadius: 22, padding: "clamp(40px,6vw,88px)", textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>The dispatch</div>
          <h2 className="serif" style={{ fontWeight: 300, fontSize: "clamp(28px,4vw,56px)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>Notes from the studio,<br />occasionally.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(242,236,221,0.6)", maxWidth: 440, margin: "0 auto 32px" }}>Research, product thinking, and the odd field note. No noise.</p>
          <a href={`mailto:${email}?subject=Subscribe%20to%20the%20dispatch`} className="mono mag" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--floor)", background: "var(--gold)", padding: "18px 32px", borderRadius: 100, transition: "transform .3s cubic-bezier(.19,1,.22,1)" }}>Subscribe ↗</a>
        </div>
      </section>

      <SiteFooter settings={settings} glow={false} />
    </>
  );
}
