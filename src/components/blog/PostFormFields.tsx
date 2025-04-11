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
      <div className="relative">
        {title && (
          <label
            htmlFor="title"
            className="absolute left-10 top-1 pt-0.5 text-xxs uppercase text-zinc-500 dark:text-zinc-400"
          >
            Title
          </label>
        )}
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
          className={`block h-14 w-full bg-zinc-100 px-10 ${title ? 'pb-1 pt-5' : 'py-2'} text-zinc-950 focus:outline-none dark:bg-zinc-800 dark:text-light`}
        />
      </div>

      <div className="relative">
        {slug && (
          <label
            htmlFor="slug"
            className="absolute left-10 top-1 pt-0.5 text-xxs uppercase text-zinc-500 dark:text-zinc-400"
          >
            Slug
          </label>
        )}
        <input
          type="text"
          id="slug"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className={`block h-14 w-full bg-zinc-100 px-10 ${slug ? 'pb-1 pt-5' : 'py-2'} text-zinc-950 focus:outline-none dark:bg-zinc-800 dark:text-light`}
        />
      </div>

      <div className="relative">
        {excerpt && (
          <label
            htmlFor="excerpt"
            className="absolute left-10 top-1 pt-0.5 text-xxs uppercase text-zinc-500 dark:text-zinc-400"
          >
            Excerpt
          </label>
        )}
        <input
          type="text"
          id="excerpt"
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className={`block h-14 w-full border-b-[1px] border-zinc-300 bg-zinc-100 px-10 ${excerpt ? 'pb-1 pt-5' : 'py-2'} text-zinc-950 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-light`}
        />
      </div>

      <div className="relative">
        <label
          htmlFor="content"
          className={`absolute left-10 top-1 pt-0.5 text-xxs uppercase ${content ? 'text-zinc-500 dark:text-zinc-400' : 'text-transparent'}`}
        >
          Content (MDX)
        </label>
        <ResponsiveTextarea
          id="content"
          placeholder={content ? '' : 'Content (MDX)'}
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          required
          className="block min-h-[3.5rem] w-full bg-zinc-100 px-10 pb-1 pt-5 text-zinc-950 focus:outline-none dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div className="mt-2 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="mx-4 flex flex-wrap items-center py-2 text-xxs md:mx-10">
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
            className="mr-4 mt-2 rounded-md bg-zinc-700 px-4 py-2 text-xxs uppercase text-light md:mt-0"
          >
            Add Image
          </button>
        </div>

        <div className="mx-4 flex flex-wrap items-center gap-4 md:mx-0">
          {setShowUpdated && (
            <div className="flex items-center">
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
