import { NavLinks } from '@/components/ui/Navigation';
import Logo from '@/components/ui/Logo';

export default function Footer() {
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
      </div>
      <span aria-hidden="true">•</span>
      <nav className="ml-6" aria-label="Footer navigation">
        <NavLinks variant="footer" />
      </nav>
    </footer>
  );
}
