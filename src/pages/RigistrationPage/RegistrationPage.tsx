import React, { useState } from 'react'
import { useUserRegisterMutation } from '../../components/redux/api/server.api'
import jwt_decode from 'jwt-decode'
import './RegistrationPage.scss'
import { useAppDispatch, useAppSelector } from '../../components/redux/hooks/hooks'
import { setToken, setUser } from '../../components/redux/slices/userSlice'
import { setAuth } from '../../components/redux/slices/authSlice'
import { useNavigate } from "react-router-dom"
import { IToken } from '../../components/interfaces/IResponse'
export default function RegistrationPage() {
    const navigate = useNavigate()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [registerUser] = useUserRegisterMutation();
    const [error,setError] = useState()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.User)
    
    const submitForm = async (e:any) =>{
        e.preventDefault()
        await registerUser({email:email,password:password})
        .unwrap()
        .then((data:IToken)=>data.token)
        .then((token:string)=>{
          localStorage.setItem('token',token)
          dispatch(setUser(jwt_decode(token)))
          dispatch(setAuth(true))
          navigate('/store')
        }).catch((e:any)=>setError(e.data.message))

    }
    
  return (
    <div className='Register_main'>
      <form className='Register_main-form'>
      <h1 className='Register_main_title'>Регистрация</h1>
        <input value={email} className='Register_form_email' placeholder='Введите email' onChange={(e:any)=>setEmail(e.target.value)}></input>
        <input type='password' placeholder='Введите пароль' value={password} className='Register_form_password' onChange={(e:any)=>setPassword(e.target.value)}></input>
        <input type="submit" className='Register_form_submit' onClick={submitForm} />
        <h1 className='Register_form_error'>{error}</h1>
      </form>
    </div>
  )
}
