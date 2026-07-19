export type ProductTheme = "green" | "bark" | "gold";

export interface ThemeTokens {
  bg: string;
  text: string;
  tag: string;
  muted: string;
  accent: string;
}

const THEMES: Record<ProductTheme, ThemeTokens> = {
  green: {
    bg: "#2D4A34",
    text: "#F2ECDD",
    tag: "#B8863B",
    muted: "rgba(242,236,221,0.75)",
    accent: "#B8863B",
  },
  bark: {
    bg: "#5C4B3C",
    text: "#F2ECDD",
    tag: "#E8C889",
    muted: "rgba(242,236,221,0.78)",
    accent: "#E8C889",
  },
  gold: {
    bg: "#B8863B",
    text: "#20160A",
    tag: "#2D4A34",
    muted: "rgba(32,22,10,0.72)",
    accent: "#2D4A34",
  },
};

export function themeTokens(theme?: string | null): ThemeTokens {
  return THEMES[(theme as ProductTheme) ?? "green"] ?? THEMES.green;
}
