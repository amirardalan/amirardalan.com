import { FC } from 'react';
import { css } from '@emotion/react';

type XshareButtonProps = {
  title: string;
  url: string;
  text: boolean;
  size: number;
  color: string;
};

const styleXButton = css({
  display: 'flex',
  alignItems: 'center',
  padding: '.1rem 0 0 .1rem',
});

const XShareButton: FC<XshareButtonProps> = ({
  title,
  url,
  text,
  size,
  color,
}) => {
  const handleXShare = () => {
    const tweetUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <button onClick={handleXShare} css={styleXButton} aria-label="Share on X">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 22 24"
        fill={color}
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M0.0583996 0L9.32452 12.3803L0 22.4461H2.09874L10.2625 13.6332L16.8584 22.4461H24L14.2123 9.36956L22.8916 0H20.7929L13.2747 8.11632L7.2 0H0.0583996ZM3.14469 1.54462H6.42551L20.9133 20.9015H17.6325L3.14469 1.54462Z"
        />
      </svg>
      {text ? <span>Share on X</span> : null}
    </button>
  );
};

export default XShareButton;
