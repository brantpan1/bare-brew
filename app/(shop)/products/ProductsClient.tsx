'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'
import Link from 'next/link'
import { Search } from 'lucide-react'

// Product Card Component with InView animations
const ProductCard = ({
  product,
  index,
}: {
  product: {
    id: string
    name: string
    price: number
    category: string
    image: string
    rating: number
  }
  index: number
}) => {
  return (
    <InView threshold={0.2} triggerOnce>
      {({ ref, inView }) => (
        <Link href={`/products/${product.id}`} ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group cursor-pointer"
          >
            {/* Product Image */}
            <motion.div
              className="relative aspect-square bg-gray-100 overflow-hidden mb-4"
              initial={{ borderRadius: 0 }}
              whileHover={{ borderRadius: 32 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">{product.name}</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3
                className="text-xl font-semibold transition-all"
                style={{ fontFamily: 'var(--font-baskerville), serif' }}
              >
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < product.rating ? 'text-black' : 'text-gray-300'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-lg font-medium">${product.price}</p>
            </div>
          </motion.div>
        </Link>
      )}
    </InView>
  )
}

// Search Bar Component
const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
}) => {
  return (
    <div className="relative flex-1 max-w-md">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-black bg-white text-base focus:outline-none focus:ring-2 focus:ring-black transition-all"
        style={{ fontFamily: 'var(--font-baskerville), serif' }}
      />
    </div>
  )
}

// Category Filter Component
const CategoryFilter = ({
  categories,
  activeCategory,
}: {
  categories: string[]
  activeCategory: string
}) => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/products">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            px-6 py-3 rounded-full font-medium text-base
            transition-all duration-300 ease-in-out
            ${
              activeCategory === 'all'
                ? 'bg-black text-white border-2 border-black'
                : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
            }
          `}
          style={{ fontFamily: 'var(--font-baskerville), serif' }}
        >
          All Products
        </motion.button>
      </Link>

      {categories.map((category) => (
        <Link
          key={category}
          href={`/products?category=${category.toLowerCase()}`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-6 py-3 rounded-full font-medium text-base
              transition-all duration-300 ease-in-out
              ${
                activeCategory === category.toLowerCase()
                  ? 'bg-black text-white border-2 border-black'
                  : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
              }
            `}
            style={{ fontFamily: 'var(--font-baskerville), serif' }}
          >
            {category}
          </motion.button>
        </Link>
      ))}
    </div>
  )
}

// Client component for the products grid and search
export default function ProductsClient({
  allProducts,
  initialCategory,
}: {
  allProducts: any[]
  initialCategory: string
}) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products based on category and search query
  let filteredProducts =
    initialCategory === 'all'
      ? allProducts
      : allProducts.filter((product) => product.category === initialCategory)

  // Apply search filter
  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const categories = ['Protein', 'Boba', 'Mixers']

  return (
    <>
      {/* Search and Filter Bar */}
      <InView threshold={0.2} triggerOnce>
        {({ ref, inView }) => (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between gap-6 mb-12"
          >
            {/* Search Bar on the left */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Category Filters on the right */}
            <CategoryFilter
              categories={categories}
              activeCategory={initialCategory}
            />
          </motion.div>
        )}
      </InView>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <InView threshold={0.2} triggerOnce>
          {({ ref, inView }) => (
            <motion.div
              ref={ref}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <p
                className="text-gray-500 text-xl"
                style={{ fontFamily: 'var(--font-baskerville), serif' }}
              >
                No products found
                {searchQuery && ` for "${searchQuery}"`}.
              </p>
            </motion.div>
          )}
        </InView>
      )}
    </>
  )
}
