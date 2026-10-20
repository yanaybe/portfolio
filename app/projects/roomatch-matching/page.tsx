import type { Metadata } from "next";
import { DivergingBars, HorizontalBars } from "@/components/charts/bar-chart";
import { ChartCard } from "@/components/charts/chart-frame";
import { seriesColors } from "@/lib/chart-colors";
import { LineChart } from "@/components/charts/line-chart";
import { CaseHeader, CaseSection, DecisionTable, NextProject } from "@/components/case-study";
import { CodeBlock } from "@/components/code-block";
import { Callout, FactList, SecondaryLink, StatTile } from "@/components/ui";
import { roomatchAnalysis as rm } from "@/lib/data/roomatch";
import { fmtInt } from "@/lib/format";
import { getProject } from "@/lib/projects";

const project = getProject("roomatch-matching")!;

export const metadata: Metadata = {
  title: "Does a “match %” predict who actually connects?",
  description:
    "Validating a live product's compatibility score against behaviour: a verified Python port of the production algorithm, logistic regression with a popularity control, marketplace liquidity, and five real defects found by reading the code first.",
  openGraph: {
    title: "Does a “match %” predict who actually connects?",
    description:
      "Validating a live product's compatibility score against behaviour: a verified Python port of the production algorithm, logistic regression with a popularity control, marketplace liquidity, and five real defects found by reading the code first.",
    url: "/projects/roomatch-matching",
    type: "article",
  },
  alternates: { canonical: "/projects/roomatch-matching" },
};

const FACTOR_LABELS: Record<string, string> = {
  gender_mismatch: "Unmet gender preference",
  budget_ratio: "Budget gap",
  smoking_conflict: "Smoking conflict",
  sleep_opposite: "Opposite sleep schedule",
  pet_conflict: "Pet conflict",
  age_fit: "Age fits the stated range",
  religious_gap: "Religious-level gap",
  noise_sim: "Similar noise tolerance",
  clean_conflict: "Cleanliness conflict",
  social_sim: "Similar social style",
  move_in_months: "Move-in timing gap",
  vibe_same: "Same “lifestyle vibe”",
  target_popularity: "How popular the target is",
};

