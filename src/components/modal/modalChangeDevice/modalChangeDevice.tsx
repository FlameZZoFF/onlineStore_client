import React,{useState} from 'react'
import { useChangeDeviceMutation, useGetBasketQuery, useGetBrandsByTypeQuery, useGetBrandsQuery, useGetTypesQuery } from '../../redux/api/server.api'
import Loader from '../../UI/Loader/Loader'
import styles from './modalChangeDevice.module.scss'

interface modalProps{
    setModalChange:(value:boolean)=>void,
    currentItem:{
        TypeName:string,
        typeId:number,
        brandId:number,
        id:number
        name:string,
        price:number,
    },
    Types:[
        {
            id:number,
            name:string,
        }
    ]
}

export default function ModalChangeDevice({setModalChange,currentItem,Types}:modalProps) {

  const [changeDevice]:any = useChangeDeviceMutation<any>()
  const [name,setName] = useState<string>(currentItem.name)
  const [price,setPrice] = useState<number>(currentItem.price)
  const [type,setType] = useState<number>(currentItem.typeId)
  const {data:Brands,isLoading:brandsIsLoading} = useGetBrandsByTypeQuery(type)
  const [brand,setBrand] = useState<number>(currentItem.brandId)
  const [img,setImg] = useState<string>()
  
  const submitHandler = () =>{
    const formData:any = new FormData()

    formData.append('name',name)
    formData.append('price',price)
    formData.append('brandId',brand)
    formData.append('typeId',type)
    formData.append('img',img)

    changeDevice({id:currentItem.id,body:formData}).unwrap().catch((e:any)=>console.log(e))

  }
 console.log(type)
  return (
    <div className={styles.modal} onClick={()=>setModalChange(false)}>

        <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()}>
        <h3>Название</h3>
         <input className={styles.modal_input} onChange={(e)=>setName(e.target.value)} value={name}></input>
         <h3>Цена</h3>
         <input className={styles.modal_input} type='number' onChange={(e)=>setPrice(Number(e.target.value))} value={price}></input>
         <h3>Тип</h3>
         <select className={styles.modal_select} onChange={(e)=>setType(Number(e.target.value))}>
        {Types?.map((el)=>
         <option value={el.id} selected={el.id == currentItem.typeId ? true : false}>{el.name}</option>
         )}
         </select>
         <h3>Брэнд</h3>
         <select className={styles.modal_select} onChange={(e)=>setBrand(Number(e.target.value))}>
            {Brands?.map((el)=>
            <option value={el.id} selected={el.id == currentItem.brandId ? true : false}>
             {el.name}
            </option>
            )}
         </select>
        <input type='file' onChange={(e:React.ChangeEvent<any>)=>setImg(e.target.files[0])}></input>
        <input className={styles.modal_button} type='submit' onClick={submitHandler} value='Изменить'></input>
        </div>
      
    </div>
  )
}
 