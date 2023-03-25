import { FC, useState } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import { donate } from '@/data/content';
import CloseButton from '@/components/CloseButton';
import LikeButton from '@/components/LikeButton';

type BlogSupportProps = {
  id: number;
};

const BlogSupport: FC<BlogSupportProps> = ({ id }) => {
  const [hideModule, setHideModule] = useState(false);
  const [showOptions, setshowOptions] = useState(false);
  const handleshowOptions = () => {
    setshowOptions(!showOptions);
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
    },
    '.supportContainer': {
      width: '100%',
      position: 'absolute',
      top: showOptions ? -160 : 0,
      transition: 'top .5s ease',
      '.supportContent': {
        width: '100%',
        display: 'flex',
        position: 'relative',
        padding: '3rem',
        '@media(max-width: 480px)': {
          padding: '3rem 2rem',
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
          position: 'relative',
          'a:hover::before': {
            height: 32,
            width: 4,
            position: 'absolute',
            left: -14,
            content: '""',
            borderLeft: '4px solid var(--color-primary)',
          },
          '.ether': {
            display: 'flex',
            background: 'var(--icon-eth) no-repeat',
            backgroundSize: 'contain',
            height: 33,
            width: 133,
            marginBottom: '1rem',
          },
          '.paypal': {
            display: 'flex',
            background: 'var(--icon-paypal) no-repeat',
            backgroundSize: 'contain',
            height: 30,
            width: 114,
          },
          '.copyConfirmation': {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2.4rem',
            '@media (max-width: 980px)': {
              marginLeft: '2rem',
            },
          },
          '.qrCode': {
            '@media (max-width: 980px)': {
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
            top: -26,
            left: -25,
            width: '100%',
            alignItems: 'center',
            '.ethAddress': {
              fontFamily: 'var(--font-secondary)',
              fontSize: 35,
              color: 'var(--color-primary)',
              marginBottom: 5,
            },
            '.successMessage': {
              fontSize: 12,
              fontFamily: 'var(--font-primary)',
            },
            '@media(max-width: 480px)': {
              top: -12,
            },
          },
        },
      },
    },
    '.donate': {
      display: 'flex',
      justifyContent: 'flex-start',
      span: {
        marginRight: '.5rem',
      },
    },
    '.copyContainer': {
      '.supportHeading': {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '1rem',
      },
      h4: {
        fontSize: 22,
        marginRight: '1rem',
        '@media (max-width: 480px)': {
          fontSize: 18,
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
    '@media (max-width: 768px)': {
      // display: 'none', // suppress on mobile
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
                  <LikeButton id={id} />
                </span>
                <div className="donate">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="var(--color-text)"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.874 6.999c4.737-4.27-.979-4.044.116-6.999-3.781 3.817 1.41 3.902-.116 6.999zm-2.78.001c3.154-2.825-.664-3.102.087-5.099-2.642 2.787.95 2.859-.087 5.099zm8.906 2.618c-.869 0-1.961-.696-1.961-1.618h-10.039c0 .921-1.13 1.618-2 1.618v1.382h14v-1.382zm-13 2.382l2.021 12h7.959l2.02-12h-12z" />
                    </svg>
                  </span>
                  <a onClick={handleshowOptions}>Buy me a coffee</a>
                </div>
              </div>
            </div>
          </div>

          <div className="supportOptions">
            <div className="paymentMethods">
              <div className="ethAddressCopied">
                <div className="qrCode">
                  <Image
                    src="https://res.cloudinary.com/amir-ardalan/image/upload/v1666919421/Blog/amirardalan-eth-qr_qf4nym.png"
                    width={131}
                    height={131}
                    alt="amirardalan.eth QR Code"
                  />
                </div>
                <div className="copyConfirmation">
                  <p className="ethAddress">amirardalan.eth</p>
                  <p className="successMessage">
                    ETH address copied to clipboard ✅
                  </p>
                </div>
              </div>

              <a onClick={() => handleCopyAddress()}>
                <div className="ether" />
              </a>

              <a
                href="https://www.paypal.com/donate/?hosted_button_id=PDSXCAVYMLW2G"
                target="_blank"
                rel="noopener noreferrer"
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
