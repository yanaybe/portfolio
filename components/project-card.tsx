import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ArrowRight, ArrowUpRight } from "./icons";
import { Pill } from "./ui";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]">
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-2">
          <Pill tone="accent">{project.kind}</Pill>
          {project.dataNote ? <Pill>{project.dataNote.split(/[.(]/)[0].trim()}</Pill> : null}
        </div>

        <h3 className="mt-4 text-[1.35rem] font-semibold leading-snug text-ink">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent-ink">
            <span className="absolute inset-0" aria-hidden />
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm font-medium text-accent-ink">{project.question}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-4">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-base font-semibold leading-tight text-ink">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[11.5px] leading-snug text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech}>
              <span className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-ink-2">
                {tech}
              </span>
            </li>
          ))}
          {project.stack.length > 5 ? (
            <li>
              <span className="rounded-md px-2 py-1 font-mono text-[11px] text-muted">
                +{project.stack.length - 5}
              </span>
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
            Read the case study
            <ArrowRight
              width={14}
              height={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="relative z-10 inline-flex items-center gap-1 text-[13px] font-medium text-ink-2 hover:text-accent-ink"
            >
              {link.label}
              <ArrowUpRight width={12} height={12} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
