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
        Product 
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Mocked up a design that focuses on a simple and intuitive user interface, allowing users to easily navigate and interact with the product seamleassly and without effort.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        User Research
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        User research involves understanding user behaviors, needs, and motivations through observation and interviews. This process helps inform design decisions and ensures the final product meets user expectations.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Ecommerce shop setup
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Ecommerce shop setup involved creating a comprehensive online store with WooCommerce that provides a seamless shopping experience for users. This includes designing intuitive navigation, product categorization, and a streamlined checkout process.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-xl text-md text-white">
        Branding
      </p>
      <p className="font-normal text-sm my-2 max-w-lg text-neutral-200">
        Branding involves creating a strong and consistent identity for a product or service. This includes designing a memorable logo, choosing a color palette, and defining typography that reflects the brand's values and resonates with its target audience.
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
      "/photos/projects/Firefly/1.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/Firefly/2.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/photos/projects/Firefly/3.png",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/photos/projects/Firefly/4.jpg",
  },
];
