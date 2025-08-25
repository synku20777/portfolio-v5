 import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconBriefcase,
  IconUser,
  IconTools,
} from "@tabler/icons-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      node: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Services",
      node: (
        <IconTools className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#services",
    },
    {
      title: "Works",
      node: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#works",
    },
    {
      title: "About",
      node: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: "GitHub",
      node: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/synku20777",
    },
    {
      title: "LinkedIn",
      node: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com/",
    },
    {
      title: "Mode",
      node: <ModeToggle />,
      href: "#",
    },
  ];
  return (
    <nav className="fixed z-100 bottom-5 flex items-center justify-center w-full">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links}
      />
    </nav>
  );
}