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
      background: 'none',
      border: '1px solid var(--color-accent-gray)',
      padding: '.6rem',
      fontSize: 16,
      '&:focus': {
        outline: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
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
      margin: '.4rem 0 .8rem',
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
    '.blogHeading': {
      fontFamily: 'var(--font-secondary)',
      fontSize: 40,
      fontWeight: 700,
      textDecoration: 'none',
      '@media(max-width: 1024px)': {
        fontSize: 30,
      },
    },
    'h1, h2': {
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
      textDecoration: 'underline',
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
        fontStyle: 'italic',
        lineHeight: '1.2rem',
        color: 'var(--color-gray)',
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
    display: 'flex',
    alignItems: 'center',
    maxWidth: 'min-content',
    whiteSpace: 'nowrap',
    margin: '0 0 0 .5rem',
    padding: '0 .5rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-accent-gray)',
    borderRadius: 10,
    fontSize: 11,
    '@media(max-width: 480px)': {
      flexDirection: 'column',
      margin: '.5rem 0 0 0',
    },
  },
  '.postDetails': {
    marginBottom: '.25rem',
    display: 'flex',
    flexDirection: 'column',
    '.info': {
      fontSize: 14,
      width: '100%',
      borderBottom: '1px solid var(--color-accent-gray)',
      fontFamily: 'var(--font-secondary)',
      display: 'flex',
      flexDirection: 'row',
      a: {
        paddingLeft: '.25rem',
        fontFamily: 'var(--font-secondary)',
        fontSize: 14,
      },
      time: {
        fontFamily: 'var(--font-primary)',
        '&:before': {
          margin: '0 0.5rem',
          content: '"•"',
        },
      },
    },
    color: 'var(--color-gray)',
    fontSize: 13,
    lineHeight: '1.2rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '@media(max-width: 480px)': {
      flexDirection: 'column',
    },
    '.postStats': {
      position: 'relative',
      paddingTop: '.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: '1.5rem',
      '.likesAndViews': {
        marginTop: '.5rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
      },
      '.readTime': {
        backgroundColor: 'var(--color-bg)',
        maxHeight: 'fit-content',
        '@media (min-width: 601px)': {
          position: 'absolute',
          right: 0,
          top: -11,
        },
        '@media (max-width: 600px)': {
          margin: '.5rem 0 0 0',
        },
      },
      '@media(max-width: 600px)': {
        flexDirection: 'column',
      },
    },
    '.blogListDetails': {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      time: {
        marginRight: '.5rem',
      },
      '.likes': {
        margin: '0 0.5rem',
        position: 'relative',
        opacity: 1,
        transition: 'none',
        transform: 'none',
      },
      '.divider2': {
        display: 'none',
      },
      '.readTime': {
        margin: '0 0 0 0.8rem',
        maxHeight: 19,
        lineHeight: '.8rem',
        '@media (max-width: 768px)': {
          lineHeight: '1.1rem',
          fontSize: 10,
        },
      },
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
        lineHeight: '1.9rem',
        top: 30.5,
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
      color: 'var(--color-primary)',
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
    border: '1px solid var(--color-accent-gray)',
    borderRadius: '0.25rem',
    fontFamily: 'var(--font-primary)',
    fontSize: 15,
    '&:focus': {
      border: '1px solid var(--color-accent-gray)',
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
