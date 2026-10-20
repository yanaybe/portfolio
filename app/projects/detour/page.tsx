import type { Metadata } from "next";
import { CaseHeader, CaseSection, DecisionTable, NextProject } from "@/components/case-study";
import { Callout, FactList, FlowDiagram, SecondaryLink, StatTile } from "@/components/ui";
import { getProject } from "@/lib/projects";

const project = getProject("detour")!;

export const metadata: Metadata = {
  title: "Detour — AI place discovery on Android",
  description:
    "An Android app that turns something you heard about into a place you can find: speech-to-text, LLM place extraction, Google Places verification and routing, with the on-device path tried first and four layers of rate limiting in front of paid APIs.",
  openGraph: {
    title: "Detour — AI place discovery on Android",
    description:
      "An Android app that turns something you heard about into a place you can find: speech-to-text, LLM place extraction, Google Places verification and routing, with the on-device path tried first and four layers of rate limiting in front of paid APIs.",
    url: "/projects/detour",
    type: "article",
  },
  alternates: { canonical: "/projects/detour" },
};

export default function Page() {
  return (
    <>
      <CaseHeader project={project} />

      <CaseSection
        eyebrow="The problem"
        title="The gap between hearing about a place and ever going there"
        lead={
          <>
            <p>
              You are watching a video and someone mentions a bakery. Or a friend says the name of a
              bar mid-sentence. To keep it you have to leave the moment: switch apps, guess the
              spelling, search, save. Most people do not, and the place is gone.
            </p>
            <p>
              Detour&apos;s whole product is one button. Press it while that is happening, and the
              app works out which real place was meant and reminds you when you are driving past it.
              Everything interesting is in the word “works out”: the input is unstructured
              audio or a screen full of text, and the output has to be a specific row with a place
              id and coordinates — or nothing, which is better than the wrong place.
            </p>
          </>
        }
      >
        <FactList
          items={[
            { term: "My role", value: project.role },
            {
              term: "Context",
              value:
                "Client work. The client owns the product and the app's identity; I own the implementation. The repository is private, so this page describes architecture and decisions rather than code.",
            },
            { term: "Stack", value: project.stack.join(" · ") },
            {
              term: "Status",
              value:
                "Five Edge Functions deployed; four of them verified end to end against the real providers in both Hebrew and English. No public usage metrics exist, so none are claimed here.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        tint
        eyebrow="Architecture"
        title="One press, four ways to recognise a place, cheapest first"
        lead={
          <p>
            The pipeline is ordered by cost and privacy, not by accuracy. Each step only runs if the
            one before it came back with nothing usable, so the common case never leaves the phone
            and never spends money.
          </p>
        }
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              The press: unstructured input → a verified place
            </h3>
            <FlowDiagram
              stages={[
                { label: "Floating button", detail: "Compose overlay · one tap" },
                { label: "Accessibility tree", detail: "free · on device" },
                { label: "ML Kit OCR", detail: "one frame · free · on device" },
                { label: "Backend OCR", detail: "only if unusable script" },
                { label: "Transcribe", detail: "whisper-1" },
                { label: "Extract place", detail: "gpt-4o-mini → candidates" },
                { label: "Verify place", detail: "Google Places (New)", tone: "accent" },
              ]}
              caption="Each stage is a fallback, not a step: a press that the accessibility read already answers never reaches a provider."
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              The drive: a saved place becomes a reminder
            </h3>
            <FlowDiagram
              stages={[
                { label: "Saved places", detail: "PostgreSQL" },
                { label: "Route", detail: "Google Directions → polyline" },
                { label: "Places near the route", detail: "geometry, on the server" },
                { label: "Surfaced while driving", detail: "client", tone: "accent" },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatTile
              label="API keys on the device"
              value="None"
              detail="Every provider sits behind an Edge Function; the app carries a base URL and a public anon key."
            />
            <StatTile
              label="Rate limiting"
              value="4 layers"
              detail="Per install, new installs per address, coarse per address, then a whole-product daily budget."
            />
            <StatTile
              label="Backend unreachable"
              value="Still works"
              detail="Any non-2xx becomes a typed network error; the press falls through to the next path."
            />
          </div>
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="Technical decisions"
        title="The calls I would defend in a review"
      >
        <DecisionTable
          rows={[
            {
              decision: "Try the accessibility tree, then on-device OCR, before any network call",
              why: "The cheapest path is also the most private one. A press that a free on-device read can answer costs nothing and sends nothing — which is what makes a per-user free tier possible at all.",
            },
            {
              decision: "Escalate on “nothing usable”, not on “nothing at all”",
              why: "This one bit me. The captured frame is the whole display, so it always contains the status-bar clock, and the on-device reader always returns those digits. A rule that asked whether the pass was empty made the next stage unreachable in principle. The condition had to be a judgement about usefulness — above all, scripts the on-device model does not support.",
            },
            {
              decision: "Let the LLM propose candidates and a Places lookup decide",
              why: "A language model will happily name a plausible place that does not exist. Extraction produces candidates; verification against Google Places decides whether a real place was meant, and returns nothing rather than a guess.",
            },
            {
              decision: "Require a JWT on every function, and never bypass it per function",
              why: "The functions are the only thing holding the provider keys. The verification flag is set in config for all of them, because a per-deploy flag silently undoes it for exactly the one function someone was in a hurry about.",
            },
            {
              decision: "Rate-limit narrowest bucket first, in Postgres, with an in-memory fallback",
              why: "A refused request must not spend a wider allowance. New installs are charged per address so a script cannot mint a fresh identity per request, IPv6 collapses to a /64 so buckets are not free, and the forwarded-for header is read from the nearest hop rather than the caller-controlled first one. If the database is unreachable the limiter degrades instead of opening.",
            },
            {
              decision: "Treat the rate limiter as a bug, not a budget",
              why: "The anon key ships inside the app, so anyone who wants the endpoint has the key. Code-side limits reduce the blast radius; the controls that hold even when my code is wrong are provider-side quota caps and billing alerts, which live in a console and not in a repository. I keep an audit document that says exactly which controls those are, because the code cannot enforce them.",
            },
            {
              decision: "Ship a build that runs with no keys configured",
              why: "The app checks whether the backend is configured and refuses to fire requests at an empty host. Pressing the button still records; transcription fails with a clear message. A contributor can build and run it without credentials.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        tint
        eyebrow="What it taught me"
        title="Honest limits of this write-up"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Callout title="What I will not claim">
            <p>
              There are no install counts, retention curves or accuracy numbers on this page, because
              no public measurement exists that I could stand behind. The product analytics case
              study on this site uses synthetic data on a real schema for exactly that reason.
            </p>
          </Callout>
          <Callout title="The lesson that transfers" tone="warn">
            <p>
              Two of the three real bugs in this system were in the <em>conditions</em>, not the
              code: when to escalate, and what counts as a usable result. Both were found by
              measuring the branch rather than reasoning about it. I now write the measurement
              before the fallback.
            </p>
          </Callout>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <SecondaryLink href="https://detour-app.store" external>
            Product site
          </SecondaryLink>
        </div>
      </CaseSection>

      <NextProject
        slug="navigation-analytics"
        kind="Product analytics"
        title="Did the two releases actually work?"
      />
    </>
  );
}
