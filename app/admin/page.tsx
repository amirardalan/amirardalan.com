import PageHeading from '@/components/ui/PageHeading';
import User from '@/components/admin/User';
import BlogActions from '@/components/admin/BlogActions';
import BlogStats from '@/components/admin/BlogStats';

export default function AdminDashboard() {
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <PageHeading title={'Admin Dashboard'} />
        <User />
      </div>
      <BlogActions />
      <BlogStats />
    </div>
  );
}
