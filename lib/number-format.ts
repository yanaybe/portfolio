/**
 * Serializable number-format descriptors.
 *
 * Charts are client components, and a server component cannot hand a function
 * across that boundary — so callers describe the format instead of supplying a
 * formatter.
 */
export type NumberFormat = {
  style: "int" | "compact" | "fixed" | "pct" | "signed";
  digits?: number;
  prefix?: string;
  suffix?: string;
};

export function formatNumber(value: number, format?: NumberFormat): string {
  const f = format ?? { style: "int" as const };
  const digits = f.digits ?? (f.style === "pct" ? 1 : f.style === "fixed" ? 2 : 0);
  let body: string;

  switch (f.style) {
    case "compact":
      body =
        Math.abs(value) >= 1000
          ? `${(value / 1000).toFixed(Math.abs(value) % 1000 === 0 ? 0 : 1)}K`
          : Math.round(value).toLocaleString("en-US");
      break;
    case "fixed":
      body = value.toFixed(digits);
      break;
    case "pct":
      body = `${value.toFixed(digits)}%`;
      break;
    case "signed":
      body = `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toFixed(digits)}`;
      break;
    default:
      body = Math.round(value).toLocaleString("en-US");
  }

  return `${f.prefix ?? ""}${body}${f.suffix ?? ""}`;
}

/** Round SVG geometry so server and client stringify coordinates identically. */
export const r2 = (n: number) => Math.round(n * 100) / 100;
