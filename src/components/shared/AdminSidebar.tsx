'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
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

  return (
    <aside className="w-64 min-h-screen bg-brand-navy text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <Image
          src="/logo.png"
          alt="TOPROP"
          width={100}
          height={33}
          className="brightness-0 invert"
        />
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-brand-gold text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-white/40 text-center">TOPROP Admin</p>
      </div>
    </aside>
  )
}
