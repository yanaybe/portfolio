import type { Metadata } from "next";
import { HorizontalBars, GroupedColumns } from "@/components/charts/bar-chart";
import { ChartCard } from "@/components/charts/chart-frame";
import { seriesColors } from "@/lib/chart-colors";
import { LineChart } from "@/components/charts/line-chart";
import { CaseHeader, CaseSection, DecisionTable, NextProject } from "@/components/case-study";
import { CodeBlock } from "@/components/code-block";
import { Callout, FactList, FlowDiagram, SecondaryLink, StatTile } from "@/components/ui";
import { navigationAnalytics as nav } from "@/lib/data/navigation";
import { fmtInt, fmtP } from "@/lib/format";
import { getProject } from "@/lib/projects";

const project = getProject("navigation-analytics")!;

export const metadata: Metadata = {
  title: "Product analytics: did the two releases actually work?",
  description:
    "Funnel drop-off, release impact measured against a control path, a Simpson's-paradox mix shift that inflated the headline, and a retention finding that changed the roadmap. SQL and Python, reproducible in CI.",
  openGraph: {
    title: "Product analytics: did the two releases actually work?",
    description:
      "Funnel drop-off, release impact measured against a control path, a Simpson's-paradox mix shift that inflated the headline, and a retention finding that changed the roadmap. SQL and Python, reproducible in CI.",
    url: "/projects/navigation-analytics",
    type: "article",
  },
  alternates: { canonical: "/projects/navigation-analytics" },
};

const releases = ["1.0.12", "1.0.14", "1.0.15", "1.0.16", "1.0.17"];
const rateFor = (origin: string) =>
  releases.map((r) => nav.releaseWindows.find((w) => w.release === r && w.origin === origin)!.ratePct);

const funnel = (origin: string) => nav.funnelByOrigin.find((f) => f.origin === origin)!;

