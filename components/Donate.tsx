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
    marginBottom: 10,
    background: 'none',
    border: 'none',
    color: 'var(--color-bg)',
    display: showQrCode ? 'block' : 'none',
    opacity: showQrCode ? 1 : 0,
    fontSize: 8.6,
    '@media (max-width: 768px)': {
      marginBottom: 0,
      fontSize: 11,
      textDecoration: 'underline'
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
      marginBottom: '.5rem',
      position: 'relative',
      padding: '0 .5rem',
      fontSize: 12,
      color: 'var(--color-text)',
      textAlign: 'center',
      backgroundColor: 'var(--color-accent-gray)',
      borderRadius: 5,
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
      bottom: 40,
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
        {addressCopied ?
          <div className="tooltipFooter">
            Copied to clipboard!
          </div> :
        <div css={{ color: 'var(--color-accent)', marginTop: '.5rem',}}></div>}
        <button css={styleAddress} onClick={()=> handleCopyAddress()}>
          {addressCopied ? '✔️' : '📋'} {donate.address}
        </button>
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