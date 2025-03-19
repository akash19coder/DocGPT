import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AuthButton({
  children,
  loading = false,
  className,
  variant = "primary",
  delay = 0,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary/50",
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.4 + delay * 0.1,
        ease: [0.05, 0.7, 0.1, 1],
      }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        loading && "relative !text-transparent",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {children}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </motion.button>
  );
}
