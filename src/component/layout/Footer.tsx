"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/product" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { name: "FAQ", href: "#faq" },
    { name: "Returns", href: "#returns" },
    { name: "Shipping", href: "#shipping" },
    { name: "Terms & Conditions", href: "#terms" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
    { name: "Twitter", href: "https://twitter.com", Icon: Twitter },
    { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
  ];

  return (
    <footer className="bg-slate-900 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* MAIN */}
        <div className="py-14 sm:py-16 lg:py-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-5 md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-center transition-transform hover:scale-105 active:scale-95"
              aria-label="Sneaker X Home"
            >
              <div className="border-2 border-white/20 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 xl:px-6 xl:py-3 transition-all duration-300 group-hover:border-red-600 group-hover:shadow-lg group-hover:shadow-red-600/20">
                <span className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold tracking-tight text-white">
                  SNEAKER <span className="text-red-600">X</span>
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm sm:text-base text-slate-400 leading-relaxed">
              Premium sneaker drops, curated collections, and timeless Jordan
              heritage. Built for style and performance.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-red-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-semibold text-white">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-red-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-semibold text-white">
              Stay Updated
            </h4>
            <p className="text-sm text-slate-400">
              Get the latest drops and exclusive offers.
            </p>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-lg bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <button
                className="w-full rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {currentYear} SneakerX. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#privacy" className="hover:text-red-600">Privacy</Link>
            <Link href="#terms" className="hover:text-red-600">Terms</Link>
            <Link href="#cookies" className="hover:text-red-600">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
