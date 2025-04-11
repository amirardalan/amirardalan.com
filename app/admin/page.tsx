import AdminPageHeading from '@/components/admin/AdminPageHeading';
import AdminActions from '@/components/admin/AdminActions';
import AdminStats from '@/components/admin/AdminStats';

export default function AdminDashboard() {
  return (
    <div className="mx-10 mt-8">
      <AdminPageHeading title={'Admin Dashboard'} />
      <AdminActions />
      <AdminStats />
    </div>
  );
}
