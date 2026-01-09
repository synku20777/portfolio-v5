"use client";
import { TextGenerateEffect } from "@/components/ui/wordgen";



export function BackgroundRippleEffectDemo() {
  return (
    <section className="flex min-h-[60dvh] w-full flex-col items-start justify-start overflow-hidden">
      <div className="relative z-20 mx-auto w-full flex max-w-7xl flex-col items-start justify-start gap-3 px-6 py-24 sm:py-32">
        <h2 className="text-left text-4xl font-black leading-tight tracking-tight text-neutral-800 dark:text-neutral-100 md:text-5xl lg:text-6xl xl:text-6xl">
          <TextGenerateEffect words={"Hey, I'm Nestors 👋"} />
        </h2>
        <p className="mt-2 max-w-xl text-left text-lg text-neutral-900 hyphens-auto dark:text-neutral-500 lg:text-xl xl:text-2xl">
          Welcome to my portfolio website. I like building web solutions.
        </p>
        <p className="mt-2 max-w-xl text-left text-lg text-neutral-900 hyphens-auto dark:text-neutral-500 lg:text-xl xl:text-2xl">
          In my free time, I enjoy cooking, looking at the night sky, taking pictures and going somewhere unknown in my car.
        </p>
      </div>
    </section>
  );
}
