import { FC } from 'react';
import { css } from '@emotion/react';

type ContactButtonProps = {};

const ContactButton: FC<ContactButtonProps> = () => {
  const styleContactButton = css({
    display: 'flex',
    justifyContent: 'center',
    '.button': {
      fontFamily: 'var(--font-secondary)',
      fontSize: 18,
      letterSpacing: 2,
      textTransform: 'uppercase',
      padding: '.6rem 2rem',
      borderRadius: 50,
      backgroundColor: 'var(--color-heading)',
      color: 'var(--color-bg)',
      cursor: 'pointer',
      transition: 'background-color .2s',
      border: '1px solid transparent',
      '&:hover': {
        color: 'var(--color-heading)',
        backgroundColor: 'transparent',
        border: '1px solid var(--color-heading)',
      },
    },
  });

  return (
    <div css={styleContactButton}>
      <button
        className="button contact"
        onClick={() =>
          window.open(
            `mailto:${process.env.NEXT_PUBLIC_USER_EMAIL}?subject=Project inquiry`,
            '_blank'
          )
        }
      >
        {`Get in Touch`}
      </button>
    </div>
  );
};

export default ContactButton;
