import type { Metadata } from "next";
import { CaseHeader, CaseSection, DecisionTable, NextProject } from "@/components/case-study";
import { CodeBlock } from "@/components/code-block";
import { TrendChart } from "@/components/showcase/trend-chart";
import { Callout, FactList, FlowDiagram, PrimaryLink, SecondaryLink, StatTile } from "@/components/ui";
import { roadSafety } from "@/lib/data/road-safety";
import { fmtInt } from "@/lib/format";
import { getProject } from "@/lib/projects";

const project = getProject("israel-road-safety")!;

export const metadata: Metadata = {
  title: project.title,
  description:
    "49,941 police-recorded injury crashes in Israel (CBS, 2020–2024): reported crashes fell 23% while fatal crashes rose 42%. Severity model at AUC 0.76 and a hotspot ranking validated on held-out years.",
  openGraph: {
    title: project.title,
    description:
      "49,941 police-recorded injury crashes in Israel (CBS, 2020–2024): reported crashes fell 23% while fatal crashes rose 42%. Severity model at AUC 0.76 and a hotspot ranking validated on held-out years.",
    url: "/projects/israel-road-safety",
    type: "article",
  },
  alternates: { canonical: "/projects/israel-road-safety" },
};

export default function Page() {
  return (
    <>
      <CaseHeader project={project} />

      <CaseSection
        eyebrow="The question"
        title="A falling number that does not mean what it looks like"
        lead={
          <>
            <p>
              Israel&apos;s police-recorded injury crashes fell from 10,836 in 2020 to 8,315 in
              2024. Reported like that, it reads as progress. I wanted to know whether it was.
            </p>
            <p>
              The objective was not “explore a dataset”. It was to answer three questions
              a transport ministry actually has to act on: are the roads getting safer, what makes a
              crash deadly, and where should engineering money go? Each one has a different failure
              mode — a measurement artefact, a confounded model, and regression to the mean.
            </p>
          </>
        }
      >
        <FactList
          items={[
            { term: "My role", value: project.role },
            {
              term: "Data",
              value: (
                <>
                  Central Bureau of Statistics, <em>Road accidents with casualties, Public Use
                  File</em>, 2020–2024, open licence. {fmtInt(roadSafety.totalCrashes)} crashes, 46
                  fields, de-identified by design. Fetched through the data.gov.il datastore API,
                  with the raw files committed so CI does not depend on the site.
                </>
              ),
            },
            { term: "Stack", value: project.stack.join(" · ") },
            { term: "Methods", value: project.methods.join(" · ") },
          ]}
        />
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Finding 1"
        title="The fall is in the series that depends on paperwork"
        lead={
          <p>
            Light-injury crashes were 80% of the records in 2020, and whether one is recorded
            depends on police attending and filing. Fatal crashes are almost never missed. Splitting
            the total by severity reverses the story: the reported total fell{" "}
            {Math.abs(Math.round(roadSafety.changePct.injury_crashes))}%, fatal crashes rose{" "}
            {Math.round(roadSafety.changePct.fatal)}% and serious crashes rose {Math.round(roadSafety.changePct.serious)}%.
          </p>
        }
      >
        <TrendChart />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatTile
            label="Fatal or serious share"
            value="20.2% → 34.4%"
            detail="Of all recorded injury crashes, 2020 to 2024."
          />
          <StatTile
            label="Excluding Judea & Samaria"
            value={`+${Math.round(roadSafety.fatalExclJsChangePct)}%`}
            detail="Fatal crashes, on the narrower scope some published figures use."
          />
          <StatTile
            label="External check"
            value="±2 crashes"
            detail="Reconciled against the Road Safety Authority's published fatal counts, in a test."
          />
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="How it is built"
        title="A chain where every number has to survive a re-run"
        lead={
          <p>
            The point of the architecture is that no figure in the write-up is retyped. SQL produces
            the aggregates, Python fits the models and writes every number into{" "}
            <code className="font-mono text-[14px]">findings.md</code> and{" "}
            <code className="font-mono text-[14px]">results.json</code>, and CI re-runs the chain and
            fails if a committed number changes. This site reads those same files.
          </p>
        }
      >
        <FlowDiagram
          stages={[
            { label: "data.gov.il datastore", detail: "paged API · raw CSV committed" },
            { label: "DuckDB SQL", detail: "00_load → 05, one file per question" },
            { label: "Aggregates", detail: "analysis/aggregates/*.csv" },
            { label: "statsmodels", detail: "logit · negative binomial" },
            { label: "findings.md + results.json", detail: "the only source of numbers", tone: "accent" },
            { label: "reproduce.yml", detail: "re-runs, diffs, fails", tone: "ghost" },
          ]}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
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
          />
          <CodeBlock
            lang="sql"
            filename="sql/04_road_segments.sql"
            code={`-- Q3. Interurban road segments of 1 km (road number + km), with
-- fatal-or-serious counts in a "selection" period (2020-2022) and a
-- "test" period (2023-2024). km markers are in units of 100 m;
-- negative markers are data errors and excluded.
select
    cast(road_number as integer)                           as road,
    cast(floor(km_tenths / 10) as integer)                 as km,
    count(*)                                               as injury_crashes,
    count(*) filter (where severity <= 2 and year <= 2022) as ksi_2020_22,
    count(*) filter (where severity <= 2 and year >= 2023) as ksi_2023_24,
    count(*) filter (where severity = 3)                   as light_all_years,
    mode(district)                                         as district
from accidents
where road_type in (3, 4) and road_number is not null and km_tenths >= 0
group by 1, 2
order by road, km;`}
          />
        </div>
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Decisions"
        title="The calls that changed the answer"
        lead={
          <p>
            Most of the work in this project was not modelling. It was deciding what the data was
            allowed to say.
          </p>
        }
      >
        <DecisionTable
          rows={[
            {
              decision: "Keep “unknown” as a category instead of dropping those rows",
              why: "Missingness is not random: crashes with an unknown speed limit are 65% fatal or serious against 21% when it is known. Dropping them would have quietly removed the most severe crashes from every model.",
            },
            {
              decision: "Judge the trend on fatal crashes, not the total",
              why: "Fatal crashes are recorded almost without fail; light-injury crashes depend on reporting. The analysis says what it cannot resolve — how much of the light-injury decline is real — rather than picking the flattering reading.",
            },
            {
              decision: "Cross-validate by holding out whole years, not random rows",
              why: "Crashes in the same year share conditions, enforcement and reporting practice. Random splits would have leaked a year into its own training set and inflated the AUC.",
            },
            {
              decision: "Use light-injury crashes as a proxy for traffic volume",
              why: "There is no public traffic count per segment, and busy roads have more fender-benders. It is the weakest link in the hotspot ranking, so it is stated as the main limitation rather than buried.",
            },
            {
              decision: "Rank sites by empirical-Bayes excess risk, then test it on unseen years",
              why: "A top-20 list by raw count over-promises by 47%, because it selects the unluckiest years. The shrunk ranking under-promises instead, and picked segments with more real serious crashes in the following two years.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        eyebrow="Results and limits"
        title="What the analysis supports, and what it does not"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Callout title="Supported by the data">
              <ul className="space-y-2">
                <li>
                  Fatal crashes rose {Math.round(roadSafety.changePct.fatal)}% and serious crashes{" "}
                  {Math.round(roadSafety.changePct.serious)}% between 2020 and 2024, while the reported total
                  fell.
                </li>
                <li>
                  {Math.round(roadSafety.interurbanShareOfFatalIncrease)}% of the rise in fatal crashes happened
                  on interurban roads.
                </li>
                <li>
                  A logistic severity model reaches a cross-validated AUC of {roadSafety.cvAuc.toFixed(2)} with
                  interpretable odds ratios: 100–120 km/h limits ×3.3, interurban between junctions
                  ×2.8, night without working lights ×2.2.
                </li>
                <li>
                  An empirical-Bayes site ranking beats raw counts on years it never saw — the only
                  test that matters for a ranking.
                </li>
              </ul>
            </Callout>
          </div>
          <div className="space-y-4">
            <Callout title="Limitations, stated up front" tone="warn">
              <ul className="space-y-2">
                <li>
                  The data cannot separate the real fall in light-injury crashes from a fall in
                  reporting.
                </li>
                <li>
                  No exposure measure per segment, so the hotspot method leans on a proxy for
                  traffic.
                </li>
                <li>
                  Crash records describe crashes, not near misses, and severity is the worst
                  casualty rather than a measure of total harm.
                </li>
                <li>
                  Observational data: the odds ratios describe associations under controls, not
                  interventions.
                </li>
              </ul>
            </Callout>
            <Callout title="What I would do differently">
              <p>
                I found the infinite coordinate because the dashboard map broke, not because a test
                caught it. Validating the projection&apos;s output range belonged in the data-quality
                tests from the start, and it is there now.
              </p>
            </Callout>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryLink href="/analytics">Open the interactive version</PrimaryLink>
          <SecondaryLink href="https://github.com/yanaybe/israel-road-safety-analysis" external>
            Repository
          </SecondaryLink>
          <SecondaryLink href="https://yanaybe.github.io/israel-road-safety-analysis/" external>
            Live dashboard
          </SecondaryLink>
        </div>
      </CaseSection>

      <NextProject slug="detour" kind="AI engineering" title="Detour: turning something you heard about into a place you can find" />
    </>
  );
}
