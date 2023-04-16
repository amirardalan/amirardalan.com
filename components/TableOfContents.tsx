import React, { type FC, useState } from 'react';
import generateSlug from '@/utils/generateSlug';
import { css } from '@emotion/react';

type TableOfContentsProps = {
  markdown: string;
};

const TableOfContents: FC<TableOfContentsProps> = ({ markdown }) => {
  const headings = markdown.match(/###\s.*\n/g);

  const [showTOC, setShowTOC] = useState(false);
  const handleShowTOC = () => setShowTOC(!showTOC);

  const styleTOC = css({
    paddingTop: '1rem',
    button: {
      height: 16,
      margin: 0,
      padding: 0,
    },
    summary: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--color-text)',
      marginBottom: showTOC ? '1rem' : 0,
      '.icon': {
        marginRight: '1rem',
      },
    },
    'ol.tableOfContents': {
      marginTop: '1rem',
      marginBottom: 0,
      li: {
        margin: '.3rem 0 0 2rem',
        lineheight: '.1rem !important',
      },
    },
  });

  return (
    <div css={styleTOC}>
      <div className="note contents">
        <button onClick={handleShowTOC} aria-label="Table of Contents">
          <summary>
            <span className="icon">{showTOC ? '▽ ' : '▷ '}</span> Table of
            Contents:
          </summary>
        </button>
        {showTOC ? (
          <ol className="tableOfContents">
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
        ) : null}
      </div>
    </div>
  );
};

export default TableOfContents;
