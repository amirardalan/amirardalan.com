import { FC } from 'react';
import { Global } from '@emotion/react';

const light = '#e4e9f8';
const lightAccent = '#d8dff0';
const lightDarker = '#d5d9ee';
const dark = '#262738';
const darkAccent = '#2f3044';
const darker = '#191a22';
const primary = '#7e37a4';
const secondary = '#3dffc5';
const grayLight = '#b0bccc';
const grayDark = '#606071';
const grayAccentLight = '#b7b7c9';
const grayAccentDark = '#494a5c';
const buttonDisabled = '#9e9eb6';
const warning = '#e64358';
const codeHighlight = '#37394e';
const avatar = '#281483';
const sunrise =
  'linear-gradient(to bottom,#515690 0%, #194464 50%,#0e656a 100%)';
const sunset = 'linear-gradient(to bottom,#515690 0%,#51477c 50%,#5b2978 100%)';

type GlobalStylesProps = {
  fontPrimary: string;
  fontSecondary: string;
  fontTertiary: string;
};

const GlobalStyles: FC<GlobalStylesProps> = ({
  fontPrimary,
  fontSecondary,
  fontTertiary,
}) => {
  return (
    <>
      <Global
        styles={{
          'body, body[data-theme="light"], body[data-theme="dark"]': {
            overflow: 'overlay',
            '--font-primary': fontPrimary,
            '--font-secondary': fontSecondary,
            '--font-tertiary': fontTertiary,
            '--color-light': lightAccent,
            '--color-dark': darkAccent,
            '--color-gray-dark': grayDark,
            '--color-warning': warning,
            '--color-disabled': buttonDisabled,
            '--color-avatar': avatar,
            '--color-select': grayAccentLight,
            '--code-highlight': codeHighlight,
            '--icon-download-dark': 'url(/icons/download-dark.svg)',
            '--icon-download-light': 'url(/icons/download-light.svg)',
            '--icon-copy': 'url(/icons/copy-light.svg)',
            '--icon-check': 'url(/icons/check-light.svg)',
          },
          'body, body[data-theme="light"]': {
            '--color-primary': primary,
            '--color-secondary': secondary,
            '--color-bg': light,
            '--color-text': grayAccentDark,
            '--color-heading': dark,
            '--color-gray': grayDark,
            '--color-accent-gray': grayAccentLight,
            '--color-accent': lightAccent,
            '--color-accent-darker': lightDarker,
            '--color-gradient': sunset,
            '--page-bg': lightDarker,
            '--code-bg': darkAccent,
            '--logo': 'url(/logo/logo-light.svg)',
            '--logo-footer': 'url(/logo/logo-dark.svg)',
            '--icon-paypal': 'url(/icons/paypal-light.svg)',
            '--icon-eth': 'url(/icons/eth-light.svg)',
            '--icon-info': 'url(/icons/note-dark.svg)',
            '--icon-arrow': 'url(/icons/arrow-dark.svg)',
            '--icon-pin': 'url(/icons/pin-dark.svg)',
            '--icon-folder': 'url(/icons/folder-dark.svg)',
            '--icon-external': 'url(/icons/external-link-light.svg)',
            '--icon-clipboard': 'url(/icons/clipboard-dark.svg)',
            '--icon-warning': 'url(/icons/warning-dark.svg)',
          },

          'body[data-theme="dark"]': {
            '--color-primary': secondary,
            '--color-secondary': primary,
            '--color-bg': dark,
            '--color-text': lightDarker,
            '--color-heading': light,
            '--color-gray': grayLight,
            '--color-accent-gray': grayAccentDark,
            '--color-accent': darkAccent,
            '--color-accent-darker': darker,
            '--color-gradient': sunrise,
            '--page-bg': darkAccent,
            '--code-bg': darkAccent,
            '--logo': 'url(/logo/logo-dark.svg)',
            '--logo-footer': 'url(/logo/logo-light.svg)',
            '--icon-paypal': 'url(/icons/paypal-dark.svg)',
            '--icon-eth': 'url(/icons/eth-dark.svg)',
            '--icon-info': 'url(/icons/note-light.svg)',
            '--icon-arrow': 'url(/icons/arrow-light.svg)',
            '--icon-pin': 'url(/icons/pin-light.svg)',
            '--icon-folder': 'url(/icons/folder-light.svg)',
            '--icon-external': 'url(/icons/external-link-dark.svg)',
            '--icon-clipboard': 'url(/icons/clipboard-light.svg)',
            '--icon-warning': 'url(/icons/warning-light.svg)',
          },
          html: {
            scrollBehavior: 'smooth',
          },
          'html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video':
            {
              margin: 0,
              padding: 0,
              border: 0,
              fontSize: '100%',
              verticalAlign: 'baseline',
            },
          'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section':
            {
              display: 'block',
            },
          'nav ul': {
            listStyle: 'none',
          },
          'blockquote, q': {
            quotes: 'none',
          },
          'blockquote:before, blockquote:after, q:before, q:after': {
            content: '" "',
          },
          ins: {
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-text)',
            textDecoration: 'none',
          },
          mark: {
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-text)',
            fontStyle: 'italic',
            fontWeight: 'bold',
          },
          del: {
            textDecoration: 'line-through',
          },
          'abbr[title], dfn[title]': {
            borderBottom: '1px dotted',
            cursor: 'help',
          },
          table: {
            borderCollapse: 'collapse',
            borderSpacing: 0,
          },
          hr: {
            display: 'block',
            height: 1,
            border: 0,
            borderTop: '1px solid var(--color-accent-gray)',
            margin: '4rem 0 1.5em 0',
            padding: 0,
          },
          'input, textarea, select': {
            verticalAlign: 'middle',
            caretColor: 'var(--color-heading)',
          },
          // Base
          'html, body': {
            backgroundColor: 'var(--color-bg)',
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-text)',
            WebkitTextSizeAdjust: '100%',
          },
          '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            '&:before, &:after': {
              boxSizing: 'border-box',
            },
            '&:focus': {
              boxShadow: '0 0 0 2px var(--color-primary)',
              outline: 'none',
              '@media(max-width: 480px)': {
                boxShadow: 'none',
              },
            },
            '&:focus:not(:focus-visible)': { boxShadow: 'none' },
          },
          title: {
            margin: 0,
            padding: 0,
          },
          'h1, h2, h3': {
            color: 'var(--color-heading)',
            fontFamily: 'var(--font-secondary)',
            fontWeight: 700,
          },
          a: {
            cursor: 'pointer',
            margin: 0,
            padding: 0,
            fontSize: '100%',
            verticalAlign: 'baseline',
            background: 'transparent',
            color: 'var(--color-primary)',
            textDecoration: 'underline',
          },
          p: {
            margin: 0,
            padding: 0,
            lineHeight: '1.8rem',
          },
          'ul, li': {
            listStyle: 'none',
            margin: 0,
            padding: 0,
          },
          'button, input, textarea': {
            fontFamily: 'var(--font-primary)',
          },
          button: {
            background: 'transparent',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            color: 'var(--color-primary)',
            cursor: 'pointer',
          },
          '.icon': {
            WebkitTransformStyle: 'preserve-3d',
          },
          '.container': {
            minHeight: '50vh',
            marginTop: '2rem',
            padding: '0 4rem',
            position: 'relative',
            '.pageHeading': {
              marginBottom: '1rem',
              fontFamily: 'var(font-secondary)',
              fontSize: 40,
              WebkitMarqueeIncrement: '0vw',
              fontWeight: 700,
              textAlign: 'left',
            },
            '@media(max-width: 1024px)': {
              marginTop: 0,
              padding: '0 2.5rem',
              '.pageHeading': {
                marginBottom: '1.5rem',
                fontSize: 30,
              },
            },
            '@media (max-width: 600px)': {
              marginTop: '.5rem',
              padding: '0 1.5rem',
            },
          },
          '.ctaButton': {
            minWidth: 128,
            minHeight: 42,
            marginRight: '.6rem',
            marginBottom: '.6rem',
            padding: '0 1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            lineHeight: '1.5rem',
            fontSize: 15,
            fontFamily: 'var(--font-primary)',
            fontWeight: 400,
            background: 'var(--color-heading)',
            border: '1px solid transparent',
            borderRadius: 6,
            color: 'var(--color-bg)',
            textTransform: 'uppercase',
            textDecoration: 'none',
            span: {
              marginLeft: 100,
            },
            '&:first-of-type': {
              marginLeft: 0,
            },
            '&:last-of-type': {
              marginRight: 0,
            },
            '&:only-of-type': {
              margin: 0,
            },
            'span.none': {
              display: 'none',
            },
            '&:hover': {
              background: 'transparent',
              border: '2px solid var(--color-primary)',
              color: 'var(--color-primary)',
              '@media(min-width: 1025px)': {
                '&.download:after': {
                  background: 'var(--icon-download-light) no-repeat',
                  backgroundSize: 'contain',
                },
              },
            },
            '&.reverse': {
              background: 'transparent',
              border: '2px solid var(--color-heading)',
              color: 'var(--color-heading)',
              '&:hover': {
                background: 'transparent',
                border: '2px solid var(--color-primary)',
                color: 'var(--color-primary)',
                '@media(min-width: 1025px)': {
                  '&.download:after': {
                    background: 'var(--icon-download-light) no-repeat',
                    backgroundSize: 'contain',
                  },
                },
              },
            },
            '&.disabled': {
              cursor: 'pointer',
              background: 'transparent',
              color: 'var(--color-heading)',
              border: '2px solid var(--color-accent-gray)',
              '&:hover': {
                border: '2px solid var(--color-accent-gray)',
                background: 'transparent',
                color: 'var(--color-heading)',
              },
            },
            '&.download:after, &.clipboard:after': {
              marginLeft: 4,
              content: '""',
              display: 'inline-block',
              width: 18,
              height: 18,
            },
            '&.download': {
              mixBlendMode: 'screen',
              '&:after': {
                background: 'var(--icon-download-dark) no-repeat',
                backgroundSize: 'contain',
              },
            },
            '&.clipboard': {
              '&:after': {
                background: 'var(--icon-clipboard) no-repeat',
                backgroundSize: 'contain',
              },
            },
            '@media(max-width: 1024px)': {
              '&:hover': {
                background: 'var(--color-heading)',
                border: '1px solid transparent',
                color: 'var(--color-bg)',
              },
              '&.reverse:hover': {
                background: 'transparent',
                border: '2px solid var(--color-heading)',
                color: 'var(--color-heading)',
              },
            },
            '@media(max-width: 480px)': {
              marginRight: 0,
              '.home &: nth-of-type(1)': {
                marginRight: 10,
              },
              width: '100%',
            },
          },
          '.warn': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '&:before': {
              content: '""',
              marginRight: '.4rem',
              background: 'var(--icon-warning) no-repeat',
              backgroundSize: 'contain',
              height: 20,
              width: 20,
            },
          },
          '.tooltip': {
            position: 'relative',
            borderRadius: 5,
            padding: '0 .5rem',
            color: 'var(--color-heading)',
            fontSize: 11,
            textAlign: 'center',
            backgroundColor: 'var(--color-accent-gray)',
            '&:before': {
              content: '""',
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
            },
          },
          '.hidden': {
            display: 'none',
          },
          '.center': {
            display: 'flex',
            justifyContent: 'center',
          },
          '::selection': {
            background: 'var(--color-accent-gray)',
            color: 'var(--color-heading)',
          },
          '.animationWrapper': {
            width: '100%',
            overflow: 'hidden',
            alignSelf: 'flex-end',
          },
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
            },
            '100%': {
              opacity: 1,
            },
          },
          '@keyframes slideUpSection': {
            '0%': {
              transform: 'translate3d(0, 100%, 0)',
            },
            '100%': {
              transform: 'translate3d(0, 0, 0)',
            },
          },
          '@keyframes slideDownSection': {
            '0%': {
              transform: 'translate3d(0, 0, 0)',
            },
            '100%': {
              transform: 'translate3d(0, 100%, 0)',
            },
          },
          '@keyframes slideUp': {
            '0%': {
              opacity: 0,
              transform: 'translate3d(0, 100%, 0)',
            },
            '100%': {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1,
            },
          },
          '@keyframes slideDown': {
            '0%': {
              opacity: 0,
              transform: 'translate3d(0, -100%, 0)',
            },
            '100%': {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1,
            },
          },
          '@keyframes tooltipUp': {
            '0%': {
              opacity: 0,
              transform: 'translate3d(0, 100%, 0)',
            },
            '10%': {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1,
            },
            '90%': {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1,
            },
            '100%': {
              transform: 'translate3d(0, 100%, 0)',
              opacity: 0,
            },
          },
          '@keyframes tooltipDown': {
            '0%': {
              opacity: 0,
              transform: 'translate3d(0, -100%, 0)',
            },
            '10%': {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1,
            },
            '90%': {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1,
            },
            '100%': {
              transform: 'translate3d(0, -100%, 0)',
              opacity: 0,
            },
          },
          '@keyframes dash': {
            '0%': {
              strokeDasharray: '1, 150',
              strokeDashoffset: '0',
            },
            '50%': {
              strokeDasharray: '90, 150',
              strokeDashoffset: '-35',
            },
            '100%': {
              strokeDasharray: '90, 150',
              strokeDashoffset: '-124',
            },
          },
        }}
      />
    </>
  );
};

export default GlobalStyles;
