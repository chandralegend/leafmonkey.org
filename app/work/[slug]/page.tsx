import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getSettings } from "@/lib/content";
import Media from "@/components/Media";
import MarkdocContent from "@/components/MarkdocContent";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import InnerFx from "@/components/InnerFx";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Case Study`,
    description: product.overview || product.description || undefined,
  };
}

const CAO = ["challenge", "approach", "outcome"] as const;
const CAO_LABEL: Record<(typeof CAO)[number], string> = {
  challenge: "The challenge",
  approach: "The approach",
  outcome: "The outcome",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const settings = await getSettings();
  const { node } = product.content;
  const hasBody = node.children.length > 0;
  const stats = product.stats ?? [];
  const gallery = product.gallery ?? [];

  return (
    <>
      <SiteNav active="work" />
      <InnerFx />

      {/* HERO */}
      <section className="wrap" style={{ padding: "150px 40px 60px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <div className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bark)", marginBottom: 40 }}>
          <Link href="/work" className="navlink">Work</Link> &nbsp;/&nbsp; <span style={{ color: "var(--gold)" }}>{product.name}</span>
        </div>
        <span className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>{product.tagline || product.category}</span>
        <h1 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(56px,10vw,168px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "var(--canopy)", margin: "16px 0 28px" }}>{product.name}</h1>
        <p className="reveal" style={{ fontSize: "clamp(18px,2vw,26px)", lineHeight: 1.5, color: "var(--grey)", maxWidth: 680, fontWeight: 300 }}>{product.description}</p>
      </section>

      {/* HERO IMAGE + stats */}
      <section className="wrap" style={{ padding: "0 40px", maxWidth: 1300, margin: "0 auto 100px", width: "100%" }}>
        <div className="reveal" style={{ height: "clamp(280px,52vh,560px)", borderRadius: 22, overflow: "hidden", background: "var(--sand-3)", position: "relative" }}>
          <Media src={product.cover} alt={`${product.name} cover`} label={`${product.name} — hero / cover shot`} priority />
        </div>
        {stats.length > 0 && (
          <div className="two" style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length},1fr)`, gap: 24, marginTop: 40, borderTop: "1px solid rgba(45,74,52,0.15)", paddingTop: 32 }}>
            {stats.map((s, i) => (
              <div key={i} className="reveal">
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bark)", marginBottom: 8 }}>{s.label}</div>
                <div className="serif" style={{ fontSize: 20 }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* OVERVIEW */}
      {product.overview && (
        <section className="wrap two" style={{ padding: "0 40px 100px", maxWidth: 1300, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(40px,6vw,100px)" }}>
          <div>
            <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>Overview</p>
          </div>
          <div>
            <p className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(22px,2.6vw,36px)", lineHeight: 1.4, color: "var(--canopy)" }}>{product.overview}</p>
          </div>
        </section>
      )}

      {/* CHALLENGE / APPROACH / OUTCOME */}
      {CAO.some((k) => product[k]) && (
        <section style={{ background: "var(--canopy)", color: "var(--sand)", padding: "120px 40px" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 2, background: "rgba(242,236,221,0.12)", border: "1px solid rgba(242,236,221,0.12)", borderRadius: 16, overflow: "hidden" }}>
            {CAO.filter((k) => product[k]).map((k) => (
              <div key={k} className="reveal" style={{ background: "var(--canopy)", padding: "48px 40px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>{CAO_LABEL[k]}</span>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(242,236,221,0.72)", marginTop: 20 }}>{product[k]}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PULL QUOTE */}
      {product.pullQuote && (
        <section className="wrap" style={{ padding: "120px 40px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <p className="serif reveal" style={{ fontWeight: 300, fontStyle: "italic", fontSize: "clamp(26px,4vw,52px)", lineHeight: 1.35, letterSpacing: "-0.01em", color: "var(--canopy)" }}>
            &ldquo;{product.pullQuote}&rdquo;
          </p>
        </section>
      )}

      {/* BODY */}
      {hasBody && (
        <section className="wrap prose" style={{ padding: "0 40px 90px", maxWidth: 720, margin: "0 auto", width: "100%" }}>
          <MarkdocContent node={node} />
        </section>
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="wrap" style={{ padding: "0 40px 120px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <p className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32 }}>Inside the product</p>
          <div className="gallery" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {gallery.map((src, i) => (
              <div key={i} className="reveal" style={{ gridColumn: i === gallery.length - 1 && gallery.length % 2 === 1 ? "1 / -1" : undefined, height: "clamp(260px,44vh,460px)", borderRadius: 18, overflow: "hidden", background: "var(--sand-3)", position: "relative" }}>
                <Media src={src} alt={`${product.name} screen ${i + 1}`} label={`${product.name} — screen ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEXT */}
      <section className="wrap" style={{ padding: "0 40px 120px", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <Link href="/work" className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, borderTop: "1px solid rgba(45,74,52,0.15)", borderBottom: "1px solid rgba(45,74,52,0.15)", padding: "48px 4px" }}>
          <div>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bark)" }}>Next</span>
            <div className="serif" style={{ fontWeight: 400, fontSize: "clamp(28px,4vw,56px)", lineHeight: 1, marginTop: 10, color: "var(--canopy)" }}>All work</div>
          </div>
          <span className="serif" style={{ fontSize: 40, color: "var(--gold)" }}>→</span>
        </Link>
      </section>

      <SiteFooter
        settings={settings}
        heading={<>Building something<br />similar? <span className="pf" style={{ color: "var(--gold)" }}>Let&apos;s talk.</span></>}
      />
    </>
  );
}
