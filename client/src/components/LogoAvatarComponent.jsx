'use client';
import React from 'react'
import { motion } from 'framer-motion'

export function LogoAvatarComponent({
  size = 40,
  className = ''
}) {
  const darkBlue = '#1a365d'
  const lightBlue = '#2c5282'
  const paperColors = ['#e2e8f0', '#cbd5e0', '#a0aec0', '#718096']

  const paperVariants = {
    hover: (i) => ({
      rotate: [0, -5, 5, -5, 0],
      scale: 1.05,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
      },
    }),
  }

  return (
    (<div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}>
          {/* Circular background */}
          <motion.circle cx="25" cy="25" r="23" fill={lightBlue} whileHover={{ scale: 1.05 }} />

          {/* Papers arranged in a circular fashion */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.path
              key={i}
              d={`M25 25 L${25 + 18 * Math.cos(i * Math.PI / 4)} ${25 + 18 * Math.sin(i * Math.PI / 4)} 
                 L${25 + 23 * Math.cos((i + 0.7) * Math.PI / 4)} ${25 + 23 * Math.sin((i + 0.7) * Math.PI / 4)} 
                 L${25 + 23 * Math.cos((i - 0.7) * Math.PI / 4)} ${25 + 23 * Math.sin((i - 0.7) * Math.PI / 4)} Z`}
              fill={paperColors[i % paperColors.length]}
              stroke={darkBlue}
              strokeWidth="0.5"
              custom={i}
              variants={paperVariants}
              whileHover="hover" />
          ))}

          {/* Central circle */}
          <motion.circle cx="25" cy="25" r="5" fill={darkBlue} whileHover={{ scale: 1.2 }} />
        </motion.g>
      </svg>
    </div>)
  );
}