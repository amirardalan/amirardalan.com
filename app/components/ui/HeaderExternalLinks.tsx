'use client';

import GitHubIcon from '@/components/icons/IconGithub';
import Tooltip from '@/components/util/Tooltip';
import { useTheme } from '@/app/store/theme';

export default function HeaderExternalLinks() {
  const { effectiveTheme } = useTheme();
  const fill =
    effectiveTheme === 'dark' ? 'var(--color-light)' : 'var(--color-dark)';

  const handleClick = () => {
    window.open(
      'https://github.com/amirardalan/site',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="mr-4 mt-1">
      <Tooltip text="⭐ Star on GitHub" pos="b">
        <button onClick={handleClick}>
          <GitHubIcon fill={fill} />
        </button>
      </Tooltip>
    </div>
  );
}
