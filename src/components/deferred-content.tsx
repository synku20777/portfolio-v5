"use client";
import React, { useEffect, useState } from "react";

interface DeferredContentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}

export function DeferredContent({ children, fallback, delay = 0 }: DeferredContentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isClient ? <>{children}</> : <>{fallback || null}</>;
}