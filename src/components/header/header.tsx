import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import styles from  './header.module.css'
import Logo from '../images/ComuterShopLogo.svg'
import bucketImage from '../images/bucketImage.svg'
import {Link} from 'react-router-dom'
import SwitchTheme from '../UI/Buttons/SwithTheme/SwitchTheme'
import './header.css'
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks'
import LogoutImg from '../images/logout.png'
import { setToken, setUser } from '../redux/slices/userSlice'
import { setAuth } from '../redux/slices/authSlice'
import { useGetBasketQuery } from '../redux/api/server.api'
import Loader from '../UI/Loader/Loader'
export default function Header() {
  const Auth = useAppSelector(state=>state.auth.auth)
  const User = useAppSelector(state=>state.user.User)
    
  const {data:BasketLength,isLoading} = useGetBasketQuery(User.id ? User.id : 2)

  useEffect(()=>{
  
  document.documentElement.setAttribute('data-theme','dark')
  },[])
  const [count,setCount]:any = useState('312')
  const dispatch = useAppDispatch()
  useEffect(():any=>{
  let header:any = document.getElementById('4'),
  headerH:number = 70
  document.onscroll = function ():void {
    let scroll = window.scrollY
    if(scroll > headerH){
      header.classList.add('fixed')
    }
    if(scroll < headerH){
      header.classList.remove('fixed')
    }
  }
},[])

  
  const logout = () =>{
    dispatch(setUser(''))
    dispatch(setToken(''))
    dispatch(setAuth(false))
    localStorage.setItem('token','')
  }

  if(isLoading){
    return <Loader/>
  }

  return (
    <div id={'4'}  className ={styles.Header}>
     <div  className={styles.HeaderLogo}><img className={styles.HeaderLogo} src={Logo}/></div>
     <SwitchTheme />
     <div className ={styles.HeaderText}><Link to ='/StartPage' style={{textDecoration:'none',color:'white'}}>Интернет-магазин</Link></div> 
     {User.role === 'ADMIN' ? <Link to='/admin'><div className={styles.adminPanel}>Админ</div></Link> : ''} 
     {!Auth 
     
     ?

     <div className={styles.LogReg}>
     <Link  to='/Registration'><p className={styles.Registration}>Регистрация</p></Link>
     <Link to='/Login'><p className={styles.SignIn}>Вход</p></Link>
     </div>

     :

     <div className={styles.isAuth} >
     <h3 className={styles.UserName}>
      привет, {User.email.split('@')[0]}
     </h3>
     <img className={styles.logout} onClick={logout} src={LogoutImg}></img> 
     </div>
     } 
     <div className={styles.bucketLogo}><Link to='/BucketPage'><img className={styles.bucketLogo} src={bucketImage}></img></Link></div>
     {!User.id ? '' : <Link style={{margin:0,textDecoration:'none'}} to='/BucketPage'><h1 className={styles.bucketCounter}>{BasketLength ? BasketLength?.length : ''}</h1></Link>}

    </div>
  )
}
