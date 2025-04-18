import AdminCategories from '@/src/components/admin/AdminCategories';
import AdminPageHeading from '@/components/admin/AdminPageHeading';

export default function CategoriesPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-10 mt-8">
        <AdminPageHeading title="Category Manager" />
      </div>
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

// Add revalidation to prevent unnecessary refetching
export const revalidate = 3600; // Revalidate at most once per hour
