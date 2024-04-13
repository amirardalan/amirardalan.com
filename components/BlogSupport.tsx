import { FC, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import CloseButton from '@/components/CloseIcon';
import LikeButton from '@/components/LikeButton';
import { gtagEvent } from '@/lib/gtag';
import BlogPostTweet from '@/components/BlogPostTweet';

type BlogSupportProps = {
  id: number;
  title: string;
  url: string;
  liked: boolean;
  handleLike: () => Promise<void>;
};

const BlogSupport: FC<BlogSupportProps> = ({
  id,
  title,
  url,
  liked,
  handleLike,
}) => {
  const [hideModule, setHideModule] = useState(false);
  const [showOptions, setshowOptions] = useState(false);
  const handleshowOptions = () => {
    setshowOptions(!showOptions);
    gtagEvent({
      action: 'support',
      category: 'post',
      label: `Post ${title} (ID: ${id})`,
    });
  };
  const handleHideModule = () => {
    setHideModule(!showOptions);
    if (showOptions) {
      setshowOptions(false);
    }
  };

  const styleSupportModule = css({
    width: '100%',
    position: 'relative',
    marginBottom: '3.5rem',
    border: '1px solid var(--color-accent-lighter)',
    borderRadius: '5px',
    color: 'var(--color-gray)',
    '.closeBtn': {
      zIndex: 3,
      display: showOptions ? 'inline-block' : 'none',
      cursor: 'pointer',
      border: '10px solid var(--color-bg)',
      borderRadius: 50,
      height: 40,
      position: 'absolute',
      top: -15,
      right: -15,
      animation: 'spin .5s ease',
    },
    '.animationWrapper': {
      position: 'relative',
      height: 160,
      width: '100%',
      overflow: 'hidden',
      '@media(max-width: 480px)': {
        height: 112,
      },
    },
    '.supportContainer': {
      width: '100%',
      position: 'absolute',
      top: showOptions ? -160 : 0,
      transition: 'top .5s ease',
      '@media(max-width: 480px)': {
        top: showOptions ? -112 : 0,
      },
      '.supportContent': {
        width: '100%',
        display: 'flex',
        position: 'relative',
        padding: '2.7rem',
        '@media(max-width: 480px)': {
          padding: '1.5rem 2rem',
        },
      },
      '.supportOptions': {
        display: 'flex',
        flexDirection: 'column',
        margin: '2.5rem',
        '@media (max-width: 480px)': {
          margin: '1.6rem 2rem',
        },
        '.paymentMethods': {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          'a:hover::before': {
            height: 32,
            width: 4,
            position: 'absolute',
            left: -14,
            content: '""',
            borderLeft: '4px solid var(--color-primary)',
            '@media (max-width: 480px)': {
              content: 'none',
            },
          },
          '.cashapp': {
            marginBottom: '1.5rem',
            '@media (max-width: 480px)': {
              marginBottom: '.2rem',
            },
          },
          '.paypal': {
            '@media (max-width: 480px)': {
              marginBottom: '.5rem',
            },
          },
          '.paymentName': {
            marginLeft: '1rem',
            verticalAlign: 'top',
            '@media (max-width: 480px)': {
              marginLeft: '.5rem',
            },
          },
          '.copyConfirmation': {
            display: 'flex',
            flexDirection: 'column',
            button: {
              lineHeight: '1rem',
              textAlign: 'left',
              paddingTop: '2rem',
              paddingBottom: '1rem',
            },
            p: {
              lineHeight: '1rem',
            },
            '@media (max-width: 980px)': {
              marginLeft: '2rem',
              button: {
                paddingTop: '2.8rem',
              },
            },
            '@media (max-width: 480px)': {
              button: {
                paddingTop: '2.5rem',
              },
            },
          },
          '@media (max-width: 480px)': {
            marginTop: '1rem',
            flexDirection: 'row',
            justifyContent: 'space-around',
          },
        },
      },
    },
    '.donate': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: 16,
      span: {
        marginRight: '.5rem',
        '@media (max-width: 480px)': {
          marginRight: 2,
        },
      },
      button: {
        display: 'flex',
        '&:last-of-type': {
          marginLeft: '1.5rem',
        },
        '@media (max-width: 480px)': {
          fontSize: 12,
          lineHeight: '.9rem',
        },
      },
    },
    '.copyContainer': {
      '.supportHeading': {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'row',
        '@media (max-width: 480px)': {
          marginBottom: '.5rem',
        },
      },
      h4: {
        fontFamily: 'var(--font-secondary)',
        fontWeight: 400,
        fontSize: 28,
        marginTop: '.08rem',
        marginRight: '1rem',
        '@media (max-width: 768px)': {
          fontSize: 22,
        },
        '@media (max-width: 480px)': {
          fontSize: 15,
        },
      },
      p: {
        fontSize: 14,
        margin: 0,
        padding: 0,
      },
    },
    button: {
      background: 'transparent',
      border: 'none',
      '&:focus': {
        boxShadow: '0 0 0 2px var(--color-accent-gray)',
        '&:focus:not(:focus-visible)': { boxShadow: 'none' },
      },
    },
  });

  return (
    <div css={styleSupportModule}>
      <button className="closeBtn" onClick={handleHideModule}>
        <CloseButton size={20} />
      </button>

      <div className="animationWrapper">
        <div className="supportContainer">
          <div className="supportContent">
            <div className="left">
              <div className="copyContainer">
                <span className="supportHeading">
                  <h4>Enjoy this post? Show some love:</h4>
                  <LikeButton liked={liked} handleLike={handleLike} />
                </span>
                <div className="donate">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      fill="var(--color-text)"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.874 6.999c4.737-4.27-.979-4.044.116-6.999-3.781 3.817 1.41 3.902-.116 6.999zm-2.78.001c3.154-2.825-.664-3.102.087-5.099-2.642 2.787.95 2.859-.087 5.099zm8.906 2.618c-.869 0-1.961-.696-1.961-1.618h-10.039c0 .921-1.13 1.618-2 1.618v1.382h14v-1.382zm-13 2.382l2.021 12h7.959l2.02-12h-12z" />
                    </svg>
                  </span>
                  <button
                    onClick={handleshowOptions}
                    title="Buy me a coffee"
                    aria-label="Buy me a coffee"
                  >
                    Buy me a coffee
                  </button>
                  <BlogPostTweet
                    title={title}
                    url={url}
                    text={true}
                    size={19}
                    color={'var(--color-text)'}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="supportOptions">
            <div className="paymentMethods">
              <a
                href="https://cash.app/$AmirArdalan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  gtagEvent({
                    action: 'click_link',
                    category: 'external_link',
                    label: 'cash.app',
                  })
                }
              >
                <div className="cashapp">
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 534 534"
                    fill="var(--color-text)"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M456.667 9.16667C427.5 0 400.833 0 347.5 0H185.833C132.5 0 105.833 0 76.6667 9.16667C61.1829 14.8308 47.1215 23.805 35.4632 35.4632C23.805 47.1215 14.8308 61.1829 9.16667 76.6667C0 105.5 0 132.333 0 185.833V347.417C0 400.833 0 427.5 9.16667 456.667C14.8308 472.15 23.805 486.212 35.4632 497.87C47.1215 509.528 61.1829 518.503 76.6667 524.167C105.5 533.333 132.333 533.333 185.833 533.333H347.5C400.833 533.333 427.5 533.333 456.667 524C472.15 518.336 486.212 509.362 497.87 497.703C509.528 486.045 518.503 471.984 524.167 456.5C533.333 427.667 533.333 400.833 533.333 347.333V185.917C533.333 132.5 533.333 105.833 524.167 76.6667C518.503 61.1829 509.528 47.1215 497.87 35.4632C486.212 23.805 472.15 14.8308 456.667 9.16667ZM368.917 198.333C365 202.5 358.084 202.5 353.917 198.334L354.083 198.5C336.5 182.667 309.583 171.083 281.583 171.083C259.583 171.083 237.667 179.083 237.667 199.25C237.667 218.44 257.766 225.798 282.276 234.772C284.269 235.502 286.291 236.242 288.333 237C335.833 253.417 375 273.583 375 321.417C375 373.333 335.667 408.917 271.1 413.25L265.267 441.5C264.764 444 263.41 446.247 261.433 447.859C259.457 449.47 256.983 450.345 254.433 450.333L214.017 450C207.1 449.917 202.017 443.5 203.433 436.583L209.6 406.833C184.333 399.917 162.167 387.417 144.667 370.167C142.55 368.042 141.361 365.166 141.361 362.167C141.361 359.168 142.55 356.291 144.667 354.167L167.167 331.667C168.173 330.659 169.368 329.859 170.683 329.314C171.999 328.768 173.409 328.487 174.833 328.487C176.258 328.487 177.668 328.768 178.983 329.314C180.299 329.859 181.494 330.659 182.5 331.667C204.167 353.417 232.167 362.333 258.833 362.333C288.167 362.333 308 350.167 308 329.417C308 311.186 291.724 305.078 260.835 293.484C257.554 292.253 254.108 290.96 250.5 289.583C210.75 275.333 173.167 254.583 173.167 206.25C173.167 150.417 218.667 123.167 272.333 120.417L278.167 92.2501C278.663 89.7783 279.994 87.552 281.935 85.944C283.877 84.336 286.312 83.4438 288.833 83.4167H329.167C336.083 83.4167 341.25 89.9167 339.833 96.8334L333.25 128.5C353.846 135.365 372.879 146.241 389.25 160.5C393.917 165 394.167 172.5 389.75 176.667L368.917 198.333Z"
                    />
                  </svg>
                  <span className="paymentName">Cash App</span>
                </div>
              </a>
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=PDSXCAVYMLW2G"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  gtagEvent({
                    action: 'click_link',
                    category: 'external_link',
                    label: 'paypal.com',
                  })
                }
              >
                <div className="paypal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                    fill="var(--color-text)"
                  >
                    <path d="M22 9.761c0 .536-.065 1.084-.169 1.627-.847 4.419-3.746 5.946-7.449 5.946h-.572c-.453 0-.838.334-.908.789l-.803 5.09c-.071.453-.456.787-.908.787h-2.736c-.39 0-.688-.348-.628-.732l1.386-8.88.062-.056h2.155c5.235 0 8.509-2.618 9.473-7.568.812.814 1.097 1.876 1.097 2.997zm-14.216 4.252c.116-.826.459-1.177 1.385-1.179l2.26-.002c4.574 0 7.198-2.09 8.023-6.39.8-4.134-2.102-6.442-6.031-6.442h-7.344c-.517 0-.958.382-1.038.901-2.304 14.835-2.97 18.607-3.038 19.758-.021.362.269.672.635.672h3.989l1.159-7.318z" />
                  </svg>
                  <span className="paymentName">PayPal</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSupport;
