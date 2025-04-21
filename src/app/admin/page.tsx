import AdminPageHeading from '@/components/admin/AdminPageHeading';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminStats from '@/components/admin/AdminStats';
import Container from '@/components/content/Container';

export default function AdminPage() {
  return (
    <Container>
      <AdminPageHeading title={'Dashboard'} />
      <AdminDashboard />
      <AdminStats />
    </Container>
  );
}
