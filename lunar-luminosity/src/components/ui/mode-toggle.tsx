import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconSunFilled, IconMoonFilled } from "@tabler/icons-react";

export function ModeToggle() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleMode}
      className="relative flex items-center justify-center pointer-events-auto"
    >
      <span className="sr-only">Toggle theme</span>
      <IconSunFilled
        className={`h-4 w-4 absolute transition-opacity transition-colors duration-200 ${
          mode === "dark" ? "opacity-100" : "opacity-0"
        } text-yellow-500 dark:text-yellow-400`}
      />
      <IconMoonFilled
        className={`h-4 w-4 absolute transition-opacity transition-colors duration-200 ${
          mode === "light" ? "opacity-100" : "opacity-0"
        } text-slate-700 dark:text-slate-200`}
      />
    </Button>
  );
}
