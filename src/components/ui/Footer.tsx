import { NavLinks } from '@/components/ui/Navigation';
import Logo from '@/components/ui/Logo';
import { getPageviews } from '@/src/services/views';

export default async function Footer() {
  const views = await getPageviews('/');
  console.log('Views received in Footer:', views); // Add this log

  return (
    <footer
      className="z-10 flex flex-row bg-primary px-6 py-4 pt-4 text-sm text-light lg:px-10 lg:py-8 lg:pt-8 dark:text-dark"
      role="contentinfo"
    >
      <div className="mr-6 flex flex-row items-center">
        <span className="mr-4" aria-label="Copyright">
          &copy;{new Date().getFullYear()}
        </span>
        <Logo size={20} inverted />
        <span className="ml-4">amir.sh</span>
        <span
          className="ml-4 text-xs text-zinc-200 dark:text-zinc-700"
          title="Total site pageviews"
          aria-label="Total site pageviews"
        >
          {views.toLocaleString()} views
        </span>
      </div>
      <div className="hidden md:flex">
        <span aria-hidden="true">•</span>
        <nav className="ml-6" aria-label="Footer navigation">
          <NavLinks variant="footer" />
        </nav>
      </div>
    </footer>
  );
}
