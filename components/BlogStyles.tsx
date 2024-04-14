import { FC } from 'react';
import { css } from '@emotion/react';

type BlogLayoutProps = {
  children: React.ReactNode;
};

const blogStyles = css({
  '.blog': {
    maxWidth: 768,
    margin: '0 auto',
    '.search': {
      fontFamily: 'var(--font-secondary)',
      color: 'var(--color-text)',
      background: 'transparent',
      border: '1px solid var(--color-accent-lighter)',
      padding: '.6rem',
      fontSize: 16,
      outline: 'none',
      '&::placeholder': {
        color: 'var(--color-gray) !important',
        fontFamily: 'var(--font-secondary)',
      },
      '&:focus': {
        border: '1px solid var(--color-primary)',
        outline: 'none',
        borderColor: 'var(--color-primary)',
        boxShadow: '2px solid var(--color-primary)',
      },
    },
    '.categoryWrapper': {
      display: 'flex',
      flexDirection: 'row',
    },
    '.category': {
      marginBottom: '.5rem',
      fontFamily: 'var(--font-primary)',
      fontSize: 12,
      textTransform: 'uppercase',
      color: 'var(--color-primary)',
      textDecoration: 'none',
      '&.featured': {
        marginRight: '1rem',
      },
      '&.active': {
        borderBottom: '2px solid var(--color-primary)',
      },
      '&:before': {
        content: '"#"',
      },
      '&.all, &.featured': {
        '&:before': { content: '""' },
      },
    },
    '.blogListHeading': {
      margin: '0 0 .4rem',
      fontFamily: 'var(--font-secondary)',
      fontSize: 30,
      fontWeight: 700,
      lineHeight: '2.2rem',
      a: {
        color: 'var(--color-heading)',
        textDecoration: 'none',
      },
      '@media(max-width: 1024px)': {
        marginBottom: 0,
        fontSize: 24,
        lineHeight: '1.8rem',
      },
    },
    '.postFull h1, h2': {
      display: 'inline-block',
      fontSize: 40,
      '@media(max-width: 1024px)': {
        fontSize: 32,
      },
    },
    h2: {
      margin: 0,
      lineHeight: '2.5rem',
      cursor: 'pointer',
      '&:hover': { textDecoration: 'none' },
    },
    p: {
      marginBottom: '2rem',
      fontFamily: 'var(--font-tertiary)',
      fontSize: 18,
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&.postTeaser': {
      p: {
        margin: '0 0 1rem',
        lineHeight: '1.2rem',
        color: 'var(--color-gray)',
        fontStyle: 'italic',
        '@media(max-width: 1024px)': {
          margin: '.4rem 0 0',
        },
        '@media(max-width: 768px)': {
          fontSize: 15,
        },
      },
    },
    '&.admin.create, &.admin.edit': {
      maxWidth: '100%',
    },
  },
  '.post': {
    marginTop: '2rem',
    '.publishedPost': {
      display: 'block',
      marginBottom: '2.75rem',
    },
  },
  '.readTime': {
    whiteSpace: 'nowrap',
  },
  '.postDetails': {
    marginBottom: '.25rem',
    display: 'flex',
    flexDirection: 'column',
    '.info': {
      marginBottom: '.5rem',
      fontSize: 14,
      textTransform: 'uppercase',
      width: '100%',
      borderBottom: '1px solid var(--color-accent-lighter)',
      display: 'flex',
      flexDirection: 'row',
      '.authorAndDate': {
        marginBottom: '.5rem',
      },
      a: {
        margin: 0,
        paddingLeft: '.25rem',
        fontFamily: 'var(--font-primary)',
        fontSize: 14,
      },
      time: {
        fontFamily: 'var(--font-primary)',
        fontSize: 14,
        '&:before': {
          margin: '0 0.5rem',
          content: '"•"',
        },
      },
      '@media(max-width: 480px)': {
        fontSize: 13,
        a: {
          fontSize: 13,
        },
        time: {
          fontSize: 12,
          '&:before': {
            margin: '0 0.25rem',
            content: '"•"',
          },
        },
      },
    },
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
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      margin: 0,
      padding: 0,
    },
  },
  '.postTeaser': {
    position: 'relative',
    h2: {
      marginBottom: '.4rem',
      color: 'var(--color-heading)',
      fontSize: 32,
      lineHeight: '2.2rem',
      textDecoration: 'none',
      a: {
        color: 'var(--color-heading)',
        textDecoration: 'none',
        border: 'none',
      },
      '@media (max-width: 768px)': {
        fontSize: 28,
      },
    },
    '&:hover': {
      '&::before': {
        content: '"|"',
        position: 'absolute',
        fontFamily: 'var(--font-secondary)',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '1.2rem',
        top: 25,
        left: -18,
        color: 'var(--color-primary)',
        '@media (max-width: 1024px)': {
          display: 'none',
        },
      },
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
    borderRadius: '0.25rem',
    fontFamily: 'var(--font-primary)',
    fontSize: 15,
    caretColor: 'var(--color-text)',
    '&:focus': {
      border: '1px solid var(--color-gray)',
    },
    '&:placeholder:disabled': 'red !important',
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
