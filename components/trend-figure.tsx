import { roadSafety } from "@/lib/data/road-safety";
import { r2 } from "@/lib/number-format";

/**
 * The chart that started the road-safety project: the reported crash count and
 * the death count, indexed to 2020. Static by design — it illustrates the
 * finding the showcase section introduces; the interactive version is on
 * /analytics.
 */
export function TrendFigure() {
  const years = roadSafety.byYear.map((y) => y.year);
  const base = roadSafety.byYear[0];
  const injury = roadSafety.byYear.map((y) => (y.injury / base.injury) * 100);
  const fatal = roadSafety.byYear.map((y) => (y.fatal / base.fatal) * 100);

  const W = 460;
  const H = 230;
  const pad = { top: 22, right: 86, bottom: 26, left: 8 };
  const min = 55;
  const max = 150;
  const px = (i: number) => r2(pad.left + (i * (W - pad.left - pad.right)) / (years.length - 1));
  const py = (v: number) => r2(pad.top + (1 - (v - min) / (max - min)) * (H - pad.top - pad.bottom));

  const line = (vals: number[]) => vals.map((v, i) => `${px(i)},${py(v)}`).join(" ");
  const area = (vals: number[]) =>
    `${line(vals)} ${px(years.length - 1)},${py(min)} ${px(0)},${py(min)}`;

  return (
    <figure className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
      <figcaption className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        Israel, injury crashes indexed to 2020
      </figcaption>
      <p className="mb-3 text-[13px] leading-relaxed text-ink-2">
        Reported crashes fell. Deaths did not.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Index of reported injury crashes and fatal crashes in Israel, 2020 to 2024. Reported crashes fall to 77; fatal crashes rise to 142.">
        <defs>
          <linearGradient id="fatal-wash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--series-2)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--series-2)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1={pad.left} x2={W - pad.right} y1={py(100)} y2={py(100)} stroke="var(--baseline)" strokeDasharray="0" />
        <text x={pad.left} y={py(100) - 7} fill="var(--muted)" fontSize="10">
          2020 = 100
        </text>

        <polygon points={area(fatal)} fill="url(#fatal-wash)" />
        <polyline points={line(injury)} fill="none" stroke="var(--series-1)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={line(fatal)} fill="none" stroke="var(--series-2)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {[
          { vals: fatal, color: "var(--series-2)", label: "fatal" },
          { vals: injury, color: "var(--series-1)", label: "reported" },
        ].map((s) => (
          <g key={s.label}>
            <circle
              cx={px(years.length - 1)}
              cy={py(s.vals[years.length - 1])}
              r="4"
              fill={s.color}
              stroke="var(--surface)"
              strokeWidth="2"
            />
            <text
              x={px(years.length - 1) + 10}
              y={py(s.vals[years.length - 1])}
              dominantBaseline="middle"
              fontSize="11"
              fill="var(--ink-2)"
            >
              <tspan fontWeight="600" fill="var(--ink)" className="tnum">
                {Math.round(s.vals[years.length - 1])}
              </tspan>
              <tspan dx="4">{s.label}</tspan>
            </text>
          </g>
        ))}

        {years.map((y, i) => (
          <text
            key={y}
            x={px(i)}
            y={H - 8}
            textAnchor={i === 0 ? "start" : i === years.length - 1 ? "end" : "middle"}
            fontSize="10.5"
            fill="var(--muted)"
            className="tnum"
          >
            {y}
          </text>
        ))}
      </svg>
    </figure>
  );
}
