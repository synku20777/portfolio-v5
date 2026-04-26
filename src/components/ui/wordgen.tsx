"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const scope = useRef<HTMLSpanElement>(null);
  const wordsArray = words.split(" ");

  useEffect(() => {
    const elements = scope.current?.querySelectorAll("span");
    if (!elements?.length) return;

    const controls = animate(
      elements,
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration || 1,
        delay: stagger(0.2),
      }
    );

    return () => controls.stop();
  }, [duration, filter, words]);

  const renderWords = () => {
    return (
      <span ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <span
              key={word + idx}
              className="mr-[0.25em] inline-block opacity-0 last:mr-0 dark:text-white"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <span className={cn("inline-block", className)}>
      <span className="tracking-tight dark:text-white">{renderWords()}</span>
    </span>
  );
};
