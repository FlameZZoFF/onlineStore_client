
import React, { useContext, useEffect, useState } from 'react'
import { ComputerStore } from '../mainPage/store'
import StorePage from '../mainPage/storePage'
import styles from './itemPage.module.css'
import AddToBucket from '../../components/UI/Buttons/addToBucket/AddToBucket'
import  Alert from '../../components/Alerts/SuccesBucketAdd/SuccesBucketAdd'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'
import { useGetOneDeviceQuery } from '../../components/redux/api/server.api'
import Loader from '../../components/UI/Loader/Loader'


export default function ItemPage() {

  const {id} = useParams()
  const {data:Device,isLoading} = useGetOneDeviceQuery(id)
  if(isLoading){
    return <Loader/>
  }
    const OnMouseOver = (e:any) =>{
        e.target.classList.add(styles.active)
    }
    const OnMouseOut = (e:any) =>{
        e.target.classList.remove(styles.active)
    }

  return (
    <div className={styles.itemPage}>
      
      <div className={styles.itemName}>{Device?.name}</div>
      <div className={styles.itemDesc}></div>
      <div className={styles.itemPhoto}><img src={'https://onlinestoreserver-production.up.railway.app/'+ Device?.img}></img></div>
      <div className={styles.itemCost}></div>
      <div><button onMouseOut={OnMouseOut} onMouseOver={OnMouseOver} className={styles.ItemBuy}>Добавить</button></div>
    </div>
  )
}
