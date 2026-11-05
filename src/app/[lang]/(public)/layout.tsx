import PublicHeader from '@/components/shared/PublicHeader'
import PublicFooter from '@/components/shared/PublicFooter'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <WhatsAppButton />
    </div>
  )
}
