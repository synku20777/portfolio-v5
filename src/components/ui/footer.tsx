import * as React from "react";
import { IconArrowBigUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import Clock from "@/components/clock";
import Emoji from "@/components/emoji";
import { siteConfig } from "@/lib/site";

type LinkItem = { label: string; href: string; external?: boolean };
type Column = { title: string; links: LinkItem[] };

type FooterProps = {
  name: string;
  year?: number;
  columns?: Column[];
};

function getScrollParent(node: Element | null): Element {
  let el: Element | null = node;
  while (el && el !== document.body) {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    const canScroll = /(auto|scroll|overlay)/.test(overflowY);
    if (canScroll) {
      const container = el as HTMLElement;
      if (container.scrollHeight > container.clientHeight) return el;
    }
    el = el.parentElement;
  }
  return (document.scrollingElement || document.documentElement || document.body) as Element;
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

export default function Footer({
  name,
  year = new Date().getFullYear(),
  columns = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "Works", href: "/#works" },
        { label: "About", href: "/#about" },
        { label: "Notes", href: siteConfig.links.notes },
      ],
    },
    {
      title: "Socials",
      links: [
        { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
        { label: "GitHub", href: siteConfig.links.github, external: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Contact", href: siteConfig.links.email, external: true },
        { label: "CV", href: siteConfig.links.cv, external: true },
      ],
    },
  ],
}: FooterProps) {
  const footerRef = React.useRef<HTMLElement | null>(null);

  const scrollToTop = React.useCallback(() => {
    const container = getScrollParent(footerRef.current);
    (container as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFooterLinkClick = (event: React.MouseEvent, href: string, external?: boolean) => {
    if (external) return;

    const samePageHash = getSamePageHash(href);
    const isHome = href === "/" && window.location.pathname === "/";

    if (!samePageHash && !isHome) return;

    event.preventDefault();

    if (!samePageHash) {
      scrollToTop();
      return;
    }

    smoothScrollTo(samePageHash);
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t bg-neutral-50/60 py-12 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-8">
        <nav aria-label="Footer" className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <div className="mt-2 h-px w-full bg-neutral-300/80 dark:bg-neutral-700/60" />
              <ul className="mt-4 space-y-3">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(event) => handleFooterLinkClick(event, item.href, item.external)}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      target={item.external ? "_blank" : undefined}
                      className="text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10 grid items-end gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="col-span-2 md:col-span-2">
            <div className="mb-2 flex flex-row space-x-2">
              <Emoji />
              <Clock />
            </div>
            <p className="text-2xl font-extrabold leading-tight md:text-3xl">
              Copyright {year} {name}
              <span className="font-medium"> All rights reserved.</span>
            </p>
          </div>

          <div className="z-100 flex items-end justify-start">
            <Button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              variant="outline"
              size="icon"
              title="Back to top"
            >
              <IconArrowBigUp className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
