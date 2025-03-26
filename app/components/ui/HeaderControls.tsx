'use client';

import GitHubIcon from '@/components/icons/IconGithub';
import Tooltip from '@/components/ui/Tooltip';
import ThemeMenu from '@/components/theme/ThemeMenu';

export default function HeaderExternalLinks() {
  const handleClick = () => {
    window.open(
      'https://github.com/amirardalan/site',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="mt-1.5 flex items-center space-x-6">
      <Tooltip text="Star on GitHub" pos="b">
        <button onClick={handleClick}>
          <GitHubIcon />
        </button>
      </Tooltip>
      <ThemeMenu />
    </div>
  );
}
