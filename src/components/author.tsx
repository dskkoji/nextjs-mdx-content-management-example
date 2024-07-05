import NextLink from 'next/link'
import Image from 'next/image'
import type { Author as AuthorSchema } from '../content'
import AuthorSocials from './author-socials'
import styles from './author.module.css'

function Author({ id, name, description, image, socials }: AuthorSchema) {
  return (
    <article className={styles.author}>
      <figure className={styles.figure} >
        {image && (
          <Image 
            className={styles.image}
            src={image}
            alt={name}
            width={200}
            height={200}
          />
          )}
          {!image && (
            <div className={styles.imagePlaceholder} >{name.slice(0, 1)}</div>
          )}
      </figure>
      <div className={styles.summary}>
        <h1>
          <NextLink  href={`/author/${id}`}>{name}</NextLink>
        </h1>
        {description && <p>{description}</p>}
        <AuthorSocials socials={socials} />
      </div>
    </article>
  )
}

export default Author