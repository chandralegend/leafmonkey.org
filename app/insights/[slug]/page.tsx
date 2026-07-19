import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, getSettings } from "@/lib/content";
import Media from "@/components/Media";
import MarkdocContent from "@/components/MarkdocContent";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import InnerFx from "@/components/InnerFx";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt || undefined };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const settings = await getSettings();
  const { node } = post.content;

  return (
    <>
      {/* reading progress */}
      <div id="progress" style={{ position: "fixed", top: 0, left: 0, height: 2, background: "var(--gold)", zIndex: 200, width: "0%" }} />
      <SiteNav active="insights" />
      <InnerFx progress />

      <article>
        <header className="wrap" style={{ padding: "150px 40px 50px", maxWidth: 820, margin: "0 auto", width: "100%" }}>
          <div className="mono reveal" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bark)", marginBottom: 36 }}>
            <Link href="/insights" className="navlink">Insights</Link> &nbsp;/&nbsp; <span style={{ color: "var(--gold)" }}>{post.category}</span>
          </div>
          <h1 className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(38px,6vw,76px)", lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--canopy)", marginBottom: 32 }}>{post.title}</h1>
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--canopy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🐒</div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: "0.06em", color: "var(--grey)" }}>{post.author} &nbsp;·&nbsp; {post.readTime} &nbsp;·&nbsp; {post.location}</div>
          </div>
        </header>

        <div className="wrap reveal" style={{ padding: "0 40px", maxWidth: 1180, margin: "0 auto 70px", width: "100%" }}>
          <div style={{ height: "clamp(280px,52vh,540px)", borderRadius: 22, overflow: "hidden", background: "var(--sand-3)", position: "relative" }}>
            <Media src={post.cover} alt={post.title} label="Article cover" priority />
          </div>
        </div>

        <div className="wrap prose" style={{ padding: "0 40px 90px", maxWidth: 720, margin: "0 auto", width: "100%" }}>
          <MarkdocContent node={node} />
        </div>
      </article>

      <section className="wrap" style={{ padding: "0 40px 120px", maxWidth: 820, margin: "0 auto", width: "100%" }}>
        <Link href="/insights" className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(45,74,52,0.15)", paddingTop: 40, width: "100%", justifyContent: "space-between" }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bark)" }}>← All insights</span>
          <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>Share ↗</span>
        </Link>
      </section>

      <SiteFooter settings={settings} glow={false} />
    </>
  );
}
