"use client";

import React, { useEffect, useState } from "react";
import Tooltip from "@/components/tooltip";

interface EmojiState {
  emoji: string;
  tooltipContent: string;
}

const rigaCalendar = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Riga",
  hour: "numeric",
  hour12: false,
  weekday: "short",
});

function getRigaParts() {
  const parts = rigaCalendar.formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Mon";

  return {
    hour,
    isWeekend: weekday === "Sat" || weekday === "Sun",
  };
}

const getCurrentEmojiState = (): EmojiState => {
  const { hour, isWeekend } = getRigaParts();

  if (isWeekend) {
    if (hour >= 0 && hour < 10) {
      return { emoji: "\uD83D\uDE34", tooltipContent: "I'm sleeping" };
    }
    if (hour >= 10 && hour < 11) {
      return { emoji: "\uD83D\uDED2", tooltipContent: "I'm buying groceries" };
    }
    if (hour >= 11 && hour < 14) {
      return { emoji: "\uD83E\uDD58", tooltipContent: "I'm cooking meals" };
    }
    if (hour >= 14 && hour < 18) {
      return { emoji: "\uD83C\uDF3F", tooltipContent: "I'm touching grass or trees" };
    }
    if (hour >= 18 && hour < 22) {
      return { emoji: "\uD83C\uDFAE", tooltipContent: "I'm gaming" };
    }
    return { emoji: "\uD83D\uDC7D", tooltipContent: "I'm looking for aliens" };
  }

  if (hour >= 0 && hour < 8) {
    return { emoji: "\uD83D\uDE34", tooltipContent: "I'm sleeping" };
  }
  if (hour >= 8 && hour < 14) {
    return { emoji: "\uD83D\uDCDA", tooltipContent: "I'm studying" };
  }
  if (hour >= 14 && hour < 16) {
    return { emoji: "\uD83E\uDDF9", tooltipContent: "I'm doing house work" };
  }
  if (hour >= 16 && hour < 20) {
    return { emoji: "\uD83C\uDFAE", tooltipContent: "I'm gaming" };
  }
  if (hour >= 20 && hour < 22) {
    return { emoji: "\uD83C\uDFA8", tooltipContent: "I'm working on hobbies" };
  }
  return { emoji: "\uD83C\uDFAC", tooltipContent: "I'm watching movies" };
};

export default function CurrentlyEmoji() {
  const [emojiState, setEmojiState] = useState<EmojiState>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("currentEmojiState");
        const currentState = getCurrentEmojiState();

        if (cached) {
          const parsedCache = JSON.parse(cached);
          return parsedCache.tooltipContent === currentState.tooltipContent
            ? parsedCache
            : currentState;
        }

        return currentState;
      } catch {
        return getCurrentEmojiState();
      }
    }

    return getCurrentEmojiState();
  });

  const shouldAnimate =
    typeof window !== "undefined" && !localStorage.getItem("initialPageLoad");

  useEffect(() => {
    const interval = setInterval(() => {
      const newState = getCurrentEmojiState();
      setEmojiState(newState);
      localStorage.setItem("currentEmojiState", JSON.stringify(newState));
    }, 60000);

    if (shouldAnimate) {
      localStorage.setItem("initialPageLoad", "true");
    }

    return () => clearInterval(interval);
  }, [shouldAnimate]);

  return (
    <Tooltip content={emojiState.tooltipContent}>
      <span className={`cursor-default ${shouldAnimate ? "initial-fade-in emoji-fade-in" : ""}`}>
        {emojiState.emoji}
      </span>
    </Tooltip>
  );
}
