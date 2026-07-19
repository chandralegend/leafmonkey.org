import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

// Git-based reader: reads the committed content files from the filesystem.
// Works at build time (SSG) on Vercel and in local dev.
export const reader = createReader(process.cwd(), keystaticConfig);
