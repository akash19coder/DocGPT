import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
  imageSide = "left",
  image = "https://images.unsplash.com/photo-1618005198919-d3d4b5a23cba?q=80&w=1974&auto=format&fit=crop",
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Image Section - Conditionally positioned */}
      {imageSide === "left" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.05, 0.7, 0.1, 1] }}
          className="hidden md:block md:w-1/2 h-full relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      )}

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.05, 0.7, 0.1, 1] }}
        className={`w-full md:w-1/2 h-full flex items-center justify-center p-6 md:p-12 ${
          imageSide === "right" ? "order-first" : ""
        }`}
      >
        <div className="w-full max-w-md space-y-8">{children}</div>
      </motion.div>

      {/* Image Section - Conditionally positioned */}
      {imageSide === "right" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.05, 0.7, 0.1, 1] }}
          className="hidden md:block md:w-1/2 h-full relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      )}
    </div>
  );
}
