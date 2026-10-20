/**
 * Verified biography content. Sources: Yanay's own CV files (the two PDFs this
 * site serves) and his written brief. Anything not in one of those does not
 * belong here — in particular, no invented employers, metrics, or dates, and
 * nothing about the substance of classified work.
 */

export type SkillGroup = {
  title: string;
  emphasis: boolean;
  blurb: string;
  skills: string[];
  evidence?: { label: string; href: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Data analysis",
    emphasis: true,
    blurb:
      "Investigating questions across large, multi-source data: deciding what the data can and cannot answer, then answering it.",
    skills: [
      "Advanced SQL",
      "Python (pandas, NumPy)",
      "Exploratory analysis",
      "Data cleaning & validation",
      "Pattern and anomaly identification",
      "Funnel & cohort analysis",
      "Logistic regression",
      "Empirical Bayes",
      "Hypothesis testing",
      "Experiment design & sizing",
      "Out-of-sample validation",
    ],
    evidence: [
      { label: "Severity model, AUC 0.76", href: "/projects/israel-road-safety" },
      { label: "Release impact & Simpson's paradox", href: "/projects/navigation-analytics" },
      { label: "Model validation", href: "/projects/roomatch-matching" },
    ],
  },
  {
    title: "AI & automation",
    emphasis: true,
    blurb:
      "Putting models inside working systems — and keeping the cheap, private path in front of the expensive one.",
    skills: [
      "LLM integrations (OpenAI)",
      "Speech-to-text pipelines",
      "Unstructured text → structured records",
      "AI-based data cross-referencing",
      "Workflow automation in Python & SQL",
      "AI-assisted analysis and development",
    ],
    evidence: [{ label: "Detour's recognition pipeline", href: "/projects/detour" }],
  },
  {
    title: "Data & backend engineering",
    emphasis: false,
    blurb: "The pipeline, the schema and the API behind an analysis or a product.",
    skills: [
      "ETL & data pipelines",
      "Data modelling",
      "PostgreSQL / Supabase",
      "DuckDB",
      "REST APIs",
      "Edge Functions (Deno/TypeScript)",
      "FastAPI",
      "AWS Lambda & S3",
      "Rate limiting & cost control",
      "Production debugging",
    ],
    evidence: [{ label: "Detour's backend", href: "/projects/detour" }],
  },
  {
    title: "Reporting & dashboards",
    emphasis: false,
    blurb: "Getting a finding in front of someone who has to act on it.",
    skills: ["Power BI", "Tableau", "KPI reporting", "Interactive dashboards", "Data storytelling"],
    evidence: [
      {
        label: "Road-safety dashboard",
        href: "https://yanaybe.github.io/israel-road-safety-analysis/",
      },
    ],
  },
  {
    title: "Development & tools",
    emphasis: false,
    blurb: "Enough engineering to ship the thing, test it and keep it reproducible.",
    skills: [
      "Git / GitHub",
      "GitHub Actions CI",
      "Docker",
      "TypeScript / JavaScript",
      "React & Next.js",
      "Node.js",
      "Kotlin & Jetpack Compose",
      "pytest",
      "HTML / CSS",
    ],
  },
];

export type Role = {
  title: string;
  org: string;
  period: string;
  summary: string;
  bullets: string[];
  note?: string;
};

export const experience: Role[] = [
  {
    title: "Data Analyst / Data Developer",
    org: "Unit 8200, Israeli Intelligence Corps",
    period: "March 2023 – October 2026",
    summary:
      "Three and a half years investigating complex questions across large, multi-source datasets, and building the Python and SQL systems that turned the answers into routine capability.",
    bullets: [
      "Investigated large-scale, multi-source datasets to identify patterns, anomalies and relationships, and delivered findings to decision-makers.",
      "Wrote and optimised complex SQL to combine, validate and analyse data across sources, improving the reliability of recurring analytical workflows.",
      "Built Python and SQL automation that cut a core data-processing workflow from two hours to five minutes.",
      "Designed and built an AI-based data cross-referencing system; the team was recognised with the Aman Award for Excellence for its operational impact.",
      "Performed data cleaning, validation and modelling to raise confidence in analytical results.",
      "Led a team of four analysts for over six months — reviewing outputs, mentoring and prioritising under tight deadlines.",
      "Translated stakeholder questions into data requirements, analysis and recommendations; the solutions were adopted by four teams across the unit.",
    ],
    note:
      "Described at the level of method and responsibility only. No classified subject matter, systems or results appear on this site.",
  },
  {
    title: "Freelance & independent product work",
    org: "Detour (client) · RooMatch (own product)",
    period: "2026 – present",
    summary:
      "Client and personal work that spans the whole path: product decisions, schema, backend, app, and the analysis that checks whether any of it worked.",
    bullets: [
      "Building Detour, an AI-powered place-discovery Android app for a client: Kotlin/Compose client, Supabase Edge Functions, OpenAI and Google Places/Directions integrations, rate limiting and cost controls.",
      "Built and launched RooMatch, a roommate-matching platform with a weighted compatibility score, in React, TypeScript and Supabase.",
      "Audited my own matching algorithm against behaviour, found five real defects in code review, and shipped the fixes with regression tests.",
      "Published three analysis repositories whose CI re-runs the analysis and fails if any committed number changes.",
    ],
  },
];

export const recognition = {
  title: "Head of the Military Intelligence Directorate (Aman) Award for Excellence",
  year: "2025",
  teamClaim:
    "A team award, given for the operational impact of an AI-based data cross-referencing system.",
  personalClaim:
    "My part was designing and building the cross-referencing system at the centre of it. The recognition belongs to the team; this is the piece I owned.",
};

export const education = [
  {
    title: "Data Analysis Course",
    org: "Unit 8200, IDF",
    detail: "The unit's analyst training track.",
  },
  {
    title: "Computer science and physics",
    org: "Secondary education, Israel",
    detail: "10-unit computer science and 5-unit physics matriculation tracks.",
  },
];

export const languages = [
  { name: "Hebrew", level: "Native" },
  { name: "English", level: "Fluent" },
];
