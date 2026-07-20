import { ImageResponse } from "next/og";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getPost, getPosts } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Insights`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return new ImageResponse(
    ogCard({
      eyebrow: post?.category ?? "Insights",
      title: post?.title ?? "Insights",
      footer: post?.readTime ?? "Field notes from the canopy",
    }),
    { ...size }
  );
}
