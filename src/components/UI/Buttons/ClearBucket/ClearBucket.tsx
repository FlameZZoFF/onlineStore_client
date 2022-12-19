import React from 'react'
import styles from './ClearBucket.module.css'
export default function ClearBucket({RemoveFromBucket}:any) {
  return (
    <button className={styles.clearBucket} onClick={RemoveFromBucket}>
    Очистить корзину
    </button>
  )
}
