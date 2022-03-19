import { useState } from 'react'
import { useTheme, css } from '@emotion/react'
import Image from 'next/image'
import { about } from '@/data/content'

export default function ContactButton() {
  const theme: any = useTheme()

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

  const styleTooltipWrapper = css({
    overflow: 'hidden',
  })

  const styleTooltip = css({
    marginTop: '.5rem',
    position: 'relative',
    borderRadius: 5,
    padding: '0 .5rem',
    fontSize: 12,
    color: 'var(--color-text)',
    textAlign: 'center',
    backgroundColor: 'var(--color-accent-neutral)',
    opacity: emailCopied ? 1 : 0,
    animation: emailCopied ? 'tooltipDown 5s' : null,
    '&:before': {
      content: '""',
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      top: -6,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: '6px solid var(--color-accent-neutral)',
    }
  })

  return (
    <span css={{maxWidth: 'fit-content'}}>
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
          ? process.env.NEXT_PUBLIC_USER_EMAIL
          : about.contact.email.title}
      </a>
      <div css={styleTooltipWrapper}>
        <div css={styleTooltip}>
          {about.contact.copiedToClipboard}
        </div>
      </div>
    </span>
  )
}