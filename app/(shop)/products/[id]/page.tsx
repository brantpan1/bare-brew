'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
        px-6 py-2 rounded-full font-medium text-base
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

// Quantity selector component
const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}) => {
  return (
    <div className="flex items-center gap-2 border-2 border-black rounded-full px-2 py-1 w-fit">
      <button
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

// Star rating component
const StarRating = ({
  rating,
  total = 5,
}: {
  rating: number
  total?: number
}) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(total)].map((_, i) => (
        <span key={i} className={i < rating ? 'text-black' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )
}

// Client component for quantity management
function ProductQuantityManager() {
  const [quantity, setQuantity] = React.useState(1)

  const handleIncrease = () => setQuantity((prev) => prev + 1)
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <QuantitySelector
      quantity={quantity}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
    />
  )
}

// Gallery with scroll functionality
function ProductGallery({ images }: { images: string[] }) {
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
    <InView threshold={0.2} triggerOnce>
      {({ ref, inView }) => (
        <div ref={ref} className="relative w-full">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-black p-3 rounded-full transition-all duration-300 hover:bg-black group"
            aria-label="Scroll left"
          >
            <ChevronLeft
              size={24}
              className="text-black group-hover:text-white transition-colors duration-300"
            />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex-shrink-0"
                  style={{ width: 'calc(23% - 12px)' }}
                >
                  <motion.div
                    className="aspect-[3/4] bg-gray-200 cursor-pointer overflow-hidden flex items-center justify-center"
                    initial={{ borderRadius: 0 }}
                    whileHover={{ borderRadius: 32 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {/* TODO: Replace with actual gallery images */}
                    <span className="text-gray-500">Gallery {index + 1}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-black p-3 rounded-full transition-all duration-300 hover:bg-black group"
            aria-label="Scroll right"
          >
            <ChevronRight
              size={24}
              className="text-black group-hover:text-white transition-colors duration-300"
            />
          </button>
        </div>
      )}
    </InView>
  )
}

export default function ProductPage({ params }: { params: { id: string } }) {
  // TODO: Fetch your product data here based on params.id
  // const product = await fetchProduct(params.id)

  // Mock data for now
  const product = {
    id: params.id,
    title: 'Product Title',
    price: 25,
    rating: 5,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    ingredients: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    images: {
      main: '/placeholder-product.jpg',
      gallery: [
        '/placeholder-1.jpg',
        '/placeholder-2.jpg',
        '/placeholder-3.jpg',
        '/placeholder-4.jpg',
        '/placeholder-5.jpg',
        '/placeholder-6.jpg',
        '/placeholder-7.jpg',
        '/placeholder-8.jpg',
        '/placeholder-9.jpg',
      ],
    },
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      {/* Product Hero Section */}
      <section style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
          {/* Product Image */}
          <InView threshold={0.2} triggerOnce>
            {({ ref, inView }) => (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <motion.div
                  className="aspect-square bg-gray-100 overflow-hidden"
                  initial={{ borderRadius: 0 }}
                  whileHover={{ borderRadius: 32 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* TODO: Replace with actual product image */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Product Image</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </InView>

          {/* Product Info */}
          <InView threshold={0.2} triggerOnce>
            {({ ref, inView }) => (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-between"
              >
                <div className="flex flex-col">
                  <h1
                    className="text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: 'var(--font-baskerville), serif' }}
                  >
                    {product.title}
                  </h1>

                  <StarRating rating={product.rating} />

                  <p>${product.price}</p>
                  <div className="flex items-center gap-4 pt-4 mb-6">
                    <ProductQuantityManager />
                    <HeroButton>Add to Cart</HeroButton>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            )}
          </InView>
        </div>
      </section>

      {/* Ingredients Section */}
      <InView threshold={0.2} triggerOnce>
        {({ ref, inView }) => (
          <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="border-t-2 border-black py-12 mt-[20vh] mb-[50vh]"
          >
            <div style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 text-center"
                style={{ fontFamily: 'var(--font-baskerville), serif' }}
              >
                Ingredients
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
                {product.ingredients}
              </p>
            </div>
          </motion.section>
        )}
      </InView>

      {/* Image Gallery Section */}
      <section style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
        <ProductGallery images={product.images.gallery} />
      </section>

      {/* Hide scrollbar globally for gallery */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}
