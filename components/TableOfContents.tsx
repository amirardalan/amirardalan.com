import { type FC, useState, useRef, useEffect } from 'react';
import { generateSlug } from '@/utils/generateSlug';
import { css } from '@emotion/react';

type TableOfContentsProps = {
  markdown: string;
};

const TableOfContents: FC<TableOfContentsProps> = ({ markdown }) => {
  const headings = markdown.match(/###\s.*\n/g);

  const [showTOC, setShowTOC] = useState(false);
  const handleShowTOC = () => setShowTOC(!showTOC);

  const [maxHeight, setMaxHeight] = useState('0px');

  const ref = useRef(null);

  useEffect(() => {
    if (showTOC && ref.current) {
      setMaxHeight(`${(ref.current as HTMLElement).scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [showTOC]);

  const styleTOC = css({
    ol: {
      transition: 'max-height 0.5s ease, visibility 0.5s',
      maxHeight: maxHeight,
      overflow: 'hidden',
      visibility: 'hidden',
    },
    'ol.open': {
      maxHeight: maxHeight,
      visibility: 'visible',
    },
    '.toc': {
      a: {
        fontSize: 14,
        lineHeight: '1.5rem',
      },
      h4: {
        marginTop: 2,
      },
    },
    summary: {
      display: 'flex',
      alignItems: 'center',
      textTransform: 'uppercase',
      fontSize: 14,
      color: 'var(--color-text)',
      lineHeight: '1rem',
      '.icon': {
        paddingTop: '.25rem',
        marginRight: '1rem',
        marginLeft: '-.1rem',
      },
    },
    button: {
      'svg, .tocTitle': {
        color: 'var(--color-gray)',
        fill: 'var(--color-gray)',
      },
      '@media (min-width: 1025px)': {
        '&:hover': {
          '.tocTitle': {
            color: 'var(--color-primary)',
          },
          svg: {
            fill: 'var(--color-primary)',
          },
        },
      },
    },
    '.tocTitle': {
      fontSize: 12,
      fontWeight: 400,
    },
    'ol.tableOfContents': {
      margin: '.8rem 0 0 0',
      a: {
        fontFamily: 'var(--font-secondary)',
        fontSize: 16,
      },
      li: {
        lineHeight: 'normal',
        marginBottom: '.4rem',
        '&::before': {
          border: '1px solid var(--color-accent-gray)',
          color: 'var(--color-accent-gray)',
          top: '.2rem',
        },
      },
      '@media (max-width: 768px)': {
        a: {
          fontSize: 13,
        },
        li: {
          margin: '.3rem 0 .5rem 2rem',
          paddingLeft: 0,
        },
      },
    },
  });

  return (
    <>
      {headings ? (
        <div css={styleTOC}>
          <div className="toc">
            <button onClick={handleShowTOC} aria-label="Table of Contents">
              <summary>
                <span className="icon">
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    height={24}
                    width={24}
                  >
                    <path
                      d="m3.3 15.4c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7 1.85c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75zm-2.7-6.55c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7 1.3c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75zm-2.7-6c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7.75c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
                      fillRule="nonzero"
                    />
                  </svg>
                </span>{' '}
                <h4 className="tocTitle">Table of Contents</h4>
              </summary>
            </button>
            <ol
              ref={ref}
              className={`tableOfContents ${showTOC ? 'open' : 'closed'}`}
            >
              {headings?.map((heading) => {
                const headingText = heading.replace('### ', '');
                const headingID = generateSlug(headingText);
                return (
                  <li key={headingID}>
                    <a className="tocLink" href={`#${headingID}`}>
                      {headingText}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TableOfContents;
