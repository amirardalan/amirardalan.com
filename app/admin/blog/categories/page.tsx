import AdminCategories from '@/src/components/admin/AdminCategories';

export default function CategoriesPage() {
  return (
    <main>
      <AdminCategories />
    </main>
  );
}

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Categories — Amir Ardalan',
    description: 'Manage blog categories in the admin panel.',
  };
}
