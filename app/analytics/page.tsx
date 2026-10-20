import type { Metadata } from "next";
import { ChartCard } from "@/components/charts/chart-frame";
import { HorizontalBars } from "@/components/charts/bar-chart";
import { DotCiChart } from "@/components/charts/dot-ci-chart";
import { Heatmap } from "@/components/charts/heatmap";
import { CodeBlock } from "@/components/code-block";
import { HotspotChart } from "@/components/showcase/hotspot-chart";
import { TrendChart } from "@/components/showcase/trend-chart";
import { Callout, FlowDiagram, Pill, SecondaryLink, StatTile, TextLink } from "@/components/ui";
import { roadSafety } from "@/lib/data/road-safety";
import { fmtInt } from "@/lib/format";

export const metadata: Metadata = {
  title: "Interactive data showcase — are Israel's roads getting safer?",
  description:
    "A full analysis of 49,941 police-recorded injury crashes in Israel (CBS public data, 2020–2024): the trend that reverses when you read the right series, a logistic severity model with confidence intervals, and a hotspot ranking validated on held-out years.",
  openGraph: {
    title: "Interactive data showcase — are Israel's roads getting safer?",
    description:
      "A full analysis of 49,941 police-recorded injury crashes in Israel (CBS public data, 2020–2024): the trend that reverses when you read the right series, a logistic severity model with confidence intervals, and a hotspot ranking validated on held-out years.",
    url: "/analytics",
    type: "article",
  },
  alternates: { canonical: "/analytics" },
};

