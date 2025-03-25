import Nav from '@/components/ui/Navigation';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="flex flex-row py-6 text-left text-sm lg:py-8">
      <div className="dark:zinc-500 mr-6 flex flex-row items-center text-zinc-400">
        <span className="mr-4">&copy;{new Date().getFullYear()}</span>
        <Logo size={20} /> <span className="ml-4">Amir Ardalan</span>
      </div>
      <span className="dark:zinc-500 text-zinc-400">•</span>
      <div className="ml-6">
        <Nav />
      </div>
    </footer>
  );
}
