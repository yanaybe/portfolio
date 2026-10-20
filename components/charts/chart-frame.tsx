"use client";

import { useId, useState, type ReactNode } from "react";

export type LegendItem = { label: string; color: string; kind?: "line" | "area" };

export function Legend({ items }: { items: LegendItem[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2 text-[13px] text-ink-2">
          {item.kind === "line" ? (
            <span
              aria-hidden
              className="h-0.5 w-5 rounded-full"
              style={{ background: item.color }}
            />
          ) : (
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{ background: item.color }}
            />
          )}
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export type TableData = { head: string[]; rows: (string | number)[][]; caption?: string };

function DataTable({ data }: { data: TableData }) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={data.caption ?? "Data table"}
      className="thin-scroll max-h-[420px] overflow-auto rounded-lg border border-line"
    >
      <table className="w-full border-collapse text-left text-[13px]">
        {data.caption ? <caption className="sr-only">{data.caption}</caption> : null}
        <thead className="sticky top-0 bg-surface-2 text-ink-2">
          <tr>
            {data.head.map((h) => (
              <th key={h} scope="col" className="px-3 py-2 font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tnum">
          {data.rows.map((row, i) => (
            <tr key={i} className="border-t border-line">
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2 ${j === 0 ? "text-ink" : "text-ink-2"}`}>
                  {typeof cell === "number" ? cell.toLocaleString("en-US") : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The frame every chart sits in: a question, the plot, the legend, a table view
 * of the same numbers (so no value is reachable only by hovering) and a source note.
 */
export function ChartCard({
  title,
  question,
  takeaway,
  legend,
  table,
  source,
  controls,
  children,
}: {
  title: string;
  question?: string;
  takeaway?: ReactNode;
  legend?: LegendItem[];
  table?: TableData;
  source?: ReactNode;
  controls?: ReactNode;
  children: ReactNode;
}) {
  const [showTable, setShowTable] = useState(false);
  const panelId = useId();

  return (
    <figure className="min-w-0 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          {question ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {question}
            </p>
          ) : null}
          <h3 className="mt-1.5 text-[17px] font-semibold text-ink">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {controls}
          {table ? (
            <button
              type="button"
              onClick={() => setShowTable((v) => !v)}
              aria-pressed={showTable}
              aria-controls={panelId}
              className="rounded-lg border border-line bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
            >
              {showTable ? "Chart" : "Table"}
            </button>
          ) : null}
        </div>
      </div>

      {takeaway ? <p className="mt-3 text-sm leading-relaxed text-ink-2">{takeaway}</p> : null}

      <div id={panelId} className="mt-5">
        {showTable && table ? <DataTable data={table} /> : children}
      </div>

      {legend && legend.length > 1 && !showTable ? (
        <div className="mt-4">
          <Legend items={legend} />
        </div>
      ) : null}

      {source ? (
        <figcaption className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted">
          {source}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Absolutely positioned readout: value leads, label follows. */
export function Tooltip({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-lg border border-line-strong bg-surface-raised px-3 py-2 text-xs shadow-[var(--shadow-lift)]"
      style={{ left: `${x}%`, top: `${y}%`, minWidth: "8.5rem" }}
    >
      {children}
    </div>
  );
}

export function TooltipRow({
  color,
  label,
  value,
}: {
  color?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="flex items-center gap-1.5 text-muted">
        {color ? (
          <span aria-hidden className="h-0.5 w-3 rounded-full" style={{ background: color }} />
        ) : null}
        {label}
      </span>
      <span className="tnum font-semibold text-ink">{value}</span>
    </div>
  );
}
