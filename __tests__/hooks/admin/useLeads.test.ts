import { renderHook, waitFor, act } from '@testing-library/react'
import { useLeads } from '@/hooks/admin/useLeads'

const mockLeads = [
  {
    id: 1, full_name: 'ישראל ישראלי', phone: '0501234567',
    email: null, lead_type: 'seeker', property_id: null,
    property_type: 'office', city: 'תל אביב', budget: null,
    size_needed: null, message: null, source: null, page_url: null,
    utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null,
    status: 'חדש', notes: null, created_at: '2026-06-25T10:00:00Z', updated_at: '2026-06-25T10:00:00Z',
  },
  {
    id: 2, full_name: 'שרה כהן', phone: '0521111111',
    email: null, lead_type: 'owner', property_id: null,
    property_type: 'store', city: 'ירושלים', budget: null,
    size_needed: null, message: null, source: null, page_url: null,
    utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null,
    status: 'בטיפול', notes: null, created_at: '2026-06-25T09:00:00Z', updated_at: '2026-06-25T09:00:00Z',
  },
]

const mockUpdate = jest.fn().mockReturnValue({ eq: jest.fn().mockResolvedValue({ error: null }) })

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: mockLeads, error: null }),
      }),
      update: mockUpdate,
    }),
  }),
}))

describe('useLeads', () => {
  it('loads leads on mount', async () => {
    const { result } = renderHook(() => useLeads())
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.leads).toHaveLength(2)
  })

  it('filters by search query on full_name', async () => {
    const { result } = renderHook(() => useLeads())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => { result.current.setSearchQuery('שרה') })
    expect(result.current.leads).toHaveLength(1)
    expect(result.current.leads[0].full_name).toBe('שרה כהן')
  })

  it('filters by property type', async () => {
    const { result } = renderHook(() => useLeads())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => { result.current.setFilterType('office') })
    expect(result.current.leads).toHaveLength(1)
    expect(result.current.leads[0].property_type).toBe('office')
  })

  it('filters by status', async () => {
    const { result } = renderHook(() => useLeads())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => { result.current.setFilterStatus('בטיפול') })
    expect(result.current.leads).toHaveLength(1)
    expect(result.current.leads[0].status).toBe('בטיפול')
  })
})
