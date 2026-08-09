'use client'

import { useState } from 'react'
import {
  Key, Bot, Sparkles, Copy, CheckCircle, Save,
  AlertTriangle, ChevronDown, ExternalLink, Loader2, RefreshCw,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const OPENAI_MODELS = [
  { value: 'gpt-4o',        label: 'GPT-4o — הכי חכם ומהיר' },
  { value: 'gpt-4o-mini',   label: 'GPT-4o Mini — מהיר וזול (מומלץ)' },
  { value: 'gpt-4-turbo',   label: 'GPT-4 Turbo' },
  { value: 'gpt-4',         label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo — הכי זול' },
]

const LS_KEY  = 'toprop_openai_key'
const LS_MODEL = 'toprop_openai_model'

export default function AdminSettingsPage() {
  /* ── AI settings ── */
  const [apiKey, setApiKey]           = useState(() => typeof window !== 'undefined' ? (localStorage.getItem(LS_KEY) ?? '') : '')
  const [model,  setModel]            = useState(() => typeof window !== 'undefined' ? (localStorage.getItem(LS_MODEL) ?? 'gpt-4o-mini') : 'gpt-4o-mini')
  const [saved,  setSaved]            = useState(false)
  const loadingSettings = false

  /* ── Connection test ── */
  type ConnStatus = 'unknown' | 'testing' | 'ok' | 'error'
  const [connStatus, setConnStatus] = useState<ConnStatus>('unknown')
  const [connError,  setConnError]  = useState<string | null>(null)

  /* ── Flyer generator ── */
  const [description,    setDescription]    = useState('')
  const [generating,     setGenerating]     = useState(false)
  const [generatedData,  setGeneratedData]  = useState<string | null>(null)
  const [generatedJson,  setGeneratedJson]  = useState<Record<string, unknown> | null>(null)
  const [genError,       setGenError]       = useState<string | null>(null)
  const [copied,         setCopied]         = useState(false)

  /* ── Save landing page ── */
  const [savingPage, setSavingPage] = useState(false)
  const [savedSlug,  setSavedSlug]  = useState<string | null>(null)

  const supabase = createClient()

  function saveSettings() {
    localStorage.setItem(LS_KEY,   apiKey)
    localStorage.setItem(LS_MODEL, model)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function testConnection() {
    setConnStatus('testing')
    setConnError(null)
    const key = localStorage.getItem(LS_KEY) || apiKey
    const res  = await fetch('/api/ai/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key }),
    })
    const json = await res.json() as { ok: boolean; error?: string }
    if (json.ok) {
      setConnStatus('ok')
    } else {
      setConnStatus('error')
      setConnError(json.error ?? 'שגיאה לא ידועה')
    }
  }

  async function generateFlyer() {
    setGenerating(true)
    setGenError(null)
    setGeneratedData(null)
    setGeneratedJson(null)
    setSavedSlug(null)

    const key = localStorage.getItem(LS_KEY) || apiKey
    const res  = await fetch('/api/ai/generate-flyer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, apiKey: key, model }),
    })
    const json = await res.json() as { data?: Record<string, unknown>; error?: string }

    if (json.error) {
      setGenError(json.error)
    } else if (json.data) {
      setGeneratedJson(json.data)
      setGeneratedData(JSON.stringify(json.data, null, 2))
    }
    setGenerating(false)
  }

  async function copyJson() {
    if (!generatedData) return
    await navigator.clipboard.writeText(generatedData)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function saveLandingPage() {
    if (!generatedJson) return
    setSavingPage(true)
    const title    = String(generatedJson.title ?? 'דף נחיתה')
    const citySlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const slug     = `${citySlug || 'lp'}-${Date.now().toString(36)}`
    await supabase.from('landing_pages').insert({ slug, title, data: generatedJson })
    setSavedSlug(slug)
    setSavingPage(false)
  }

  return (
    <div dir="rtl" className="max-w-3xl space-y-8">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black text-brand-navy">הגדרות</h1>
        <p className="text-gray-500 text-sm mt-1">ניהול חיבורים ואינטגרציות</p>
      </div>

      {/* ═══ AI Configuration card ═══ */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-brand-navy px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot size={18} className="text-brand-gold" />
            <div>
              <h2 className="text-white font-black text-base">בינה מלאכותית — ChatGPT</h2>
              <p className="text-white/40 text-xs">חיבור ל-OpenAI ליצירת דפי נחיתה אוטומטית</p>
            </div>
          </div>

          {/* Connection status dot */}
          <div className="flex items-center gap-2">
            <span className={[
              'w-2.5 h-2.5 rounded-full shrink-0',
              connStatus === 'unknown' ? 'bg-gray-400' :
              connStatus === 'testing' ? 'bg-yellow-400 animate-pulse' :
              connStatus === 'ok'      ? 'bg-green-400 animate-pulse' :
              'bg-red-500',
            ].join(' ')} />
            <span className="text-white/50 text-xs">
              {connStatus === 'unknown' ? 'לא נבדק' :
               connStatus === 'testing' ? 'בודק...'  :
               connStatus === 'ok'      ? 'מחובר'    : 'שגיאה'}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* API Key */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-bold text-brand-navy mb-2">
              <Key size={14} />
              מפתח API של OpenAI
            </label>
            {loadingSettings ? (
              <div className="h-11 bg-gray-100 rounded-xl animate-pulse" />
            ) : (
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="sk-..."
                dir="ltr"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
              />
            )}
            <p className="text-xs text-gray-400 mt-1.5">
              המפתח נשמר רק בדפדפן שלך ולא עובר לשרת.{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-navy underline hover:text-brand-gold transition-colors"
              >
                קבל מפתח API
                <ExternalLink size={10} className="inline mr-0.5" />
              </a>
            </p>
          </div>

          {/* Model selector */}
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-2">מודל</label>
            <div className="relative">
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
              >
                {OPENAI_MODELS.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Save + Test */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={saveSettings}
              disabled={loadingSettings}
              className="flex items-center gap-2 bg-brand-navy text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-brand-navy/90 transition-colors disabled:opacity-50"
            >
              {saved ? <CheckCircle size={15} /> : <Save size={15} />}
              {saved ? 'נשמר!' : 'שמור הגדרות'}
            </button>

            <button
              onClick={testConnection}
              disabled={connStatus === 'testing' || !apiKey.trim()}
              className="flex items-center gap-2 border border-gray-200 text-gray-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:border-brand-navy hover:text-brand-navy transition-colors disabled:opacity-50"
            >
              {connStatus === 'testing'
                ? <Loader2 size={15} className="animate-spin" />
                : <RefreshCw size={15} />
              }
              בדוק חיבור
            </button>
          </div>

          {/* Connection result */}
          {connStatus === 'ok' && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
              <CheckCircle size={15} className="text-green-600 shrink-0" />
              <p className="text-green-700 text-sm font-semibold">מחובר בהצלחה לOpenAI!</p>
            </div>
          )}
          {connStatus === 'error' && connError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{connError}</p>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Flyer Generator card ═══ */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-brand-navy px-6 py-4 flex items-center gap-3">
          <Sparkles size={18} className="text-brand-gold" />
          <div>
            <h2 className="text-white font-black text-base">יצירת דף נחיתה עם AI</h2>
            <p className="text-white/40 text-xs">תאר את הנכס וה-AI יבנה עבורך דף נחיתה מוכן</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-2">תיאור הנכס</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              placeholder={`לדוגמה:\nמשרד של 52 מ״ר להשכרה בפתח תקווה, מתחם מטרופארק.\nכולל חדר מנהל, אופן ספייס ומטבחון.\nשכר דירה 3,500 ש״ח כולל חניה.\nמיקום מצוין ליד הרכבת הקלה והקניון הגדול.`}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold leading-relaxed"
            />
          </div>

          <button
            onClick={generateFlyer}
            disabled={generating || !description.trim() || !apiKey.trim()}
            className="flex items-center gap-2 bg-brand-gold text-brand-navy font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {generating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
            {generating ? 'AI עובד על זה...' : 'צור דף נחיתה עם AI'}
          </button>

          {!apiKey.trim() && (
            <p className="text-xs text-amber-600 flex items-center gap-1.5">
              <AlertTriangle size={13} />
              הכנס מפתח API למעלה ולחץ שמור לפני שמייצרים
            </p>
          )}

          {genError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{genError}</p>
            </div>
          )}

          {generatedData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-brand-navy">✅ הדף נוצר — נתוני דף הנחיתה</p>
                <button
                  onClick={copyJson}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-navy transition-colors"
                >
                  {copied ? <CheckCircle size={13} className="text-green-600" /> : <Copy size={13} />}
                  {copied ? 'הועתק!' : 'העתק JSON'}
                </button>
              </div>

              <pre className="bg-[#f4f6fa] border border-gray-100 rounded-xl p-4 text-xs font-mono overflow-auto max-h-80 text-gray-700 leading-relaxed">
                {generatedData}
              </pre>

              {savedSlug ? (
                <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600 shrink-0" />
                  <div className="text-sm">
                    <span className="font-bold text-green-700">הדף נשמר! </span>
                    <a
                      href={`/lp/${savedSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-navy underline hover:text-brand-gold transition-colors"
                    >
                      /lp/{savedSlug}
                      <ExternalLink size={11} className="inline mr-0.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <button
                  onClick={saveLandingPage}
                  disabled={savingPage}
                  className="flex items-center gap-2 bg-brand-navy text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-brand-navy/90 transition-colors disabled:opacity-50"
                >
                  {savingPage ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {savingPage ? 'שומר דף...' : 'שמור כדף נחיתה'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
