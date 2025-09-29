'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  const footerLinks = {
    Shop: ['Protein', 'Boba', 'Mixers', 'All Products'],
    Company: ['About', 'Contact', 'Press', 'Careers'],
    Support: ['FAQ', 'Shipping', 'Returns', 'Privacy'],
    Social: ['Instagram', 'Twitter', 'TikTok', 'YouTube'],
  }

  return (
    <footer className="w-full bg-black text-white">
      <div style={{ padding: '5vw' }}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo.png"
              alt="logo"
              className="mb-4 object-cover"
              style={{ objectFit: 'contain' }}
              priority
              width={100}
              height="0"
            />
            <p className="text-white/70 text-sm">
              Brewed with care,
              <br />
              Sealed for you.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <div key={category}>
                <h3
                  className="text-base font-medium mb-4"
                  style={{ fontFamily: 'var(--font-baskerville), serif' }}
                >
                  {category}
                </h3>
                <ul className="space-y-2">
                  {links.map((link, linkIndex) => (
                    <motion.li key={link}>
                      <motion.a
                        href="#"
                        className="text-white/70 text-sm transition-colors duration-300 hover:text-white inline-block relative"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: categoryIndex * 0.1 + linkIndex * 0.05,
                          duration: 0.5,
                        }}
                        whileHover={{ x: 2 }}
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="border-t border-white/20 pt-10 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: 'var(--font-baskerville), serif' }}
              >
                Stay in the mix
              </h3>
              <p className="text-white/70 text-sm">
                Get exclusive offers and new product announcements
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/50 flex-1 md:w-64 focus:outline-none focus:border-white/40 transition-colors"
                style={{ fontFamily: 'var(--font-baskerville), serif' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-black rounded-2xl font-medium transition-all duration-300 hover:bg-black hover:text-white border-2 border-white"
                style={{ fontFamily: 'var(--font-baskerville), serif' }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            © 2024 Bare Brew. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/50 text-xs hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-white/50 text-xs hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/50 text-xs hover:text-white transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

