import { FC } from 'react';
import Markdown from '@/components/Markdown';
import { UsesTypes } from '@/types/uses';

interface UsesProps {
  content: UsesTypes;
}

const Uses: FC<UsesProps> = ({ content }) => {
  const styleUsesMarkdown: any = {
    paddingTop: '2rem',
    '@media (max-width: 768px)': {
      paddingTop: '1rem',
    },
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 2fr)',
    gap: '4rem',
    gridAutoRows: 'minmax(100px, auto)',
    lineHeight: '1.8rem',
    hr: {
      margin: '2rem 0',
      borderColor: 'var(--color-accent-lighter)',
    },
    'ul li': {
      color: 'var(--color-gray)',
      fontFamily: 'var(--font-secondary)',
      fontSize: 14,
    },
    'ul li a': {
      color: 'var(--color-primary)',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    'h3, h4, h5, h6': {
      fontFamily: 'var(--font-secondary)',
      margin: '1rem 0 .2rem',
    },
    h3: {
      a: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--color-heading)',
        fontSize: 16,
        fontWeight: 400,
        fontFamily: 'var(--font-secondary)',
        letterSpacing: 2,
        textDecoration: 'none',
        textTransform: 'uppercase',
      },
      paddingBottom: '1rem',
      marginBottom: '2rem',
      borderBottom: '2px solid var(--color-primary)',
    },
    h4: {
      color: 'var(--color-heading)',
      width: 'fit-content',
      fontSize: 13,
      fontWeight: 400,
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: '.5rem',
    },
    h5: {
      fontSize: 12,
      color: 'var(--color-gray)',
      '&:before': {
        content: '"↪"',
        marginRight: '.25rem',
      },
    },
    '@media(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      h3: {
        fontSize: 22,
      },
      'ul li, a': {
        fontSize: 14,
        lineHeight: '1.8rem',
      },
    },
    '@media(max-width: 480px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '2rem',
    },
  };

  return (
    <>
      <h1 className="pageHeading">{content.heading}</h1>
      <div css={styleUsesMarkdown}>
        <Markdown markdown={content.devices} />
        <Markdown markdown={content.stack} />
        <Markdown markdown={content.tools} />
        <Markdown markdown={content.software} />
      </div>
    </>
  );
};

export default Uses;
