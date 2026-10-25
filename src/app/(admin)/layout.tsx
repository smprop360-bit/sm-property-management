import { AdminSidebar } from '@/components/shared/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-auto bg-brand-light p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  )
}
