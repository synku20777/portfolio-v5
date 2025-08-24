"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  triggerOffset = 0.12, // + = earlier, - = later
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  triggerOffset?: number;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start mapping a bit earlier and end a bit earlier within the viewport
    offset: ["start 0.1", "end 0.05"],
  });
  const cardLength = content.length;

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Bias forward so the next card activates sooner
    const p = clamp01(latest + triggerOffset);

    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(p - breakpoint);
        if (distance < Math.abs(p - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <div
      ref={ref}
      className="mx-auto flex w-full max-w-7xl items-start rounded-md py-10 gap-8 flex-col lg:flex-row lg:gap-16 lg:py-16"
    >
      {/* Image / sticky panel FIRST on mobile, SECOND on large screens */}
      <div
        id="sticky-gradient"
        style={{ background: backgroundGradient }}
        className={cn(
          // Mobile: not sticky, full width, reasonable height
          // Desktop: sticky, tall viewport height
          "order-1 w-full rounded-md bg-white h-64 sm:h-80 md:h-[50dvh] lg:h-[70dvh] lg:sticky lg:top-12 lg:order-2",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>

      {/* Text column SECOND on mobile, FIRST on large screens */}
      <div className="order-2 w-full max-w-2xl flex flex-col gap-12 lg:order-1 lg:gap-24">
        {content.map((item, index) => (
          <div key={item.title + index}>
            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="text-xl font-bold text-slate-100 md:text-2xl lg:text-3xl"
            >
              {item.title}
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="text-md mt-6 max-w-prose text-slate-300 md:text-lg lg:text-xl"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
        <div className="h-40" />
      </div>
    </div>
  );
};
