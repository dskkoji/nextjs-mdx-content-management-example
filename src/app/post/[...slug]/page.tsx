import NextLink from 'next/link'
import type { Metadata } from 'next'
import { Author, Post, PageHeader, CategoryBadge } from '@/components'
import { author, post, categories } from '@/content'
import { useMDXComponents } from '@/mdx-components'
import styles from './page.module.css'

export async function generateStaticParams() {
  const allPosts = await post.getAll()
  return allPosts
}

export async function generateMetadata({ params }: { params: { slug: string[] }}) {
  const { slug } = params
  const item = await post.get(slug)
  if (!item) return null
  const { frontmatter } = item
  const { title, featuredImg } = frontmatter
  return {
    title,
    openGraph: {
      title,
      images: featuredImg && [featuredImg],
    },
  } satisfies Metadata
}

async function Page({ params }: { params:{ slug: string[] } }) {
  const { slug } = params
  const components = useMDXComponents()
  const item = await post.useMdx(slug, {
    components,
  })
  if (!item) return null
  const { content, frontmatter, context } = item
  const { title, date, lastmod, draft } = frontmatter
  const modified = date.getTime() !== lastmod.getTime()
  const authorItem = await author.get("name", frontmatter.author)
  const category = await categories.get("name", frontmatter.category)

  return (
    <>
      <article>
        <PageHeader 
          title={title}
          headerText={category && <CategoryBadge {...category} />}
          footerText={
            <>
              <time>{date.toDateString()}</time>
              {authorItem && (
                <span>
                  by{" "}
                  <NextLink href={`/author/${authorItem.id}`}>
                    {authorItem.name}
                  </NextLink>
                </span>
              )}
            </>
          }
        />
        {draft && (
          <aside className={styles.draft}>
            <p>
              <strong>この記事は下書きです</strong>
            </p>
          </aside>
        )}
        <div className="article">
          {content}
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerSummary}>
          {category && <CategoryBadge {...category} />}
          <h2>{title}</h2>
          <p>
            Post:
            <time>{date.toDateString()}</time>
          </p>
          {modified && (
            <p>
              Last modified:
              <time>{lastmod.toDateString()}</time>
            </p>
          )}
          </div>
          {authorItem && <Author {...authorItem} />}
        </footer>
      </article>
      <nav className={styles.neighborPosts}>
        {context.older ? (
          <div className={styles.neighbor}>
            <p>Older post</p>
            <Post {...context.older} />
          </div>
        ) : (
          <div className={styles.neighborPlaceholder} />
        )}
        {context.newer ? (
          <div className={styles.neighbor}>
            <p>Newer post</p>
            <Post {...context.newer} />
          </div>
        ) : (
          <div className={styles.neighborPlaceholder} />
        )}
      </nav>
    </>
  )
}

export default Page