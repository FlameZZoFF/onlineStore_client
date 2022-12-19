
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Sort.module.css'
export default function Sort({SortByType,sortAuto,options}:any) {
  const {type,setType}:any = useState('312')
  const selectRef:any = useRef()
  
  useEffect(()=>{
    selectRef.current.value = localStorage.getItem('type')
    sortAuto(localStorage.getItem('type'))
  },[]) 


  return (
    <div className={styles.Selector}>
    <select  ref ={selectRef} className={styles.select} onChange={SortByType}>
      {options.map((option:any,key:any)=>
      <option key={key+1} value={option.value} >{option.name}</option>
    )}</select>
    </div>
  )
}
