/**
 * Chart series tokens. Plain module (not "use client") so server components can
 * import the values too — a const imported from a client module across the
 * server boundary comes back as a client reference, not the string.
 *
 * These four are the validated categorical slots, checked against this site's
 * chart surfaces (#f8fafc light, #0f172a dark) for lightness band, chroma,
 * colour-vision separation and contrast.
 */
export const seriesColors = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
] as const;
