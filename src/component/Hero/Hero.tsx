'use client'

import { memo, useState } from 'react'
import { motion, Variants, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
      ease: EASE_OUT,
    },
  },
}

const itemUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

const itemLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

const itemFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

const imageFloat: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: EASE_OUT,
    },
  },
}

const HeroContent = memo(() => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative z-10 w-full max-w-2xl">
      <motion.div
        variants={shouldReduceMotion ? undefined : container}
        initial="hidden"
        animate="visible"
        className="space-y-6 md:space-y-8"
      >
        <motion.p
          variants={shouldReduceMotion ? undefined : itemLeft}
          className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
        >
          Engineered for Excellence
        </motion.p>

        <motion.h1
          variants={shouldReduceMotion ? undefined : itemUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95]"
        >
          <span className="block text-white">AIR JORDAN</span>
          <span className="block bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            LEGACY
          </span>
        </motion.h1>

        <motion.p
          variants={shouldReduceMotion ? undefined : itemFade}
          className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl leading-relaxed"
        >
          Experience the perfect fusion of iconic design and cutting-edge
          performance. Every detail crafted for those who demand excellence.
        </motion.p>

        <motion.div
          variants={shouldReduceMotion ? undefined : itemFade}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
        >
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black">
            Shop Now
          </button>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black">
            Explore Collection
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
})

HeroContent.displayName = 'HeroContent'

const HeroImage = memo(() => {
  const shouldReduceMotion = useReducedMotion()
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : imageFloat}
      initial="hidden"
      animate="visible"
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-red-500/20 via-transparent to-orange-500/20 blur-3xl animate-pulse" />
      
      {/* Floating sneaker image */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-full max-w-xl lg:max-w-2xl px-6 sm:px-8"
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse rounded-lg" />
        )}
        
        {/* Main sneaker image */}
        <Image
          src="/sneakers/aj8.jpeg"
          alt="Air Jordan 1 Retro High"
          width={800}
          height={600}
          priority
          quality={95}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-auto drop-shadow-2xl transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 bg-linear-to-t from-red-500/30 to-transparent blur-2xl -z-10" />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </motion.div>
  )
})

HeroImage.displayName = 'HeroImage'

export default function Hero() {
  return (
    <section className="relative w-full min-h-svh overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-red-500/10 via-transparent to-black pointer-events-none" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content Container - Optimized for all screens */}
      <div className="relative z-20 h-full min-h-svh flex flex-col lg:flex-row">
        
        {/* LEFT: Text Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24 lg:py-0">
          <HeroContent />
        </div>

        {/* RIGHT: Hero Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-0 min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-0">
          <HeroImage />
        </div>
      </div>
    </section>
  )
}