'use client';

import { useState } from 'react';
import IconHide from '@/components/icons/IconHide';
import IconShow from '@/components/icons/IconShow';

interface ObfuscatedEmailProps {
  email: string;
}

export function ObfuscatedEmail({ email }: ObfuscatedEmailProps) {
  const [revealed, setRevealed] = useState(false);

  const obfuscateEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;

    const hiddenUsername =
      username.length > 1
        ? `${username.slice(0, 1)}${'*'.repeat(username.length - 1)}`
        : username;

    const [domainName, extension] = domain.split('.');
    if (!domainName || !extension) return `${hiddenUsername}@${domain}`;

    const hiddenDomain = `${domainName.slice(0, 1)}${'*'.repeat(domainName.length - 1)}.${extension}`;

    return `${hiddenUsername}@${hiddenDomain}`;
  };

  const toggleReveal = () => {
    setRevealed((prev) => !prev);
  };

  return (
    <div
      className="flex flex-row items-center px-2 py-1"
      onClick={toggleReveal}
    >
      <span className="mr-2">{revealed ? <IconHide /> : <IconShow />}</span>
      <p
        className="cursor-pointer text-dark transition-all duration-200 hover:underline dark:text-light"
        title={revealed ? 'Click to hide email' : 'Click to show full email'}
      >
        {revealed ? email : obfuscateEmail(email)}
      </p>
    </div>
  );
}
