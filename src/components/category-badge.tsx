import NextLink from 'next/link'
import type { Categories } from '@/content'
import styles from './category-badge.module.css'

type CategoryBadgeProps = Pick<Categories, "id" | "name">

function CategoryBadge({ id, name }: CategoryBadgeProps) {
  return (
    <NextLink className={styles.badge} href={`/categories/${id}`}>
      {name}
    </NextLink>
  )
}

export default CategoryBadge