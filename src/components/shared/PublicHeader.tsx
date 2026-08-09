'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Lock } from 'lucide-react'

const navLinks = [
  { href: '/#services', label: 'השירותים שלנו' },
  { href: '/#about', label: 'אודותינו' },
  { href: '/#contact', label: 'צור קשר' },
]

export function PublicHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="TOPROP" width={120} height={40} priority />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors duration-150 rounded-lg hover:bg-brand-light group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-brand-navy text-white font-semibold px-5 py-2.5 text-sm transition-all duration-200 hover:bg-brand-navy/85 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50"
            >
              צור קשר
            </Link>
            <Link
              href="/admin"
              className="p-2 text-gray-300 hover:text-brand-navy transition-colors duration-150 rounded-lg hover:bg-brand-light"
              aria-label="כניסה לניהול"
              title="כניסה לניהול"
            >
              <Lock size={16} />
            </Link>
            <button
              className="md:hidden p-2 text-gray-600 hover:text-brand-navy rounded-lg hover:bg-brand-light transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="תפריט"
              type="button"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-brand-navy rounded-xl hover:bg-brand-light transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/#contact"
                className="flex items-center justify-center w-full rounded-xl bg-brand-navy text-white font-semibold px-5 py-3 text-sm transition-colors hover:bg-brand-navy/85"
                onClick={() => setOpen(false)}
              >
                צור קשר
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
