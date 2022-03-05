import { useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import { donate } from '@/data/content'

export default function Donate() {

  const [showQrCode, setShowQrCode] = useState(false)

  const styleDonateLink = css({
    display: 'none',
    '@media (max-width: 768px)': {
      margin: '0 .4rem',
      display: 'inline',
    }
  })

  const styleDonateButton = css({
    margin: '0 .4rem',
    background: 'none',
    border: 'none',
    color: 'var(--color-bg)',
    textDecoration: 'underline',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  })

  const styleCloseButton = css({
    marginBottom: '.5rem',
    display: showQrCode ? 'block' : 'none',
    background: 'none',
    border: 'none',
    color: 'var(--color-bg)',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    animation: 'fadeIn .7s',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  })

  const styleAddress = css({
    display: showQrCode ? 'block' : 'none',
    animation: 'fadeIn .5s',
    fontSize: 7.9
  })

  const styleQrWrapper = css({
    overflow: 'hidden',
    position: 'absolute',
    bottom: 50,
    left: 65,
    '.qrCode': {
      opacity: showQrCode ? 1 : 0,
      width: 200,
      height: 200,
      animation: showQrCode ? `slideUp .2s ease` : `slideDown .2s ease`,
      '@media (max-width: 1024px)': {
        display: 'none'
      }
    }
  })

  const QR = () => {
    return (
      <div css={styleQrWrapper}>
        <button css={styleCloseButton} onClick={()=>setShowQrCode(!showQrCode)}>
          Close
        </button>
        <span css={styleAddress}>
          {donate.address}
        </span>
        <div className="qrCode">
          <Image 
            src={donate.qr}
            height={200}
            width={200}
            alt={donate.text}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <QR/>
      <button
        css={styleDonateButton}
        onClick={()=>setShowQrCode(!showQrCode)}
      >
        {donate.text}
      </button>
      <a css={styleDonateLink} href={donate.link} target="_blank" rel="noopener noreferrer">
        {donate.text}
      </a>
      ❤
    </>
  )
}