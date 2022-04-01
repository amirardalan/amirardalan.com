import { useState, Key } from 'react'
import { css } from '@emotion/react'
import { about } from '@/data/content'


export const generateCtaButtons = (items: Array<any>) => {

  return items.map((item, i: Key) => {
    return (
      <a key={i}
        href={item.path}
        className={item?.icon ? `ctaButton ${item.icon}` : "ctaButton"}
        aria-label={item.title}
        target={item?.target}
        rel={item?.rel}
        data-screen-name={item?.screenname}
      >
        {item.title}
      </a>
    )
  })
}

export const ContactButton = () => {

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

  const styleAboutCtaWrapper = css({
    display: 'block',
    width: 'fit-content',
    '@media(max-width: 480px)': {
      width: '100%'
    }
  })

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
    <span css={styleAboutCtaWrapper}>
      <button
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
      </button>
      <div css={styleTooltipContact}>
        <div className="tooltip">
          {about.contact.copiedToClipboard}
        </div>
      </div>
    </span>
  )
}