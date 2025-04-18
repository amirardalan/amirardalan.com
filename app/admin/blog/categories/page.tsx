import AdminCategories from '@/src/components/admin/AdminCategories';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import Container from '@/components/content/Container';

export default function CategoriesPage() {
  return (
    <Container>
      <AdminPageHeading title="Category Manager" />
      <AdminCategories />
    </Container>
  );
}

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Categories — Amir Ardalan',
    description: 'Manage blog categories in the admin panel.',
  };
}
