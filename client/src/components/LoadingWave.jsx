"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export default function LoadingWave({
  className,
  dotCount = 5,
  dotSize = "md",
  color = "primary",
  speed = "normal",
}) {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    setDots(Array.from({ length: dotCount }, (_, i) => i));
  }, [dotCount]);

  // Map size to Tailwind classes
  const sizeClasses = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };

  // Map color to Tailwind classes
  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-500",
    muted: "bg-muted-foreground",
  };

  // Map speed to animation duration
  const speedValues = {
    slow: 1.5,
    normal: 1,
    fast: 0.6,
  };

  return (
    <div
      className={cn("flex items-center justify-center gap-1.5", className)}
      role="status"
      aria-label="Loading"
    >
      {dots.map((dot) => (
        <div
          key={dot}
          className={cn(
            "rounded-full animate-bounce",
            sizeClasses[dotSize],
            colorClasses[color]
          )}
          style={{
            animationDuration: `${speedValues[speed]}s`,
            animationDelay: `${(dot * 0.1).toFixed(1)}s`,
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
