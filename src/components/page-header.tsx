import type { ReactNode } from 'react'
import styles from './page-header.module.css'

type PageHeaderProps = {
  title: string,
  headerText?: ReactNode,
  footerText?: ReactNode
}

function PageHeader({ title, headerText, footerText }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <hgroup className={styles.hgroup}>
        {headerText && (
          <p className={styles.headerText}>{headerText}</p>
        )}
        <h1 className={styles.title}>{title}</h1>
        {footerText && (
          <p className={styles.footerText}>{footerText}</p>
        )}
      </hgroup>
    </header>
  )
}

export default PageHeader