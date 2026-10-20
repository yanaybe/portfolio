/**
 * Project registry. Everything here is checkable: each entry links to a public
 * repository or a live product, and every number quoted comes from that repo's
 * committed analysis output. Nothing is estimated or rounded up for effect.
 */

export type ProjectStat = { value: string; label: string };

export type ProjectLink = {
  href: string;
  label: string;
  kind: "repo" | "live" | "case" | "pr";
};

export type Project = {
  slug: string;
  kind: "Data analysis" | "Product analytics" | "AI engineering" | "Model validation";
  title: string;
  question: string;
  summary: string;
  dataNote?: string;
  role: string;
  stack: string[];
  methods: string[];
  stats: ProjectStat[];
  links: ProjectLink[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "israel-road-safety",
    kind: "Data analysis",
    title: "Israel's roads: fewer crashes reported, more of them deadly",
    question: "Are the roads getting safer?",
    summary:
      "Every police-recorded injury crash in Israel from 2020 to 2024 — 49,941 of them, from the Central Bureau of Statistics. The headline count falls 23% and reads like progress. Fatal crashes rose 42% over the same years, and fatal crashes are the series that does not depend on whether anyone filed a report.",
    dataNote: "Real public data (CBS Public Use File, open licence).",
    role:
      "Sole analyst: sourcing, cleaning, SQL modelling, the severity model, the hotspot ranking, the dashboard and the CI that re-runs all of it.",
    stack: ["Python", "pandas", "statsmodels", "pyproj", "DuckDB SQL", "GitHub Actions"],
    methods: [
      "Measurement artefact vs real change",
      "Logistic severity model",
      "Empirical Bayes",
      "Out-of-sample validation",
    ],
    stats: [
      { value: "49,941", label: "injury crashes analysed" },
      { value: "+42%", label: "fatal crashes, 2020 → 2024" },
      { value: "0.76", label: "cross-validated AUC, severity model" },
    ],
    links: [
      { href: "https://github.com/yanaybe/israel-road-safety-analysis", label: "Repository", kind: "repo" },
      {
        href: "https://yanaybe.github.io/israel-road-safety-analysis/",
        label: "Live dashboard",
        kind: "live",
      },
    ],
    featured: true,
  },
  {
    slug: "detour",
    kind: "AI engineering",
    title: "Detour: turning something you heard about into a place you can find",
    question: "Can a phone catch a place from a video or a sentence, and surface it when you drive past?",
    summary:
      "An Android app I build for a client. You press one button while a video is playing or while someone is talking; the app works out which real place was meant and reminds you when you are near it. Behind that button sit speech-to-text, an LLM extraction step, a Google Places verification step and a routing step — with the cheap, private path tried first every time.",
    role:
      "I build the app and its backend: the Kotlin/Compose client, the five Edge Functions, the provider integrations, the on-device-first recognition path, the rate limiting and the cost controls.",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Supabase Edge Functions (Deno/TypeScript)",
      "PostgreSQL",
      "OpenAI (whisper-1, gpt-4o-mini)",
      "Google Places API (New)",
      "Google Directions API",
      "ML Kit (on-device OCR)",
    ],
    methods: [
      "Unstructured content → structured records",
      "On-device before network",
      "Layered rate limiting",
      "Provider failure containment",
    ],
    stats: [
      { value: "5", label: "Edge Functions in production" },
      { value: "On-device first", label: "cheapest, most private path tried first" },
      { value: "4 layers", label: "rate limiting in front of paid APIs" },
    ],
    links: [{ href: "https://detour-app.store", label: "Product site", kind: "live" }],
    featured: true,
  },
  {
    slug: "navigation-analytics",
    kind: "Product analytics",
    title: "Did the two releases actually work?",
    question: "Where do we lose people, did the fixes work, and does it matter?",
    summary:
      "A product-analytics case study for a client's navigation app. The dashboard said recognition improved 12 points after two releases. Part of that was real and part of it was the user mix shifting — Simpson's paradox. Separating the two gave the client an honest number, and a retention finding that changed what to build next.",
    dataNote:
      "Client and app unnamed. Runs on synthetic data generated against the production schema; the SQL runs unchanged on production and returns only aggregates.",
    role:
      "Sole analyst: turning the client's worry into testable questions, the SQL, the inference, the recommendations and the experiment design.",
    stack: ["Python", "pandas", "statsmodels", "PostgreSQL", "DuckDB SQL", "GitHub Actions"],
    methods: [
      "Funnel analysis",
      "Release impact with a control path",
      "Simpson's paradox / Mantel-Haenszel",
      "Retention cohorts",
    ],
    stats: [
      { value: "+7.1 / +7.7 pp", label: "each release, on the path it targeted" },
      { value: "12 → 9 pp", label: "headline corrected for mix shift" },
      { value: "2.1×", label: "retention when the first save worked" },
    ],
    links: [
      {
        href: "https://github.com/yanaybe/navigation-app-product-analytics",
        label: "Repository",
        kind: "repo",
      },
    ],
    featured: true,
  },
  {
    slug: "roomatch-matching",
    kind: "Model validation",
    title: "Does a “match %” predict who actually connects?",
    question: "Nobody had checked whether the number on the card means anything.",
    summary:
      "RooMatch is a roommate-matching app I built. Every card shows an “NN% match” from about twenty hand-set weights. I ported the production scoring function to Python, verified the port against the live TypeScript on 1,500 pairs, then tested whether the score predicted who connected — and what the score left out.",
    dataNote:
      "Synthetic data on the production schema, scored by the production algorithm itself. No profiles, photos or message text.",
    role:
      "Built the app, then audited my own scoring function: code review, the Python port and its verification, the SQL funnel, the model and the fixes that followed.",
    stack: ["Python", "statsmodels", "scikit-learn", "DuckDB SQL", "PostgreSQL", "TypeScript"],
    methods: [
      "Treating a heuristic as a model",
      "Logistic regression with a popularity control",
      "Marketplace liquidity",
      "Code review before analysis",
    ],
    stats: [
      { value: "0.65 → 0.79", label: "AUC after re-weighting, on unseen users" },
      { value: "78%", label: "of likes go to someone who never saw the liker" },
      { value: "5", label: "real defects found in code review, all fixed" },
    ],
    links: [
      {
        href: "https://github.com/yanaybe/roomatch-matching-analysis",
        label: "Analysis repository",
        kind: "repo",
      },
      {
        href: "https://github.com/yanaybe/roommate-match/pull/6",
        label: "The fixes (PR #6)",
        kind: "pr",
      },
    ],
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);
