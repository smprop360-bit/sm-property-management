import { renderHook, waitFor, act } from '@testing-library/react'
import { useProperties } from '@/hooks/admin/useProperties'

const mockProperties = [
  {
    id: 'abc-1', title: 'משרד בתל אביב', slug: 'misrad-ta',
    type: 'office', deal_type: 'rent', city: 'תל אביב',
    area: null, address: null, size_sqm: 100, floor: '3',
    price: 15000, price_visible: true, price_text: null,
    description: null, features: [], images: [], status: 'active',
    created_at: '2026-06-25T10:00:00Z', updated_at: '2026-06-25T10:00:00Z',
  },
  {
    id: 'abc-2', title: 'חנות בירושלים', slug: 'hanut-jlm',
    type: 'store', deal_type: 'sale', city: 'ירושלים',
    area: null, address: null, size_sqm: 60, floor: null,
    price: 800000, price_visible: true, price_text: null,
    description: null, features: [], images: [], status: 'active',
    created_at: '2026-06-25T09:00:00Z', updated_at: '2026-06-25T09:00:00Z',
  },
]

const mockDeleteEq = jest.fn().mockResolvedValue({ error: null })

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: mockProperties, error: null }),
      }),
      delete: () => ({ eq: mockDeleteEq }),
    }),
  }),
}))

describe('useProperties', () => {
  it('loads properties on mount', async () => {
    const { result } = renderHook(() => useProperties())
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.properties).toHaveLength(2)
  })

  it('filters by search query on title', async () => {
    const { result } = renderHook(() => useProperties())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => { result.current.setSearchQuery('חנות') })
    expect(result.current.properties).toHaveLength(1)
    expect(result.current.properties[0].title).toBe('חנות בירושלים')
  })

  it('filters by property type', async () => {
    const { result } = renderHook(() => useProperties())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => { result.current.setFilterType('office') })
    expect(result.current.properties).toHaveLength(1)
    expect(result.current.properties[0].type).toBe('office')
  })

  it('deleteProperty removes item from state', async () => {
    const { result } = renderHook(() => useProperties())
    await waitFor(() => expect(result.current.loading).toBe(false))
    await act(async () => { await result.current.deleteProperty('abc-1') })
    expect(result.current.properties).toHaveLength(1)
    expect(result.current.properties[0].id).toBe('abc-2')
  })
})
