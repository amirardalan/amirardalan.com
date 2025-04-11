import { generateSlug } from '@/utils/generate-slug';
import ResponsiveTextarea from '@/components/blog/ResponsiveTextarea';

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

  // Hardcoded categories for now
  const categories = [
    {
      id: 'code',
      name: 'Code',
    },
    {
      id: 'personal',
      name: 'Personal',
    },
    {
      id: 'tools',
      name: 'Tools',
    },
  ];

  return (
    <>
      <div>
        <label htmlFor="title" className="hidden text-xs">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
          className="block w-full bg-zinc-100 px-10 pb-2 pt-4 text-zinc-950 focus:outline-none dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="slug" className="hidden text-xs">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="block w-full bg-zinc-100 px-10 py-2 text-zinc-950 focus:outline-none dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="hidden text-xs">
          Excerpt
        </label>
        <input
          type="text"
          id="excerpt"
          value={excerpt}
          placeholder="Excerpt"
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className="block w-full border-b-[1px] border-zinc-300 bg-zinc-100 px-10 pb-4 pt-2 text-zinc-950 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="content" className="hidden text-xs">
          Content (MDX)
        </label>
        <ResponsiveTextarea
          id="content"
          value={content}
          placeholder="Content (MDX)"
          onChange={(e: { target: { value: string } }) =>
            setContent(e?.target?.value)
          }
          required
          className="block w-full bg-zinc-100 px-10 pb-2 pt-4 text-zinc-950 focus:outline-none dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div className="flex flex-row items-center">
        <div className="mx-10 flex items-center py-4 text-xxs">
          <label htmlFor="category" className="mr-2">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mr-4 block appearance-none rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
          >
            <option value="" disabled className="text-light">
              Category
            </option>
            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
                className="hover:bg-primary hover:text-light"
              >
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="mr-4 rounded-md bg-zinc-700 px-4 py-2 text-xxs uppercase text-light"
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
                className="h-4 w-4 cursor-pointer border-zinc-300 text-zinc-400 focus:ring-zinc-400"
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
              className="zinc-400 h-4 w-4 cursor-pointer border-zinc-300 focus:ring-zinc-400"
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
