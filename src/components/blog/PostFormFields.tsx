import { generateSlug } from '@/utils/generate-slug';
import ResponsiveTextarea from '@/components/blog/ResponsiveTextarea';
import { Category } from '@/types/blog';

interface PostFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  slug: string;
  setSlug: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  published: boolean;
  setPublished: (value: boolean) => void;
  featured?: boolean;
  setFeatured?: (value: boolean) => void;
  showGallery: boolean;
  setShowGallery: (value: boolean) => void;
  showUpdated?: boolean;
  setShowUpdated?: (value: boolean) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  onTextAreaSelect?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  categories: Category[];
  categoryId: number | null;
  setCategoryId: (value: number | null) => void;
  categoriesLoading?: boolean;
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
  published,
  setPublished,
  featured,
  setFeatured,
  setShowGallery,
  showUpdated,
  setShowUpdated,
  textareaRef,
  onTextAreaSelect,
  categories = [],
  categoryId,
  setCategoryId,
  categoriesLoading = false,
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
          className={`block h-14 w-full bg-zinc-100 px-10 ${title ? 'pb-1 pt-5' : 'py-2'} text-zinc-950 focus:outline-none dark:bg-zinc-900 dark:text-light`}
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
          className={`block h-14 w-full bg-zinc-100 px-10 ${slug ? 'pb-1 pt-5' : 'py-2'} text-zinc-950 focus:outline-none dark:bg-zinc-900 dark:text-light`}
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
          className={`block h-14 w-full border-b-2 border-dotted border-zinc-300 bg-zinc-100 px-10 ${excerpt ? 'pb-1 pt-5' : 'py-2'} text-zinc-950 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-light`}
        />
      </div>

      <div className="relative bg-zinc-200 pt-6 dark:bg-zinc-900">
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
          className="block min-h-[3.5rem] w-full bg-zinc-100 px-10 pb-1 pt-5 text-zinc-950 focus:outline-none dark:bg-zinc-900 dark:text-light"
          textareaRef={textareaRef}
          onSelect={onTextAreaSelect}
        />
      </div>

      <div className="mt-2 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="mx-4 flex flex-wrap items-center py-2 text-xxs">
          <select
            id="category"
            value={categoryId ?? ''}
            onChange={(e) =>
              setCategoryId(e.target.value ? Number(e.target.value) : null)
            }
            className="mr-4 block appearance-none rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-500 dark:bg-zinc-900 dark:text-light"
          >
            <option value="" disabled>
              {categoriesLoading
                ? 'Loading categories...'
                : categories.length === 0
                  ? 'No categories available'
                  : 'Select category'}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="mt-2 rounded-md bg-zinc-700 px-4 py-2 text-xxs uppercase text-light md:mt-0"
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
                Update Date
              </label>
            </div>
          )}
          {setFeatured && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured?.(e.target.checked)}
                className="h-4 w-4 cursor-pointer border-zinc-300 text-zinc-400 focus:ring-zinc-400"
              />
              <label htmlFor="featured" className="ml-2 block text-xs">
                Featured
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
