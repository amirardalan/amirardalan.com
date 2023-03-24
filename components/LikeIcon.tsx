import { FC } from 'react';
import { useTheme, Theme, css } from '@emotion/react';

type LikeIconProps = {
  active: boolean;
};

const LikeIcon: FC<LikeIconProps> = ({ active }) => {
  const theme: Theme = useTheme();

  const styleHeartIcon = css({
    marginLeft: '.8rem',
  });

  if (theme.active === 'dark') {
    return (
      <>
        {active ? (
          <span css={styleHeartIcon}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 139 139"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M103.48 20.2303L127.417 40.1767V69.8706L69.5 118.133L11.5833 69.8648V40.1767L35.5203 20.2303L69.5 42.8815L103.48 20.2303ZM104.25 5.79163L69.5 28.9583L34.75 5.79163L0 34.75V75.2916L69.5 133.208L139 75.2916V34.75L104.25 5.79163Z"
                fill="#E4E9F8"
              />
            </svg>
          </span>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 139 139"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M104.25 5.79163L69.5 28.9583L34.75 5.79163L0 34.75V75.2916L69.5 133.208L139 75.2916V34.75L104.25 5.79163Z"
              fill="#3DFFC5"
            />
          </svg>
        )}
      </>
    );
  } else {
    return (
      <span css={styleHeartIcon}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 139 139"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M103.48 20.2303L127.417 40.1767V69.8706L69.5 118.133L11.5833 69.8648V40.1767L35.5203 20.2303L69.5 42.8815L103.48 20.2303ZM104.25 5.79163L69.5 28.9583L34.75 5.79163L0 34.75V75.2916L69.5 133.208L139 75.2916V34.75L104.25 5.79163Z"
            fill="#262738"
          />
        </svg>
      </span>
    );
  }
};

export default LikeIcon;