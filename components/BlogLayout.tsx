import { css } from '@emotion/react'


const styleBlogLayout = css({
  '.breadcrumbs': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'var(--color-gray)',
    fontSize: 13,
    '&::before': {
      paddingRight: '.5rem',
      display: 'flex',
      content: '"📋"',
      color: 'var(--color-link)',
      fontSize: 20,
    },
    a: {
      textDecoration: 'none',
      '&::after': {
        content: '"/"',
        margin: '0 .5rem',
        color: 'var(--color-gray)',
      }
    },
    '@media (max-width: 480px)': {
      span: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }
    }
  },
  '.blog': {
    maxWidth: 768,
    margin: '0 auto',
    'h2, h3, h4': {
      fontFamily: 'var(font-secondary)',
    },
    '.blogHeading': {
      display: 'flex',
      color: 'var(--color-gray)',
      fontFamily: 'var(--font-primary)',
      fontSize: 13,
      fontWeight: 'normal',
      textDecoration: 'none',
      '&::before': {
        paddingRight: '.5rem',
        display: 'flex',
        content: '"📋"',
        color: 'var(--color-link)',
        fontSize: 20,
      },
    },
    h2: {
      margin: 0,
      display: 'inline-block',
      lineHeight: '2.5rem',
      fontSize: 38,
      fontWeight: 900,
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
      marginBottom: '3.5rem',
      p: {
        color: 'var(--color-gray) !important',
      },
      '@media(max-width: 480px)': {
        marginBottom: '2.5rem'
      }
    },
    '&.admin': {
      '.breadcrumbs': {
        marginTop: '1rem',
      },
      '.drafts': {
        marginTop: '1rem',
      },
      form: {
        marginTop: '1rem'
      },
    }
  },
  '.post': {
    marginTop: '2rem',
  },
  '.postDetails': {
    display: 'flex',
    flexDirection: 'row',
    color: 'var(--color-gray)',
    fontSize: 13,
    lineHeight: '1.2rem',
    '.author, .authorLink': {
      marginBottom: 0,
      fontFamily: 'var(--font-primary)',
      color: 'var(--color-gray)',
      fontSize: 13,
      display: 'flex',
      alignItems: 'center',
    },
    '.avatar': {
      display: 'flex',
      marginRight: '.4rem',
      paddingBottom: '.1rem',
      alignSelf: 'center',
    },
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
    },
    '@media (max-width: 480px)': {
      fontSize: 12,
    },
    '.postDate': {
      display: 'flex',
      alignItems: 'center',
      '@media (min-width: 1025px)': {
        '&::before': {
          margin: '0 .5rem 0 .5rem',
          content: '" •"'
        }
      },
    },
  },
  '.postImg': {
    paddingBottom: '2rem !important',
  },
  '.controlsPost': {
    margin: '2rem 0',
  },
  '.formSubmit': {
    marginTop: '1rem',
  },
  '.controlsConfirm': {
    margin: '1rem 0 0 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 'lighter',
    textTransform: 'uppercase',
    '.confirmLink': {
      marginRight: '.5rem',
      color: 'var(--color-text)',
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      cursor: 'pointer',
      '&.delete': {
        color: 'var(--color-warning)'
      },
      '&.close': {
        marginLeft: '.5rem',
      },
      '&.delete:hover, &.close:hover': {
        textDecoration: 'underline',
      }
    }
  },
  '.postDraft': {
    margin: '1rem 0 .5rem',
    padding: '1.8rem',
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid var(--color-accent)',
    '&::after': {
      content: '"Draft"',
      alignSelf: 'right',
      color: 'var(--color-gray)',
      fontSize: 12,
      fontStyle: 'italic',
    },
    p: {
      marginBottom: 0,
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
      '&::after': { content: '" "' },
      h2: {
        lineHeight: '2.1rem',
        fontSize: 20,
      }
    },
    '.postTeaser': {
      margin: '0 .5rem',
    }
  },
  '.postTeaser': {
    position: 'relative',
    h2: {
      marginBottom: '.4rem',
      fontSize: 30,
      lineHeight: '2rem',
      textDecoration: 'none',
      a: {
        color: 'var(--color-text)',
        textDecoration: 'none',
        border: 'none'
      },
    },
    '&:hover': {
      '&::before': {
        content: '"|"',
        position: 'absolute',
        fontFamily: 'var(--font-secondary)',
        fontWeight: 900,
        fontSize: 30,
        lineHeight: '2rem',
        left: -20,
        color: 'var(--color-accent-color)'
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
    WebkitTextFillColor: 'var(--color-gray)',
    fontSize: 16,
    '&:disabled': {
      backgroundColor: 'var(--color-input-disabled)',
      WebkitTextFillColor: 'var(--color-accent-gray)',
    },
    '@media (max-width: 890px)': {
      width: '100%'
    }
  },
  '.searchPosts': {
    display: 'flex',
    position: 'relative',
    marginTop: '.5rem',
    '.icon': {
      position: 'absolute',
      top: 16,
      right: 0,
      background: 'var(--color-accent)',
      width: 35,
    }
  },
  '.postFull': {
    '.postDetails': {
      marginBottom: '3rem',
    },
    h2: {
      margin: '0 0 .8rem',
      textDecoration: 'none',
      cursor: 'default',
      '@media(max-width: 1024px)': {
        margin: '0 0 .5rem',
        fontSize: 30,
      }
    },
    '.teaser': {
      marginBottom: '2.5rem',
      fontFamily: 'var(--font-tertiary)',
      fontStyle: 'italic',
      fontSize: 20,
      color: 'var(--color-gray)',
      lineHeight: '1.5rem',
      '@media (max-width: 1024px)': {
        fontSize: 15,
      }
    },
    'h3, h3 code': {
      fontSize: 28,
      '@media(max-width: 480px)': {
        fontSize: 'calc(2.2vw + 2.2vh)',
        WebkitMarqueeIncrement: '0vw',
      }
    },
    h3: {
      scrollMarginTop: '4rem',
      margin: '2rem 0',
      padding: 0,
      display: 'inline-block',
      fontWeight: 'bold',
      lineHeight: '2.4rem',
      '& code': {
        fontFamily: 'var(--font-secondary)',
      },
      a: {
        position: 'absolute',
        display: 'block',
        height: '100%',
        width: '100%',
        '&:hover': {
          '&::before': {
            content: '"#"',
            color: 'var(--color-accent-gray)',
            position: 'absolute',
            textAlign: 'center',
            top: 4,
            left: -22,
            fontSize: 25
          }
        },
      },
      '@media(hover: none)': {
        a: { display: 'none' }
      },
    },
    'h1, h2, h3, h3, h4, h5, h6': {
      position: 'relative',
    },
    p: {
      marginBottom: '1rem',
    },
    'p, ul, li, a': {
      fontFamily: 'var(--font-tertiary)',
      fontSize: 18,
      lineHeight: '1.8rem',
    },
    'ul, li, a': { 
      marginBottom: '1rem'
    },
    a: {
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none'
      },
    },
    blockquote: {
      margin: '2rem 0',
      padding: '1rem',
      border: '1px solid var(--color-accent-gray)',
      borderRadius: '5px',
      color: 'var(--color-gray)',
      p: {
        marginBottom: 0,
        fontStyle: 'italic'
      }
    },
    'ul li': {
      listStyle: 'outside',
      marginLeft: '2rem',
      paddingLeft: '.5rem',
      '&.task-list-item': {
        fontFamily: 'var(--font-primary)',
        fontSize: 15,
        fontWeight: 'bold',
      },
      'input[type="checkbox"]': {
        marginTop: '-.1rem',
      },
      '@media (max-width: 480px)': {
        marginLeft: '1.5rem',
      }
    },
    'ul.contains-task-list': {
      li: {
        '&:first-of-type':{
          fontFamily: 'var(font-secondary)',
        },
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
    },
    ol: {
      counterReset: 'counter',
      margin: '2rem 0',
      li: {
        counterIncrement: 'counter',
        marginLeft: '2rem',
        paddingLeft: '.5rem',
        position: 'relative',
        '&::before': {
          content: "counter(counter)",
          width: '1.5rem',
          height: '1.5rem',
          position: 'absolute',
          top: '.2rem',
          left: '-2rem',
          background: 'var(--color-accent-color)',
          borderRadius: '50%',
          color: 'var(--color-bg)',
          fontFamily: 'var(--font-primary)',
          fontSize: '1rem',
          fontWeight: 'bold',
          lineHeight: '1.5rem',
          textAlign: 'center',
          '@media not all and (min-resolution:.001dpcm)': { 
            '@supports (-webkit-appearance:none)': {
              paddingLeft: '.1rem',
            }
          }
        }
      }
    }
  },
  li: {
    '&::marker': {
      color: 'var(--color-accent-color)',
    },
  },
  table: {
    width: '100%',
    thead: {
      fontFamily: 'var(--font-secondary)',
      tr: {
        th: {
          border: '1px solid var(--color-accent-gray)',
          backgroundColor: 'var(--color-accent)',
          padding: '.5rem',
        }
      }
    },
    tbody: {
      tr: {
        td: {
          border: '1px solid var(--color-accent-gray)',
          padding: '.5rem',
        }
      }
    }
  },
})

const BlogLayout = (props) => {

  return (
    <div css={styleBlogLayout}>
      {props.children}
    </div>
  )
}

export default BlogLayout
