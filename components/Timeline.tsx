import { FC, Key } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import TimelineEntry from '@/components/TimelineEntry';
import { TimelineTypes } from '@/types/about';

type TimelineProps = TimelineTypes;

const Timeline: FC<TimelineProps> = ({ timeline }) => {
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: '0% 0% -32% 0%',
    triggerOnce: false,
  });

  const styleTimelineHeading = css({
    paddingBottom: '1.5rem',
    '@media (max-width: 768px)': {
      marginTop: 0,
    },
  });
  const styleTimelineWrapper = css({
    paddingTop: '2rem',
    paddingBottom: '6rem',
    position: 'relative',
    '.readMoreLink': {
      fontSize: 20,
      marginTop: '4rem',
      paddingBottom: '2rem',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'var(--font-tertiary)',
      fontStyle: 'italic',
      '&.active': {
        animation: 'fadeIn 1s forwards',
      },
      '&:not(.active)': {
        animation: 'fadeOut .5s forwards',
      },
      '@media (max-width: 480px)': {
        marginTop: '3.8rem',
        fontSize: 18,
      },
    },
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    '@keyframes fadeOut': {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    '@keyframes growDown': {
      from: {
        transform: 'translate3d(0, -100%, 0)',
      },
      to: { transform: 'translate3d(0, 0, 0)' },
    },
    '@keyframes growUp': {
      from: {
        height: '100%',
        transform: 'translate3d(0, 0, 0)',
      },
      to: { transform: 'translate3d(0, -100%, 0)' },
    },
  });
  const styleTimeline = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    overflow: 'hidden',
    paddingTop: 6,
    fontFamily: 'var(--font-tertiary)',
    '.timeline': {
      '&:nth-of-type(even), &:nth-of-type(odd)': {
        '.event': {
          maxWidth: 345,
          h3: {
            marginBottom: '.5rem',
            fontFamily: 'var(--font-secondary)',
            fontSize: 15,
            fontWeight: 400,
          },
          '@media(max-width: 480px)': {
            boxShadow: 'none',
            background: 'none',
          },
        },
      },
      '&:nth-of-type(odd)': {
        padding: '0 2rem 0 0',
        zIndex: 2,
        position: 'relative',
        justifySelf: 'flex-end',
        borderRight: '2px solid var(--color-accent)',
        '.scrollHighlight': {
          position: 'absolute',
          top: 0,
          right: -2,
          width: 2,
          animation: 'growUp .8s',
          background: 'var(--color-text)',
          '@media (max-width: 1024px)': {
            animation: 'growUp .5s',
          },
        },
        '&.active': {
          '.scrollHighlight': {
            height: '100%',
            background: 'var(--color-text)',
            animation: 'growDown 1s',
            '@media (max-width: 1024px)': {
              animation: 'growUp .5s',
            },
          },
        },
        '&:after': {
          fontFamily: 'var(--font-primary)',
          position: 'absolute',
          top: -32,
          right: -15.5,
          content: '"•"',
          fontSize: 48,
          color: 'var(--color-text)',
          '@media(max-width: 768px)': {
            position: 'absolute',
            right: -15.8,
            top: -32.8,
          },
        },
        '.event': {
          borderTopRightRadius: 0,
          '&:before': {
            top: 9,
            right: -22,
            borderLeft: '12px solid transparent',
            borderRight: '20px solid var(--color-accent)',
            transform: 'rotateY(0deg) rotate(270deg)',
            '@media(max-width: 480px)': {
              border: 'none',
            },
          },
          '@media(max-width: 480px)': {
            paddingLeft: 0,
            textAlign: 'right',
          },
        },
        '@media(max-width: 480px)': {
          padding: '0',
          '.date': {
            marginRight: '1rem',
            marginTop: '-.2rem',
          },
        },
      },
      '&:nth-of-type(even)': {
        padding: '0 0 0 2rem',
        zIndex: 1,
        justifySelf: 'flex-start',
        '.event': {
          position: 'relative',
          borderTopLeftRadius: 0,
          '&:before': {
            zIndex: 3,
            top: 9,
            left: -22,
            borderLeft: '20px solid var(--color-accent)',
            borderRight: '12px solid transparent',
            transform: 'rotateY(0deg) rotate(90deg)',
            '@media(max-width: 480px)': {
              border: 'none',
            },
          },
          '&:after': {
            zIndex: 2,
            position: 'absolute',
            top: 10,
            left: -23,
            content: '""',
            borderRight: '12px solid transparent',
            borderBottom: '12px solid transparent',
            transform: 'rotateY(0deg) rotate(90deg)',
            '@media(max-width: 480px)': {
              border: 'none',
            },
          },
          '@media(max-width: 480px)': {
            padding: '0 0 0 1rem',
          },
        },
        '@media(max-width: 480px)': {
          padding: 0,
          '.date': {
            marginLeft: '1rem',
            marginTop: '-.2rem',
          },
        },
      },
      '.date': {
        color: 'var(--color-primary)',
        fontFamily: 'var(--font-tertiary)',
        fontStyle: 'italic',
        fontSize: 24,
        letterSpacing: 2,
        lineHeight: '.5rem',
        '@media (max-width: 768px)': {
          fontSize: 18,
        },
      },
      '.event': {
        backgroundColor: 'var(--color-accent)',
        position: 'relative',
        marginBottom: '4rem',
        padding: '2rem',
        border: '1px solid var(--color-accent)',
        borderRadius: 10,
        fontSize: 13,
        lineHeight: '1rem',
        fontFamily: 'var(--font-secondary)',
        span: {
          color: 'var(--color-gray)',
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 10,
          width: 0,
          height: 0,
          borderBottom: '12px solid transparent',
        },
        '@media(max-width: 768px)': {
          padding: '1.5rem',
        },
        '@media(max-width: 480px)': {
          border: 'none',
          marginBottom: '4rem',
          padding: '0 1rem 0 0',
        },
      },
    },
    '@media (max-width: 768px)': {
      paddingTop: 7,
    },
  });

  interface Items {
    map: Function;
  }

  interface Item {
    cName: string;
    title: string;
    content: string;
  }

  const generateTimeline: Function = (items: Items) => {
    return items.map(({ cName, title, content }: Item, i: Key) => (
      <TimelineEntry key={i} cName={cName} title={title} content={content} />
    ));
  };

  return (
    <section>
      <h2 css={styleTimelineHeading} className="pageHeading center">
        {timeline.meta.title}
      </h2>
      <div css={styleTimelineWrapper}>
        <div css={styleTimeline}>{generateTimeline(timeline.items)}</div>
        <div
          ref={ref}
          className={inView ? 'readMoreLink active' : 'readMoreLink'}
        >
          <Link href={timeline.fullStory.link}>{timeline.fullStory.text}</Link>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
