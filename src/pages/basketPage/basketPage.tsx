import React, { useContext, useEffect, useState } from 'react'
import styles from './basketPage.module.css'
import BucketImage from '../../components/images/BucketPage/Bucket.svg'
import ClearBucket from '../../components/UI/Buttons/ClearBucket/ClearBucket'
import BuyButton from '../../components/UI/Buttons/BuyButton/BuyButton'
import {Link} from 'react-router-dom'
import { useDeleteDeviceFromBasketMutation, useGetBasketQuery, useGetDevicesQuery } from '../../components/redux/api/server.api'
import { useAppSelector } from '../../components/redux/hooks/hooks'
import Loader from '../../components/UI/Loader/Loader'
export default function BucketPage() {

  const user = useAppSelector(state=>state.user.User)
  const {data:Basket,isLoading} = useGetBasketQuery(user.id)
  const [deleteDevice] = useDeleteDeviceFromBasketMutation()
 
  const deleteItem = (e:any) =>{

    const formData = new FormData()
    formData.append('deviceId',e.target.value)
    deleteDevice({basketId:user.id,body:formData})

  }

 if(isLoading){
  return <Loader/>
 }
 
 let totalCost = Basket?.reduce((acc,el)=>{
  return acc + el.price
},0) 
 
  return (
    <div className ={styles.bucketPage}>
    {Basket?.length === 0 ?
    <div className={styles.Empty}>
      <Link to ='/'><h1 className={styles.reshop}>Вернуться в магазин</h1></Link>
      <h1 className={styles.EmptyBucket}>Корзина Пустая</h1>
    <img src = {BucketImage}></img>
    </div>
    :
    <div className={styles.bucketFull}> 
    <div className={styles.Wrapper}>
     {Basket?.map((el,key)=>
     <div className={styles.bucketItem} key={key}>
      <button className={styles.delButton} value={el.id} onClick={deleteItem}>X</button>
     <div  className={styles.nameBucket}>{el.name}</div>
     <div ><img className={styles.imgBucket} src={'https://onlinestoreserver-production.up.railway.app/' + el.img}></img></div>
     <div className={styles.costBucket}>{el.price}$</div>
     </div>
)}
<div className={styles.totalCost}>{totalCost}$</div>
    </div>
    <ClearBucket />
    <BuyButton/>
    </div>
}
    </div>
  )
}
