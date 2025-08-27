"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function LazySection({ 
  children, 
  className,
  threshold = 0.1,
  rootMargin = "200px"
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "transition-opacity duration-1000", 
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {isVisible ? children : <div style={{ height: "10px" }} aria-hidden="true" />}
    </div>
  );
}