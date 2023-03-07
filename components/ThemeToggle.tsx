import { type FC, useState, useEffect } from 'react';
import { css } from '@emotion/react';

type ThemeToggleProps = {
  toggleTheme: Function;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';
  const [toggleThemeControl, setToggleThemeControl] = useState(false);

  const themeToggled = () => {
    setActiveTheme(inactiveTheme);
    setToggleThemeControl(!toggleThemeControl);
    toggleTheme();
  };
  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  const styleToggleTrack = css({
    width: 42,
    height: 26,
    background: 'var(--color-heading)',
    position: 'relative',
    border: 'none',
    borderRadius: 20,
    cursor: 'pointer',
  });
  const styleToggleSlider = css({
    background: 'var(--color-accent)',
    height: 22,
    width: 22,
    position: 'relative',
    marginLeft: activeTheme === 'dark' ? 2 : 18,
    marginRight: activeTheme === 'light' ? 21 : 1,
    borderRadius: 25,
    transition: '.2s linear',
    '&:active': {
      boxShadow: '0 0 8px var(--color-primary)',
    },
  });

  return (
    <button
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={themeToggled}
      css={styleToggleTrack}
    >
      <div css={styleToggleSlider} />
    </button>
  );
};

export default ThemeToggle;
