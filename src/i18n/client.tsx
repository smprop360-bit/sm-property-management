'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'

const I18nContext = createContext<{ lang: string; dict: Record<string, string> }>({ lang: 'he', dict: {} })

export function I18nProvider({ lang, dict, children }: { lang: string; dict: Record<string, string>; children: ReactNode }) {
  const value = useMemo(() => ({ lang, dict }), [lang, dict])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useLang = () => useContext(I18nContext).lang

export function useT() {
  const { dict } = useContext(I18nContext)
  return (s: string) => dict[s] ?? s
}
