import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; node: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockSmall items={items} className={mobileClassName} />
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

/**
 * Small screens: two-row grid.
 * - Exactly two rows via `grid-rows-2 grid-flow-col`
 * - Horizontal scroll if there are many items
 * - Fixed-size icons (no magnify) for stable layout on touch
 */
const FloatingDockSmall = ({
  items,
  className,
}: {
  items: { title: string; node: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto block md:hidden", className)}>
      <div className="mx-auto w-full max-w-md overflow-x-auto">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-3 rounded-2xl bg-white/10 p-3 shadow-md backdrop-blur-sm dark:bg-neutral-900/10">
          {items.map((item) => (
            <motion.a
              key={item.title}
              href={item.href}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 outline-none ring-offset-2 transition dark:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-500"
              aria-label={item.title}
              title={item.title}
            >
              <div className="h-6 w-6">{item.node}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Desktop: original hover-magnify row.
 */
const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; node: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/10 px-4 pb-3 shadow-md backdrop-blur-sm dark:bg-neutral-900/10 md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  node,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  node: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

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

  return (
    <a href={href} aria-label={title} title={title}>
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
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {node}
        </motion.div>
      </motion.div>
    </a>
  );
}
