import { FC, useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { ContactButtonTypes, CtaButtonsTypes } from '@/types/button';

type CtaButtonsProps = {
  items: CtaButtonsTypes['items'];
};

export const CtaButtons: FC<CtaButtonsProps> = ({ items }) => {
  return (
    <>
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.path}
          aria-label={item.title}
          className={item.icon ? `ctaButton ${item.icon}` : 'ctaButton'}
          target={item.target}
          rel={item.rel}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
};

type ContactButtonProps = {
  content: ContactButtonTypes;
};

export const ContactButton: FC<ContactButtonProps> = ({ content }) => {
  const [showEmail, setShowEmail] = useState(false);
  const showEmailOnclick = () => {
    setShowEmail(true);
  };
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_USER_EMAIL ?? '');
    setEmailCopied(true);
    setTimeout(() => {
      setEmailCopied(false);
    }, 5000);
  };

  const styleAboutCtaWrapper = css({
    display: 'block',
    width: 'fit-content',
    '@media(max-width: 480px)': {
      width: '100%',
    },
  });

  const styleAddress = css({
    fontStyle: 'normal',
  });

  const styleTooltipContact = css({
    overflow: 'hidden',
    '.tooltip': {
      marginTop: '.5rem',
      opacity: emailCopied ? 1 : 0,
      animation: emailCopied ? 'tooltipDown 5s' : 'none',
      '&:before': {
        top: -6,
        borderBottom: '6px solid var(--color-accent-gray)',
      },
    },
  });

  return (
    <span css={styleAboutCtaWrapper}>
      <button
        onClick={showEmail ? handleCopyToClipboard : showEmailOnclick}
        className={
          showEmail ? 'ctaButton clipboard disabled' : 'ctaButton email'
        }
        aria-label={
          showEmail ? 'Copy Email address to clipboard' : 'Show Email'
        }
      >
        {showEmail ? (
          <address css={styleAddress}>
            {process.env.NEXT_PUBLIC_USER_EMAIL}
          </address>
        ) : (
          content.contact.email.title
        )}
      </button>
      <div css={styleTooltipContact}>
        <div className="tooltip">{content.contact.copiedToClipboard}</div>
      </div>
    </span>
  );
};
