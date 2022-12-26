import React, { useState } from 'react'
import styles from './SortByValues.module.css'
export default function SortByValues({SortByCost,SortByRange,options,Devices}:any) {
    const [StartAt,setStartAt]:any = useState()
    const [EndAt,setEndAt]:any = useState()

    const showHandler = () =>{
      SortByRange(StartAt,EndAt)
      setStartAt('')
      setEndAt('')
    }

  return (
    <div className={styles.AllValues}>
      <select onChange={SortByCost}  className={styles.selectByCost}>
        <option disabled selected={true}>Сортировка по цене</option>
       {options?.map((option:any,key:any)=>
       <option key={key+1} value = {option.value}>{option.name}</option>
       )}
      </select>
       
      <div className={styles.inputs}>
      <p>Выберите нужную вам цену</p>
      от<input type='number' onChange={e=>setStartAt(e.target.value)} value={StartAt}></input>$
      до<input type='number' onChange={e=>setEndAt(e.target.value)} value = {EndAt}></input>$
      <button className={styles.button} onClick={showHandler}>Показать</button>
      </div>
    </div>
  )
}
