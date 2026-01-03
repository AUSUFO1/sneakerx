'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/product' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '/contact' },
  ]

  const supportLinks = [
    { name: 'FAQ', href: '#faq' },
    { name: 'Returns', href: '#returns' },
    { name: 'Shipping', href: '#shipping' },
    { name: 'Terms & Conditions', href: '#  terms' },
  ]

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
    { name: 'Twitter', href: 'https://twitter.com', Icon: Twitter },
    { name: 'Facebook', href: 'https://facebook.com', Icon: Facebook },
  ]

  const handleSubscribe = () => {
    if (email) {
      console.log('Subscribed:', email)
      setEmail('')
    }
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-800" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Brand Section */}
            <div className="space-y-4 md:col-span-2 lg:col-span-1">
              <Link 
                href="/" 
                className="inline-block text-2xl font-bold tracking-tight text-white transition-transform hover:scale-105"
                aria-label="SNEAKER X Home"
              >
                SNEAKER <span className="text-red-600">X</span>
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                Premium sneaker drops, curated collections, and timeless Jordan heritage. Built for style and performance.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-red-600 focus:outline-none focus:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Support
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-red-600 focus:outline-none focus:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Stay Updated
              </h3>
              <p className="text-sm text-slate-400">
                Get the latest drops and exclusive offers.
              </p>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label="Email address"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-400 md:flex-row md:text-left">
            <p>
              &copy; {currentYear} SneakerX. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="#privacy" className="hover:text-red-600 transition-colors focus:outline-none focus:underline">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-red-600 transition-colors focus:outline-none focus:underline">
                Terms of Service
              </Link>
              <Link href="#cookies" className="hover:text-red-600 transition-colors focus:outline-none focus:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}