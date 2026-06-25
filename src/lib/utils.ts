import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPrice(
  price: number | null,
  visible: boolean,
  text?: string | null
): string {
  if (!visible) return 'מחיר לפי פנייה'
  if (text) return text
  if (price === null) return 'מחיר לפי פנייה'
  return `₪${price.toLocaleString('he-IL')}`
}
