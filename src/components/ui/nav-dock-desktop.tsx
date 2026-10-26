import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import { getDockItems, handleDockLinkClick, type DockItem, type DockMode } from "@/components/ui/nav-dock-shared";

interface FloatingDockDesktopProps {
  className?: string;
}

export function FloatingDockDesktop({ className }: FloatingDockDesktopProps) {
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
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/10 px-4 pb-3 shadow-md backdrop-blur-sm dark:bg-neutral-900/10 md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <DockDesktopIcon key={item.href} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}

interface DockDesktopIconProps {
  item: DockItem;
  mouseX: MotionValue;
}

function DockDesktopIcon({ item, mouseX }: DockDesktopIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const Control = item.onClick ? "button" : "a";

  return (
    <Control
      type={item.onClick ? "button" : undefined}
      href={item.onClick ? undefined : item.href}
      onClick={(event: MouseEvent<HTMLElement>) => handleDockLinkClick(event, item.href, item.onClick)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:focus-visible:outline-sky-400"
      aria-label={item.title}
      title={item.title}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {item.title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          <Icon className={item.iconClassName} />
        </motion.div>
      </motion.div>
    </Control>
  );
}
