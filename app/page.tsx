'use client'

import HeroSection from '@/components/home/hero-section'
import ProductCards from '@/components/home/featured-products'
import AboutGallery from '@/components/home/about-section'
import HorizontalCarousel from '@/components/home/product-carousel'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductCards />
      <AboutGallery />
      <HorizontalCarousel />
    </>
  )
}
