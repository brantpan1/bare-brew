import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HorizontalCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="w-full pt-50 pb-70 bg-gray-50">
      <div className="w-full flex items-center relative">
        {/* Left Arrow positioned in left 5vw area */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 bg-white border-2 border-black p-3 rounded-full transition-all duration-300 hover:bg-black group"
          style={{ left: '2vw' }}
          aria-label="Scroll left"
        >
          <ChevronLeft
            size={24}
            className="text-black group-hover:text-white transition-colors duration-300"
          />
        </button>

        {/* Content Container with 5vw padding */}
        <div style={{ paddingLeft: '5vw', paddingRight: '5vw', width: '100%' }}>
          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Cards Container */}
            <div className="flex" style={{ gap: '10px' }}>
              {[...Array(9)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex-shrink-0"
                  style={{ width: 'calc(23% - 7px)' }}
                >
                  <motion.div
                    className="bg-black cursor-pointer"
                    initial={{ borderRadius: 0 }}
                    whileHover={{ borderRadius: 16 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ height: '60vh' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Arrow positioned in right 5vw area */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 bg-white border-2 border-black p-3 rounded-full transition-all duration-300 hover:bg-black group"
          style={{ right: '2vw' }}
          aria-label="Scroll right"
        >
          <ChevronRight
            size={24}
            className="text-black group-hover:text-white transition-colors duration-300"
          />
        </button>
      </div>

      {/* Hide scrollbar globally for this component */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
