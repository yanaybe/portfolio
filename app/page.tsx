import Image from "next/image";
import Link from "next/link";
import { TrendFigure } from "@/components/trend-figure";
import { ArrowRight, Download, GitHub, LinkedIn, Mail, Phone } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import {
  Callout,
  FactList,
  Pill,
  PrimaryLink,
  SecondaryLink,
  Section,
  SectionHeading,
  StatTile,
  TextLink,
} from "@/components/ui";
import { education, experience, languages, recognition, skillGroups } from "@/lib/content";
import { roadSafety } from "@/lib/data/road-safety";
import { featuredProjects } from "@/lib/projects";
import { profile, resumes } from "@/lib/site";
import portrait from "@/public/images/yanay-berdah.jpg";
import { fmtInt } from "@/lib/format";

const heroStats = [
  { value: "3.5 yrs", label: "Unit 8200, data analysis & development" },
  { value: "2 h → 5 min", label: "core workflow, after automation" },
  { value: "4", label: "analysts led, 6+ months" },
  { value: "Aman Award", label: "for Excellence, 2025 (team)" },
];

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="grid-field absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 h-80 w-[46rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{ background: "var(--accent-glow)" }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="reveal reveal-1 flex items-center gap-2 text-[13px] font-medium text-ink-2">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--good)" }}
              />
              {profile.name} · open to data analyst &amp; data/AI roles
            </p>

            <h1 className="reveal reveal-2 mt-5 text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.03em] text-ink sm:text-[4.2rem]">
              Data. AI.
              <br />
              <span className="text-accent-ink">Engineering.</span>
            </h1>

            <p className="reveal reveal-3 mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2 sm:text-[1.15rem]">
              I spent three and a half years in Unit 8200 answering hard questions with large,
              messy, multi-source data — and building the Python and SQL systems that turned the
              answers into something a team could use every day. The projects below are public and
              reproducible: the code, the SQL and the tests are all there, and CI fails if a number
              moves.
            </p>

            <div className="reveal reveal-3 mt-8 flex flex-wrap items-center gap-3">
              <PrimaryLink href="/#work">
                Explore my work
                <ArrowRight width={15} height={15} />
              </PrimaryLink>
              <SecondaryLink href={resumes[0].file} download={resumes[0].download}>
                <Download width={15} height={15} />
                Download resume
              </SecondaryLink>
            </div>

            <ul className="reveal reveal-4 mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13.5px]">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 font-medium text-ink-2 hover:text-ink"
                >
                  <Mail width={15} height={15} />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  className="inline-flex items-center gap-2 font-medium text-ink-2 hover:text-ink"
                >
                  <LinkedIn width={15} height={15} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.github}
                  className="inline-flex items-center gap-2 font-medium text-ink-2 hover:text-ink"
                >
                  <GitHub width={15} height={15} />
                  {profile.githubHandle}
                </a>
              </li>
              <li>
                <a
                  href={profile.phoneHref}
                  className="inline-flex items-center gap-2 font-medium text-ink-2 hover:text-ink"
                >
                  <Phone width={15} height={15} />
                  {profile.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="reveal reveal-4 lg:pl-8">
            <div className="relative mx-auto max-w-[22rem] lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-[1.75rem] opacity-60 blur-2xl"
                style={{ background: "var(--accent-glow)" }}
              />
              <Image
                src={portrait}
                alt={`${profile.name}, ${profile.role}`}
                placeholder="blur"
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 80vw"
                className="h-auto w-full rounded-2xl border border-line object-cover shadow-[var(--shadow-lift)]"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-surface p-5">
                <dt className="text-[11.5px] leading-snug text-muted">{stat.label}</dt>
                <dd className="mt-1.5 text-lg font-semibold text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --------------------------------------------------------------- about */}
      <Section id="about" tint>
        <SectionHeading
          eyebrow="About"
          title="An analyst who can build the thing that fixes it"
          lead="The difference between answering a question and changing what a team does is usually engineering. I do both halves."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="space-y-5 text-[16.5px] leading-relaxed text-ink-2">
            <p>
              In Unit 8200 I worked where data analysis meets software: taking an ambiguous
              question, finding out whether the data could answer it, and then building the SQL and
              Python that made the answer repeatable. One recurring workflow went from two hours to
              five minutes. The tools I wrote were picked up by four teams across the unit. For six
              months I led a team of four analysts, which mostly meant reviewing other people&apos;s
              reasoning and deciding what not to do.
            </p>
            <p>
              What I like is the part most analysts hand off. On my own products I read the
              production code before touching the data — on RooMatch that surfaced five real
              defects, including a user preference the app collected and never used, before any
              model was fitted. When the instrumentation could not answer the question, I specified
              what to log instead of estimating around it. On Detour I built the recognition
              pipeline itself: speech-to-text, an LLM extraction step, a Places verification step,
              and an on-device path tried first so most presses never cost a cent or leave the
              phone.
            </p>
            <p>
              I care about being right more than being impressive. Every analysis project here
              states what the data cannot support, keeps “unknown” as a category instead of
              dropping inconvenient rows, and runs in CI that fails if a committed number changes.
              That last part is the habit I would bring to a team: findings that survive someone
              re-running them.
            </p>
          </div>

          <div className="space-y-4">
            <FactList
              items={[
                { term: "Based in", value: profile.location },
                { term: "Looking for", value: "Data analyst · product data analyst · BI / analytics engineer · data & AI" },
                {
                  term: "Languages",
                  value: languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(" · "),
                },
                {
                  term: "Writes",
                  value: "SQL and Python daily; TypeScript, Kotlin and Deno when the system needs it",
                },
              ]}
            />
            <Callout title="On the military work">
              <p>
                My service is described here in terms of method, responsibility and the kind of
                system I built. No classified subject matter, capability or result appears anywhere
                on this site, and none will in an interview.
              </p>
            </Callout>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- work */}
      <Section id="work">
        <SectionHeading
          eyebrow="Featured work"
          title="Four projects, each with the evidence attached"
          lead="Three analyses and one engineering build. Each case study states the question, what I did, what the numbers were, and where the work stops being reliable."
          aside={
            <Link
              href="/analytics"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:bg-surface-2"
            >
              Interactive data showcase
              <ArrowRight width={14} height={14} />
            </Link>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm font-semibold text-ink">Also public</p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
            <strong className="font-semibold text-ink">RooMatch</strong> — the roommate-matching
            product behind the matching analysis: React 18, TypeScript, Vite and Supabase, with a
            weighted compatibility score, squads and messaging.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <TextLink href="https://github.com/yanaybe/roommate-match" external>
              Repository
            </TextLink>
            <TextLink href="https://github.com/yanaybe/roommate-match/pull/6" external>
              The matching fixes, with tests
            </TextLink>
            <TextLink href="https://github.com/yanaybe" external>
              Everything else on GitHub
            </TextLink>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ showcase */}
      <Section tint>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Interactive data showcase"
              title="Real public data, from question to decision"
              lead="A full analysis you can poke at: the trend that reverses when you look at the right series, a severity model with its confidence intervals, and a hotspot ranking validated on years it never saw."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink href="/analytics">
                Open the showcase
                <ArrowRight width={15} height={15} />
              </PrimaryLink>
              <SecondaryLink
                href="https://yanaybe.github.io/israel-road-safety-analysis/"
                external
              >
                The standalone dashboard
              </SecondaryLink>
            </div>
          </div>
          <div>
            <TrendFigure />
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {fmtInt(roadSafety.totalCrashes)} police-recorded injury crashes, Central Bureau of
              Statistics, 2020–2024.{" "}
              <Link
                href="/analytics"
                className="font-medium text-accent-ink underline underline-offset-4"
              >
                The full analysis is interactive
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Crashes analysed"
            value={fmtInt(roadSafety.totalCrashes)}
            detail="Every police-recorded injury crash in Israel, 2020–2024."
          />
          <StatTile
            label="Fatal crashes"
            value={`+${Math.round(roadSafety.changePct.fatal)}%`}
            detail={`While the reported total fell ${Math.abs(Math.round(roadSafety.changePct.injury_crashes))}%.`}
          />
          <StatTile
            label="Severity model"
            value={`AUC ${roadSafety.cvAuc.toFixed(2)}`}
            detail="Cross-validated by holding out whole years."
          />
          <StatTile
            label="Ranking by raw counts"
            value="+47%"
            detail="How much a top-20 list over-promises, before correcting for luck."
          />
        </div>
      </Section>

      {/* -------------------------------------------------------------- skills */}
      <Section id="skills">
        <SectionHeading
          eyebrow="Technical skills"
          title="What I use, and where you can see me using it"
          lead="No proficiency bars. Where a skill has public evidence, the link goes to the code or the case study that shows it."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className={`rounded-2xl border p-6 ${
                group.emphasis
                  ? "border-accent/30 bg-accent-soft shadow-[var(--shadow-card)]"
                  : "border-line bg-surface"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[17px] font-semibold text-ink">{group.title}</h3>
                {group.emphasis ? <Pill tone="accent">Core</Pill> : null}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{group.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <span className="inline-block rounded-lg border border-line bg-surface-raised px-2.5 py-1 text-[12.5px] text-ink-2">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
              {group.evidence ? (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
                  {group.evidence.map((item) => (
                    <TextLink
                      key={item.href}
                      href={item.href}
                      external={item.href.startsWith("http")}
                    >
                      {item.label}
                    </TextLink>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- experience */}
      <Section id="experience" tint>
        <SectionHeading
          eyebrow="Experience & recognition"
          title="Where the three and a half years went"
        />

        <div className="mt-12 space-y-5">
          {experience.map((role) => (
            <article key={role.title} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="text-xl font-semibold text-ink">{role.title}</h3>
                  <p className="mt-1 text-sm font-medium text-accent-ink">{role.org}</p>
                </div>
                <p className="tnum text-[13px] font-medium text-muted">{role.period}</p>
              </div>
              <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-ink-2">
                {role.summary}
              </p>
              <ul className="mt-5 space-y-2.5">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                    <span
                      aria-hidden
                      className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
              {role.note ? (
                <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
                  {role.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-ink">
              Recognition · {recognition.year}
            </p>
            <h3 className="mt-3 text-xl font-semibold leading-snug text-ink">{recognition.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{recognition.teamClaim}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
              {recognition.personalClaim}
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Education
            </p>
            <ul className="mt-4 space-y-5">
              {education.map((item) => (
                <li key={item.title}>
                  <p className="text-[15px] font-semibold text-ink">{item.title}</p>
                  <p className="text-sm text-accent-ink">{item.org}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- resume */}
      <Section id="resume">
        <SectionHeading
          eyebrow="Resume"
          title="Two versions, depending on the role"
          lead="Both are my own current CVs, unedited. Same facts, different emphasis."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {resumes.map((resume) => (
            <a
              key={resume.file}
              href={resume.file}
              download={resume.download}
              className="group flex items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
            >
              <div>
                <p className="text-[17px] font-semibold text-ink">{resume.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{resume.description}</p>
                <p className="mt-3 font-mono text-[11.5px] text-muted">PDF · one page</p>
              </div>
              <span
                aria-hidden
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-raised text-ink-2 transition-colors group-hover:text-accent-ink"
              >
                <Download />
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- contact */}
      <Section id="contact" tint>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-[2.6rem]">
            If you are hiring for a data role, I would like to hear about it
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
            The fastest route is email. I am happy to walk through any of the projects above — the
            code, the SQL, and the parts I would do differently.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PrimaryLink href={`mailto:${profile.email}`} download={undefined}>
              <Mail width={15} height={15} />
              {profile.email}
            </PrimaryLink>
            <SecondaryLink href={profile.linkedin} external>
              <LinkedIn width={15} height={15} />
              LinkedIn
            </SecondaryLink>
            <SecondaryLink href={profile.github} external>
              <GitHub width={15} height={15} />
              GitHub
            </SecondaryLink>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-2">
            <li>
              <a href={profile.phoneHref} className="inline-flex items-center gap-2 hover:text-ink">
                <Phone width={15} height={15} />
                {profile.phone}
              </a>
            </li>
            {resumes.map((resume) => (
              <li key={resume.file}>
                <a
                  href={resume.file}
                  download={resume.download}
                  className="inline-flex items-center gap-2 hover:text-ink"
                >
                  <Download width={15} height={15} />
                  {resume.label} CV
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
