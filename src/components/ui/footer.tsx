import * as React from "react";
import { IconArrowUp, IconArrowUpRight } from "@tabler/icons-react";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { siteConfig } from "@/lib/site";
import Clock from "@/components/clock";
import CurrentlyEmoji from "@/components/emoji";

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
    (container as HTMLElement).scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
  }, []);

  const handleFooterLinkClick = (event: React.MouseEvent, href: string, external?: boolean) => {
    if (external || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const samePageHash = getSamePageHash(href);
    const isHome = href === "/" && window.location.pathname === "/";

    if (!samePageHash && !isHome) return;

    event.preventDefault();

    if (!samePageHash) {
      scrollToTop();
      return;
    }

    smoothScrollTo(samePageHash, {
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
    >
      <div className="mx-auto max-w-7xl px-6 pb-40 pt-16 sm:pt-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <h2 className="max-w-[20ch] text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Have a role in mind?
          </h2>
          <p className="max-w-[42ch] text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {siteConfig.availability}
          </p>
        </div>

        <a
          href={siteConfig.links.email}
          className="footer-contact group mt-10 flex min-h-11 items-center justify-between gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:focus-visible:outline-sky-400 sm:mt-14"
        >
          <span className="relative block overflow-hidden whitespace-nowrap pb-[0.1em] text-[clamp(2.75rem,13.2vw,11rem)] font-semibold leading-[1.1] tracking-[-0.065em]">
            <span className="block motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(.22,1,.36,1)] motion-safe:group-hover:-translate-y-[115%] motion-safe:group-focus-visible:-translate-y-[115%]">
              Say hello.
            </span>
            <span aria-hidden="true" className="footer-contact-outline absolute inset-x-0 top-0 translate-y-[115%] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(.22,1,.36,1)] motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0">
              Say hello.
            </span>
          </span>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 sm:size-24 lg:size-32">
            <IconArrowUpRight aria-hidden="true" stroke={1.25} className="size-8 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:rotate-45 motion-safe:group-focus-visible:rotate-45 sm:size-14 lg:size-20" />
          </span>
        </a>
        <p className="mt-1 break-words text-base text-neutral-600 dark:text-neutral-300 sm:text-lg">
          {siteConfig.links.email.replace("mailto:", "")}
        </p>

        <div className="mt-12 grid gap-10 border-t border-neutral-300 pt-10 dark:border-neutral-700 lg:mt-16 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">{column.title}</h3>
                <ul>
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(event) => handleFooterLinkClick(event, item.href, item.external)}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        target={item.external ? "_blank" : undefined}
                        className="inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:focus-visible:outline-sky-400"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="flex flex-col items-start justify-between gap-8">
            <div className="flex items-center gap-3 text-base text-neutral-600 dark:text-neutral-300">
              <CurrentlyEmoji />
              <Clock />
            </div>
            <a
              href="#"
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                scrollToTop();
              }}
              className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-neutral-400 px-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:focus-visible:outline-sky-400"
            >
              Back to top
              <IconArrowUp aria-hidden="true" size={18} className="motion-safe:transition-transform motion-safe:group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        <p className="mt-12 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
