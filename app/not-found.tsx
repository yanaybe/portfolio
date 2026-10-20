import Link from "next/link";
import { PrimaryLink, SecondaryLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-5 py-24 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink">
        That page is not here
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
        The link may be out of date. The featured work and the interactive data showcase are both
        one click away.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <PrimaryLink href="/">Back to the homepage</PrimaryLink>
        <SecondaryLink href="/analytics">Interactive data showcase</SecondaryLink>
      </div>
      <p className="mt-10 text-sm text-muted">
        Or go straight to{" "}
        <Link href="/#contact" className="font-medium text-accent-ink underline underline-offset-4">
          contact
        </Link>
        .
      </p>
    </div>
  );
}
