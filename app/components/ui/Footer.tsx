import Nav from '@/components/ui/Navigation';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="flex flex-row py-8 text-left text-sm text-gray-400">
      <div className="mr-6 flex flex-row items-center text-gray-400">
        <span className="mr-4">&copy;{new Date().getFullYear()}</span>
        <Logo size={20} /> <span className="ml-4">Amir Ardalan</span>
      </div>
      <span className="text-gray-300 dark:text-gray-600">•</span>
      <div className="ml-6">
        <Nav />
      </div>
    </footer>
  );
}
