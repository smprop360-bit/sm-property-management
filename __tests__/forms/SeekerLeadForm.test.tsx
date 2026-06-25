import { render, screen } from '@testing-library/react'
import { SeekerLeadForm } from '@/components/forms/SeekerLeadForm'

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

describe('SeekerLeadForm', () => {
  it('renders name and phone fields', () => {
    render(<SeekerLeadForm />)
    expect(screen.getByPlaceholderText('ישראל ישראלי')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('05X-XXXXXXX')).toBeInTheDocument()
  })

  it('renders seeker-specific city and budget fields', () => {
    render(<SeekerLeadForm />)
    expect(screen.getByPlaceholderText('תל אביב, ירושלים...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('10,000 ₪ לחודש')).toBeInTheDocument()
  })

  it('renders size_needed field', () => {
    render(<SeekerLeadForm />)
    expect(screen.getByPlaceholderText('100-200 מ"ר')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<SeekerLeadForm />)
    expect(screen.getByRole('button', { name: /שלח פנייה/i })).toBeInTheDocument()
  })
})
