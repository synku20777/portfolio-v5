"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
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
    // container: ref,
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
      className="mx-auto flex w-full max-w-7xl items-start gap-16 rounded-md py-16"
      ref={ref}
    >
        <div className="min-w-md max-w-2xl flex flex-col gap-24">
          {content.map((item, index) => (
            <div key={item.title + index}>
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h4>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-kg mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      <div
        id="sticky-gradient"
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-12 self-start h-[70dvh] w-full rounded-md bg-white lg:block",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};