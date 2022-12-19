import React, { useContext, useEffect, useState } from 'react'
import styles from './Search.module.css'
import { ComputerStore } from '../../../pages/mainPage/store'
import useDebounce from '../../hooks/useDebounce'
import {Link} from 'react-router-dom'
import { useGetDevicesByNameQuery} from '../../redux/api/server.api'
export default function Search() {
  const [search,setSearch] = useState()
  const debounced = useDebounce(search)
  const {data:searchResult,isLoading}:any = useGetDevicesByNameQuery(debounced)
   
 
  console.log(searchResult)

  const OnMouseOver = (e:any) =>{
    e.target.classList.add(styles.active)
}

const OnMouseOut = (e:any) =>{
    e.target.classList.remove(styles.active)
}
  if(isLoading){}
  return (
    <div className={styles.search}>
    <input placeholder='Поиск товара' onChange={(e:any)=>setSearch(e.target.value)} className={styles.searchQuerry}>
    </input>
    <div className={styles.searchList}>
    {searchResult?.length <= 0 || !search 
    
    ?
    ''
    :
    searchResult?.length <=0
    
    ?
    
    <p>Товары не найдены</p>
    
    :
  
    searchResult?.map((item:any)=>
    <Link style={{textDecoration:'none',color:'black'}} to={`/ItemPage/${item.id}`}><div onMouseOut={OnMouseOut} onMouseOver={OnMouseOver} id={item.id}  className={styles.itemName}>
      {item.name}
      </div></Link>


    )}
    </div>
    </div>
  )
}
