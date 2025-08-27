"use client";
import React from "react";
import { cn } from "@/lib/utils";


type Card = {
  id: number;
  content: React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className)}>
          <div
            className={cn(
              "relative h-full w-full overflow-hidden rounded-xl group bg-white"
            )}
          >
            <img
              src={card.thumbnail}
              height={500}
              width={500}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-101"
              alt="thumbnail"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/60" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
              {card.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};