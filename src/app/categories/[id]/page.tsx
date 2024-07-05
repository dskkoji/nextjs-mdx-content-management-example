import type { Metadata } from 'next'
import { Post, VStack, PageHeader } from '../../../components'
import { categories, post } from '../../../content'

export async function generateStaticParams() {
  const allCategories = await categories.getAll()
  return allCategories
}

export async function generateMetadata({ params }: { params: { id: string} }) {
  const { id } = params
  const item = await categories.get("id", id)
  if (!item) return undefined
  const { name } = item
  return {
    title: name,
  } satisfies Metadata
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const item = await categories.get("id", id)
  if (!item) return null
  const { name, description } = item
  const posts = await post.getAll()
  const authorsPosts = posts.filter((post) => post.frontmatter.category === name)

  return (
    <>
      <PageHeader title={name} footerText={description} />
      <VStack>
        {authorsPosts.sort((a, b) =>
          b.frontmatter.date.getTime() - a.frontmatter.date.getTime()
        )
          .map((post) => (
            <Post key={post.href} {...post} />
          ))
        }
      </VStack>
    </>
  )
}

export default Page
