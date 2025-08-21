"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function BackgroundRippleEffectDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-32 w-full">
        <h2 className="relative z-10 mx-50 max-w-4xl text-left text-2xl font-black   tracking-normal text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Make complex products feel simple.
        </h2>
        <p className="relative z-10 mx-50 mt-4 max-w-xl text-left hyphens-auto text-neutral-800 dark:text-neutral-500">
          I craft accessible, scalable UX and developer-ready components for
          fast-moving teams
        </p>
      </div>
    </div>
  );
}
