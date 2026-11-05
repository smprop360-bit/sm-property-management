import { createClient } from '@/lib/supabase/server'
import { PropertyLandingPage } from '@/components/landing/PropertyLandingPage'
import { notFound } from 'next/navigation'
import type { PropertyLandingData } from '@/components/landing/PropertyLandingPage'

export default async function DynamicLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('landing_pages')
    .select('data')
    .eq('slug', slug)
    .single()

  if (!data) notFound()

  return <PropertyLandingPage data={data.data as PropertyLandingData} />
}
