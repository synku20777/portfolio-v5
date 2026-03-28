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
  const scope = useRef<HTMLDivElement>(null);
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
      <div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <span
              key={word + idx}
              className="dark:text-white opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn(className)}>
      <div className="mt-4">
        <div className=" dark:text-white tracking-tight">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
