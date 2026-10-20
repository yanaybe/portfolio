"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, profile, resumes } from "@/lib/site";
import { Close, Download, Menu } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-ink"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-[11px] font-bold tracking-[0.02em] text-accent-ink"
          >
            YB
          </span>
          <span className="hidden whitespace-nowrap lg:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[13.5px] font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={resumes[0].file}
            download={resumes[0].download}
            className="hidden items-center gap-2 rounded-lg bg-ink px-3.5 py-2 text-[13px] font-semibold text-bg transition-opacity hover:opacity-90 sm:flex"
          >
            <Download width={14} height={14} />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-line bg-bg px-5 pb-5 pt-2 md:hidden"
        >
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-2 hover:bg-surface hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={resumes[0].file}
                download={resumes[0].download}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-accent-ink"
              >
                <Download width={14} height={14} />
                Download resume
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