export default function Page() {
  const coefficients = rm.coefficients.map((c) => ({
    label: FACTOR_LABELS[c.factor] ?? c.factor,
    value: c.coef,
    lo: c.lo,
    hi: c.hi,
  }));

  const cityByPool = [...rm.cityLiquidity].sort((a, b) => b.pool - a.pool);

  return (
    <>
      <CaseHeader project={project} />

      <CaseSection
        eyebrow="The question"
        title="I shipped a number to users, then checked whether it meant anything"
        lead={
          <>
            <p>
              RooMatch shows every card an “NN% match”, produced by a hand-written scoring
              function with about twenty weights I chose myself. Users treat it as a probability.
              Nobody — including me — had checked whether it predicted anything at all.
            </p>
            <p>
              So I audited my own work: ported the production function to Python, verified the port
              against the live TypeScript, and then asked whether the score predicted who actually
              connected, which factors really drove likes, and whether good matches were being lost
              before anyone saw them.
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
                "RooMatch profiles hold sensitive personal data — religious level, smoking, age, gender, private messages. None of it is in this project. It runs on synthetic data with the production schema, scored by the production algorithm itself, with no names, photos, phone numbers or message text generated even as fakes.",
            },
            {
              term: "Verification",
              value:
                "The Python port is compared with the production TypeScript on 1,500 random pairs, including missing values and JavaScript's rounding behaviour. Zero differences.",
            },
            { term: "Stack", value: project.stack.join(" · ") },
          ]}
        />
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Before the data"
        title="Five real defects, found by reading the code first"
        lead={
          <p>
            Every one of these changes how the data has to be analysed — and four of them were
            bugs users were living with. All five are fixed in the app, each with a regression test.
          </p>
        }
      >
        <DecisionTable
          headings={["What the code did", "Why it mattered"]}
          rows={[
            {
              decision: "gender_preference was collected and never used",
              why: "Not in the score, not in the deck query. It turned out to be the strongest deal-breaker in behaviour, and 23% of cards shown broke the viewer's own stated preference.",
            },
            {
              decision: "The “suppression threshold” suppressed nothing",
              why: "Scores were clamped to 15 and still shown. 15% of all cards were floor-level pairs wearing a 15% label — so the floor band had to be analysed separately rather than treated as a score.",
            },
            {
              decision: "Passes were logged without the target or the score",
              why: "The analytics event had no properties, so “like rate by score” was impossible to compute from production events. The first recommendation was instrumentation: log target and score on every swipe.",
            },
            {
              decision: "Answer scales were mapped onto 7 steps unevenly",
              why: "Cooking options Never / Rarely / Sometimes / Daily sat at steps 0, 1, 2, 6, so “Rarely vs Sometimes” counted as 1/6 apart and “Sometimes vs Daily” as 4/6. Similarity on those fields was distorted.",
            },
            {
              decision: "The score could exceed 100%",
              why: "A move-in bonus applied as a negative penalty. Minor on its own, but it is proof the number was never calibrated — confirmed by running the production TypeScript, where one pair scores 101.",
            },
          ]}
        />
        <p className="mt-5 text-sm text-ink-2">
          Fixed in{" "}
          <a
            className="font-semibold text-accent-ink underline decoration-accent/30 underline-offset-4"
            href="https://github.com/yanaybe/roommate-match/pull/6"
            target="_blank"
            rel="noreferrer noopener"
          >
            yanaybe/roommate-match#6
          </a>
          .
        </p>
      </CaseSection>

      <CaseSection
        eyebrow="Finding 1"
        title="The score ranks well. It is not a probability."
        lead={
          <p>
            Mutual-like rate climbs monotonically across score bands — from{" "}
            {rm.scoreBands[0].mutualRatePct}% at the floor to {rm.scoreBands[5].mutualRatePct}% at
            the top. So the ordering is real. But a “70% match” becomes a mutual like about
            8% of the time, which is why the recommendation was to relabel the number as tiers
            rather than keep showing a percentage that reads as a chance.
          </p>
        }
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <ChartCard
            question="Q1 · Does the score predict connections?"
            title="Mutual-like rate by score band"
            takeaway="Denominator: pairs where both people actually saw each other. A pair where one side never saw the other cannot be mutual, and counting it would blame the score for the deck order."
            table={{
              caption: "Outcomes by score band",
              head: ["Band", "Swipes", "Likes", "Pairs both saw", "Mutual", "Two-way chats"],
              rows: rm.scoreBands.map((b) => [
                b.band,
                b.swipes,
                b.likes,
                b.pairsBothSaw,
                b.mutualPairs,
                b.twoWayChats,
              ]),
            }}
            source={`AUC of the raw score for predicting a like: ${rm.aucLadder[0].auc}. ${rm.floorShareOfCardsPct}% of all cards shown sit at the clamped floor.`}
          >
            <HorizontalBars
              data={rm.scoreBands.map((b) => ({
                label: b.band,
                value: b.mutualRatePct,
                detail: (
                  <>
                    {b.mutualPairs} mutual of {fmtInt(b.pairsBothSaw)} pairs who both saw each other
                    · {b.twoWayChats} two-way chats
                  </>
                ),
              }))}
              format={{ style: "pct", digits: 2 }}
              ariaLabel="Mutual like rate by score band"
              labelWidth="6rem"
            />
          </ChartCard>

          <ChartCard
            question="Q2 · Can it be better?"
            title="Discrimination on users the model never saw"
            takeaway={
              <>
                Re-weighting the same factors from data lifts AUC from {rm.aucLadder[0].auc} to{" "}
                {rm.aucLadder[2].auc}; adding the gender preference the app ignores takes it to{" "}
                {rm.aucLadder[3].auc}. Split by user, not by swipe, so no user appears in both
                halves.
              </>
            }
            table={{
              caption: "Model discrimination (AUC) on the held-out users",
              head: ["Model", "AUC"],
              rows: rm.aucLadder.map((a) => [a.model, a.auc]),
            }}
            source={`Trained on ${fmtInt(rm.nSwipes - rm.nTestSwipes)} swipes, evaluated on ${fmtInt(rm.nTestSwipes)} from held-out users.`}
          >
            <HorizontalBars
              data={rm.aucLadder.map((a, i) => ({
                label: a.model,
                value: a.auc,
                emphasis: i === rm.aucLadder.length - 1,
              }))}
              format={{ style: "fixed", digits: 3 }}
              ariaLabel="AUC for each model variant, on held-out users"
              labelWidth="13rem"
            />
          </ChartCard>
        </div>

        <div className="mt-8">
          <ChartCard
            question="Q2b · Which factors actually drive a like?"
            title="Logistic-regression coefficients, with a popularity control"
            takeaway={
              <>
                An unmet gender preference is the single strongest effect in behaviour — and carries
                zero weight in the production score. “Lifestyle vibe”, which carries 10% of
                the base weight, has no measurable effect at all (its interval spans zero). Target
                popularity is in the model as a control, because without it the score takes credit
                for who is simply being seen more.
              </>
            }
            table={{
              caption: "Logistic regression coefficients with 95% confidence intervals",
              head: ["Factor", "Coefficient (log-odds)", "95% CI low", "95% CI high"],
              rows: rm.coefficients.map((c) => [
                FACTOR_LABELS[c.factor] ?? c.factor,
                c.coef,
                c.lo,
                c.hi,
              ]),
            }}
            source="Coefficients are log-odds on a like; features are standardised similarity and conflict terms built by the ported scoring code, so each one corresponds to something the app already computes."
          >
            <DivergingBars
              data={coefficients}
              positiveLabel="makes a like more likely"
              negativeLabel="makes a like less likely"
              ariaLabel="Logistic regression coefficients for each matching factor"
            />
          </ChartCard>
        </div>
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Finding 2"
        title="Most good matches never get the chance"
        lead={
          <p>
            The deck shows newest profiles first. That is good for the analysis — exposure does not
            depend on score, so the score can be validated without position bias — and bad for
            users: a profile gets {Math.round((rm.exposureDecay[0].impressions / rm.exposureDecay.reduce((s, w) => s + w.impressions, 0)) * 100)}
            % of its lifetime impressions in its first week, and{" "}
            {rm.unseenLikes.neverSawPct}% of likes go to someone who never sees the liker.
          </p>
        }
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <ChartCard
            question="Q3 · Are good matches getting lost?"
            title="Impressions by weeks since joining"
            takeaway={`Of ${fmtInt(rm.unseenLikes.likes)} likes, ${fmtInt(rm.unseenLikes.neverSaw)} were never seen by the person who was liked. When they were seen, ${Math.round((rm.unseenLikes.likedBack / (rm.unseenLikes.likedBack + rm.unseenLikes.passedBack)) * 100)}% liked back.`}
            table={{
              caption: "Impressions and profiles shown by weeks since joining",
              head: ["Weeks since joining", "Impressions", "Profiles shown", "Eligible profiles"],
              rows: rm.exposureDecay.map((w) => [
                w.week,
                w.impressions,
                w.profilesShown,
                w.eligible,
              ]),
            }}
            source="A “they liked you” queue was the largest single lever this analysis found, sized as an A/B test at about 1,320 users per arm."
          >
            <LineChart
              x={rm.exposureDecay.map((w) => `wk ${w.week}`)}
              series={[
                {
                  label: "Impressions",
                  color: seriesColors[0],
                  values: rm.exposureDecay.map((w) => w.impressions),
                },
              ]}
              format={{ style: "int", suffix: " impressions" }}
              labelFormat={{ style: "compact" }}
              ariaLabel="Impressions by weeks since a profile joined, falling steeply after week zero"
            />
          </ChartCard>

          <ChartCard
            question="Q4 · Is the market liquid everywhere?"
            title="Match rate within 30 days, cities ordered by pool size"
            takeaway="Bigger is not better. Tel Aviv has the largest pool and the lowest match rate; Petah Tikva, a fifth of the size, matches new users far more often. Pool size is not liquidity."
            table={{
              caption: "New users, matches within 30 days, pool size and median budget by city",
              head: ["City", "New users", "Matched in 30d", "Match rate", "Pool", "Median budget ₪"],
              rows: rm.cityLiquidity.map((c) => [
                c.city,
                c.newUsers,
                c.matched,
                `${c.matchRatePct}%`,
                c.pool,
                c.medianBudget,
              ]),
            }}
            source="Match rate = new users who matched within 30 days / new users in that city. Budget spread is the likeliest explanation and the obvious next question."
          >
            <HorizontalBars
              data={cityByPool.map((c) => ({
                label: c.city,
                value: c.matchRatePct,
                detail: (
                  <>
                    {c.matched} of {c.newUsers} new users matched · pool {fmtInt(c.pool)} · median
                    budget ₪{fmtInt(c.medianBudget)}
                  </>
                ),
              }))}
              format={{ style: "pct", digits: 1 }}
              ariaLabel="Match rate within 30 days by city, ordered by pool size"
              labelWidth="7.5rem"
            />
          </ChartCard>
        </div>
      </CaseSection>

      <CaseSection eyebrow="The method" title="Port it, prove the port, then trust the numbers">
        <div className="grid gap-5 lg:grid-cols-2">
          <CodeBlock
            lang="python"
            filename="roomatch/score.py"
            code={`"""Python port of RooMatch's production compatibility score
(\`calculateUserMatch\`).

The app shows this number to users as "NN% match". Porting it lets the
analysis (1) recompute the exact score for any pair and (2) break it into
the components the app's hand-set weights combine. tests/test_score_port.py
checks the port against the production TypeScript on thousands of pairs.
"""

FLOOR = 15  # MATCH_SUPPRESSION_THRESHOLD: scores are clamped here, not hidden


def js_round(x: float) -> int:
    """JavaScript Math.round: halves round towards +infinity
    (Python rounds to even)."""
    return math.floor(x + 0.5)


def _ordinal(a, b, scale):
    ai, bi = _idx(scale, a), _idx(scale, b)
    return 0.5 if ai == -1 or bi == -1 else 1 - abs(ai - bi) / (len(scale) - 1)`}
            caption="Reproducing a rounding rule is not pedantry: without js_round the port disagrees with production on exactly the pairs that sit on a boundary."
          />
          <CodeBlock
            lang="sql"
            filename="sql/01_outcomes_by_score_band.sql"
            code={`-- Q1. Does the "NN% match" users see predict anything?
--
-- Three outcomes, each with its honest denominator:
--   like rate   = likes / swipes                      (every card shown)
--   mutual rate = mutual likes / pairs who BOTH saw each other
--                 (a pair where one side never saw the other can't be
--                  mutual, and counting it would blame the score for the
--                  deck order)
--   two-way chat = conversations where both sent >= 2 messages / mutual pairs
-- The score is symmetric: score(a,b) = score(b,a), so a pair has one band.
with banded as (
    select *,
        case when match_percent <= 15 then '15 (floor)'
             when match_percent < 30  then '16-29'
             when match_percent < 45  then '30-44'
             when match_percent < 60  then '45-59'
             when match_percent < 75  then '60-74'
             else '75+' end as band
    from swipes
),
pairs as (   -- one row per unordered pair where both sides swiped
    select a.band,
           a.direction = 'like' and b.direction = 'like' as mutual
    from banded a
    join banded b on b.viewer_id = a.target_id and b.target_id = a.viewer_id
    where a.viewer_id < a.target_id
)
select band, count(*) as pairs_both_saw,
       count(*) filter (where mutual) as mutual_pairs
from pairs group by band order by band;`}
          />
        </div>
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Outcome"
        title="What changed, and what this cannot prove"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <StatTile
            label="Defects fixed in the app"
            value="5"
            detail="Each with a regression test, in a public pull request."
          />
          <StatTile
            label="AUC after re-weighting"
            value={`${rm.aucLadder[0].auc} → ${rm.aucLadder[3].auc}`}
            detail="On users the model never saw."
          />
          <StatTile
            label="Largest product lever"
            value="“They liked you”"
            detail={`${rm.unseenLikes.neverSawPct}% of likes currently go unseen.`}
          />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Callout title="The ranked plan this produced">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Filter the deck by gender preference — it is collected, ignored, and decisive.</li>
              <li>
                Add a “they liked you” queue; A/B test it at about 1,320 users per arm.
              </li>
              <li>Re-weight the score from data instead of from intuition.</li>
              <li>Relabel “% match” as tiers, because it is a ranking and not a chance.</li>
            </ol>
          </Callout>
          <Callout title="Limitations" tone="warn">
            <p>
              The behavioural numbers come from synthetic data on the production schema: the
              scoring function and the schema are real, the swipes are not. So this demonstrates the
              method and the defects, not RooMatch&apos;s true conversion rates. The model is
              observational — a factor that predicts a like is not proof that changing it causes one
              — and the re-weighting is validated only on held-out users, not in a live test.
            </p>
          </Callout>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <SecondaryLink href="https://github.com/yanaybe/roomatch-matching-analysis" external>
            Analysis repository
          </SecondaryLink>
          <SecondaryLink href="https://github.com/yanaybe/roommate-match/pull/6" external>
            The fixes (PR #6)
          </SecondaryLink>
          <SecondaryLink href="https://github.com/yanaybe/roommate-match" external>
            The app
          </SecondaryLink>
        </div>
      </CaseSection>

      <NextProject
        slug="israel-road-safety"
        kind="Data analysis"
        title="Israel's roads: fewer crashes reported, more of them deadly"
      />
    </>
  );
}
