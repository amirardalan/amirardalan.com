import { FC, useState, useEffect, memo } from 'react';
import { css } from '@emotion/react';
import Tooltip from '@/components/Tooltip';

type ThemeToggleProps = {
  toggleTheme: () => void;
};

console.log(`
 █████  ███    ███ ██ ██████  
██   ██ ████  ████ ██ ██   ██ 
███████ ██ ████ ██ ██ ██████  
██   ██ ██  ██  ██ ██ ██   ██ 
██   ██ ██      ██ ██ ██   ██ 
<--------------------------->
Design & Code by Amir Ardalan
`);

const ThemeToggle: FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const [activeTheme, setActiveTheme] = useState(
    document.body.dataset.theme ?? 'light'
  );
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';
  const [toggleThemeControl, setToggleThemeControl] = useState<boolean>(false);

  const themeToggled = () => {
    setActiveTheme(inactiveTheme);
    setToggleThemeControl(!toggleThemeControl);
    toggleTheme();
  };
  useEffect(() => {
    if (activeTheme !== null) {
      document.documentElement.dataset.theme = activeTheme;
      window.localStorage.setItem('theme', activeTheme);
    }
  }, [activeTheme]);

  const styleToggleTrack = css({
    zIndex: 3,
    width: 34,
    height: 20,
    background: 'var(--color-heading)',
    position: 'relative',
    border: 'none',
    borderRadius: 20,
    cursor: 'pointer',
  });
  const styleToggleSlider = css({
    background: 'var(--color-accent)',
    height: 16,
    width: 16,
    position: 'relative',
    marginLeft: activeTheme === 'dark' ? 2 : 16,
    marginRight: activeTheme === 'light' ? 16 : 0,
    borderRadius: 25,
    transition: '.2s linear',
    '&:active': {
      boxShadow: '0 0 8px var(--color-primary)',
    },
  });

  return (
    <Tooltip pos="b" text={`${inactiveTheme} mode`}>
      <button
        aria-label={`Change to ${inactiveTheme} mode`}
        type="button"
        onClick={themeToggled}
        css={styleToggleTrack}
      >
        <div css={styleToggleSlider} />
      </button>
    </Tooltip>
  );
};

export default memo(ThemeToggle);
