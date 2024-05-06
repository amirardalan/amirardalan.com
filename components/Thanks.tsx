import { FC } from 'react';
import Link from 'next/link';

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
};

const styleThanks = {
  p: {
    marginTop: '4rem',
    fontFamily: 'var(--font-tertiary)',
    fontSize: 30,
    fontStyle: 'italic',
    lineHeight: 1.6,
  },
  '.homeLink': {
    marginTop: '4rem',
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
