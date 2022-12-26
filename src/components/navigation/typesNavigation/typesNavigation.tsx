import React from 'react'
import { IType } from '../../interfaces/IResponse'
import { useGetTypesQuery } from '../../redux/api/server.api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { setType } from '../../redux/slices/typesSlice'
import './typesNavigation.scss'

interface typesProp{
  setBrand:(sd:any) => void
}

export default function TypesNavigation({setBrand}:typesProp) {
    const {data:Types,isLoading} = useGetTypesQuery('')
    const type = useAppSelector(state=>state.type.type)
    const dispatch = useAppDispatch()
   
    if(isLoading){
        return <p>fdsfs</p>
    }
  return (
    <div className='typeNavigation'>
      {Types?.map((el)=>
      <div key={el.id} className='typeNavigation_wrap'>
        <li className={type == el.id ? 'typeNavigation_el-active typeNavigation_el' : 'typeNavigation_el'} onClick={
            (e)=>{dispatch(setType(el.id))
               setBrand('')
            }}>{el.name}</li>
        </div>
      )}
    </div>
  )
}
