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
        User research
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Understanding user needs and behaviors is crucial for creating effective
        designs. This process involves gathering insights through various methods,
        including interviews, surveys, and usability testing.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Information architecture
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Information architecture involves organizing and structuring content in a way that makes it easy for users to find and understand. This includes creating clear navigation, labeling, and categorization.
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
      "/photos/projects/Artsy/1.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/Artsy/2.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/Artsy/3.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/photos/projects/Artsy/4.jpg",
  },
];
