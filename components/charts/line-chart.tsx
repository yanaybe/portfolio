"use client";

import { useRef, useState } from "react";
import { spreadLabels } from "@/lib/format";
import { formatNumber, r2, type NumberFormat } from "@/lib/number-format";
import { Tooltip, TooltipRow } from "./chart-frame";

export type LineSeries = { label: string; color: string; values: number[] };

/** Axis bounds on clean round numbers, so ticks read as values and not as noise. */
function niceScale(lo: number, hi: number, targetTicks: number) {
  const rawStep = (hi - lo) / Math.max(1, targetTicks - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.abs(rawStep) || 1)));
  const step =
    [1, 2, 2.5, 5, 10].map((s) => s * magnitude).find((s) => s >= rawStep) ?? 10 * magnitude;
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  return { min, max: max === min ? min + step : max, step };
}

const W = 760;
const H = 360;
const PAD = { top: 18, right: 118, bottom: 34, left: 46 };

/**
 * Multi-series line chart with a snapping crosshair, one tooltip listing every
 * series, selective end labels and keyboard navigation along the x axis.
 */
export function LineChart({
  x,
  series,
  yTicks = 5,
  format,
  labelFormat,
  baselineAt,
  height = 340,
  ariaLabel,
}: {
  x: (string | number)[];
  series: LineSeries[];
  yTicks?: number;
  format?: NumberFormat;
  labelFormat?: NumberFormat;
  baselineAt?: number;
  height?: number;
  ariaLabel: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const formatValue = (v: number) => formatNumber(v, format);
  const formatLabel = (v: number) => formatNumber(v, labelFormat ?? { style: "int" });

  const all = series.flatMap((s) => s.values);
  const rawMin = Math.min(...all, baselineAt ?? Infinity);
  const rawMax = Math.max(...all, baselineAt ?? -Infinity);
  const span = rawMax - rawMin || 1;
  const { min, max, step } = niceScale(rawMin - span * 0.08, rawMax + span * 0.08, yTicks);

  const px = (i: number) =>
    r2(PAD.left + (i * (W - PAD.left - PAD.right)) / Math.max(1, x.length - 1));
  const py = (v: number) =>
    r2(PAD.top + (1 - (v - min) / (max - min)) * (H - PAD.top - PAD.bottom));

  const ticks = Array.from({ length: Math.round((max - min) / step) + 1 }, (_, i) => min + i * step);

  const endYs = spreadLabels(
    series.map((s) => py(s.values[s.values.length - 1])),
    15,
    PAD.top + 6,
    H - PAD.bottom - 6,
  );

  function onMove(event: React.PointerEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = (event.clientX - rect.left) / rect.width;
    const svgX = ratio * W;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < x.length; i++) {
      const d = Math.abs(px(i) - svgX);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    setActive(best);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setActive((current) => {
      const next = (current ?? 0) + (event.key === "ArrowRight" ? 1 : -1);
      return Math.max(0, Math.min(x.length - 1, next));
    });
  }

  return (
    <div className="relative" style={{ height }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full touch-none"
        role="img"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
        onFocus={() => setActive((v) => v ?? x.length - 1)}
        onBlur={() => setActive(null)}
        onKeyDown={onKeyDown}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={py(t)}
              y2={py(t)}
              stroke="var(--grid)"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 10}
              y={py(t)}
              textAnchor="end"
              dominantBaseline="middle"
              className="tnum"
              fill="var(--muted)"
              fontSize="11"
            >
              {formatLabel(t)}
            </text>
          </g>
        ))}

        {baselineAt !== undefined ? (
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={py(baselineAt)}
            y2={py(baselineAt)}
            stroke="var(--baseline)"
            strokeWidth="1"
          />
        ) : null}

        {x.map((label, i) => (
          <text
            key={`${label}-${i}`}
            x={px(i)}
            y={H - PAD.bottom + 20}
            textAnchor="middle"
            className="tnum"
            fill="var(--muted)"
            fontSize="11"
          >
            {label}
          </text>
        ))}

        {active !== null ? (
          <line
            x1={px(active)}
            x2={px(active)}
            y1={PAD.top}
            y2={H - PAD.bottom}
            stroke="var(--line-strong)"
            strokeWidth="1"
          />
        ) : null}

        {series.map((s) => (
          <polyline
            key={s.label}
            points={s.values.map((v, i) => `${px(i)},${py(v)}`).join(" ")}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {series.map((s, si) => {
          const lastX = px(s.values.length - 1);
          const lastY = py(s.values[s.values.length - 1]);
          const labelY = endYs[si];
          return (
            <g key={`end-${s.label}`}>
              {Math.abs(labelY - lastY) > 3 ? (
                <line
                  x1={lastX + 5}
                  y1={lastY}
                  x2={lastX + 13}
                  y2={labelY}
                  stroke="var(--line-strong)"
                  strokeWidth="1"
                />
              ) : null}
              <circle cx={lastX} cy={lastY} r="4" fill={s.color} stroke="var(--surface)" strokeWidth="2" />
              <text
                x={lastX + 17}
                y={labelY}
                dominantBaseline="middle"
                fill="var(--ink-2)"
                fontSize="11.5"
              >
                <tspan className="tnum" fill="var(--ink)" fontWeight="600">
                  {formatLabel(s.values[s.values.length - 1])}
                </tspan>
                <tspan dx="5">{s.label}</tspan>
              </text>
            </g>
          );
        })}

        {active !== null
          ? series.map((s) => (
              <circle
                key={`dot-${s.label}`}
                cx={px(active)}
                cy={py(s.values[active])}
                r="4.5"
                fill={s.color}
                stroke="var(--surface)"
                strokeWidth="2"
              />
            ))
          : null}
      </svg>

      {active !== null ? (
        <Tooltip
          x={Math.min(88, Math.max(12, (px(active) / W) * 100))}
          y={(PAD.top / H) * 100}
        >
          <p className="mb-1.5 font-semibold text-ink">{x[active]}</p>
          <div className="space-y-1">
            {series.map((s) => (
              <TooltipRow
                key={s.label}
                color={s.color}
                label={s.label}
                value={formatValue(s.values[active])}
              />
            ))}
          </div>
        </Tooltip>
      ) : null}
    </div>
  );
}
