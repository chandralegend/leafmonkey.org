import type { Metadata } from "next";
import Image from "next/image";
import { getTeam, getSettings } from "@/lib/content";
import Media from "@/components/Media";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import InnerFx from "@/components/InnerFx";

const ABOUT_DESC =
  "A research-grounded software studio built in Sri Lanka — at home across legacy systems and greenfield AI, like the endemic purple-faced langur in the canopy.";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_DESC,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About — Leaf Monkey Labs",
    description: ABOUT_DESC,
  },
  twitter: { card: "summary_large_image", title: "About — Leaf Monkey Labs", description: ABOUT_DESC },
};

const VALUES = [
  { n: "01", title: "Direct and unhedged", body: "We say what we think an idea needs — not what's comfortable to hear." },
  { n: "02", title: "Grounded in place", body: "Proudly Sri Lankan — not generically “global tech.”" },
  { n: "03", title: "Research-literate", body: "We can defend our engineering choices to a reviewer, not just a client." },
];

export default async function AboutPage() {
  const [team, settings] = await Promise.all([getTeam(), getSettings()]);

  return (
    <>
      <SiteNav active="about" />
      <InnerFx />

      {/* HERO */}
      <section style={{ padding: "180px 40px 90px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 28 }}>About the studio</p>
        <h1 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(44px,7vw,120px)", lineHeight: 0.98, letterSpacing: "-0.04em", color: "var(--canopy)", marginBottom: 40, maxWidth: "16ch" }}>
          A research-grounded studio, built in <span className="pf" style={{ color: "var(--gold)" }}>Sri Lanka.</span>
        </h1>
        <div className="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)" }}>
          <p className="reveal" style={{ fontSize: "clamp(16px,1.6vw,21px)", lineHeight: 1.7, color: "var(--grey)" }}>
            Leaf Monkey Labs helps founders bring ideas to life — across digital transformation, AI-native product development, and applied AI research.
          </p>
          <p className="reveal" style={{ fontSize: "clamp(16px,1.6vw,21px)", lineHeight: 1.7, color: "var(--grey)" }}>
            We move as fluidly between a client&apos;s legacy systems and a greenfield AI product as the endemic purple-faced langur moves between the branches of a rainforest canopy: at home in the whole ecosystem.
          </p>
        </div>
      </section>

      {/* BRAND / LANGUR */}
      <section style={{ position: "relative", color: "var(--sand)", padding: "170px 40px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1764208637252-4cb59a64a674?w=1800&q=80&auto=format&fit=crop" alt="Forest canopy" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg,rgba(28,46,34,0.82),rgba(20,15,8,0.8))", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2, pointerEvents: "none" }}>
          <div className="reveal" style={{ fontSize: 48, marginBottom: 28 }}>🍃</div>
          <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-soft)", marginBottom: 28 }}>Name &amp; meaning</p>
          <p className="serif reveal" style={{ fontWeight: 300, fontStyle: "italic", fontSize: "clamp(22px,3vw,42px)", lineHeight: 1.4 }}>
            &ldquo;Leaf Monkey&rdquo; grounds the studio in a real, endemic Sri Lankan species — signalling locality, agility, and a sense of humour. <span className="pf" style={{ color: "var(--gold-soft)" }}>&ldquo;Labs&rdquo; signals the research seriousness underneath.</span>
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "150px 40px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 70, flexWrap: "wrap", gap: 20 }}>
          <h2 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(32px,4.5vw,64px)", lineHeight: 1, letterSpacing: "-0.03em" }}>How we show up.</h2>
          <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bark)" }}>Our voice</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(45,74,52,0.12)", border: "1px solid rgba(45,74,52,0.12)", borderRadius: 16, overflow: "hidden" }}>
          {VALUES.map((v) => (
            <div key={v.n} className="reveal" style={{ background: "var(--sand)", padding: "48px 40px" }}>
              <div className="serif" style={{ fontSize: 44, fontWeight: 300, color: "var(--gold)", marginBottom: 20 }}>{v.n}</div>
              <h3 className="serif" style={{ fontWeight: 400, fontSize: 24, marginBottom: 14 }}>{v.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--grey)" }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE TROOP */}
      <section style={{ background: "var(--canopy)", color: "var(--sand)", padding: "150px 40px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>The troop</p>
              <h2 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(32px,4.5vw,64px)", lineHeight: 1, letterSpacing: "-0.03em" }}>Small, senior,<br />and hands-on.</h2>
            </div>
            <p className="reveal" style={{ maxWidth: 320, fontSize: 15, lineHeight: 1.7, color: "rgba(242,236,221,0.55)" }}>Engineers and researchers who move between the branches — and stay watchful of the terrain.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {team.map((m) => (
              <div key={m.slug} className="reveal">
                <div style={{ aspectRatio: "1 / 1", borderRadius: 16, overflow: "hidden", background: "rgba(242,236,221,0.06)", marginBottom: 18, position: "relative" }}>
                  <Media src={m.entry.photo} alt={m.entry.name} label="Team member" dark />
                </div>
                <div className="serif" style={{ fontSize: 20 }}>{m.entry.name}</div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", marginTop: 6 }}>{m.entry.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter settings={settings} glow={false} />
    </>
  );
}
