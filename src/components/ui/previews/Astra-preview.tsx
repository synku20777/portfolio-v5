"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../layout-grid";
import ErrorBoundary from "@/components/ErrorBoundry";

export function LayoutGridDemo() {
  return (
    <ErrorBoundary>
      <div className="h-screen w-full">
        <LayoutGrid cards={cards} />
      </div>
    </ErrorBoundary>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Mobile app design
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Modern mobile apps with a sleek and minimalist design, improved user experience and faster shipping times.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Physical medium
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Creating physical mediums such as posters, brochures, and business cards to enhance brand visibility and engagement. These tangible materials provide a lasting impression and complement digital marketing strategies.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Branding
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Comprehensive branding solutions including logo design, color schemes, typography, and brand guidelines to establish a strong and cohesive brand identity across all platforms.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Prototypes
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Prototypes are early samples or models of a product used to test a concept or process. They help designers explore ideas and gather feedback before finalizing the design.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "/photos/projects/Astra/1.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/Astra/PosterBlack 1-1.webp",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/Astra/Logotype-1.webp",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/photos/projects/Astra/4.jpg",
  },
];
