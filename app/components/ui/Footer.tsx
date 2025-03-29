import Nav from '@/components/ui/Navigation';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="flex flex-row bg-primary px-6 py-6 pt-4 text-sm text-light lg:px-10 lg:py-8 lg:pt-8 dark:text-dark">
      <div className="mr-6 flex flex-row items-center">
        <span className="mr-4">&copy;{new Date().getFullYear()}</span>
        <Logo size={20} inverted /> <span className="ml-4">Amir Ardalan</span>
      </div>
      <span>•</span>
      <div className="ml-6">
        <Nav />
      </div>
    </footer>
  );
}
