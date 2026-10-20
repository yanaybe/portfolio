"use client";

import { useState } from "react";
import { ChartCard } from "@/components/charts/chart-frame";
import { seriesColors } from "@/lib/chart-colors";
import { GroupedColumns } from "@/components/charts/bar-chart";
import { roadSafety } from "@/lib/data/road-safety";

export function HotspotChart() {
  const [size, setSize] = useState<20 | 50>(20);
  const rows = roadSafety.hotspots.filter((h) => h.size === size);
  const raw = rows.find((r) => r.method === "Raw crash count")!;
  const eb = rows.find((r) => r.method === "Empirical Bayes")!;

  return (
    <ChartCard
      question="Q3 · Where should the money go?"
      title={`Promised vs delivered: top ${size} road segments`}
      takeaway={
        <>
          Ranking segments by raw crash counts picks the unluckiest years, not the most dangerous
          roads: its top {size} promised{" "}
          <strong className="font-semibold text-ink">{Math.round(raw.predicted)}</strong>{" "}
          fatal-or-serious crashes in 2023–24 and delivered{" "}
          <strong className="font-semibold text-ink">{raw.actual}</strong> — over-promising by{" "}
          {Math.round(raw.errorPct)}%. An empirical-Bayes ranking, which pulls each segment back
          toward what similar roads see, picked segments with {eb.actual - raw.actual} more actual
          serious crashes.
        </>
      }
      controls={
        <div className="flex rounded-lg border border-line bg-surface-raised p-0.5">
          {([20, 50] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`rounded-[7px] px-2.5 py-1 text-xs font-medium transition-colors ${
                size === s ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"
              }`}
            >
              Top {s}
            </button>
          ))}
        </div>
      }
      legend={[
        { label: "Predicted from the selection years", color: seriesColors[0] },
        { label: "Actually happened in 2023–24", color: seriesColors[1] },
      ]}
      table={{
        caption: "Predicted and actual fatal-or-serious crashes for each ranking method",
        head: ["Ranking method", "List size", "Predicted", "Actual", "Error"],
        rows: roadSafety.hotspots.map((h) => [
          h.method,
          `Top ${h.size}`,
          Math.round(h.predicted),
          h.actual,
          `${h.errorPct > 0 ? "+" : "−"}${Math.abs(Math.round(h.errorPct))}%`,
        ]),
      }}
      source={
        <>
          Segments are 1 km of interurban road ({roadSafety.segmentCount.toLocaleString("en-US")} of
          them). Selection uses 2020–2022; the test uses 2023–2024, which the ranking never saw. The
          negative-binomial over-dispersion α fitted at {roadSafety.ebAlpha}. Light-injury crashes
          stand in for traffic volume, because public data has no count per segment — the main
          limitation of this method.
        </>
      }
    >
      <GroupedColumns
        groups={["Ranked by raw counts", "Ranked by empirical Bayes"]}
        series={[
          {
            label: "Predicted",
            color: seriesColors[0],
            values: [Math.round(raw.predicted), Math.round(eb.predicted)],
          },
          { label: "Actual", color: seriesColors[1], values: [raw.actual, eb.actual] },
        ]}
        yLabel="fatal or serious crashes, 2023–24"
        ariaLabel={`Grouped columns comparing predicted and actual fatal-or-serious crashes for the top ${size} segments under each ranking method.`}
      />
    </ChartCard>
  );
}
