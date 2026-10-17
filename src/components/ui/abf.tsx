"use client";

import { siteConfig } from "@/lib/site";
import { TextGenerateEffect } from "@/components/ui/wordgen";

export function BackgroundRippleEffectDemo() {
  return (
    <header className="w-full overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-16 sm:pb-16 sm:pt-24">
        <div className="flex flex-col items-start">
          <p className="text-base font-medium text-neutral-600 dark:text-neutral-400">{siteConfig.personName}</p>
          <h1 className="mt-5 max-w-[21ch] text-balance text-left text-4xl font-semibold leading-[1.12] tracking-[-0.04em] text-neutral-900 dark:text-neutral-100 sm:text-5xl lg:text-7xl">
            <TextGenerateEffect words="UX/UI designer and frontend developer" duration={0.6} />
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-xl">
            I design product interfaces and design systems, and build them in code.
            Clear structure, accessible interactions, and careful visual details guide my work.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#works"
              className="inline-flex min-h-11 items-center rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-sky-400"
            >
              View work
            </a>
            <a
              href={siteConfig.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-neutral-400 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:border-zinc-600 dark:text-neutral-100 dark:hover:bg-zinc-800 dark:focus-visible:outline-sky-400"
            >
              View CV
            </a>
            <a
              href={siteConfig.links.email}
              className="inline-flex min-h-11 items-center rounded-full border border-neutral-400 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:border-zinc-600 dark:text-neutral-100 dark:hover:bg-zinc-800 dark:focus-visible:outline-sky-400"
            >
              Contact
            </a>
          </div>
        </div>

        <dl className="mt-10 grid max-w-3xl gap-5 text-sm leading-relaxed sm:grid-cols-[auto_1fr] sm:gap-x-12">
          <div>
            <dt className="text-neutral-500 dark:text-neutral-400">Based in</dt>
            <dd className="mt-1 text-neutral-800 dark:text-neutral-200">{siteConfig.location}</dd>
          </div>
          <div>
            <dt className="text-neutral-500 dark:text-neutral-400">Availability</dt>
            <dd className="mt-1 text-neutral-800 dark:text-neutral-200">{siteConfig.availability}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
