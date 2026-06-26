import { renderHook, act } from '@testing-library/react'
import { useLeadDrawer } from '@/hooks/admin/useLeadDrawer'
import type { Lead } from '@/lib/types/lead'

const mockLead: Lead = {
  id: 1, full_name: 'ישראל ישראלי', phone: '0501234567',
  email: null, lead_type: 'seeker', property_id: null,
  property_type: 'office', city: 'תל אביב', budget: null,
  size_needed: null, message: null, source: null, page_url: null,
  utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null,
  status: 'חדש', notes: 'הערה קיימת', created_at: '2026-06-25T10:00:00Z', updated_at: '2026-06-25T10:00:00Z',
}

describe('useLeadDrawer', () => {
  it('starts closed with no selected lead', () => {
    const { result } = renderHook(() => useLeadDrawer())
    expect(result.current.open).toBe(false)
    expect(result.current.selectedLead).toBeNull()
  })

  it('openDrawer sets selectedLead and syncs notes', () => {
    const { result } = renderHook(() => useLeadDrawer())
    act(() => { result.current.openDrawer(mockLead) })
    expect(result.current.open).toBe(true)
    expect(result.current.selectedLead?.id).toBe(1)
    expect(result.current.notesValue).toBe('הערה קיימת')
  })

  it('openDrawer uses empty string when lead has no notes', () => {
    const { result } = renderHook(() => useLeadDrawer())
    act(() => { result.current.openDrawer({ ...mockLead, notes: null }) })
    expect(result.current.notesValue).toBe('')
  })

  it('closeDrawer resets state', () => {
    const { result } = renderHook(() => useLeadDrawer())
    act(() => { result.current.openDrawer(mockLead) })
    act(() => { result.current.closeDrawer() })
    expect(result.current.open).toBe(false)
    expect(result.current.selectedLead).toBeNull()
    expect(result.current.notesValue).toBe('')
  })
})
