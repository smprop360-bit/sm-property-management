'use client'

import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import { useLang } from './client'
import { localePath } from './config'

export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const lang = useLang()
  return <NextLink href={typeof href === 'string' ? localePath(lang, href) : href} {...props} />
}
