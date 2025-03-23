import { signIn } from '@/auth';
import Button from '@/components/ui/Button';

export default function SignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <Button type="submit" text="Sign In" />
    </form>
  );
}
