import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


// Custom Link component for setting an active state on top-level nav links
export default function NavLink({ href, as, exact, activeClassName, children, ...props }) {
  
  const { asPath } = useRouter()
  // Normalize and split paths into their segments
  const segment = (p: string) => new URL(p, `${process.env.NEXT_PUBLIC_SITE_URL}`).pathname.split('/').filter(s => s)
  const currentPath = segment(asPath)
  const targetPath = segment(as || href)
  // The route is active if all of the following are true:
  //   1. There are at least as many segments in the current route as in the destination route
  //   2. The current route matches the destination route
  //   3. If we're in “exact" mode, there are no extra path segments at the end
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
