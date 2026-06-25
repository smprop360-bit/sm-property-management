import { render, screen } from '@testing-library/react'
import { PropertyCard } from '@/components/shared/PropertyCard'
import type { Property } from '@/lib/types/property'

const mockProperty: Property = {
  id: 'abc-123',
  title: 'משרד במרכז תל אביב',
  slug: 'office-tel-aviv-123',
  type: 'office',
  deal_type: 'rent',
  city: 'תל אביב',
  area: 'מרכז',
  address: null,
  size_sqm: 150,
  floor: '3',
  price: 15000,
  price_visible: true,
  price_text: null,
  description: null,
  features: [],
  images: [],
  status: 'active',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

describe('PropertyCard', () => {
  it('renders property title', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('משרד במרכז תל אביב')).toBeInTheDocument()
  })

  it('renders city and area', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('תל אביב, מרכז')).toBeInTheDocument()
  })

  it('renders formatted price when visible', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText(/15,000/)).toBeInTheDocument()
  })

  it('renders "מחיר לפי פנייה" when price_visible is false', () => {
    render(<PropertyCard property={{ ...mockProperty, price_visible: false }} />)
    expect(screen.getByText('מחיר לפי פנייה')).toBeInTheDocument()
  })

  it('renders link to property page', () => {
    render(<PropertyCard property={mockProperty} />)
    const link = screen.getByRole('link', { name: /פרטים נוספים/ })
    expect(link).toHaveAttribute('href', '/property/office-tel-aviv-123')
  })
})
