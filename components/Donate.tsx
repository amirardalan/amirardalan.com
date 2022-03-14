import { useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import { donate } from '@/data/content'

export default function Donate() {

  const [showQrCode, setShowQrCode] = useState(false)

  const [addressCopied, setAddressCopied] = useState(false)
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(donate.address)
    setAddressCopied(true)
    setTimeout(() => {
      setAddressCopied(false)
    }, 5000)
  }

  const styleDonateWrapper = css({
    display: 'inline',
    button: {
      background: 'transparent',
      border: 'none',
      color: 'var(--color-bg)',
      '&:focus': {
        boxShadow: '0 0 0 2px var(--color-accent-neutral)',
        '&:focus:not(:focus-visible)': { boxShadow: 'none' },
      }
    },
  })

  const styleDonateButton = css({
    margin: '0 .4rem',
    textDecoration: 'underline',
  })

  const styleQrWrapper = css({
    opacity: showQrCode ? 1 : 0,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 45,
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

  const styleTooltipWrapper = css({
    overflow: 'hidden',
    paddingBottom: 2,
    '.tooltipFooter': {
      marginBottom: '.2rem',
      position: 'relative',
      fontSize: 11,
      color: 'var(--color-text)',
      textAlign: 'center',
      backgroundColor: 'var(--color-accent-neutral)',
      borderRadius: 5,
      opacity: addressCopied ? 1 : 0,
      animation: addressCopied ? 'tooltipUp 5s forwards' : null,
      '&:before': {
        content: '""',
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: -6,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid var(--color-accent-neutral)',
      }
    },
  })


  return (
    <div css={styleDonateWrapper}>
      <div css={styleQrWrapper}>
        <div css={styleTooltipWrapper}>
          <div className="tooltipFooter">{donate.copied}</div>
        </div>
        <div css={styleAddress}>
          <button onClick={()=> handleCopyAddress()} aria-label={donate.meta}>

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
      <button css={styleDonateButton} onClick={()=>setShowQrCode(!showQrCode)}>
        {donate.text}
      </button>
      <span css={{fontSize: 14}}>⬨</span>
    </div>
  )
}