const OR_LABELS: Record<string, string> = {
  "crash: Head-on": "Head-on collision",
  "crash: Pedestrian hit": "Pedestrian hit",
  "crash: Off-road / rollover": "Off-road / rollover",
  "crash: Hit fixed object": "Hit a fixed object",
  "road: Interurban, between junctions": "Interurban, between junctions",
  "road: Interurban, junction": "Interurban junction",
  "speed_limit: 100-120": "Speed limit 100–120 km/h",
  "speed_limit: 80-90": "Speed limit 80–90 km/h",
  "light: Night, unlit or broken lights": "Night, unlit or broken lights",
  "light: Night, lit": "Night, lit street",
  "weekend: True": "Weekend",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}`);

const DATA_ISSUES = [
  {
    issue: "The codebook is a single Hebrew column, with labels containing commas and quotes",
    fix: "Parsed into a lookup table in SQL; a test asserts every code used has a label.",
  },
  {
    issue: "Time is a 15-minute slot from 1 to 96, not an hour",
    fix: "Converted to hour of day: (slot − 1) // 4.",
  },
  {
    issue: "Location uses the Israeli Transverse Mercator grid, not latitude/longitude",
    fix: "Projected EPSG:2039 → WGS84 with pyproj; one point converts to infinity and is dropped by a bounding box.",
  },
  {
    issue: "Road kilometre markers are in units of 100 m, and 36 of them are negative",
    fix: "Grouped into 1 km segments; negative markers excluded, with a test that enforces it.",
  },
  {
    issue: "“Unknown” is not random — unknown speed limit is 65% fatal or serious against 21% when known",
    fix: "Kept “unknown” as its own category in every model rather than dropping those rows, which would have biased the result.",
  },
  {
    issue: "Published national figures use different scopes (with or without Judea & Samaria)",
    fix: "Reported both, and reconciled against the Road Safety Authority's published fatal counts in a test.",
  },
];

export default function AnalyticsPage() {
  const decomposition = [...roadSafety.decomposition]
    .sort((a, b) => b.change - a.change)
    .slice(0, 8)
    .map((d) => ({
      label: `${d.road} · ${d.kind}`,
      value: d.change,
      emphasis: d.road === "Interurban",
      detail: (
        <>
          {d.road}, {d.kind.toLowerCase()}: {d.y2020} fatal crashes in 2020 → {d.y2024} in 2024
        </>
      ),
    }));

  const oddsRatios = [...roadSafety.oddsRatios]
    .sort((a, b) => b.or - a.or)
    .map((d) => ({ label: OR_LABELS[d.label] ?? d.label, value: d.or, lo: d.lo, hi: d.hi }));

  const cells = roadSafety.heatmap.map(([weekday, hour, crashes, ksi]) => ({
    row: weekday - 1,
    col: hour,
    value: crashes,
    extra: `${ksi} fatal or serious`,
  }));

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="grid-field absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="accent">Interactive data showcase</Pill>
            <Pill>Real public data</Pill>
            <Pill>Reproducible in CI</Pill>
          </div>
          <h1 className="mt-6 max-w-3xl text-[2.4rem] font-semibold leading-[1.05] text-ink sm:text-[3.4rem]">
            Israel reports fewer road crashes every year. Are the roads getting safer?
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-2">
            No — and the gap between those two sentences is the whole analysis. This page walks the
            question end to end on {fmtInt(roadSafety.totalCrashes)} police-recorded injury crashes
            from the Central Bureau of Statistics: what the data can support, what it cannot, and
            what I would tell someone deciding where safety money goes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <SecondaryLink href="https://github.com/yanaybe/israel-road-safety-analysis" external>
              Repository
            </SecondaryLink>
            <SecondaryLink href="https://yanaybe.github.io/israel-road-safety-analysis/" external>
              Standalone dashboard
            </SecondaryLink>
            <SecondaryLink href="https://data.gov.il/datasets/lamas/2023-puf" external>
              The raw dataset
            </SecondaryLink>
          </div>
        </div>
      </header>

      {/* headline numbers */}
      <section className="border-b border-line bg-bg-tint">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Fatal crashes, 2020 → 2024
              </p>
              <p className="mt-2 text-[4.5rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                +{Math.round(roadSafety.changePct.fatal)}%
              </p>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-2">
                Over the same five years the number of <em>reported</em> injury crashes fell{" "}
                {Math.abs(Math.round(roadSafety.changePct.injury_crashes))}%. Both numbers are correct. Only one
                of them measures danger.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <StatTile
                label="Serious crashes"
                value={`+${Math.round(roadSafety.changePct.serious)}%`}
                detail="Rose alongside fatal crashes."
              />
              <StatTile
                label="Light-injury crashes"
                value={`${Math.round(roadSafety.changePct.light)}%`}
                detail="The entire fall in the total, and the series most exposed to reporting."
              />
              <StatTile
                label="Interurban roads"
                value={`${Math.round(roadSafety.interurbanShareOfFatalIncrease)}%`}
                detail="Share of the rise in fatal crashes that happened outside cities."
              />
              <StatTile
                label="Severity model"
                value={`AUC ${roadSafety.cvAuc.toFixed(2)}`}
                detail="Cross-validated by holding out whole years."
              />
            </div>
          </div>
        </div>
      </section>

      {/* method strip */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-semibold text-ink">How the analysis runs</h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-ink-2">
            Nothing here is hand-copied. The raw files are committed, SQL builds the aggregates,
            Python fits the models and writes every number into a findings file, and GitHub Actions
            re-runs the whole chain on every push — failing if a committed number changes.
          </p>
          <div className="mt-8">
            <FlowDiagram
              stages={[
                { label: "CBS public use file", detail: "data.gov.il API → data/raw/*.csv" },
                { label: "SQL models", detail: "DuckDB · sql/00_load … 05" },
                { label: "Aggregates", detail: "analysis/aggregates/*.csv" },
                { label: "Python analysis", detail: "pandas · statsmodels · pyproj" },
                { label: "Findings + figures", detail: "findings.md · results.json", tone: "accent" },
                { label: "CI gate", detail: "reproduce.yml re-runs and compares", tone: "ghost" },
              ]}
              caption="The numbers on this page are generated from that findings file, not retyped from it."
            />
          </div>

          <div className="mt-10 min-w-0 overflow-hidden rounded-2xl border border-line">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Data quality issues and how each was handled</caption>
              <thead className="bg-surface-2 text-ink-2">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    What was wrong with the data
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    What I did about it
                  </th>
                </tr>
              </thead>
              <tbody>
                {DATA_ISSUES.map((row) => (
                  <tr key={row.issue} className="border-t border-line bg-surface align-top">
                    <td className="px-5 py-4 text-ink">{row.issue}</td>
                    <td className="px-5 py-4 leading-relaxed text-ink-2">{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* the four questions */}
      <section className="bg-bg-tint">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-16 sm:px-8 sm:py-20">
          <TrendChart />

          <div className="grid gap-8">
            <ChartCard
              question="Q1b · Where did the extra deaths come from?"
              title="Change in fatal crashes by road type and collision, 2020 → 2024"
              takeaway={
                <>
                  {Math.round(roadSafety.interurbanShareOfFatalIncrease)}% of the increase happened on
                  interurban roads. Fatal pedestrian crashes outside cities nearly tripled, from 13
                  to 36.
                </>
              }
              table={{
                caption: "Fatal crashes in 2020 and 2024 by road type and collision kind",
                head: ["Road", "Collision", "2020", "2024", "Change"],
                rows: roadSafety.decomposition.map((d) => [
                  d.road,
                  d.kind,
                  d.y2020,
                  d.y2024,
                  d.change > 0 ? `+${d.change}` : d.change,
                ]),
              }}
              source="Bars in full colour are interurban; the greyed bars are urban. Hover a bar for its 2020 and 2024 counts."
            >
              <HorizontalBars
                data={decomposition}
                format={{ style: "signed" }}
                ariaLabel="Change in fatal crashes between 2020 and 2024 by road type and collision kind"
                labelWidth="12.5rem"
              />
            </ChartCard>

            <ChartCard
              question="Q2 · What turns a crash into a fatal one?"
              title="Odds of a crash being fatal, with 95% confidence intervals"
              takeaway={
                <>
                  Speed and darkness, on roads between junctions. A logistic model over all{" "}
                  {fmtInt(roadSafety.totalCrashes)} crashes, cross-validated by holding out whole
                  years (AUC {roadSafety.cvAuc.toFixed(2)}). Intervals that cross 1 mean the data cannot
                  separate that factor from nothing.
                </>
              }
              table={{
                caption: "Odds ratios with 95% confidence intervals",
                head: ["Factor", "Odds ratio", "95% CI low", "95% CI high"],
                rows: oddsRatios.map((d) => [
                  d.label,
                  d.value.toFixed(2),
                  d.lo.toFixed(2),
                  d.hi.toFixed(2),
                ]),
              }}
              source="Reference categories: urban road between junctions, speed limit up to 50 km/h, daylight, front-to-side collision. Year is a control; “unknown” is kept as its own level throughout."
            >
              <DotCiChart
                data={oddsRatios}
                ariaLabel="Odds ratios for a crash being fatal, with 95% confidence intervals, on a logarithmic axis"
              />
            </ChartCard>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatTile
              label="Pedestrian hit, lit city street, night"
              value={`${roadSafety.pedestrianCityLitPct}%`}
              detail="Modelled probability the crash is fatal."
            />
            <StatTile
              label="Pedestrian hit, unlit 80–90 road, night"
              value={`${roadSafety.pedestrianInterurbanUnlitPct}%`}
              detail="Same collision, same model, different road."
            />
            <StatTile
              label="Fatal share, 00:00–06:00"
              value={`${roadSafety.fatalRateNightPct}%`}
              detail={`Against ${roadSafety.fatalRateDayPct}% between 08:00 and 18:00.`}
            />
          </div>

          <ChartCard
            question="Q4 · When do crashes happen, and when do they kill?"
            title="Injury crashes by hour and weekday"
            takeaway={
              <>
                Volume peaks on weekday afternoons — but severity does not follow volume. Crashes
                between midnight and 06:00 are fatal {roadSafety.fatalRateNightPct}% of the time
                against {roadSafety.fatalRateDayPct}% in the working day, and Saturday is the
                deadliest day per crash.
              </>
            }
            table={{
              caption: "Fatal share of injury crashes by weekday",
              head: ["Weekday", "Fatal share of crashes"],
              rows: roadSafety.fatalRateByWeekday.map((d) => [d.day, `${d.pct}%`]),
            }}
            source="Cells are crash counts across all five years; the readout also gives the fatal-or-serious count. Counts rather than rates, because some night-time cells hold too few crashes for a stable rate."
          >
            <Heatmap
              cells={cells}
              rowLabels={DAYS}
              colLabels={HOURS}
              unit="crashes"
              ariaLabel="Heatmap of injury crashes by weekday and hour of day, 2020 to 2024"
            />
          </ChartCard>

          <HotspotChart />

          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ChartCard
              title="The segments the corrected ranking picks"
              question="Q3b · Which roads, concretely?"
              takeaway="Ranked by excess risk per year over similar roads, not by raw count. Roads 20, 4 and 44 dominate either way, which is a reassuring sign that the correction moved the ordering rather than the subject."
              source="Excess per year = empirical-Bayes estimate minus the expected count for similar segments (same road class, same light-injury volume)."
            >
              <div
                tabIndex={0}
                role="region"
                aria-label="Top interurban kilometre segments by excess risk"
                className="thin-scroll max-h-[420px] overflow-auto rounded-lg border border-line"
              >
                <table className="w-full border-collapse text-left text-[13px]">
                  <caption className="sr-only">
                    Top interurban kilometre segments by excess fatal-or-serious risk per year
                  </caption>
                  <thead className="sticky top-0 bg-surface-2 text-ink-2">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-medium">Road</th>
                      <th scope="col" className="px-3 py-2 font-medium">km</th>
                      <th scope="col" className="px-3 py-2 font-medium">District</th>
                      <th scope="col" className="px-3 py-2 font-medium">Fatal/serious</th>
                      <th scope="col" className="px-3 py-2 font-medium">Excess / yr</th>
                    </tr>
                  </thead>
                  <tbody className="tnum">
                    {roadSafety.topSegments.map((s) => (
                      <tr key={`${s.road}-${s.km}`} className="border-t border-line">
                        <td className="px-3 py-2 font-semibold text-ink">{s.road}</td>
                        <td className="px-3 py-2 text-ink-2">{s.km}</td>
                        <td className="px-3 py-2 text-ink-2">{s.district}</td>
                        <td className="px-3 py-2 text-ink-2">{s.ksi}</td>
                        <td className="px-3 py-2 text-ink-2">{s.excessPerYear.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartCard>

            <div className="min-w-0 space-y-5">
              <CodeBlock
                lang="sql"
                filename="sql/01_trend_by_severity.sql"
                code={`-- Q1. Are roads getting safer? Crashes per year by severity, with and
