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
import { siteConfig } from "@/lib/site";

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
      title: "Notes",
      href: siteConfig.links.notes,
      icon: IconArticle,
      iconClassName: "h-full w-full text-neutral-500 dark:text-neutral-300",
    },
    {
      title: "CV",
      href: siteConfig.links.cv,
      icon: IconFileDescription,
      iconClassName: "h-full w-full text-neutral-500 dark:text-neutral-300",
    },
    {
      title: "LinkedIn",
      href: siteConfig.links.linkedin,
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

function getSamePageHash(href: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (href.startsWith("#")) {
    return href.slice(1);
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.pathname === "/" && window.location.pathname === "/" && url.hash) {
      return url.hash.slice(1);
    }
  } catch {}

  return null;
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

  const samePageHash = getSamePageHash(href);

  if (samePageHash !== null || (href === "/" && window.location.pathname === "/")) {
    event.preventDefault();

    if (href === "/" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    smoothScrollTo(samePageHash);
  }
}
