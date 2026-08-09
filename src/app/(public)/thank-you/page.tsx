import Link from 'next/link'
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-brand-light">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-brand-gold" />
        </div>

        {/* Overline */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-brand-gold/40" />
          <p className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.3em]">
            תודה
          </p>
          <div className="h-px w-10 bg-brand-gold/40" />
        </div>

        <h1
          className="text-3xl md:text-4xl font-black text-brand-navy mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          קיבלנו את פנייתך!
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-10">
          אחד מהנציגים שלנו יחזור אליך בהקדם האפשרי.
          <br />
          בינתיים, אפשר לדבר איתנו ישירות בווצאפ.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/972552601077"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-semibold px-8 py-3.5 text-sm transition-all duration-200 hover:bg-[#20bd5b] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
          >
            <MessageCircle className="w-4 h-4" />
            דבר איתנו בווצאפ
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy/20 text-brand-navy font-semibold px-8 py-3.5 text-sm transition-all duration-200 hover:bg-brand-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/30"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לעמוד הבית
          </Link>
        </div>
      </div>
    </div>
  )
}
