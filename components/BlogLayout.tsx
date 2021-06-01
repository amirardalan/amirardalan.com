import { Global, css, useTheme } from '@emotion/react'

export default function BlogLayout(props) {

  const theme : any = useTheme()

  return (
    <>
      <Global
        styles={{
          '.breadcrumbs': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: theme.colors.grayscale,
            fontSize: 13,
            '&::before': {
              paddingRight: '.5rem',
              display: 'flex',
              content: '"📋"',
              color: theme.colors.link,
              fontSize: 20,
            },
            a: {
              textDecoration: 'none',
              '&::after': {
                content: '"/"',
                margin: '0 .5rem',
                color: theme.colors.grayscale,
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
            
            '@media (max-width: 480px)': {
              margin: '0 1%',
            },
            'h2, h3, h4': {
              fontFamily: theme.fonts.secondary,
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
              fontFamily: theme.fonts.tertiary,
              fontSize: 18,
            },
            main: {
              display: 'flex',
              flexDirection: 'column',
            }
          },
          '.post': {
            marginTop: '3rem',
          },
          '.postDetails': {
            margin: '.6rem 0 .2rem',
            color: theme.colors.grayscale,
            fontSize: 13,

            '@media (max-width: 480px)': {
              fontSize: 12,
            }
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
              color: theme.colors.text,
              fontSize: 12,
              fontWeight: 'bold',
              textTransform: 'none',
              cursor: 'pointer',
              '&.delete': {
                color: '#ec4949'
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
            border: '1px solid' + theme.colors.accent,
            '&::after': {
              content: '"Draft"',
              alignSelf: 'right',
              color: theme.colors.grayscale,
              fontSize: 12,
              fontStyle: 'italic',
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
            h2: { fontSize: 30 }
          },

          '.postFull': {
            h2: {
              textDecoration: 'none',
              cursor: 'default',
            },
            p: {
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'p, ul, li, a, blockquote': {
              fontFamily: theme.fonts.tertiary,
            },
            h3: {
              margin: '3.5rem 0 0',
              padding: 0,
              fontSize: 28,
              fontWeight: 'bold',
            },
            'p, ul, li, a': {
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
              marginLeft: '-1.75rem',
              paddingLeft: '1.5rem',
              borderLeft: '5px solid' + theme.colors.accent,
              color: theme.colors.grayscale,
              fontStyle: 'italic',
              fontWeight: 'normal',
              '& blockquote': {
                marginLeft: 0,
                paddingLeft: '1rem',
                borderLeft: '5px solid' + theme.colors.accent,
              },
              '@media (max-width: 890px)': {
                marginLeft: '-1.1rem',
                paddingLeft: '.8rem',
              },
              p: { fontSize: 24 },
            },
            'ul li': {
              listStyle: 'outside',
              marginLeft: '2rem',
              paddingLeft: '.5rem',
              
              '@media (max-width: 480px)': {
                marginLeft: '1.5rem',
              }
            },
            ol: {
              li: {
                listStyleType: 'decimal',
                marginLeft: '2rem',
                paddingLeft: '.5rem',
              }
            }
          },
          // Next Prev Controls
          '.nextPrevControls': {
            display: 'flex',
            justifyContent: 'space-between',
            a: {
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none',
              }
            },
            '@media(max-width: 768px)': {
              flexDirection: 'column',
            }
          },
          '.prevLink': {
            display: 'flex',
            textAlign: 'left',
            marginRight: '1rem',
          },
          '.nextLink': {
            display: 'flex',
            textAlign: 'right',
          },
          '.prevLink, .nextLink': {
            fontFamily: theme.fonts.tertiary,
            fontSize: 18,
          },

          // Flex Utils
          '.center': {
            display: 'flex',
            justifyContent: 'center',
          },

          // Markdown Code
          'pre, code': {
            backgroundColor: '#2a2734',
            borderRadius: 5,
            color: theme.colors.background,
          },
          code: {
            wordWrap: 'break-word',
          },
          pre: {
            padding: '1rem',
            lineHeight: '2rem',
            code: {
              wordWrap: 'normal',
            }
          },
          'code, code p': {
            padding: '0.2rem',
            backgroundColor: theme.colors.accent,
            color: theme.colors.text,
            fontSize: 15,
          },
          '.codeStyle': {
            code: {
              padding: 0,
            }
          },
          '.languageBash': {
            '.codeStyle &': {
              'pre &': {
                'span.linenumber': { display: 'none !important', }
              }
            }
          }
        }}
      />
      <div className="layout">
        {props.children}
      </div>
    </>
  )

}
