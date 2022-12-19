import React,{useEffect,useState} from "react";
import Header from "./components/header/header";
import StartPage from "./pages/StartPage/Start-page";
import {Routes, Route ,Navigate} from 'react-router-dom'
import Layout from "./Routes/Layout";
import ComputerStore  from "./pages/mainPage/storePage";
import BasketPage from "./pages/basketPage/basketPage";
import ItemPage from "./pages/itemPage/itemPage";
import RegistrationPage from "./pages/RigistrationPage/RegistrationPage";
import LoginPage from "./pages/loginPage/loginPage";
import { useAppDispatch, useAppSelector } from "./components/redux/hooks/hooks";
import { useCheckAuthQuery } from "./components/redux/api/server.api";
import { setAuth } from "./components/redux/slices/authSlice";
import { setUser } from "./components/redux/slices/userSlice";
import jwtDecode from "jwt-decode";
import Loader from "./components/UI/Loader/Loader";
import AdminPage from "./pages/adminPage/adminPage";

function App() {
  const Auth = useAppSelector(state=>state.auth.auth)
  const dispatch = useAppDispatch()
  const User = useAppSelector(state=>state.user.User)
  const {data,error} = useCheckAuthQuery('')
  const [Loading,setLoading] = React.useState<boolean>(true)
  useEffect(()=>{
  setLoading(true)

  
   if(error){
    dispatch(setAuth(false))
    dispatch(setUser([]))
    setLoading(false)
   }
   if(data){
    localStorage.setItem('token',data.token)
    dispatch(setAuth(true))
    dispatch(setUser(jwtDecode(data.token)))
    setLoading(false)
   }
  },[data,error])
  if(Loading){
    return <Loader/>
  }


  return (
  
    <div className="App">

    <Routes>
    <Route path='/' element={<Layout/>}>
    {Auth && <Route path='/BucketPage' element={<BasketPage />}/> } 
    {!Auth && <Route path='/Login' element={<LoginPage/>}/>}
    {!Auth && <Route path='/Registration' element={<RegistrationPage/>}/>}
    <Route path="/*" element={<Navigate to={!Auth ? "/Login" : '/Store'} />} />
    {User.role === 'ADMIN' ? <Route path='/admin' element={<AdminPage/>}/> : ''}
    <Route path="/" element={<Navigate to="/StartPage" />} />
    <Route path ='/Store' element={<ComputerStore/>}/>
    <Route path='/StartPage' element={<StartPage />}/>
    <Route path='/ItemPage/:id' element={<ItemPage />}/>
    
    
    </Route>
    
    
    </Routes>

    </div>
  
  );
}

export default App;
