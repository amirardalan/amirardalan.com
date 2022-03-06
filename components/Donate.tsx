import { useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import { donate } from '@/data/content'

export default function Donate() {

  const [showQrCode, setShowQrCode] = useState(false)

  const styleDonateButton = css({
    margin: '0 .4rem',
    background: 'none',
    border: 'none',
    color: 'var(--color-bg)',
    textDecoration: 'underline',
  })

  const styleAddress = css({
    paddingBottom: 5,
    display: showQrCode ? 'block' : 'none',
    opacity: showQrCode ? 1 : 0,
    fontSize: 8.6,
    span: {
      marginRight: 4,
    },
    button: {
      background: 'none',
      border: 'none',
      color: 'var(--color-bg)',
      textDecoration: 'underline'
    },
    '@media (max-width: 768px)': {
      display: showQrCode ? 'inline' : 'none',
      marginBottom: 0,
      fontSize: 10,
    }
  })

  const styleQrWrapper = css({
    opacity: showQrCode ? 1 : 0,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 50,
    left: 65,
    '.qrCode': {
      width: 235,
      height: 235,
      '@media (max-width: 1024px)': {
        display: 'none'
      }
    },
    '.tooltipFooter': {
      marginBottom: '.2rem',
      position: 'relative',
      padding: '0 .5rem',
      fontSize: 11,
      color: 'var(--color-text)',
      textAlign: 'center',
      backgroundColor: 'var(--color-accent-gray)',
      borderRadius: 5,
      animation: 'slideUp .2s',
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
        borderTop: '6px solid var(--color-accent-gray)',
      }
    },
    '@media (max-width: 768px)': {
      bottom: 35,
      left: '1.5rem',
    }
  })

  const [addressCopied, setAddressCopied] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(donate.address)
    setAddressCopied(true)
    setTimeout(() => {
      setAddressCopied(false)
    }, 10000)
  }

  const QR = () => {
    return (
      <div css={styleQrWrapper}>
        {addressCopied ? <div className="tooltipFooter">{donate.copied}</div> : null}
        <div css={styleAddress}>
          <span>📋</span>
          <button onClick={()=> handleCopyAddress()}>
          {donate.address}
          </button>
        </div>
        <div className="qrCode">
          <Image 
            src={donate.qr}
            height={235}
            width={235}
            alt={donate.text}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <QR/>
      <button css={styleDonateButton} onClick={()=>setShowQrCode(!showQrCode)}>
        {donate.text}
      </button>
      ❤
    </>
  )
}