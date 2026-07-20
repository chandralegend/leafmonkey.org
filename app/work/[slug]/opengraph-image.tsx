import { ImageResponse } from "next/og";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getProduct, getProducts } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Work`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return new ImageResponse(
    ogCard({
      eyebrow: product?.category ?? "Case study",
      title: product?.name ?? "Work",
      footer: product?.tagline || product?.status || "Case study",
    }),
    { ...size }
  );
}
