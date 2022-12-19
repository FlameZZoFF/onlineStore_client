import React,{useState} from 'react'
import {useDeleteDeviceMutation, useGetBrandsQuery, useGetDevicesQuery, useGetTypesQuery } from '../../redux/api/server.api'
import styles from './Devices.module.scss'
import ModalChangeDevice from '../../modal/modalChangeDevice/modalChangeDevice'
export default function Devices() {

   const {data:Devices,isLoading} = useGetDevicesQuery('')
   const {data:Types,isLoading:typesIsLoading}:any = useGetTypesQuery('')
   const {data:Brands,isLoading:BrandsIsLoading}:any = useGetBrandsQuery('')
   const [modalChange,setModalChange] = useState<boolean>(false) 
   const [currentItem,setCurrentItem]:any = useState()
   
   const [deleteDevice] = useDeleteDeviceMutation()
   
   const ChangeHandler = (e:any) =>{
      const Device:any = Devices?.rows.filter((el)=>el.id == e.target.value)[0]
      const TypeName = Types?.filter((el:any)=>el !== Device.typeId)[0]
      const BrandName = Brands?.filter((el:any)=>el !== Device.brandId)[0]
      let DeviceCopy = JSON.parse(JSON.stringify(Device));
      DeviceCopy.TypeName = TypeName.name
      DeviceCopy.BrandName = BrandName.name
      setCurrentItem(DeviceCopy)
      setModalChange(true)
      

   }
   console.log(currentItem)

   if(isLoading || typesIsLoading || BrandsIsLoading){
    return <h1>Идет загрузка</h1>
   } 

    
  return (
    <div className={styles.devices}>
      {modalChange ? <ModalChangeDevice setModalChange={setModalChange} Types={Types} currentItem={currentItem} /> : ''}    
      {Devices?.count === 0 ? 
      
      <h1>Товары отсутствуют</h1> 
      : 
      Devices?.rows.map((el)=>

      <table className={styles.devices_table}>
        <tr>Фото</tr>
        <td><img className={styles.devices_photo} src={'https://onlinestoreserver-production.up.railway.app/'+ el.img}/> </td>
      <tr>Название:</tr>
      <td>{el.name}</td>
      <tr>
        Цена:
        </tr>
      <td>{el.price}$</td>
      <tr>
        Брэнд:
        </tr>
      <td>{Brands.filter((elem:any)=>elem.id == el.brandId)[0].name}</td>
      <tr>
        Тип:
        </tr>
      <td>{Types.filter((elem:any)=>elem.id == el.typeId)[0].name}</td>
      <button className={styles.devices_button} value={el.id} onClick={ChangeHandler}>Изменить</button>
      <button className={styles.devices_button} style={{backgroundColor:'red'}} onClick={()=>deleteDevice(el.id)}>Удалить</button>
      </table>
      )}
    </div>
  )
}
