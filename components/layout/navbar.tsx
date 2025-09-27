'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  const navItems = ['Protein', 'Boba', 'Mixers']
  const rightNavItems = ['About', 'Contact']
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredRightIndex, setHoveredRightIndex] = useState<number | null>(
    null,
  )

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-4 pb-2">
      <motion.nav
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-[90vw] mx-auto bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg"
        style={{ fontFamily: 'var(--font-baskerville), serif' }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-lg font-bold cursor-pointer"
        >
          BOBA
        </motion.div>

        {/* Center Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              transition={{ delay: index * 0.1 + 0.2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative text-base text-black transition-opacity px-1 py-2"
            >
              {item}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="centerUnderline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4">
            {rightNavItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                transition={{ delay: index * 0.1 + 0.3 }}
                onMouseEnter={() => setHoveredRightIndex(index)}
                onMouseLeave={() => setHoveredRightIndex(null)}
                className="relative text-sm text-black transition-opacity px-1 py-2"
              >
                {item}
                {hoveredRightIndex === index && (
                  <motion.div
                    layoutId="rightUnderline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                  />
                )}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label="Account"
            >
              <User size={24} strokeWidth={2} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label="Cart"
            >
              <ShoppingCart size={24} strokeWidth={2} />
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </div>
  )
}
