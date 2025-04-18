interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  // Wrapper for all pages other than: home, admin, not-found
  return (
    <main className="container mx-auto max-h-fit max-w-[736px] flex-grow p-6 lg:p-8">
      {children}
    </main>
  );
}
