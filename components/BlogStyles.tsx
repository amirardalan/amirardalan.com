import { css } from '@emotion/react'


const blogStyles = css({
  '.blog': {
    maxWidth: 768,
    margin: '0 auto',
    '.category': {
      marginBottom: '.5rem',
      fontFamily: 'var(--font-primary)',
      fontSize: 12,
      textTransform: 'uppercase',
      color: 'var(--color-primary)',
      textDecoration: 'none',
      '&.active': {
        borderBottom: '2px solid var(--color-primary)'
      },
      '&:before': {
        content: '"#"'
      },
      '&.all:before': {
        content: '""'
      },
      '&.full': {
        color: 'var(--color-neutral)'
      }
    },
    '.blogListHeading': {
      marginBottom: '.5rem',
      fontFamily: 'var(--font-secondary)',
      fontSize: 30,
      fontWeight: 900,
      lineHeight: '2.2rem',
      a: {
        color: 'var(--color-text)',
        textDecoration: 'none',
      },
      '@media(max-width: 1024px)': {
        fontSize: 24,
        lineHeight: '1.8rem',
      }
    },
    '.blogHeading': {
      fontFamily: 'var(--font-secondary)',
      fontSize: 40,
      fontWeight: 900,
      textDecoration: 'none',
      '@media(max-width: 1024px)': {
        fontSize: 30,
      }
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
      '&:hover': { textDecoration: 'none' }
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
          margin: '.5rem 0 1.5rem',
        }
      }
    },
    '&.admin.create, &.admin.edit': {
      maxWidth: '100%',
    }
  },
  '.post': {
    marginTop: '2rem',
    '.publishedPost' : {
      display: 'block',
      marginBottom: '1rem',
    }
  },
  '.postDetails': {
    display: 'flex',
    flexDirection: 'row',
    color: 'var(--color-neutral)',
    fontSize: 13,
    lineHeight: '1.2rem',
    'time': {
      '&:after': {
        margin: '0 .5rem',
        content: '"•"'
      }
    }
  },
  '.postTeaser': {
    position: 'relative',
    color: 'var(--color-neutral)',
    h2: {
      marginBottom: '.4rem',
      fontSize: 32,
      lineHeight: '2.2rem',
      textDecoration: 'none',
      a: {
        color: 'var(--color-text)',
        textDecoration: 'none',
        border: 'none'
      },
      '@media (max-width: 768px)': {
        fontSize: 28,
      }
    },
    '&:hover': {
      '&::before': {
        content: '"|"',
        position: 'absolute',
        fontFamily: 'var(--font-secondary)',
        fontWeight: 900,
        fontSize: 32,
        lineHeight: '2.2rem',
        left: -20,
        color: 'var(--color-primary)',
        '@media (max-width: 768px)': {
          fontSize: 28,
        }
      }
    }
  },
  li: {
    '&::marker': {
      color: 'var(--color-primary)',
    }
  },
  table: {
    width: '100%',
    thead: {
      fontFamily: 'var(--font-secondary)',
      'tr th': {
        border: '1px solid var(--color-accent-neutral)',
        backgroundColor: 'var(--color-accent)',
        padding: '.5rem',
      }
    },
    tbody: {
      'tr td': {
        border: '1px solid var(--color-accent-neutral)',
        padding: '.5rem',
      }
    }
  },
  'input[type="text"], textarea': {
    width: '100%',
    margin: '0.5rem 0',
    padding: '0.5rem',
    webkitAppearance: 'none',
    appearance: 'none',
    backgroundColor: 'var(--color-accent)',
    border: '2px solid var(--color-accent)',
    borderRadius: '0.25rem',
    WebkitTextFillColor: 'var(--color-neutral)',
    fontSize: 16,
    '&:disabled': {
      backgroundColor: 'var(--color-bg)',
      WebkitTextFillColor: 'var(--color-accent-neutral)',
    },
    '@media (max-width: 890px)': {
      width: '100%'
    }
  },
})

type Props = {
  children: React.ReactNode
}

const BlogLayout = (props: Props) => {

  return (
    <div css={blogStyles}>
      {props.children}
    </div>
  )
}

export default BlogLayout
