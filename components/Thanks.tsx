import { FC } from 'react';
import Link from 'next/link';

type ThanksContent = {
  heading: string;
  copy: string;
};

type ThanksProps = {
  content: ThanksContent;
};

const styleThanks = {
  p: {
    fontFamily: 'var(--font-tertiary)',
  },
  '.homeLink': {
    marginTop: '2rem',
    fontFamily: 'var(--font-secondary)',
    fontSize: 18,
  },
};

const Thanks: FC<ThanksProps> = ({ content }) => {
  return (
    <>
      <h1 className="pageHeading">{content.heading}</h1>
      <div css={styleThanks}>
        <p>{content.copy}</p>

        <div className="homeLink">
          <Link href="/">Return Home</Link>
        </div>
      </div>
    </>
  );
};

export default Thanks;
