import React from 'react'
import styles from './AddToBucket.module.css'
import BucketButton from '../../../images/bucketButton.svg'
import { useAddBucketDeviceMutation } from '../../../redux/api/server.api'
import { useAppSelector } from '../../../redux/hooks/hooks'

interface buttonProps{
  id:number,
}


export default function AddToBucket({id}:buttonProps) {

  const [addToBucket] = useAddBucketDeviceMutation()

  const user = useAppSelector(state=>state.user.User)

   const bucketHandler = () =>{
      addToBucket({basketId:user.id,deviceId:id})
      console.log('123')
   }

    const OnMouseOver = (e:any) =>{
        e.target.classList.add(styles.active)
    }
    const OnMouseOut = (e:any) =>{
        e.target.classList.remove(styles.active)
    }
  return (
    <button onMouseOver={OnMouseOver} onClick={bucketHandler} onMouseOut={OnMouseOut} className={styles.button}>Добавить
    <img src={BucketButton}></img>
    </button>
  )
}
