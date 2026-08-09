import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image
              src="/logo.png"
              alt="TOPROP"
              width={110}
              height={36}
              className="brightness-0 invert opacity-90"
            />
            <p className="text-xs text-white/30 tracking-[0.2em] uppercase">Top Property For You</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/40">
            <Link href="/#services" className="hover:text-brand-gold transition-colors duration-150">
              השירותים שלנו
            </Link>
            <Link href="/#about" className="hover:text-brand-gold transition-colors duration-150">
              אודותינו
            </Link>
            <Link href="/#contact" className="hover:text-brand-gold transition-colors duration-150">
              צור קשר
            </Link>
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/972552601077"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5b] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <a
              href="tel:+972552601077"
              className="flex items-center gap-2 border border-white/15 hover:border-brand-gold/50 hover:text-brand-gold text-white/70 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <Phone size={15} />
              התקשרו
            </a>
          </div>
        </div>

        <div className="border-t border-white/8 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <p>© {new Date().getFullYear()} TOPROP. כל הזכויות שמורות.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
