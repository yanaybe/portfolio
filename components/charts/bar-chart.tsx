"use client";

import { useState, type ReactNode } from "react";
import { formatNumber, r2, type NumberFormat } from "@/lib/number-format";

export type BarDatum = {
  label: string;
  value: number;
  /** Rendered in the hover/focus readout, for context the bar itself can't carry. */
  detail?: ReactNode;
  emphasis?: boolean;
};

/**
 * Horizontal bars. Long category names read better on the left, and every value
 * is directly labelled, so the readout carries only extra context.
 */
export function HorizontalBars({
  data,
  format,
  color = "var(--series-1)",
  mutedColor = "color-mix(in oklab, var(--series-1) 26%, var(--surface))",
  ariaLabel,
  labelWidth = "11rem",
}: {
  data: BarDatum[];
  format?: NumberFormat;
  color?: string;
  mutedColor?: string;
  ariaLabel: string;
  labelWidth?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const formatValue = (v: number) => formatNumber(v, format);
  const max = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  const anyEmphasis = data.some((d) => d.emphasis);

  return (
    <ul className="space-y-2.5" aria-label={ariaLabel}>
      {data.map((d, i) => {
        const isOn = anyEmphasis ? !!d.emphasis : true;
        return (
          <li
            key={d.label}
            className="group relative grid items-center gap-3"
            style={{ gridTemplateColumns: `minmax(0,${labelWidth}) 1fr auto` }}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            tabIndex={d.detail ? 0 : -1}
          >
            <span className="truncate text-[13px] text-ink-2" title={d.label}>
              {d.label}
            </span>
            <span className="relative block h-5">
              <span
                className="absolute inset-y-0 left-0 block rounded-r-[4px] transition-[width] duration-500"
                style={{
                  width: `${(Math.abs(d.value) / max) * 100}%`,
                  background: isOn ? color : mutedColor,
                  maxWidth: "100%",
                }}
              />
            </span>
            <span className="tnum text-[13px] font-semibold text-ink">{formatValue(d.value)}</span>
            {d.detail && active === i ? (
              <span className="pointer-events-none absolute -top-1 left-[12rem] z-10 -translate-y-full rounded-lg border border-line-strong bg-surface-raised px-3 py-2 text-xs text-ink-2 shadow-[var(--shadow-lift)]">
                {d.detail}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

const W = 760;
const H = 330;
const PAD = { top: 26, right: 12, bottom: 44, left: 48 };

/** Two-series columns: 2px surface gap between neighbours, 4px rounded caps. */
export function GroupedColumns({
  groups,
  series,
  format,
  yLabel,
  ariaLabel,
  height = 320,
}: {
  groups: string[];
  series: { label: string; color: string; values: number[] }[];
  format?: NumberFormat;
  yLabel?: string;
  ariaLabel: string;
  height?: number;
}) {
  const [active, setActive] = useState<[number, number] | null>(null);
  const formatValue = (v: number) => formatNumber(v, format ?? { style: "compact" });
  const max = niceCeiling(Math.max(...series.flatMap((s) => s.values)) * 1.12);
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const bandW = r2(plotW / groups.length);
  const barW = r2(Math.min(24, (bandW - 26) / series.length));
  const py = (v: number) => r2(PAD.top + plotH - (v / max) * plotH);
  const ticks = Array.from({ length: 5 }, (_, i) => (max * i) / 4);

  return (
    <div className="relative" style={{ height }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={ariaLabel}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={py(t)} y2={py(t)} stroke="var(--grid)" />
            <text
              x={PAD.left - 10}
              y={py(t)}
              textAnchor="end"
              dominantBaseline="middle"
              className="tnum"
              fill="var(--muted)"
              fontSize="11"
            >
              {formatNumber(t, { style: "compact" })}
            </text>
          </g>
        ))}
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={py(0)}
          y2={py(0)}
          stroke="var(--baseline)"
          strokeWidth="1"
        />
        {yLabel ? (
          <text x={PAD.left - 10} y={PAD.top - 12} textAnchor="end" fill="var(--muted)" fontSize="11">
            {yLabel}
          </text>
        ) : null}

        {groups.map((g, gi) => {
          const groupCenter = r2(PAD.left + bandW * gi + bandW / 2);
          const totalW = r2(barW * series.length + 2 * (series.length - 1));
          return (
            <g key={g}>
              {series.map((s, si) => {
                const x = r2(groupCenter - totalW / 2 + si * (barW + 2));
                const v = s.values[gi];
                const y = py(v);
                const isActive = active?.[0] === gi && active?.[1] === si;
                return (
                  <g key={s.label}>
                    <path
                      d={roundedTop(x, y, barW, py(0) - y, 4)}
                      fill={s.color}
                      opacity={active && !isActive ? 0.55 : 1}
                    />
                    <text
                      x={x + barW / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="tnum"
                      fill="var(--ink-2)"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {formatValue(v)}
                    </text>
                    <rect
                      x={x - 3}
                      y={PAD.top}
                      width={barW + 6}
                      height={plotH}
                      fill="transparent"
                      onPointerEnter={() => setActive([gi, si])}
                      onPointerLeave={() => setActive(null)}
                    />
                  </g>
                );
              })}
              <text
                x={groupCenter}
                y={H - PAD.bottom + 20}
                textAnchor="middle"
                fill="var(--muted)"
                fontSize="11.5"
              >
                {g}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Round an axis maximum up to a clean number, so ticks land on readable values. */
function niceCeiling(value: number) {
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  for (const step of [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10]) {
    const candidate = step * magnitude;
    if (candidate >= value) return candidate;
  }
  return value;
}

function roundedTop(x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.round(Math.min(r, h, w / 2) * 100) / 100;
  return [
    `M ${x} ${y + h}`,
    `L ${x} ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    `L ${x + w - radius} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + radius}`,
    `L ${x + w} ${y + h}`,
    "Z",
  ].join(" ");
}

export type DivergingDatum = { label: string; value: number; lo?: number; hi?: number };

/**
 * Bars either side of a zero baseline. Diverging encoding: two poles that read
 * as opposite (blue / red) with the baseline as the neutral middle.
 */
export function DivergingBars({
  data,
  positiveLabel,
  negativeLabel,
  format,
  ariaLabel,
}: {
  data: DivergingDatum[];
  positiveLabel: string;
  negativeLabel: string;
  format?: NumberFormat;
  ariaLabel: string;
}) {
  const formatValue = (v: number) => formatNumber(v, format ?? { style: "fixed", digits: 2 });
  const extent = Math.max(...data.map((d) => Math.abs(d.hi ?? d.value)), ...data.map((d) => Math.abs(d.lo ?? d.value)));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[11px] font-medium text-muted">
        <span>← {negativeLabel}</span>
        <span>{positiveLabel} →</span>
      </div>
      <ul className="space-y-2" aria-label={ariaLabel}>
        {data.map((d) => {
          const half = (Math.abs(d.value) / extent) * 50;
          const positive = d.value >= 0;
          return (
            <li
              key={d.label}
              className="grid items-center gap-3"
              style={{ gridTemplateColumns: "minmax(0,10.5rem) 1fr 3.5rem" }}
            >
              <span className="truncate text-[13px] text-ink-2" title={d.label}>
                {d.label}
              </span>
              <span className="relative block h-5">
                <span
                  aria-hidden
                  className="absolute inset-y-[-2px] left-1/2 w-px"
                  style={{ background: "var(--baseline)" }}
                />
                <span
                  className="absolute inset-y-0 block"
                  style={{
                    width: `${half}%`,
                    left: positive ? "50%" : `${50 - half}%`,
                    background: positive ? "var(--series-1)" : "var(--critical)",
                    borderRadius: positive ? "0 4px 4px 0" : "4px 0 0 4px",
                  }}
                />
              </span>
              <span className="tnum text-right text-[13px] font-semibold text-ink">
                {formatValue(d.value)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
