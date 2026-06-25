'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

const navLinks = [
  { href: '/properties?type=office', label: 'משרדים' },
  { href: '/properties?type=store', label: 'חנויות' },
  { href: '/properties?type=warehouse', label: 'מחסנים' },
  { href: '/properties', label: 'כל הנכסים' },
  { href: '/seekers', label: 'מחפשים נכס' },
]

export function PublicHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image src="/logo.png" alt="TOPROP" width={120} height={40} priority />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/owners"
              className={buttonVariants({ className: 'hidden md:flex bg-brand-gold hover:bg-brand-gold/90 text-white' })}
            >
              פרסם נכס
            </Link>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setOpen(!open)}
              aria-label="תפריט"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-navy rounded-lg hover:bg-brand-light"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/owners"
              className={buttonVariants({ className: 'mt-3 w-full bg-brand-gold hover:bg-brand-gold/90 text-white' })}
            >
              פרסם נכס
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
