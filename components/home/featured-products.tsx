import React from 'react'
import { motion } from 'framer-motion'

const products = [
  {
    id: 1,
    name: 'Classic Milk Tea',
    description:
      'Smooth and creamy traditional milk tea with perfectly chewy tapioca pearls',
  },
  {
    id: 2,
    name: 'Taro Dream',
    description:
      'Rich purple taro flavor blended with fresh milk and signature boba',
  },
  {
    id: 3,
    name: 'Brown Sugar Delight',
    description:
      'Caramelized brown sugar syrup with fresh milk and honey boba pearls',
  },
]

export default function ProductCards() {
  return (
    <section className="w-full pt-20 bg-gray-50">
      {/* Container with 5vw padding from edges */}
      <div style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
        {/* Product Cards Grid */}
        <div className="flex flex-col md:flex-row gap-6 h-[80vh]">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1"
            >
              <motion.div
                className="bg-black h-full md:h-[60vh] overflow-hidden relative group cursor-pointer flex flex-col justify-end"
                initial={{ borderRadius: 0 }}
                whileHover={{ borderRadius: 32 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Product Details */}
                <div className="p-8 text-white">
                  <h3
                    className="text-3xl font-semibold mb-3"
                    style={{ fontFamily: 'var(--font-baskerville), serif' }}
                  >
                    {product.name}
                  </h3>

                  <p className="text-white/80 text-lg">{product.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
