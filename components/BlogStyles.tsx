import { FC } from 'react';
import { css } from '@emotion/react';

type BlogLayoutProps = {
  children: React.ReactNode;
};

const blogStyles = css({
  '.blog': {
    maxWidth: 768,
    margin: '0 auto',
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
      marginBottom: '.5rem',
      fontFamily: 'var(--font-secondary)',
      fontSize: 30,
      fontWeight: 800,
      lineHeight: '2.2rem',
      a: {
        color: 'var(--color-heading)',
        textDecoration: 'none',
      },
      '@media(max-width: 1024px)': {
        fontSize: 24,
        lineHeight: '1.8rem',
      },
    },
    '.blogHeading': {
      fontFamily: 'var(--font-secondary)',
      fontSize: 40,
      fontWeight: 800,
      textDecoration: 'none',
      '@media(max-width: 1024px)': {
        fontSize: 30,
      },
    },
    'h1, h2': {
      display: 'inline-block',
      fontSize: 40,
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
        margin: '.5rem 0 2.5rem',
        lineHeight: '1.4rem',
        '@media(max-width: 768px)': {
          fontSize: 15,
          margin: '.5rem 0 1.8rem',
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
      marginBottom: '1rem',
    },
  },
  '.postDetails': {
    display: 'flex',
    flexDirection: 'row',
    color: 'var(--color-gray)',
    fontSize: 13,
    lineHeight: '1.2rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
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
        fontWeight: 800,
        fontSize: 24,
        lineHeight: '2rem',
        left: -20,
        color: 'var(--color-primary)',
        '@media (max-width: 1024px)': {
          top: -2,
          left: -15,
          fontSize: 18,
        },
      },
    },
  },
  '.dateAndReadTime': {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '.05rem',
    '@media(max-width: 480px)': {
      flexDirection: 'column',
    },
    '@media(max-width: 350px)': {
      'time:after': {
        content: '""',
      },
    },
  },
  '.timeAndLikes': {
    display: 'flex',
    alignItems: 'flex-end',
    '@media (max-width: 480px)': {
      flexDirection: 'row',
    },
  },
  '.readTime': {
    margin: '0 0 0 1rem',
    maxWidth: 'min-content',
    whiteSpace: 'nowrap',
    padding: '.15rem .5rem .08rem .5rem',
    lineHeight: '.8rem',
    border: '1px solid var(--color-gray)',
    color: 'var(--color-gray)',
    backgroundColor: 'transparent',
    borderRadius: 10,
    textTransform: 'uppercase',
    fontSize: 11,
    '@media (max-width: 480px)': {
      margin: '.65rem 0 0 0',
    },
  },
  '.likeCount': {
    marginLeft: '.5rem',
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
    color: 'var(--color-gray)',
    appearance: 'none',
    backgroundColor: 'var(--color-accent)',
    border: '2px solid var(--color-accent)',
    borderRadius: '0.25rem',
    fontSize: 16,
    '&:disabled': {
      backgroundColor: 'var(--color-bg)',
      WebkitTextFillColor: 'var(--color-accent-gray)',
    },
    '@media (max-width: 890px)': {
      width: '100%',
      margin: '0.5rem 0 0 0',
    },
  },
  'input::placeholder': {
    color: 'var(--color-gray)',
    opacity: '0.5',
  },
});

const BlogLayout: FC<BlogLayoutProps> = ({ children }) => {
  return <div css={blogStyles}>{children}</div>;
};

export default BlogLayout;
