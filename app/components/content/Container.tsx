export default function Container({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // This component is used to wrap the main content of a page
  // It is currently used on every page other than the homepage
  return (
    <main className="container mx-auto max-w-[768px] flex-grow overflow-auto overflow-x-hidden px-4 py-8">
      {children}
    </main>
  );
}
