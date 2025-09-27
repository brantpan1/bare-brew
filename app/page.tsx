'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Heart,
  ShoppingBag,
  Sparkles,
  Leaf,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Reusable Hero Button Component
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-8 py-4 rounded-2xl font-medium text-base
        bg-white text-black border-2 border-white
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

const featuredProducts = [
  {
    id: 1,
    name: 'Classic Milk Tea',
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.8,
    reviews: 124,
    image: '/api/placeholder/300/300',
    badge: 'Best Seller',
    badgeColor: 'bg-green-600',
  },
  {
    id: 2,
    name: 'Taro Bubble Tea',
    price: 5.49,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: '/api/placeholder/300/300',
    badge: 'New',
    badgeColor: 'bg-purple-600',
  },
  {
    id: 3,
    name: 'Matcha Latte',
    price: 5.99,
    originalPrice: 7.99,
    rating: 4.7,
    reviews: 156,
    image: '/api/placeholder/300/300',
    badge: 'Limited',
    badgeColor: 'bg-orange-600',
  },
  {
    id: 4,
    name: 'Brown Sugar Boba',
    price: 6.49,
    originalPrice: null,
    rating: 4.9,
    reviews: 203,
    image: '/api/placeholder/300/300',
    badge: 'Trending',
    badgeColor: 'bg-pink-600',
  },
]

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $25',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'Fresh ingredients daily',
  },
  {
    icon: Clock,
    title: 'Quick Delivery',
    description: 'Same day in select areas',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Artisanal crafted drinks',
  },
]

const categories = [
  { name: 'Milk Teas', count: 12, image: '/api/placeholder/200/200' },
  { name: 'Fruit Teas', count: 8, image: '/api/placeholder/200/200' },
  { name: 'Specialty', count: 15, image: '/api/placeholder/200/200' },
  { name: 'Seasonal', count: 6, image: '/api/placeholder/200/200' },
]

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Width (no padding-top needed as navbar is fixed over it) */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-screen relative overflow-hidden"
      >
        {/* Hero Image - Full Width Background */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero/Landing.jpeg"
            alt="Premium Bubble Tea Hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end justify-start">
          <div className="text-white px-8 pb-[15vh] md:px-16 md:pb-[15vh]">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-4xl lg:text-5xl font-bold mb-8"
              style={{ fontFamily: 'var(--font-baskerville), serif' }}
            >
              Brewed With Care,
              <br />
              Sealed For You.
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <HeroButton>Shop Now</HeroButton>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.5 },
            y: { delay: 1, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-[2px] h-8 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Rest of your content sections will go here */}
      <section className="py-20 px-6">
        {/* Featured Products, Features, Categories etc. */}
      </section>
    </>
  )
}
