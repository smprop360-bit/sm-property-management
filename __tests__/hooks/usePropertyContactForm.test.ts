import { renderHook, act } from '@testing-library/react'
import { usePropertyContactForm } from '@/hooks/usePropertyContactForm'

const mockInsert = jest.fn().mockResolvedValue({ error: null })

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({ insert: mockInsert }),
  }),
}))

describe('usePropertyContactForm', () => {
  it('initializes with empty values and not submitted', () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    expect(result.current.values.full_name).toBe('')
    expect(result.current.values.phone).toBe('')
    expect(result.current.submitted).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  it('validates required fields on empty submit', async () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.full_name).toBe('שם מלא הוא שדה חובה')
    expect(result.current.errors.phone).toBe('טלפון הוא שדה חובה')
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('validates invalid phone format', async () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל' } } as any)
      result.current.handleChange({ target: { name: 'phone', value: '12345' } } as any)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.phone).toBe('מספר טלפון לא תקין')
  })

  it('clears full_name error when corrected', async () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.full_name).toBe('שם מלא הוא שדה חובה')
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל' } } as any)
    })
    expect(result.current.errors.full_name).toBeUndefined()
  })

  it('sets submitted=true on successful insert', async () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל ישראלי' } } as any)
      result.current.handleChange({ target: { name: 'phone', value: '0501234567' } } as any)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.submitted).toBe(true)
    expect(result.current.submitError).toBeNull()
  })

  it('sets submitError on Supabase insert failure', async () => {
    mockInsert.mockResolvedValueOnce({ error: new Error('db error') })
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל ישראלי' } } as any)
      result.current.handleChange({ target: { name: 'phone', value: '0501234567' } } as any)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.submitError).toBe('שגיאה בשליחת הטופס. אנא נסה שוב.')
    expect(result.current.submitted).toBe(false)
    expect(result.current.loading).toBe(false)
  })
})
