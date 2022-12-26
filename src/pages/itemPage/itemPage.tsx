
import React, { useContext, useEffect, useState } from 'react'
import { ComputerStore } from '../mainPage/store'
import StorePage from '../mainPage/storePage'
import styles from './itemPage.module.css'
import AddToBucket from '../../components/UI/Buttons/addToBucket/AddToBucket'
import  Alert from '../../components/Alerts/SuccesBucketAdd/SuccesBucketAdd'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'
import { useAddBucketDeviceMutation, useGetOneDeviceQuery } from '../../components/redux/api/server.api'
import Loader from '../../components/UI/Loader/Loader'
import SuccesBucketAdd from '../../components/Alerts/SuccesBucketAdd/SuccesBucketAdd'
import { useAppSelector } from '../../components/redux/hooks/hooks'

export default function ItemPage() {

  const {id} = useParams()
  const {data:Device,isLoading} = useGetOneDeviceQuery(id)
  const [addToBucket] = useAddBucketDeviceMutation()
  const [alert,setAlert] = useState(false)
  

  const user = useAppSelector(state=>state.user.User)

   const bucketHandler = () =>{
      addToBucket({basketId:user.id,deviceId:id}).unwrap()
      .then(()=>{
        setAlert(true)
        setTimeout(()=>{
          setAlert(false)
         },2500)
      })
   }


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
          <CSSTransition in={alert}  timeout={300} classNames='transition' unmountOnExit>
        
        <SuccesBucketAdd/>

      </CSSTransition>
      <div className={styles.itemName}>{Device?.name}</div>
      <div className={styles.itemDesc}></div>
      <div className={styles.itemPhoto}><img className={styles.itemPhoto} src={'https://onlinestoreserver-production.up.railway.app/'+ Device?.img}></img></div>
      <div className={styles.itemprice}></div>
      <div><button disabled={user.id ? false : true} title={user.id ? '' : 'Надо авторизироваться'}  style={{opacity:user.id ? '' : '0.5'}} onClick={bucketHandler} onMouseOut={OnMouseOut} onMouseOver={OnMouseOver} className={styles.ItemBuy}>Добавить</button></div>
    </div>
  )
}
