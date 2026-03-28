import {
  IconArticle,
  IconBrandLinkedin,
  IconBriefcase,
  IconFileDescription,
  IconHome,
  IconMoonFilled,
  IconSunFilled,
  IconUser,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import type { MouseEvent } from "react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export type DockMode = "light" | "dark";

export interface DockItem {
  title: string;
  href: string;
  icon: TablerIcon;
  iconClassName: string;
  onClick?: () => void;
}

interface DockItemConfig {
  mode: DockMode;
  toggleTheme: () => void;
}

export function getDockItems({ mode, toggleTheme }: DockItemConfig): DockItem[] {
  return [
    {
      title: "Home",
      href: "/",
      icon: IconHome,
      iconClassName: "h-full w-full text-neutral-500 dark:text-neutral-300",
    },
    {
      title: "Works",
      href: "/#works",
      icon: IconBriefcase,
      iconClassName: "h-full w-full text-neutral-500 dark:text-neutral-300",
    },
    {
      title: "About",
      href: "/#about",
      icon: IconUser,
      iconClassName: "h-full w-full text-neutral-500 dark:text-neutral-300",
    },
    {
      title: "Blog",
      href: "/blog",
      icon: IconArticle,
      iconClassName: "h-full w-full text-neutral-500 dark:text-neutral-300",
    },
    {
      title: "CV",
      href: "https://drive.google.com/file/d/1tzd0B9J5t-AOfYvCQYCJhqMAl_u7cEu9/view?usp=sharing",
      icon: IconFileDescription,
      iconClassName: "h-full w-full text-neutral-500 dark:text-neutral-300",
    },
    {
      title: "LinkedIn",
      href: "https://linkedin.com/in/nestor-kulik",
      icon: IconBrandLinkedin,
      iconClassName: "h-full w-full text-neutral-500 dark:text-neutral-300",
    },
    {
      title: mode === "dark" ? "Light Mode" : "Dark Mode",
      href: "#",
      icon: mode === "dark" ? IconSunFilled : IconMoonFilled,
      iconClassName:
        mode === "dark"
          ? "h-full w-full text-yellow-500 dark:text-yellow-400"
          : "h-full w-full text-neutral-700 dark:text-neutral-300",
      onClick: toggleTheme,
    },
  ];
}

export function handleDockLinkClick(
  event: MouseEvent<HTMLElement>,
  href: string,
  onClick?: () => void,
) {
  if (onClick) {
    event.preventDefault();
    onClick();
    return;
  }

  if (href.startsWith("#") || (href === "/" && window.location.pathname === "/")) {
    event.preventDefault();

    if (href === "/" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.startsWith("#") ? href.substring(1) : href;
    smoothScrollTo(targetId);
  }
}
