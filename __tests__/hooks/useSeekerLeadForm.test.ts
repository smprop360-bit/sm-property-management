import { renderHook, act } from '@testing-library/react'
import { useSeekerLeadForm } from '@/hooks/useSeekerLeadForm'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    }),
  }),
}))

describe('useSeekerLeadForm', () => {
  it('initializes with empty values', () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    expect(result.current.values.full_name).toBe('')
    expect(result.current.values.property_type).toBe('')
    expect(result.current.values.city).toBe('')
    expect(result.current.values.budget).toBe('')
    expect(result.current.values.size_needed).toBe('')
    expect(result.current.loading).toBe(false)
    expect(result.current.submitError).toBeNull()
  })

  it('validates required fields on empty submit', async () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.full_name).toBe('שם מלא הוא שדה חובה')
    expect(result.current.errors.phone).toBe('טלפון הוא שדה חובה')
  })

  it('validates Israeli phone format', async () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל' } } as any)
      result.current.handleChange({ target: { name: 'phone', value: '12345' } } as any)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.phone).toBe('מספר טלפון לא תקין')
  })

  it('handleSelectChange updates property_type', () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    act(() => {
      result.current.handleSelectChange('property_type', 'office')
    })
    expect(result.current.values.property_type).toBe('office')
  })

  it('clears field error when value is corrected', () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: '' } } as any)
    })
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל' } } as any)
    })
    expect(result.current.errors.full_name).toBeUndefined()
  })
})
