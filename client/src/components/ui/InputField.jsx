import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({
  label,
  type: initialType,
  id,
  placeholder,
  required = false,
  autoComplete,
  error,
  className,
  delay = 0,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [type, setType] = useState(initialType);

  const togglePasswordVisibility = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1 + delay * 0.1,
        ease: [0.05, 0.7, 0.1, 1],
      }}
      className={cn("space-y-2", className)}
    >
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "block w-full rounded-md border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
            error &&
              "border-destructive focus:ring-destructive/40 focus:border-destructive",
            isFocused && "border-primary ring-2 ring-primary/20"
          )}
        />

        {initialType === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            {type === "password" ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
