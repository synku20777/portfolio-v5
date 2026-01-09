import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconFileDescription,
  IconBrandLinkedin,
  IconHome,
  IconBriefcase,
  IconUser,
  IconSunFilled,
  IconMoonFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function FloatingDockDemo() {
  // Theme toggle state
  const [mode, setMode] = useState<"light" | "dark">("light");
  
  // Initialize theme on component mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setMode(isDark ? "dark" : "light");
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newMode === "dark");
    setMode(newMode);
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newMode);
    }
  };

  const links = [
    {
      title: "Home",
      node: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Works",
      node: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#works",
    },
    {
      title: "About",
      node: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: "CV",
      node: (
        <IconFileDescription className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://drive.google.com/file/d/1tzd0B9J5t-AOfYvCQYCJhqMAl_u7cEu9/view?usp=sharing",
    },
    {
      title: "LinkedIn",
      node: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com/in/nestor-kulik",
    },
    {
      title: mode === "dark" ? "Light Mode" : "Dark Mode",
      // Use a direct icon instead of the ModeToggle component
      node: mode === "dark" ? (
        <IconSunFilled className="h-full w-full text-yellow-500 dark:text-yellow-400" />
      ) : (
        <IconMoonFilled className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      onClick: toggleTheme,
      href: "#", // We'll intercept the click with onClick
    },
  ];
  
  return (
    <nav className="fixed z-100 bottom-5 flex items-center justify-center w-full">
      <FloatingDock 
        items={links}
      />
    </nav>
  );
}