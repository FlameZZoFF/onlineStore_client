import React, { useContext, useState, useEffect } from 'react'
import Pagination from '../../components/UI/Pagination/Pagination'
import '../../components/Alerts/Alert.css'
import styles from './storePage.module.css'
import AddToBucket from '../../components/UI/Buttons/addToBucket/AddToBucket'
import sadSmile from '../../components/images/ArrayEmpty/sadSmile.svg'
import SuccesBucketAdd from '../../components/Alerts/SuccesBucketAdd/SuccesBucketAdd'
import { CSSTransition } from 'react-transition-group'
import {Link} from 'react-router-dom'
import Search from '../../components/UI/Search/Search'
import {useGetDevicesQuery} from '../../components/redux/api/server.api'
import Loader from '../../components/UI/Loader/Loader'
import TypesNavigation from '../../components/navigation/typesNavigation/typesNavigation'
import { useAppSelector } from '../../components/redux/hooks/hooks'
import BrandNavigation from '../../components/navigation/brandNavigation/brandNavigation'
import SortByValues from '../../components/UI/sort/SortByValues/SortByValues'
export default function StorePage() {
    const type = useAppSelector(state=>state.type.type)
    const [brand,setBrand]:any = useState()
    const [sort,setSort] = useState('')
    const {data:Devices,isLoading} = useGetDevicesQuery({type:type ? type : '',brand:brand ? brand : '',sort:sort})
    const [currentPage,setCurrentPAge] = useState(1)
    const [ItemsPerPage] = useState(4)
    const LastItemIndex = currentPage * ItemsPerPage
    const FirstItemIndex = LastItemIndex - ItemsPerPage
    const paginate = (pageNumber:number) => setCurrentPAge(pageNumber)
    const [currentItems,setCurrentItems]:any = useState()
    const [alert,setAlert]:any = useState(false)
  
   
   useEffect(()=>{
    setCurrentItems(Devices?.rows.slice(FirstItemIndex,LastItemIndex))
   },[Devices,currentPage])
   

    const OnMouseOver = (e:any) =>{
      e.target.classList.add(styles.active)
  }


  const OnMouseOut = (e:any) =>{
      e.target.classList.remove(styles.active)
  }

  
  const SortByCost = (e:any) =>{
    if(e.target.value == 'Down'){
     setSort('High')
    }
    if(e.target.value == 'Up'){
      setSort('Low')
    }
  }
  
  
 

   const sortByRange = (value1:number,value2:number) =>{
    const filterStore = currentItems.filter((element:any)=>{
      if(element.price >= value1 && element.price <= value2){
        return true
      }else{
        return false
      }
    })
    setCurrentItems([...filterStore])
   }


  if(isLoading){
    return <Loader/>
   }

 
  return (
    <div className={styles.StorePage}>
         <CSSTransition in={alert}  timeout={300} classNames='transition' unmountOnExit>
        
        <SuccesBucketAdd/>

      </CSSTransition> 
      <TypesNavigation  setBrand={setBrand}/>
      <BrandNavigation brand={brand} setBrand={setBrand}/>
      <Search/>
      <SortByValues SortByCost={SortByCost} SortByRange={sortByRange} options = {[
        {name:'По убыванию',value:'Down'},
        {name:'По возрастанию',value:'Up'}
      ]}/>
      <CSSTransition   timeout={300} classNames='transition' unmountOnExit>
        <SuccesBucketAdd/>
      </CSSTransition>      
        {currentItems?.length == 0
        ? 
        <div className={styles.arrEmpty}><h1>Товары не обнаружены</h1> <img src ={sadSmile}></img></div>
        : 
        <div className={styles.div}> {currentItems?.map((item:any,key:any)=>
          <Link to={`/ItemPage/${item.id}`} key ={key + 1} style={{textDecoration:'none',display:'block'}}>
            <div  onMouseOut={OnMouseOut} onMouseOver={OnMouseOver} className={styles.AllItems} >
                <img className = {styles.itemPhoto} src ={'https://onlinestoreserver-production.up.railway.app/' + item.img}/>
                <div className={styles.itemText}></div>
                <div  className={styles.itemName}>{item.name}</div>
                <div className = {styles.itemCost}>{item.price}$</div>
                <Link to ='' style={{pointerEvents:'none'}}><AddToBucket setAlert={setAlert} id={item.id} /></Link>
                </div>
                </Link>
        )}</div>}
        <div className={styles.Paginations}><Pagination ItemsPerPage={ItemsPerPage} totalItems={Devices?.rows.length} Pagination ={paginate} currentPage={currentPage}/></div>

    </div>
  )
}
