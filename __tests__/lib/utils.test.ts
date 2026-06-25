import { slugify, formatPrice } from '@/lib/utils'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('office tel aviv')).toBe('office-tel-aviv')
  })
  it('converts to lowercase', () => {
    expect(slugify('Office Petah Tikva')).toBe('office-petah-tikva')
  })
  it('collapses multiple spaces', () => {
    expect(slugify('office  double  space')).toBe('office-double-space')
  })
  it('removes non-alphanumeric chars', () => {
    expect(slugify('office (floor 3)')).toBe('office-floor-3')
  })
})

describe('formatPrice', () => {
  it('returns "מחיר לפי פנייה" when price_visible is false', () => {
    expect(formatPrice(1000000, false)).toBe('מחיר לפי פנייה')
  })
  it('returns custom text when provided and visible', () => {
    expect(formatPrice(1000000, true, 'במשא ומתן')).toBe('במשא ומתן')
  })
  it('returns "מחיר לפי פנייה" when price is null and visible', () => {
    expect(formatPrice(null, true)).toBe('מחיר לפי פנייה')
  })
  it('formats price with ₪ and thousands separator', () => {
    expect(formatPrice(15000, true)).toBe('₪15,000')
  })
})
