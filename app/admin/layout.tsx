import AdminAuth from '@/components/AdminAuth';
import AdminNav from '@/components/AdminNav';

export const metadata = {
  title: 'Admin | De Vadercoach',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuth>
      <AdminNav />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </AdminAuth>
  );
}
