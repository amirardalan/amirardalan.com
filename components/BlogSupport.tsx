import { useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import { donate } from '@/data/content'
import CloseButton from '@/components/CloseButton'

export default function DonationCta() {

  const [hideModule, setHideModule] = useState(false)
  const [showOptions, setshowOptions] = useState(false)
  const handleshowOptions = () => {
    setshowOptions(!showOptions)
    if (addressCopied) {
      setTimeout(() => {
        setAddressCopied(false)
      }, 10)
    }
  }
  const handleHideModule = () => {
    setHideModule(!showOptions)
    if (showOptions) {
      setshowOptions(false)
    }
  }

  const [addressCopied, setAddressCopied] = useState(false)
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(donate.address)
    setAddressCopied(true)
  }

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
      animation: 'spin .5s ease'
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
        padding: '2.5rem',
      },
      '.supportOptions': {
        display: 'flex',
        flexDirection: 'column',
        margin: '4.2rem 2.5rem',
        '.optionsHeading': {
          h4: {
            fontSize: 12,
            textTransform: 'uppercase',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'normal',
            textAlign: 'center',
            position: 'relative',
            background: 'var(--color-bg)',
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
            }
          }
        },
        '.paymentMethods': {
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          '.ether': {
            display: 'flex',
            background: 'var(--icon-eth) no-repeat',
            backgroundSize: 'contain',
            height: 33,
            width: 133,
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
            marginTop: '2rem',
          },
          '.ethAddressCopied': {
            zIndex: 3,
            background: 'var(--color-bg)',
            display: addressCopied ? 'flex' : 'none',
            flexDirection: 'row',
            position: 'absolute',
            left: -25,
            width: '100%',
            alignItems: 'center',
            '.qrCode': {
              marginRight: '10rem'
            },
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
          }
        }
      },
    },
    '.left': {
      width: '70%'
    },
    '.right': {
      width: '30%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      a: {
        color: 'var(--color-text)',
      }
    },
    '.copyContainer': {
      h4: {
        fontSize: 22,
        marginBottom: '1rem'
      },
      p: {
        fontSize: 14,
        lineHeight: 1.5,
        margin: 0,
        padding: 0,

      }
    },
    button: {
      background: 'transparent',
      border: 'none',
      '&:focus': {
        boxShadow: '0 0 0 2px var(--color-accent-gray)',
        '&:focus:not(:focus-visible)': { boxShadow: 'none' },
      }
    },
    '@media (max-width: 1023px)': {
      display: 'none', // suppress on mobile
    }
  })


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
                <h4>Did you enjoy this article?</h4>
                <p>This project is <a href="https://github.com/amirardalan/amirardalan.com" target="_blank" rel="noopener noreferrer">open-source</a> and all of the content is free.</p>
                <p>If you liked this blog post consider supporting future content:</p>
              </div>
            </div>
            <div className="right">
              <span>☕</span><a onClick={handleshowOptions}>Buy me a coffee</a>
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
                  <p className="successMessage">ETH address copied to clipboard ✅</p>
                </div>
              </div>

              <a onClick={() => handleCopyAddress()}>
                <div className="ether" />
              </a>
              <div className="optionsHeading">
                <h4>Select payment type</h4>
              </div>
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
  )
}