import type { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `You are a professional Israeli real estate landing page copywriter.
Given a property description in Hebrew or English, output a JSON object.
Return ONLY the raw JSON object — no markdown, no code fences, no explanation, nothing else.

The JSON must match this structure:
{
  "dealType": "להשכרה or למכירה",
  "title": "city name short",
  "subtitle": "street address",
  "city": "city name",
  "tagline": "compelling 1-2 sentence description (optional)",
  "price": "number only e.g. 3500 or 146",
  "priceLabel": "use symbol for monthly rent or size in sqm",
  "priceNote": "extra note like including parking (optional)",
  "usageTypes": ["list from: אחסנה, משרד, תעשייה קלה, בית מלאכה, חנות, מסעדה, קליניקה, מחסן"],
  "features": ["4-6 property features in Hebrew"],
  "locationTitle": "location section title",
  "locationSubtitle": "location subtitle",
  "locationItems": [{"emoji": "emoji", "label": "nearby place in Hebrew"}],
  "suitableFor": ["target tenant types in Hebrew"],
  "warningText": "important restriction if any (optional)",
  "urgencyText": "urgency line (optional)",
  "premiumText": "premium selling point (optional)",
  "agents": [{"name": "שלומי לימור", "phone": "055-2702800", "licenseId": "3151306"}, {"name": "לימור קטיעי חיון", "phone": "052-9200190", "licenseId": "31927308"}],
  "agencyName": "שחף נכסים"
}

IMPORTANT: All text must be in Hebrew. agents and agencyName must always be exactly as shown above.`

export async function POST(request: NextRequest) {
  const body = await request.json() as { description?: string; apiKey?: string; model?: string }
  const { description, apiKey, model = 'gpt-4o-mini' } = body

  if (!apiKey?.trim()) {
    return Response.json({ error: 'מפתח API לא מוגדר — הכנס אותו בהגדרות ולחץ שמור.' }, { status: 400 })
  }
  if (!description?.trim()) {
    return Response.json({ error: 'נדרש תיאור נכס' }, { status: 400 })
  }

  let openaiRes: Response
  try {
    openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: description },
        ],
        temperature: 0.7,
      }),
    })
  } catch (networkErr) {
    console.error('[generate-flyer] network error:', networkErr)
    return Response.json({ error: 'שגיאת רשת — לא ניתן להגיע ל-OpenAI' }, { status: 502 })
  }

  const rawText = await openaiRes.text()
  console.log('[generate-flyer] OpenAI status:', openaiRes.status)

  if (!openaiRes.ok) {
    let msg = `OpenAI שגיאה ${openaiRes.status}`
    try {
      const errJson = JSON.parse(rawText) as { error?: { message?: string; code?: string } }
      if (errJson.error?.message) msg = errJson.error.message
    } catch { /* ignore */ }
    console.error('[generate-flyer] OpenAI error:', msg, rawText.slice(0, 300))
    return Response.json({ error: msg }, { status: 200 }) // return 200 so UI shows the error
  }

  let content: string
  try {
    const result = JSON.parse(rawText) as { choices: Array<{ message: { content: string } }> }
    content = result.choices[0]?.message?.content ?? ''
  } catch {
    console.error('[generate-flyer] failed to parse OpenAI response:', rawText.slice(0, 300))
    return Response.json({ error: 'תשובה לא תקינה מ-OpenAI' }, { status: 200 })
  }

  // Strip any accidental markdown fences
  const cleaned = content.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim()

  try {
    const data = JSON.parse(cleaned)
    return Response.json({ data })
  } catch {
    console.error('[generate-flyer] AI returned non-JSON:', cleaned.slice(0, 300))
    return Response.json({ error: 'AI לא החזיר JSON תקין. נסה שוב.' }, { status: 200 })
  }
}
