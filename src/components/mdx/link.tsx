import NextLink from 'next/link'
import type { ComponentProps } from 'react'

function isInternal(href: ComponentProps<"a">["href"]) {
  if (!href) return false
  return /^\/(?!\/)/.test(href)
}

function Link({ href, ...props}: ComponentProps<"a">) {
  if (!href) return null
  if (isInternal(href)) {
    return <NextLink href={href} {...props} />
  }

  return <a href={href} target="_blank" rel="noreferrer noopener" {...props} />
} 

export default Link