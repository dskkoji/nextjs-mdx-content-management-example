import type { PropsWithChildren } from 'react'
import { PageHeader } from '@/components'

export default function MDXPageLayout({ children }: PropsWithChildren){
  return (
    <>
      <PageHeader title="Next.js with MDX content" />
      <article className="article">{children}</article>
    </>
  )
}