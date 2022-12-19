import React from 'react'
import { useGetBrandsByTypeQuery } from '../../redux/api/server.api'
import { useAppSelector } from '../../redux/hooks/hooks'
import './brandNavigation.scss'

interface brandProps{
    brand:number,
    setBrand:(id:number) => void
}



export default function BrandNavigation({brand,setBrand}:brandProps) {
    const type = useAppSelector(state=>state.type.type)
    const {data:typeBrands,isLoading} = useGetBrandsByTypeQuery(type ? type : 0)


    if(isLoading){
        return <h1>Loading...</h1>
    }


  return (

    <div className='brandNav'>
      {typeBrands?.map((el)=>
      <li  onClick={(e:any)=>setBrand(el.id)} className={el.id === brand ? 'brandNav_el brandNav_el-active':'brandNav_el'}>{el.name}</li>
      )}
    </div>
  )
}
