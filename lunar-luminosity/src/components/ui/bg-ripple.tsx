"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function BackgroundRippleEffectDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-32 w-full">
        <h2 className="relative z-10 mx-50 max-w-4xl text-left text-2xl font-black   tracking-normal text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Interactive Background Boxes Ripple Effect
        </h2>
        <p className="relative z-10 mx-50 mt-4 max-w-xl text-left text-neutral-800 dark:text-neutral-500">
          Hover over the boxes above and click.To be used on backgrounds of hero
          sections OR Call to Action sections. I beg you don&apos;t use it
          everywhere.
        </p>
      </div>
    </div>
  );
}
