'use client'

import { useState } from 'react'
import { X, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple-600 to-pink-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2 relative">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <p className="text-sm font-medium text-white">
                Free delivery on orders over $30 | Same-day delivery available
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-0 p-1 hover:bg-white/20 rounded transition"
              aria-label="Close announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
