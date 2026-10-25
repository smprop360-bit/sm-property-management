'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  X,
  Menu,
  LayoutDashboard,
  Users,
  Building2,
  Megaphone,
  CheckSquare,
  MessageSquare,
  UserCog,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'דשבורד', icon: LayoutDashboard, exact: true },
  { href: '/admin/leads', label: 'לידים', icon: Users },
  { href: '/admin/properties', label: 'נכסים', icon: Building2 },
  { href: '/admin/campaigns', label: 'קמפיינים', icon: Megaphone },
  { href: '/admin/tasks', label: 'משימות', icon: CheckSquare },
  { href: '/admin/messages', label: 'הודעות', icon: MessageSquare },
  { href: '/admin/users', label: 'משתמשים', icon: UserCog },
  { href: '/admin/settings', label: 'הגדרות', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed end-4 top-4 z-40 inline-flex size-11 items-center justify-center rounded-xl bg-brand-navy text-white shadow-lg transition-colors hover:bg-brand-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold md:hidden"
        aria-label="פתח תפריט ניווט"
      >
        <Menu size={20} aria-hidden="true" />
      </button>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-brand-navy/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-label="סגור תפריט ניווט"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 end-0 z-50 flex min-h-screen w-72 shrink-0 flex-col bg-brand-navy text-white shadow-2xl transition-transform duration-200 md:static md:z-auto md:w-64 md:translate-x-0 md:shadow-none',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="S&M" width={40} height={40} style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 6px rgba(200,144,46,0.4))' }} />
            <div>
              <p className="text-xl font-semibold tracking-tight">S<span className="text-brand-gold">&amp;</span>M</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/50">Property Management</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold md:hidden"
            aria-label="סגור תפריט"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">ניהול</p>
          {navItems.map(item => {
            const Icon = item.icon
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
                  active
                    ? 'bg-brand-gold text-white shadow-[0_8px_20px_rgba(200,144,46,0.25)]'
                    : 'text-white/65 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon size={18} aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="text-center text-xs text-white/40">S&amp;M Admin</p>
        </div>
      </aside>
    </>
  )
}
