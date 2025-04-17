import { Category } from '@/types/blog';
import { getCategories } from '@/db/queries/categories';
import { createCategory } from '@/services/category-service';

export default async function AdminCategories() {
  const categories: Category[] = await getCategories();

  async function addCategory(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    if (!name || !slug) return;
    await createCategory({ name, slug });
  }

  return (
    <section className="p-8">
      <h2 className="mb-4 text-xl font-bold">Manage Categories</h2>
      <form action={addCategory} className="mb-4 flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Category name"
          required
          className="rounded border px-2 py-1"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          required
          className="rounded border px-2 py-1"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-3 py-1 text-white"
        >
          Add
        </button>
      </form>
      {categories.length === 0 ? (
        <p className="text-zinc-500">
          No categories have been created yet. Try adding one.
        </p>
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
