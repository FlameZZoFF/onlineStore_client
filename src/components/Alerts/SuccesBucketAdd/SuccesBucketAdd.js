import React from 'react'
import styles from './SuccesBucketAdd.module.css'
import Mark from '../../images/AlertCheckmark/alertCheckMark.svg'
export default function SuccesBucketAdd() {
  return (
    <div className={styles.Alert}>
      <div>Товар добавлен в корзину</div>
      <img src ={Mark}></img>
    </div>
  )
}
