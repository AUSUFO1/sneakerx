'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const slides = [
  { src: '/images/jordan-1.png', alt: 'Air Jordan 1' },
  { src: '/images/jordan-2.png', alt: 'Air Jordan 2' },
  { src: '/images/jordan-3.png', alt: 'Air Jordan 3' },
]

export default function ProductSlider() {
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Mark client mount (avoid SSR mismatches)
  useEffect(() => setMounted(true), [])

  // Responsive slidesPerView
  useEffect(() => {
    if (!mounted) return
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) setSlidesPerView(1) // SM: 1 card
      else setSlidesPerView(2) // MD/LG/XL: 2 cards
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mounted])

  // Auto-slide every 3s (client-only)
  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 3000) // ← tweak speed here
    return () => clearInterval(interval)
  }, [mounted])

  // Smooth center the active slide
  useEffect(() => {
    if (!mounted || !sliderRef.current) return
    const children = sliderRef.current.children
    const activeSlide = children[activeIndex] as HTMLElement
    const offsetLeft =
      activeSlide.offsetLeft - (sliderRef.current.clientWidth - activeSlide.clientWidth) / 2

    sliderRef.current.scrollTo({
      left: offsetLeft,
      behavior: 'smooth',
    })
  }, [activeIndex, slidesPerView, mounted])

  // Improved wheel handler for desktop:
  // - If user is explicitly scrolling horizontally (shift or deltaX > deltaY), map wheel to horizontal.
  // - If vertical scroll and slider can still scroll in that direction, map it to horizontal (so user can scroll slider with wheel).
  // - Otherwise, allow native vertical scroll to bubble to the page (so page won't get stuck).
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider || !mounted) return

    const handleWheel = (e: WheelEvent) => {
      // Small values are noisy; you can tweak this threshold if needed.
      const deltaX = e.deltaX
      const deltaY = e.deltaY
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth
      const atLeft = slider.scrollLeft <= 0
      const atRight = slider.scrollLeft >= maxScrollLeft - 1

      // Case A: user explicitly using horizontal wheel (shift key or larger deltaX)
      if (e.shiftKey || (absX > absY && absX > 2)) {
        e.preventDefault()
        // prefer deltaX, fallback to deltaY when deltaX is 0
        slider.scrollLeft += deltaX || deltaY
        return
      }

      // Case B: vertical wheel but slider can scroll horizontally in that direction — map it
      if (absY > absX) {
        // Scrolling down (positive deltaY) -> move slider right if not at end
        if (deltaY > 0 && !atRight) {
          e.preventDefault()
          slider.scrollLeft += deltaY
          return
        }
        // Scrolling up (negative deltaY) -> move slider left if not at start
        if (deltaY < 0 && !atLeft) {
          e.preventDefault()
          slider.scrollLeft += deltaY
          return
        }
      }

      // Otherwise (slider is at edge or user intended vertical scrolling) - allow default so page scrolls
    }

    slider.addEventListener('wheel', handleWheel, { passive: false })
    return () => slider.removeEventListener('wheel', handleWheel)
  }, [mounted])

  // If not mounted, render nothing (prevents hydration mismatch)
  if (!mounted) return null

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider container */}
      <div
        ref={sliderRef}
        // Add data-smooth-ignore so global smooth-RAF can detect and ignore this area (see Home tweak below)
        data-smooth-ignore
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 py-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`
              relative snap-center shrink-0 
              bg-steel rounded-xl p-8
              transition-all duration-300
              ${i === activeIndex ? 'scale-105 shadow-[0_0_20px_rgba(199,199,199,0.5)]' : 'scale-100'}
              ${slidesPerView === 1 ? 'w-[calc(100%-2rem)]' : 'w-[calc(50%-0.75rem)]'}
            `}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Hide scrollbar for webkit */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
