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
        Hub design
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Modern hub designs focus on seamless integration and user experience, providing a centralized platform for various services and applications.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
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
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Wireframing
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Wireframing is the process of creating a visual blueprint for a website or application. It involves sketching out the layout, structure, and functionality of the interface, allowing designers to plan and iterate on their ideas before moving into high-fidelity design.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Development with WordPress
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Development with WordPress involves creating flexible and customizable designs using the WordPress framework. This approach allows for rapid prototyping and iteration, ensuring that the final product meets user needs and business goals.
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
      "/photos/projects/CloudFirst/1.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/CloudFirst/2.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/CloudFirst/3.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/photos/projects/CloudFirst/4.jpg",
  },
];
