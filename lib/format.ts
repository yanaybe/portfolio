export const fmtInt = (n: number) => n.toLocaleString("en-US");

export const fmtCompact = (n: number) =>
  Math.abs(n) >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : fmtInt(n);

export const fmtPct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

export const fmtSigned = (n: number, digits = 1) =>
  `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(digits)}`;

export const fmtP = (p: number) => (p < 0.001 ? "p < 0.001" : `p = ${p.toFixed(3)}`);

/** Nudge labels apart so none overlap, keeping their original order. */
export function spreadLabels(positions: number[], minGap: number, min: number, max: number) {
  const order = positions.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  let cursor = min;
  for (const item of order) {
    item.y = Math.max(item.y, cursor);
    cursor = item.y + minGap;
  }
  const overflow = cursor - minGap - max;
  if (overflow > 0) {
    for (let k = order.length - 1; k >= 0; k--) {
      order[k].y -= overflow;
      if (k > 0 && order[k - 1].y > order[k].y - minGap) continue;
      break;
    }
  }
  const out = positions.slice();
  for (const item of order) out[item.i] = Math.round(item.y * 100) / 100;
  return out;
}
