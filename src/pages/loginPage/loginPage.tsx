import React, { useState } from 'react'
import {useUserLoginMutation } from '../../components/redux/api/server.api'
import jwt_decode from 'jwt-decode'
import './loginPage.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../components/redux/hooks/hooks'
import { setUser,setToken } from '../../components/redux/slices/userSlice'
import { setAuth } from '../../components/redux/slices/authSlice'
export default function RegistrationPage() {
    const [email,setEmail] = React.useState<string>()
    const [password,setPassword] = React.useState<string>()
    const [loginUser,{error:loginError}] = useUserLoginMutation();
    const [error,setError] = React.useState<string>('')
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.user.userToken)
    const navigate = useNavigate()
    const handleLogin = async (e:React.MouseEvent<HTMLInputElement>) =>{
        e.preventDefault()
         await loginUser({email:email,password:password})
        .unwrap()
        .then((data:any)=>data.token)
        .then((token:string)=>{
          localStorage.setItem('token',token)
          dispatch(setUser(jwt_decode(token)))
          dispatch(setAuth(true))
          navigate(-1)
        }).catch((e:any)=>setError(e.data.message))
      
    }



  return (
    <div className='Login_main'>
      <form className='Login_main-form'>
      <h1 className='Login_main_title'>Вход</h1>
        <input value={email} className='Login_form_email' placeholder='Введите email' onChange={(e:any)=>setEmail(e.target.value)}></input>
        <input value={password} className='Login_form_password' type='password' placeholder='Введите пароль' onChange={(e:any)=>setPassword(e.target.value)}></input>
        <input type="submit" className='Login_form_submit' onClick={handleLogin} value="Войти"/>
        <h1 className='Login_form_error'>{error}</h1>
      </form>
    </div>
  )
}
