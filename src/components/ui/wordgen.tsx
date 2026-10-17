"use client";
import { Fragment, type CSSProperties } from "react";
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
  const wordsArray = words.split(" ");

  return (
    <span className={cn("inline", className)}>
      {wordsArray.map((word, idx) => (
        <Fragment key={word + idx}>
          <span
            className="inline-block motion-safe:animate-[word-appear_0.6s_both]"
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${idx * 0.12}s`,
              "--word-blur": filter ? "8px" : "0px",
            } as CSSProperties}
          >
            {word}
          </span>
          {idx < wordsArray.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
};
