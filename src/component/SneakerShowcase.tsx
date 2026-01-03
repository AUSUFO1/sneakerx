'use client'

import { useEffect, useState, useRef, useCallback, memo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { X, ShoppingCart, Expand } from 'lucide-react'
import type { Sneaker } from '@/types/sneakers'


const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.3 },
  },
}


const SkeletonCard = memo(() => (
  <div className="min-w-[280px] md:min-w-[340px] 2xl:min-w-[420px] h-[420px] 2xl:h-[520px] bg-linear-to-br from-gray-800 via-gray-700 to-gray-800 rounded-2xl animate-pulse" />
))

SkeletonCard.displayName = 'SkeletonCard'

const LoadingState = memo(() => (
  <div className="flex gap-6 overflow-hidden">
    {[...Array(4)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
))

LoadingState.displayName = 'LoadingState'


interface SneakerCardProps {
  sneaker: Sneaker
  onSelect: (sneaker: Sneaker) => void
}

const SneakerCard = memo(({ sneaker, onSelect }: SneakerCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : cardVariants}
      className="relative min-w-[280px] md:min-w-[340px] 2xl:min-w-[420px] h-[420px] 2xl:h-[520px] group shrink-0 snap-center"
    >
      <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 bg-linear-to-br from-gray-900 via-gray-800 to-black shadow-xl hover:shadow-2xl">
        <div className="relative h-[280px] 2xl:h-[340px] overflow-hidden bg-linear-to-br from-white to-gray-100 p-8 2xl:p-12">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          )}
          
          <div className="relative w-full h-full">
            <Image
              src={sneaker.image}
              alt={sneaker.name}
              fill
              sizes="(max-width: 768px) 280px, (max-width: 1536px) 340px, 420px"
              className={`object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-black/10 to-transparent" />
        </div>

        <div className="relative p-6 2xl:p-8 space-y-2">
          <p className="text-red-500 text-xs 2xl:text-sm font-semibold uppercase tracking-wider">
            {sneaker.brand}
          </p>
          <h3 className="text-white text-lg 2xl:text-2xl font-bold line-clamp-1 leading-tight">
            {sneaker.name}
          </h3>
          <p className="text-2xl 2xl:text-4xl font-bold text-white">
            ${sneaker.price}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <motion.button
          onClick={() => onSelect(sneaker)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-6 2xl:bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 sm:px-8 2xl:px-12 py-2.5 sm:py-3 2xl:py-4 text-sm sm:text-base 2xl:text-lg rounded-full font-semibold shadow-lg hover:bg-red-700 transition-all duration-200 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
})

SneakerCard.displayName = 'SneakerCard'

interface ModalProps {
  sneaker: Sneaker
  onClose: () => void
}

const Modal = memo(({ sneaker, onClose }: ModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <motion.div
      variants={modalOverlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl 2xl:max-w-6xl max-h-[90vh] bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 2xl:top-6 2xl:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-8 2xl:h-8 text-red-600 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          <div className="flex flex-col lg:flex-row">
            {/* Image section - STANDARD FOR LG/XL, SCALED FOR 2XL */}
            <div className="relative lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[600px] 2xl:h-[750px] bg-linear-to-br from-white to-gray-100 flex items-center justify-center p-8 2xl:p-16">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              )}
              
              <div className="relative w-full h-full">
                <Image
                  src={sneaker.image}
                  alt={sneaker.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-contain drop-shadow-2xl transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
              </div>

              {/* Floating badge - STANDARD FOR LG/XL, SCALED FOR 2XL */}
              <div className="absolute top-6 left-6 2xl:top-10 2xl:left-10 bg-red-600 text-white px-4 py-2 2xl:px-6 2xl:py-3 rounded-full text-xs sm:text-sm 2xl:text-lg font-bold shadow-lg">
                Featured
              </div>
            </div>

            {/* Content section - STANDARD FOR LG/XL, SCALED FOR 2XL */}
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 2xl:p-16 space-y-6 2xl:space-y-8">
              <div>
                <p className="text-red-500 text-xs sm:text-sm 2xl:text-lg font-semibold uppercase tracking-widest mb-2">
                  {sneaker.brand}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-bold text-white leading-tight mb-3">
                  {sneaker.name}
                </h2>
                <div className="h-1 w-16 2xl:w-24 bg-linear-to-r from-red-500 to-orange-500 rounded-full" />
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-semibold text-sm 2xl:text-lg uppercase tracking-wider">About This Sneaker</h3>
                <p className="text-gray-300 text-sm sm:text-base 2xl:text-2xl leading-relaxed">
                  {sneaker.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 2xl:gap-6 pt-4">
                <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 2xl:p-7 rounded-xl">
                  <p className="text-gray-400 text-xs 2xl:text-sm uppercase tracking-wider mb-1">Style</p>
                  <p className="text-white font-semibold text-sm sm:text-base 2xl:text-2xl">Retro High</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 2xl:p-7 rounded-xl">
                  <p className="text-gray-400 text-xs 2xl:text-sm uppercase tracking-wider mb-1">Release</p>
                  <p className="text-white font-semibold text-sm sm:text-base 2xl:text-2xl">2024</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 2xl:p-7 rounded-xl">
                  <p className="text-gray-400 text-xs 2xl:text-sm uppercase tracking-wider mb-1">Colorway</p>
                  <p className="text-white font-semibold text-sm sm:text-base 2xl:text-2xl">Multi</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 2xl:p-7 rounded-xl">
                  <p className="text-gray-400 text-xs 2xl:text-sm uppercase tracking-wider mb-1">Stock</p>
                  <p className="text-white font-semibold text-sm sm:text-base 2xl:text-2xl">Limited</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-700/50 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl 2xl:text-7xl font-bold text-white">
                    ${sneaker.price}
                  </span>
                  <span className="text-gray-400 text-sm 2xl:text-xl">USD</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 2xl:gap-5">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 sm:py-4 2xl:py-6 text-sm 2xl:text-xl rounded-xl transition-all duration-200 shadow-lg shadow-red-500/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900">
                    <ShoppingCart className="w-5 h-5 2xl:w-8 2xl:h-8" />
                    Add to Cart
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 sm:py-4 2xl:py-6 text-sm 2xl:text-xl rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900">
                    <Expand className="w-5 h-5 2xl:w-8 2xl:h-8" />
                    Try AR View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
})

Modal.displayName = 'Modal'

export default function SneakerShowcase() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([])
  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)

  const sliderRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Detect desktop on client-side only
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024)
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch sneakers
  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const res = await fetch('/api/sneakers')
        const data = await res.json()
        setSneakers(data)
      } catch (error) {
        console.error('Failed to fetch sneakers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSneakers()
  }, [])

  useEffect(() => {
    if (!sliderRef.current || loading || sneakers.length === 0 || shouldReduceMotion || !isDesktop) return

    const slider = sliderRef.current
    let animationId: number

    const scroll = () => {
      if (slider) {
        slider.scrollLeft += 1 // Smooth continuous scroll
        
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0
        }
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [loading, sneakers.length, shouldReduceMotion, isDesktop])

  const handleSelectSneaker = useCallback((sneaker: Sneaker) => {
    setSelectedSneaker(sneaker)
  }, [])

  const handleCloseSneaker = useCallback(() => {
    setSelectedSneaker(null)
  }, [])

  return (
    <section className="relative bg-black py-20 2xl:py-28 px-6 2xl:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-red-500/5 via-transparent to-orange-500/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 2xl:w-lg 2xl:h-128 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 2xl:w-lg 2xl:h-128 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-[1600px] 2xl:max-w-[2000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-12 2xl:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-8xl font-bold text-white mb-4 2xl:mb-6">
            Featured <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Collection</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-2xl 2xl:text-3xl max-w-2xl 2xl:max-w-4xl">
            Discover our hand-picked selection of iconic sneakers. From timeless classics to modern innovations.
          </p>
        </motion.div>

        {/* Slider section */}
        <div className="relative w-full">
          {/* Mobile swipe hint - Only on small screens */}
          {!loading && sneakers.length > 0 && (
            <div className="sm:hidden mb-4 text-center">
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Swipe to explore
                <svg className="w-5 h-5 animate-bounce-horizontal-reverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </p>
            </div>
          )}

          {loading ? (
            <LoadingState />
          ) : (
            <motion.div
              ref={sliderRef}
              variants={shouldReduceMotion ? undefined : containerVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-4 sm:gap-6 2xl:gap-10 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory lg:snap-none lg:overflow-hidden"
              style={{ 
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Show appropriate number of cards based on screen size */}
              {(isDesktop ? [...sneakers, ...sneakers] : sneakers).map((sneaker, index) => (
                <SneakerCard
                  key={`${sneaker.id}-${index}`}
                  sneaker={sneaker}
                  onSelect={handleSelectSneaker}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal popup */}
      <AnimatePresence>
        {selectedSneaker && (
          <Modal sneaker={selectedSneaker} onClose={handleCloseSneaker} />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
        
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        
        @keyframes bounce-horizontal-reverse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-5px); }
        }
        
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s infinite;
        }
        
        .animate-bounce-horizontal-reverse {
          animation: bounce-horizontal-reverse 1.5s infinite;
        }
      `}} />
    </section>
  )
}