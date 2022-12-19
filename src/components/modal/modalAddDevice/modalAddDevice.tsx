import React,{useState} from 'react'
import { IType } from '../../interfaces/IResponse'
import TypesNavigation from '../../navigation/typesNavigation/typesNavigation'
import { useAddDeviceMutation, useGetBrandsByTypeQuery } from '../../redux/api/server.api'
import styles from './modalAddDevice.module.scss'

interface modalProps{
  setAddDeviceModal:(set:boolean)=>void,
  types?:IType[]
}

export default function Modal({types,setAddDeviceModal}:modalProps) {

  const [name,setName] = React.useState<string>()
  const [price,setPrice] = React.useState<number>()
  const [type,setType] = React.useState<number>()
  const [brand,setBrand]= React.useState<number>()
  const [img,setImg] = React.useState<string>()
  const [error,setError] = React.useState<string>('')
  const [succes,setSucces] = React.useState<string>('')
  const {data:Brands,isLoading} = useGetBrandsByTypeQuery(type ? type : 0)
  const [addDevice] = useAddDeviceMutation()


 

  const submitHandler  = (e:React.FormEvent<HTMLInputElement>) =>{
    e.preventDefault()
    const formData:any = new FormData()

    formData.append('name',name)
    formData.append('price',price)
    formData.append('typeId',type)
    formData.append('brandId',brand)
    formData.append('img',img)

    addDevice(formData).unwrap().then(()=>setSucces(`Товар ${name} добавлен`)).catch((e)=>setError(e.data.message))
  }
  
  return (
    <div className={styles.modal} onClick={()=>setAddDeviceModal(false)}>
      <div className={styles.modal_content}>
      <form className={styles.modal_content} onClick={(e)=>e.stopPropagation()}>
        <h1>Добавить товар</h1>
       <input value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} className={styles.modal_input} placeholder='Название товара'></input>
       <input className={styles.modal_input} value={price} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPrice(Number(e.target.value))} type='number' placeholder='Цена'></input>
       <select className={styles.modal_select}  onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setType(Number(e.target.value))}>
       <option selected disabled={true}>Type</option>
          {types?.map((el:any)=>
          <option key={el.id} value={el.id} >{el.name}</option>
          )}
       </select>
       {type ? 
        <select className={styles.modal_select}  onChange={(e)=>setBrand(Number(e.target.value))}>
        <option selected disabled={true}>Brand</option>
         {isLoading 
         ? <h1>Загрузка...</h1>
         :
         Brands?.map((el)=>
         <option  value={el.id}>
          {el.name}
         </option>
         ) 
         }
       </select>
       :
       ''
}
       <input className={styles.modal_input} type='file' accept='.jpg,.png,.jpeg,.svg'  onChange={(e:any)=>setImg(e.target.files[0])}></input>
       <input type='submit' className={styles.submit} onClick={submitHandler}></input>
       <h1 style={{color:succes ? 'green' : 'red',textAlign:'center'}}>{succes ? succes : error}</h1>
       </form>
      </div>
    </div>
  )
}

