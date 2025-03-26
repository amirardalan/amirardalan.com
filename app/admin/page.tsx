import AdminPageHeading from '@/components/admin/AdminPageHeading';
import AdminActions from '@/components/admin/AdminActions';
import AdminStats from '@/components/admin/AdminStats';

export default function AdminDashboard() {
  return (
    <div className="mt-8">
      <div className="flex">
        <AdminPageHeading title={'Admin Dashboard'} />
      </div>
      <AdminActions />
      <AdminStats />
    </div>
  );
}
