import { FC } from 'react';
import { Global } from '@emotion/react';
import { theme } from '@/styles/theme';

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
          // Shared Theme Vars
          'html[data-theme="light"], html[data-theme="dark"]': {
            // Fonts
            '--font-primary': fontPrimary,
            '--font-secondary': fontSecondary,
            '--font-tertiary': fontTertiary,
            '--color-light': theme.lightAccent,
            '--color-gray-static': theme.grayLight,
            '--color-dark': theme.darkAccent,
            '--color-gray-dark': theme.grayDark,
            '--color-disabled': theme.buttonDisabled,
            '--color-avatar': theme.avatar,
            '--color-select': theme.grayAccentLight,
            '--icon-download-dark': 'url(/icons/download-dark.svg)',
            '--icon-download-light': 'url(/icons/download-light.svg)',
            '--icon-copy': 'url(/icons/copy-light.svg)',
            '--icon-check': 'url(/icons/check-light.svg)',
          },
          // Light Theme Vars
          'html[data-theme="light"]': {
            '--color-scheme': 'light',
            '--color-primary': theme.primary,
            '--color-secondary': theme.secondary,
            '--color-bg': theme.light,
            '--color-text': theme.grayAccentDark,
            '--color-heading': theme.dark,
            '--color-gray': theme.grayDark,
            '--color-accent-gray': theme.grayAccentLight,
            '--color-accent': theme.lightAccent,
            '--color-accent-lighter': theme.lightDarker,
            '--color-text-input': theme.textInputLight,
            '--color-warning': theme.warningLight,
            '--color-gradient': theme.gradientDark,
            '--page-bg': theme.lightDarker,
            '--code-bg': theme.codeBgLight,
            '--code-highlight': theme.codeHighlightLight,
            '--code-scrollbar': theme.codeScrollbarLight,
            '--code-scrollbar-hover': theme.codeScrollbarHoverLight,
            '--icon-info': 'url(/icons/note-dark.svg)',
            '--icon-warning': 'url(/icons/warning-dark.svg)',
          },
          // Dark Theme Vars
          'html[data-theme="dark"]': {
            '--color-scheme': 'dark',
            '--color-primary': theme.secondary,
            '--color-secondary': theme.primary,
            '--color-bg': theme.dark,
            '--color-text': theme.lightDarker,
            '--color-heading': theme.light,
            '--color-gray': theme.grayLight,
            '--color-accent-gray': theme.grayAccentDark,
            '--color-accent': theme.darkAccent,
            '--color-accent-lighter': theme.darker,
            '--color-text-input': theme.textInputDark,
            '--color-warning': theme.warningDark,
            '--color-gradient': theme.gradientLight,
            '--page-bg': theme.darkAccent,
            '--code-bg': theme.codeBgDark,
            '--code-highlight': theme.codeHighlightDark,
            '--code-scrollbar': theme.codeScrollbarDark,
            '--code-scrollbar-hover': theme.codeScrollbarHoverDark,
            '--icon-info': 'url(/icons/note-light.svg)',
            '--icon-warning': 'url(/icons/warning-dark.svg)',
          },
          // Base
          'html, body': {
            backgroundColor: 'var(--color-bg)',
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-text)',
            WebkitTextSizeAdjust: '100%',
          },
          html: {
            scrollBehavior: 'smooth',
            colorScheme: 'var(--color-scheme)',
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
            caretColor: 'var(--color-primary)',
          },
          'form input:disabled': {
            WebkitTextFillColor: 'var(--color-gray) !important',
          },
          'textarea, .modalContent': {
            '::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
              WebkitBoxShadow: 'none',
              borderRadius: 10,
            },
            '::-webkit-scrollbar-track-piece': {
              display: 'none',
            },
            '::-webkit-scrollbar': {
              backgroundColor: 'transparent',
              width: 16,
              height: '8px',
            },
            '::-webkit-scrollbar-thumb': {
              border: '4px solid rgba(0, 0, 0, 0)',
              width: 8,
              backgroundClip: 'padding-box',
              borderRadius: 10,
              WebkitBoxShadow: 'none',
              backgroundColor: 'var(--color-accent-gray)',
              '&:hover': {
                backgroundColor: 'var(--color-disabled)',
              },
            },
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
            fontSize: 13,
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
              fontSize: 20,
              fontWeight: 400,
              marginBottom: '1rem',
              fontFamily: 'var(font-secondary)',
              color: 'var(--color-gray)',
              WebkitMarqueeIncrement: '0vw',
              textAlign: 'left',
            },
            '@media(max-width: 1024px)': {
              marginTop: 0,
              padding: '0 2.5rem',
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
            fontFamily: 'var(--font-secondary)',
            letterSpacing: 1,
            fontWeight: 400,
            background: 'var(--color-heading)',
            border: '1px solid transparent',
            borderRadius: 50,
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
              border: '1px solid var(--color-primary)',
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
              border: '1px solid var(--color-heading)',
              color: 'var(--color-heading)',
              '&:hover': {
                background: 'transparent',
                border: '1px solid var(--color-primary)',
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
              border: '1px solid var(--color-accent-gray)',
              '&:hover': {
                border: '1px solid var(--color-accent-gray)',
                background: 'transparent',
                color: 'var(--color-heading)',
              },
            },
            '&.download:after, &.clipboard:after': {
              marginLeft: 8,
              content: '""',
              display: 'inline-block',
              width: 18,
              height: 18,
            },
            '&.download': {
              mixBlendMode: 'screen',
              '&:after': {
                background: 'var(--icon-download-light) no-repeat',
                backgroundSize: 'contain',
              },
              '&:hover': {
                '&:after': {
                  background: 'var(--icon-download-light) no-repeat',
                  backgroundSize: 'contain',
                },
              },
            },
            '&.clipboard': {
              '&:after': {
                background: 'var(--icon-copy) no-repeat',
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
                border: '1px solid var(--color-heading)',
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
            borderRadius: 5,
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
            overflow: 'hidden',
            width: '100%',
            alignSelf: 'flex-end',
          },
          '.buttonHover': {
            position: 'relative',
            zIndex: 1,
            ':not(:first-of-type)': {
              marginLeft: '1.5rem',
            },
            '&:hover::after': {
              top: '-38%',
              left: '-41.5%',
              position: 'absolute',
              content: '" "',
              backgroundColor: 'var(--color-accent)',
              borderRadius: 100,
              padding: 22,
              cursor: 'pointer',
              zIndex: -1,
              '@media(max-width: 1024px)': {
                display: 'none',
              },
            },
          },
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
            },
            '100%': {
              opacity: 1,
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
