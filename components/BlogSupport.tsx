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
  }
  const handleHideModule = () => {
    setHideModule(!showOptions)
    if (showOptions) {
      setshowOptions(false)
    }
  }


  const [showQrCode, setShowQrCode] = useState(false)

  const [addressCopied, setAddressCopied] = useState(false)
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(donate.address)
    setAddressCopied(true)
    setTimeout(() => {
      setAddressCopied(false)
    }, 5000)
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
          marginBottom: '2rem',
          h4: {
            fontSize: 12,
            textTransform: 'uppercase',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'normal',
            textDecoration: 'underline',
            textAlign: 'center'
          }
        },
        '.paymentMethods': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          'div:first-of-type': {
            marginRight: '1rem',
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
    '.eth, .pp': {
      display: 'none' // TODO: Create hook to toggle
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

  const styleDonateButton = css({
    textDecoration: 'underline',
  })

  const styleQrWrapper = css({
    opacity: showQrCode ? 1 : 0,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 52,
    left: '4rem',
    '@media (max-width: 1255px)': {
      bottom: 37,
      left: '4rem',
    },
    '@media (max-width: 1024px)': {
      left: '2.5rem',
    },
    '@media (max-width: 480px)': {
      left: '1.5rem',
    }
  })

  const styleAddress = css({
    display: showQrCode ? 'flex' : 'none',
    flexDirection: 'column',
    paddingBottom: 5,
    opacity: showQrCode ? 1 : 0,
    fontSize: 9,
    span: {
      marginRight: 4,
    },
    button: {
      background: 'transparent',
      border: 'none',
      color: 'var(--color-bg)',
      textAlign: 'left',
      '.qrCode': {
        width: 242,
        height: 242,
        marginTop: 7,
        '@media (max-width: 1255px)': {
          display: 'none'
        },
      },
      '.address': {
        flexDirection: 'row',
        display: 'inline',
        lineHeight: '.8rem',
        span: {
          textDecoration: 'underline',
        },
        '&:before': {
          content: '"⎘"',
          marginRight: '.2rem',
          fontSize: 16,
          textDecoration: 'none !important',
        },
      },
    },
    '@media (max-width: 1255px)': {
      display: showQrCode ? 'inline' : 'none',
      marginBottom: 0,
      fontSize: 10,
    }
  })

  const styleTooltipFooter = css({
    overflow: 'hidden',
    paddingBottom: 2,
    '.tooltip': {
      marginBottom: '.2rem',
      opacity: addressCopied ? 1 : 0,
      animation: addressCopied ? 'tooltipUp 5s forwards' : null,
      '&:before': {
        bottom: -6,
        borderTop: '6px solid var(--color-accent-gray)',
      }
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
                <h4>Did you find this article useful?</h4>
                <p>This app is <a href="https://github.com/amirardalan/amirardalan.com" target="_blank" rel="noopener noreferrer">open-source</a> and all of the content is free!</p>
                <p>If you found this article helpful, consider supporting the author:</p>
              </div>
            </div>
            <div className="right">
              <span>☕</span><a onClick={handleshowOptions}>Buy me a coffee</a>
            </div>
          </div>

          <div className="supportOptions">
            <div className="paymentMethods">
              <div className="ether">
                <p>Ethereum</p>
              </div>
              <div className="optionsHeading">
                <h4>Choose a payment method</h4>
              </div>
              <div className="paypal">
                <p>PayPal</p>
              </div>
            </div>
          </div>

        </div>

        {/* <div className="eth">
          <div css={styleQrWrapper}>
            <div css={styleTooltipFooter}>
              <div className="tooltip">{donate.copied}</div>
            </div>
            <div css={styleAddress}>
              <button onClick={() => handleCopyAddress()} aria-label={donate.meta}>
                <div className="address">
                  <span>{donate.address}</span>
                </div>
                <div className="qrCode">
                  <Image
                    src={donate.qr}
                    height={242}
                    width={242}
                    alt={donate.text}
                  />
                </div>
              </button>
            </div>
          </div>
          <button css={styleDonateButton} onClick={() => setShowQrCode(!showQrCode)}>
            {donate.text}
          </button>
          <span css={{ fontSize: 14 }}>⬨</span>
        </div>

        <div className="pp"></div> */}

      </div>

    </div>
  )
}