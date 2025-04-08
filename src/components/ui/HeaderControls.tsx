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
      className="mt-2 flex items-center space-x-6 pr-20 md:pr-0"
      role="group"
      aria-label="External links and site controls"
    >
      <Tooltip text="Star on GitHub" pos="b">
        <button onClick={handleClick} aria-label="Visit GitHub repository">
          <IconGithub />
        </button>
      </Tooltip>
      <ThemeMenu />
    </div>
  );
}
