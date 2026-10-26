import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { getDockItems, handleDockLinkClick, type DockMode } from "@/components/ui/nav-dock-shared";

interface FloatingDockMobileProps {
  className?: string;
}

export function FloatingDockMobile({ className }: FloatingDockMobileProps) {
  const [mode, setMode] = useState<DockMode>("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setMode(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextMode: DockMode = mode === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", nextMode === "dark");
    setMode(nextMode);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", nextMode);
    }
  };

  const items = getDockItems({ mode, toggleTheme });

  return (
    <div className={cn("mx-auto block md:hidden", className)}>
      <div className="mx-auto w-full max-w-md overflow-x-auto pb-2">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-3 rounded-2xl bg-white/10 p-3 shadow-md backdrop-blur-sm dark:bg-neutral-900/10">
          {items.map((item) => {
            const Icon = item.icon;
            const Control = item.onClick ? "button" : "a";

            return (
              <Control
                key={item.href}
                type={item.onClick ? "button" : undefined}
                href={item.onClick ? undefined : item.href}
                onClick={(event: MouseEvent<HTMLElement>) => handleDockLinkClick(event, item.href, item.onClick)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:bg-neutral-800 dark:focus-visible:outline-sky-400"
                aria-label={item.title}
                title={item.title}
              >
                <div className="h-6 w-6">
                  <Icon className={item.iconClassName} />
                </div>
              </Control>
            );
          })}
        </div>
      </div>
    </div>
  );
}
