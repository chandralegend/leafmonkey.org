import { config, fields, collection, singleton } from "@keystatic/core";

/**
 * Leaf Monkey Labs — content model ("CRM").
 *
 * Storage is git-based (no database). In local dev the admin at /keystatic
 * reads & writes files directly. For editing in production, set
 * KEYSTATIC_STORAGE=github and the repo below (see README).
 */

const storage =
  process.env.KEYSTATIC_STORAGE === "github" &&
  process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO
    ? ({
        kind: "github",
        repo: process.env
          .NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}`,
      } as const)
    : ({ kind: "local" } as const);

/* shared building blocks --------------------------------------------------- */

const image = (label: string, dir: string) =>
  fields.image({
    label,
    directory: `public/images/${dir}`,
    publicPath: `/images/${dir}/`,
  });

const body = fields.markdoc({ label: "Body", extension: "md" });

/* -------------------------------------------------------------------------- */

export default config({
  storage,
  ui: {
    brand: { name: "Leaf Monkey Labs" },
    navigation: {
      Content: ["posts", "products", "team"],
      "Site settings": ["home", "settings"],
    },
  },
  collections: {
    /* ---- Insights / blog ---- */
    posts: collection({
      label: "Insights (Blog)",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "category", "publishedDate"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        category: fields.text({
          label: "Category",
          description: "e.g. Research, AI-Native, Fintech, Culture, Founders",
          defaultValue: "Research",
        }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        cover: image("Cover image", "posts"),
        readTime: fields.text({
          label: "Read time",
          defaultValue: "5 min read",
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "Leaf Monkey Labs",
        }),
        location: fields.text({ label: "Location", defaultValue: "Colombo" }),
        publishedDate: fields.date({ label: "Published date" }),
        featured: fields.checkbox({
          label: "Featured",
          description: "Show as the large featured post on the Insights page",
          defaultValue: false,
        }),
        content: body,
      },
    }),

    /* ---- Softwares / products (with case study) ---- */
    products: collection({
      label: "Softwares (Products)",
      slugField: "name",
      path: "content/products/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["name", "category", "status"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        category: fields.text({
          label: "Category",
          description: "e.g. Fintech, Marketplace, AI-Native",
          defaultValue: "AI-Native",
        }),
        tagline: fields.text({
          label: "Tagline",
          description: "Short line shown under the name",
        }),
        description: fields.text({ label: "Description", multiline: true }),
        theme: fields.select({
          label: "Card theme",
          description: "Background colour of the product card",
          options: [
            { label: "Canopy green", value: "green" },
            { label: "Bark brown", value: "bark" },
            { label: "Turmeric gold", value: "gold" },
          ],
          defaultValue: "green",
        }),
        status: fields.text({ label: "Status", defaultValue: "Live" }),
        order: fields.integer({
          label: "Order",
          description: "Lower numbers appear first",
          defaultValue: 0,
        }),
        featured: fields.checkbox({
          label: "Featured",
          description: "Show as the large card on the Work page",
          defaultValue: false,
        }),
        cover: image("Cover image", "products"),
        stats: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            value: fields.text({ label: "Value" }),
          }),
          {
            label: "Stats",
            itemLabel: (p) => `${p.fields.label.value}: ${p.fields.value.value}`,
          }
        ),
        overview: fields.text({ label: "Overview", multiline: true }),
        challenge: fields.text({ label: "The challenge", multiline: true }),
        approach: fields.text({ label: "The approach", multiline: true }),
        outcome: fields.text({ label: "The outcome", multiline: true }),
        pullQuote: fields.text({ label: "Pull quote", multiline: true }),
        gallery: fields.array(image("Image", "products/gallery"), {
          label: "Gallery",
        }),
        content: body,
      },
    }),

    /* ---- The troop / team ---- */
    team: collection({
      label: "Team (The Troop)",
      slugField: "name",
      path: "content/team/*",
      columns: ["name", "role"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Role", defaultValue: "Engineering" }),
        order: fields.integer({ label: "Order", defaultValue: 0 }),
        photo: image("Photo", "team"),
      },
    }),
  },

  singletons: {
    /* ---- Home page content ---- */
    home: singleton({
      label: "Home page",
      path: "content/home",
      format: { data: "yaml" },
      schema: {
        heroEyebrow: fields.text({
          label: "Hero eyebrow",
          defaultValue:
            "Est. Colombo, Sri Lanka · Software & Applied AI Research",
        }),
        heroLine1: fields.text({ label: "Hero line 1", defaultValue: "Native to" }),
        heroLine1Accent: fields.text({
          label: "Hero line 1 (accent)",
          defaultValue: "the canopy.",
        }),
        heroLine2: fields.text({ label: "Hero line 2", defaultValue: "Built for" }),
        heroLine2Accent: fields.text({
          label: "Hero line 2 (accent)",
          defaultValue: "the wild.",
        }),
        heroSubtitle: fields.text({
          label: "Hero subtitle",
          multiline: true,
          defaultValue:
            "A Sri Lankan software agency turning founders' ideas into research-grade products — moving between legacy systems and greenfield AI like a langur through the branches.",
        }),
        heroCta: fields.text({ label: "Hero CTA label", defaultValue: "Start a project" }),
        marquee: fields.array(fields.text({ label: "Item" }), {
          label: "Marquee items",
          itemLabel: (p) => p.value,
        }),
        aboutStatement: fields.text({
          label: "About statement (word-fill)",
          multiline: true,
        }),
        services: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Services",
            itemLabel: (p) => p.fields.title.value,
          }
        ),
        researchHeading: fields.text({
          label: "Research heading",
          multiline: true,
          defaultValue: "Engineering that survives peer review.",
        }),
        researchIntro: fields.text({
          label: "Research intro",
          multiline: true,
        }),
        venues: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Research venues", itemLabel: (p) => p.fields.name.value }
        ),
      },
    }),

    /* ---- Global site settings ---- */
    settings: singleton({
      label: "Site settings",
      path: "content/settings",
      format: { data: "yaml" },
      schema: {
        email: fields.text({
          label: "Contact email",
          defaultValue: "hello@leafmonkey.org",
        }),
        url: fields.text({
          label: "Website URL",
          defaultValue: "https://leafmonkey.org",
        }),
        location: fields.text({ label: "Location", defaultValue: "Colombo, Sri Lanka" }),
        tagline: fields.text({
          label: "Tagline",
          defaultValue: "Native to the canopy. Built for the wild.",
        }),
        metaLines: fields.array(fields.text({ label: "Line" }), {
          label: "Footer meta lines",
          itemLabel: (p) => p.value,
          description: "Small mono lines shown in the footer",
        }),
      },
    }),
  },
});
