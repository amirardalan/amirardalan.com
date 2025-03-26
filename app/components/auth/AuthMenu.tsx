import { auth } from '@/auth';
import Button from '@/components/ui/Button';

export default async function AuthMenu() {
  const session = await auth();

  return (
    <>
      {session?.user && (
        <div className="flex flex-row space-x-2 pl-8 text-left text-sm text-dark dark:text-light">
          <Button
            type="button"
            url={'/admin'}
            text="Admin"
            variant="primary"
            size="default"
          />
        </div>
      )}
    </>
  );
}
