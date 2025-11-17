import React from 'react'
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import ProductsClient from './ProductsClient'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  // Await searchParams in Next.js 15+
  const { category: categoryParam } = await searchParams

  // Mock product data - TODO: Replace with actual data fetching
  const allProducts = [
    {
      id: '1',
      name: 'Vanilla Protein Shake',
      price: 25,
      category: 'protein',
      image: '/placeholder-1.jpg',
      rating: 5,
    },
    {
      id: '2',
      name: 'Chocolate Protein Shake',
      price: 25,
      category: 'protein',
      image: '/placeholder-2.jpg',
      rating: 5,
    },
    {
      id: '3',
      name: 'Strawberry Protein Shake',
      price: 25,
      category: 'protein',
      image: '/placeholder-3.jpg',
      rating: 4,
    },
    {
      id: '4',
      name: 'Classic Milk Tea',
      price: 20,
      category: 'boba',
      image: '/placeholder-4.jpg',
      rating: 5,
    },
    {
      id: '5',
      name: 'Taro Milk Tea',
      price: 22,
      category: 'boba',
      image: '/placeholder-5.jpg',
      rating: 5,
    },
    {
      id: '6',
      name: 'Thai Tea',
      price: 21,
      category: 'boba',
      image: '/placeholder-6.jpg',
      rating: 4,
    },
    {
      id: '7',
      name: 'Matcha Latte',
      price: 18,
      category: 'mixers',
      image: '/placeholder-7.jpg',
      rating: 5,
    },
    {
      id: '8',
      name: 'Fruit Smoothie Mix',
      price: 15,
      category: 'mixers',
      image: '/placeholder-8.jpg',
      rating: 4,
    },
    {
      id: '9',
      name: 'Coffee Mixer',
      price: 16,
      category: 'mixers',
      image: '/placeholder-9.jpg',
      rating: 5,
    },
  ]

  // Get the category from search params
  const category = categoryParam || 'all'

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
        <ProductsClient allProducts={allProducts} initialCategory={category} />
      </div>
    </main>
  )
}
