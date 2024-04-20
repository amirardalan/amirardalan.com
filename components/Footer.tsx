import { FC, Key } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import Logo from '@/components/Logo';
import { footer } from '@/data/content';
import { nav } from '@/data/navigation';
import SiteViewCount from '@/components/SiteViewCount';

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  const styleFooterWrapper = css({
    position: 'relative',
    marginTop: '6rem',
    padding: '4rem 4rem 1rem 4rem',
    backgroundColor: 'var(--color-primary)',
    '@media(max-width: 1024px)': {
      marginTop: '4rem',
      padding: '3.5rem 2.5rem 1rem 2.5rem',
    },
    '@media(max-width: 480px)': {
      padding: '3rem 1.5rem 1rem 1.5rem',
    },
  });
  const styleFooter = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '3rem',
    gridAutoRows: 'minmax(100px, auto)',
    flexDirection: 'column',
    fontFamily: 'var(--font-secondary)',
    fontSize: 16,
    color: 'var(--color-bg)',
    '@media(max-width: 890px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media(max-width: 480px)': {
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    '.grid': {
      marginBottom: '1rem',
      '@media(max-width: 890px)': {
        marginBottom: 0,
      },
    },
    a: {
      marginBottom: '.5rem',
      display: 'flex',
      flexDirection: 'row',
      width: 'fit-content',
      fontSize: 16,
      alignItems: 'center',
      textDecoration: 'none',
      color: 'var(--color-bg)',
      borderBottom: '1px solid transparent',
      '&:focus': {
        boxShadow: '0 0 0 2px var(--color-accent-gray)',
        '&:focus:not(:focus-visible)': { boxShadow: 'none' },
      },
      '@media (min-width: 1025px)': {
        '&:hover': {
          borderBottom: '1px solid var(--color-bg)',
        },
      },
      '@media(max-width: 768px)': {
        fontSize: 14,
      },
      '@media(max-width: 480px)': {
        marginBottom: '.8rem',
      },
    },
    h4: {
      fontFamily: 'var(--font-secondary)',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: 13,
      borderBottom: '2px solid var(--color-bg)',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      lineHeight: '1rem',
      '@media(max-width: 600px)': {
        width: '100%',
      },
    },
    '.icon': {
      display: 'flex',
      alignSelf: 'center',
      margin: '.05rem 0 0 .15rem',
    },
  });
  const styleFooterLogo = css({
    display: 'flex',
    '@media(max-width: 768px)': {
      padding: 0,
    },
  });
  const styleCopyright = css({
    textTransform: 'uppercase',
    marginTop: '2rem',
    fontFamily: 'var(--font-secondary)',
    fontSize: 11,
    letterSpacing: 1,
    color: 'var(--color-bg)',
    lineHeight: '1.2rem',
    display: 'flex',
    alignSelf: 'end',
    a: {
      color: 'var(--color-bg)',
    },
    '@media(max-width: 768px)': {
      marginTop: '1.5rem',
    },
  });
  const styleFooterNav = css({
    display: 'flex',
    flexDirection: 'column',
  });

  interface FooterLinks {
    map: Function;
  }

  interface LinksItem {
    title: string;
    path: string;
    cName: string;
  }

  const generateFooterLinks = (footerLinks: FooterLinks) => {
    return footerLinks.map((item: LinksItem, i: Key) => {
      return (
        <li key={i}>
          <a
            key={item.title}
            href={item.path}
            aria-label={item.title}
            target="_blank"
            rel="noopener noreferrer"
            className={item?.cName}
          >
            {item.title}
            <span className="icon">
              <span className="icon">
                <svg
                  width="15"
                  height="13"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="var(--color-bg)"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                </svg>
              </span>
            </span>
          </a>
        </li>
      );
    });
  };

  interface NavItem {
    path: string;
    title: string;
    cName: string;
  }

  return (
    <footer css={styleFooterWrapper}>
      <div css={styleFooter}>
        <div className="grid">
          <div css={styleFooterLogo}>
            <Logo animate={false} size={75} color="var(--color-bg)" />
          </div>
        </div>
        <div css={styleFooterNav} className="grid">
          <h4>{footer.headings.nav}</h4>
          <ul>
            {nav.map((item: NavItem, i: number) => {
              return (
                <li key={i}>
                  <Link
                    href={item.path}
                    aria-label={item.title}
                    className={item.cName}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid">
          <h4>{footer.headings.social}</h4>
          <ul>{generateFooterLinks(footer.social)}</ul>
        </div>
        <div className="grid">
          <h4>{footer.headings.poweredby}</h4>
          <ul>{generateFooterLinks(footer.poweredby)}</ul>
        </div>
      </div>
      <div css={styleCopyright}>
        <div>
          {footer.copyright.text}
          {new Date().getFullYear() + ' '}
          {footer.copyright.name} — <SiteViewCount />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
