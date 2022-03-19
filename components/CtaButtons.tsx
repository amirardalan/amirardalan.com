import { Key } from 'react'


export const GenerateCtaButtons = (items: Array<any>) => {

  return items.map((item, i: Key) => {
    return (
      <a key={i}
        href={item.path}
        className={item.icon ? `ctaButton ${item.icon}` : "ctaButton"}
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