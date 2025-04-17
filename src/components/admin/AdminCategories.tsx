import { Category } from '@/types/blog';
import { getCategories } from '@/db/queries/categories';

export default async function AdminCategories() {
  const categories: Category[] = await getCategories();

  return (
    <section className="p-8">
      <h2 className="mb-4 text-xl font-bold">Manage Categories</h2>
      {categories.length === 0 ? (
        <p className="text-zinc-500">No categories have been created yet.</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li key={cat.id} className="mb-2 flex items-center gap-2">
              <span className="font-mono">{cat.name}</span>
              <span className="text-xs text-zinc-500">({cat.slug})</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
