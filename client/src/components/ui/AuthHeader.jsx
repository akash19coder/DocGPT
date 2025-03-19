import React from "react";
import { motion } from "framer-motion";

export default function AuthHeader({ title, description }) {
  return (
    <div className="space-y-2 text-center sm:text-left mb-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.05, 0.7, 0.1, 1] }}
        className="text-3xl font-semibold tracking-tight"
      >
        {title}
      </motion.h1>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.05, 0.7, 0.1, 1] }}
          className="text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
