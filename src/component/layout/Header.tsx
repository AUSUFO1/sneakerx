'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Home from '../icon/home'
import Sneaker from '../icon/sneaker'
import Info from '../icon/info'
import Contact from '../icon/contact'

interface MenuItem {
  name: string
  href: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const menuItems: MenuItem[] = [
    { name: 'Home', href: '/', Icon: Home },
    { name: 'Products', href: '/product', Icon: Sneaker },
    { name: 'About', href: '#about', Icon: Info },
    { name: 'Contact', href: '/contact', Icon: Contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' 
            : 'bg-slate-900/80 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 2xl:h-24 items-center justify-between">
            
            {/* Logo with Border - RESPONSIVE FOR ALL SCREENS */}
            <Link 
              href="/" 
              className="group flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              aria-label="SNEAKER X Home"
            >
              <div className="border-2 border-white/20 rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 2xl:px-7 2xl:py-3.5 transition-all duration-300 group-hover:border-red-600 group-hover:shadow-lg group-hover:shadow-red-600/20">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold tracking-tight text-white">
                  SNEAKER <span className="text-red-600">X</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - RESPONSIVE FOR ALL SCREENS */}
            <div className="hidden items-center gap-1 md:flex md:gap-1.5 lg:gap-2 xl:gap-3 2xl:gap-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 2xl:px-6 2xl:py-3.5 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                      isActive 
                        ? 'bg-red-600 text-white' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <item.Icon className={`h-3.5 w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 transition-colors ${
                      isActive ? 'text-white' : 'group-hover:text-red-600'
                    }`} />
                    <span className={`uppercase tracking-wide transition-colors ${
                      isActive ? 'text-white' : 'group-hover:text-red-600'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button - RESPONSIVE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex h-10 w-10 sm:h-11 sm:w-11 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900 md:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span 
                className={`h-0.5 w-5 sm:w-6 bg-white transition-all duration-300 ${
                  isOpen ? 'translate-y-2 rotate-45' : ''
                }`} 
              />
              <span 
                className={`h-0.5 w-5 sm:w-6 bg-white transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`h-0.5 w-5 sm:w-6 bg-white transition-all duration-300 ${
                  isOpen ? '-translate-y-2 -rotate-45' : ''
                }`} 
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - RESPONSIVE */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-lg transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex h-full flex-col items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-xs sm:max-w-sm space-y-2 sm:space-y-3">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center gap-3 sm:gap-4 rounded-xl px-5 py-3.5 sm:px-6 sm:py-4 transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    isActive 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white/5 text-white hover:bg-white/10'
                  } ${
                    isOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                    transitionDuration: '300ms'
                  }}
                >
                  <item.Icon className={`h-5 w-5 sm:h-6 sm:w-6 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'group-hover:text-red-600'
                  }`} />
                  <span className={`text-base sm:text-lg font-medium uppercase tracking-wide transition-colors ${
                    isActive ? 'text-white' : 'group-hover:text-red-600'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content jump - RESPONSIVE */}
      <div className="h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 2xl:h-24" aria-hidden="true" />
    </>
  )
}