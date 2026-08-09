import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { apiKey } = await request.json() as { apiKey: string }

  if (!apiKey?.trim()) {
    return Response.json({ ok: false, error: 'מפתח API לא מוגדר' })
  }

  const res = await fetch('https://api.openai.com/v1/models', {
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } }
    return Response.json({ ok: false, error: err.error?.message || `שגיאה ${res.status}` })
  }

  return Response.json({ ok: true })
}
