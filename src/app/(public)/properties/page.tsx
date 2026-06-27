import { createClient } from '@/lib/supabase/server'
import { PropertiesFilters } from '@/components/public/PropertiesFilters'
import type { Property } from '@/lib/types/property'

export default async function PropertiesPage() {
  const supabase = await createClient()
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  return (
    <>
      {/* Hero band */}
      <section className="bg-brand-navy py-16 px-4 text-center">
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-3">
          המאגר הישראלי
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-white">
          נכסים מסחריים
        </h1>
        <p className="text-white/60 mt-2 text-sm">
          {properties?.length ?? 0} נכסים זמינים
        </p>
      </section>

      {/* Listing */}
      <section className="py-12 px-4 bg-brand-light min-h-[60vh]">
        <div className="max-w-6xl mx-auto">
          <PropertiesFilters properties={(properties ?? []) as Property[]} />
        </div>
      </section>
    </>
  )
}
