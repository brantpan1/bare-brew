'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  // Main navigation items with their routes
  const navItems = [
    { name: 'Protein', href: '/products?category=protein' },
    { name: 'Boba', href: '/products?category=boba' },
    { name: 'Mixers', href: '/products?category=mixers' },
  ]

  const rightNavItems = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

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
        className="relative w-[90vw] mx-auto bg-white/95 backdrop-blur-md rounded-2xl px-6 py-0 flex items-center justify-between shadow-lg"
        style={{ fontFamily: 'var(--font-baskerville), serif' }}
      >
        {/* Logo (left) - Links to home */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-15 w-30 text-lg font-bold cursor-pointer"
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              style={{ objectFit: 'contain' }}
              fill
              priority
              sizes="100vw"
            />
          </motion.div>
        </Link>

        {/* Center Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          {navItems.map((item, index) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                transition={{ delay: index * 0.1 + 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative text-base text-black transition-opacity px-1 py-2 cursor-pointer"
              >
                {item.name}
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
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4">
            {rightNavItems.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  transition={{ delay: index * 0.1 + 0.3 }}
                  onMouseEnter={() => setHoveredRightIndex(index)}
                  onMouseLeave={() => setHoveredRightIndex(null)}
                  className="relative text-sm text-black transition-opacity px-1 py-2 cursor-pointer"
                >
                  {item.name}
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
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/account">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 hover:opacity-70 transition-opacity"
                aria-label="Account"
              >
                <User size={24} strokeWidth={2} />
              </motion.button>
            </Link>

            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 hover:opacity-70 transition-opacity"
                aria-label="Cart"
              >
                <ShoppingCart size={24} strokeWidth={2} />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  )
}
