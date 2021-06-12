import { Global } from '@emotion/react'
import Container from '@/components/Container'

export default function BlogLayout(props: any) {

  return (
    <>
      <Container toggleTheme={props.toggleTheme}>
        {props.children}
      </Container>
      
      <Global
        styles={{
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
              fontFamily: 'var(--font-tertiary)',
              fontSize: 18,
            },
            main: {
              display: 'flex',
              flexDirection: 'column',
            },
            '&.postTeaser': {
              marginBottom: '2.5rem',
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
            margin: '.5rem 0 .2rem',
            color: 'var(--color-gray)',
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
            h2: {
              fontSize: 30,
              a: {
                color: 'var(--color-text)',
              }
            }
          },
          'input[type="text"], textarea': {
            width: '100%',
            margin: '0.5rem 0',
            padding: '0.5rem',
            backgroundColor: 'var(--color-accent)',
            border: '2px solid var(--color-accent)',
            borderRadius: '0.25rem',
            color: 'var(--color-text)',
            fontSize: 16,
            '&:disabled': {
              backgroundColor: 'var(--color-input-disabled)',
              color: 'var(--color-gray)',
            },
            '@media (max-width: 890px)': {
              width: '100%'
            }
          },
          '.postFull': {
            h2: {
              textDecoration: 'none',
              cursor: 'default',
            },
            h3: {
              scrollMarginTop: '4rem',
              margin: '3.5rem 0 1rem',
              padding: 0,
              fontSize: 28,
              fontWeight: 'bold',
              lineHeight: '2rem',
              '& code': {
                fontFamily: 'var(--font-secondary)',
                fontSize: 28,
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
                    top: 2,
                    left: -22,
                    fontSize: 22
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
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'p, ul, li, a, blockquote': {
              fontFamily: 'var(--font-tertiary)',
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
              borderLeft: '5px solid var(--color-accent-gray)',
              color: 'var(--color-gray)',
              fontStyle: 'italic',
              fontWeight: 'normal',
              '& blockquote': {
                marginLeft: 0,
                paddingLeft: '1rem',
                borderLeft: '5px solid var(--color-accent)',
              },
              '@media (max-width: 890px)': {
                marginLeft: '-.8rem',
                paddingLeft: '.8rem',
              },
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
        }}
      />
    </>
  )

}
