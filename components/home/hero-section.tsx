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

export default function HeroSection() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-screen relative overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero/Landing.jpeg"
            alt="Premium Bubble Tea Hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 h-full flex items-end justify-start">
          <div className="text-white px-12 pb-[15vh] md:px-[5vw] md:pb-[15vh]">
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
      </motion.section>
    </>
  )
}
