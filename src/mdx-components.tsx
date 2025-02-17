import { Image, Link } from '@/components'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    a: Link,
    img: Image,
    ...components,
  }
}