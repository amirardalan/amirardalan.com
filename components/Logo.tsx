import React, { FC } from 'react';
import { css } from '@emotion/react';
import { useRouteStatus } from '@/hooks/useLoadingIndicator';
import { logo } from '@/data/content';

const Logo: FC = () => {
  const isLoading = useRouteStatus();

  const styleAnimationWrapper = css({
    maxHeight: 24,
    width: 130,
    overflow: 'hidden',
    position: 'relative',
  });
  const styleLogoWrapper = css({
    display: 'flex',
    flexDirection: 'row',
  });
  const styleLogo = css({
    margin: '.08rem .4rem 0 0',
    background: 'var(--logo) no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24,
  });
  const styleWordMark = css({
    textAlign: 'left',
  });
  const styleTitle = css({
    display: 'block',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 0.6,
    color: 'var(--color-heading)',
    lineHeight: '.95rem',
    textTransform: 'uppercase',
    animation: isLoading
      ? 'slideDown .15s reverse forwards'
      : 'slideDown .5s forwards',
  });
  const styleTitleSub = css({
    color: 'var(--color-gray)',
    fontFamily: 'var(--font-primary)',
    fontSize: 8,
    fontWeight: 'normal',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    animation: isLoading
      ? 'slideUp .15s reverse forwards'
      : 'slideUp .5s forwards',
  });
  const styleLoaderWrapper = css({
    display: 'flex',
    flexDirection: 'row',
    '.loader': {
      zIndex: 10,
      top: 9,
      left: 32,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      '.loadingDot': {
        float: 'left',
        width: '8px',
        height: '8px',
        margin: '0 4px',
        background: 'var(--color-heading)',
        borderRadius: '50%',
        opacity: '0',
        animation: 'loadingFade 1s infinite',
      },
      '.loadingDot:nth-of-type(1)': {
        animationDelay: '0s',
      },
      '.loadingDot:nth-of-type(2)': {
        animationDelay: '0.1s',
      },
      '.loadingDot:nth-of-type(3)': {
        animationDelay: '0.2s',
      },
      '.loadingDot:nth-of-type(4)': {
        animationDelay: '0.3s',
      },
      '.loadingDot:nth-of-type(5)': {
        animationDelay: '0.4s',
      },
      '@keyframes loadingFade': {
        '0%': { opacity: 0 },
        '50%': { opacity: 0.8 },
        '100%': { opacity: 0 },
      },
    },
  });

  const RenderLogo = () => {
    return (
      <div css={styleLogoWrapper}>
        <div css={styleLogo} />
        <div css={styleWordMark}>
          <div css={styleTitle}>{logo.title}</div>
          <div aria-label={logo.subtitle} css={styleTitleSub}>
            {logo.subtitle}
          </div>
        </div>
      </div>
    );
  };

  const RenderLoading = () => {
    if (isLoading) {
      return (
        <div css={styleLoaderWrapper}>
          <div css={styleLogo} />
          <div className="loader">
            <div className="loadingDot" />
            <div className="loadingDot" />
            <div className="loadingDot" />
            <div className="loadingDot" />
            <div className="loadingDot" />
          </div>
        </div>
      );
    } else return null;
  };

  return (
    <div className="animationWrapper" css={styleAnimationWrapper}>
      <RenderLogo />
      <RenderLoading />
    </div>
  );
};

export default React.memo(Logo);
