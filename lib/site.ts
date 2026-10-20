/**
 * Single source of truth for identity, contact details and resume files.
 * Everything here is verified against Yanay's own CV files and public profiles.
 * Nothing in this file may be guessed: if a value is unknown, leave it out.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://yanay-berdah.vercel.app";

export const profile = {
  name: "Yanay Berdah",
  role: "Data Analyst",
  positioning: "Data Analyst · SQL & Python · AI and automation",
  location: "Israel",
  email: "yanayberdah@gmail.com",
  phone: "054-5404192",
  phoneHref: "tel:+972545404192",
  github: "https://github.com/yanaybe",
  githubHandle: "github.com/yanaybe",
  linkedin: "https://www.linkedin.com/in/yanay-berdah-144bb1123",
  linkedinHandle: "linkedin.com/in/yanay-berdah",
  tagline: "Data. AI. Engineering.",
  summary:
    "Data analyst with three and a half years in Unit 8200, investigating complex questions across large, multi-source datasets — and building the Python and SQL systems that act on the answers.",
} as const;

export const resumes = [
  {
    label: "Data Analyst",
    description: "Analysis, SQL and Python, product and business questions.",
    file: "/resume/Yanay-Berdah-Data-Analyst.pdf",
    download: "Yanay-Berdah-Data-Analyst.pdf",
  },
  {
    label: "Data & AI / Data Engineering",
    description: "Pipelines, ETL, backend and AI-system work.",
    file: "/resume/Yanay-Berdah-Data-AI-Engineering.pdf",
    download: "Yanay-Berdah-Data-AI-Engineering.pdf",
  },
] as const;

export const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/analytics", label: "Data showcase" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;
