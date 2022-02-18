import { useState } from 'react'
import { useTheme } from '@emotion/react'
import Image from 'next/image'
import { about } from '@/data/content'

export default function ContactButton() {
  const theme: any = useTheme()

  const [showEmail, setShowEmail] = useState(false)
  const showEmailOnclick = () => {
    setShowEmail(true)
  }
  const [copiedToClipBoard, setCopiedToClipBoard] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_USER_EMAIL)
    setCopiedToClipBoard(true)
    setTimeout(() => {
      setCopiedToClipBoard(false)
    }, 10000)
  }

  return (
    <>
      <span css={{maxWidth: 'fit-content'}}>
        <a
          onClick={showEmail
            ? copyToClipboard
            : showEmailOnclick}
          className={showEmail
            ? 'ctaButton disabled'
            : 'ctaButton'}
          aria-label={showEmail
            ? 'Copy Email address to clipboard'
            : 'Show Email'}
        >
          {showEmail
            ? process.env.NEXT_PUBLIC_USER_EMAIL
            : about.contact.email.title}
          <span className="icon">
          {showEmail ?
            <Image
              src={theme.icons.clipboard}
              height="16"
              width="16"
              className="icon"
              alt="Clipboard"
              priority
            /> :
            <Image
              src={theme.icons.email}
              height="16"
              width="16"
              className="icon"
              alt="Email"
              priority
            />
          }
          </span>
        </a>
        {copiedToClipBoard ?
        <div className="tooltip">
          {about.contact.copiedToClipboard}
        </div> :
        <div
          css={{
            color: 'var(--color-accent)',
            marginTop: '.5rem',
          }}>
          –
        </div>}
      </span>
    </>
  )
}