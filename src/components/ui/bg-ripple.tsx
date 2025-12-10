"use client";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { TextGenerateEffect } from "@/components/ui/wordgen";



export function BackgroundRippleEffectDemo() {
  return (
    <section className="flex min-h-[100dvh] w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-start justify-start gap-3 px-6 py-24 sm:py-32">
        <h2 className="text-left text-6xl font-black leading-tight tracking-tight text-neutral-800 dark:text-neutral-100 md:text-7xl lg:text-8xl xl:text-9xl">
          <TextGenerateEffect words={"I make complex products feel simple."} />
        </h2>
        <p className="mt-10 max-w-xl text-left text-lg text-neutral-900 hyphens-auto dark:text-neutral-500 sm:text-xl">
          I craft accessible, scalable UX and developer-ready components for fast-moving teams.
        </p>
      </div>
    </section>
  );
}
