import { FC } from 'react';
import { css } from '@emotion/react';

type BlogLayoutProps = {
  children: React.ReactNode;
};

const blogStyles = css({
  maxWidth: 768,
  margin: '0 auto',
  '.blog': {
    '&.admin.create, &.admin.edit': {
      maxWidth: '100%',
      padding: '0 4rem',
      '@media (max-width: 1024px)': {
        padding: '0 2.5rem',
      },
      '@media (max-width: 768px)': {
        padding: '0 2.5rem',
      },
      '@media (max-width: 600px)': {
        padding: '0 2rem',
      },
    },
  },
  '.post': {
    '.publishedPost': {
      display: 'block',
      marginBottom: '4.5rem',
      h2: {
        fontSize: 28,
      },
      '@media (max-width: 768px)': {
        marginBottom: '4rem',
        h2: {
          fontSize: 20,
        },
      },
    },
  },
  '.readTime': {
    whiteSpace: 'nowrap',
    '&::before': {
      color: 'var(--color-gray)',
      content: '"•"',
      margin: '0 0.5rem',
    },
  },
  '.postDetails': {
    marginBottom: '.25rem',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--color-gray)',
    fontSize: 13,
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '@media(max-width: 480px)': {
      flexDirection: 'column',
    },
    '.blogListDetails': {
      height: 22,
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      margin: 0,
      padding: 0,
    },
  },
  li: {
    '&::marker': {
      color: 'var(--color-gray)',
    },
  },
  table: {
    width: '100%',
    thead: {
      fontFamily: 'var(--font-secondary)',
      'tr th': {
        border: '1px solid var(--color-accent-gray)',
        backgroundColor: 'var(--color-accent)',
        padding: '.5rem',
      },
    },
    tbody: {
      'tr td': {
        border: '1px solid var(--color-accent-gray)',
        padding: '.5rem',
      },
    },
  },
  'input[type="text"], textarea': {
    width: '100%',
    margin: '0.5rem 0',
    padding: '0.5rem',
    webkitAppearance: 'none',
    color: 'var(--color-gray) !important',
    appearance: 'none',
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-accent-lighter)',
    outline: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    fontFamily: 'var(--font-primary)',
    fontSize: 15,
    caretColor: 'var(--color-text)',
    '&:focus': {
      border: '1px solid var(--color-gray)',
    },
    '&:disabled': {
      backgroundColor: 'var(--color-bg)',
      WebkitTextFillColor: 'var(--color-accent-gray)',
    },
    '@media (max-width: 890px)': {
      width: '100%',
      margin: '0.5rem 0 0 0',
    },
    '@media (max-width: 480px)': {
      fontSize: 13,
    },
  },
  'input::placeholder, textarea::placeholder': {
    color: 'var(--color-gray)',
    opacity: '0.5',
  },
  '.deleteControls': {
    display: 'flex',
    alignItems: 'baseline',
  },
});

const BlogLayout: FC<BlogLayoutProps> = ({ children }) => {
  return <div css={blogStyles}>{children}</div>;
};

export default BlogLayout;
