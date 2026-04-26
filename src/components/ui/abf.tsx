"use client";

import { TextGenerateEffect } from "@/components/ui/wordgen";
import { siteConfig } from "@/lib/site";

const proofItems = [
  {
    label: "Based in",
    value: siteConfig.location,
  },
  {
    label: "Current focus",
    value: "Design systems, product UX, and frontends with strong visual discipline.",
  },
  {
    label: "Strength",
    value: "Clear structure, restrained motion, and interfaces that feel considered.",
  },
  {
    label: "Availability",
    value: siteConfig.availability,
  },
];

export function BackgroundRippleEffectDemo() {
  return (
    <header className="w-full overflow-hidden">
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-between gap-[clamp(2rem,7svh,6rem)] px-6 pb-[clamp(1.5rem,5svh,4rem)] pt-[clamp(6rem,13svh,9rem)]">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-left text-4xl font-black leading-tight tracking-tight text-neutral-800 dark:text-neutral-100 md:text-5xl lg:text-6xl xl:text-6xl">
          <TextGenerateEffect words={"Hey, I'm Nestors 👋"} />
          </h1>
          <p className="mt-2 max-w-xl text-left text-lg text-neutral-900 hyphens-auto dark:text-neutral-500 lg:text-xl xl:text-2xl">
            Welcome to my portfolio website. I like building web solutions.
          </p>
          <p className="mt-2 max-w-xl text-left text-lg text-neutral-900 hyphens-auto dark:text-neutral-500 lg:text-xl xl:text-2xl">
            In my free time, I enjoy cooking, looking at the night sky, taking pictures and going somewhere unknown in my car.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={siteConfig.links.email}
              className="inline-flex items-center text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              Contact: {siteConfig.links.email.replace("mailto:", "")}
            </a>
          </div>
        </div>

        <div className="grid w-full gap-3 pb-12 md:grid-cols-2 xl:grid-cols-4">
          {proofItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-neutral-200 bg-white/80 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/70"
            >
              <p className="text-xs font-semibold text-neutral-400 dark:text-zinc-500">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
