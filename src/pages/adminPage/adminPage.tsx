import React,{useState} from 'react'
import styles from './adminPage.module.scss'
import ModalAddDevice from '../../components/modal/modalAddDevice/modalAddDevice'
import { useGetTypesQuery } from '../../components/redux/api/server.api'
import ModalAddType from '../../components/modal/modalAddType/modalAddType'
import ModalAddBrand from '../../components/modal/modalAddBrand/modalAddBrand'
import Devices from '../../components/adminUI/Devices/Devices'
import ModalSetConn from '../../components/modal/modalSetConn/modalSetConn'
export default function AdminPage() {
 
    const [addDeviceModal,setAddDeviceModal] = React.useState<boolean>(false)
    const [addTypeModal,setAddTypeModal] = React.useState<boolean>(false)
    const [addBrandModal,setAddBrandModal] = React.useState<boolean>(false)
    const [connModal,setConnModal] = React.useState<boolean>(false)
    const {data:Types} = useGetTypesQuery('')
    
  const handleDevicemodal = () =>{
     setAddDeviceModal(true)
  }

  const handleTypeModal = () =>{
     setAddTypeModal(true)
  }

  
  return (
    <div className={styles.adminPage}>
      <div className={styles.buttonsAdd}>
        <button className={styles.button} onClick={handleDevicemodal}>Добавить товар</button>
        {addDeviceModal ? <ModalAddDevice types={Types} setAddDeviceModal={setAddDeviceModal}/> : ''}
        <button className={styles.button} onClick={handleTypeModal}>Добавить тип</button>
        {addTypeModal ? <ModalAddType setAddTypeModal={setAddTypeModal}/> : ''}
        <button className={styles.button} onClick={()=>setAddBrandModal(true)}>Добавить Брэнд</button>
        {addBrandModal ? <ModalAddBrand setAddBrandModal={setAddBrandModal}/> : ''}
        <button className={styles.button} onClick={()=>setConnModal(true)}>Связать тип и бренд</button>
        {connModal ? <ModalSetConn  setConnModal={setConnModal}/> : ''}
      </div>
      <Devices/>
    </div>
  )
}
