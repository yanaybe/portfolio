import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "./icons";
import { Pill } from "./ui";

export function CaseHeader({ project }: { project: Project }) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="grid-field absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <Link href="/#work" className="hover:text-ink">
            Work
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-ink-2">{project.kind}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Pill tone="accent">{project.kind}</Pill>
          {project.dataNote ? <Pill>{project.dataNote.split(/[.(]/)[0].trim()}</Pill> : null}
        </div>

        <h1 className="mt-5 max-w-4xl text-[2.2rem] font-semibold leading-[1.06] text-ink sm:text-[3.1rem]">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] font-medium leading-relaxed text-accent-ink">
          {project.question}
        </p>
        <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink-2">{project.summary}</p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {project.stats.map((stat) => (
            <div key={stat.label} className="bg-surface p-5">
              <dt className="text-[11.5px] leading-snug text-muted">{stat.label}</dt>
              <dd className="mt-1.5 text-[1.3rem] font-semibold leading-tight text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {project.links.length ? (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
              >
                {link.label}
                <ArrowUpRight width={13} height={13} />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function CaseSection({
  id,
  eyebrow,
  title,
  lead,
  children,
  tint = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  tint?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-20 border-b border-line ${tint ? "bg-bg-tint" : ""}`}>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-ink">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2.5 max-w-3xl text-[1.75rem] font-semibold leading-tight text-ink sm:text-[2.1rem]">
          {title}
        </h2>
        {lead ? (
          <div className="mt-4 max-w-3xl space-y-4 text-[16.5px] leading-relaxed text-ink-2">
            {lead}
          </div>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}

/** Decision/trade-off table used by every case study. */
export function DecisionTable({
  rows,
  headings = ["Decision", "Why"],
}: {
  rows: { decision: ReactNode; why: ReactNode }[];
  headings?: [string, string] | string[];
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-line">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-surface-2 text-ink-2">
          <tr>
            <th scope="col" className="w-2/5 px-5 py-3 font-semibold">
              {headings[0]}
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              {headings[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-line bg-surface align-top">
              <td className="px-5 py-4 font-medium text-ink">{row.decision}</td>
              <td className="px-5 py-4 leading-relaxed text-ink-2">{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NextProject({
  slug,
  title,
  kind,
}: {
  slug: string;
  title: string;
  kind: string;
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Link
          href={`/projects/${slug}`}
          className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Next · {kind}
            </p>
            <p className="mt-2 text-lg font-semibold text-ink">{title}</p>
          </div>
          <span aria-hidden className="text-ink-2 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
