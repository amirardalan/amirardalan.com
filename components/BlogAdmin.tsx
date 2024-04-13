import type { FC } from 'react';
import Link from 'next/link';
import { Global, css } from '@emotion/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRouteStatus, useFetchStatus } from '@/hooks/useLoadingIndicator';

const BlogAdmin: FC = () => {
  // Session
  const { data: session } = useSession();
  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_SITE_URL;

  // Route & Fetch Loading
  const isPageLoad = useRouteStatus();
  const isFetching = useFetchStatus();
  const isLoading = isPageLoad || isFetching[0];

  // Session & Route Conditionals
  const path = router.pathname;
  const isLoggedIn =
    session && session?.user?.email == process.env.NEXT_PUBLIC_USER_EMAIL;
  const isAdminPage = [
    '/blog/create',
    '/blog/edit/[id]',
    '/blog/drafts',
  ].includes(path);
  const isCreatePage = router.asPath === '/blog/create';
  const isDraftsPage = router.asPath === '/blog/drafts';
  const isActive: (pathname: string) => boolean = (pathname) =>
    path === pathname;

  const styleAnimationWrapper = css({
    display: session ? 'block' : 'none',
    overflow: 'hidden',
  });
  const styleAdminPanel = css({
    width: 'auto',
    display: 'flex',
    padding: '.5rem 4rem',
    fontFamily: 'var(--font-primary)',
    backgroundColor: 'var(--color-accent)',
    borderBottom: '1px solid var(--color-accent-lighter)',
    justifyContent: 'space-between',
    marginTop: '-3rem',
    animation: 'adminPanelSlideDown .5s forwards',
    '@media (max-width: 1024px)': {
      padding: '.5rem 2.5rem',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      padding: '.5rem 1rem',
    },
    '@keyframes adminPanelSlideDown': {
      from: { marginTop: '-3rem' },
      to: { marginTop: 0 },
    },
  });
  const styleAdminPanelLeft = css({
    display: 'flex',
    '@media(max-width: 600px)': {
      justifyContent: 'flex-end',
      margin: '0 .5rem .5rem 0',
    },
    div: {
      fontSize: 13,
      alignSelf: 'center',
      color: 'var(--color-gray)',
      span: {
        '&:after': {
          content: '"•"',
          marginLeft: '.5rem',
        },
      },
      a: {
        marginLeft: '.5rem',
        textTransform: 'uppercase',
      },
    },
  });
  const styleAdminPanelRight = css({
    display: 'flex',
    justifyContent: 'right',
    'button, a': {
      marginRight: '.25rem',
    },
  });

  const AdminPanel = () => {
    return (
      <>
        <div css={styleAdminPanelLeft}>
          <div>
            <span>Welcome, {session?.user?.name?.split(' ')[0]}!</span>
            <a
              onClick={() =>
                signOut({
                  callbackUrl: isAdminPage
                    ? `${URL}/blog`
                    : `${URL + router.asPath}`,
                })
              }
              aria-label="Sign Out"
              tabIndex={0}
            >
              Sign Out
            </a>
          </div>
        </div>

        <div css={styleAdminPanelRight}>
          <Link
            href="/blog/create"
            passHref
            aria-label="New Post"
            className={`buttonCompact createBtn ${
              isCreatePage || isLoading ? 'disabled' : null
            }`}
          >
            Create
          </Link>
          <Link
            href="/blog/drafts"
            passHref
            aria-label="Drafts"
            className={`buttonCompact draftsBtn ${
              isDraftsPage || isLoading ? 'disabled' : null
            }`}
            data-active={isActive('/drafts')}
          >
            Drafts
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      {isLoggedIn ? (
        <Global
          styles={{
            '.breadcrumbs': {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              color: 'var(--color-gray)',
              fontSize: 13,
              a: {
                '&::after': {
                  content: '"/"',
                  margin: '0 .5rem',
                  color: 'var(--color-gray)',
                },
              },
              '@media (max-width: 480px)': {
                span: {
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                },
              },
            },
            '.draftNotification': {
              padding: '1rem',
              background: 'var(--color-accent)',
              fontSize: 13,
              a: {
                margin: '0 .5rem',
              },
            },
            '.blog.admin': {
              width: '100%',
              '.drafts': {
                '.draftsControls': {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                },
                '.draftSort': {
                  label: {
                    fontFamily: 'var(--font-primary)',
                    fontSize: 13,
                    margin: 0,
                  },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'end',
                },
              },
              form: {
                marginTop: '1rem',
              },
              '.postOptions': {
                minHeight: 45,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 13,
                '.uploadImage': {
                  span: { margin: '0 .5rem 0 2rem' },
                },
                '@media(max-width: 600px)': {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  label: {
                    marginBottom: '1rem',
                  },
                },
                '.postOptionsContainer': {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  '@media(max-width: 600px)': {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  },
                },
              },
              '.checkbox': {
                marginRight: '.5rem',
                label: {
                  display: 'flex',
                  width: 'fit-content',
                  marginRight: '1rem',
                },
              },
              '.dropdownLabel': {
                fontFamily: 'var(--font-primary)',
                marginRight: '2rem',
                span: {
                  marginRight: '.5rem',
                },
                select: {
                  textTransform: 'capitalize',
                },
              },
            },
            '.buttonCompact': {
              minWidth: 85,
              marginRight: '.25rem',
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1rem',
              backgroundColor: 'var(--color-heading)',
              border: '1px solid var(--color-accent)',
              borderRadius: 6,
              color: 'var(--color-bg)',
              fontSize: 12,
              fontFamily: 'var(--font-primary)',
              fontWeight: 'normal',
              textTransform: 'uppercase',
              textAlign: 'center',
              cursor: 'pointer',
              '&.inProgress': {
                backgroundColor: 'var(--color-disabled)',
                cursor: 'wait',
              },
              '.createBtn &': {
                '&.createBtn': {
                  backgroundColor: 'var(--color-disabled)',
                },
              },
              '.draftsBtn &': {
                '&.draftsBtn': {
                  backgroundColor: 'var(--color-disabled)',
                },
              },
              '&.deleteBtn': {
                backgroundColor: 'var(--color-warning)',
                color: 'var(--color-light)',
              },
              '&.saveBtn, &.updateBtn, &.cancelBtn': {
                marginRight: '.25rem',
              },
              '&:disabled, &.disabled': {
                pointerEvents: 'none',
                backgroundColor: 'var(--color-disabled)',
                cursor: 'default',
              },
              '&.small': {
                backgroundColor: 'transparent',
                border: '1px solid var(--color-gray)',
                color: 'var(--color-gray)',
                fontSize: 10,
                height: 25,
              },
            },
            '.buttonCancel': {
              marginRight: '1rem',
              display: 'flex',
              alignItems: 'center',
            },
            '.postControls': {
              display: 'flex',
              flexDirection: 'row',
              marginTop: '.8rem',
              '&.disabled': {
                '.buttonCompact': {
                  color: 'var(--color-bg)',
                  backgroundColor: 'var(--color-disabled)',
                  cursor: 'default',
                  pointerEvents: 'none',
                },
              },
              '.controlsConfirm': {
                marginLeft: '1rem',
                textTransform: 'uppercase',
                '.confirmLink': {
                  color: 'var(--color-heading)',
                  fontFamily: 'var(--font-primary)',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                  '&.close': {
                    '&:after': {
                      content: '"•"',
                      marginLeft: '.5rem',
                    },
                  },
                  '&.delete': {
                    color: 'var(--color-warning)',
                    marginLeft: '.5rem',
                  },
                },
              },
            },
            '.deleteControlsWrapper': {
              display: 'flex',
              flexDirection: 'column',
              '.deleteControls': {
                flexDirection: 'row',
              },
            },
            '.postDraft': {
              margin: '.5rem 0 .5rem',
              padding: '1rem 1rem 0 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              border: '1px solid var(--color-accent)',
              borderRadius: 6,
              '.draftInfo': {
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'right',
                '.label': {
                  marginBottom: '.2rem',
                  alignSelf: 'right',
                  color: 'var(--color-gray)',
                  fontSize: 12,
                  fontStyle: 'italic',
                },
              },
              '@media (max-width: 480px)': {
                padding: '1rem',
                'h2 a': {
                  fontSize: 22,
                },
              },
              '.blog.postTeaser': {
                margin: '0 .5rem 0 0',
                h2: {
                  fontSize: 20,
                },
                'p.teaser': {
                  fontSize: 14,
                },
              },
            },
            '.noDrafts': {
              marginTop: '6rem',
            },
          }}
        />
      ) : null}
      {isLoggedIn && (
        <div css={styleAnimationWrapper}>
          <nav css={styleAdminPanel}>
            <AdminPanel />
          </nav>
        </div>
      )}
    </>
  );
};

export default BlogAdmin;
