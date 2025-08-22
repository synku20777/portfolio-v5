import * as React from "react";
import { IconArrowBigUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type LinkItem = { label: string; href: string; external?: boolean };
type Column = { title: string; links: LinkItem[] };

type FooterProps = {
  name: string;                    // e.g. "Huy Nguyen"
  year?: number;                   // default: current year
  columns?: Column[];              // optional override of the 3 columns
};

function LocalTime() {
  const [display, setDisplay] = React.useState<string>("");

  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });

    const tick = () => {
      const parts = fmt.formatToParts(new Date());
      const zone = parts.find(p => p.type === "timeZoneName")?.value ?? "";
      const time = parts.filter(p => p.type !== "timeZoneName").map(p => p.value).join("").trim();
      setDisplay(zone ? `${time}, ${zone}` : time);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-6 text-sm">
      <div className="font-semibold tracking-wide">LOCAL TIME</div>
      <div className="mt-1 tabular-nums text-neutral-600 dark:text-neutral-300">{display}</div>
    </div>
  );
}

export default function Footer({
  name,
  year = new Date().getFullYear(),
  columns = [
    {
      title: "Menu",
      links: [
        { label: "Home", href: "#" },
        { label: "Services", href: "#" },
        { label: "Works", href: "#" },
        { label: "About", href: "#" },
        { label: "Testimonials", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Socials",
      links: [
        { label: "LinkedIn", href: "#" },
        { label: "YouTube", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Bento", href: "#" },
        { label: "GitHub", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Pillarsstack", href: "#" },
        { label: "Figma Templates", href: "#" },
        { label: "Monthly Newsletter", href: "#" },
      ],
    },
  ],
}: FooterProps) {
  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="relative w-full border-t bg-neutral-50/60 py-12 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-26">
        {/* Top grid: 3 columns */}
        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <div className="mt-2 h-px w-full bg-neutral-300/80 dark:bg-neutral-700/60" />
              <ul className="mt-4 space-y-3">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
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
            <p className="text-2xl font-extrabold leading-tight md:text-3xl">
              © {year} {name}
              <span className="font-medium"> All rights reserved.</span>
            </p>
            <LocalTime />
          </div>

          {/* Right: back-to-top */}
          <div className="flex items-end justify-start sm:justify-end md:justify-end">
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
