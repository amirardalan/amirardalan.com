interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  // This component is used to wrap the main content of a page
  // It is currently used on every page other than the homepage
  return (
    <main className="container mx-auto max-w-[736px] flex-grow p-6 lg:p-8">
      {children}
    </main>
  );
}
