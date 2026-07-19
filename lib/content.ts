import { reader } from "./reader";

/* ---------------- Posts (Insights) ---------------- */

export async function getPosts() {
  const posts = await reader.collections.posts.all();
  return posts.sort((a, b) => {
    const da = a.entry.publishedDate ?? "";
    const db = b.entry.publishedDate ?? "";
    return db.localeCompare(da);
  });
}

export async function getFeaturedPost() {
  const posts = await getPosts();
  return posts.find((p) => p.entry.featured) ?? posts[0] ?? null;
}

export async function getPost(slug: string) {
  return reader.collections.posts.read(slug, { resolveLinkedFiles: true });
}

/* ---------------- Products (Softwares) ---------------- */

export async function getProducts() {
  const products = await reader.collections.products.all();
  return products.sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
}

export async function getFeaturedProduct() {
  const products = await getProducts();
  return products.find((p) => p.entry.featured) ?? products[0] ?? null;
}

export async function getProduct(slug: string) {
  return reader.collections.products.read(slug, { resolveLinkedFiles: true });
}

/* ---------------- Team ---------------- */

export async function getTeam() {
  const team = await reader.collections.team.all();
  return team.sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
}

/* ---------------- Singletons ---------------- */

export async function getHome() {
  return reader.singletons.home.read();
}

export async function getSettings() {
  return reader.singletons.settings.read();
}

export type Settings = NonNullable<Awaited<ReturnType<typeof getSettings>>>;
export type Home = NonNullable<Awaited<ReturnType<typeof getHome>>>;
