import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

export function Section({
  id,
  children,
  className = "",
  tint = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${tint ? "bg-bg-tint" : ""} scroll-mt-20 border-t border-line ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-[1.1] text-ink sm:text-[2.6rem]">
          {title}
        </h2>
        {lead ? <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{lead}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${
        tone === "accent"
          ? "border-transparent bg-accent-soft text-accent-ink"
          : "border-line bg-surface text-ink-2"
      }`}
    >
      {children}
    </span>
  );
}

export function StatTile({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 text-[1.75rem] font-semibold leading-none text-ink">{value}</p>
      {detail ? <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{detail}</p> : null}
    </div>
  );
}

export function PrimaryLink({
  href,
  children,
  download,
}: {
  href: string;
  children: ReactNode;
  download?: string;
}) {
  const className =
    "inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-bg shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-0.5";
  if (download || !href.startsWith("/")) {
    return (
      <a href={href} download={download} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SecondaryLink({
  href,
  children,
  download,
  external,
}: {
  href: string;
  children: ReactNode;
  download?: string;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-2";
  if (download || external || !href.startsWith("/")) {
    const outbound = !download && href.startsWith("http");
    return (
      <a
        href={href}
        download={download}
        className={className}
        {...(outbound ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const inner = (
    <>
      {children}
      {external ? <ArrowUpRight width={13} height={13} /> : <ArrowRight width={13} height={13} />}
    </>
  );
  const className =
    "group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";
  return external ? (
    <a href={href} className={className} target="_blank" rel="noreferrer noopener">
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

/** Two-column fact list used across case studies. */
export function FactList({ items }: { items: { term: string; value: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      {items.map((item) => (
        <div key={item.term} className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted">
            {item.term}
          </dt>
          <dd className="text-sm leading-relaxed text-ink-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export type FlowStage = {
  label: string;
  detail?: string;
  tone?: "accent" | "default" | "ghost";
};

/**
 * Architecture / data-flow strip. Horizontal on wide screens, a vertical list on
 * narrow ones, and an ordered list underneath for anyone reading with a screen
 * reader — the arrows are decoration, the order is the content.
 */
export function FlowDiagram({
  stages,
  caption,
}: {
  stages: FlowStage[];
  caption?: string;
}) {
  return (
    <figure>
      <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {stages.map((stage, i) => (
          <li key={stage.label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex-1 rounded-xl border p-3.5 ${
                stage.tone === "accent"
                  ? "border-accent/35 bg-accent-soft"
                  : stage.tone === "ghost"
                    ? "border-dashed border-line-strong bg-transparent"
                    : "border-line bg-surface"
              }`}
            >
              <p className="text-[13px] font-semibold leading-snug text-ink">{stage.label}</p>
              {stage.detail ? (
                <p className="mt-1 font-mono text-[11px] leading-snug text-muted">{stage.detail}</p>
              ) : null}
            </div>
            {i < stages.length - 1 ? (
              <span aria-hidden className="shrink-0 text-muted">
                <ArrowRight width={16} height={16} className="hidden lg:block" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lg:hidden"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {caption ? (
        <figcaption className="mt-3 text-xs leading-relaxed text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Callout({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: ReactNode;
  tone?: "default" | "warn";
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        tone === "warn" ? "border-line-strong bg-surface-2" : "border-line bg-surface"
      }`}
    >
      <p className="text-[13px] font-semibold text-ink">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-2">{children}</div>
    </div>
  );
}
