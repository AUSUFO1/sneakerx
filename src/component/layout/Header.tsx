'use client'

import { useState } from 'react'
import Link from 'next/link'

// Default icon imports
import Home from '../icon/home';
import Sneaker from '../icon/sneaker';
import Configure from '../icon/config';
import Info from '../icon/info';
import Contact from '../icon/contact';



interface MenuItem {
  name: string
  href: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems: MenuItem[] = [
    { name: 'Home', href: '/', Icon: Home },
    { name: 'Product', href: '/product', Icon: Sneaker },
    { name: 'Config', href: '/configurator', Icon: Configure },
    { name: 'About', href: '/about', Icon: Info },
    { name: 'Contact', href: '/contact', Icon: Contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-midnight/80 border-b border-steel/10">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-heading font-bold tracking-tight">
              SNEAKER <span className="text-nike-red">X</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-white hover:text-nike-red transition-colors group"
              >
                <item.Icon className="w-5 h-5 text-white group-hover:text-nike-red transition-colors" />
                <span className="text-sm font-medium uppercase tracking-wider group-hover:text-nike-red">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-6 space-y-4 pb-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-white hover:text-nike-red transition-colors py-2"
              >
                <item.Icon className="w-6 h-6 text-white hover:text-nike-red transition-colors" />
                <span className="text-base font-medium uppercase tracking-wider group-hover:text-nike-red">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
