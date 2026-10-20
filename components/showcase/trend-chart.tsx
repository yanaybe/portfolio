"use client";

import { useState } from "react";
import { ChartCard } from "@/components/charts/chart-frame";
import { seriesColors } from "@/lib/chart-colors";
import { LineChart } from "@/components/charts/line-chart";
import { roadSafety } from "@/lib/data/road-safety";
import { fmtInt } from "@/lib/format";

const SERIES = [
  { key: "fatal", label: "Fatal", color: seriesColors[1] },
  { key: "serious", label: "Serious", color: seriesColors[3] },
  { key: "injury", label: "All injury", color: seriesColors[0] },
  { key: "light", label: "Light", color: seriesColors[2] },
] as const;

type Mode = "indexed" | "counts";

export function TrendChart() {
  const [mode, setMode] = useState<Mode>("indexed");
  const years = roadSafety.byYear.map((y) => y.year);
  const base = roadSafety.byYear[0];

  const series = SERIES.map((s) => ({
    label: s.label,
    color: s.color,
    values: roadSafety.byYear.map((y) =>
      mode === "indexed" ? (y[s.key] / base[s.key]) * 100 : y[s.key],
    ),
  }));

  return (
    <ChartCard
      question="Q1 · Are the roads getting safer?"
      title={
        mode === "indexed"
          ? "Crashes by severity, indexed to 2020 = 100"
          : "Crashes by severity, counts per year"
      }
      takeaway={
        <>
          Read the total and the roads look {Math.abs(Math.round(roadSafety.changePct.injury_crashes))}% safer.
          The total is mostly light-injury crashes, and whether those are recorded depends on police
          attending and filing. Fatal crashes are almost never missed — and they rose{" "}
          <strong className="font-semibold text-ink">{Math.round(roadSafety.changePct.fatal)}%</strong> (
          {Math.round(roadSafety.fatalExclJsChangePct)}% excluding Judea &amp; Samaria).
        </>
      }
      controls={
        <div className="flex rounded-lg border border-line bg-surface-raised p-0.5">
          {(["indexed", "counts"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded-[7px] px-2.5 py-1 text-xs font-medium transition-colors ${
                mode === m ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"
              }`}
            >
              {m === "indexed" ? "Indexed" : "Counts"}
            </button>
          ))}
        </div>
      }
      legend={series.map((s) => ({ label: s.label, color: s.color, kind: "line" as const }))}
      table={{
        caption: "Injury crashes in Israel by severity and year",
        head: ["Year", "Injury crashes", "Fatal", "Serious", "Light", "Fatal or serious %"],
        rows: roadSafety.byYear.map((y) => [
          y.year,
          y.injury,
          y.fatal,
          y.serious,
          y.light,
          `${y.ksiSharePct}%`,
        ]),
      }}
      source={
        <>
          Source: Israel Central Bureau of Statistics, <em>Road accidents with casualties, Public
          Use File</em>, 2020–2024 (open licence), {fmtInt(roadSafety.totalCrashes)} crashes.
          Severity is the crash&apos;s worst casualty.
        </>
      }
    >
      <LineChart
        x={years}
        series={series}
        baselineAt={mode === "indexed" ? 100 : undefined}
        format={
          mode === "indexed"
            ? { style: "fixed", digits: 1, suffix: " (2020 = 100)" }
            : { style: "int", suffix: " crashes" }
        }
        labelFormat={mode === "indexed" ? { style: "fixed", digits: 0 } : { style: "compact" }}
        ariaLabel="Line chart of injury crashes in Israel by severity, 2020 to 2024. Fatal and serious crashes rise while light-injury and total crashes fall."
      />
    </ChartCard>
  );
}
