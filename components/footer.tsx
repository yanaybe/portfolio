import Link from "next/link";
import { profile, resumes } from "@/lib/site";
import { GitHub, LinkedIn, Mail, Phone } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-sm font-semibold text-ink">{profile.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">
            {profile.positioning}. Based in {profile.location}, open to data analyst, product
            analyst and data/AI roles.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={profile.github}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2 transition-colors hover:text-ink"
              aria-label="GitHub profile"
            >
              <GitHub />
            </a>
            <a
              href={profile.linkedin}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2 transition-colors hover:text-ink"
              aria-label="LinkedIn profile"
            >
              <LinkedIn />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2 transition-colors hover:text-ink"
              aria-label={`Email ${profile.name}`}
            >
              <Mail />
            </a>
            <a
              href={profile.phoneHref}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2 transition-colors hover:text-ink"
              aria-label={`Call ${profile.name}`}
            >
              <Phone />
            </a>
          </div>
        </div>

        <nav aria-label="Sections">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/#work" className="text-ink-2 hover:text-ink">
                Featured work
              </Link>
            </li>
            <li>
              <Link href="/analytics" className="text-ink-2 hover:text-ink">
                Interactive data showcase
              </Link>
            </li>
            <li>
              <Link href="/#experience" className="text-ink-2 hover:text-ink">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="text-ink-2 hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Resume</p>
          <ul className="mt-3 space-y-2 text-sm">
            {resumes.map((r) => (
              <li key={r.file}>
                <a href={r.file} download={r.download} className="text-ink-2 hover:text-ink">
                  {r.label} (PDF)
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-line px-5 py-6 sm:px-8">
        <p className="text-xs leading-relaxed text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript and
          Tailwind CSS; charts are hand-built SVG. Every figure on this site comes from a public
          repository whose CI re-runs the analysis and fails if the numbers change.
        </p>
      </div>
    </footer>
  );
}
