import { useState } from 'react'
import { css } from '@emotion/react'
import { about } from '@/data/content'

export default function ContactButton() {

  const [showEmail, setShowEmail] = useState(false)
  const showEmailOnclick = () => {
    setShowEmail(true)
  }
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_USER_EMAIL)
    setEmailCopied(true)
    setTimeout(() => {
      setEmailCopied(false)
    }, 5000)
  }

  const styleAddress = css({
    fontStyle: 'normal',
  })

  const styleTooltipContact= css({
    overflow: 'hidden',
    '.tooltip': {
      marginTop: '.5rem',
      opacity: emailCopied ? 1 : 0,
      animation: emailCopied ? 'tooltipDown 5s' : null,
      '&:before': {
        top: -6,
        borderBottom: '6px solid var(--color-accent-neutral)',
      }
    }
  })

  return (
    <span>
      <a
        onClick={showEmail
          ? handleCopyToClipboard
          : showEmailOnclick}
        className={showEmail
          ? 'ctaButton clipboard disabled'
          : 'ctaButton email'}
        aria-label={showEmail
          ? 'Copy Email address to clipboard'
          : 'Show Email'}
      >
        {showEmail
          ? <address css={styleAddress}>{process.env.NEXT_PUBLIC_USER_EMAIL}</address>
          : about.contact.email.title}
      </a>
      <div css={styleTooltipContact}>
        <div className="tooltip">
          {about.contact.copiedToClipboard}
        </div>
      </div>
    </span>
  )
}