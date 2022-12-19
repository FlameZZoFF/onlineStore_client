import React from 'react'
import { useAddTypeMutation } from '../../redux/api/server.api'
import styles from './modalAddType.module.scss'

interface modalProps{
    setAddTypeModal:(togle:boolean)=>void,
}



export default function ModalAddType({setAddTypeModal}:modalProps) {
  const [name,setName] = React.useState<string>('')
  const [img,setImg] = React.useState<any>()
  const [addType] = useAddTypeMutation()
  const inputFileRef:any = React.useRef<HTMLInputElement>()
 const submitHandler = (e:React.FormEvent<HTMLInputElement>) =>{
  e.preventDefault()

  const formData = new FormData()

  formData.append('name',name)
  formData.append('img',img)

  addType(formData).unwrap().catch((e)=>console.log(e))

 }


  return (
    <div className={styles.modal} onClick={()=>setAddTypeModal(false)}>
      <div onClick={(e:React.MouseEvent)=>e.stopPropagation()} className={styles.modal_content}>
      <h1>Добавить тип</h1>
      <input className={styles.modal_input} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} placeholder='Введите название типа'></input>
      <input className={styles.modal_inputFile} type="file" accept='.jpg,.png,.jpeg,.svg' onChange={(e:React.ChangeEvent<any>)=>setImg(e.target.files[0])} ref={inputFileRef}></input>
      <button className={styles.modal_addPhoto} onClick={()=>inputFileRef.current?.click()}>Добавить фото</button>
      <input type='submit' className={styles.submit} onClick={submitHandler} ></input>
      </div>
    </div>
  )
}
