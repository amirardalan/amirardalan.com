import AdminPageHeading from '@/components/admin/AdminPageHeading';
import BlogActions from '@/components/admin/BlogActions';
import BlogStats from '@/components/admin/BlogStats';

export default function AdminDashboard() {
  return (
    <div className="mt-8">
      <div className="flex">
        <AdminPageHeading title={'Admin Dashboard'} />
      </div>
      <BlogActions />
      <BlogStats />
    </div>
  );
}
