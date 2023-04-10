import { FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { ErrorTypes } from '@/types/error';

type ErrorProps = {
  error: ErrorTypes;
};

const ErrorLayout: FC<ErrorProps> = ({ error }) => {
  const styleErrorWrapper = css({
    overflow: 'hidden',
    padding: '4rem 1.5rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--page-bg)',
  });

  const styleErrorContainer = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    '.errorCode': {
      display: 'flex',
      alignItems: 'center',
      '& > span': {
        marginTop: '.7rem',
      },
    },
    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    h1: {
      alignSelf: 'center',
      fontSize: 70,
      fontWeight: 700,
    },
    h2: {
      alignSelf: 'center',
      color: 'var(--color-gray)',
      fontFamily: 'var(--font-primary)',
      fontSize: 20,
      fontWeight: 'normal',
    },
  });

  const styleErrorContent = css({
    display: 'flex',
    justifyContent: 'center',
    '.quoteContainer': {
      maxWidth: 400,
      paddingTop: '2rem',
      marginBottom: '3rem',
      borderTop: '1px solid var(--color-accent-gray)',
      textAlign: 'center',
    },
    '.quote': {
      fontSize: 16,
      lineHeight: '1.3rem',
      fontFamily: 'var(--font-tertiary)',
      fontStyle: 'italic',
      color: 'var(--color-gray)',
    },
    '.author': {
      marginTop: '.5rem',
      fontFamily: 'var(--font-tertiary)',
      '&::before': {
        content: '"— "',
      },
    },
  });

  const styleHomeButton = css({
    display: 'flex',
    justifyContent: 'center',
  });

  return (
    <main css={styleErrorWrapper}>
      <div css={styleErrorContainer}>
        <div className="errorCode">
          <h1 aria-label={error.title}>{error.title}</h1>
        </div>
        <div>
          <h2 aria-label={error.text}>{error.text}</h2>
        </div>
      </div>
      <div css={styleErrorContent}>
        <div className="quoteContainer">
          <p className="quote">{error.quote}</p>
          <p className="author">{error.author}</p>
        </div>
      </div>
      <div css={styleHomeButton}>
        <Link
          className="ctaButton"
          href={error.link.path}
          aria-label={error.link.title}
          passHref
        >
          {error.link.title}
        </Link>
      </div>
    </main>
  );
};

export default ErrorLayout;
