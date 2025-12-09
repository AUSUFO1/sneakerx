'use client'

import { useEffect, useRef, useState } from 'react'
import ProductSlider from './ProductSlider'

export default function ProductSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeWords, setActiveWords] = useState<number[]>([])

  const text = {
    title: "Where Performance Meets Legacy.",
    description: `The Air Jordan isn't just a sneaker – it's a symbol of excellence 
    and innovation. Born from the courts and streets, 
    each pair carries the spirit of champions and 
    the audacity to defy gravity. Engineered with cutting-edge technology 
    and timeless design, the Jordan delivers unmatched comfort, explosive 
    responsiveness, and iconic style that transcends generations.`
  }

  const titleWords = text.title.split(' ')
  const descWords = text.description.split(' ')
  const totalWords = titleWords.length + descWords.length

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionHeight = rect.height

      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / (viewportHeight + sectionHeight))
      )

      const wordsToActivate = Math.floor(scrollProgress * totalWords)
      setActiveWords(Array.from({ length: wordsToActivate }, (_, i) => i))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalWords])

  const renderAnimatedText = () => {
    let wordIndex = 0

    return (
      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-xl lg:text-4xl font-heading font-bold leading-tight">
          {titleWords.map((word, i) => {
            const currentIndex = wordIndex++
            return (
              <span
                key={i}
                className={`transition-colors duration-300 ${
                  activeWords.includes(currentIndex) ? 'text-white' : 'text-steel'
                }`}
              >
                {word}{' '}
              </span>
            )
          })}
        </h2>

        {/* Description */}
        <p className="text-lg lg:text-xl leading-relaxed">
          {descWords.map((word, i) => {
            const currentIndex = wordIndex++
            return (
              <span
                key={i}
                className={`transition-colors duration-300 ${
                  activeWords.includes(currentIndex) ? 'text-white' : 'text-steel'
                }`}
              >
                {word}{' '}
              </span>
            )
          })}
        </p>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-steel/20">
          <div>
            <p
              className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                activeWords.length > totalWords * 0.7 ? 'text-white' : 'text-steel'
              }`}
            >
              Weight
            </p>
            <p
              className={`text-lg font-medium transition-colors duration-300 ${
                activeWords.length > totalWords * 0.7 ? 'text-white' : 'text-steel'
              }`}
            >
              385 grams
            </p>
          </div>
          <div>
            <p
              className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                activeWords.length > totalWords * 0.7 ? 'text-white' : 'text-steel'
              }`}
            >
              Material
            </p>
            <p
              className={`text-lg font-medium transition-colors duration-300 ${
                activeWords.length > totalWords * 0.7 ? 'text-white' : 'text-steel'
              }`}
            >
              Premium Leather
            </p>
          </div>
          <div>
            <p
              className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                activeWords.length > totalWords * 0.8 ? 'text-white' : 'text-steel'
              }`}
            >
              Cushioning
            </p>
            <p
              className={`text-lg font-medium transition-colors duration-300 ${
                activeWords.length > totalWords * 0.8 ? 'text-white' : 'text-steel'
              }`}
            >
              Air Max Technology
            </p>
          </div>
          <div>
            <p
              className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                activeWords.length > totalWords * 0.8 ? 'text-white' : 'text-steel'
              }`}
            >
              Colorways
            </p>
            <p
              className={`text-lg font-medium transition-colors duration-300 ${
                activeWords.length > totalWords * 0.8 ? 'text-white' : 'text-steel'
              }`}
            >
              Chicago, Bred, Royal
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="min-h-screen py-24 bg-midnight">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Animated Text */}
          <div className="lg:sticky lg:top-32">{renderAnimatedText()}</div>

          {/* Right: Image Slider */}
          <div className="space-y-6">
            <ProductSlider />
          </div>
        </div>
      </div>
    </section>
  )
}
