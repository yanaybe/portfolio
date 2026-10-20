import type { ReactNode } from "react";

const KEYWORDS: Record<string, string[]> = {
  sql: [
    "select","from","where","group","by","order","having","join","left","right","inner","full",
    "outer","on","as","with","case","when","then","else","end","and","or","not","in","is","null",
    "count","sum","avg","min","max","distinct","over","partition","union","all","create","table",
    "view","insert","into","values","limit","asc","desc","between","cast","coalesce","filter",
    "round","using","exists","lateral","unnest","interval","date_trunc","extract","percentile_cont",
  ],
  python: [
    "import","from","as","def","return","if","elif","else","for","in","while","with","try","except",
    "finally","raise","class","lambda","not","and","or","is","None","True","False","assert","yield",
    "pass","continue","break","global","await","async",
  ],
};

type Token = { text: string; kind: "comment" | "string" | "number" | "keyword" | "plain" };

/** Single ordered scan, so a keyword inside a string or comment is never re-coloured. */
function tokenize(source: string, lang: "sql" | "python"): Token[] {
  const commentStart = lang === "sql" ? "--" : "#";
  const keywords = new Set(KEYWORDS[lang]);
  const tokens: Token[] = [];
  let buffer = "";

  const flush = () => {
    if (!buffer) return;
    // split the plain buffer into words so keywords and numbers can be marked
    const parts = buffer.split(/(\b)/);
    for (const part of parts) {
      if (!part) continue;
      if (keywords.has(part) || keywords.has(part.toLowerCase())) {
        tokens.push({ text: part, kind: "keyword" });
      } else if (/^\d[\d_.]*$/.test(part)) {
        tokens.push({ text: part, kind: "number" });
      } else {
        tokens.push({ text: part, kind: "plain" });
      }
    }
    buffer = "";
  };

  let i = 0;
  while (i < source.length) {
    if (source.startsWith(commentStart, i)) {
      flush();
      const end = source.indexOf("\n", i);
      const stop = end === -1 ? source.length : end;
      tokens.push({ text: source.slice(i, stop), kind: "comment" });
      i = stop;
      continue;
    }
    const char = source[i];
    if (char === "'" || char === '"') {
      flush();
      let j = i + 1;
      while (j < source.length && source[j] !== char) j += source[j] === "\\" ? 2 : 1;
      tokens.push({ text: source.slice(i, Math.min(j + 1, source.length)), kind: "string" });
      i = j + 1;
      continue;
    }
    buffer += char;
    i += 1;
  }
  flush();
  return tokens;
}

const CLASS: Record<Token["kind"], string> = {
  comment: "text-muted italic",
  string: "text-code-string",
  number: "text-code-number",
  keyword: "text-accent-ink font-medium",
  plain: "",
};

export function CodeBlock({
  code,
  lang,
  filename,
  caption,
}: {
  code: string;
  lang: "sql" | "python";
  filename?: string;
  caption?: ReactNode;
}) {
  const tokens = tokenize(code.trim(), lang);
  return (
    <figure className="min-w-0 overflow-hidden rounded-xl border border-line bg-surface">
      {filename ? (
        <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2">
          <span className="font-mono text-[11.5px] text-ink-2">{filename}</span>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">
            {lang}
          </span>
        </div>
      ) : null}
      <pre
        tabIndex={0}
        role="region"
        aria-label={filename ? `Code sample: ${filename}` : `${lang} code sample`}
        className="thin-scroll overflow-x-auto p-4 text-[12.5px] leading-[1.7]"
      >
        <code className="font-mono">
          {tokens.map((token, index) => (
            <span key={index} className={CLASS[token.kind]}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
      {caption ? (
        <figcaption className="border-t border-line px-4 py-3 text-xs leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
