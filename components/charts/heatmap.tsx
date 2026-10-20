"use client";

import { useState } from "react";
import { formatNumber, type NumberFormat } from "@/lib/number-format";

export type HeatCell = { row: number; col: number; value: number; extra?: string };

/**
 * Hour × weekday grid. Sequential encoding: one hue, more-is-darker, mixed
 * towards the card surface so the lightest step means "near zero".
 */
export function Heatmap({
  cells,
  rowLabels,
  colLabels,
  format,
  ariaLabel,
  unit,
}: {
  cells: HeatCell[];
  rowLabels: string[];
  colLabels: string[];
  format?: NumberFormat;
  ariaLabel: string;
  unit: string;
}) {
  const [active, setActive] = useState<HeatCell | null>(null);
  const formatValue = (v: number) => formatNumber(v, format);
  const max = Math.max(...cells.map((c) => c.value));
  const min = Math.min(...cells.map((c) => c.value));

  const shade = (v: number) => {
    const t = (v - min) / (max - min || 1);
    const pct = 12 + Math.round(t * 78);
    return `color-mix(in oklab, var(--series-1) ${pct}%, var(--surface))`;
  };

  return (
    <div>
      <p className="sr-only">{ariaLabel}</p>
      <div
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
        className="thin-scroll overflow-x-auto"
      >
        <div className="min-w-[620px]">
          <div
            className="grid gap-[2px]"
            style={{ gridTemplateColumns: `3rem repeat(${colLabels.length}, minmax(0,1fr))` }}
          >
            <span />
            {colLabels.map((c, i) => (
              <span key={c} className="tnum pb-1 text-center text-[10px] text-muted">
                {i % 2 === 0 ? c : ""}
              </span>
            ))}
            {rowLabels.map((r, ri) => (
              <div key={r} className="contents">
                <span className="pr-2 text-right text-[11px] leading-6 text-ink-2">{r}</span>
                {colLabels.map((_, ci) => {
                  const cell = cells.find((c) => c.row === ri && c.col === ci);
                  if (!cell) return <span key={ci} className="h-6 rounded-[3px] bg-surface-2" />;
                  return (
                    <button
                      key={ci}
                      type="button"
                      className="h-6 rounded-[3px] transition-[outline] focus-visible:outline-2"
                      style={{
                        background: shade(cell.value),
                        outline:
                          active === cell ? "2px solid var(--line-strong)" : "none",
                        outlineOffset: "-1px",
                      }}
                      onPointerEnter={() => setActive(cell)}
                      onPointerLeave={() => setActive(null)}
                      onFocus={() => setActive(cell)}
                      onBlur={() => setActive(null)}
                      aria-label={`${rowLabels[ri]} ${colLabels[ci]}: ${formatValue(cell.value)} ${unit}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <span>{formatValue(min)}</span>
          <span aria-hidden className="flex h-2.5 w-28 overflow-hidden rounded-full">
            {Array.from({ length: 7 }, (_, i) => (
              <span
                key={i}
                className="flex-1"
                style={{ background: shade(min + ((max - min) * i) / 6) }}
              />
            ))}
          </span>
          <span>
            {formatValue(max)} {unit}
          </span>
        </div>
        <p className="tnum text-xs text-ink-2" aria-live="polite">
          {active
            ? `${rowLabels[active.row]} ${colLabels[active.col]} — ${formatValue(active.value)} ${unit}${active.extra ? ` · ${active.extra}` : ""}`
            : "Hover or focus a cell for its value"}
        </p>
      </div>
    </div>
  );
}
