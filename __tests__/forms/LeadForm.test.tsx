import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LeadForm } from '@/components/forms/LeadForm'

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

describe('LeadForm', () => {
  it('shows validation error for missing full_name', async () => {
    render(<LeadForm leadType="owner" />)
    fireEvent.click(screen.getByRole('button', { name: /שלח פנייה/ }))
    await waitFor(() => {
      expect(screen.getByText('שם מלא הוא שדה חובה')).toBeInTheDocument()
    })
  })

  it('shows validation error for missing phone', async () => {
    render(<LeadForm leadType="owner" />)
    fireEvent.click(screen.getByRole('button', { name: /שלח פנייה/ }))
    await waitFor(() => {
      expect(screen.getByText('טלפון הוא שדה חובה')).toBeInTheDocument()
    })
  })

  it('clears full_name error when user starts typing', async () => {
    render(<LeadForm leadType="owner" />)
    fireEvent.click(screen.getByRole('button', { name: /שלח פנייה/ }))
    await waitFor(() => {
      expect(screen.getByText('שם מלא הוא שדה חובה')).toBeInTheDocument()
    })
    fireEvent.change(screen.getByPlaceholderText('ישראל ישראלי'), { target: { value: 'ישראל' } })
    expect(screen.queryByText('שם מלא הוא שדה חובה')).not.toBeInTheDocument()
  })
})
