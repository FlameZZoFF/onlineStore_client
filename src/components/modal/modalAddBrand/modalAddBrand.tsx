import React,{useState} from 'react'
import { useAddBrandMutation } from '../../redux/api/server.api'
import styles from './modalAddBrand.module.scss'

interface modalProps{
    setAddBrandModal:(smth:boolean)=>void
}

export default function ModalAddBrand({setAddBrandModal}:modalProps) {
    
    const [addBrand] = useAddBrandMutation()
    const [name,setName] = useState('')
    
    const submitHandler = (e:any) =>{
        e.preventDefault()
        addBrand({name:name})
        setAddBrandModal(false)
    }

  return (

    <div className={styles.modal} onClick={()=>setAddBrandModal(false)}>
    <div onClick={(e)=>e.stopPropagation()} className={styles.modal_content}>
      <h1>Добавить брэнд</h1>
    <input placeholder='Название бренда' onChange={(e)=>setName(e.target.value)} className={styles.modal_input}></input>
    <input className={styles.submit} type='submit' onClick={submitHandler}/>
    </div>
    </div>
    
  )
}
