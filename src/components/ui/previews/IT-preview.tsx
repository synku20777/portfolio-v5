"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../layout-grid";

export function LayoutGridDemo() {
  return (
    <div className="h-screen w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Website redesign
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Modern websites with a sleek and minimalist design, improved user experience and clear CTAs.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Responsive web design
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Creating responsive web designs that adapt to various screen sizes and devices, ensuring a seamless user experience across all platforms.
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
        Market research
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Conducting thorough market research to understand user needs, preferences, and behaviors. Establishing a clear value proposition is essential. This process informs design decisions and helps create products that resonate with the target audience.
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
      "/photos/projects/It-Workshop/1.webp",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/It-Workshop/2.webp",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/It-Workshop/logo.svg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2 object-fill",
    thumbnail:
      "/photos/projects/It-Workshop/5.webp",
  },
];
