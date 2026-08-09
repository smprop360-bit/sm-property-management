import { createClient } from '@/lib/supabase/server'
import type { NextRequest } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase.from('app_settings').select('key, value')

  const result: Record<string, string> = {}
  data?.forEach(({ key, value }) => {
    // Mask secret keys — return only last 4 chars
    if (key.includes('api_key') && value) {
      result[key] = '••••••••' + value.slice(-4)
    } else {
      result[key] = value
    }
  })

  return Response.json(result)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body: Record<string, string> = await request.json()

  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === null) continue
    // Skip masked values (user didn't change the key)
    if (typeof value === 'string' && value.startsWith('••••')) continue

    await supabase
      .from('app_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  }

  return Response.json({ ok: true })
}
