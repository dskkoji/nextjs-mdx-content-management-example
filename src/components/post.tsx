import NextLink from 'next/link'
import { author, categories, type PostMetadata } from '@/content'
import CategoryBadge from './category-badge'
import styles from './post.module.css'

async function Post({
  href,
  frontmatter,
}: Pick<PostMetadata, "href"> & {
  frontmatter: Pick<
  PostMetadata["frontmatter"],
    "title" | "date" | "author" | "category" | "draft"
  >
}) {
  const { title, date, category, draft } = frontmatter
  const authorItem = await author.get("name", frontmatter.author)
  const categoryItem = await categories.get("name", category)

  return (
    <article key={href} className={styles.post}>
      {categoryItem && <CategoryBadge {...categoryItem} />}
      <h1 className={styles.postTitle}>
        <NextLink href={href}>{title}</NextLink>
        {draft && <small className={styles.draft}>Draft</small>}
      </h1>
      <p className={styles.footerText}>
        <time>{date.toDateString()}</time>
        {authorItem && (
          <span>
            by{" "}
            <NextLink href={`/author/${authorItem.id}`}>
              {authorItem.name}
            </NextLink>
          </span>
        )}
      </p>
    </article>
  )
}

export default Post