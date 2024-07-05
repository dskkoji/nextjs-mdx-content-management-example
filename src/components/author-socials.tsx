import type { Author as AuthorSchema } from '@/content'
import styles from './author-socials.module.css'

type AuthorSocialsProps = Pick<AuthorSchema, "socials">

function AuthorSocials({ socials }: AuthorSocialsProps) {
  if (!socials) return null
  return (
    <address className={styles.address}>
      {socials.url && (
        <a href={socials.url} target="_blank" rel="noreferrer noopener">
          Web
        </a>
      )}
      {socials.twitter && (
        <a href={`https://twitter.com/${socials.twitter}`} target="_blank" rel="noreferrer noopener">
          Twitter
        </a>
      )}
      {socials.github && (
        <a href={`https://github.com/${socials.github}`} target="_blank" rel="noreferrer noopener">
          GitHub
        </a>
      )}
    </address>
  )
}

export default AuthorSocials