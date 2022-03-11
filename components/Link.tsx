import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Custom Link component to add an active state to top-level and children pages
export default function NavLink({ href, as, exact, activeClassName, children, ...props }) {
  
  const { asPath } = useRouter()
  const segment = (p: string) => new URL(p, `${process.env.NEXT_PUBLIC_SITE_URL}`).pathname.split('/').filter(s => s)
  const currentPath = segment(asPath)
  const targetPath = segment(as || href)
  const isActive = currentPath.length >= targetPath.length
    && targetPath.every((p, i) => currentPath[i] === p)
    && (!exact || targetPath.length === currentPath.length)

  const child = React.Children.only(children)
  const className = ((child.props.className || '') + ' ' + (isActive ? activeClassName : '')).trim()

  return (
    <Link href={href} as={as} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  )
}