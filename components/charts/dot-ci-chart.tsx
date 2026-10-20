"use client";

import { useState } from "react";
import { r2 } from "@/lib/number-format";

export type CiDatum = { label: string; value: number; lo: number; hi: number };

const W = 760;
const PAD = { top: 16, right: 58, bottom: 40, left: 258 };
const ROW = 30;

/**
 * Odds ratios with 95% confidence intervals on a log axis, against a reference
 * line at 1. A log axis is the honest one here: ×2 and ÷2 are the same distance.
 */
export function DotCiChart({
  data,
  reference = 1,
  ariaLabel,
  valueLabel = "odds ratio",
}: {
  data: CiDatum[];
  reference?: number;
  ariaLabel: string;
  valueLabel?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const H = PAD.top + PAD.bottom + data.length * ROW;
  const lo = Math.min(...data.map((d) => d.lo), reference) * 0.9;
  const hi = Math.max(...data.map((d) => d.hi), reference) * 1.1;
  const logLo = Math.log(lo);
  const logHi = Math.log(hi);
  const px = (v: number) =>
    r2(PAD.left + ((Math.log(v) - logLo) / (logHi - logLo)) * (W - PAD.left - PAD.right));
  const ticks = [0.8, 1, 1.5, 2, 3, 4].filter((t) => t >= lo && t <= hi);

  return (
    <div className="relative" style={{ height: H * 0.92 }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={ariaLabel}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={px(t)} x2={px(t)} y1={PAD.top - 6} y2={H - PAD.bottom} stroke="var(--grid)" />
            <text
              x={px(t)}
              y={H - PAD.bottom + 18}
              textAnchor="middle"
              className="tnum"
              fill="var(--muted)"
              fontSize="12"
            >
              {t}×
            </text>
          </g>
        ))}
        <line
          x1={px(reference)}
          x2={px(reference)}
          y1={PAD.top - 6}
          y2={H - PAD.bottom}
          stroke="var(--baseline)"
          strokeWidth="1.5"
        />
        <text
          x={px(reference)}
          y={H - PAD.bottom + 32}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize="11.5"
        >
          no effect
        </text>

        {data.map((d, i) => {
          const y = PAD.top + i * ROW + ROW / 2;
          const isActive = active === i;
          return (
            <g key={d.label} opacity={active !== null && !isActive ? 0.55 : 1}>
              <text
                x={PAD.left - 14}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="var(--ink-2)"
                fontSize="13.5"
              >
                {d.label}
              </text>
              <line
                x1={px(d.lo)}
                x2={px(d.hi)}
                y1={y}
                y2={y}
                stroke="var(--series-1)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.45"
              />
              <circle cx={px(d.value)} cy={y} r="5" fill="var(--series-1)" stroke="var(--surface)" strokeWidth="2" />
              <text
                x={W - PAD.right + 8}
                y={y}
                dominantBaseline="middle"
                className="tnum"
                fill="var(--ink)"
                fontSize="13"
                fontWeight="600"
              >
                {d.value.toFixed(1)}×
              </text>
              <rect
                x={0}
                y={PAD.top + i * ROW}
                width={W}
                height={ROW}
                fill="transparent"
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
              />
            </g>
          );
        })}
      </svg>
      {active !== null ? (
        <div className="pointer-events-none absolute right-2 top-0 rounded-lg border border-line-strong bg-surface-raised px-3 py-2 text-xs shadow-[var(--shadow-lift)]">
          <p className="font-semibold text-ink">{data[active].label}</p>
          <p className="tnum mt-1 text-muted">
            {valueLabel} {data[active].value.toFixed(2)}
            <span className="block">
              95% CI {data[active].lo.toFixed(2)}–{data[active].hi.toFixed(2)}
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
