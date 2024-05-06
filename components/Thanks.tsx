import { FC } from 'react';
import Link from 'next/link';
import { Line } from '@react-three/drei';

type ThanksContent = {
  heading: string;
  copy: string;
};

type ThanksProps = {
  content: ThanksContent;
};

const styleThanksWrapper = {
  maxWidth: 768,
  margin: '0 auto',
  '@media (max-width: 1024px)': {
    padding: '0 2.5rem',
  },
  '@media (max-width: 768px)': {
    padding: '0 2.5rem',
  },
  '@media (max-width: 600px)': {
    padding: '0 2rem',
  },
};

const styleThanks = {
  p: {
    marginTop: '4rem',
    fontFamily: 'var(--font-tertiary)',
    fontSize: 30,
    fontStyle: 'italic',
    lineHeight: 1.6,
    '@media (max-width: 768px)': {
      fontSize: 20,
    },
  },
  '.homeLink': {
    margin: '4rem 0',
    fontFamily: 'var(--font-secondary)',
    fontSize: 18,
  },
};

const Thanks: FC<ThanksProps> = ({ content }) => {
  return (
    <div css={styleThanksWrapper}>
      <h1 className="pageHeading">{content.heading}</h1>
      <div css={styleThanks}>
        <p>{content.copy}</p>

        <div className="homeLink">
          <Link href="/">Return Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
