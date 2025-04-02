'use client';

import IconGithub from '@/components/icons/IconGithub';
import Tooltip from '@/components/ui/Tooltip';
import ThemeMenu from '@/components/ui/ThemeMenu';

export default function HeaderExternalLinks() {
  const handleClick = () => {
    window.open(
      'https://github.com/amirardalan/site',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      className="mt-1.5 flex items-center space-x-6"
      role="group"
      aria-label="External links and site controls"
    >
      <Tooltip text="Star on GitHub" pos="b">
        <button
          onClick={handleClick}
          aria-label="Visit GitHub repository"
          className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <IconGithub />
        </button>
      </Tooltip>
      <ThemeMenu />
    </div>
  );
}
