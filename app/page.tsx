import Link from "next/link";
import Image from "next/image";
import { getHome, getProducts, getSettings } from "@/lib/content";
import { themeTokens } from "@/lib/productTheme";
import Media from "@/components/Media";
import Marquee from "@/components/Marquee";
import IntroOverlay from "@/components/IntroOverlay";
import HomeFx from "@/components/HomeFx";

const STRATA = ["Emergent", "Canopy", "Understory", "Floor"];

export default async function HomePage() {
  const [home, products, settings] = await Promise.all([
    getHome(),
    getProducts(),
    getSettings(),
  ]);

  const email = settings?.email ?? "hello@leafmonkeylabs.com";
  const services = home?.services ?? [];
  const venues = home?.venues ?? [];
  const cases = products.slice(0, 3);

  return (
    <>
      <IntroOverlay />

      {/* scroll progress */}
      <div
        id="progress"
        style={{ position: "fixed", top: 0, left: 0, height: 2, background: "var(--gold)", zIndex: 200, width: "0%" }}
      />

      {/* depth meter */}
      <div
        id="depth"
        style={{
          position: "fixed",
          right: 32,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 18,
          mixBlendMode: "difference",
          opacity: 0,
          transition: "opacity .6s",
        }}
      >
        {STRATA.map((label, i) => (
          <div
            key={label}
            className="mono depth-item"
            data-i={i}
            style={{ display: "flex", alignItems: "center", gap: 12, color: "#888", transition: "color .4s" }}
          >
            <span style={{ fontSize: 10, letterSpacing: "0.1em" }}>{String(i).padStart(2, "0")}</span>
            <span style={{ width: 24, height: 1, background: "currentColor", transition: "width .4s" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* nav */}
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
        }}
      >
        <a href="#top" id="wordmark" style={{ display: "flex", alignItems: "baseline", gap: 8, color: "var(--canopy)" }}>
          <span className="serif" style={{ fontWeight: 500, fontSize: 17, letterSpacing: "-0.3px" }}>
            Leaf&nbsp;Monkey
          </span>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>
            Labs
          </span>
        </a>
        <div
          className="mono"
          id="navlinks"
          style={{ display: "flex", gap: 26, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--grey)" }}
        >
          <Link href="/work" className="navlink">Work</Link>
          <a href="#research" className="navlink">Research</a>
          <Link href="/insights" className="navlink">Insights</Link>
          <Link href="/about" className="navlink">About</Link>
          <a href="#contact" className="navlink">Contact</a>
        </div>
      </nav>

      {/* HERO — emergent layer */}
      <section
        id="top"
        data-stratum="0"
        data-navcolor="#2D4A34"
        style={{
          minHeight: "100svh",
          position: "relative",
          background: "radial-gradient(120% 90% at 75% 15%, #F7F1E2 0%, #EFE7D3 55%, #E8DEC6 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 40px 60px",
          overflow: "hidden",
        }}
      >
        <div
          id="sunGlow"
          style={{
            position: "absolute",
            top: "-10%",
            right: "5%",
            width: "60vw",
            height: "60vw",
            maxWidth: 760,
            maxHeight: 760,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,134,59,0.22) 0%, rgba(184,134,59,0.06) 45%, transparent 70%)",
            animation: "glowPulse 7s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "55vw",
            height: "55vw",
            maxWidth: 640,
            maxHeight: 640,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45,74,52,0.10) 0%, transparent 68%)",
            animation: "drift 22s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <canvas id="heroCanvas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1500, margin: "0 auto", width: "100%" }}>
          <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32 }}>
            {home?.heroEyebrow ?? "Est. Colombo, Sri Lanka · Software & Applied AI Research"}
          </p>

          <h1
            id="heroType"
            className="serif"
            style={{ fontWeight: 300, fontSize: "clamp(52px,10.5vw,190px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "var(--canopy)" }}
          >
            <span className="hl" style={{ display: "block" }}>{home?.heroLine1 ?? "Native to"}</span>
            <span className="hl" style={{ display: "block" }}>
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--bark)" }}>{home?.heroLine1Accent ?? "the canopy."}</em>
            </span>
            <span className="hl" data-p="1" style={{ display: "block", paddingLeft: "0.12em" }}>{home?.heroLine2 ?? "Built for"}</span>
            <span className="hl" data-p="1" style={{ display: "block", paddingLeft: "0.12em" }}>
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--gold)" }}>{home?.heroLine2Accent ?? "the wild."}</em>
            </span>
          </h1>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32, marginTop: 56 }}>
            <p style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: "var(--grey)", maxWidth: 440 }}>
              {home?.heroSubtitle}
            </p>
            <a
              href="#contact"
              className="mono mag"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--sand)",
                background: "var(--canopy)",
                padding: "20px 32px",
                borderRadius: 100,
                whiteSpace: "nowrap",
                transition: "transform .3s cubic-bezier(.19,1,.22,1)",
              }}
            >
              {home?.heroCta ?? "Start a project"} <span style={{ fontSize: 16 }}>↗</span>
            </a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: 0.45 }}>
          <span className="mono" style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>Descend</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(var(--canopy),transparent)" }} />
        </div>
      </section>

      <Marquee items={home?.marquee ?? []} />

      {/* ABOUT — word-fill */}
      <section id="about" data-stratum="1" data-navcolor="#2D4A34" style={{ background: "var(--sand-2)", padding: "180px 40px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 80, flexWrap: "wrap", gap: 20 }}>
            <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>01 — Who we are</p>
            <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey)" }}>Research-grounded, not a build shop</p>
          </div>
          <p
            id="fillText"
            className="serif word-fill"
            style={{ fontWeight: 300, fontSize: "clamp(26px,4vw,58px)", lineHeight: 1.28, letterSpacing: "-0.02em", color: "var(--canopy)" }}
          >
            {home?.aboutStatement}
          </p>
        </div>
      </section>

      {/* PATHS */}
      <section id="paths" data-stratum="1" data-navcolor="#2D4A34" style={{ background: "var(--sand-2)", padding: "0 40px 160px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
            <h2 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(34px,5vw,72px)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--canopy)" }}>Two ways in.</h2>
            <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bark)" }}>Founders · Companies</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 28 }}>
            {/* Founders */}
            <a href={`mailto:${email}?subject=Founder%20project`} className="pathcard reveal" style={{ display: "block", background: "#F5EFDF", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(45,74,52,0.1)" }}>
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                <div className="path-img" style={{ position: "absolute", inset: 0, transition: "transform .7s cubic-bezier(.19,1,.22,1)" }}>
                  <Image src="https://images.unsplash.com/photo-1758995017474-8a9b71604016?w=1200&q=80&auto=format&fit=crop" alt="New-growth forest" fill sizes="640px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(45,74,52,0.1),transparent 40%)", pointerEvents: "none" }} />
                <span className="mono" style={{ position: "absolute", top: 16, left: 16, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sand)", background: "rgba(45,74,52,0.6)", padding: "6px 12px", borderRadius: 100, backdropFilter: "blur(4px)", pointerEvents: "none" }}>For Founders</span>
              </div>
              <div style={{ padding: "36px 32px 40px" }}>
                <h3 className="serif" style={{ fontWeight: 400, fontSize: "clamp(26px,2.6vw,38px)", lineHeight: 1.1, color: "var(--canopy)", marginBottom: 16 }}>From napkin sketch<br />to shipped product</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--grey)", marginBottom: 28, maxWidth: 440 }}>Scoping, architecture, and a hands-on build partner for early-stage founders. We tell you what your idea actually needs — not what&apos;s comfortable to hear.</p>
                <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>Book a scoping call <span className="path-arrow" style={{ transition: "transform .4s cubic-bezier(.19,1,.22,1)" }}>→</span></span>
              </div>
            </a>
            {/* Companies */}
            <a href={`mailto:${email}?subject=Company%20engagement`} className="pathcard reveal" style={{ display: "block", background: "var(--canopy)", borderRadius: 20, overflow: "hidden", color: "var(--sand)" }}>
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                <div className="path-img" style={{ position: "absolute", inset: 0, transition: "transform .7s cubic-bezier(.19,1,.22,1)" }}>
                  <Image src="https://images.unsplash.com/photo-1776026502270-997f1bd6950c?w=1200&q=80&auto=format&fit=crop" alt="Established forest" fill sizes="640px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,46,34,0.2),transparent 40%)", pointerEvents: "none" }} />
                <span className="mono" style={{ position: "absolute", top: 16, left: 16, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--canopy)", background: "rgba(242,236,221,0.85)", padding: "6px 12px", borderRadius: 100, pointerEvents: "none" }}>For Companies</span>
              </div>
              <div style={{ padding: "36px 32px 40px" }}>
                <h3 className="serif" style={{ fontWeight: 400, fontSize: "clamp(26px,2.6vw,38px)", lineHeight: 1.1, marginBottom: 16 }}>Modernise legacy,<br />without the rebuild theatre</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(242,236,221,0.65)", marginBottom: 28, maxWidth: 440 }}>Process automation, data platforms, and internal tooling for established businesses — plus AI-native products designed around AI from day one.</p>
                <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>Talk transformation <span className="path-arrow" style={{ transition: "transform .4s cubic-bezier(.19,1,.22,1)" }}>→</span></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" data-stratum="1" data-navcolor="#F2ECDD" style={{ background: "var(--canopy)", color: "var(--sand)", padding: "160px 40px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, flexWrap: "wrap", gap: 24 }}>
            <div>
              <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>02 — What we do</p>
              <h2 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(40px,6vw,88px)", lineHeight: 1, letterSpacing: "-0.03em" }}>Four ways<br />we move.</h2>
            </div>
            <p className="reveal" style={{ maxWidth: 320, fontSize: 15, lineHeight: 1.7, color: "rgba(242,236,221,0.55)" }}>At home in the whole ecosystem — not just one layer of it.</p>
          </div>
          <div id="svcList" style={{ borderTop: "1px solid rgba(242,236,221,0.15)" }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="svc-row reveal"
                style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 24, alignItems: "center", padding: "40px 8px", borderBottom: "1px solid rgba(242,236,221,0.15)", cursor: "default", transition: "background .4s,padding .4s", position: "relative", overflow: "hidden" }}
              >
                <span className="mono" style={{ fontSize: 13, color: "var(--gold)" }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="serif" style={{ fontWeight: 400, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1 }}>{s.title}</h3>
                  <p className="svc-desc" style={{ maxHeight: 0, opacity: 0, overflow: "hidden", fontSize: 15, lineHeight: 1.7, color: "rgba(242,236,221,0.6)", maxWidth: 640, transition: "max-height .5s cubic-bezier(.19,1,.22,1),opacity .4s,margin-top .4s" }}>{s.description}</p>
                </div>
                <span className="svc-arrow serif" style={{ fontSize: 28, color: "var(--gold)", transition: "transform .4s", fontStyle: "italic" }}>↓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES — sticky stack */}
      <section id="work" data-stratum="2" data-navcolor="#2D4A34" style={{ background: "var(--sand-3)", padding: "160px 40px 40px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 24 }}>
            <div>
              <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>03 — Case studies</p>
              <h2 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(40px,6vw,88px)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--canopy)" }}>Products<br />in the wild.</h2>
            </div>
            <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--bark)" }}>03 / SHIPPED &amp; LIVE</p>
          </div>
        </div>

        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          {cases.map((p, i) => {
            const t = themeTokens(p.entry.theme);
            const stats = p.entry.stats ?? [];
            const goldTheme = p.entry.theme === "gold";
            return (
              <div
                key={p.slug}
                className="stack-card"
                style={{ position: "sticky", top: 80 + i * 30, background: t.bg, color: t.text, borderRadius: 24, padding: "clamp(28px,3.5vw,52px)", marginBottom: 32, boxShadow: "0 -20px 60px rgba(45,74,52,0.25)", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: -30, right: -10, fontFamily: "var(--font-serif)", fontSize: "clamp(140px,22vw,300px)", fontWeight: 300, color: goldTheme ? "rgba(32,22,10,0.08)" : "rgba(242,236,221,0.05)", lineHeight: 1, pointerEvents: "none", zIndex: 0 }}>{String(i + 1).padStart(2, "0")}</div>
                <div className="casegrid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "clamp(28px,4vw,56px)", alignItems: "center", position: "relative", zIndex: 2 }}>
                  <div style={{ height: "clamp(280px,40vh,420px)", borderRadius: 16, overflow: "hidden", background: goldTheme ? "rgba(32,22,10,0.08)" : "rgba(242,236,221,0.06)", position: "relative" }}>
                    <Media src={p.entry.cover} alt={`${p.entry.name} screenshot`} label={`${p.entry.name} — app screenshot`} dark={!goldTheme} />
                  </div>
                  <div>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: t.tag }}>{p.entry.category}</span>
                    <h3 className="serif" style={{ fontWeight: 400, fontSize: "clamp(40px,6vw,88px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: "12px 0 20px" }}>{p.entry.name}</h3>
                    <p style={{ fontSize: "clamp(15px,1.4vw,19px)", lineHeight: 1.6, color: t.muted, marginBottom: 28, maxWidth: 520 }}>{p.entry.description}</p>
                    <div className="mstats" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.max(stats.length, 1)},auto)`, gap: 32, marginBottom: 28, justifyContent: "start" }}>
                      {stats.map((st, j) => (
                        <div key={j}>
                          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: goldTheme ? "rgba(32,22,10,0.5)" : "rgba(242,236,221,0.45)", marginBottom: 6 }}>{st.label}</div>
                          <div className="serif" style={{ fontSize: 18 }}>{st.value}</div>
                        </div>
                      ))}
                    </div>
                    <Link href={`/work/${p.slug}`} className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: t.text, borderBottom: `1px solid ${t.tag}`, paddingBottom: 4 }}>Read case study →</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" data-stratum="2" data-navcolor="#F2ECDD" style={{ background: "var(--floor)", color: "var(--sand)", padding: "160px 40px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 60, alignItems: "end", marginBottom: 80 }}>
            <div>
              <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>04 — Research &amp; publications</p>
              <h2 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(38px,5.5vw,80px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                Engineering that<br />survives <em style={{ fontStyle: "italic", color: "var(--gold)" }}>peer review.</em>
              </h2>
            </div>
            <p className="reveal" style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(242,236,221,0.6)", maxWidth: 420 }}>{home?.researchIntro}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 2, background: "rgba(242,236,221,0.12)", border: "1px solid rgba(242,236,221,0.12)", borderRadius: 16, overflow: "hidden" }}>
            {venues.map((v) => (
              <div key={v.name} className="reveal" style={{ background: "var(--floor)", padding: "44px 36px" }}>
                <div className="serif" style={{ fontSize: "clamp(40px,4vw,60px)", fontWeight: 300, color: "var(--gold)", lineHeight: 1, marginBottom: 24 }}>{v.name}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(242,236,221,0.6)" }}>{v.description}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginTop: 48 }}>
            <p className="mono reveal" style={{ fontSize: 12, letterSpacing: "0.1em", color: "rgba(242,236,221,0.45)" }}>Submitted to ISPASS · MDPI · IEEE</p>
            <a href={`mailto:${email}?subject=Research%20collaboration`} className="mono mag reveal" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--floor)", background: "var(--gold)", padding: "18px 30px", borderRadius: 100, transition: "transform .3s cubic-bezier(.19,1,.22,1)" }}>Collaborate on research ↗</a>
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <section data-stratum="3" data-navcolor="#F2ECDD" style={{ position: "relative", color: "var(--sand)", padding: "180px 40px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1764208637252-4cb59a64a674?w=1800&q=80&auto=format&fit=crop" alt="Forest canopy" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg,rgba(28,46,34,0.82),rgba(20,15,8,0.78))", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2, pointerEvents: "none" }}>
          <div className="reveal" style={{ fontSize: 52, marginBottom: 32 }}>🍃</div>
          <p className="serif reveal" style={{ fontWeight: 300, fontStyle: "italic", fontSize: "clamp(24px,3.2vw,44px)", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
            The purple-faced langur is <span style={{ color: "var(--gold-soft)" }}>endemic to Sri Lanka</span> and found nowhere else. It moves through every layer of the canopy — at ease deep in cover or out on an exposed branch. <span style={{ color: "var(--gold-soft)" }}>That&apos;s the posture we borrow.</span>
          </p>
        </div>
      </section>

      {/* CONTACT — forest floor */}
      <footer id="contact" data-stratum="3" data-navcolor="#F2ECDD" style={{ background: "var(--canopy-deep)", color: "var(--sand)", padding: "160px 40px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-30%", left: "50%", transform: "translateX(-50%)", width: "90vw", height: "60vw", maxHeight: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(184,134,59,0.14) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1300, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 40 }}>Get in touch</p>
          <h2 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(52px,9vw,150px)", lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: 64 }}>
            Let&apos;s build<br />something that <em style={{ fontStyle: "italic", color: "var(--gold)" }}>holds up.</em>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 2, background: "rgba(242,236,221,0.12)", border: "1px solid rgba(242,236,221,0.12)", borderRadius: 16, overflow: "hidden", marginBottom: 64 }}>
            {[
              { n: "01", t: "I'm a founder", d: "Turn a sketch into a shipped, defensible product.", s: "I'm%20a%20founder" },
              { n: "02", t: "I'm a company", d: "Modernise operations or build AI-native products.", s: "I'm%20a%20company" },
              { n: "03", t: "I'm a partner", d: "Collaborate on applied, publishable research.", s: "Research%20partnership" },
            ].map((c) => (
              <a key={c.n} href={`mailto:${email}?subject=${c.s}`} className="ctacard reveal" style={{ background: "var(--canopy-deep)", padding: "36px 32px", transition: "background .4s" }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>{c.n}</span>
                <h3 className="serif" style={{ fontWeight: 400, fontSize: 26, margin: "14px 0 10px" }}>{c.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(242,236,221,0.55)" }}>{c.d}</p>
              </a>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, alignItems: "flex-end", borderTop: "1px solid rgba(242,236,221,0.15)", paddingTop: 48 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a href={`mailto:${email}`} className="serif mag" style={{ fontSize: "clamp(24px,3vw,42px)", fontWeight: 300, color: "var(--sand)", display: "inline-block", transition: "transform .35s cubic-bezier(.19,1,.22,1)", transformOrigin: "left" }}>{email}</a>
              <a href={settings?.url ?? "https://leafmonkeylabs.com"} className="mono navlink" style={{ fontSize: 13, letterSpacing: "0.1em", color: "rgba(242,236,221,0.6)", width: "fit-content" }}>
                {(settings?.url ?? "leafmonkeylabs.com").replace(/^https?:\/\//, "")} ↗
              </a>
            </div>
            <div className="mono" style={{ textAlign: "right", fontSize: 12, letterSpacing: "0.08em", color: "rgba(242,236,221,0.5)", lineHeight: 2 }}>
              {(settings?.metaLines ?? ["COLOMBO, SRI LANKA", "DIGITAL · AI-NATIVE · RESEARCH", "ISPASS · MDPI · IEEE"]).map((l, i, arr) => (
                <span key={i}>{l}{i < arr.length - 1 && <br />}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginTop: 80 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="serif" style={{ fontWeight: 500, fontSize: 16 }}>Leaf Monkey</span>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>Labs</span>
            </div>
            <p className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(242,236,221,0.3)" }}>© 2026 — NATIVE TO THE CANOPY, BUILT FOR THE WILD</p>
          </div>
        </div>
      </footer>

      <HomeFx />
    </>
  );
}
