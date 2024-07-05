import Image from 'next/image'
import type { Metadata } from 'next'
import { Post, VStack, AuthorSocials } from '@/components'
import { author, post } from '@/content'
import styles from './page.module.css'

export async function generateStaticParams() {
  const allAuthor = await author.getAll()
  return allAuthor
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params
  const item = await author.get("id", id)
  if (!item) return undefined
  const { name } = item
  return {
    title: name,
  } satisfies Metadata
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const item = await author.get("id", id)
  if (!item) return null
  const { name, description, image, socials } = item
  const posts = await post.getAll()
  const authorsPosts = posts.filter((post) => post.frontmatter.author === name)

  return (
    <>
      <article className={styles.authorHeader}>
        {image && (
          <figure className={styles.figure}>
            <Image 
              className={styles.image}
              src={image}
              alt={name}
              width={480}
              height={480}
            />
          </figure>
        )}
        <h1 className={styles.authorName}>{name}</h1>
        {description && <p>{description}</p>}
        <AuthorSocials socials={socials} />
      </article>
      <div>
        <p>記事一覧</p>
        <VStack>
          {authorsPosts
            .sort(
              (a, b) =>
                b.frontmatter.date.getTime() - a.frontmatter.date.getTime()
            )
            .map((post) => (
              <Post key={post.href} {...post} />
            ))
          }
        </VStack>
      </div>
    </>
  )
}

export default Page