-- without Judea & Samaria (published national figures use different scopes).
select
    year,
    count(*)                                                      as injury_crashes,
    count(*) filter (where severity = 1)                          as fatal,
    count(*) filter (where severity = 2)                          as serious,
    count(*) filter (where severity = 3)                          as light,
    count(*) filter (where severity = 1 and not is_judea_samaria) as fatal_excl_js,
    round(100.0 * count(*) filter (where severity <= 2) / count(*), 1)
                                                                  as ksi_share_pct
from accidents
group by year
order by year;`}
                caption="One of six SQL models. The scope caveat is in the query, not in a footnote nobody reads."
              />
              <CodeBlock
                lang="python"
                filename="analysis/run_analysis.py"
                code={`def empirical_bayes(seg, count, light):
    """Shrink each segment's fatal+serious count towards what similar segments see.

    "Similar" = same road class and the same volume of light-injury crashes,
    which stands in for traffic: there is no public traffic count per segment,
    but busy roads have more fender-benders. A negative binomial gives the
    expected count mu and over-dispersion alpha; the estimate is
    w*mu + (1-w)*observed, with w = 1 / (1 + mu*alpha).
    """
    d = seg.assign(
        cls=np.select([seg.road < 100, seg.road < 1000], ["national", "regional"], "local"),
        log_light=np.log1p(seg[light]),
        y=seg[count],
    )
    m = smf.negativebinomial("y ~ C(cls) + log_light", data=d).fit(disp=0, maxiter=300)
    alpha = float(m.params["alpha"])
    mu = m.predict(d)
    w = 1 / (1 + mu * alpha)
    return w * mu + (1 - w) * d.y, mu, {"alpha": alpha}`}
                caption="The shrinkage step behind the corrected ranking, with its own limitation written into the docstring."
              />
            </div>
          </div>
        </div>
      </section>

      {/* decision + limits */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-[2rem] font-semibold leading-tight text-ink">
                What I would actually recommend
              </h2>
              <ol className="mt-6 space-y-4">
                {[
                  "Track fatal and serious crashes, not total crashes. The total is a reporting metric wearing a safety metric's clothes.",
                  "Target lighting and pedestrian crossings on interurban roads: that is where 91% of the extra deaths came from, and where darkness multiplies the odds 2.2×.",
                  "Choose engineering sites by excess risk over similar roads, validated on years the ranking never saw — not by last year's top-20 list.",
                  "Publish a traffic volume per segment. Every hotspot method in this analysis is limited by having to use light-injury crashes as a proxy for exposure.",
                ].map((item, i) => (
                  <li key={item} className="flex gap-4">
                    <span className="tnum mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line bg-surface text-[13px] font-semibold text-accent-ink">
                      {i + 1}
                    </span>
                    <p className="text-[15.5px] leading-relaxed text-ink-2">{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <Callout title="What this analysis cannot tell you" tone="warn">
                <p>
                  How much of the light-injury decline is real and how much is reporting. The data
                  has no exposure measure per segment, so the hotspot ranking leans on a proxy.
                  Crash records describe crashes, not near misses, and severity is the worst casualty
                  rather than a continuous measure of harm.
                </p>
              </Callout>
              <Callout title="Reproduce it yourself">
                <p>
                  <code className="font-mono text-[12.5px]">pip install -r requirements.txt</code>,
                  then{" "}
                  <code className="font-mono text-[12.5px]">python analysis/run_analysis.py</code>{" "}
                  and <code className="font-mono text-[12.5px]">python -m pytest -q</code>. The
                  figures and every number in <code className="font-mono text-[12.5px]">findings.md</code>{" "}
                  regenerate; CI does the same on every push and fails on any difference.
                </p>
                <p>
                  <TextLink href="https://github.com/yanaybe/israel-road-safety-analysis" external>
                    The repository
                  </TextLink>
                </p>
              </Callout>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
