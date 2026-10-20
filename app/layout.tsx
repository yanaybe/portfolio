import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { profile, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Yanay Berdah — data analyst with three and a half years in Unit 8200. Advanced SQL and Python, AI and automation, and public, reproducible analysis projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Data Analyst · SQL, Python, AI`,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "data analyst",
    "product data analyst",
    "BI analyst",
    "analytics engineer",
    "SQL",
    "Python",
    "data and AI",
    "Unit 8200",
    "Israel",
    profile.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: `${profile.name} — Data Analyst · SQL, Python, AI`,
    description,
    url: siteUrl,
    siteName: `${profile.name} — portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Data Analyst`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Data Analyst",
  description,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  telephone: "+972-54-540-4192",
  address: { "@type": "PostalAddress", addressCountry: "IL" },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Data analysis",
    "SQL",
    "Python",
    "Statistical modelling",
    "Product analytics",
    "ETL and data pipelines",
    "Large language models",
    "Automation",
  ],
  knowsLanguage: ["Hebrew", "English"],
};

/** Set the stored theme before first paint so the page never flashes. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
