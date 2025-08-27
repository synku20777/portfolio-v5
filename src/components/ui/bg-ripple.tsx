"use client";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { TextGenerateEffect } from "@/components/ui/wordgen";



export function BackgroundRippleEffectDemo() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 flex-col gap-3 items-start justify-start">
        <h2 className="relative z-10 text-left text-6xl font-black text-neutral-800 dark:text-neutral-100 md:text-8xl lg:text-9xl/28">
          <TextGenerateEffect words={"I make complex products feel simple."} />
        </h2>
        <p className="relative text-lg z-10 mt-10 max-w-xl text-left hyphens-auto text-neutral-900 dark:text-neutral-500">
          I craft accessible, scalable UX and developer-ready components for fast-moving teams.
        </p>
      </div>
    </section>
  );
}
