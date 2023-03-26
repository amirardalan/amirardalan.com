import { FC } from 'react';
import Markdown from '@/components/Markdown';

const styleUsesMarkdown = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '4rem',
  gridAutoRows: 'minmax(100px, auto)',
  lineHeight: '1.8rem',
  hr: {
    margin: '2rem 0',
  },
  'ul li, a': {
    color: 'var(--color-gray)',
    fontSize: 12,
  },
  'h3, h4, h5, h6': {
    fontFamily: 'var(--font-secondary)',
    margin: '1rem 0 .2rem',
  },
  h3: {
    a: {
      fontSize: 16,
      fontWeight: 300,
      fontFamily: 'var(--font-primary)',
      textDecoration: 'none',
    },
    paddingBottom: '1rem',
    marginBottom: '2rem',
    fontSize: 22,
    borderBottom: '3px solid var(--color-primary)',
  },
  h4: {
    width: 'fit-content',
    fontSize: 18,
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

type ContentItem = {
  heading: string;
  devices: string;
  stack: string;
  tools: string;
  software: string;
};

type UsesProps = {
  content: ContentItem[];
};

const Uses: FC<UsesProps> = ({ content }) => {
  return (
    <>
      {content.map((item, index) => (
        <div key={index}>
          <h1 className="pageHeading">{item.heading}</h1>
          <div css={styleUsesMarkdown}>
            <Markdown markdown={item.devices} />
            <Markdown markdown={item.stack} />
            <Markdown markdown={item.tools} />
            <Markdown markdown={item.software} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Uses;
