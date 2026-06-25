import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image
              src="/logo.png"
              alt="TOPROP"
              width={100}
              height={33}
              className="brightness-0 invert"
            />
            <p className="text-sm text-gray-400">TOP PROPERTY FOR YOU</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <Link href="/owners" className="hover:text-brand-gold transition-colors">
              בעלי נכסים
            </Link>
            <Link href="/seekers" className="hover:text-brand-gold transition-colors">
              מחפשים נכס
            </Link>
            <Link href="/properties" className="hover:text-brand-gold transition-colors">
              נכסים
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/972500000000"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="tel:+972500000000"
              className="flex items-center gap-2 border border-white/20 hover:border-brand-gold text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Phone size={16} />
              התקשרו
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} TOPROP. כל הזכויות שמורות.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
