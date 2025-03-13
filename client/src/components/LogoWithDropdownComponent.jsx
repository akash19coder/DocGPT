import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap, MessageSquare, User, UserCheck } from "lucide-react";

export function LogoWithDropdownComponent({ width = 200, height = 50 } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const darkBlue = "#1a365d";
  const lightBlue = "#2c5282";
  const paperColors = ["#e2e8f0", "#cbd5e0", "#a0aec0", "#718096"];

  const paperVariants = {
    hover: (i) => ({
      rotate: [0, -5, 5, -5, 0],
      scale: 1.05,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <svg
          width={width}
          height={height}
          viewBox="0 0 200 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Circular background */}
            <motion.circle
              cx="25"
              cy="25"
              r="23"
              fill={lightBlue}
              whileHover={{ scale: 1.05 }}
            />

            {/* Papers arranged in a circular fashion */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.path
                key={i}
                d={`M25 25 L${25 + 18 * Math.cos((i * Math.PI) / 4)} ${
                  25 + 18 * Math.sin((i * Math.PI) / 4)
                } 
                   L${25 + 23 * Math.cos(((i + 0.7) * Math.PI) / 4)} ${
                  25 + 23 * Math.sin(((i + 0.7) * Math.PI) / 4)
                } 
                   L${25 + 23 * Math.cos(((i - 0.7) * Math.PI) / 4)} ${
                  25 + 23 * Math.sin(((i - 0.7) * Math.PI) / 4)
                } Z`}
                fill={paperColors[i % paperColors.length]}
                stroke={darkBlue}
                strokeWidth="0.5"
                custom={i}
                variants={paperVariants}
                whileHover="hover"
              />
            ))}

            {/* Central circle */}
            <motion.circle
              cx="25"
              cy="25"
              r="5"
              fill={darkBlue}
              whileHover={{ scale: 1.2 }}
            />

            {/* DocGPT text */}
            <motion.text
              x="60"
              y="35"
              fontFamily="Arial, sans-serif"
              fontSize="24"
              fontWeight="bold"
              fill={darkBlue}
              whileHover={{ fill: lightBlue }}
            >
              DocGPT
            </motion.text>
          </motion.g>
        </svg>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="mr-2 text-gray-500" size={16} />
                  <span className="font-bold">
                    DocGPT<sup className="font-normal text-sm ml-0.5">+</sup>
                  </span>
                </div>
                <button className="bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded">
                  UPGRADE
                </button>
              </div>
              <div className="px-4 py-1 text-xs text-gray-500 font-medium">
                Unlimited Chats and Large PDf upload
              </div>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 flex items-center">
                <MessageSquare className="mr-2 text-gray-500" size={16} />
                <span className="font-bold">DocGPT</span>
              </div>
              <div className="px-4 py-1 text-xs text-gray-500 font-medium">
                5 PDF chat/day
              </div>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  {isGuest ? (
                    <User className="mr-2 text-gray-500" size={16} />
                  ) : (
                    <UserCheck className="mr-2 text-gray-500" size={16} />
                  )}
                  <span className="font-bold">
                    {isGuest ? "Guest" : "Logged In"}
                  </span>
                </div>
                <button
                  onClick={() => setIsGuest(!isGuest)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold py-1 px-2 rounded"
                >
                  {isGuest ? "Log In" : "Log Out"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