export default function Page() {
  const button = funnel("button");
  const share = funnel("share");
  const buttonFailures = nav.failureReasons
    .filter((f) => f.origin === "button")
    .map((f) => ({
      label: f.reason.replace(/_/g, " "),
      value: f.failures,
      emphasis: f.reason === "transcription",
    }));

  return (
    <>
      <CaseHeader project={project} />

      <CaseSection
        eyebrow="The brief"
        title="A client with a dashboard and a suspicion"
        lead={
          <>
            <p>
              The app&apos;s core action is pressing a button to save a place you have just heard
              about, so it can remind you when you drive past. That action failed too often, two
              releases shipped fixes, and the dashboard showed recognition up 12 points. The client
              asked three things: where do we lose people, did the fixes work, and does any of it
              matter?
            </p>
            <p>
              The honest answer to the second question turned out to be “yes, but not by
              12 points”. Separating the real improvement from a shift in how people were saving
              places is the core of this case study.
            </p>
          </>
        }
      >
        <FactList
          items={[
            { term: "My role", value: project.role },
            {
              term: "Data",
              value:
                "The client and the app are not named, and production data includes users' saved places. Everything here runs on synthetic data generated against the production schema — the same tables, columns, event names and categories, with invented numbers. The SQL runs unchanged on production and returns only aggregates, with small cells suppressed.",
            },
            { term: "Stack", value: project.stack.join(" · ") },
            { term: "Methods", value: project.methods.join(" · ") },
          ]}
        />

        <div className="mt-8">
          <FlowDiagram
            stages={[
              { label: "press_started", detail: "one save attempt" },
              { label: "press_acquisition", detail: "audio or share received" },
              { label: "capture_started", detail: "recognition begins" },
              { label: "capture_recognized", detail: "a real place matched", tone: "accent" },
              { label: "place_saved", detail: "written to the user's list" },
            ]}
            caption="Events in one press share (install_id, press_id) — press_id is unique only per install, so every join uses both columns. A test enforces it."
          />
        </div>
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Finding 1"
        title="The funnel does not break where anyone expected"
        lead={
          <p>
            Acquisition is nearly perfect; recognition is where saves die. Only{" "}
            {nav.recognitionRates.button}% of button presses find a place, against{" "}
            {nav.recognitionRates.share}% of shares — and the gap is the mechanism, not the user.
          </p>
        }
      >
        <ChartCard
          question="Q1 · Where do we lose people?"
          title="Presses reaching each stage, by how the capture started"
          takeaway={
            <>
              Of {fmtInt(nav.overall.presses)} attempts, {fmtInt(nav.overall.placeSaved)} ended in a
              saved place. The drop is concentrated in one step: working out which real place was
              meant. {nav.noCaptureSharePct}% of presses never acquire anything at all.
            </>
          }
          legend={[
            { label: "Button press", color: seriesColors[0] },
            { label: "Shared content", color: seriesColors[1] },
          ]}
          table={{
            caption: "Presses reaching each funnel stage by capture origin",
            head: ["Origin", "Presses", "Acquired", "Place found", "Place saved"],
            rows: nav.funnelByOrigin.map((f) => [
              f.origin,
              f.presses,
              f.acquired,
              f.placeFound,
              f.placeSaved,
            ]),
          }}
          source="Synthetic data on the production schema. Every metric says “installs”, never “users”: an install is not a person, and reinstalls would inflate any per-person claim."
        >
          <GroupedColumns
            groups={["Press started", "Acquired", "Place found", "Place saved"]}
            series={[
              {
                label: "Button",
                color: seriesColors[0],
                values: [button.presses, button.acquired, button.placeFound, button.placeSaved],
              },
              {
                label: "Share",
                color: seriesColors[1],
                values: [share.presses, share.acquired, share.placeFound, share.placeSaved],
              },
            ]}
            yLabel="presses"
            ariaLabel="Grouped columns of presses reaching each funnel stage, split by button and share origins"
          />
        </ChartCard>
      </CaseSection>

      <CaseSection
        eyebrow="Finding 2"
        title="Both releases worked. The headline was still wrong."
        lead={
          <>
            <p>
              Each release targeted one path: v1.0.16 changed how shared content is read, v1.0.17
              changed microphone processing for the button. That gives a natural control — the path
              the release did not touch. Both targeted paths moved and both untouched paths did not,
              which is the pattern a real fix makes.
            </p>
            <p>
              The pooled headline of +{nav.mixShift.naivePooledPp} pp was inflated, because the mix
              of how people saved shifted at the same time: the share path, which recognises better,
              grew from {nav.mixShift.sharePathStartPct}% to {nav.mixShift.sharePathEndPct}% of
              attempts. Within each path the improvement is about{" "}
              {nav.mixShift.withinButtonPp} pp. That is Simpson&apos;s paradox, and the fix is to
              compare within origin and pool with Mantel-Haenszel (OR{" "}
              {nav.mixShift.mhOddsRatio}, 95% CI {nav.mixShift.mhCi[0]}–{nav.mixShift.mhCi[1]}).
            </p>
          </>
        }
      >
        <ChartCard
          question="Q2 · Did the fixes work?"
          title="Recognition rate by release window, per capture origin"
          takeaway="The share line steps up at v1.0.16 and holds; the button line steps up at v1.0.17. Neither moves on the release that did not target it."
          legend={[
            { label: "Button press", color: seriesColors[0], kind: "line" },
            { label: "Shared content", color: seriesColors[1], kind: "line" },
          ]}
          table={{
            caption: "Recognition attempts and rate by release window and origin",
            head: ["Release", "Origin", "Attempts", "Recognised", "Rate"],
            rows: nav.releaseWindows.map((w) => [
              w.release,
              w.origin,
              w.attempts,
              w.recognized,
              `${w.ratePct}%`,
            ]),
          }}
          source="Events do not record the app version, so each event is assigned to the release window it happened in. Late updaters are counted under the new release, which biases any measured effect towards zero — a conservative direction, confirmed by planted-effect recovery tests."
        >
          <LineChart
            x={releases}
            series={[
              { label: "Button", color: seriesColors[0], values: rateFor("button") },
              { label: "Share", color: seriesColors[1], values: rateFor("share") },
            ]}
            format={{ style: "pct", digits: 1, suffix: " recognised" }}
            labelFormat={{ style: "pct", digits: 0 }}
            ariaLabel="Recognition rate by release window for button and share origins. Share rises at version 1.0.16, button rises at 1.0.17."
          />
        </ChartCard>

        <div className="mt-8 min-w-0 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Measured change in recognition rate for each release, on the targeted and untargeted
              path
            </caption>
            <thead className="bg-surface-2 text-ink-2">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Comparison</th>
                <th scope="col" className="px-5 py-3 font-semibold">Change</th>
                <th scope="col" className="px-5 py-3 font-semibold">95% CI</th>
                <th scope="col" className="px-5 py-3 font-semibold">Significance</th>
                <th scope="col" className="px-5 py-3 font-semibold">Path</th>
              </tr>
            </thead>
            <tbody className="tnum">
              {nav.releaseTests.map((t) => (
                <tr key={t.name} className="border-t border-line bg-surface">
                  <td className="px-5 py-3.5 text-ink">{t.name}</td>
                  <td className="px-5 py-3.5 font-semibold text-ink">
                    {t.diffPp > 0 ? "+" : "−"}
                    {Math.abs(t.diffPp)} pp
                  </td>
                  <td className="px-5 py-3.5 text-ink-2">
                    {t.ci[0]} to {t.ci[1]} pp
                  </td>
                  <td className="px-5 py-3.5 text-ink-2">{fmtP(t.p)}</td>
                  <td className="px-5 py-3.5 text-ink-2">
                    {t.targeted ? "targeted by this release" : "control — untouched"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Finding 3"
        title="The first save decides whether anyone comes back"
        lead={
          <p>
            Recognition quality is not a polish item. Installs whose <em>first</em> save worked
            returned in weeks 2–4 at {nav.retention.firstSavedPct}%, against{" "}
            {nav.retention.firstNotSavedPct}% when it did not — {nav.retention.adjustedOddsRatio}×
            on the adjusted odds, controlling for cohort week and how the user saved.
          </p>
        }
      >
        <div className="grid items-start gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <StatTile
              label="First save worked"
              value={`${nav.retention.firstSavedPct}%`}
              detail={`Returned in weeks 2–4. 95% CI ${nav.retention.ciSaved[0]}–${nav.retention.ciSaved[1]}%.`}
            />
            <StatTile
              label="First save failed"
              value={`${nav.retention.firstNotSavedPct}%`}
              detail={`95% CI ${nav.retention.ciNotSaved[0]}–${nav.retention.ciNotSaved[1]}%.`}
            />
            <StatTile
              label="Adjusted odds ratio"
              value={`${nav.retention.adjustedOddsRatio}×`}
              detail={`95% CI ${nav.retention.adjustedOrCi[0]}–${nav.retention.adjustedOrCi[1]}, binomial GLM over ${fmtInt(nav.retention.installs)} installs with a full 28-day window.`}
            />
          </div>

          <ChartCard
            question="Q4 · Which failure should engineering fix first?"
            title="Why a button press failed to find a place"
            takeaway={
              <>
                Transcription was the single largest cause of button failures, and v1.0.17 cut it
                from {nav.transcriptionShareOfButtonFailures[0].pct}% of failures to{" "}
                {
                  nav.transcriptionShareOfButtonFailures[
                    nav.transcriptionShareOfButtonFailures.length - 1
                  ].pct
                }
                %. On the share path the top cause is different — no place named in the text at all —
                which is a product problem, not a model problem.
              </>
            }
            table={{
              caption: "Failure counts by origin and reason",
              head: ["Origin", "Reason", "Failures"],
              rows: nav.failureReasons.map((f) => [f.origin, f.reason.replace(/_/g, " "), f.failures]),
            }}
            source="Failure reasons come from a closed vocabulary in the event parameters; there is no free text anywhere in this dataset."
          >
            <HorizontalBars
              data={buttonFailures}
              ariaLabel="Button press failures by reason, with transcription highlighted"
              labelWidth="10rem"
            />
          </ChartCard>
        </div>
      </CaseSection>

      <CaseSection eyebrow="The SQL" title="Honest denominators, written into the query">
        <div className="grid gap-5 lg:grid-cols-2">
          <CodeBlock
            lang="sql"
            filename="sql/01_funnel_by_origin.sql"
            code={`-- Q1. Where do presses drop out, and does it differ by how the capture started?
--
-- A "press" is one tap of the floating button (or one share into the app).
-- Its stages share (install_id, press_id); press_id is only unique per install,
-- so every join uses both columns.
with presses as (
    select install_id, press_id
    from analytics.events
    where name = 'press_started' and press_id is not null
),
stage as (
    select
        p.install_id,
        p.press_id,
        max(e.params ->> 'capture_origin')      as origin,
        bool_or(e.name = 'press_acquisition')   as acquired,
        bool_or(e.name = 'capture_started')     as recognition_started,
        bool_or(e.name = 'capture_recognized')  as place_found,
        bool_or(e.name = 'place_saved')         as place_saved
    from presses p
    join analytics.events e
      on e.install_id = p.install_id and e.press_id = p.press_id
    group by 1, 2
)
select
    coalesce(origin, '(no capture)') as origin,
    count(*)                         as presses,
    count(*) filter (where acquired) as acquired,
    count(*) filter (where place_found) as place_found,
    count(*) filter (where place_saved) as place_saved
from stage
group by 1
order by presses desc;`}
          />
          <CodeBlock
            lang="sql"
            filename="sql/02_recognition_by_release_window.sql"
            code={`-- Q2. Did a release change recognition, per capture origin?
--
-- Data gap: events do not record the app version that produced them (only the
-- install's *latest* version is kept). So each event is assigned to the release
-- window it happened in, i.e. the latest version shipped at that date. Installs
-- that had not updated yet are counted under the new window, which biases any
-- measured effect towards zero (conservative).
with releases(version, shipped_on) as (
    values ('1.0.12', date '2026-08-01'),
           ('1.0.14', date '2026-09-10'),
           ('1.0.15', date '2026-09-24'),
           ('1.0.16', date '2026-10-02'),
           ('1.0.17', date '2026-10-10')
),
windows as (
    select version, shipped_on,
           coalesce(lead(shipped_on) over (order by shipped_on),
                    date '2100-01-01') as until
    from releases
)
select
    w.version                                             as release_window,
    a.origin,
    count(*)                                              as attempts,
    count(*) filter (where a.name = 'capture_recognized')  as recognized
from attempts a
join windows w on a.day >= w.shipped_on and a.day < w.until
group by 1, 2
order by 1, 2;`}
          />
        </div>
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Decisions and limits"
        title="What I changed about the question, and what I could not fix"
      >
        <DecisionTable
          rows={[
            {
              decision: "Measure release impact against the untouched path",
              why: "There was no experiment. The one thing a release gives you for free is a part of the product it did not change — if that moves too, the explanation is not the release.",
            },
            {
              decision: "Compare within capture origin, then pool with Mantel-Haenszel",
              why: "The usage mix moved towards the better-recognising path during the same window. Pooling naively credits the code for a change in behaviour; stratifying separates them and keeps a single summary number.",
            },
            {
              decision: "Use only installs with a complete 28-day window for retention",
              why: "Recent cohorts have not had time to return. Including them makes retention look like it is falling when it is only right-censored.",
            },
            {
              decision: "Say “installs”, never “users”",
              why: "An install is not a person. Reinstalls and second devices inflate every per-person claim, and the data cannot tell them apart.",
            },
            {
              decision: "Recommend an instrumentation change as a finding, not a footnote",
              why: "Events carried no app version, so release impact could only ever be approximated by date. The first recommendation was to log the version on every event, which turns the next release into a direct measurement.",
            },
          ]}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Callout title="What came out of it">
            <p>
              Prioritise first-save success over new features, with a guided first-save onboarding
              experiment sized at roughly 1,130 installs per arm — and log the app version on every
              event so the next release can be measured rather than inferred.
            </p>
          </Callout>
          <Callout title="Limits of this case study" tone="warn">
            <p>
              The numbers on this page come from synthetic data on the production schema, so they
              demonstrate method rather than report the client&apos;s results. The release analysis
              is quasi-experimental: windows by date, not randomised assignment. And the retention
              finding is an association — a failed first save predicts leaving, which is not proof
              that fixing it keeps people.
            </p>
          </Callout>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <SecondaryLink href="https://github.com/yanaybe/navigation-app-product-analytics" external>
            Repository
          </SecondaryLink>
        </div>
      </CaseSection>

      <NextProject
        slug="roomatch-matching"
        kind="Model validation"
        title="Does a “match %” predict who actually connects?"
      />
    </>
  );
}
