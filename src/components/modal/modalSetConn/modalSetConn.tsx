import React,{useState} from 'react'
import { useAddBrandTypeConnectionMutation, useGetBrandsQuery, useGetTypesQuery } from '../../redux/api/server.api'
import styles from './modalSetConn.module.scss'

interface modalProps{
    setConnModal: (value:boolean) =>void,
}

export default function ModalSetConn({setConnModal}:modalProps) {

  const {data:Types} = useGetTypesQuery('')
  const {data:Brands} = useGetBrandsQuery('')
  const [brandID,setBrandID] = useState<Number>()
  const [typeID,setTypeID] = useState<Number>()
  const [AddTypeBrandConnection] = useAddBrandTypeConnectionMutation()
  
  const submitHandler = (e:React.MouseEvent) =>{
    e.preventDefault()
    AddTypeBrandConnection({typeId:typeID,brandId:brandID})
  }


  return (
    <div>
      <div className={styles.modal} onClick={()=>setConnModal(false)}>
    <div onClick={(e)=>e.stopPropagation()} className={styles.modal_content}>
      <h1>Добавить связь</h1>
      <select onChange={(e:any)=>setTypeID(e.target.value)}>
      <option selected disabled={true}>Выберете тип</option>  
      {Types?.map((el)=>
      <option value={el.id}>{el.name}</option>
      )}</select>
      <select onChange={(e:any)=>setBrandID(e.target.value)}>
      <option selected disabled={true}>Выберете брэнд</option>    
      {Brands?.map((el)=>
      <option value={el.id}>{el.name}</option>
      )}</select>
    <input className={styles.submit} type='submit' onClick={submitHandler} />
    </div>
    </div>
    </div>
  )
}
