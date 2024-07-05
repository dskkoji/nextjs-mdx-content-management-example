import NextImage from 'next/image'
import type { ComponentProps } from 'react'
import styles from './image.module.css'

function Image({ src, alt, width, height, ...props }: ComponentProps<"img">) {
  if (!src) return null

  return (
    <NextImage 
      className={styles.image}
      src={src}
      alt={alt ?? "Next Image"}
      width={600}
      height={600}
      {...props}
    />
  )
}

export default Image