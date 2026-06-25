import { AdminSidebar } from '@/components/shared/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-brand-light p-8 overflow-auto">{children}</main>
    </div>
  )
}
