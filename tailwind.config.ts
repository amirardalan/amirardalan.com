import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui'],
      serif: ['Prata', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    extend: {
      colors: {
        light: 'var(--color-light)',
        dark: 'var(--color-dark)',
        primary: 'var(--color-primary)',
      },
      fontSize: {
        xs: '.85rem',
        xxs: '.675rem',
        xxl: '1.7rem',
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};

export default config;
