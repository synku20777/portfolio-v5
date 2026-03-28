import * as React from "react";
import { IconArrowBigUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import Clock from "@/components/clock";
import Emoji from "@/components/emoji";

type LinkItem = { label: string; href: string; external?: boolean };
type Column = { title: string; links: LinkItem[] };

type FooterProps = {
  name: string;
  year?: number;
  columns?: Column[];
};


// Helper to find the nearest scrollable ancestor
function getScrollParent(node: Element | null): Element {
  let el: Element | null = node;
  while (el && el !== document.body) {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    const canScroll = /(auto|scroll|overlay)/.test(overflowY);
    if (canScroll) {
      const h = (el as HTMLElement);
      if (h.scrollHeight > h.clientHeight) return el;
    }
    el = el.parentElement;
  }
  return (document.scrollingElement || document.documentElement || document.body) as Element;
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
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Socials",
      links: [
        { label: "LinkedIn", href: "https://linkedin.com/nestor-kulik", external: true },
        { label: "GitHub", href: "https://github.com/synku20777", external: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Contact", href: "mailto:nestor.kulik@gmail.com", external: true },
        { label: "CV", href: "https://drive.google.com/file/d/1tzd0B9J5t-AOfYvCQYCJhqMAl_u7cEu9/view?usp=sharing", external: true },
      ],
    },
  ],
}: FooterProps) {
  const footerRef = React.useRef<HTMLElement | null>(null);

  const scrollToTop = React.useCallback(() => {
    const container = getScrollParent(footerRef.current);
    (container as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFooterLinkClick = (e: React.MouseEvent, href: string, external?: boolean) => {
    if (external || !href.startsWith('#')) return;
    
    e.preventDefault();
    const targetId = href.substring(1);
    
    // Handle the empty anchor case (scroll to top)
    if (!targetId) {
      scrollToTop();
      return;
    }
    
    smoothScrollTo(targetId);
  };

  return (
   <footer
      ref={footerRef}
      className="relative w-full border-t bg-neutral-50/60 py-12 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-8">
        {/* Top grid: 3 columns */}
        <nav aria-label="Footer" className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <div className="mt-2 h-px w-full bg-neutral-300/80 dark:bg-neutral-700/60" />
              <ul className="mt-4 space-y-3">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleFooterLinkClick(e, item.href, item.external)}
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

        {/* Bottom row */}
        <div className="mt-10 grid items-end gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Left: copyright block */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex flex-row mb-2 space-x-2">
              <Emoji />
              <Clock />
            </div>
            <p className="text-2xl font-extrabold leading-tight md:text-3xl">
              © {year} {name}
              <span className="font-medium"> All rights reserved.</span>
            </p>
          </div>

          {/* Right: back-to-top */}
          <div className="flex items-end z-100 justify-start">
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