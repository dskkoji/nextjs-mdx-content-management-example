import type { PropsWithChildren } from 'react'
import styles from './vstack.module.css'

function VStack({ children }: PropsWithChildren) {
  return (
    <div className={styles.vstack}>
      {children}
    </div>
  )
}

export default VStack