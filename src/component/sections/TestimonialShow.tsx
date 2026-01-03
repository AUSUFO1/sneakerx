'use client'

import { useState, useEffect, memo, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  text: string
  sneaker: string
  verified: boolean
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

// MOCK DATA
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus Johnson',
    role: 'Sneaker Collector',
    avatar: '/avatars/avatar1.jpeg',
    rating: 5,
    text: 'Best sneaker shopping experience ever! The quality is unmatched and delivery was lightning fast.',
    sneaker: 'Air Jordan 1 Retro High',
    verified: true,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Fashion Influencer',
    avatar: '/avatars/avatar2.jpeg',
    rating: 5,
    text: 'Authentic products, great prices, and amazing customer service.',
    sneaker: 'Nike Dunk Low',
    verified: true,
  },
  {
    id: 3,
    name: 'David Martinez',
    role: 'Basketball Player',
    avatar: '/avatars/avatar3.jpeg',
    rating: 5,
    text: 'Attention to detail and authenticity verification process is top-notch.',
    sneaker: 'Air Max 97',
    verified: true,
  },
  {
    id: 4,
    name: 'Emily Thompson',
    role: 'Designer',
    avatar: '/avatars/avatar4.jpeg',
    rating: 5,
    text: 'The curated collection is fire. Found rare gems easily.',
    sneaker: 'Jordan Boost 350',
    verified: true,
  },
  {
    id: 5,
    name: 'James Wilson',
    role: 'Athlete',
    avatar: '/avatars/avatar5.jpeg',
    rating: 5,
    text: 'Premium quality and fast shipping. Will shop again.',
    sneaker: 'Air Jordan 4 Retro',
    verified: true,
  },
]

const StarRating = memo(({ rating, size = 20 }: { rating: number; size?: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-600 text-gray-600'
        }
      />
    ))}
  </div>
))

StarRating.displayName = 'StarRating'

const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : cardVariants}
      className="relative h-full w-[280px] md:w-[340px] bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-6 sm:p-8 border border-gray-700/50 shrink-0 snap-center"
    >
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="w-16 h-16 text-red-600" />
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden ring-2 ring-red-600/50">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          )}
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className={`object-cover transition-opacity ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="flex-1">
          <h4 className="text-white font-bold">{testimonial.name}</h4>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
          <StarRating rating={testimonial.rating} size={16} />
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-6">
        "{testimonial.text}"
      </p>

      <div className="pt-4 border-t border-gray-700/50">
        <p className="text-gray-500 text-xs">Purchased</p>
        <p className="text-red-500 font-semibold text-sm">{testimonial.sneaker}</p>
      </div>
    </motion.div>
  )
})

TestimonialCard.displayName = 'TestimonialCard'

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024)
    const resize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ✅ FIXED SMOOTH AUTO-SCROLL (ONLY CHANGE)
  useEffect(() => {
    if (!sliderRef.current || shouldReduceMotion) return

    const slider = sliderRef.current
    let raf: number
    let lastTime = performance.now()
    const speed = isDesktop ? 0.5 : 0.8

    const animate = (time: number) => {
      const delta = time - lastTime
      lastTime = time

      if (!isPausedRef.current) {
        slider.scrollLeft += speed * (delta / 16)
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0
        }
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [shouldReduceMotion, isDesktop])

  return (
    <section className="relative min-h-screen bg-black py-20 px-4 overflow-hidden">
      <div className="relative max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl mb-2 md:text-6xl font-bold text-white">
            What Our{' '}
            <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
        </motion.div>

        <motion.div
          ref={sliderRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
          onTouchStart={() => (isPausedRef.current = true)}
          onTouchEnd={() => (isPausedRef.current = false)}
          className="flex gap-6 overflow-hidden pb-6"
          style={{ scrollbarWidth: 'none' }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
