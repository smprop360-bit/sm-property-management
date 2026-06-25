import Link from 'next/link'
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-brand-gold" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          קיבלנו את פנייתך!
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          אחד מהנציגים שלנו יחזור אליך בהקדם האפשרי.
          <br />
          בינתיים, אפשר לדבר איתנו ישירות בווצאפ.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/972500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white font-semibold px-8 py-4 text-base transition-colors hover:bg-[#20bd5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
          >
            <MessageCircle className="w-5 h-5" />
            דבר איתנו בווצאפ
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-navy text-brand-navy font-semibold px-8 py-4 text-base transition-colors hover:bg-brand-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50"
          >
            <ArrowRight className="w-5 h-5" />
            חזרה לעמוד הבית
          </Link>
        </div>
      </div>
    </div>
  )
}
