import React, { useContext, useRef, useState } from 'react'
import styles from './StartPage.module.css'
import { Link } from 'react-router-dom'
import { useGetTypesQuery } from '../../components/redux/api/server.api'
import Loader from '../../components/UI/Loader/Loader'
import { useAppDispatch } from '../../components/redux/hooks/hooks'
import { setType } from '../../components/redux/slices/typesSlice'

export default function StartPage() {
    const {data:Types,isLoading} = useGetTypesQuery('')
    const dispatch = useAppDispatch()
    
    const OnMouseOver = (e:any) =>{
        e.target.classList.add(styles.active)
        console.log(e.target)
    }
    const OnMouseOut = (e:any) =>{
        e.target.classList.remove(styles.active)
    }
    if(isLoading){
      return <Loader/>
    }
  return (
    <div  className={styles.StartPage}>
      <div className={styles.Cotegories} >
        {Types?.map((category,key)=>
            <Link 
            to='/store' onClick={(e)=>dispatch(setType(category.id))} key={key + 1} style={{textDecoration:'none'}}><div id='all' className={styles.AllCategories} onMouseOver={OnMouseOver} onMouseOut={OnMouseOut}
            >{category.name}<img  onMouseOver={OnMouseOver} onMouseOut={OnMouseOut} className={styles.AllPhoto} src={"https://onlinestoreserver-production.up.railway.app/" + category.img}></img></div></Link>
        )}
      </div>
    </div>
  )
}
