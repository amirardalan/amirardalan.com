import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';

import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { css } from '@emotion/react';
import { useFetchStatus } from '@/hooks/useLoadingIndicator';
import { useLikeButton } from '@/hooks/useLikeButton';

import Container from '@/components/Container';
import BlogStyles from '@/components/BlogStyles';
import LoadingTriangle from '@/components/LoadingTriangle';
import BlogNavigation from '@/components/BlogNavigation';
import Markdown from '@/components/Markdown';

import calculateReadTime from '@/utils/calculateReadTime';
import formatDate from '@/utils/formatDate';
import { blogPostContent, adminContent } from '@/data/content';
import { PostProps } from '@/types/post';
import { AdminControlsTypes } from '@/types/admin';
import { BlogNavigationTypes } from '@/types/blog';
import LikeButton from '@/components/LikeButton';
import BlogPostTweet from '@/components/BlogPostTweet';
import TableOfContents from '@/components/TableOfContents';
import BlogPostStats from '@/components/BlogPostStats';
import Tooltip from '@/components/Tooltip';

const prisma = new PrismaClient();

const BlogPostControls = dynamic(
  () => import('@/components/BlogPostControls'),
  { ssr: false }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const feed = await prisma.post.findMany({ where: { published: true } });
  const paths = feed.map((post) => ({ params: { slug: post.slug as string } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [post, feed] = await prisma.$transaction([
    prisma.post.findFirst({
      where: { slug: String(params?.slug) },
      include: {
        author: { select: { name: true } },
        postHistory: { orderBy: { editedAt: 'desc' }, take: 2 },
      },
    }),
    prisma.post.findMany({
      where: { published: true },
    }),
  ]);
  if (post) {
    return {
      props: {
        blogPost: blogPostContent,
        admin: adminContent,
        post: JSON.parse(JSON.stringify(post)),
        feed: JSON.parse(JSON.stringify(feed)),
      },
    };
  } else {
    return { notFound: true };
  }
};

interface BlogPostProps extends AdminControlsTypes, BlogNavigationTypes {
  blogPost?: {
    meta?: {
      title?: string;
    };
  };
  post: PostProps;
}

const BlogPost: FC<BlogPostProps> = ({ blogPost, admin, post, feed }) => {
  const { data: session } = useSession();
  const userHasValidSession = Boolean(session);

  const isPublished: Boolean = post.published;
  const publishLabel = isPublished
    ? admin.controls.unpublish
    : admin.controls.publish;
  const displayPost =
    isPublished ||
    (session && session?.user?.email === process.env.NEXT_PUBLIC_USER_EMAIL);

  const isFeatured = post.featured;
  const latestPostID = feed.length > 1 ? feed[feed?.length - 1].id : feed[0];
  const latestPost = latestPostID === post.id;

  const isEdited =
    post.editedAt?.toString().slice(0, 10) >
    post.publishedAt?.toString().slice(0, 10);
  const showEdited = post.showEdited;
  const publishDate = formatDate(post.publishedAt);
  const editDate = formatDate(post?.editedAt);
  const prevEditDate = post?.postHistory[0]
    ? formatDate(post?.postHistory[0]?.editedAt)
    : null;
  const postReadTime = calculateReadTime(post.content);
  const title = post.title;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;

  const [fetchStatus, setFetchStatus] = useFetchStatus();
  const isFetching = fetchStatus;

  const [liked, handleLike] = useLikeButton(post.id, post.title);

  // Set OG Image for blog posts. Use first image from post, otherwise dynamically generate one.
  const metaImage = post.content
    .replace(/`([^`]*)/g, '')
    .match(/!\[.*?\]\((.*?)\)/)
    ? post.content.match(/!\[.*?\]\((.*?)\)/)?.[1]
    : null;

  const RenderBlogPost = () => {
    const HEADING_FONT_SIZE = 32;

    const styleBlogPost = css({
      padding: '0 2rem',
      '.likeAndShare': {
        display: 'flex',
        margin: '.25rem 0 0 0',
      },
      '.postFull': {
        '.blogPostStats': {
          margin: '4rem 0 1.5rem',
          a: {
            margin: 0,
            padding: 0,
            lineHeight: '1.1rem',
            fontFamily: 'var(--font-secondary)',
            fontSize: 11,
          },
          '.postStatsDivider': {
            margin: '.1rem 1rem 0 1rem',
          },
          '@media (max-width: 768px)': {
            margin: '1.5rem 0 2rem',
          },
        },
        'h1, h2': {
          display: 'inline-block',
          fontSize: 42,
        },
        h1: {
          margin: '0 0 .8rem',
          textDecoration: 'none',
          lineHeight: '3.4rem',
          fontWeight: 600,
          '@media(max-width: 1024px)': {
            margin: '0 0 .5rem',
          },
          '@media(max-width: 768px)': {
            fontSize: 42,
            lineHeight: '2.8rem',
          },
          '@media(max-width: 600px)': {
            fontSize: 32,
            lineHeight: '2.2rem',
          },
        },
        '.teaser': {
          fontFamily: 'var(--font-tertiary)',
          fontSize: 22,
          fontStyle: 'italic',
          lineHeight: '1.5rem',
          color: 'var(--color-gray)',
          '@media(max-width: 1024px)': {
            fontSize: 18,
          },
        },
        '.info': {
          margin: '.5rem 0 3rem',
          fontSize: 13,
          textTransform: 'uppercase',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          '@media (max-width: 768px)': {
            marginBottom: 0,
            paddingBottom: '2rem',
          },
          '@media(max-width: 480px)': {
            fontSize: 13,
            a: {
              fontSize: 13,
            },
            time: {
              fontSize: 12,
              '&:before': {
                margin: '0 0.25rem',
                content: '"•"',
              },
            },
          },
          '.authorAndDate, .authorAndDate a, .authorAndDate span time': {
            fontFamily: 'var(--font-secondary)',
            fontSize: 12,
            '@media(max-width: 360px)': {
              fontSize: 11,
            },
          },
          a: {
            margin: 0,
            paddingLeft: '.25rem',
            fontFamily: 'var(--font-primary)',
            fontSize: 14,
          },
          time: {
            fontFamily: 'var(--font-primary)',
            fontSize: 14,
            '&:before': {
              margin: '0 0.5rem',
              content: '"•"',
            },
          },
        },
        '.readerControls': {
          position: 'relative',
          margin: '.5rem 0 2rem',
          '.likeAndShare': {
            position: 'absolute',
            top: 0,
            right: 0,
          },
          ol: {
            margin: 0,
            paddingTop: '.5rem',
          },
        },
        'h3, h3 code': {
          fontSize: HEADING_FONT_SIZE,
          '@media(max-width: 768px)': {
            fontSize: 24,
          },
        },
        h3: {
          scrollMarginTop: '4rem',
          margin: '1rem 0 1.5rem',
          padding: 0,
          display: 'inline-block',
          fontWeight: 600,
          '& code': {
            fontFamily: 'var(--font-secondary)',
            background: 'transparent',
          },
          a: {
            fontFamily: 'var(--font-secondary)',
            textDecoration: 'none',
            color: 'var(--color-heading)',
            fontSize: HEADING_FONT_SIZE,
            '&:hover': {
              '&::before': {
                fontWeight: 400,
                content: '"#"',
                color: 'var(--color-accent-gray)',
                position: 'absolute',
                textAlign: 'center',
                top: 11,
                left: -28,
                fontSize: HEADING_FONT_SIZE,
              },
            },
            '@media (max-width: 768px)': {
              fontSize: 24,
            },
          },
          '@media(hover: none)': {
            a: {
              pointerEvents: 'none',
              '&:hover:before': {
                content: '""',
              },
            },
          },
        },
        'h1, h2, h3, h3, h4, h5, h6': {
          position: 'relative',
        },
        'p, ul, li, a': {
          fontFamily: 'var(--font-tertiary)',
          fontSize: 18,
          lineHeight: '1.8rem',
        },
        'ul, li, a': {
          marginBottom: '1rem',
        },
        'ul li, ol li, p, .note': {
          a: {
            color: 'var(--color-text)',
            textDecoration: 'underline',
            '&:hover': {
              color: 'var(--color-primary)',
            },
          },
        },
        'p,': {
          marginBottom: '2rem',
        },
        '.note': {
          position: 'relative',
          margin: '3rem 0',
          padding: '2.8rem 1.5rem 1rem 1.5rem',
          border: '1px solid var(--color-accent-lighter)',
          borderRadius: 10,
          fontFamily: 'var(--font-secondary)',
          color: 'var(--color-gray)',
          lineHeight: '1.5rem',
          '&:before, &:after': {
            position: 'absolute',
            lineHeight: '2rem',
          },
          '&:before': {
            content: '""',
            top: 19,
            left: 22,
            width: 14,
            height: 14,
            background: 'var(--icon-info) no-repeat',
            backgroundSize: 'contain',
            lineHeight: '2rem',
            '@media (max-width: 768px)': {
              top: 19,
            },
          },
          '&:after': {
            content: '"Note:"',
            top: 13,
            left: 43,
            letterSpacing: 1,
            lineHeight: '1.65rem',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-secondary)',
            fontWeight: 400,
            fontSize: 12,
          },
          a: {
            fontFamily: 'var(--font-secondary)',
            fontSize: 14.5,
          },
          code: {
            fontSize: 13,
            '@media (max-width: 768px)': {
              padding: '.05rem .05rem !important',
              margin: '0 !important',
              lineHeight: '.5rem !important',
            },
          },
          '&.tip': {
            '&:after': {
              content: '"Tip:"',
            },
          },
          '&.example': {
            '&:after': {
              content: '"Example:"',
            },
          },
          '&.warn': {
            '&:after': {
              content: '"Warning:"',
              color: 'var(--color-warning)',
            },
          },
          '@media (max-width: 768px)': {
            code: {
              fontSize: 12,
            },
            marginTop: '1.5rem',
            lineHeight: '1.4rem',
          },
        },
        blockquote: {
          margin: '2.5rem -1.5rem',
          padding: '0 2rem',
          borderLeft: '3px solid var(--color-gray)',
          color: 'var(--color-gray)',
          'p, a': {
            marginBottom: 0,
            fontSize: 20,
            fontStyle: 'italic',
          },
          '& blockquote': {
            marginLeft: '1rem',
            borderLeft: '3px solid var(--color-accent-lighter)',
          },
        },
        ul: {
          marginBottom: '2rem',
        },
        'ul li': {
          listStyle: 'outside',
          margin: '0 0 .5rem 1rem',
          paddingLeft: '.5rem',
          '&.task-list-item': {
            fontSize: 15,
            fontWeight: 'bold',
          },
          'input[type="checkbox"]': {
            marginTop: '-.1rem',
          },
          '@media (max-width: 480px)': {
            marginLeft: '1.5rem',
          },
        },
        'ul.contains-task-list': {
          li: {
            '&:first-of-type': {
              fontFamily: 'var(font-secondary)',
            },
            listStyle: 'none',
            margin: 0,
            padding: 0,
          },
        },
        ol: {
          counterReset: 'counter',
          margin: '2rem 0',
          li: {
            counterIncrement: 'counter',
            marginLeft: '2rem',
            paddingLeft: '.5rem',
            position: 'relative',
            '&::before': {
              content: 'counter(counter)',
              width: '1.3rem',
              height: '1.3rem',
              position: 'absolute',
              top: '.25rem',
              left: '-2rem',
              border: '1px solid var(--color-gray)',
              borderRadius: '50%',
              color: 'var(--color-gray)',
              fontFamily: 'var(--font-primary)',
              fontSize: '.7rem',
              lineHeight: '1.3rem',
              textAlign: 'center',
              '@media not all and (min-resolution:.001dpcm)': {
                '@supports (-webkit-appearance:none)': {
                  paddingLeft: '.1rem',
                },
              },
            },
          },
          '@media (max-width: 480px)': {
            marginLeft: '.1rem',
          },
        },
      },
      '.postImgWrapper': {
        paddingBottom: '2rem',
        img: {
          width: '100%',
          height: 'auto',
        },
      },
      '.caption, .caption a': {
        paddingTop: '.25rem',
        fontFamily: 'var(--font-secondary)',
        fontSize: 10,
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: 'var(--color-gray)',
      },
      '@media (max-width: 1024px)': {
        padding: '0 2.5rem',
      },
      '@media (max-width: 768px)': {
        padding: '0 2.5rem',
      },
      '@media (max-width: 600px)': {
        padding: '0 2rem',
      },
    });

    return (
      <div className={isPublished ? 'blog' : 'blog admin'} css={styleBlogPost}>
        {!isPublished && (
          <div className="draftNotification warn">{admin.drafts.notice}</div>
        )}

        <article className="post postFull">
          <BlogPostStats post={post} isFeatured={isFeatured} />
          <h1 aria-label={`${title}`}>{title}</h1>
          <p className="teaser">{post.teaser}</p>
          <div
            className="postDetails"
            aria-label={
              isEdited
                ? `${editDate} • ${postReadTime}`
                : `${publishDate} • ${postReadTime}`
            }
          >
            <div className="info">
              <div className="authorAndDate">
                By
                <a
                  href="https://x.com/amirardalan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="@amirardalan on x.com"
                >
                  {post?.author?.name || 'Unknown'}
                </a>
                <span className="date">
                  {showEdited ? (
                    <time dateTime={post.editedAt.toString()}>
                      Updated: {editDate}
                    </time>
                  ) : (
                    <time
                      dateTime={
                        post.postHistory[0]?.editedAt.toString() ||
                        post.publishedAt.toString()
                      }
                    >
                      {prevEditDate ? 'Updated: ' : null}
                      {prevEditDate || publishDate}
                    </time>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="readerControls">
            <TableOfContents markdown={post.content} />
            <div className="likeAndShare">
              <div className="buttonHover">
                <Tooltip pos="t" text={liked ? 'Unlike' : 'Like'}>
                  <LikeButton liked={liked} handleLike={handleLike} />
                </Tooltip>
              </div>
              <div className="buttonHover">
                <Tooltip pos="t" text="Share on X">
                  <BlogPostTweet
                    title={post.title}
                    url={url}
                    text={false}
                    size={21}
                    color={'var(--color-heading)'}
                  />
                </Tooltip>
              </div>
            </div>
          </div>

          <Markdown markdown={post} />
          {userHasValidSession && (
            <BlogPostControls
              admin={admin}
              post={post}
              latestPost={latestPost}
              publishLabel={publishLabel}
              requiredFields={undefined}
              submitClass="buttonCompact publishBtn"
              handleCancel={undefined}
              deleted={false}
              setFetchStatus={setFetchStatus}
              isFetching={isFetching}
            />
          )}
        </article>

        <BlogNavigation
          feed={feed}
          post={post}
          url={url}
          isPublished={isPublished}
          liked={liked}
          handleLike={handleLike}
        />
      </div>
    );
  };

  return (
    <Container
      title={title + blogPost?.meta?.title}
      description={post?.teaser}
      image={metaImage}
      date={publishDate}
      robots={isPublished ? 'follow, index' : 'noindex'}
    >
      <BlogStyles>
        {displayPost ? <RenderBlogPost /> : <LoadingTriangle />}
      </BlogStyles>
    </Container>
  );
};

export default BlogPost;
