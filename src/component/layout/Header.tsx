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

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
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
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="group flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              aria-label="SNEAKER X Home"
            >
              <div className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                SNEAKER <span className="text-red-600">X</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex lg:gap-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900 lg:px-4 ${
                      isActive 
                        ? 'bg-red-600 text-white' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <item.Icon className={`h-4 w-4 transition-colors lg:h-5 lg:w-5 ${
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900 md:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span 
                className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? 'translate-y-2 rotate-45' : ''
                }`} 
              />
              <span 
                className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? '-translate-y-2 -rotate-45' : ''
                }`} 
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-lg transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex h-full flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center gap-4 rounded-xl px-6 py-4 transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900 ${
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
                  <item.Icon className={`h-6 w-6 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'group-hover:text-red-600'
                  }`} />
                  <span className={`text-lg font-medium uppercase tracking-wide transition-colors ${
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

      {/* Spacer to prevent content jump */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  )
}