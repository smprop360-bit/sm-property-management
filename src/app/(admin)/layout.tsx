import { AdminSidebar } from '@/components/shared/AdminSidebar'
import '../globals.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="min-w-0 flex-1 overflow-auto bg-brand-light p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
