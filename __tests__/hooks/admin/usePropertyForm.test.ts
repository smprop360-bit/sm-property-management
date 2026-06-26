import { renderHook, act } from '@testing-library/react'
import { usePropertyForm } from '@/hooks/admin/usePropertyForm'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      insert: () => ({
        select: () => ({
          single: jest.fn().mockResolvedValue({ data: { id: 'new-id' }, error: null }),
        }),
      }),
      update: () => ({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    }),
    storage: {
      from: () => ({
        upload: jest.fn().mockResolvedValue({ data: { path: 'new-id/img.jpg' }, error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/img.jpg' } }),
      }),
    },
  }),
}))

describe('usePropertyForm', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => usePropertyForm())
    expect(result.current.values.title).toBe('')
    expect(result.current.values.status).toBe('active')
    expect(result.current.values.price_visible).toBe(true)
    expect(result.current.loading).toBe(false)
    expect(result.current.submitError).toBeNull()
  })

  it('validates required fields on empty submit', async () => {
    const { result } = renderHook(() => usePropertyForm())
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.title).toBe('כותרת הוא שדה חובה')
    expect(result.current.errors.type).toBe('סוג נכס הוא שדה חובה')
    expect(result.current.errors.deal_type).toBe('סוג עסקה הוא שדה חובה')
    expect(result.current.errors.city).toBe('עיר הוא שדה חובה')
  })

  it('clears title error when value is corrected', async () => {
    const { result } = renderHook(() => usePropertyForm())
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.title).toBe('כותרת הוא שדה חובה')
    act(() => {
      result.current.handleChange({ target: { name: 'title', value: 'משרד בתל אביב' } } as any)
    })
    expect(result.current.errors.title).toBeUndefined()
  })

  it('handleSelectChange updates type field', () => {
    const { result } = renderHook(() => usePropertyForm())
    act(() => { result.current.handleSelectChange('type', 'office') })
    expect(result.current.values.type).toBe('office')
  })

  it('handleBoolChange updates price_visible', () => {
    const { result } = renderHook(() => usePropertyForm())
    act(() => { result.current.handleBoolChange('price_visible', false) })
    expect(result.current.values.price_visible).toBe(false)
  })
})
