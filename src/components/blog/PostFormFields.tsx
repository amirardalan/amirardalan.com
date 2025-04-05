import categories from '@/data/categories.json';
import { generateSlug } from '@/utils/generate-slug';

interface PostFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  slug: string;
  setSlug: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  published: boolean;
  setPublished: (value: boolean) => void;
  showGallery: boolean;
  setShowGallery: (value: boolean) => void;
  showUpdated?: boolean;
  setShowUpdated?: (value: boolean) => void;
}

export default function PostFormFields({
  title,
  setTitle,
  slug,
  setSlug,
  excerpt,
  setExcerpt,
  content,
  setContent,
  category,
  setCategory,
  published,
  setPublished,
  setShowGallery,
  showUpdated,
  setShowUpdated,
}: PostFormFieldsProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  return (
    <>
      <div>
        <label htmlFor="title" className="block text-xs">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-xs">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-xs">
          Excerpt
        </label>
        <input
          type="text"
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-xs">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={15}
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div className="flex flex-row items-center">
        <div className="mr-6 flex items-center text-xxs">
          <label htmlFor="category" className="mr-2">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="focus:zinc-500 mr-4 block appearance-none rounded-md border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-zinc-950 focus:bg-zinc-800 focus:outline-primary focus:ring-1 focus:ring-primary dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
          >
            <option value="" disabled className="text-light">
              Category
            </option>
            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
                className="hover:bg-primary hover:text-white"
              >
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="mr-4 rounded bg-zinc-700 px-4 py-2 text-xxs uppercase text-white"
          >
            Add Image
          </button>
        </div>

        <div className="flex items-center">
          {setShowUpdated && (
            <div className="mr-6 flex items-center">
              <input
                type="checkbox"
                id="show_updated"
                checked={showUpdated}
                onChange={(e) => setShowUpdated?.(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-zinc-400 focus:ring-zinc-400"
              />
              <label htmlFor="show_updated" className="ml-2 block text-xs">
                Show Updated Date
              </label>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="zinc-400 h-4 w-4 cursor-pointer rounded border-zinc-300 focus:ring-zinc-400"
            />
            <label htmlFor="published" className="ml-2 block text-xs">
              Publish
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
