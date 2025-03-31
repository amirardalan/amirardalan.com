import MediaGallery from './MediaGallery';
import categories from '@/data/categories.json';

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
  showGallery,
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

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  return (
    <>
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block font-medium">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block font-medium">
          Excerpt
        </label>
        <input
          type="text"
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="content" className="block font-medium">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={15}
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
        <button
          type="button"
          onClick={() => setShowGallery(true)}
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add Image
        </button>
        {showGallery && (
          <MediaGallery
            onSelect={(url) => {
              setContent(`${content}\n![Image](${url})`); // Fix: Pass the updated string directly
              setShowGallery(false);
            }}
          />
        )}
      </div>

      <div>
        <label htmlFor="category" className="block font-medium">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="published" className="ml-2 block font-medium">
          Publish
        </label>
      </div>

      {setShowUpdated && (
        <div>
          <input
            type="checkbox"
            id="show_updated"
            checked={showUpdated}
            onChange={(e) => setShowUpdated?.(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="show_updated" className="ml-2 block font-medium">
            Show Updated Date
          </label>
        </div>
      )}
    </>
  );
}
