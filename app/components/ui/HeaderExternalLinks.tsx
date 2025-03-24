'use client';

import GitHubIcon from '@/components/icons/IconGithub';
import Tooltip from '@/components/ui/Tooltip';

export default function HeaderExternalLinks() {
  const handleClick = () => {
    window.open(
      'https://github.com/amirardalan/site',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="mr-4 mt-1">
      <Tooltip text="⭐ Star on GitHub" pos="l">
        <button onClick={handleClick}>
          <GitHubIcon />
        </button>
      </Tooltip>
    </div>
  );
}
