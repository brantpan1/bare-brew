import React from 'react'
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'

// Reusable Hero Button Component (same as in homepage)
const HeroButton = ({
  children,
  onClick,
  className = '',
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.button
      className={`
        px-8 py-4 rounded-2xl font-medium text-base
        bg-white text-black border-2 border-black
        transition-all duration-300 ease-in-out
        hover:bg-black hover:text-white hover:border-black
        ${className}
      `}
      style={{ fontFamily: 'var(--font-baskerville), serif' }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default function AboutGallery() {
  return (
    <InView threshold={0.25}>
      {({ ref, inView, entry }) => (
        <section ref={ref} className="w-full pt-20">
          <div className="w-full">
            <div className="w-full">
              {/* Grid Container - 9 columns x 12 rows with overflow hidden for masking */}
              <div
                className="grid w-full overflow-hidden"
                style={{
                  gridTemplateColumns: 'repeat(9, 1fr)',
                  gridTemplateRows: 'repeat(12, minmax(30px, 1fr))',
                  height: '100vh',
                  gap: '10px',
                }}
              >
                {/* Top Left - col span 3, row span 9 - slides from top (height distance) */}
                <motion.div
                  initial={{ y: '-100%' }}
                  animate={inView ? { y: 0 } : { y: '-100%' }}
                  transition={{ duration: 2, delay: 0.25, ease: 'easeInOut' }}
                  className="bg-black"
                  style={{
                    gridColumn: 'span 3',
                    gridRow: 'span 9',
                  }}
                />

                {/* Top Right - col span 6, row span 3 - slides from right (width distance) */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={inView ? { x: 0 } : { x: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  className="bg-black"
                  style={{
                    gridColumn: 'span 6',
                    gridRow: 'span 3',
                  }}
                />

                {/* Center Text Content - positioned in the middle */}
                <motion.div
                  className="px-2 pt-8 pb-2 flex flex-col text-left z-10 justify-between"
                  style={{
                    gridColumn: '4 / span 3',
                    gridRow: '4 / span 6',
                    borderRadius: '16px',
                  }}
                >
                  <div>
                    <h2
                      className="text-3xl md:text-4xl font-bold mb-3"
                      style={{ fontFamily: 'var(--font-baskerville), serif' }}
                    >
                      See What's Brewing.
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm ">
                      Discover the artistry behind every cup. From sourcing the
                      finest ingredients to perfecting each blend, we craft
                      experiences that transcend ordinary bubble tea. Our
                      commitment to quality begins with hand-selected tea leaves
                      from sustainable farms, continues through our small-batch
                      preparation process, and culminates in each perfectly
                      sealed bottle.
                    </p>
                  </div>

                  <HeroButton
                    className="self-start"
                    onClick={() => console.log('About Us clicked')}
                  >
                    About Us
                  </HeroButton>
                </motion.div>
                {/* Bottom Right - col span 3, row span 9 - slides from bottom (height distance) */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={inView ? { y: 0 } : { y: '100%' }}
                  transition={{ duration: 2, delay: 0.75, ease: 'easeInOut' }}
                  className="bg-black"
                  style={{
                    gridColumn: '7 / span 3',
                    gridRow: '4 / span 9',
                  }}
                />

                {/* Bottom Left - col span 6, row span 3 - slides from left (width distance) */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={inView ? { x: 0 } : { x: '-100%' }}
                  transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                  className="bg-black"
                  style={{
                    gridColumn: 'span 6',
                    gridRow: '10 / span 3',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </InView>
  )
}
