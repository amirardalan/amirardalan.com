import { FC, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import CloseButton from '@/components/CloseIcon';
import LikeButton from '@/components/LikeButton';
import { donate } from '@/data/content';
import { gtagEvent } from '@/lib/gtag';
import BlogPostTweet from '@/components/BlogPostTweet';

type BlogSupportProps = {
  id: number;
  title: string;
  url: string;
};

const BlogSupport: FC<BlogSupportProps> = ({ id, title, url }) => {
  const [hideModule, setHideModule] = useState(false);
  const [showOptions, setshowOptions] = useState(false);
  const handleshowOptions = () => {
    setshowOptions(!showOptions);
    gtagEvent({
      action: 'support',
      category: 'post',
      label: `Post ${title} (ID: ${id})`,
    });
    if (addressCopied) {
      setTimeout(() => {
        setAddressCopied(false);
      }, 10);
    }
  };
  const handleHideModule = () => {
    setHideModule(!showOptions);
    if (showOptions) {
      setshowOptions(false);
    }
  };

  const [addressCopied, setAddressCopied] = useState(false);
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(donate.address);
    setAddressCopied(true);
  };

  const styleSupportModule = css({
    width: '100%',
    position: 'relative',
    marginBottom: '3.5rem',
    border: '1px solid var(--color-accent-gray)',
    borderRadius: '5px',
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
        '.optionsHeading': {
          h4: {
            textTransform: 'uppercase',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'normal',
            textAlign: 'center',
            position: 'relative',
            background: 'var(--color-bg)',
            marginTop: '.2rem',
            padding: '0 .75rem',
            height: '100%',
            width: '100%',
            '&:after': {
              zIndex: -1,
              content: '""',
              width: '200%',
              position: 'absolute',
              left: '-50%',
              top: 10,
              borderTop: '1px solid var(--color-accent-gray)',
            },
          },
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
          '.ether, .paypal': {
            display: !addressCopied ? 'flex' : 'none',
          },
          '.ether': {
            background: 'var(--icon-eth) no-repeat',
            backgroundSize: 'contain',
            height: 33,
            width: 133,
            marginBottom: '1rem',
            '@media (max-width: 480px)': {
              width: 110,
              marginBottom: '.2rem',
            },
          },
          '.paypal': {
            background: 'var(--icon-paypal) no-repeat',
            backgroundSize: 'contain',
            height: 30,
            width: 114,
            '@media (max-width: 480px)': {
              width: 110,
              marginBottom: '.5rem',
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
          '.qrCode': {
            marginTop: 4,
            '@media (max-width: 600px)': {
              display: 'none',
            },
          },
          '.ethAddressCopied': {
            zIndex: 3,
            background: 'var(--color-bg)',
            display: addressCopied ? 'flex' : 'none',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            top: -28,
            left: -25,
            width: '100%',
            alignItems: 'center',
            '.ethAddress': {
              fontFamily: 'var(--font-secondary)',
              fontSize: 35,
              color: 'var(--color-primary)',
              marginBottom: 5,
              width: '100%',
            },
            '.successMessage': {
              fontSize: 12,
              fontFamily: 'var(--font-primary)',
            },
            '@media(max-width: 480px)': {
              '.ethAddress': {
                fontSize: 30,
              },
              top: -50,
              left: -35,
            },
          },
          '@media (max-width: 480px)': {
            marginTop: '1rem',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        },
      },
    },
    '.donate': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: 14,
      span: {
        marginRight: '.5rem',
        '@media (max-width: 480px)': {
          marginRight: 2,
        },
      },
      button: {
        display: 'flex',
        textDecoration: 'underline',
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
        fontSize: 22,
        marginTop: '.08rem',
        marginRight: '1rem',
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
        <CloseButton width={20} height={20} />
      </button>

      <div className="animationWrapper">
        <div className="supportContainer">
          <div className="supportContent">
            <div className="left">
              <div className="copyContainer">
                <span className="supportHeading">
                  <h4>Did you enjoy this post?</h4>
                  <LikeButton id={id} title={title} />
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
                    aria-label="Buy me a coffee"
                    onClick={handleshowOptions}
                  >
                    Buy me a coffee
                  </button>
                  <BlogPostTweet title={title} url={url} />
                </div>
              </div>
            </div>
          </div>

          <div className="supportOptions">
            <div className="paymentMethods">
              <div className="ethAddressCopied">
                <div className="qrCode">
                  <Image
                    src="/eth-qr.png"
                    width={131}
                    height={131}
                    alt="amirardalan.eth QR Code"
                  />
                </div>
                <div className="copyConfirmation">
                  <button
                    aria-label="Copy ETH address"
                    className="ethAddress"
                    onClick={handleCopyAddress}
                  >
                    amirardalan.eth
                  </button>
                  <p className="successMessage">Copied to clipboard ✅</p>
                </div>
              </div>

              <a
                onClick={(event) => {
                  handleCopyAddress();
                  event.preventDefault();
                  gtagEvent({
                    action: 'click_link',
                    category: 'internal_link',
                    label: 'copy_address',
                  });
                }}
              >
                <div className="ether" />
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
                <div className="paypal" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSupport;
